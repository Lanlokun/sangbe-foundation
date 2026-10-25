
import "server-only";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export type SubmissionType =
  | "contact"
  | "volunteer"
  | "assistance"
  | "donation";

export type ReviewStatus =
  | "new"
  | "in_review"
  | "resolved"
  | "closed";

export type Submission = {
  id: string;
  type: SubmissionType;
  name: string;
  email: string | null;
  phone: string | null;
  subject: string;
  summary: string;
  created_at: string;
  status: ReviewStatus;
  internal_notes: string;
  details: Record<string, unknown>;
};

type Review = {
  submission_type: SubmissionType;
  submission_id: string;
  status: ReviewStatus;
  internal_notes: string;
};

type ContactRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  created_at: string;
};

type VolunteerRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  occupation: string | null;
  interests: string[];
  availability: string;
  experience: string | null;
  motivation: string;
  consent: boolean;
  status: string;
  created_at: string;
};

type AssistanceRow = {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  location: string;
  beneficiary: string;
  assistance_type: string;
  urgency: string;
  details: string;
  consent: boolean;
  status: string;
  created_at: string;
};

type DonationRow = {
  id: string;
  reference: string;
  donor_name: string | null;
  donor_email: string | null;
  donor_phone: string | null;
  anonymous: boolean;
  method: string;
  amount: number;
  currency: string;
  donor_reference: string | null;
  payment_status: string;
  created_at: string;
  verified_at: string | null;
};

export async function getSubmissions(): Promise<Submission[]> {
  const user = await requireCMSUser();

  if (
    !["super_admin", "admin", "editor"].includes(user.role)
  ) {
    throw new Error("You cannot access submissions.");
  }

  const supabase = await createClient();

  const [
    contactsResult,
    volunteersResult,
    assistanceResult,
    donationsResult,
    reviewsResult,
  ] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),

    supabase
      .from("volunteer_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),

    supabase
      .from("assistance_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),

    supabase
      .from("donation_intents")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500),

    supabase
      .from("cms_submission_reviews")
      .select(
        "submission_type, submission_id, status, internal_notes"
      ),
  ]);

  const results = [
    contactsResult,
    volunteersResult,
    assistanceResult,
    donationsResult,
    reviewsResult,
  ];

  const failure = results.find((result) => result.error);

  if (failure?.error) {
    throw new Error(failure.error.message);
  }

  const reviews = (reviewsResult.data ?? []) as Review[];

  const reviewMap = new Map(
    reviews.map((review) => [
      `${review.submission_type}:${review.submission_id}`,
      review,
    ])
  );

  function reviewFor(type: SubmissionType, id: string) {
    return reviewMap.get(`${type}:${id}`);
  }

  const contacts: Submission[] = (
    (contactsResult.data ?? []) as ContactRow[]
  ).map((item) => {
    const review = reviewFor("contact", item.id);

    return {
      id: item.id,
      type: "contact",
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.subject || "General enquiry",
      summary: item.message,
      created_at: item.created_at,
      status: review?.status ?? "new",
      internal_notes: review?.internal_notes ?? "",
      details: {
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Subject: item.subject,
        Message: item.message,
        "Form status": item.status,
      },
    };
  });

  const volunteers: Submission[] = (
    (volunteersResult.data ?? []) as VolunteerRow[]
  ).map((item) => {
    const review = reviewFor("volunteer", item.id);

    return {
      id: item.id,
      type: "volunteer",
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: "Volunteer Application",
      summary: item.motivation,
      created_at: item.created_at,
      status: review?.status ?? "new",
      internal_notes: review?.internal_notes ?? "",
      details: {
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Location: item.location,
        Occupation: item.occupation,
        Interests: item.interests.join(", "),
        Availability: item.availability,
        Experience: item.experience,
        Motivation: item.motivation,
        Consent: item.consent ? "Yes" : "No",
        "Form status": item.status,
      },
    };
  });

  const assistance: Submission[] = (
    (assistanceResult.data ?? []) as AssistanceRow[]
  ).map((item) => {
    const review = reviewFor("assistance", item.id);

    return {
      id: item.id,
      type: "assistance",
      name: item.name,
      email: item.email,
      phone: item.phone,
      subject: item.assistance_type,
      summary: item.details,
      created_at: item.created_at,
      status: review?.status ?? "new",
      internal_notes: review?.internal_notes ?? "",
      details: {
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Location: item.location,
        Beneficiary: item.beneficiary,
        "Assistance type": item.assistance_type,
        Urgency: item.urgency,
        Details: item.details,
        Consent: item.consent ? "Yes" : "No",
        "Form status": item.status,
      },
    };
  });

  const donations: Submission[] = (
    (donationsResult.data ?? []) as DonationRow[]
  ).map((item) => {
    const review = reviewFor("donation", item.id);

    return {
      id: item.id,
      type: "donation",
      name: item.anonymous
        ? "Anonymous Donor"
        : item.donor_name || "Unnamed Donor",
      email: item.anonymous ? null : item.donor_email,
      phone: item.anonymous ? null : item.donor_phone,
      subject: "Donation Enquiry",
      summary: `${item.currency} ${item.amount} via ${item.method}`,
      created_at: item.created_at,
      status: review?.status ?? "new",
      internal_notes: review?.internal_notes ?? "",
      details: {
        Reference: item.reference,
        "Donor name": item.anonymous
          ? "Anonymous"
          : item.donor_name,
        "Donor email": item.anonymous
          ? "Hidden"
          : item.donor_email,
        "Donor phone": item.anonymous
          ? "Hidden"
          : item.donor_phone,
        Amount: `${item.currency} ${item.amount}`,
        Method: item.method,
        "Payment status": item.payment_status,
        "Donor reference": item.donor_reference,
        "Verified at": item.verified_at,
        Anonymous: item.anonymous ? "Yes" : "No",
      },
    };
  });

  return [
    ...contacts,
    ...volunteers,
    ...assistance,
    ...donations,
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  );
}
