import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import PartnersHero from "@/components/partners/PartnersHero";
import PartnershipIntro from "@/components/partners/PartnershipIntro";
import PartnershipTypes from "@/components/partners/PartnershipTypes";
import PartnersGrid from "@/components/partners/PartnersGrid";
import PartnershipCTA from "@/components/partners/PartnershipCTA";

export const metadata: Metadata = {
  title: "Partners | Sangbe Foundation",
  description:
    "Partner with Sangbe Foundation to support community initiatives, awareness, disaster response, and sustainable impact in The Gambia.",
};

export default function PartnersPage() {
  return (
    <>
      <Navbar />

      <main>
        <PartnersHero />
        <PartnershipIntro />
        <PartnershipTypes />
        <PartnersGrid />
        <PartnershipCTA />
      </main>

      <Footer />
    </>
  );
}