
"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2, ImageIcon } from "lucide-react";

import MediaEditor from "./MediaEditor";
import { deleteMedia } from "@/app/admin/(dashboard)/gallery/actions";

type MediaItem = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  status: "draft" | "published";
};

export default function MediaGrid({
  items,
  canPublish,
  canDelete,
  currentUserId,
}: {
  items: MediaItem[];
  canPublish: boolean;
  canDelete: boolean;
  currentUserId: string;
}) {
  const [editing, setEditing] = useState<MediaItem | null>(null);
  const [deleting, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[#dce8df] bg-white p-12 text-center">
        <ImageIcon
          size={32}
          className="mx-auto text-[#178f4c]"
        />
        <p className="mt-4 text-sm text-[#75847a]">
          No gallery images have been added yet.
        </p>
      </div>
    );
  }

  if (editing) {
    return (
      <MediaEditor
        item={editing}
        canPublish={canPublish}
        onClose={() => setEditing(null)}
      />
    );
  }

  function handleDelete(id: string) {
    if (!window.confirm("Delete this media record?")) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await deleteMedia(id);

      if (result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="space-y-4">
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.image_url}
              alt={item.title}
              className="aspect-video w-full object-cover"
              loading="lazy"
            />

            <div className="space-y-3 p-4">
              <span className="text-xs font-semibold uppercase text-[#178f4c]">
                {item.category}
              </span>

              <h3 className="font-bold text-[#173b29]">
                {item.title}
              </h3>

              <span className="inline-flex rounded-full bg-[#f0f8f2] px-3 py-1 text-xs font-semibold text-[#178f4c]">
                {item.status}
              </span>

              <div className="flex gap-2 border-t border-[#edf1ed] pt-3">
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#dce8df] px-3 py-2 text-xs font-semibold"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                {canDelete && (
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => handleDelete(item.id)}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600 disabled:opacity-50"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
