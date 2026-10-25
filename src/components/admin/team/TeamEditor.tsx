
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";
import {
  saveTeamMember,
  type TeamActionState,
} from "@/app/admin/(dashboard)/team/actions";

export type TeamMember = {
  id: string;
  full_name: string;
  position: string;
  biography: string | null;
  photo_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  facebook_url: string | null;
  display_order: number;
  status: "draft" | "published";
};

const initialState: TeamActionState = { error: null };

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

export default function TeamEditor({
  member,
}: {
  member?: TeamMember;
}) {
  const [photoUrl, setPhotoUrl] = useState(member?.photo_url ?? "");
  const [uploading, setUploading] = useState(false);

  const [state, action, pending] = useActionState(
    saveTeamMember.bind(null, member?.id ?? null),
    initialState
  );

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/team"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c]"
      >
        <ArrowLeft size={17} />
        Back to Team
      </Link>

      <h1 className="mt-5 text-3xl font-bold text-[#173b29]">
        {member ? "Edit Team Member" : "Add Team Member"}
      </h1>

      <p className="mt-2 text-sm text-[#75847a]">
        Manage Foundation leadership, staff and volunteer profiles.
      </p>

      <form
        action={action}
        className="mt-8 space-y-6 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="full_name" className="mb-2 block text-sm font-semibold">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            required
            minLength={2}
            maxLength={200}
            defaultValue={member?.full_name ?? ""}
            className={inputClass}
            placeholder="Full name"
          />
        </div>

        <div>
          <label htmlFor="position" className="mb-2 block text-sm font-semibold">
            Position / Role
          </label>
          <input
            id="position"
            name="position"
            required
            maxLength={200}
            defaultValue={member?.position ?? ""}
            className={inputClass}
            placeholder="Executive Director"
          />
        </div>

        <div>
          <label htmlFor="biography" className="mb-2 block text-sm font-semibold">
            Biography
          </label>
          <textarea
            id="biography"
            name="biography"
            rows={5}
            maxLength={5000}
            defaultValue={member?.biography ?? ""}
            className={inputClass}
            placeholder="Brief professional biography..."
          />
        </div>

        <ImageUploader
          label="Profile Photograph"
          folder="team"
          value={photoUrl}
          onChange={setPhotoUrl}
          onUploadingChange={setUploading}
        />

        <input
          type="hidden"
          name="photo_url"
          value={photoUrl}
        />

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={member?.email ?? ""}
            className={inputClass}
            placeholder="name@example.org"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="linkedin_url" className="mb-2 block text-sm font-semibold">
              LinkedIn URL
            </label>
            <input
              id="linkedin_url"
              name="linkedin_url"
              type="url"
              defaultValue={member?.linkedin_url ?? ""}
              className={inputClass}
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          <div>
            <label htmlFor="facebook_url" className="mb-2 block text-sm font-semibold">
              Facebook URL
            </label>
            <input
              id="facebook_url"
              name="facebook_url"
              type="url"
              defaultValue={member?.facebook_url ?? ""}
              className={inputClass}
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="display_order" className="mb-2 block text-sm font-semibold">
              Display Order
            </label>
            <input
              id="display_order"
              name="display_order"
              type="number"
              min={0}
              max={10000}
              defaultValue={member?.display_order ?? 0}
              className={inputClass}
            />
            <p className="mt-2 text-xs text-[#829087]">
              Lower numbers appear first.
            </p>
          </div>

          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-semibold">
              Publication Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={member?.status ?? "draft"}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        {state.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}

        <div className="flex justify-end border-t border-[#e3ebe5] pt-6">
          <button
            type="submit"
            disabled={pending || uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Save size={18} />
            {uploading
              ? "Uploading photo..."
              : pending
                ? "Saving..."
                : "Save Team Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
