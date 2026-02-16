import React, { useState, useMemo } from "react";
import {
  GALLERY_CATEGORIES,
  GALLERY_REGIONS,
  GALLERY_IMAGES,
} from "./galleryData";

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRegion, setActiveRegion] = useState(null); // null means all regions

  // Filter images based on category and region
  const filteredImages = useMemo(() => {
    return GALLERY_IMAGES.filter((img) => {
      const categoryMatch =
        activeCategory === "all" || img.category === activeCategory;
      const regionMatch = !activeRegion || img.region === activeRegion;
      return categoryMatch && regionMatch;
    });
  }, [activeCategory, activeRegion]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-start gap-8 md:gap-16 mb-12">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`text-base md:text-lg font-secondary font-medium transition-all duration-300 relative pb-4 px-2 cursor-pointer ${
              activeCategory === cat.id
                ? "text-brand-lilac-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-brand-lilac-600 after:rounded-t-sm"
                : "text-brand-dark-300 hover:text-brand-lilac-500"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Region Filters */}
      <div className="flex flex-wrap items-center justify-start gap-4 mb-16">
        <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mr-4">
          REGIONS
        </span>
        {GALLERY_REGIONS.map((region) => (
          <button
            key={region.id}
            onClick={() =>
              setActiveRegion(activeRegion === region.id ? null : region.id)
            }
            className={`cursor-pointer px-8 py-2.5 rounded-full text-sm font-bold text-white uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
              activeRegion === region.id
                ? "bg-brand-lilac-800 shadow-brand-lilac/50 scale-105 ring-2 ring-offset-2 ring-brand-lilac-800"
                : "bg-brand-lilac hover:bg-brand-lilac/90"
            }`}
          >
            {region.label}
          </button>
        ))}
      </div>

      {/* Image Grid with CSS Columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredImages.map((img) => (
          <div
            key={img.id}
            className="relative group overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
              <p className="text-white font-secondary text-lg font-medium drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-20 bg-brand-cream-50 rounded-2xl border border-brand-lilac-100">
          <p className="text-xl text-brand-dark-400 font-secondary italic">
            No photos found for this selection.
          </p>
          <button
            onClick={() => {
              setActiveCategory("all");
              setActiveRegion(null);
            }}
            className="mt-4 text-brand-lilac-700 font-bold hover:underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
