import { NextRequest, NextResponse } from "next/server";

type RequestHelpBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  location?: unknown;
  beneficiary?: unknown;
  assistanceType?: unknown;
  urgency?: unknown;
  details?: unknown;
  consent?: unknown;
};

const VALID_BENEFICIARIES = [
  "myself",
  "family",
  "individual",
  "community",
  "other",
];

const VALID_ASSISTANCE_TYPES = [
  "essential-support",
  "disaster-relief",
  "community-support",
  "drug-support",
  "other",
];

const VALID_URGENCY_LEVELS = [
  "standard",
  "important",
  "urgent",
];

function cleanText(value: unknown): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[0-9+\-()\s]{7,30}$/.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RequestHelpBody;

    const name = cleanText(body.name);
    const phone = cleanText(body.phone);
    const email = cleanText(body.email).toLowerCase();
    const location = cleanText(body.location);
    const beneficiary = cleanText(body.beneficiary);
    const assistanceType = cleanText(body.assistanceType);
    const urgency = cleanText(body.urgency);
    const details = cleanText(body.details);
    const consent = body.consent === true;

    // -----------------------------------------------------
    // Required fields
    // -----------------------------------------------------

    if (
      !name ||
      !phone ||
      !location ||
      !beneficiary ||
      !assistanceType ||
      !urgency ||
      !details
    ) {
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

    // -----------------------------------------------------
    // Consent
    // -----------------------------------------------------

    if (!consent) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please confirm that the information provided is accurate.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Name
    // -----------------------------------------------------

    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid full name.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Phone
    // -----------------------------------------------------

    if (!isValidPhone(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid phone or WhatsApp number.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Optional email
    // -----------------------------------------------------

    if (email && !isValidEmail(email)) {
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

    // -----------------------------------------------------
    // Location
    // -----------------------------------------------------

    if (location.length < 2 || location.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid location or community.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Beneficiary
    // -----------------------------------------------------

    if (!VALID_BENEFICIARIES.includes(beneficiary)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select who needs assistance.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Assistance type
    // -----------------------------------------------------

    if (!VALID_ASSISTANCE_TYPES.includes(assistanceType)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid type of assistance.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Urgency
    // -----------------------------------------------------

    if (!VALID_URGENCY_LEVELS.includes(urgency)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select the urgency of the situation.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Description
    // -----------------------------------------------------

    if (details.length < 20) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide a little more information about the situation.",
        },
        {
          status: 400,
        }
      );
    }

    if (details.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "The description is too long. Please keep it below 5,000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Normalized submission
    // -----------------------------------------------------

    const assistanceRequest = {
      name,
      phone,
      email: email || null,
      location,
      beneficiary,
      assistanceType,
      urgency,
      details,
      consent,
      submittedAt: new Date().toISOString(),
    };

    /*
     * -----------------------------------------------------
     * PRODUCTION INTEGRATION
     * -----------------------------------------------------
     *
     * Later this is where we can:
     *
     * 1. Save the request to a database.
     * 2. Email the Sangbe Foundation team.
     * 3. Generate a request/reference number.
     * 4. Notify an administrator.
     *
     * Example:
     *
     * await saveAssistanceRequest(assistanceRequest);
     *
     * await sendAssistanceRequestEmail(assistanceRequest);
     *
     * IMPORTANT:
     * Do not place database passwords or email API keys
     * inside frontend components.
     */

    if (process.env.NODE_ENV === "development") {
      console.log("Assistance request received:", assistanceRequest);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your assistance request has been received.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Request Help API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not process your request at this time. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}