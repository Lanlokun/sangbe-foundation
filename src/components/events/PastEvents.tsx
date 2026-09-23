import EventCard from "./EventCard";

import { getPastEvents } from "@/data/events";
import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

export default function PastEvents() {
  const pastEvents = getPastEvents();

  if (pastEvents.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#f5f8f6] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Past Events
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Moments from our{" "}
              <span className="text-[#19944f]">
                community.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              Explore previous Sangbe Foundation activities, engagements, and
              community initiatives.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event) => (
            <StaggerItem key={event.slug} className="h-full">
              <EventCard event={event} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}