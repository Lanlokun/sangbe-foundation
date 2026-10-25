
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  title: z.string().trim().min(3).max(200),
  message: z.string().trim().min(5).max(10000),
  priority: z.enum(["normal", "important", "urgent"]),
  status: z.enum(["draft", "published"]),
  expires_at: z.string(),
});

export type AnnouncementActionState = {
  error: string | null;
};

const canPublishRole = (role: string) =>
  ["super_admin", "admin", "editor"].includes(role);

function refreshAnnouncements() {
  revalidatePath("/admin");
  revalidatePath("/admin/announcements");
  revalidatePath("/announcements");
}

export async function saveAnnouncement(
  id: string | null,
  _previous: AnnouncementActionState,
  formData: FormData
): Promise<AnnouncementActionState> {
  const user = await requireCMSUser();
  const canPublish = canPublishRole(user.role);

  const parsed = schema.safeParse({
    title: formData.get("title"),
    message: formData.get("message"),
    priority: formData.get("priority"),
    status: formData.get("status"),
    expires_at: formData.get("expires_at") || "",
  });

  if (!parsed.success) {
    return { error: "Please check the announcement fields." };
  }

  if (parsed.data.status === "published" && !canPublish) {
    return { error: "You do not have permission to publish." };
  }

  const expiresAt = parsed.data.expires_at
    ? new Date(parsed.data.expires_at)
    : null;

  if (expiresAt && Number.isNaN(expiresAt.getTime())) {
    return { error: "Invalid expiry date." };
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
    created_by: string;
    status: string;
    published_at: string | null;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("cms_announcements")
      .select("id, created_by, status, published_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { error: "Announcement not found." };
    }

    existing = data;

    if (
      !canPublish &&
      (existing.created_by !== user.id || existing.status !== "draft")
    ) {
      return { error: "You cannot edit this announcement." };
    }
  }

  const payload = {
    title: parsed.data.title,
    message: parsed.data.message,
    priority: parsed.data.priority,
    status: parsed.data.status,
    expires_at: expiresAt?.toISOString() ?? null,
    published_at:
      parsed.data.status === "published"
        ? existing?.published_at ?? new Date().toISOString()
        : null,
    updated_at: new Date().toISOString(),
  };

  const result = existing
    ? await supabase
        .from("cms_announcements")
        .update(payload)
        .eq("id", existing.id)
    : await supabase
        .from("cms_announcements")
        .insert({
          ...payload,
          created_by: user.id,
        });

  if (result.error) {
    return { error: result.error.message };
  }

  refreshAnnouncements();
  redirect("/admin/announcements");
}

export async function deleteAnnouncement(
  id: string
): Promise<AnnouncementActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    return { error: "Only administrators can delete announcements." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_announcements")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Announcement not found." };
  }

  refreshAnnouncements();
  return { error: null };
}
