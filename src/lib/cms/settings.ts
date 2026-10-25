
import { createClient } from "@/lib/supabase/server";

export type WebsiteSettings = {
  id: number;
  foundation_name: string;
  tagline: string;
  description: string;
  logo_url: string | null;
  favicon_url: string | null;
  contact_email: string;
  contact_phone: string;
  whatsapp_number: string;
  address: string;
  city: string;
  country: string;
  facebook_url: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_url: string;
  tiktok_url: string;
  x_url: string;
  footer_description: string;
  copyright_text: string;
  updated_at: string;
};

export async function getWebsiteSettings():
  Promise<WebsiteSettings | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_website_settings")
    .select(
      "id, foundation_name, tagline, description, logo_url, favicon_url, contact_email, contact_phone, whatsapp_number, address, city, country, facebook_url, instagram_url, linkedin_url, youtube_url, tiktok_url, x_url, footer_description, copyright_text, updated_at"
    )
    .eq("id", 1)
    .maybeSingle();

  if (error) {
    console.error(
      "Failed to load website settings:",
      error.message
    );
    return null;
  }

  return data as WebsiteSettings | null;
}
