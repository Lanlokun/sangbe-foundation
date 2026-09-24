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

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
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
    key: `contact:${ip}`,
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.success) {
    return rateLimitResponse(limit.resetAt);
  }

  try {
    const body = (await request.json()) as ContactPayload;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json(
        {
          success: true,
          message: "Your message has been received.",
        },
        { status: 201 }
      );
    }

    const name = cleanString(body.name);
    const email = cleanString(body.email).toLowerCase();
    const phone = cleanString(body.phone);
    const subject = cleanString(body.subject);
    const message = cleanString(body.message);

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Please enter your message.",
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

    if (email.length > 254) {
      return NextResponse.json(
        { success: false, error: "Email address is too long." },
        { status: 400 }
      );
    }

    if (phone.length > 50) {
      return NextResponse.json(
        { success: false, error: "Phone number is too long." },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { success: false, error: "Subject is too long." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { success: false, error: "Message is too long." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Contact submission database error:", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "We could not submit your message at this time. Please try again.",
        },
        { status: 500 }
      );
    }

    const notification = await sendStaffNotification({
      subject: `New contact message from ${name}`,
      title: "New Contact Message",
      fields: [
        { label: "Reference", value: data.id },
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone || "Not provided" },
        { label: "Subject", value: subject || "Not provided" },
        { label: "Message", value: message },
        {
          label: "Received",
          value: new Date(data.created_at).toLocaleString(),
        },
      ],
    });

    if (!notification.success) {
      console.warn(
        `Contact submission ${data.id} was stored, but staff email notification was not sent.`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received.",
        reference: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not submit your message at this time. Please try again.",
      },
      { status: 500 }
    );
  }
}