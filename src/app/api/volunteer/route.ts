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

type VolunteerPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  occupation?: unknown;
  interests?: unknown;
  availability?: unknown;
  experience?: unknown;
  motivation?: unknown;
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
    key: `volunteer:${ip}`,
    limit: 3,
    windowMs: 10 * 60 * 1000,
  });

  if (!limit.success) {
    return rateLimitResponse(limit.resetAt);
  }

  try {
    const body = (await request.json()) as VolunteerPayload;

    if (isHoneypotTriggered(body.website)) {
      return NextResponse.json(
        {
          success: true,
          message: "Your volunteer application has been received.",
        },
        { status: 201 }
      );
    }

    const name = cleanString(body.name);
    const email = cleanString(body.email).toLowerCase();
    const phone = cleanString(body.phone);
    const location = cleanString(body.location);
    const occupation = cleanString(body.occupation);
    const availability = cleanString(body.availability);
    const experience = cleanString(body.experience);
    const motivation = cleanString(body.motivation);
    const consent = body.consent === true;

    const interests = Array.isArray(body.interests)
      ? body.interests
          .filter(
            (interest): interest is string =>
              typeof interest === "string"
          )
          .map((interest) => interest.trim())
          .filter(Boolean)
      : [];

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

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your phone number.",
        },
        { status: 400 }
      );
    }

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide your location.",
        },
        { status: 400 }
      );
    }

    if (interests.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Please select at least one area of interest.",
        },
        { status: 400 }
      );
    }

    if (!availability) {
      return NextResponse.json(
        {
          success: false,
          error: "Please indicate your availability.",
        },
        { status: 400 }
      );
    }

    if (!motivation) {
      return NextResponse.json(
        {
          success: false,
          error: "Please tell us why you would like to volunteer.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please confirm that Sangbe Foundation may review your application.",
        },
        { status: 400 }
      );
    }

    if (
      name.length > 150 ||
      email.length > 254 ||
      phone.length > 50 ||
      location.length > 250 ||
      occupation.length > 200 ||
      availability.length > 200 ||
      experience.length > 3000 ||
      motivation.length > 3000
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "One or more fields exceed the allowed length.",
        },
        { status: 400 }
      );
    }

    if (
      interests.length > 20 ||
      interests.some((interest) => interest.length > 100)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid volunteer interests.",
        },
        { status: 400 }
      );
    }

    const uniqueInterests = [...new Set(interests)];

    const { data, error } = await supabaseAdmin
      .from("volunteer_applications")
      .insert({
        name,
        email,
        phone,
        location,
        occupation: occupation || null,
        interests: uniqueInterests,
        availability,
        experience: experience || null,
        motivation,
        consent,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("Volunteer application database error:", {
        code: error.code,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          error:
            "We could not submit your volunteer application at this time. Please try again.",
        },
        { status: 500 }
      );
    }

    const notification = await sendStaffNotification({
      subject: `New volunteer application — ${name}`,
      title: "New Volunteer Application",
      fields: [
        { label: "Reference", value: data.id },
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Phone", value: phone },
        { label: "Location", value: location },
        { label: "Occupation", value: occupation || "Not provided" },
        { label: "Interests", value: uniqueInterests.join(", ") },
        { label: "Availability", value: availability },
        { label: "Experience", value: experience || "Not provided" },
        { label: "Motivation", value: motivation },
        {
          label: "Received",
          value: new Date(data.created_at).toLocaleString(),
        },
      ],
    });

    if (!notification.success) {
      console.warn(
        `Volunteer application ${data.id} was stored, but staff email notification was not sent.`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your volunteer application has been received.",
        reference: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Volunteer API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          "We could not submit your volunteer application at this time. Please try again.",
      },
      { status: 500 }
    );
  }
}