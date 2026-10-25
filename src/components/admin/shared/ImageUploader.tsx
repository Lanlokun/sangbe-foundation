
"use client";

import { useRef, useState } from "react";
import {
  ImagePlus,
  Loader2,
  Trash2,
  UploadCloud,
} from "lucide-react";

import { createClient } from "@/lib/supabase/browser";

type ImageUploaderProps = {
  value: string;
  onChange: (url: string) => void;
  onUploadingChange?: (uploading: boolean) => void;
  folder?: string;
  label?: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const FILE_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export default function ImageUploader({
  value,
  onChange,
  onUploadingChange,
  folder = "general",
  label = "Cover Image",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setError(null);

    // Validate the selected file type.
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError(
        "Unsupported image format. Please select a JPG, PNG, WebP or GIF image."
      );
      return;
    }

    // Validate the selected file size.
    if (file.size > MAX_FILE_SIZE) {
      setError("The image must not exceed 5 MB.");
      return;
    }

    if (file.size === 0) {
      setError("The selected image is empty.");
      return;
    }

    // Notify the parent component that uploading has started.
    setUploading(true);
    onUploadingChange?.(true);

    try {
      const supabase = createClient();

      // Generate a safe file extension based on the MIME type.
      const extension = FILE_EXTENSIONS[file.type];

      // Generate a unique filename to prevent collisions.
      const filename = `${crypto.randomUUID()}.${extension}`;

      // Sanitize the destination folder.
      const safeFolder =
        folder.replace(/[^a-zA-Z0-9_-]/g, "") || "general";

      // Store files in folders such as:
      // events/filename.jpg
      // articles/filename.png
      // team/filename.webp
      const path = `${safeFolder}/${filename}`;

      // Upload the image to Supabase Storage.
      const { error: uploadError } = await supabase.storage
        .from("cms-media")
        .upload(path, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Retrieve the public URL for the uploaded image.
      const { data } = supabase.storage
        .from("cms-media")
        .getPublicUrl(path);

      if (!data.publicUrl) {
        throw new Error("Unable to retrieve the uploaded image URL.");
      }

      // Update the parent component with the image URL.
      onChange(data.publicUrl);
    } catch (err) {
      console.error("CMS image upload failed:", err);

      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while uploading the image."
      );
    } finally {
      // Reset upload state.
      setUploading(false);
      onUploadingChange?.(false);

      // Reset the file input so the same file can be selected again.
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleRemove() {
    if (uploading) return;

    setError(null);

    // Remove the image reference from the form.
    // The stored file itself is not deleted from Supabase.
    onChange("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  function openFilePicker() {
    if (uploading) return;

    inputRef.current?.click();
  }

  return (
    <div className="space-y-4">
      {/* Field label */}
      <label className="block text-sm font-semibold text-[#173b29]">
        {label}
      </label>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        disabled={uploading}
        aria-label={label}
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            void handleUpload(file);
          }
        }}
      />

      {/* Image preview */}
      {value ? (
        <div className="overflow-hidden rounded-2xl border border-[#dce8df] bg-[#f7faf8]">
          <div className="relative flex min-h-52 items-center justify-center bg-[#edf4ef]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Uploaded image preview"
              className="max-h-80 w-full object-contain"
            />

            {uploading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80">
                <Loader2
                  size={32}
                  className="animate-spin text-[#178f4c]"
                />

                <p className="mt-3 text-sm font-semibold text-[#173b29]">
                  Uploading replacement image...
                </p>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-2">
              <ImagePlus
                size={18}
                className="text-[#178f4c]"
              />

              <p className="text-sm font-medium text-[#55705e]">
                Cover image selected
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* Replace image */}
              <button
                type="button"
                disabled={uploading}
                onClick={openFilePicker}
                className="rounded-lg border border-[#dce8df] bg-white px-4 py-2 text-sm font-semibold text-[#176b3c] transition hover:bg-[#eef8f1] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Replace
              </button>

              {/* Remove image */}
              <button
                type="button"
                disabled={uploading}
                onClick={handleRemove}
                className="inline-flex items-center gap-2 rounded-lg border border-red-100 bg-white px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={15} />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Upload drop-zone style button */
        <button
          type="button"
          disabled={uploading}
          onClick={openFilePicker}
          className="flex w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cfe3d4] bg-[#f8fcf9] px-6 py-12 text-center transition hover:border-[#178f4c] hover:bg-[#f0f8f2] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <Loader2
              size={36}
              className="animate-spin text-[#178f4c]"
            />
          ) : (
            <UploadCloud
              size={36}
              className="text-[#178f4c]"
            />
          )}

          <span className="mt-4 text-sm font-bold text-[#173b29]">
            {uploading
              ? "Uploading image..."
              : "Choose an image"}
          </span>

          <span className="mt-2 text-xs leading-6 text-[#829087]">
            JPG, PNG, WebP or GIF
            <br />
            Maximum file size: 5 MB
          </span>
        </button>
      )}

      {/* Upload progress message */}
      {uploading && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-xl border border-[#dce8df] bg-[#f0f8f2] p-4"
        >
          <Loader2
            size={18}
            className="shrink-0 animate-spin text-[#178f4c]"
          />

          <p className="text-sm font-medium text-[#55705e]">
            Upload in progress. Please wait before saving.
          </p>
        </div>
      )}

      {/* Upload error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <p className="text-sm font-medium text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* Helper text */}
      <p className="text-xs leading-6 text-[#829087]">
        Images are stored securely in the Foundation&apos;s
        Supabase Storage account and can be displayed on
        the public website.
      </p>
    </div>
  );
}
