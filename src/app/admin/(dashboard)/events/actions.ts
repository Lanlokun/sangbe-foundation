
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export type EventActionState = {
  error: string | null;
};

const eventSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().min(10),
  location: z.string().trim().max(250),
  start_date: z.string().min(1),
  end_date: z.string(),
  cover_image_url: z.string(),
  registration_url: z.string(),
  status: z.enum(["draft", "published"]),
});

function parseDate(value: string): string | null {
  if (!value) return null;

  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date.toISOString();
}

function validateUrl(value: string): boolean {
  if (!value) return true;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export async function saveEvent(
  id: string | null,
  _previous: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  const user = await requireCMSUser();

  const canPublish = ["super_admin", "admin", "editor"].includes(
    user.role
  );

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    location: formData.get("location") || "",
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || "",
    cover_image_url: formData.get("cover_image_url") || "",
    registration_url: formData.get("registration_url") || "",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: "Please complete the required event fields." };
  }

  if (parsed.data.status === "published" && !canPublish) {
    return { error: "You do not have permission to publish events." };
  }

  const startDate = parseDate(parsed.data.start_date);
  const endDate = parseDate(parsed.data.end_date);

  if (!startDate) {
    return { error: "Please enter a valid event start date." };
  }

  if (parsed.data.end_date && !endDate) {
    return { error: "Please enter a valid event end date." };
  }

  if (endDate && new Date(endDate) < new Date(startDate)) {
    return { error: "The event end date cannot precede its start date." };
  }

  if (
    !validateUrl(parsed.data.cover_image_url) ||
    !validateUrl(parsed.data.registration_url)
  ) {
    return { error: "Please provide valid HTTP or HTTPS URLs." };
  }

  const supabase = await createClient();

  let existing: {
    id: string;
    slug: string;
    created_by: string;
    status: string;
    published_at: string | null;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("cms_events")
      .select("id, slug, created_by, status, published_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { error: "Event not found or access denied." };
    }

    existing = data;

    if (
      !canPublish &&
      (existing.created_by !== user.id || existing.status !== "draft")
    ) {
      return { error: "You cannot edit this event." };
    }
  }

  const now = new Date().toISOString();

  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    description: parsed.data.description,
    location: parsed.data.location || null,
    start_date: startDate,
    end_date: endDate,
    cover_image_url: parsed.data.cover_image_url || null,
    registration_url: parsed.data.registration_url || null,
    status: parsed.data.status,
    published_at:
      parsed.data.status === "published"
        ? existing?.published_at || now
        : null,
    updated_at: now,
  };

  const result = existing
    ? await supabase
        .from("cms_events")
        .update(payload)
        .eq("id", existing.id)
    : await supabase.from("cms_events").insert({
        ...payload,
        created_by: user.id,
      });

  if (result.error) {
    if (result.error.code === "23505") {
      return { error: "An event with this URL already exists." };
    }

    return { error: result.error.message };
  }

  revalidatePath("/admin");
  revalidatePath("/admin/events");
  revalidatePath("/events");

  if (existing?.slug) {
    revalidatePath(`/events/${existing.slug}`);
  }

  revalidatePath(`/events/${parsed.data.slug}`);

  redirect("/admin/events");
}
