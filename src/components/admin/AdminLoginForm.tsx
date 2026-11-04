
"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  LockKeyhole,
  Mail,
  LoaderCircle,
} from "lucide-react";

import { login } from "@/app/admin/actions";

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(login, {
    error: null,
  });

  return (
    <form action={action} className="space-y-5">
      {/* Email Address */}
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
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#829087]"
          />

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="username"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-[#dce6df] bg-white py-3.5 pl-12 pr-4 text-sm text-[#142019] outline-none transition focus:border-[#178f4c] focus:ring-2 focus:ring-[#178f4c]/10"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-[#34443a]"
        >
          Password
        </label>

        <div className="relative">
          <LockKeyhole
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#829087]"
          />

          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            className="w-full rounded-xl border border-[#dce6df] bg-white py-3.5 pl-12 pr-4 text-sm text-[#142019] outline-none transition focus:border-[#178f4c] focus:ring-2 focus:ring-[#178f4c]/10"
          />
        </div>
      </div>

      {/* Forgot Password */}
      <div className="text-right">
        <Link
          href="/admin/forgot-password"
          className="text-sm font-semibold text-[#178f4c] transition hover:text-[#10743c] hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Authentication Error */}
      {state.error && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {state.error}
        </div>
      )}

      {/* Sign In Button */}
      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#10743c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending && (
          <LoaderCircle
            size={17}
            className="animate-spin"
          />
        )}

        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
