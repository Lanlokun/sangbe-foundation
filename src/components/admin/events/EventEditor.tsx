
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  CalendarDays,
  MapPin,
  Link2,
  FileText,
} from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";

import {
  saveEvent,
  type EventActionState,
} from "@/app/admin/(dashboard)/events/actions";

type EventRecord = {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string | null;
  start_date: string;
  end_date: string | null;
  cover_image_url: string | null;
  registration_url: string | null;
  status: "draft" | "published";
};

type Props = {
  event?: EventRecord;
  canPublish: boolean;
};

const initialState: EventActionState = {
  error: null,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function toLocalDateTime(value?: string | null): string {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const local = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000
  );

  return local.toISOString().slice(0, 16);
}

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm text-[#173b29] outline-none transition placeholder:text-[#9aa89f] focus:border-[#178f4c] focus:ring-2 focus:ring-[#178f4c]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#173b29]";

export default function EventEditor({
  event,
  canPublish,
}: Props) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [slug, setSlug] = useState(event?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(event));

  const [status, setStatus] = useState<"draft" | "published">(
    event?.status ?? "draft"
  );

  // Stores the uploaded image's Supabase public URL.
  const [coverImage, setCoverImage] = useState(
    event?.cover_image_url ?? ""
  );

  // Tracks the uploader's activity to prevent premature form submission.
  const [imageUploading, setImageUploading] = useState(false);

  const [state, action, pending] = useActionState(
    saveEvent.bind(null, event?.id ?? null),
    initialState
  );

  return (
    <div className="mx-auto max-w-4xl pb-12">
      {/* Back navigation */}
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] transition hover:text-[#10733b]"
      >
        <ArrowLeft size={17} />
        Back to Events
      </Link>

      {/* Page heading */}
      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
          Events Management
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#173b29]">
          {event ? "Edit Event" : "Create Event"}
        </h1>

        <p className="mt-2 text-sm leading-7 text-[#75847a]">
          Manage Foundation activities, campaigns, community events
          and awareness programmes.
        </p>
      </div>

      {/* Event form */}
      <form
        action={action}
        className="mt-8 space-y-8 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8"
      >
        {/* Basic information */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-[#edf1ed] pb-4">
            <FileText size={20} className="text-[#178f4c]" />

            <h2 className="text-lg font-bold text-[#173b29]">
              Event Information
            </h2>
          </div>

          {/* Title */}
          <div>
            <label htmlFor="title" className={labelClass}>
              Event Title <span className="text-red-500">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={200}
              value={title}
              onChange={(e) => {
                const nextTitle = e.target.value;

                setTitle(nextTitle);

                if (!slugEdited) {
                  setSlug(slugify(nextTitle));
                }
              }}
              className={inputClass}
              placeholder="Community Health Awareness Day"
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className={labelClass}>
              Event URL <span className="text-red-500">*</span>
            </label>

            <input
              id="slug"
              name="slug"
              type="text"
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(slugify(e.target.value));
              }}
              className={inputClass}
              placeholder="community-health-awareness-day"
            />

            <p className="mt-2 text-xs text-[#829087]">
              This determines the event&apos;s public website URL.
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Event Description <span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              required
              minLength={10}
              rows={7}
              defaultValue={event?.description ?? ""}
              className={inputClass}
              placeholder="Describe the event, its purpose, activities and expected outcomes..."
            />

            <p className="mt-2 text-xs text-[#829087]">
              Include relevant information about the event and
              who should attend.
            </p>
          </div>
        </section>

        {/* Event schedule */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-[#edf1ed] pb-4">
            <CalendarDays
              size={20}
              className="text-[#178f4c]"
            />

            <h2 className="text-lg font-bold text-[#173b29]">
              Date & Location
            </h2>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className={labelClass}>
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} />
                Event Location
              </span>
            </label>

            <input
              id="location"
              name="location"
              type="text"
              maxLength={250}
              defaultValue={event?.location ?? ""}
              className={inputClass}
              placeholder="Banjul, The Gambia"
            />
          </div>

          {/* Dates */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="start_date" className={labelClass}>
                Start Date & Time{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="start_date"
                name="start_date"
                type="datetime-local"
                required
                defaultValue={toLocalDateTime(event?.start_date)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="end_date" className={labelClass}>
                End Date & Time
              </label>

              <input
                id="end_date"
                name="end_date"
                type="datetime-local"
                defaultValue={toLocalDateTime(event?.end_date)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Event cover image */}
        <section className="space-y-5">
          <div className="border-b border-[#edf1ed] pb-4">
            <h2 className="text-lg font-bold text-[#173b29]">
              Event Cover Image
            </h2>

            <p className="mt-2 text-sm text-[#829087]">
              Upload an image to represent this event on the website.
            </p>
          </div>

          <ImageUploader
            label="Upload Cover Image"
            folder="events"
            value={coverImage}
            onChange={setCoverImage}
            onUploadingChange={setImageUploading}
          />

          {/* The server action reads this value when saving. */}
          <input
            type="hidden"
            name="cover_image_url"
            value={coverImage}
          />
        </section>

        {/* Registration */}
        <section className="space-y-5">
          <div className="flex items-center gap-3 border-b border-[#edf1ed] pb-4">
            <Link2
              size={20}
              className="text-[#178f4c]"
            />

            <h2 className="text-lg font-bold text-[#173b29]">
              Registration
            </h2>
          </div>

          <div>
            <label htmlFor="registration_url" className={labelClass}>
              Registration URL
            </label>

            <input
              id="registration_url"
              name="registration_url"
              type="url"
              defaultValue={event?.registration_url ?? ""}
              className={inputClass}
              placeholder="https://..."
            />

            <p className="mt-2 text-xs text-[#829087]">
              Optional. Add a registration link if attendees
              need to sign up for this event.
            </p>
          </div>
        </section>

        {/* Publication settings */}
        <section className="space-y-5">
          <div className="border-b border-[#edf1ed] pb-4">
            <h2 className="text-lg font-bold text-[#173b29]">
              Publication Settings
            </h2>

            <p className="mt-2 text-sm text-[#829087]">
              Control whether this event is saved as a draft
              or published.
            </p>
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Publication Status
            </label>

            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "draft" | "published"
                )
              }
              className={`${inputClass} sm:max-w-xs`}
            >
              <option value="draft">Draft</option>

              {canPublish && (
                <option value="published">
                  Published
                </option>
              )}
            </select>

            <p className="mt-2 text-xs text-[#829087]">
              {status === "published"
                ? "This event will be available to the public once the website's events section is connected to the CMS."
                : "This event will remain unpublished until an authorized staff member publishes it."}
            </p>
          </div>
        </section>

        {/* Error message */}
        {state.error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
          >
            {state.error}
          </div>
        )}

        {/* Form actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#e3ebe5] pt-6">
          <Link
            href="/admin/events"
            className="rounded-xl border border-[#dce8df] px-5 py-3 text-sm font-semibold text-[#55705e] transition hover:bg-[#f4f8f5]"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={pending || imageUploading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10733b] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={18} />

            {imageUploading
              ? "Uploading image..."
              : pending
                ? "Saving event..."
                : event
                  ? "Save Changes"
                  : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
