
"use client";

import { useActionState, useState } from "react";
import {
  Search,
  ShieldCheck,
  Pencil,
  X,
  UserRound,
} from "lucide-react";

import {
  updateCMSUser,
  type UserActionState,
} from "@/app/admin/(dashboard)/users/actions";

export type ManagedUser = {
  id: string;
  full_name: string;
  role: "super_admin" | "admin" | "editor" | "contributor";
  is_active: boolean;
};

const initialState: UserActionState = {
  error: null,
};

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

const roleLabels = {
  super_admin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  contributor: "Contributor",
};

function UserEditor({ user }: { user: ManagedUser }) {
  const [state, action, pending] = useActionState(
    updateCMSUser,
    initialState
  );

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="user_id" value={user.id} />

      <div>
        <label
          htmlFor="full_name"
          className="mb-2 block text-sm font-semibold"
        >
          Full Name
        </label>

        <input
          id="full_name"
          name="full_name"
          defaultValue={user.full_name}
          required
          minLength={2}
          maxLength={200}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm font-semibold"
        >
          CMS Role
        </label>

        <select
          id="role"
          name="role"
          defaultValue={user.role}
          className={inputClass}
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="contributor">Contributor</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="is_active"
          className="mb-2 block text-sm font-semibold"
        >
          Account Status
        </label>

        <select
          id="is_active"
          name="is_active"
          defaultValue={String(user.is_active)}
          className={inputClass}
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
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
        className="rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}

export default function UsersTable({
  users,
}: {
  users: ManagedUser[];
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ManagedUser | null>(
    null
  );

  const filtered = users.filter((user) =>
    `${user.full_name} ${user.role}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <Search
          size={18}
          className="absolute left-4 top-3.5 text-[#829087]"
        />

        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search CMS users..."
          aria-label="Search CMS users"
          className={`${inputClass} pl-11`}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f4f8f5] text-[#55705e]">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-[#edf1ed]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf4ef] text-[#178f4c]">
                        <UserRound size={19} />
                      </div>

                      <p className="font-semibold text-[#173b29]">
                        {user.full_name}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2">
                      {user.role === "super_admin" && (
                        <ShieldCheck
                          size={16}
                          className="text-[#178f4c]"
                        />
                      )}

                      {roleLabels[user.role]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        user.is_active
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {user.role !== "super_admin" ? (
                      <button
                        type="button"
                        onClick={() => setSelected(user)}
                        className="inline-flex items-center gap-2 font-semibold text-[#178f4c]"
                      >
                        <Pencil size={16} />
                        Manage
                      </button>
                    ) : (
                      <span className="text-xs text-[#829087]">
                        Protected
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-[#75847a]"
                  >
                    No CMS users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="user-dialog-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase text-[#178f4c]">
                  User Management
                </p>

                <h2
                  id="user-dialog-title"
                  className="mt-2 text-2xl font-bold text-[#173b29]"
                >
                  {selected.full_name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close user editor"
                className="rounded-lg p-2 hover:bg-[#f4f8f5]"
              >
                <X size={20} />
              </button>
            </div>

            <UserEditor key={selected.id} user={selected} />
          </div>
        </div>
      )}
    </div>
  );
}
