
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

const optionalUrl = z.union([
  z.literal(""),
  z.string().trim().url().refine(
    (url) => /^https?:\/\//i.test(url),
    "Enter a valid HTTP(S) URL."
  ),
]);

const schema = z.object({
  full_name: z.string().trim().min(2).max(200),
  position: z.string().trim().min(2).max(200),
  biography: z.string().trim().max(5000),
  photo_url: optionalUrl,
  email: z.union([
    z.literal(""),
    z.string().trim().email(),
  ]),
  linkedin_url: optionalUrl,
  facebook_url: optionalUrl,
  display_order: z.coerce.number().int().min(0).max(10000),
  status: z.enum(["draft", "published"]),
});

export type TeamActionState = {
  error: string | null;
};

function refreshTeam() {
  revalidatePath("/admin");
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/about");
}

export async function saveTeamMember(
  id: string | null,
  _previous: TeamActionState,
  formData: FormData
): Promise<TeamActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin", "editor"].includes(user.role)) {
    return { error: "You cannot manage team members." };
  }

  const parsed = schema.safeParse({
    full_name: formData.get("full_name"),
    position: formData.get("position"),
    biography: formData.get("biography") || "",
    photo_url: formData.get("photo_url") || "",
    email: formData.get("email") || "",
    linkedin_url: formData.get("linkedin_url") || "",
    facebook_url: formData.get("facebook_url") || "",
    display_order: formData.get("display_order") || "0",
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { error: "Please check the team member fields." };
  }

  const supabase = await createClient();

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser || authUser.id !== user.id) {
    return { error: "Your session has expired." };
  }

  const payload = {
    full_name: parsed.data.full_name,
    position: parsed.data.position,
    biography: parsed.data.biography || null,
    photo_url: parsed.data.photo_url || null,
    email: parsed.data.email || null,
    linkedin_url: parsed.data.linkedin_url || null,
    facebook_url: parsed.data.facebook_url || null,
    display_order: parsed.data.display_order,
    status: parsed.data.status,
    updated_at: new Date().toISOString(),
  };

  if (id) {
    const { data, error } = await supabase
      .from("cms_team_members")
      .update(payload)
      .eq("id", id)
      .select("id")
      .single();

    if (error || !data) {
      return {
        error: error?.message || "Team member not found.",
      };
    }
  } else {
    const { error } = await supabase
      .from("cms_team_members")
      .insert({
        ...payload,
        created_by: user.id,
      });

    if (error) {
      return { error: error.message };
    }
  }

  refreshTeam();
  redirect("/admin/team");
}

export async function deleteTeamMember(
  id: string
): Promise<TeamActionState> {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    return { error: "Only administrators can delete team members." };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_team_members")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error || !data) {
    return {
      error: error?.message || "Team member not found.",
    };
  }

  refreshTeam();
  return { error: null };
}
