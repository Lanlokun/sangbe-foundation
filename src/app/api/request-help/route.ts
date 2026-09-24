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

type RequestHelpPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  location?: unknown;
  beneficiary?: unknown;
  assistanceType?: unknown;
  urgency?: unknown;
  details?: unknown;
  consent?: unknown;
  website?: unknown;
};

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  const limit = rateLimit({
    key: `request-help:${ip}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.success) {
    return rateLimitResponse(limit.resetAt);
  }

  try {
    const body = (await request.json()) as RequestHelpPayload;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json(
        {
          success: true,
          message: "Your assistance request has been received.",
        },
        { status: 201 }
      );
    }

    const name = cleanString(body.name);
    const phone = cleanString(body.phone);
    const email = cleanString(body.email).toLowerCase();
    const location = cleanString(body.location);
    const beneficiary = cleanString(body.beneficiary);
    const assistanceType = cleanString(body.assistanceType);
    const urgency = cleanString(body.urgency);
    const details = cleanString(body.details);
    const consent = body.consent === true;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!phone) {
      return NextResponse.json(
        { success: false, error: "Please provide a phone number." },
        { status: 400 }
      );
    }

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!location) {
      return NextResponse.json(
        { success: false, error: "Please provide your location." },
        { status: 400 }
      );
    }

    if (!beneficiary) {
      return NextResponse.json(
        {
          success: false,
          error: "Please indicate who needs assistance.",
        },
        { status: 400 }
      );
    }

    if (!assistanceType) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select the type of assistance needed.",
        },
        { status: 400 }
      );
    }

    if (!urgency) {
      return NextResponse.json(
        {
          success: false,
          error: "Please indicate the urgency of the request.",
        },
        { status: 400 }
      );
    }

    if (!details) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide details about the assistance needed.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please confirm that the information may be reviewed by Sangbe Foundation.",
        },
        { status: 400 }
      );
    }

    if (name.length > 150) {
      return NextResponse.json(
        { success: false, error: "Name is too long." },
        { status: 400 }
      );
    }

    if (phone.length > 50) {
      return NextResponse.json(
        { success: false, error: "Phone number is too long." },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { success: false, error: "Email address is too long." },
        { status: 400 }
      );
    }

    if (location.length > 250) {
      return NextResponse.json(
        { success: false, error: "Location is too long." },
        { status: 400 }
      );
    }

    if (beneficiary.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Beneficiary information is too long.",
        },
        { status: 400 }
      );
    }

    if (assistanceType.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Assistance type is too long.",
        },
        { status: 400 }
      );
    }

    if (urgency.length > 100) {
      return NextResponse.json(
        { success: false, error: "Urgency value is too long." },
        { status: 400 }
      );
    }

    if (details.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: "Request details are too long.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("assistance_requests")
      .insert({
        name,
        phone,
        email: email || null,
        location,
        beneficiary,
        assistance_type: assistanceType,
        urgency,
        details,
        consent,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Assistance request database error:", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "We could not submit your assistance request at this time. Please try again.",
        },
        { status: 500 }
      );
    }

    const notification = await sendStaffNotification({
      subject: `New assistance request — ${urgency}`,
      title: "New Assistance Request",
      fields: [
        { label: "Reference", value: data.id },
        { label: "Name", value: name },
        { label: "Phone", value: phone },
        { label: "Email", value: email || "Not provided" },
        { label: "Location", value: location },
        { label: "Beneficiary", value: beneficiary },
        { label: "Assistance Type", value: assistanceType },
        { label: "Urgency", value: urgency },
        { label: "Details", value: details },
        {
          label: "Received",
          value: new Date(data.created_at).toLocaleString(),
        },
      ],
    });

    if (!notification.success) {
      console.warn(
        `Assistance request ${data.id} was stored, but staff email notification was not sent.`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your assistance request has been received.",
        reference: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Request Help API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not submit your assistance request at this time. Please try again.",
      },
      { status: 500 }
    );
  }
}