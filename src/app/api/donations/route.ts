import { NextRequest, NextResponse } from "next/server";

type DonationRequestBody = {
  method?: unknown;
  amount?: unknown;

  // These are optional for now and allow us to extend
  // the donation flow later without redesigning the API.
  donorName?: unknown;
  donorEmail?: unknown;
  donorPhone?: unknown;
  anonymous?: unknown;
  reference?: unknown;
};

const VALID_METHODS = [
  "bank",
  "mobile",
  "qmoney",
  "afrimoney",
  "other",
];

const MIN_DONATION = 1;
const MAX_DONATION = 10_000_000;

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

function createReference(): string {
  const timestamp = Date.now().toString(36).toUpperCase();

  const random = crypto.randomUUID()
    .replace(/-/g, "")
    .slice(0, 6)
    .toUpperCase();

  return `SANGBE-${timestamp}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as DonationRequestBody;

    const method = cleanText(body.method).toLowerCase();

    const donorName = cleanText(body.donorName);
    const donorEmail = cleanText(body.donorEmail).toLowerCase();
    const donorPhone = cleanText(body.donorPhone);
    const paymentReference = cleanText(body.reference);

    const anonymous = body.anonymous === true;

    // ---------------------------------------------
    // Amount
    // ---------------------------------------------

    let amount: number;

    if (
      typeof body.amount === "number" ||
      typeof body.amount === "string"
    ) {
      amount = Number(body.amount);
    } else {
      amount = Number.NaN;
    }

    if (!Number.isFinite(amount)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid donation amount.",
        },
        {
          status: 400,
        }
      );
    }

    if (amount < MIN_DONATION) {
      return NextResponse.json(
        {
          success: false,
          message: "Donation amount must be at least GMD 1.",
        },
        {
          status: 400,
        }
      );
    }

    if (amount > MAX_DONATION) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please contact Sangbe Foundation directly for donations of this size.",
        },
        {
          status: 400,
        }
      );
    }

    // Maximum two decimal places
    if (!Number.isInteger(amount * 100)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Donation amount cannot contain more than two decimal places.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Payment method
    // ---------------------------------------------

    if (!VALID_METHODS.includes(method)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select a valid donation method.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Optional donor information
    // ---------------------------------------------

    if (donorName && donorName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Donor name is too long.",
        },
        {
          status: 400,
        }
      );
    }

    if (donorEmail) {
      if (!isValidEmail(donorEmail)) {
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

      if (donorEmail.length > 150) {
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
    }

    if (donorPhone && !isValidPhone(donorPhone)) {
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

    if (paymentReference.length > 150) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference is too long.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------
    // Internal donation reference
    // ---------------------------------------------

    const donationReference = createReference();

    // ---------------------------------------------
    // Normalized record
    // ---------------------------------------------

    const donationIntent = {
      reference: donationReference,

      amount,
      currency: "GMD",

      method,

      donor: anonymous
        ? {
            anonymous: true,
            name: null,
            email: null,
            phone: null,
          }
        : {
            anonymous: false,
            name: donorName || null,
            email: donorEmail || null,
            phone: donorPhone || null,
          },

      paymentReference: paymentReference || null,

      /*
       * IMPORTANT:
       *
       * This API does NOT confirm that money was received.
       *
       * Until an actual payment provider or manual
       * verification system is connected, the donation
       * remains an intent.
       */
      status: "pending",

      createdAt: new Date().toISOString(),
    };

    // ---------------------------------------------
    // Production integration
    // ---------------------------------------------

    /*
     * Later:
     *
     * await db.donation.create({
     *   data: donationIntent,
     * });
     *
     * We can then add:
     *
     * - QMoney integration
     * - AfriMoney integration
     * - Bank-transfer instructions
     * - Payment confirmation
     * - Donation receipts
     * - Admin verification
     *
     * A donation must NEVER be marked "paid"
     * simply because this endpoint was called.
     */

    if (process.env.NODE_ENV === "development") {
      console.log("Donation intent received:", donationIntent);
    }

    return NextResponse.json(
      {
        success: true,

        message:
          "Your donation details have been recorded.",

        donation: {
          reference: donationReference,
          amount,
          currency: "GMD",
          method,
          status: "pending",
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Donation API error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "We could not process your donation request at this time. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}