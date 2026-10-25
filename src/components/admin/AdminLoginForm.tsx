
"use client";

import { useActionState } from "react";
import { LockKeyhole, Mail, LoaderCircle } from "lucide-react";

import { login } from "@/app/admin/actions";

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState(login, {
    error: null,
  });

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
            autoComplete="username"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-[#dce6df] bg-white py-3.5 pl-12 pr-4 text-sm text-[#142019] outline-none transition focus:border-[#178f4c] focus:ring-2 focus:ring-[#178f4c]/10"
          />
        </div>
      </div>

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
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#829087]"
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

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#10743c] disabled:opacity-60"
      >
        {pending && <LoaderCircle size={17} className="animate-spin" />}
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
