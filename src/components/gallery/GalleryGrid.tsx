"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  MapPin,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  galleryImages,
  GalleryCategory,
  GalleryImage,
} from "@/data/gallery";

const categories: Array<"All" | GalleryCategory> = [
  "All",
  "Awareness",
  "Community",
  "Disaster Relief",
  "Events",
];

export default function GalleryGrid() {
  const [activeCategory, setActiveCategory] =
    useState<"All" | GalleryCategory>("All");

  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") {
      return galleryImages;
    }

    return galleryImages.filter(
      (image) => image.category === activeCategory
    );
  }, [activeCategory]);

  const selectedIndex = selectedImage
    ? filteredImages.findIndex(
        (image) => image.id === selectedImage.id
      )
    : -1;

  function showPrevious() {
    if (!selectedImage || filteredImages.length <= 1) return;

    const previousIndex =
      selectedIndex <= 0
        ? filteredImages.length - 1
        : selectedIndex - 1;

    setSelectedImage(filteredImages[previousIndex]);
  }

  function showNext() {
    if (!selectedImage || filteredImages.length <= 1) return;

    const nextIndex =
      selectedIndex >= filteredImages.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedImage(filteredImages[nextIndex]);
  }

  useEffect(() => {
    if (!selectedImage) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedIndex]);

  return (
    <>
      <section className="bg-white py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Heading */}
          <div className="mb-12 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Photos & Moments
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                See our work{" "}
                <span className="text-[#19944f]">
                  in action.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-[#68766e] lg:justify-self-end">
              Explore photographs from Sangbe Foundation activities,
              engagements, and community initiatives.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((category) => {
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedImage(null);
                  }}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "bg-[#19944f] text-white shadow-[0_8px_20px_rgba(25,148,79,0.18)]"
                      : "border border-[#dce6df] bg-white text-[#637269] hover:border-[#a9cfb7] hover:bg-[#f5faf7] hover:text-[#178f4c]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Gallery */}
          {filteredImages.length > 0 ? (
            <div className="grid auto-rows-[230px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredImages.map((image, index) => {
                const featured = index % 5 === 0;

                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`group relative overflow-hidden rounded-[26px] bg-[#eaf1ec] text-left ${
                      featured
                        ? "sm:row-span-2 lg:row-span-2"
                        : ""
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#052f20]/80 via-[#052f20]/5 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-2 p-6 transition-transform duration-300 group-hover:translate-y-0">
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#72dda0]">
                        {image.category}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-white">
                        {image.title}
                      </h3>

                      {image.location && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-white/65">
                          <MapPin size={14} />
                          {image.location}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#dfe8e2] bg-[#f7faf8] px-8 py-16 text-center md:px-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf7ef]">
                <Images
                  size={28}
                  className="text-[#19944f]"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#142019]">
                Gallery photographs coming soon.
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[#68766e]">
                Photographs from Sangbe Foundation activities and community
                engagements will be added here.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#031d14]/95 px-4 py-6 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close */}
          <button
            type="button"
            aria-label="Close image"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={23} />
          </button>

          {/* Previous */}
          {filteredImages.length > 1 && (
            <button
              type="button"
              aria-label="Previous image"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-8"
            >
              <ChevronLeft size={25} />
            </button>
          )}

          {/* Image container */}
          <div
            className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[26px] bg-[#082c20]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative min-h-[60vh] flex-1">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                priority
                className="object-contain"
                sizes="90vw"
              />
            </div>

            <div className="border-t border-white/10 bg-[#073b29] px-6 py-5 md:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#72dda0]">
                    {selectedImage.category}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">
                    {selectedImage.title}
                  </h3>
                </div>

                {(selectedImage.location ||
                  selectedImage.date) && (
                  <div className="text-sm text-white/55">
                    {selectedImage.location && (
                      <span>{selectedImage.location}</span>
                    )}

                    {selectedImage.location &&
                      selectedImage.date && (
                        <span className="mx-2">•</span>
                      )}

                    {selectedImage.date && (
                      <span>{selectedImage.date}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Next */}
          {filteredImages.length > 1 && (
            <button
              type="button"
              aria-label="Next image"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-8"
            >
              <ChevronRight size={25} />
            </button>
          )}
        </div>
      )}
    </>
  );
}