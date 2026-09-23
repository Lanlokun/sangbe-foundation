import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import GalleryHero from "@/components/gallery/GalleryHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryCTA from "@/components/gallery/GalleryCTA";

export const metadata: Metadata = {
  title: "Gallery | Sangbe Foundation",
  description:
    "Explore photographs from Sangbe Foundation activities, community engagements, outreach initiatives, and programs across The Gambia.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <main>
        <GalleryHero />
        <GalleryGrid />
        <GalleryCTA />
      </main>

      <Footer />
    </>
  );
}