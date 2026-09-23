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
    image: null,
  },
  {
    slug: "catherine-andrews",
    name: "Catherine Andrews",
    role: "Deputy CEO",
    chapter: "Trinidad and Tobago Chapter",
    category: "leadership",
    image: null,
  },
  {
    slug: "henry-kyereman",
    name: "Henry Kyereman",
    role: "IT Manager",
    category: "management",
    image: null,
  },
  {
    slug: "alimatou-sankareh",
    name: "Alimatou Sankareh",
    role: "General Secretary",
    category: "management",
    image: null,
  },
  {
    slug: "sainey-danjo",
    name: "Sainey Danjo",
    role: "Public Relations Officer",
    chapter: "The Gambia Chapter",
    category: "management",
    image: null,
  },
  {
    slug: "malik-lanlokun",
    name: "Malik Lanlokun",
    role: "Lead Software Architect",
    category: "management",
    image: null,
  },
  {
    slug: "modou-sallah",
    name: "Modou Sallah",
    role: "Public Relations Officer",
    chapter: "USA Chapter",
    category: "representatives",
    image: null,
  },
  {
    slug: "mubarak-hessein",
    name: "Mubarak Hessein",
    role: "Consultant & Advisor",
    chapter: "USA Chapter",
    category: "representatives",
    image: null,
  },
  {
    slug: "idriss-ninche",
    name: "Idriss Ninche",
    role: "Advisor & Ambassador",
    chapter: "USA Chapter",
    category: "representatives",
    image: null,
  },
];

export function getTeamMember(slug: string) {
  return teamMembers.find((member) => member.slug === slug);
}