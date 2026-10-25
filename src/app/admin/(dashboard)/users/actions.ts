
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type UserActionState = {
  error: string | null;
  success?: string | null;
};

// --------------------------------------------------
// Validation schemas
// --------------------------------------------------

const updateSchema = z.object({
  user_id: z.string().uuid(),
  full_name: z.string().trim().min(2).max(200),
  role: z.enum(["admin", "editor", "contributor"]),
  is_active: z.enum(["true", "false"]),
});

const inviteSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  full_name: z.string().trim().min(2).max(200),
  role: z.enum(["admin", "editor", "contributor"]),
});

// --------------------------------------------------
// Verify current Super Admin session
// --------------------------------------------------

async function verifySuperAdmin() {
  const actor = await requireCMSUser();

  if (actor.role !== "super_admin" || !actor.is_active) {
    return {
      error: "Only an active Super Admin can manage users.",
      actor: null,
    };
  }

  const supabase = await createClient();

  const {
    data: { user: authUser },
    error,
  } = await supabase.auth.getUser();

  if (error || !authUser || authUser.id !== actor.id) {
    return {
      error: "Your session has expired. Please sign in again.",
      actor: null,
    };
  }

  return {
    error: null,
    actor,
  };
}

// --------------------------------------------------
// Update existing CMS user
// --------------------------------------------------

export async function updateCMSUser(
  _previous: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const verification = await verifySuperAdmin();

  if (verification.error || !verification.actor) {
    return {
      error: verification.error ?? "Permission denied.",
    };
  }

  const actor = verification.actor;

  const parsed = updateSchema.safeParse({
    user_id: formData.get("user_id"),
    full_name: formData.get("full_name"),
    role: formData.get("role"),
    is_active: formData.get("is_active"),
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Please check the user details.",
    };
  }

  const values = parsed.data;

  if (values.user_id === actor.id) {
    return {
      error: "You cannot modify your own account here.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.rpc("cms_manage_user", {
    p_user_id: values.user_id,
    p_full_name: values.full_name,
    p_role: values.role,
    p_is_active: values.is_active === "true",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin");

  return {
    error: null,
    success: "User account updated successfully.",
  };
}

// --------------------------------------------------
// Invite new CMS user
// --------------------------------------------------

export async function inviteCMSUser(
  _previous: UserActionState,
  formData: FormData
): Promise<UserActionState> {
  const verification = await verifySuperAdmin();

  if (verification.error || !verification.actor) {
    return {
      error: verification.error ?? "Permission denied.",
    };
  }

  const actor = verification.actor;

  const parsed = inviteSchema.safeParse({
    email: formData.get("email"),
    full_name: formData.get("full_name"),
    role: formData.get("role"),
  });

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message ??
        "Please enter a valid name, email address and role.",
    };
  }

  const { email, full_name, role } = parsed.data;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return {
      error:
        "NEXT_PUBLIC_SITE_URL is not configured. " +
        "Add it to your environment variables.",
    };
  }

  let redirectUrl: string;

  try {
    redirectUrl = new URL("/auth/callback", siteUrl).toString();
  } catch {
    return {
      error: "NEXT_PUBLIC_SITE_URL is not a valid URL.",
    };
  }

  const admin = createAdminClient();

  // Check whether a CMS profile already exists.
  const {
    data: existingProfile,
    error: profileLookupError,
  } = await admin
    .from("cms_users")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (profileLookupError) {
    return {
      error: profileLookupError.message,
    };
  }

  if (existingProfile) {
    return {
      error: "A CMS user with this email already exists.",
    };
  }

  // Check for an existing pending invitation.
  const {
    data: pendingInvitation,
    error: invitationLookupError,
  } = await admin
    .from("cms_user_invitations")
    .select("id")
    .eq("email", email)
    .eq("status", "pending")
    .maybeSingle();

  if (invitationLookupError) {
    return {
      error: invitationLookupError.message,
    };
  }

  if (pendingInvitation) {
    return {
      error: "An invitation is already pending for this email.",
    };
  }

  // Send invitation through Supabase Auth.
  const {
    data: invitation,
    error: inviteError,
  } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name,
    },
    redirectTo: redirectUrl,
  });

  if (inviteError) {
    return {
      error: inviteError.message,
    };
  }

  const invitedUser = invitation?.user;

  if (!invitedUser) {
    return {
      error:
        "Supabase did not return an invited user. " +
        "The invitation may not have been completed.",
    };
  }

  const invitedUserId = invitedUser.id;

  // Create the CMS profile for the invited user.
  const { error: cmsProfileError } = await admin
    .from("cms_users")
    .upsert(
      {
        id: invitedUserId,
        email,
        full_name,
        role,
        is_active: false,
      },
      {
        onConflict: "id",
      }
    );

  if (cmsProfileError) {
    console.error(
      "Failed to provision invited CMS user:",
      cmsProfileError
    );

    return {
      error:
        "The invitation was sent, but the CMS profile could not " +
        "be created. Check the server logs before retrying.",
    };
  }

  // Store the invitation record.
  const { error: trackingError } = await admin
    .from("cms_user_invitations")
    .insert({
      email,
      full_name,
      role,
      invited_auth_user_id: invitedUserId,
      invited_by: actor.id,
      status: "pending",
    });

  if (trackingError) {
    console.error(
      "Failed to track CMS invitation:",
      trackingError
    );

    return {
      error:
        "The invitation was sent and the CMS profile was created, " +
        "but the invitation record could not be saved. " +
        "Check the server logs.",
    };
  }

  revalidatePath("/admin/users");
  revalidatePath("/admin");

  return {
    error: null,
    success: `Invitation successfully sent to ${email}.`,
  };
}
