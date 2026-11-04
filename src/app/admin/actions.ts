
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCMSUser } from "@/lib/admin/auth";

// ==========================================
// LOGIN
// ==========================================

export type LoginState = {
  error: string | null;
};

export async function login(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      error: "Please enter your email and password.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Invalid email or password.",
    };
  }

  const cmsUser = await getCMSUser();

  if (!cmsUser) {
    await supabase.auth.signOut();

    return {
      error: "Your account is not authorized to access the CMS.",
    };
  }

  redirect("/admin");
}

// ==========================================
// LOGOUT
// ==========================================

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/admin/login");
}

// ==========================================
// REQUEST PASSWORD RESET
// ==========================================

export type RecoveryState = {
  error: string | null;
  success: boolean;
};

export async function requestPasswordReset(
  _previousState: RecoveryState,
  formData: FormData
): Promise<RecoveryState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (!email) {
    return {
      error: "Please enter your email address.",
      success: false,
    };
  }

  const supabase = await createClient();

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "");

  const { error } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${siteUrl}/admin/reset-password`,
    }
  );
if (error) {
  console.error("Supabase recovery error:", {
    message: error.message,
    status: error.status,
    code: error.code,
  });

  return {
    error: "Unable to send the recovery email. Please try again.",
    success: false,
  };
}

  return {
    error: null,
    success: true,
  };
}

// ==========================================
// UPDATE PASSWORD
// ==========================================

export type ResetPasswordState = {
  error: string | null;
};

export async function updatePassword(
  _previousState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const password = String(
    formData.get("password") ?? ""
  );

  const confirmPassword = String(
    formData.get("confirmPassword") ?? ""
  );

  // Validate password
  if (password.length < 12) {
    return {
      error: "Password must be at least 12 characters.",
    };
  }

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match.",
    };
  }

  const supabase = await createClient();

  // Verify authenticated session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      error: "Your session has expired. Please request a new recovery link.",
    };
  }

  // Verify CMS authorization
  const cmsUser = await getCMSUser();

  if (!cmsUser) {
    return {
      error: "Your account is not authorized to manage the CMS.",
    };
  }

  // Update password
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  // Sign out after successful password update
  await supabase.auth.signOut();

  redirect("/admin/login");
}
