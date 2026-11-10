
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  const supabase = await createClient();

  // Handle PKCE authorization code
  if (code) {
    const { error } =
      await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Auth callback error:", error.message);

      return NextResponse.redirect(
        new URL("/admin/login?error=expired_invitation", origin)
      );
    }

    return NextResponse.redirect(
      new URL("/admin/setup-password", origin)
    );
  }

  // Handle email token-hash verification
  if (tokenHash && type) {
    const allowedTypes: EmailOtpType[] = [
      "invite",
      "recovery",
      "signup",
      "email",
      "email_change",
      "magiclink",
    ];

    if (!allowedTypes.includes(type as EmailOtpType)) {
      return NextResponse.redirect(
        new URL("/admin/login?error=invalid_invitation", origin)
      );
    }

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    });

    if (error) {
      console.error("Token verification error:", error.message);

      return NextResponse.redirect(
        new URL("/admin/login?error=expired_invitation", origin)
      );
    }

    const destination =
      type === "recovery"
        ? "/admin/reset-password"
        : "/admin/setup-password";

    return NextResponse.redirect(
      new URL(destination, origin)
    );
  }

  // No valid authentication parameters
  return NextResponse.redirect(
    new URL("/admin/login?error=invalid_invitation", origin)
  );
}
