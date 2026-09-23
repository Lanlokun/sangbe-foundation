import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import DisasterHero from "@/components/disaster-relief/DisasterHero";
import EmergencyResponse from "@/components/disaster-relief/EmergencyResponse";
import ResponseProcess from "@/components/disaster-relief/ResponseProcess";
import AssistanceAreas from "@/components/disaster-relief/AssistanceAreas";
import RecoverySection from "@/components/disaster-relief/RecoverySection";
import DisasterSupport from "@/components/disaster-relief/DisasterSupport";
import DisasterCTA from "@/components/disaster-relief/DisasterCTA";

export const metadata: Metadata = {
  title: "Disaster Relief | Sangbe Foundation",
  description:
    "Learn about Sangbe Foundation's disaster relief and emergency support work for families and communities affected by floods and other difficult circumstances.",
};

export default function DisasterReliefPage() {
  return (
    <>
      <Navbar />

      <main>
        <DisasterHero />
        <EmergencyResponse />
        <ResponseProcess />
        <AssistanceAreas />
        <RecoverySection />
        <DisasterSupport />
        <DisasterCTA />
      </main>

      <Footer />
    </>
  );
}