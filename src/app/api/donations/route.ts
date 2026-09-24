import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

import { sendStaffNotification } from "@/lib/email/notifications";
import {
  getClientIp,
  rateLimit,
  rateLimitResponse,
} from "@/lib/security/rate-limit";
import { isHoneypotTriggered } from "@/lib/security/spam";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type DonationMethod =
  | "wave"
  | "bank"
  | "international_bank";

type DonationPayload = {
  method?: unknown;
  amount?: unknown;
  donorName?: unknown;
  donorEmail?: unknown;
  donorPhone?: unknown;
  anonymous?: unknown;
  website?: unknown;
};

const VALID_METHODS = new Set<DonationMethod>([
  "wave",
  "bank",
  "international_bank",
]);

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function createDonationReference() {
  const date = new Date()
    .toISOString()
    .slice(0, 10)
    .replaceAll("-", "");

  const suffix = randomUUID()
    .replaceAll("-", "")
    .slice(0, 8)
    .toUpperCase();

  return `SANGBE-${date}-${suffix}`;
}

function getPaymentMethodLabel(method: DonationMethod) {
  switch (method) {
    case "wave":
      return "Wave";
    case "bank":
      return "Ecobank Gambia";
    case "international_bank":
      return "International Bank Transfer";
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = rateLimit({
    key: `donations:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.success) {
    return rateLimitResponse(limit.resetAt);
  }

  try {
    const body = (await request.json()) as DonationPayload;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json(
        {
          success: true,
          message: "Your donation request has been created.",
        },
        { status: 201 }
      );
    }

    const method = cleanString(body.method) as DonationMethod;
    const donorName = cleanString(body.donorName);
    const donorEmail = cleanString(body.donorEmail).toLowerCase();
    const donorPhone = cleanString(body.donorPhone);
    const anonymous = body.anonymous === true;

    const amount =
      typeof body.amount === "number"
        ? body.amount
        : Number(body.amount);

    if (!VALID_METHODS.has(method)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select a valid payment method.",
        },
        { status: 400 }
      );
    }

    if (!Number.isFinite(amount) || amount < 1) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter a valid donation amount.",
        },
        { status: 400 }
      );
    }

    if (amount > 10_000_000) {
      return NextResponse.json(
        {
          success: false,
          error: "The donation amount exceeds the supported limit.",
        },
        { status: 400 }
      );
    }

    const roundedAmount = Math.round(amount * 100) / 100;

    if (Math.abs(amount - roundedAmount) > Number.EPSILON) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Donation amounts may contain no more than two decimal places.",
        },
        { status: 400 }
      );
    }

    if (donorEmail && !isValidEmail(donorEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    if (
      donorName.length > 150 ||
      donorEmail.length > 254 ||
      donorPhone.length > 50
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "One or more donor fields exceed the allowed length.",
        },
        { status: 400 }
      );
    }

    const reference = createDonationReference();

    const { data, error } = await supabaseAdmin
      .from("donation_intents")
      .insert({
        reference,
        donor_name:
          anonymous || !donorName ? null : donorName,
        donor_email:
          anonymous || !donorEmail ? null : donorEmail,
        donor_phone:
          anonymous || !donorPhone ? null : donorPhone,
        anonymous,
        method,
        amount: roundedAmount,
        currency: "GMD",
        donor_reference: null,
        payment_status: "pending",
      })
      .select(
        `
          id,
          reference,
          amount,
          currency,
          method,
          payment_status,
          created_at
        `
      )
      .single();

    if (error) {
      console.error("Donation database error:", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "We could not create your donation request. Please try again.",
        },
        { status: 500 }
      );
    }

    const paymentMethodLabel =
      getPaymentMethodLabel(method);

    const notification = await sendStaffNotification({
      subject: `New pending donation — GMD ${roundedAmount.toLocaleString()} — ${paymentMethodLabel}`,
      title: "New Pending Donation",
      fields: [
        {
          label: "Donation Reference",
          value: data.reference,
        },
        {
          label: "Amount",
          value: `GMD ${Number(data.amount).toLocaleString()}`,
        },
        {
          label: "Payment Method",
          value: paymentMethodLabel,
        },
        {
          label: "Payment Status",
          value: "PENDING — NOT YET VERIFIED",
        },
        {
          label: "Anonymous",
          value: anonymous ? "Yes" : "No",
        },
        {
          label: "Donor Name",
          value: anonymous
            ? "Anonymous"
            : donorName || "Not provided",
        },
        {
          label: "Donor Email",
          value: anonymous
            ? "Not retained"
            : donorEmail || "Not provided",
        },
        {
          label: "Donor Phone",
          value: anonymous
            ? "Not retained"
            : donorPhone || "Not provided",
        },
        {
          label: "Created",
          value: new Date(data.created_at).toLocaleString(),
        },
      ],
    });

    if (!notification.success) {
      console.warn(
        `Donation intent ${data.reference} was stored, but staff email notification was not sent.`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your donation request has been created.",
        donation: {
          reference: data.reference,
          amount: Number(data.amount),
          currency: data.currency,
          method: data.method,
          status: data.payment_status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donation API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not create your donation request. Please try again.",
      },
      { status: 500 }
    );
  }
}