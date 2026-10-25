
"use client";

import { useActionState } from "react";
import { Mail, UserPlus } from "lucide-react";

import {
  inviteCMSUser,
  type UserActionState,
} from "@/app/admin/(dashboard)/users/actions";

const initialState: UserActionState = {
  error: null,
  success: null,
};

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

export default function InviteUserForm() {
  const [state, action, pending] = useActionState(
    inviteCMSUser,
    initialState
  );

  return (
    <form
      action={action}
      className="space-y-5 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <UserPlus size={22} className="text-[#178f4c]" />

        <div>
          <h2 className="text-xl font-bold text-[#173b29]">
            Invite CMS User
          </h2>
          <p className="mt-1 text-sm text-[#75847a]">
            Invite a staff member to access the CMS.
          </p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="invite_full_name"
            className="mb-2 block text-sm font-semibold"
          >
            Full Name
          </label>
          <input
            id="invite_full_name"
            name="full_name"
            required
            minLength={2}
            maxLength={200}
            className={inputClass}
            placeholder="Staff member's name"
          />
        </div>

        <div>
          <label
            htmlFor="invite_email"
            className="mb-2 block text-sm font-semibold"
          >
            Email Address
          </label>
          <input
            id="invite_email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="staff@example.com"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="invite_role"
          className="mb-2 block text-sm font-semibold"
        >
          Initial Role
        </label>

        <select
          id="invite_role"
          name="role"
          defaultValue="contributor"
          className={inputClass}
        >
          <option value="contributor">Contributor</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" className="text-sm text-green-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        <Mail size={18} />
        {pending ? "Sending Invitation..." : "Send Invitation"}
      </button>
    </form>
  );
}
