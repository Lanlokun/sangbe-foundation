
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const optionalUrl = z.union([
  z.literal(""),
  z.string().url().refine(
    (value) =>
      value.startsWith("https://") ||
      value.startsWith("http://"),
    "Use an HTTP or HTTPS URL."
  ),
]);

const schema = z.object({
  foundation_name: z.string().trim().min(2).max(200),
  tagline: z.string().trim().max(300),
  description: z.string().trim().max(3000),

  logo_url: optionalUrl,
  favicon_url: optionalUrl,

  contact_email: z.union([
    z.literal(""),
    z.string().trim().email(),
  ]),

  contact_phone: z.string().trim().max(50),
  whatsapp_number: z.string().trim().max(50),

  address: z.string().trim().max(500),
  city: z.string().trim().max(100),
  country: z.string().trim().max(100),

  facebook_url: optionalUrl,
  instagram_url: optionalUrl,
  linkedin_url: optionalUrl,
  youtube_url: optionalUrl,
  tiktok_url: optionalUrl,
  x_url: optionalUrl,

  footer_description: z.string().trim().max(2000),
  copyright_text: z.string().trim().max(300),
});

export type SettingsActionState = {
  error: string | null;
  success?: string | null;
};

export async function updateWebsiteSettings(
  _previous: SettingsActionState,
  formData: FormData
): Promise<SettingsActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    return {
      error: "Only administrators can update website settings.",
    };
  }

  const fields = [
    "foundation_name",
    "tagline",
    "description",
    "logo_url",
    "favicon_url",
    "contact_email",
    "contact_phone",
    "whatsapp_number",
    "address",
    "city",
    "country",
    "facebook_url",
    "instagram_url",
    "linkedin_url",
    "youtube_url",
    "tiktok_url",
    "x_url",
    "footer_description",
    "copyright_text",
  ] as const;

  const values = Object.fromEntries(
    fields.map((field) => [
      field,
      formData.get(field) ?? "",
    ])
  );

  const parsed = schema.safeParse(values);

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Please check the website settings.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || authUser.id !== user.id) {
    return { error: "Your session has expired." };
  }

  const { data, error } = await supabase
    .from("cms_website_settings")
    .update({
      ...parsed.data,
      logo_url: parsed.data.logo_url || null,
      favicon_url: parsed.data.favicon_url || null,
      updated_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1)
    .select("id")
    .single();

  if (error || !data) {
    return {
      error:
        error?.message ??
        "Settings record not found or update not permitted.",
    };
  }

  revalidatePath("/admin/settings");
  revalidatePath("/");

  return {
    error: null,
    success: "Website settings saved successfully.",
  };
}
