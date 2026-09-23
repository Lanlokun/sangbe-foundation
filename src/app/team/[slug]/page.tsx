import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import TeamProfileHero from "@/components/team/profile/TeamProfileHero";
import TeamProfileContent from "@/components/team/profile/TeamProfileContent";
import TeamProfileCTA from "@/components/team/profile/TeamProfileCTA";

import {
  getTeamMember,
  teamMembers,
} from "@/data/team";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const member = getTeamMember(slug);

  if (!member) {
    return {
      title: "Team Member | Sangbe Foundation",
    };
  }

  return {
    title: `${member.name} | Sangbe Foundation`,
    description:
      member.shortBio ||
      `Learn more about ${member.name}, ${member.role} at Sangbe Foundation.`,
  };
}

export default async function TeamMemberPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const member = getTeamMember(slug);

  if (!member) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main>
        <TeamProfileHero member={member} />

        <TeamProfileContent member={member} />

        <TeamProfileCTA />
      </main>

      <Footer />
    </>
  );
}