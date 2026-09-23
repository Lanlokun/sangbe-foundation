import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactRoutes from "@/components/contact/ContactRoutes";

export const metadata: Metadata = {
  title: "Contact | Sangbe Foundation",
  description:
    "Contact Sangbe Foundation in Busumbala, West Coast Region, The Gambia. Get in touch about our programs, partnerships, volunteering, community support, and other enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main>
        <ContactHero />
        <ContactSection />
        <ContactRoutes />
      </main>

      <Footer />
    </>
  );
}