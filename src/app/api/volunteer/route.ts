import { NextRequest, NextResponse } from "next/server";

type VolunteerRequestBody = {
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
};

const VALID_INTERESTS = [
  "Community Outreach",
  "Drug Abuse Awareness",
  "Disaster Relief",
  "Community Assistance",
  "Events",
  "Communications & Media",
  "Technology",
  "Fundraising & Partnerships",
  "Other",
];

const VALID_AVAILABILITY = [
  "weekdays",
  "weekends",
  "evenings",
  "flexible",
  "events",
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
    const body = (await request.json()) as VolunteerRequestBody;

    const name = cleanText(body.name);
    const email = cleanText(body.email).toLowerCase();
    const phone = cleanText(body.phone);
    const location = cleanText(body.location);
    const occupation = cleanText(body.occupation);
    const availability = cleanText(body.availability);
    const experience = cleanText(body.experience);
    const motivation = cleanText(body.motivation);

    const consent = body.consent === true;

    const interests = Array.isArray(body.interests)
      ? body.interests
          .filter(
            (interest): interest is string =>
              typeof interest === "string"
          )
          .map((interest) => interest.trim())
      : [];

    // -----------------------------------------------------
    // Required fields
    // -----------------------------------------------------

    if (
      !name ||
      !email ||
      !phone ||
      !location ||
      interests.length === 0 ||
      !availability ||
      !motivation
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
    // Email
    // -----------------------------------------------------

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
    // Phone / WhatsApp
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
    // Location
    // -----------------------------------------------------

    if (location.length < 2 || location.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid location.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Occupation
    // -----------------------------------------------------

    if (occupation.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Occupation or area of study is too long.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Interests
    // -----------------------------------------------------

    const hasInvalidInterest = interests.some(
      (interest) => !VALID_INTERESTS.includes(interest)
    );

    if (hasInvalidInterest) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more selected areas of interest are invalid.",
        },
        {
          status: 400,
        }
      );
    }

    if (interests.length > VALID_INTERESTS.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many areas of interest were selected.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Availability
    // -----------------------------------------------------

    if (!VALID_AVAILABILITY.includes(availability)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid availability option.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Experience
    // -----------------------------------------------------

    if (experience.length > 1000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Relevant experience must be below 1,000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Motivation
    // -----------------------------------------------------

    if (motivation.length < 20) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please tell us a little more about why you would like to volunteer.",
        },
        {
          status: 400,
        }
      );
    }

    if (motivation.length > 3000) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Your motivation statement must be below 3,000 characters.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------------
    // Normalize submission
    // -----------------------------------------------------

    const volunteerApplication = {
      name,
      email,
      phone,
      location,
      occupation: occupation || null,
      interests,
      availability,
      experience: experience || null,
      motivation,
      consent,
      submittedAt: new Date().toISOString(),
    };

    /*
     * -----------------------------------------------------
     * PRODUCTION INTEGRATION
     * -----------------------------------------------------
     *
     * Later we can:
     *
     * 1. Save this application to the database.
     * 2. Send the application to Sangbe Foundation by email.
     * 3. Generate an application/reference ID.
     * 4. Send the applicant a confirmation email.
     *
     * Example:
     *
     * await saveVolunteerApplication(volunteerApplication);
     *
     * await sendVolunteerNotification(volunteerApplication);
     *
     * Never expose email/database credentials to the
     * frontend.
     */

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Volunteer application received:",
        volunteerApplication
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Your volunteer application has been received successfully.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Volunteer API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not process your application at this time. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}