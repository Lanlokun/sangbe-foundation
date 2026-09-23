import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import AwarenessHero from "@/components/awareness/AwarenessHero";
import UnderstandingChallenge from "@/components/awareness/UnderstandingChallenge";
import AwarenessWork from "@/components/awareness/AwarenessWork";
import PreventionSteps from "@/components/awareness/PreventionSteps";
import SupportSection from "@/components/awareness/SupportSection";
import AwarenessCTA from "@/components/awareness/AwarenessCTA";

export const metadata: Metadata = {
  title: "Drug Abuse Awareness | Sangbe Foundation",
  description:
    "Learn about Sangbe Foundation's drug abuse awareness and prevention work, supporting healthier choices and stronger communities in The Gambia.",
};

export default function AwarenessPage() {
  return (
    <>
      <Navbar />

      <main>
        <AwarenessHero />
        <UnderstandingChallenge />
        <AwarenessWork />
        <PreventionSteps />
        <SupportSection />
        <AwarenessCTA />
      </main>

      <Footer />
    </>
  );
}