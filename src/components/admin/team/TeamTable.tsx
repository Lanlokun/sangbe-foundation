
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2, Users } from "lucide-react";

import { deleteTeamMember } from "@/app/admin/(dashboard)/team/actions";
import type { TeamMember } from "./TeamEditor";

export default function TeamTable({
  members,
  canDelete,
}: {
  members: TeamMember[];
  canDelete: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!window.confirm("Delete this team member?")) return;

    setError(null);

    startTransition(async () => {
      const result = await deleteTeamMember(id);

      if (result.error) setError(result.error);
    });
  }

  if (!members.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#dce8df] bg-white p-12 text-center">
        <Users size={32} className="mx-auto text-[#178f4c]" />
        <p className="mt-4 text-sm text-[#75847a]">
          No team members have been added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white">
      {error && (
        <p role="alert" className="p-4 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f4f8f5] text-[#55705e]">
            <tr>
              <th className="px-5 py-4">Member</th>
              <th className="px-5 py-4">Position</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member.id} className="border-t border-[#edf1ed]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {member.photo_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={member.photo_url}
                        alt={member.full_name}
                        className="h-11 w-11 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#edf4ef]">
                        <Users size={18} className="text-[#178f4c]" />
                      </div>
                    )}

                    <span className="font-semibold text-[#173b29]">
                      {member.full_name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-4">{member.position}</td>
                <td className="px-5 py-4">{member.display_order}</td>

                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    member.status === "published"
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {member.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/team/${member.id}/edit`}
                      className="inline-flex items-center gap-1 text-[#178f4c]"
                    >
                      <Pencil size={15} />
                      Edit
                    </Link>

                    {canDelete && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => handleDelete(member.id)}
                        className="inline-flex items-center gap-1 text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
