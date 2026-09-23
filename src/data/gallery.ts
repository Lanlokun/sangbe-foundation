export type GalleryCategory =
  | "Awareness"
  | "Community"
  | "Disaster Relief"
  | "Events";

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  title: string;
  category: GalleryCategory;
  location?: string;
  date?: string;
};

export const galleryImages: GalleryImage[] = [
  /*
   * Add real Sangbe Foundation photographs here.
   *
   * Example:
   *
   * {
   *   id: 1,
   *   src: "/images/gallery/community-outreach.jpg",
   *   alt: "Sangbe Foundation community outreach activity",
   *   title: "Community Outreach",
   *   category: "Community",
   *   location: "Busumbala, The Gambia",
   *   date: "2026",
   * },
   *
   * Add the corresponding image to:
   *
   * public/images/gallery/
   */
];