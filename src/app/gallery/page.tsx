
import type { Metadata } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import GalleryHero from "@/components/gallery/GalleryHero";
import GhanaGalleryFeature from "@/components/gallery/GhanaGalleryFeature";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import GalleryCTA from "@/components/gallery/GalleryCTA";

export const metadata: Metadata = {
  title: "Gallery | Sangbe Foundation",
  description:
    "Explore photographs from Sangbe Foundation's humanitarian activities, community engagements, international outreach, and psycho-education programs.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />

      <main>
        <GalleryHero />
        <GhanaGalleryFeature />
        <GalleryCTA />
      </main>

      <Footer />
    </>
  );
}
