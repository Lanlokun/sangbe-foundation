
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type EventGalleryProps = {
  images: string[];
  title: string;
};

export default function EventGallery({
  images,
  title,
}: EventGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? null : (current + 1) % images.length
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? null
            : (current - 1 + images.length) % images.length
        );
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, images.length]);

  if (!images.length) return null;

  const previous = () =>
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + images.length) % images.length
    );

  const next = () =>
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % images.length
    );

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View photo ${index + 1} of ${images.length}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#eaf1ec] text-left"
          >
            <Image
              src={src}
              alt={`${title} — photograph ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 380px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-20 rounded-full bg-white/15 p-3 text-white hover:bg-white/25"
          >
            <X size={22} />
          </button>

          <div className="relative h-[75vh] w-full max-w-6xl">
            <Image
              src={images[activeIndex]}
              alt={`${title} — photograph ${activeIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previous}
                aria-label="Previous photograph"
                className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 sm:left-6"
              >
                <ChevronLeft size={25} />
              </button>

              <button
                type="button"
                onClick={next}
                aria-label="Next photograph"
                className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 sm:right-6"
              >
                <ChevronRight size={25} />
              </button>
            </>
          )}

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/75">
            {activeIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
