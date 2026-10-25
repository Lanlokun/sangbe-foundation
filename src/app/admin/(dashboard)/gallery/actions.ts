
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const mediaSchema = z.object({
  title: z.string().trim().min(3).max(200),
  description: z.string().trim().max(2000),
  category: z.string().trim().min(1).max(100),
  image_url: z.string().url().refine(
    (url) => url.startsWith("https://"),
    "A secure image URL is required."
  ),
  status: z.enum(["draft", "published"]),
});

export type MediaActionState = {
  error: string | null;
  success?: string | null;
};

const canPublishRole = (role: string) =>
  ["super_admin", "admin", "editor"].includes(role);

function refreshMedia() {
  revalidatePath("/admin");
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function saveMedia(
  _previous: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  const user = await requireCMSUser();

  const parsed = mediaSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    category: formData.get("category"),
    image_url: formData.get("image_url"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: "Please check the media fields." };
  }

  if (
    parsed.data.status === "published" &&
    !canPublishRole(user.role)
  ) {
    return { error: "You cannot publish media." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("cms_media").insert({
    ...parsed.data,
    uploaded_by: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  refreshMedia();

  return {
    error: null,
    success: "Image added successfully.",
  };
}

export async function updateMedia(
  id: string,
  _previous: MediaActionState,
  formData: FormData
): Promise<MediaActionState> {
  const user = await requireCMSUser();

  const parsed = mediaSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description") || "",
    category: formData.get("category"),
    image_url: formData.get("image_url"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: "Please check the media fields." };
  }

  const supabase = await createClient();

  const { data: existing, error: fetchError } = await supabase
    .from("cms_media")
    .select("id, uploaded_by, status")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return { error: "Image not found or access denied." };
  }

  const canManageAll = canPublishRole(user.role);

  if (
    !canManageAll &&
    (
      existing.uploaded_by !== user.id ||
      existing.status !== "draft" ||
      parsed.data.status !== "draft"
    )
  ) {
    return { error: "You cannot edit this image." };
  }

  const { error } = await supabase
    .from("cms_media")
    .update({
      ...parsed.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  refreshMedia();

  return {
    error: null,
    success: "Image updated successfully.",
  };
}

export async function deleteMedia(
  id: string
): Promise<MediaActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    return { error: "Only administrators can delete media." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("cms_media")
    .delete()
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  refreshMedia();

  return {
    error: null,
    success: "Media record deleted.",
  };
}
