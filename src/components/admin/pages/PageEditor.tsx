
"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";
import {
  savePage,
  type PageActionState,
} from "@/app/admin/(dashboard)/pages/actions";

export type CMSPage = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  display_order: number;
  status: "draft" | "published";
};

const initialState: PageActionState = { error: null };

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

export default function PageEditor({
  page,
}: {
  page?: CMSPage;
}) {
  const [state, action, pending] = useActionState(
    savePage.bind(null, page?.id ?? null),
    initialState
  );

  const [title, setTitle] = useState(page?.title ?? "");
  const [slug, setSlug] = useState(page?.slug ?? "");
  const [imageUrl, setImageUrl] = useState(
    page?.cover_image_url ?? ""
  );
  const [uploading, setUploading] = useState(false);

  function updateTitle(value: string) {
    setTitle(value);

    if (!page) {
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
        href="/admin/pages"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c]"
      >
        <ArrowLeft size={17} />
        Back to Pages
      </Link>

      <h1 className="mt-5 text-3xl font-bold text-[#173b29]">
        {page ? "Edit Page" : "New Page"}
      </h1>

      <form
        action={action}
        className="mt-8 space-y-6 rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8"
      >
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-semibold">
            Page Title
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
          />
          <p className="mt-2 text-xs text-[#829087]">
            Public URL: /pages/{slug || "page-slug"}
          </p>
        </div>

        <div>
          <label htmlFor="excerpt" className="mb-2 block text-sm font-semibold">
            Short Description
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            maxLength={1000}
            defaultValue={page?.excerpt ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-semibold">
            Page Content
          </label>
          <textarea
            id="content"
            name="content"
            rows={16}
            required
            minLength={10}
            maxLength={100000}
            defaultValue={page?.content ?? ""}
            className={inputClass}
            placeholder="Write the page content here..."
          />
          <p className="mt-2 text-xs text-[#829087]">
            This version supports plain text with paragraphs and line breaks.
          </p>
        </div>

        <ImageUploader
          value={imageUrl}
          onChange={setImageUrl}
          onUploadingChange={setUploading}
          folder="pages"
          label="Cover Image"
        />
        <input
          type="hidden"
          name="cover_image_url"
          value={imageUrl}
        />

        <div className="border-t border-[#edf1ed] pt-6">
          <h2 className="mb-5 text-lg font-bold text-[#173b29]">
            Search Engine Settings
          </h2>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="seo_title"
                className="mb-2 block text-sm font-semibold"
              >
                SEO Title
              </label>
              <input
                id="seo_title"
                name="seo_title"
                maxLength={200}
                defaultValue={page?.seo_title ?? ""}
                className={inputClass}
                placeholder="Optional page title for search results"
              />
            </div>

            <div>
              <label
                htmlFor="seo_description"
                className="mb-2 block text-sm font-semibold"
              >
                SEO Description
              </label>
              <textarea
                id="seo_description"
                name="seo_description"
                rows={3}
                maxLength={500}
                defaultValue={page?.seo_description ?? ""}
                className={inputClass}
              />
            </div>
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
              defaultValue={page?.display_order ?? 0}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-semibold">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={page?.status ?? "draft"}
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

        <div className="flex justify-end border-t border-[#edf1ed] pt-6">
          <button
            type="submit"
            disabled={pending || uploading}
            className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Save size={18} />
            {pending ? "Saving..." : "Save Page"}
          </button>
        </div>
      </form>
    </div>
  );
}
