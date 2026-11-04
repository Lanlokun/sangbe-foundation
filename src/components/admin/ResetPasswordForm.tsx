"use client";

import { useActionState } from "react";
import { LoaderCircle } from "lucide-react";
import { updatePassword } from "@/app/admin/actions";

export default function ResetPasswordForm() {
  const [state, action, pending] = useActionState(
    updatePassword,
    { error: null }
  );

  return (
    <form action={action} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-[#34443a]"
        >
          New password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3.5 text-sm text-[#142019] outline-none focus:border-[#178f4c]"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-semibold text-[#34443a]"
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={12}
          required
          className="w-full rounded-xl border border-[#dce6df] bg-white px-4 py-3.5 text-sm text-[#142019] outline-none focus:border-[#178f4c]"
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
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
        {pending ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}