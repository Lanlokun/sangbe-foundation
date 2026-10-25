
import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CMSRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "contributor";

export type CMSUser = {
  id: string;
  full_name: string;
  role: CMSRole;
  is_active: boolean;
};

export async function getCMSUser(): Promise<CMSUser | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return null;

  const { data, error } = await supabase
    .from("cms_users")
    .select("id, full_name, role, is_active")
    .eq("id", user.id)
    .single();

  if (error || !data || !data.is_active) {
    return null;
  }

  return data as CMSUser;
}

export async function requireCMSUser() {
  const user = await getCMSUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}
