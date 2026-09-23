import { NextRequest, NextResponse } from "next/server";

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  subject?: unknown;
  message?: unknown;
};

function cleanText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactRequest;

    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanText(body.phone);
    const subject = cleanText(body.subject);
    const message = cleanText(body.message);

    // Required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // Email validation
    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    // Basic length validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid name.",
        },
        {
          status: 400,
        }
      );
    }

    if (email.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (phone.length > 40) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (subject.length < 3 || subject.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject must be between 3 and 150 characters.",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message must be between 10 and 5,000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const contactSubmission = {
      name,
      email,
      phone: phone || null,
      subject,
      message,
      submittedAt: new Date().toISOString(),
    };

    /*
     * -------------------------------------------------------
     * EMAIL / DATABASE INTEGRATION
     * -------------------------------------------------------
     *
     * We will connect this here next.
     *
     * For example:
     *
     * await sendContactEmail(contactSubmission);
     *
     * or:
     *
     * await db.contactSubmission.create({
     *   data: contactSubmission,
     * });
     *
     * Do NOT expose email API keys or database credentials
     * inside the frontend.
     */

    if (process.env.NODE_ENV === "development") {
      console.log("Contact submission:", contactSubmission);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not process your message at this time. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}