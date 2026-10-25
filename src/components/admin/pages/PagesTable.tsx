
"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";

import {
  deletePage,
} from "@/app/admin/(dashboard)/pages/actions";
import type { CMSPage } from "./PageEditor";

export default function PagesTable({
  pages,
  canDelete,
}: {
  pages: CMSPage[];
  canDelete: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (!window.confirm("Delete this page permanently?")) return;

    setError(null);

    startTransition(async () => {
      const result = await deletePage(id);
      if (result.error) setError(result.error);
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
              <th className="px-5 py-4">Page</th>
              <th className="px-5 py-4">Order</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr
                key={page.id}
                className="border-t border-[#edf1ed]"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-[#173b29]">
                    {page.title}
                  </p>
                  <p className="mt-1 text-xs text-[#829087]">
                    /pages/{page.slug}
                  </p>
                </td>
                <td className="px-5 py-4">{page.display_order}</td>
                <td className="px-5 py-4 capitalize">{page.status}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/pages/${page.id}/edit`}
                      className="inline-flex items-center gap-1 text-[#178f4c]"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    {page.status === "published" && (
                      <Link
                        href={`/pages/${page.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[#55705e]"
                      >
                        <ExternalLink size={16} />
                        View
                      </Link>
                    )}

                    {canDelete && (
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => handleDelete(page.id)}
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

            {!pages.length && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-12 text-center text-[#75847a]"
                >
                  No pages have been created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
