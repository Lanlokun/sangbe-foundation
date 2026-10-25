
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers and hyphens for the slug."
  ),
  summary: z.string().trim().min(10).max(1000),
  description: z.string().max(20000),
  category: z.string().trim().min(2).max(100),
  cover_image_url: z.union([
    z.literal(""),
    z.string().url(),
  ]),
  location: z.string().max(200),
  start_date: z.string(),
  end_date: z.string(),
  display_order: z.coerce.number().int().min(0).max(10000),
  status: z.enum(["draft", "published"]),
});

export type ProgramActionState = {
  error: string | null;
};

function canEdit(role: string) {
  return ["super_admin", "admin", "editor"].includes(role);
}

function refreshPrograms() {
  revalidatePath("/admin");
  revalidatePath("/admin/programs");
  revalidatePath("/programs");
}

export async function saveProgram(
  id: string | null,
  _previous: ProgramActionState,
  formData: FormData
): Promise<ProgramActionState> {
  const user = await requireCMSUser();

  if (!canEdit(user.role)) {
    return { error: "You cannot manage programs." };
  }

  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    description: formData.get("description") ?? "",
    category: formData.get("category"),
    cover_image_url: formData.get("cover_image_url") ?? "",
    location: formData.get("location") ?? "",
    start_date: formData.get("start_date") ?? "",
    end_date: formData.get("end_date") ?? "",
    display_order: formData.get("display_order") ?? "0",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Please check the program fields.",
    };
  }

  const values = parsed.data;

  if (
    values.start_date &&
    values.end_date &&
    values.end_date < values.start_date
  ) {
    return {
      error: "The end date cannot be before the start date.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || authUser.id !== user.id) {
    return { error: "Your session has expired." };
  }

  let existing: {
    id: string;
    published_at: string | null;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("cms_programs")
      .select("id, published_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { error: "Program not found." };
    }

    existing = data;
  }

  const payload = {
    title: values.title,
    slug: values.slug,
    summary: values.summary,
    description: values.description,
    category: values.category,
    cover_image_url: values.cover_image_url || null,
    location: values.location || null,
    start_date: values.start_date || null,
    end_date: values.end_date || null,
    display_order: values.display_order,
    status: values.status,
    published_at:
      values.status === "published"
        ? existing?.published_at ?? new Date().toISOString()
        : null,
    updated_at: new Date().toISOString(),
  };

  const result = existing
    ? await supabase
        .from("cms_programs")
        .update(payload)
        .eq("id", existing.id)
        .select("id")
        .single()
    : await supabase
        .from("cms_programs")
        .insert({
          ...payload,
          created_by: user.id,
        })
        .select("id")
        .single();

  if (result.error) {
    return { error: result.error.message };
  }

  refreshPrograms();
  redirect("/admin/programs");
}

export async function deleteProgram(
  id: string
): Promise<ProgramActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    return { error: "Only administrators can delete programs." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_programs")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Program not found." };
  }

  refreshPrograms();

  return { error: null };
}
