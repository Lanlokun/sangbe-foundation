
"use client";

import { useActionState, useState } from "react";
import { Save, X } from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";
import {
  updateMedia,
  type MediaActionState,
} from "@/app/admin/(dashboard)/gallery/actions";

type MediaItem = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  status: "draft" | "published";
};

const initialState: MediaActionState = {
  error: null,
};

export default function MediaEditor({
  item,
  canPublish,
  onClose,
}: {
  item: MediaItem;
  canPublish: boolean;
  onClose: () => void;
}) {
  const [imageUrl, setImageUrl] = useState(item.image_url);
  const [uploading, setUploading] = useState(false);

  const [state, action, pending] = useActionState(
    updateMedia.bind(null, item.id),
    initialState
  );

  return (
    <div className="rounded-2xl border border-[#dce8df] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#173b29]">
          Edit Image
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close editor"
          className="rounded-lg p-2 hover:bg-[#f4f8f5]"
        >
          <X size={20} />
        </button>
      </div>

      <form action={action} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold">
            Image Title
          </label>
          <input
            name="title"
            required
            defaultValue={item.title}
            className="w-full rounded-xl border border-[#dce8df] px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            defaultValue={item.description ?? ""}
            className="w-full rounded-xl border border-[#dce8df] px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Category
          </label>
          <select
            name="category"
            defaultValue={item.category}
            className="w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3"
          >
            {[
              "Community Outreach",
              "Mental Health Awareness",
              "Drug Abuse Awareness",
              "Events",
              "Education",
              "Foundation Activities",
              "General",
            ].map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <ImageUploader
          label="Gallery Image"
          folder="gallery"
          value={imageUrl}
          onChange={setImageUrl}
          onUploadingChange={setUploading}
        />

        <input
          type="hidden"
          name="image_url"
          value={imageUrl}
        />

        <div>
          <label className="mb-2 block text-sm font-semibold">
            Publication Status
          </label>

          <select
            name="status"
            defaultValue={item.status}
            className="w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3"
          >
            <option value="draft">Draft</option>
            {canPublish && (
              <option value="published">Published</option>
            )}
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
          disabled={pending || uploading || !imageUrl}
          className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          <Save size={18} />
          {pending ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
