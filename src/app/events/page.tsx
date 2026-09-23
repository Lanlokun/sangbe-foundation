import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import EventsHero from "@/components/events/EventsHero";
import UpcomingEvents from "@/components/events/UpcomingEvents";
import PastEvents from "@/components/events/PastEvents";
import EventsCTA from "@/components/events/EventsCTA";

export const metadata: Metadata = {
  title: "Events | Sangbe Foundation",
  description:
    "Explore upcoming and past Sangbe Foundation events, community activities, awareness initiatives, and opportunities to participate.",
};

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <main>
        <EventsHero />
        <UpcomingEvents />
        <PastEvents />
        <EventsCTA />
      </main>

      <Footer />
    </>
  );
}