export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  chapter?: string;
  category: "leadership" | "management" | "representatives";
  image?: string | null;
  shortBio?: string;
  bio?: string[];
  expertise?: string[];
  email?: string;
  linkedin?: string;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "mohammed-abdallah-sangbe",
    name: "Mohammed Abdallah Sangbe",
    role: "Founder & CEO",
    category: "leadership",
    image: "/images/team/mohammed.png",
  },
  {
    slug: "catherine-andrews",
    name: "Catherine Andrews",
    role: "Deputy CEO",
    chapter: "Trinidad and Tobago Chapter",
    category: "leadership",
    image: "/images/team/catherine.jpeg",
  },
  {
    slug: "henry-ofosu-kyeremeh",
    name: "Henry Ofosu Kyeremeh",
    role: "IT Manager",
    category: "management",
    image: "/images/team/henry.png",
  },
  {
    slug: "alimatou-sankareh",
    name: "Alimatou Sankareh",
    role: "General Secretary",
    category: "management",
    image: "/images/team/alimatou.jpeg",
  },
  {
    slug: "maryam-mohammed-sangbe",
    name: "Maryam Mohammed Sangbe",
    role: "International Coordinator",
    category: "management",
    image: "/images/team/maryam.jpeg",
  },
  {
  slug: "abubakari-gambo",
  name: "Abubakari Gambo",
  role: "International Protocol Officer",
  category: "management",
  image: "/images/team/gambo.jpeg",
},
  {
    slug: "sainey-danjo",
    name: "Sainey Danjo",
    role: "Public Relations Officer",
    chapter: "The Gambia Chapter",
    category: "management",
    image: "/images/team/danjo.jpeg",
  },
  {
    slug: "malik-lanlokun",
    name: "Malik Lanlokun",
    role: "Lead Software Architect",
    category: "management",
    image: "/images/team/malik.png",
  },
  {
    slug: "sulayman-mohammed-sangbe",
    name: "Sulayman Mohammed Sangbe",
    role: "President, Students' Wing",
    category: "representatives",
    image: "/images/team/Sulayman.jpeg",
  },
  {
    slug: "abdul-rahman-elias",
    name: "Abdul Rahman Elias",
    role: "Lead Electrical Engineer",
    category: "management",
    image: "/images/team/elias.jpeg",
  },
  {
    slug: "modou-sallah",
    name: "Modou Sallah",
    role: "Public Relations Officer",
    chapter: "USA Chapter",
    category: "representatives",
    image: "/images/team/sallah.jpeg",
  },
  {
    slug: "mubarak-hessein",
    name: "Mubarak Hessein",
    role: "Consultant & Advisor",
    chapter: "USA Chapter",
    category: "representatives",
    image: "/images/team/hessein.png",
  },
  {
    slug: "ninche-mohammed-iddriss",
    name: "Ninche Mohammed Iddriss",
    role: "Advisor & Ambassador",
    chapter: "USA Chapter",
    category: "representatives",
    image: "/images/team/ninche.jpeg",
  },
  {
  slug: "ebou-turay",
  name: "Ebou Turay",
  role: "Special Editor",
  category: "management",
  image: "/images/team/eboutouray.jpeg",
},
];

export function getTeamMember(slug: string) {
  return teamMembers.find((member) => member.slug === slug);
}