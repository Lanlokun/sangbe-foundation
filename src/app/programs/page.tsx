import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ProgramsHero from "@/components/programs/ProgramsHero";
import ProgramAreas from "@/components/programs/ProgramAreas";
import HowWeWork from "@/components/programs/HowWeWork";
import ProgramFocus from "@/components/programs/ProgramFocus";
import ProgramsCTA from "@/components/programs/ProgramsCTA";

export const metadata: Metadata = {
  title: "Programs & Projects | Sangbe Foundation",
  description:
    "Explore Sangbe Foundation's work in drug abuse awareness, community support, disaster relief, and community development across The Gambia.",
};

export default function ProgramsPage() {
  return (
    <>
      <Navbar />

      <main>
        <ProgramsHero />
        <ProgramAreas />
        <HowWeWork />
        <ProgramFocus />
        <ProgramsCTA />
      </main>

      <Footer />
    </>
  );
}