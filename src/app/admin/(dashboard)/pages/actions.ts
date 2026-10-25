
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
    "Use lowercase letters, numbers and hyphens."
  ),
  excerpt: z.string().max(1000),
  content: z.string().min(10).max(100000),
  cover_image_url: z.union([
    z.literal(""),
    z.string().url(),
  ]),
  seo_title: z.string().max(200),
  seo_description: z.string().max(500),
  display_order: z.coerce.number().int().min(0).max(10000),
  status: z.enum(["draft", "published"]),
});

export type PageActionState = {
  error: string | null;
};

function canManage(role: string) {
  return ["super_admin", "admin", "editor"].includes(role);
}

function refreshPages(slugs: string[]) {
  revalidatePath("/admin");
  revalidatePath("/admin/pages");

  for (const slug of slugs) {
    revalidatePath(`/pages/${slug}`);
  }
}

export async function savePage(
  id: string | null,
  _previous: PageActionState,
  formData: FormData
): Promise<PageActionState> {
  const user = await requireCMSUser();

  if (!canManage(user.role)) {
    return { error: "You cannot manage pages." };
  }

  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") ?? "",
    content: formData.get("content"),
    cover_image_url: formData.get("cover_image_url") ?? "",
    seo_title: formData.get("seo_title") ?? "",
    seo_description: formData.get("seo_description") ?? "",
    display_order: formData.get("display_order") ?? "0",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Invalid page fields.",
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
    slug: string;
    published_at: string | null;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("cms_pages")
      .select("id, slug, published_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return { error: "Page not found." };
    }

    existing = data;
  }

  const values = parsed.data;

  const payload = {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt,
    content: values.content,
    cover_image_url: values.cover_image_url || null,
    seo_title: values.seo_title || null,
    seo_description: values.seo_description || null,
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
        .from("cms_pages")
        .update(payload)
        .eq("id", existing.id)
        .select("id")
        .single()
    : await supabase
        .from("cms_pages")
        .insert({
          ...payload,
          created_by: user.id,
        })
        .select("id")
        .single();

  if (result.error) {
    return { error: result.error.message };
  }

  refreshPages([
    values.slug,
    ...(existing ? [existing.slug] : []),
  ]);

  redirect("/admin/pages");
}

export async function deletePage(
  id: string
): Promise<PageActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    return { error: "Only administrators can delete pages." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_pages")
    .delete()
    .eq("id", id)
    .select("slug")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Page not found." };
  }

  refreshPages([data.slug]);

  return { error: null };
}
