
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  title: z.string().trim().min(3).max(200),

  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  excerpt: z.string().trim().max(500),

  category: z.string().trim().min(1).max(100),

  content: z.record(z.unknown()),

  cover_image_url: z
    .union([z.string().trim().url(), z.literal("")])
    .default(""),

  status: z.enum(["draft", "published"]),
});

export type ArticleActionState = {
  error: string | null;
};

export async function saveArticle(
  id: string | null,
  _previous: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  // Authenticate the CMS user.
  const user = await requireCMSUser();

  // Only administrators and editors can publish articles.
  const canPublish = [
    "super_admin",
    "admin",
    "editor",
  ].includes(user.role);

  // Parse the TipTap JSON content.
  let content: unknown;

  try {
    content = JSON.parse(
      String(formData.get("content") || "{}")
    );
  } catch {
    return {
      error: "Invalid article content.",
    };
  }

  // Validate submitted article fields.
  const parsed = schema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt") || "",
    category: formData.get("category"),
    content,
    cover_image_url: formData.get("cover_image_url") || "",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      error: "Please check the article fields.",
    };
  }

  // Enforce publishing permissions.
  if (parsed.data.status === "published" && !canPublish) {
    return {
      error: "You do not have permission to publish articles.",
    };
  }

  const supabase = await createClient();

  // Confirm the active Supabase Auth session.
  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (
    authError ||
    !authUser ||
    authUser.id !== user.id
  ) {
    return {
      error: "Your session has expired. Please sign in again.",
    };
  }

  const now = new Date().toISOString();

  // Fetch an existing article when editing.
  let existing: {
    id: string;
    author_id: string;
    status: string;
    published_at: string | null;
    slug: string;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("cms_articles")
      .select(
        "id, author_id, status, published_at, slug"
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      return {
        error: "Article not found or access denied.",
      };
    }

    existing = data;

    // Contributors can only edit their own draft articles.
    if (
      !canPublish &&
      (
        existing.author_id !== user.id ||
        existing.status !== "draft"
      )
    ) {
      return {
        error: "You do not have permission to edit this article.",
      };
    }
  }

  // Prepare the database payload.
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt,
    category: parsed.data.category,
    content: parsed.data.content,

    // Store the Supabase Storage public URL.
    // An empty value removes the image reference.
    cover_image_url:
      parsed.data.cover_image_url || null,

    status: parsed.data.status,
    updated_at: now,

    published_at:
      parsed.data.status === "published"
        ? existing?.published_at || now
        : null,
  };

  // Insert or update the article.
  const result = existing
    ? await supabase
        .from("cms_articles")
        .update(payload)
        .eq("id", existing.id)
    : await supabase
        .from("cms_articles")
        .insert({
          ...payload,
          author_id: user.id,
        });

  // Handle database errors.
  if (result.error) {
    if (result.error.code === "23505") {
      return {
        error: "This article URL is already in use.",
      };
    }

    return {
      error: result.error.message,
    };
  }

  // Refresh the CMS dashboard and article listings.
  revalidatePath("/admin");
  revalidatePath("/admin/articles");
  revalidatePath("/articles");

  // Refresh the article's public URL.
  revalidatePath(
    `/articles/${parsed.data.slug}`
  );

  // Refresh the old URL if the article slug changed.
  if (
    existing &&
    existing.slug !== parsed.data.slug
  ) {
    revalidatePath(
      `/articles/${existing.slug}`
    );
  }

  // Refresh the article editor.
  if (existing) {
    revalidatePath(
      `/admin/articles/${existing.id}/edit`
    );
  }

  // Return to the article management page.
  redirect("/admin/articles");
}
