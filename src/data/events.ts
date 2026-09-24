export type EventStatus =
  | "upcoming"
  | "past";

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
  email?: string;
  status: EventStatus;
};

export const events: Event[] = [
  {
    title:
      "Sangbe Foundation Commemorative Day 2026",

    slug:
      "sangbe-foundation-commemorative-day-2026",

    date: "2026-04-10",

    location: "The Gambia",

    category: "Commemorative Day",

    excerpt:
      "Commemorating the establishment of Sangbe Foundation and its continued work in psycho-education, addiction and mental health awareness, stress management, and healthy coping strategies.",

    description: [
      "Established on 10 April 2019, Sangbe Foundation works to support young people struggling with addiction and mental health issues, particularly those who may not have access to formal education. The Foundation later extended its interventions and research to students as well.",

      "Research informing the Foundation's work found that 40.98% of young people start smoking due to stress. This has strengthened the Foundation's commitment to providing psychological strategies and professional recommendations that help young people understand and respond to stress in healthier ways.",

      "Sangbe Foundation currently and actively uses psycho-education to raise awareness about stress and its potential coping mechanisms, promoting healthy approaches such as physical activity and meditation.",

      "The Foundation aims to be a global champion of psycho-education, using professional and effective psycho-education to encourage positive behavioral change and make practical psychological knowledge accessible to the general public and schools free of charge.",

      "Sangbe Foundation Commemorative Day marks the Foundation's establishment on 10 April 2019 and provides an opportunity to reflect on its mission, interventions, and continued commitment to psycho-education.",
    ],

    email:
      "sangbefoundation@gmail.com",

    status: "past",
  },
];

export function getUpcomingEvents() {
  return events
    .filter(
      (event) =>
        event.status === "upcoming"
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );
}

export function getPastEvents() {
  return events
    .filter(
      (event) =>
        event.status === "past"
    )
    .sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    );
}

export function getEventBySlug(
  slug: string
) {
  return events.find(
    (event) =>
      event.slug === slug
  );
}

export function formatEventDate(
  date: string
) {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(
    new Date(
      `${date}T00:00:00`
    )
  );
}