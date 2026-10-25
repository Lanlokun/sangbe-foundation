
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Images,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EventGallery from "@/components/events/EventGallery";

import {
  events,
  formatEventDate,
  getEventBySlug,
} from "@/data/events";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return events.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | Sangbe Foundation",
    };
  }

  return {
    title: `${event.title} | Sangbe Foundation`,
    description: event.excerpt,
  };
}

export default async function EventDetailPage({
  params,
}: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const gallery = event.gallery ?? [];

  return (
    <>
      <Navbar />

      <main>
        {/* Event hero */}
        <section className="relative overflow-hidden bg-[#073b29]">
          {event.image && (
            <>
              <Image
                src={event.image}
                alt={event.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />

              <div className="absolute inset-0 bg-[#052f20]/70" />
            </>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-[#042f20]/95 via-[#073b29]/75 to-[#073b29]/35" />

          <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-36 sm:pt-40 lg:px-8 lg:pb-24 lg:pt-44">
            <Link
              href="/events"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to Events
            </Link>

            <span className="block text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
              {event.category}
            </span>

            <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-white sm:text-5xl lg:text-[68px] lg:leading-[1.03]">
              {event.title}
            </h1>

            <div className="mt-8 flex flex-wrap gap-x-7 gap-y-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CalendarDays size={18} className="text-[#72dda0]" />
                {event.endDate
                  ? `${formatEventDate(event.date)} – ${formatEventDate(event.endDate)}`
                  : formatEventDate(event.date)}
              </div>

              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-[#72dda0]" />
                  {event.time}
                </div>
              )}

              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#72dda0]" />
                {event.location}
              </div>
            </div>
          </div>
        </section>

        {/* Event content */}
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-lg font-medium leading-8 text-[#34443a] sm:text-xl sm:leading-9">
              {event.excerpt}
            </p>

            <div className="mt-10 space-y-6">
              {event.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-8 text-[#68766e] sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Event photo gallery */}
        {gallery.length > 0 && (
          <section className="bg-[#f4f8f5] py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 text-[#178f4c]">
                    <Images size={17} />
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">
                      Photo Gallery
                    </span>
                  </div>

                  <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#142019] sm:text-4xl">
                    Moments from the Visit
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68766e] sm:text-base">
                    Explore photographs documenting the Foundation's
                    activities and engagements.
                  </p>
                </div>

                <span className="text-sm font-medium text-[#68766e]">
                  {gallery.length} photographs
                </span>
              </div>

              <EventGallery images={gallery} title={event.title} />
            </div>
          </section>
        )}

        {/* Back navigation */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="border-t border-[#e1e8e3] pt-8">
              <Link
                href="/events"
                className="inline-flex items-center gap-3 font-semibold text-[#178f4c] transition hover:text-[#0d6834]"
              >
                <ArrowLeft size={18} />
                View All Events
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
