"use client";

import { useActionState } from "react";
import Link from "next/link";
import { LoaderCircle, Mail } from "lucide-react";
import { requestPasswordReset } from "@/app/admin/actions";

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    requestPasswordReset,
    { error: null, success: false }
  );

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#34443a]"
        >
          Email address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829087]"
          />

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-[#dce6df] bg-white py-3.5 pl-12 pr-4 text-sm text-[#142019] outline-none focus:border-[#178f4c]"
          />
        </div>
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" className="text-sm text-[#178f4c]">
          If an account exists for this email, a recovery
          link has been sent.
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#10743c] disabled:opacity-60"
      >
        {pending && (
          <LoaderCircle size={17} className="animate-spin" />
        )}
        {pending ? "Sending..." : "Send Recovery Link"}
      </button>

      <Link
        href="/admin/login"
        className="block text-center text-sm font-medium text-[#178f4c] hover:underline"
      >
        Back to Login
      </Link>
    </form>
  );
}