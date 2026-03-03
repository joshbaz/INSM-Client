import React from "react";
import GalleryHero from "./galleryHero";
import GalleryGrid from "./galleryGrid";
import useSEO from "../../../hooks/useSEO";

const Gallery = () => {
  useSEO({
    title: "Impact Gallery",
    description:
      "See the visual impact of our programs across Uganda. Images of cooperative meetings, financial literacy training, and community growth.",
  });

  return (
    <main className="w-full min-h-screen bg-brand-white">
      <GalleryHero />
      <GalleryGrid />
    </main>
  );
};

export default Gallery;
