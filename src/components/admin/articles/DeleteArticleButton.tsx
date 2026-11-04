
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, LoaderCircle } from "lucide-react";

import { deleteArticle } from "@/app/admin/(dashboard)/articles/actions";

type Props = {
  id: string;
  title: string;
};

export default function DeleteArticleButton({
  id,
  title,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${title}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    setError(null);

    startTransition(async () => {
      try {
        const result = await deleteArticle(id);

        if (result.error) {
          setError(result.error);
          return;
        }

        router.refresh();
      } catch {
        setError("Unable to delete article. Please try again.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
        aria-label={`Delete ${title}`}
      >
        {pending ? (
          <LoaderCircle
            size={16}
            className="animate-spin"
          />
        ) : (
          <Trash2 size={16} />
        )}

        {pending ? "Deleting..." : "Delete"}
      </button>

      {error && (
        <p role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
