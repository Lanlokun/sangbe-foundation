import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import RequestHelpHero from "@/components/request-help/RequestHelpHero";
import RequestHelpGuidance from "@/components/request-help/RequestHelpGuidance";
import RequestHelpForm from "@/components/request-help/RequestHelpForm";

export const metadata: Metadata = {
  title: "Request Help | Sangbe Foundation",
  description:
    "Request assistance from Sangbe Foundation for yourself, your family, or your community in The Gambia.",
};

export default function RequestHelpPage() {
  return (
    <>
      <Navbar />

      <main>
        <RequestHelpHero />
        <RequestHelpGuidance />
        <RequestHelpForm />
      </main>

      <Footer />
    </>
  );
}