import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ProgramsPreview from "@/components/home/ProgramsPreview";
import ImpactSection from "@/components/home/ImpactSection";
import GetInvolved from "@/components/home/GetInvolved";
import PartnersPreview from "@/components/home/PartnersPreview";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Reveal>
          <AboutPreview />
        </Reveal>

        <ProgramsPreview />

        <Reveal>
          <ImpactSection />
        </Reveal>

        <GetInvolved />

        <Reveal>
          <PartnersPreview />
        </Reveal>

        <Reveal>
          <FinalCTA />
        </Reveal>
      </main>

      <Footer />
    </>
  );
}