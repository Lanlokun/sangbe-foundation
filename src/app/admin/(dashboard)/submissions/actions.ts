
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const tableMap = {
  contact: "contact_submissions",
  volunteer: "volunteer_applications",
  assistance: "assistance_requests",
  donation: "donation_intents",
} as const;

const schema = z.object({
  submission_type: z.enum([
    "contact",
    "volunteer",
    "assistance",
    "donation",
  ]),
  submission_id: z.string().uuid(),
  status: z.enum([
    "new",
    "in_review",
    "resolved",
    "closed",
  ]),
  internal_notes: z.string().max(5000),
});

export type SubmissionActionState = {
  error: string | null;
  success?: string | null;
};

export async function updateSubmissionReview(
  _previous: SubmissionActionState,
  formData: FormData
): Promise<SubmissionActionState> {
  const user = await requireCMSUser();

  if (
    !["super_admin", "admin", "editor"].includes(user.role)
  ) {
    return {
      error: "You do not have permission to review submissions.",
    };
  }

  const parsed = schema.safeParse({
    submission_type: formData.get("submission_type"),
    submission_id: formData.get("submission_id"),
    status: formData.get("status"),
    internal_notes: formData.get("internal_notes") || "",
  });

  if (!parsed.success) {
    return {
      error: "Please check the review fields.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || authUser.id !== user.id) {
    return {
      error: "Your session has expired.",
    };
  }

  const table = tableMap[parsed.data.submission_type];

  const { data: submission, error: lookupError } =
    await supabase
      .from(table)
      .select("id")
      .eq("id", parsed.data.submission_id)
      .maybeSingle();

  if (lookupError || !submission) {
    return {
      error: "Submission not found or access denied.",
    };
  }

  const { error } = await supabase
    .from("cms_submission_reviews")
    .upsert(
      {
        ...parsed.data,
        updated_by: user.id,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "submission_type,submission_id",
      }
    );

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/submissions");
  revalidatePath("/admin");

  return {
    error: null,
    success: "Submission review updated.",
  };
}
