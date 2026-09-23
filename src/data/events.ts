export type EventStatus = "upcoming" | "past";

export type Event = {
  title: string;
  slug: string;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  category: string;
  excerpt: string;
  description: string[];
  image?: string;
  status: EventStatus;
};

export const events: Event[] = [
  /*
   * Add verified Sangbe Foundation events here.
   *
   * Example:
   *
   * {
   *   title: "Community Awareness Session",
   *   slug: "community-awareness-session",
   *   date: "2026-10-20",
   *   time: "10:00 AM",
   *   location: "Busumbala, The Gambia",
   *   category: "Awareness",
   *   excerpt: "A short description of the event.",
   *   description: [
   *     "First paragraph about the event.",
   *     "Second paragraph about the event.",
   *   ],
   *   image: "/images/events/example.jpg",
   *   status: "upcoming",
   * },
   */
];

export function getUpcomingEvents() {
  return events
    .filter((event) => event.status === "upcoming")
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
}

export function getPastEvents() {
  return events
    .filter((event) => event.status === "past")
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getEventBySlug(slug: string) {
  return events.find((event) => event.slug === slug);
}

export function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}