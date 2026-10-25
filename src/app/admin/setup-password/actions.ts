
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type SetupPasswordState = {
  error: string | null;
};

export async function setupPassword(
  _previous: SetupPasswordState,
  formData: FormData
): Promise<SetupPasswordState> {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(
    formData.get("confirm_password") ?? ""
  );

  if (password.length < 12) {
    return {
      error: "Password must contain at least 12 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Your invitation session has expired.",
    };
  }

  // Verify that this user has a pending invitation.
  const { data: invitation, error: invitationError } =
    await supabase
      .from("cms_user_invitations")
      .select("id")
      .eq("invited_auth_user_id", user.id)
      .eq("status", "pending")
      .maybeSingle();

  if (invitationError || !invitation) {
    return {
      error: "No pending invitation was found for your account.",
    };
  }

  const { error: passwordError } =
    await supabase.auth.updateUser({
      password,
    });

  if (passwordError) {
    return { error: passwordError.message };
  }

  const { error: activationError } = await supabase.rpc(
    "cms_complete_invitation"
  );

  if (activationError) {
    return {
      error:
        "Your password was saved, but account activation failed: " +
        activationError.message,
    };
  }

  redirect("/admin");
}
