import Link from "next/link";

import {
  ArrowRight,
  CalendarClock,
} from "lucide-react";

import EventCard from "./EventCard";

import { getUpcomingEvents } from "@/data/events";
import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

export default function UpcomingEvents() {
  const upcomingEvents = getUpcomingEvents();

  return (
    <section
      id="upcoming-events"
      className="scroll-mt-24 bg-white pb-16 pt-24 lg:pb-20 lg:pt-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Upcoming Events
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Join us at our{" "}
                <span className="text-[#19944f]">
                  next activity.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-[#68766e] lg:justify-self-end">
              Find upcoming Sangbe Foundation activities and opportunities to
              connect, participate, and support our work.
            </p>
          </div>
        </Reveal>

        {upcomingEvents.length > 0 ? (
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <StaggerItem
                key={event.slug}
                className="h-full"
              >
                <EventCard event={event} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <Reveal>
            <div className="rounded-[28px] border border-[#dfe8e2] bg-[#f7faf8] px-8 py-14 text-center md:px-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf7ef]">
                <CalendarClock
                  size={28}
                  className="text-[#19944f]"
                />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-[#142019]">
                New events will be announced soon.
              </h3>

              <p className="mx-auto mt-3 max-w-lg text-base leading-7 text-[#68766e]">
                Follow Sangbe Foundation or contact us to learn about upcoming
                activities and opportunities to participate.
              </p>

              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center gap-3 font-semibold text-[#178f4c] transition-colors duration-300 hover:text-[#126f3c]"
              >
                Contact Us

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}