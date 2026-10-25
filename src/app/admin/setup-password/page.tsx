
"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";

import {
  setupPassword,
  type SetupPasswordState,
} from "./actions";

const initialState: SetupPasswordState = {
  error: null,
};

export default function SetupPasswordPage() {
  const [state, action, pending] = useActionState(
    setupPassword,
    initialState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f8f6] px-5 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#e3ebe5] bg-white p-8 shadow-sm">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6ed]">
          <LockKeyhole
            size={24}
            className="text-[#178f4c]"
          />
        </div>

        <h1 className="text-2xl font-bold text-[#173b29]">
          Set Up Your Account
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#75847a]">
          Create a password to activate your Sangbe
          Foundation CMS account.
        </p>

        <form action={action} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={12}
              required
              className="w-full rounded-xl border border-[#dce8df] px-4 py-3 text-sm outline-none focus:border-[#178f4c]"
            />
          </div>

          <div>
            <label
              htmlFor="confirm_password"
              className="mb-2 block text-sm font-semibold"
            >
              Confirm Password
            </label>

            <input
              id="confirm_password"
              name="confirm_password"
              type="password"
              autoComplete="new-password"
              minLength={12}
              required
              className="w-full rounded-xl border border-[#dce8df] px-4 py-3 text-sm outline-none focus:border-[#178f4c]"
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
            className="w-full rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            {pending ? "Activating Account..." : "Activate Account"}
          </button>
        </form>
      </div>
    </main>
  );
}
