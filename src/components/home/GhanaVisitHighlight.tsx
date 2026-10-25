
import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  CalendarDays,
  Images,
  MapPin,
} from "lucide-react";

import { getEventBySlug } from "@/data/events";

export default function GhanaVisitHighlight() {
  const event = getEventBySlug(
    "ghana-humanitarian-cultural-visit-2026"
  );

  if (!event) return null;

  return (
    <section className="overflow-hidden bg-[#f4f8f5] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photograph */}
          <div className="relative">
            <div className="relative aspect-[4/4.3] overflow-hidden rounded-[28px] bg-[#e1eee5] sm:aspect-[5/4] lg:aspect-[4/4.3]">
              {event.image ? (
                <Image
                  src={event.image}
                  alt="Sangbe Foundation's international outreach visit to Ghana"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-[#668475]">
                  Ghana Outreach 2026
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-3 text-white sm:bottom-8 sm:left-8 sm:right-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b6f2cf]">
                    International Outreach
                  </p>

                  <p className="mt-2 text-lg font-bold sm:text-xl">
                    Ghana, September 2026
                  </p>
                </div>

                {event.gallery && event.gallery.length > 0 && (
                  <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-2 text-xs font-semibold backdrop-blur-md">
                    <Images size={15} />
                    {event.gallery.length} Photos
                  </div>
                )}
              </div>
            </div>

            {/* Decorative border */}
            <div className="pointer-events-none absolute -bottom-4 -right-4 -z-10 hidden h-full w-full rounded-[28px] border border-[#cde4d3] lg:block" />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Stories From Our Community
            </p>

            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.12] tracking-[-0.035em] text-[#142019] sm:text-4xl lg:text-[46px]">
              Building Connections Beyond Borders
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-[#68766e]">
              In September 2026, Mrs. Catherine Andrews, Deputy CEO
              of Sangbe Foundation and representative of its
              Trinidad and Tobago Chapter, visited Ghana to
              participate in humanitarian solidarity, cultural
              engagement, and international outreach activities.
            </p>

            <p className="mt-4 max-w-xl text-base leading-8 text-[#68766e]">
              From the Nkrumah Memorial Lecture and Cape Coast Castle
              to community interactions in Northern Ghana, her visit
              reflected the Foundation&apos;s commitment to
              psycho-education, cultural understanding, and
              compassion across communities.
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#68766e]">
              <span className="inline-flex items-center gap-2">
                <CalendarDays
                  size={17}
                  className="text-[#178f4c]"
                />
                September 2026
              </span>

              <span className="inline-flex items-center gap-2">
                <MapPin
                  size={17}
                  className="text-[#178f4c]"
                />
                Ghana
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#178f4c] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#10743c]"
              >
                Read the Full Story
                <ArrowUpRight size={17} />
              </Link>

              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cbded1] bg-white px-7 py-3.5 text-sm font-semibold text-[#176e3d] transition hover:border-[#178f4c] hover:bg-[#edf7f0]"
              >
                Explore the Gallery
                <Images size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
