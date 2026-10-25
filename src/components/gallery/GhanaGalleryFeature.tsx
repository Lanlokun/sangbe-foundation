
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import EventGallery from "@/components/events/EventGallery";
import { getEventBySlug } from "@/data/events";

export default function GhanaGalleryFeature() {
  const event = getEventBySlug(
    "ghana-humanitarian-cultural-visit-2026"
  );

  if (!event || !event.gallery?.length) {
    return null;
  }

  const featuredImages = event.gallery.slice(0, 12);

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Featured Collection
            </span>

            <h2 className="mt-4 max-w-xl text-3xl font-bold tracking-[-0.035em] text-[#142019] sm:text-4xl lg:text-[44px]">
              Sangbe Foundation in Ghana
            </h2>

            <p className="mt-5 max-w-xl text-base leading-8 text-[#68766e]">
              A look back at Mrs. Catherine Andrews&apos;
              humanitarian and cultural visit to Ghana in September
              2026, representing Sangbe Foundation through
              international outreach, cultural engagement, and
              community solidarity.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#68766e]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={17} className="text-[#178f4c]" />
                September 2026
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPin size={17} className="text-[#178f4c]" />
                Ghana
              </span>
            </div>

            <Link
              href={`/events/${event.slug}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#178f4c] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10743c]"
            >
              Read the Full Story
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {event.image && (
            <Link
              href={`/events/${event.slug}`}
              className="group relative block aspect-[4/3] overflow-hidden rounded-[26px] bg-[#eaf1ec]"
            >
              <Image
                src={event.image}
                alt="Sangbe Foundation Ghana outreach visit"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/55 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white">
                <span className="text-sm font-semibold">
                  Ghana Outreach 2026
                </span>

                <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md">
                  {event.gallery.length} Photos
                </span>
              </div>
            </Link>
          )}
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#142019] sm:text-2xl">
                Highlights from the Visit
              </h3>

              <p className="mt-2 text-sm text-[#68766e]">
                Select any photograph to view it in full.
              </p>
            </div>

            <span className="text-sm text-[#68766e]">
              Showing {featuredImages.length} of {event.gallery.length} photos
            </span>
          </div>

          <EventGallery images={featuredImages} title={event.title} />

          <div className="mt-8 text-center">
            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] hover:text-[#0d6834]"
            >
              View All {event.gallery.length} Photographs
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
