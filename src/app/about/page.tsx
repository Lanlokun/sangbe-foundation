import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AboutHero from "@/components/about/AboutHero";
import OurStory from "@/components/about/OurStory";
import MissionVision from "@/components/about/MissionVision";
import Values from "@/components/about/Values";
import AboutCTA from "@/components/about/AboutCTA";
import TeamPreview from "@/components/about/TeamPreview";

export const metadata: Metadata = {
  title: "About Us | Sangbe Foundation",
  description:
    "Learn about Sangbe Foundation, a registered NGO established in 2019 and based in Busumbala, The Gambia.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        <AboutHero />
        <OurStory />
        <MissionVision />
        <Values />
        <TeamPreview />
        <AboutCTA />
      </main>

      <Footer />
    </>
  );
}