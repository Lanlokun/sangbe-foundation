
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");

  const loginUrl = new URL("/admin/login", url.origin);

  if (!tokenHash || type !== "invite") {
    loginUrl.searchParams.set(
      "error",
      "Invalid invitation link."
    );
    return NextResponse.redirect(loginUrl);
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: type as EmailOtpType,
  });

  if (error) {
    loginUrl.searchParams.set(
      "error",
      "Invitation link is invalid or expired."
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(
    new URL("/admin/setup-password", url.origin)
  );
}
