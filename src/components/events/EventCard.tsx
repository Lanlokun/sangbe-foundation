import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  MapPin,
} from "lucide-react";

import {
  Event,
  formatEventDate,
} from "@/data/events";

type EventCardProps = {
  event: Event;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dfe8e2] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_18px_45px_rgba(20,50,35,0.08)]"
    >
      <div className="relative h-[250px] overflow-hidden bg-[#0b4a34]">
        {event.image ? (
          <>
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#052f20]/45 via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0b5138] to-[#073b29]">
            <CalendarDays
              size={54}
              strokeWidth={1.4}
              className="text-white/25"
            />

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />

            <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full border border-white/[0.07]" />
          </div>
        )}

        <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#178f4c]">
          {event.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2 text-sm font-medium text-[#19944f]">
          <CalendarDays size={16} />
          {formatEventDate(event.date)}
        </div>

        <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.02em] text-[#142019]">
          {event.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-[#68766e]">
          {event.excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-8">
          <div className="flex items-center gap-2 text-sm text-[#8b9891]">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eaf7ef] text-[#19944f] transition-all duration-300 group-hover:bg-[#19944f] group-hover:text-white">
            <ArrowRight size={17} />
          </div>
        </div>
      </div>
    </Link>
  );
}