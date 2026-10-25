
"use client";

import { useActionState, useState } from "react";
import { Save } from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";
import {
  saveMedia,
  type MediaActionState,
} from "@/app/admin/(dashboard)/gallery/actions";

const initialState: MediaActionState = {
  error: null,
};

export default function MediaUploader({
  canPublish,
}: {
  canPublish: boolean;
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const [state, action, pending] = useActionState(
    saveMedia,
    initialState
  );

  return (
    <form
      action={action}
      className="space-y-5 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold text-[#173b29]">
        Add Gallery Image
      </h2>

      <div>
        <label
          htmlFor="media-title"
          className="mb-2 block text-sm font-semibold"
        >
          Image Title
        </label>

        <input
          id="media-title"
          name="title"
          required
          maxLength={200}
          className="w-full rounded-xl border border-[#dce8df] px-4 py-3"
          placeholder="Community Outreach Programme"
        />
      </div>

      <div>
        <label
          htmlFor="media-description"
          className="mb-2 block text-sm font-semibold"
        >
          Description
        </label>

        <textarea
          id="media-description"
          name="description"
          rows={3}
          className="w-full rounded-xl border border-[#dce8df] px-4 py-3"
          placeholder="Describe the photograph..."
        />
      </div>

      <div>
        <label
          htmlFor="media-category"
          className="mb-2 block text-sm font-semibold"
        >
          Category
        </label>

        <select
          id="media-category"
          name="category"
          className="w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3"
        >
          <option>Community Outreach</option>
          <option>Mental Health Awareness</option>
          <option>Drug Abuse Awareness</option>
          <option>Events</option>
          <option>Education</option>
          <option>Foundation Activities</option>
          <option>General</option>
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
        <label
          htmlFor="media-status"
          className="mb-2 block text-sm font-semibold"
        >
          Publication Status
        </label>

        <select
          id="media-status"
          name="status"
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

      <button
        type="submit"
        disabled={pending || uploading || !imageUrl}
        className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 font-semibold text-white disabled:opacity-50"
      >
        <Save size={18} />
        {uploading
          ? "Uploading..."
          : pending
            ? "Saving..."
            : "Save Image"}
      </button>
    </form>
  );
}
