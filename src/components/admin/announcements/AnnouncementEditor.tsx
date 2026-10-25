
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import {
  saveAnnouncement,
  type AnnouncementActionState,
} from "@/app/admin/(dashboard)/announcements/actions";

export type Announcement = {
  id: string;
  title: string;
  message: string;
  priority: "normal" | "important" | "urgent";
  status: "draft" | "published";
  expires_at: string | null;
};

const initialState: AnnouncementActionState = {
  error: null,
};

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

export default function AnnouncementEditor({
  announcement,
  canPublish,
}: {
  announcement?: Announcement;
  canPublish: boolean;
}) {
  const [state, action, pending] = useActionState(
    saveAnnouncement.bind(null, announcement?.id ?? null),
    initialState
  );

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/announcements"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c]"
      >
        <ArrowLeft size={17} />
        Back to Announcements
      </Link>

      <h1 className="mt-5 text-3xl font-bold text-[#173b29]">
        {announcement ? "Edit Announcement" : "New Announcement"}
      </h1>

      <form
        action={action}
        className="mt-8 space-y-6 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold">
            Title
          </label>
          <input
            id="title"
            name="title"
            required
            minLength={3}
            maxLength={200}
            defaultValue={announcement?.title ?? ""}
            className={inputClass}
            placeholder="Important community announcement"
          />
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold">
            Announcement Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={9}
            required
            minLength={5}
            maxLength={10000}
            defaultValue={announcement?.message ?? ""}
            className={inputClass}
            placeholder="Write the announcement..."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="priority" className="mb-2 block text-sm font-semibold">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              defaultValue={announcement?.priority ?? "normal"}
              className={inputClass}
            >
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-semibold">
              Publication Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={announcement?.status ?? "draft"}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              {canPublish && (
                <option value="published">Published</option>
              )}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="expires_at" className="mb-2 block text-sm font-semibold">
            Expiry Date (optional)
          </label>
          <input
            id="expires_at"
            name="expires_at"
            type="datetime-local"
            defaultValue={
              announcement?.expires_at
                ? announcement.expires_at.slice(0, 16)
                : ""
            }
            className={inputClass}
          />
          <p className="mt-2 text-xs text-[#829087]">
            The announcement will stop appearing publicly after this date.
          </p>
        </div>

        {state.error && (
          <p role="alert" className="text-sm text-red-600">
            {state.error}
          </p>
        )}

        <div className="flex justify-end border-t border-[#e3ebe5] pt-6">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Save size={18} />
            {pending ? "Saving..." : "Save Announcement"}
          </button>
        </div>
      </form>
    </div>
  );
}
