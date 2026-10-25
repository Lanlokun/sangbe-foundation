
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

import {
  deleteProgram,
} from "@/app/admin/(dashboard)/programs/actions";

import type { Program } from "./ProgramEditor";

export default function ProgramsTable({
  programs,
  canDelete,
}: {
  programs: Program[];
  canDelete: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!window.confirm("Delete this program permanently?")) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await deleteProgram(id);

      if (result.error) {
        setError(result.error);
      }
    });
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
              <th className="px-5 py-4">Program</th>
              <th className="px-5 py-4">Category</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {programs.map((program) => (
              <tr
                key={program.id}
                className="border-t border-[#edf1ed]"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#173b29]">
                    {program.title}
                  </p>
                  <p className="mt-1 text-xs text-[#829087]">
                    /programs/{program.slug}
                  </p>
                </td>

                <td className="px-5 py-4">
                  {program.category}
                </td>

                <td className="px-5 py-4">
                  {program.display_order}
                </td>

                <td className="px-5 py-4 capitalize">
                  {program.status}
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/programs/${program.id}/edit`}
                      className="inline-flex items-center gap-1 text-[#178f4c]"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    {canDelete && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => handleDelete(program.id)}
                        className="inline-flex items-center gap-1 text-red-600 disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {!programs.length && (
              <tr>
                <td
                  colSpan={5}
                  className="px-5 py-12 text-center text-[#75847a]"
                >
                  No programs have been created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
