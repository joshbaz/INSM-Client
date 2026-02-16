import React from "react";
import GalleryHero from "./galleryHero";
import GalleryGrid from "./galleryGrid";

const Gallery = () => {
  return (
    <main className="w-full min-h-screen bg-white">
      <GalleryHero />
      <GalleryGrid />
    </main>
  );
};

export default Gallery;
