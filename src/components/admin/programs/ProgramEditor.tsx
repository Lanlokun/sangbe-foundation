
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";

import {
  saveProgram,
  type ProgramActionState,
} from "@/app/admin/(dashboard)/programs/actions";

export type Program = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  category: string;
  cover_image_url: string | null;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  display_order: number;
  status: "draft" | "published";
};

const initialState: ProgramActionState = {
  error: null,
};

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

export default function ProgramEditor({
  program,
}: {
  program?: Program;
}) {
  const [state, action, pending] = useActionState(
    saveProgram.bind(null, program?.id ?? null),
    initialState
  );

  const [title, setTitle] = useState(program?.title ?? "");
  const [slug, setSlug] = useState(program?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(
    program?.cover_image_url ?? ""
  );
  const [uploading, setUploading] = useState(false);

  function updateTitle(value: string) {
    setTitle(value);

    if (!program) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      );
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/admin/programs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c]"
      >
        <ArrowLeft size={17} />
        Back to Programs
      </Link>

      <h1 className="mt-5 text-3xl font-bold text-[#173b29]">
        {program ? "Edit Program" : "New Program"}
      </h1>

      <form
        action={action}
        className="mt-8 space-y-6 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold">
            Program Title
          </label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={(event) => updateTitle(event.target.value)}
            required
            minLength={3}
            maxLength={200}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-2 block text-sm font-semibold">
            URL Slug
          </label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
            className={inputClass}
            placeholder="community-health-outreach"
          />
        </div>

        <div>
          <label htmlFor="summary" className="mb-2 block text-sm font-semibold">
            Short Summary
          </label>
          <textarea
            id="summary"
            name="summary"
            rows={3}
            required
            minLength={10}
            maxLength={1000}
            defaultValue={program?.summary ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-semibold"
          >
            Full Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={10}
            maxLength={20000}
            defaultValue={program?.description ?? ""}
            className={inputClass}
          />
        </div>

        <ImageUploader
          value={imageUrl}
          onChange={setImageUrl}
          onUploadingChange={setUploading}
          folder="programs"
          label="Program Cover Image"
        />

        <input
          type="hidden"
          name="cover_image_url"
          value={imageUrl}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={
                program?.category ?? "Community Development"
              }
              className={inputClass}
            >
              <option>Community Development</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Mental Health</option>
              <option>Youth Empowerment</option>
              <option>Women Empowerment</option>
              <option>Humanitarian Assistance</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-semibold"
            >
              Location
            </label>
            <input
              id="location"
              name="location"
              defaultValue={program?.location ?? ""}
              maxLength={200}
              className={inputClass}
              placeholder="The Gambia"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="start_date"
              className="mb-2 block text-sm font-semibold"
            >
              Start Date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              defaultValue={program?.start_date ?? ""}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="end_date"
              className="mb-2 block text-sm font-semibold"
            >
              End Date
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              defaultValue={program?.end_date ?? ""}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="display_order"
              className="mb-2 block text-sm font-semibold"
            >
              Display Order
            </label>
            <input
              id="display_order"
              name="display_order"
              type="number"
              min={0}
              max={10000}
              defaultValue={program?.display_order ?? 0}
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block text-sm font-semibold"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={program?.status ?? "draft"}
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
            {pending ? "Saving..." : "Save Program"}
          </button>
        </div>
      </form>
    </div>
  );
}
