import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import CommunityHero from "@/components/community-assistance/CommunityHero";
import EverydaySupport from "@/components/community-assistance/EverydaySupport";
import WhoWeSupport from "@/components/community-assistance/WhoWeSupport";
import SupportProcess from "@/components/community-assistance/SupportProcess";
import DignitySection from "@/components/community-assistance/DignitySection";
import CommunityHelp from "@/components/community-assistance/CommunityHelp";
import CommunityCTA from "@/components/community-assistance/CommunityCTA";

export const metadata: Metadata = {
  title: "Community Assistance | Sangbe Foundation",
  description:
    "Learn about Sangbe Foundation's community assistance work supporting vulnerable people, families, and communities facing difficult circumstances.",
};

export default function CommunityAssistancePage() {
  return (
    <>
      <Navbar />

      <main>
        <CommunityHero />
        <EverydaySupport />
        <WhoWeSupport />
        <SupportProcess />
        <DignitySection />
        <CommunityHelp />
        <CommunityCTA />
      </main>

      <Footer />
    </>
  );
}