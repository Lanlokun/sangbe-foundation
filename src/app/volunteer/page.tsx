import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import VolunteerHero from "@/components/volunteer/VolunteerHero";
import WhyVolunteer from "@/components/volunteer/WhyVolunteer";
import VolunteerForm from "@/components/volunteer/VolunteerForm";

export const metadata: Metadata = {
  title: "Volunteer | Sangbe Foundation",
  description:
    "Volunteer with Sangbe Foundation and contribute your time, skills, and energy to community initiatives across The Gambia.",
};

export default function VolunteerPage() {
  return (
    <>
      <Navbar />

      <main>
        <VolunteerHero />
        <WhyVolunteer />
        <VolunteerForm />
      </main>

      <Footer />
    </>
  );
}