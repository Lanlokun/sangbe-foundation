import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import DonateHero from "@/components/donate/DonateHero";
import DonationImpact from "@/components/donate/DonationImpact";
import DonationForm from "@/components/donate/DonationForm";

export const metadata: Metadata = {
  title: "Donate | Sangbe Foundation",
  description:
    "Support Sangbe Foundation and help strengthen community assistance, awareness, disaster response, and other initiatives across The Gambia.",
};

export default function DonatePage() {
  return (
    <>
      <Navbar />

      <main>
        <DonateHero />

        <DonationImpact />

        <DonationForm />
      </main>

      <Footer />
    </>
  );
}