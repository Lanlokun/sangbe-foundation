import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import TeamHero from "@/components/team/TeamHero";
import TeamDirectory from "@/components/team/TeamDirectory";
import TeamCTA from "@/components/team/TeamCTA";

export const metadata: Metadata = {
  title: "Our Team | Sangbe Foundation",
  description:
    "Meet the leadership, management, technical team, representatives, and advisors supporting the work of Sangbe Foundation.",
};

export default function TeamPage() {
  return (
    <>
      <Navbar />

      <main>
        <TeamHero />
        <TeamDirectory />
        <TeamCTA />
      </main>

      <Footer />
    </>
  );
}