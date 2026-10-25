
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
  gallery?: string[];
  email?: string;
  status: EventStatus;
};

export const events: Event[] = [
  {
    title: "Sangbe Foundation Humanitarian and Cultural Visit to Ghana 2026",
    slug: "ghana-humanitarian-cultural-visit-2026",
    date: "2026-09-17",
    location: "Accra, Cape Coast and Northern Ghana",
    category: "International Outreach",
    excerpt:
      "Sangbe Foundation Deputy CEO and Trinidad and Tobago representative, Mrs. Catherine Andrews, visited Ghana in September 2026, participating in humanitarian solidarity, cultural engagement and international outreach activities.",
    description: [
      "In September 2026, Mrs. Catherine Andrews, Deputy CEO of Sangbe Foundation and representative of its Trinidad and Tobago Chapter, undertook a visit to Ghana as part of the Foundation's commitment to humanitarian solidarity, cultural understanding and international engagement.",

      "During her visit, Mrs. Andrews attended the Nkrumah Memorial Lecture on 17 September 2026, reflecting the importance of African history, leadership and the connections between Africa and its global diaspora.",

      "Her activities also included a visit to Cape Coast Castle, a historic site associated with the transatlantic slave trade. The visit provided an opportunity for reflection on ancestral history, remembrance and the importance of healing across generations.",

      "In Northern Ghana, Mrs. Andrews participated in activities surrounding the 2026 Damba Festival, engaging with community members and traditional leadership. These interactions reflected the Foundation's interest in cultural connection, community well-being and the role of psycho-education in supporting emotional and psychological health.",

      "Mrs. Andrews also engaged in international outreach in Accra, including a meeting with the Ambassador of Suriname, where she shared perspectives on the Foundation's work and its wider humanitarian mission.",

      "The visit also expressed solidarity with communities affected by flooding in Ghana in 2026. Through her interactions with local people, Mrs. Andrews demonstrated the Foundation's commitment to compassion, inclusion and support for communities experiencing difficult circumstances.",

      "Following her visit, Mrs. Andrews returned to The Gambia, where she was welcomed by Sangbe Foundation Founder and CEO, Mr. Mohammed Abdallah Sangbe, alongside other Foundation volunteers.",

      "The Ghana visit represents an important chapter in Sangbe Foundation's international outreach, reinforcing its commitment to psycho-education, humanitarian service, cultural understanding and meaningful connections across communities.",
    ],
   
image:
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-01.jpeg",

gallery: [
  // Nkrumah Memorial Lecture
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-01.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-02.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-03.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-04.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-05.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-group-06.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-greeting-01.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-greeting-02.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-greeting-03.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-attendees-01.jpeg",
  "/images/events/ghana-2026/nkrumah-memorial-lecture-programme-01.jpeg",
  "/images/events/ghana-2026/memorial-lecture-auditorium-01.jpeg",

  // Cape Coast Castle
  "/images/events/ghana-2026/cape-coast-castle-visit-01.jpeg",
  "/images/events/ghana-2026/cape-coast-castle-visit-02.jpeg",
  "/images/events/ghana-2026/cape-coast-castle-courtyard-01.jpeg",
  "/images/events/ghana-2026/cape-coast-castle-exterior-01.jpeg",
  "/images/events/ghana-2026/cape-coast-castle-historical-plaque-01.jpeg",

  // Cultural engagement
  "/images/events/ghana-2026/damba-festival-cultural-gathering-01.jpeg",
  "/images/events/ghana-2026/damba-festival-community-seating-01.jpeg",
  "/images/events/ghana-2026/ghana-cultural-visit-selfie-01.jpeg",
  "/images/events/ghana-2026/ghana-community-encounter-01.jpeg",
  "/images/events/ghana-2026/ghana-group-visit-01.jpeg",
  "/images/events/ghana-2026/ghana-university-sign-01.jpeg",

  // Official meetings
  "/images/events/ghana-2026/official-meeting-group-01.jpeg",
  "/images/events/ghana-2026/official-meeting-group-02.jpeg",
  "/images/events/ghana-2026/official-meeting-conversation-01.jpeg",
  "/images/events/ghana-2026/official-meeting-office-01.jpeg",

  // Catherine Andrews
  "/images/events/ghana-2026/catherine-cultural-portrait-01.jpeg",
  "/images/events/ghana-2026/catherine-cultural-portrait-02.jpeg",
  "/images/events/ghana-2026/catherine-airport-selfie-01.jpeg",
  "/images/events/ghana-2026/ghana-visit-portrait-01.jpeg",

  // Arrival and reception
  "/images/events/ghana-2026/airport-reception-group-01.jpeg",
  "/images/events/ghana-2026/airport-reception-group-02.jpeg",
  "/images/events/ghana-2026/airport-reception-group-03.jpeg",
],

    email: "sangbefoundation@gmail.com",
    status: "past",
  },
  {
    title: "Sangbe Foundation Commemorative Day 2026",
    slug: "sangbe-foundation-commemorative-day-2026",
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
    email: "sangbefoundation@gmail.com",
    status: "past",
  },
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
