
"use client";

import {
  useActionState,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import {
  useEditor,
  EditorContent,
  useEditorState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Save,
  ArrowLeft,
  FileText,
  ImageIcon,
} from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";

import {
  saveArticle,
  type ArticleActionState,
} from "@/app/admin/(dashboard)/articles/actions";

import type { Article } from "@/types/cms";

type Props = {
  article?: Article;
  canPublish: boolean;
};

const initialState: ArticleActionState = {
  error: null,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm text-[#173b29] outline-none transition placeholder:text-[#9aa89f] focus:border-[#178f4c] focus:ring-2 focus:ring-[#178f4c]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#173b29]";

export default function ArticleEditor({
  article,
  canPublish,
}: Props) {
  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(article));

  const [status, setStatus] = useState<"draft" | "published">(
    article?.status ?? "draft"
  );

  // Image upload state
  const [coverImage, setCoverImage] = useState(
    article?.cover_image_url ?? ""
  );

  const [imageUploading, setImageUploading] = useState(false);

  // Used to synchronize the latest TipTap document
  // with the hidden form field before submission.
  const contentInputRef = useRef<HTMLInputElement>(null);

  const [state, action, pending] = useActionState(
    saveArticle.bind(null, article?.id ?? null),
    initialState
  );

  const editor = useEditor({
    extensions: [StarterKit],

    content: article?.content ?? {
      type: "doc",
      content: [{ type: "paragraph" }],
    },

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[320px] p-5 outline-none leading-7 text-[#244633] " +
          "[&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:text-xl [&_h2]:font-bold " +
          "[&_p]:mb-3 " +
          "[&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6 " +
          "[&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 " +
          "[&_li]:mb-1",
      },
    },

    onUpdate: ({ editor }) => {
      // Keep the submitted form value synchronized
      // with the latest rich-text content.
      if (contentInputRef.current) {
        contentInputRef.current.value = JSON.stringify(
          editor.getJSON()
        );
      }
    },
  });

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      heading: editor?.isActive("heading", { level: 2 }) ?? false,
      bulletList: editor?.isActive("bulletList") ?? false,
      orderedList: editor?.isActive("orderedList") ?? false,
    }),
  });

  function syncEditorContent() {
    if (!editor || !contentInputRef.current) return;

    contentInputRef.current.value = JSON.stringify(
      editor.getJSON()
    );
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Bold",
      run: () => editor?.chain().focus().toggleBold().run(),
      active: editorState?.bold ?? false,
    },
    {
      icon: Italic,
      label: "Italic",
      run: () => editor?.chain().focus().toggleItalic().run(),
      active: editorState?.italic ?? false,
    },
    {
      icon: Heading2,
      label: "Heading",
      run: () =>
        editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editorState?.heading ?? false,
    },
    {
      icon: List,
      label: "Bullet List",
      run: () =>
        editor?.chain().focus().toggleBulletList().run(),
      active: editorState?.bulletList ?? false,
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      run: () =>
        editor?.chain().focus().toggleOrderedList().run(),
      active: editorState?.orderedList ?? false,
    },
  ];

  return (
    <div className="mx-auto max-w-5xl pb-12">
      {/* Page heading */}
      <div className="mb-7">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] transition hover:text-[#10733b]"
        >
          <ArrowLeft size={17} />
          Back to Articles
        </Link>

        <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
          Articles & News
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#173b29]">
          {article ? "Edit Article" : "Create Article"}
        </h1>

        <p className="mt-2 text-sm leading-7 text-[#75847a]">
          Prepare mental health awareness articles, educational
          content, news and Foundation updates.
        </p>
      </div>

      <form
        action={action}
        onSubmit={syncEditorContent}
        className="space-y-6"
      >
        {/* Article information */}
        <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-[#edf1ed] pb-4">
            <FileText
              size={20}
              className="text-[#178f4c]"
            />

            <h2 className="text-lg font-bold text-[#173b29]">
              Article Information
            </h2>
          </div>

          <div className="space-y-5">
            {/* Article title */}
            <div>
              <label htmlFor="title" className={labelClass}>
                Article Title{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                minLength={3}
                maxLength={200}
                value={title}
                onChange={(event) => {
                  const nextTitle = event.target.value;

                  setTitle(nextTitle);

                  if (!slugEdited) {
                    setSlug(slugify(nextTitle));
                  }
                }}
                className={inputClass}
                placeholder="Understanding Mental Health"
              />
            </div>

            {/* Article URL */}
            <div>
              <label htmlFor="slug" className={labelClass}>
                Article URL{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="flex overflow-hidden rounded-xl border border-[#dce8df] focus-within:border-[#178f4c] focus-within:ring-2 focus-within:ring-[#178f4c]/10">
                <span className="hidden bg-[#f4f8f5] px-4 py-3 text-sm text-[#75847a] sm:block">
                  /articles/
                </span>

                <input
                  id="slug"
                  name="slug"
                  type="text"
                  required
                  pattern="[a-z0-9]+(-[a-z0-9]+)*"
                  value={slug}
                  onChange={(event) => {
                    setSlugEdited(true);
                    setSlug(slugify(event.target.value));
                  }}
                  className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-[#173b29] outline-none"
                  placeholder="understanding-mental-health"
                />
              </div>

              <p className="mt-2 text-xs text-[#829087]">
                This determines the article&apos;s public URL.
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label htmlFor="excerpt" className={labelClass}>
                Short Description
              </label>

              <textarea
                id="excerpt"
                name="excerpt"
                rows={3}
                maxLength={500}
                defaultValue={article?.excerpt ?? ""}
                className={inputClass}
                placeholder="Briefly describe the article..."
              />

              <p className="mt-2 text-xs text-[#829087]">
                A short summary displayed in article listings.
              </p>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className={labelClass}>
                Category
              </label>

              <select
                id="category"
                name="category"
                defaultValue={article?.category ?? "Mental Health"}
                className={inputClass}
              >
                <option>Mental Health</option>
                <option>Drug Abuse Awareness</option>
                <option>Health & Wellbeing</option>
                <option>Foundation News</option>
                <option>Community Development</option>
                <option>Education</option>
                <option>General</option>
              </select>
            </div>
          </div>
        </section>

        {/* Rich-text editor */}
        <section className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm">
          <div className="border-b border-[#e3ebe5] p-5">
            <h2 className="text-lg font-bold text-[#173b29]">
              Article Content
            </h2>

            <p className="mt-2 text-sm text-[#829087]">
              Write and format the article using the editor below.
            </p>
          </div>

          {/* Formatting toolbar */}
          <div className="flex flex-wrap gap-2 border-b border-[#e3ebe5] bg-[#fbfdfb] p-3">
            {toolbarButtons.map(
              ({ icon: Icon, label, run, active }) => (
                <button
                  key={label}
                  type="button"
                  title={label}
                  aria-label={label}
                  aria-pressed={Boolean(active)}
                  disabled={!editor || pending}
                  onClick={run}
                  className={`rounded-lg p-2 transition disabled:opacity-40 ${
                    active
                      ? "bg-[#dff2e5] text-[#178f4c]"
                      : "text-[#526658] hover:bg-[#eef8f1]"
                  }`}
                >
                  <Icon size={19} />
                </button>
              )
            )}
          </div>

          {/* TipTap editor */}
          <EditorContent editor={editor} />

          {/* Serialized TipTap JSON */}
          <input
            ref={contentInputRef}
            type="hidden"
            name="content"
            defaultValue={JSON.stringify(
              article?.content ?? {
                type: "doc",
                content: [{ type: "paragraph" }],
              }
            )}
          />
        </section>

        {/* Cover image */}
        <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3 border-b border-[#edf1ed] pb-4">
            <ImageIcon
              size={20}
              className="text-[#178f4c]"
            />

            <div>
              <h2 className="text-lg font-bold text-[#173b29]">
                Article Cover Image
              </h2>

              <p className="mt-2 text-sm text-[#829087]">
                Upload a cover image for this article.
                It can be displayed on the public website.
              </p>
            </div>
          </div>

          <ImageUploader
            label="Upload Article Image"
            folder="articles"
            value={coverImage}
            onChange={setCoverImage}
            onUploadingChange={setImageUploading}
          />

          <input
            type="hidden"
            name="cover_image_url"
            value={coverImage}
          />
        </section>

        {/* Publication settings */}
        <section className="rounded-2xl border border-[#e3ebe5] bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <label htmlFor="status" className={labelClass}>
                Publication Status
              </label>

              <select
                id="status"
                name="status"
                value={status}
                onChange={(event) =>
                  setStatus(
                    event.target.value as "draft" | "published"
                  )
                }
                className="rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm text-[#173b29]"
              >
                <option value="draft">
                  Save as Draft
                </option>

                {canPublish && (
                  <option value="published">
                    Publish Article
                  </option>
                )}
              </select>

              <p className="mt-2 text-xs text-[#829087]">
                {status === "published"
                  ? "This article will be visible on the public website."
                  : "This article will remain unpublished until an authorized staff member publishes it."}
              </p>
            </div>

            <button
              type="submit"
              disabled={pending || imageUploading || !editor}
              className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10733b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} />

              {imageUploading
                ? "Uploading image..."
                : pending
                  ? "Saving article..."
                  : status === "published"
                    ? "Publish Article"
                    : "Save Draft"}
            </button>
          </div>
        </section>

        {/* Server action error */}
        {state.error && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm font-medium text-red-700">
              {state.error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
