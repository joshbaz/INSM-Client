import React, { useState, useMemo, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import api from "../../../services/api";

const GALLERY_REGIONS = [
  { id: "CENTRAL", label: "CENTRAL", color: "bg-brand-lilac" },
  { id: "NORTHERN", label: "NORTHERN", color: "bg-brand-lilac" },
  { id: "WESTERN", label: "WESTERN", color: "bg-brand-lilac" },
  { id: "EASTERN", label: "EASTERN", color: "bg-brand-lilac" }
];

const ImageWithLoader = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[200px] bg-brand-lilac/10">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-100">
          <Icon icon="ph:image-light" className="w-8 h-8 text-gray-300" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeRegion, setActiveRegion] = useState(null); // null means all regions
  const [selectedImage, setSelectedImage] = useState(null);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const dropdownRef = useRef(null);
  const viewedAlbums = useRef(new Set());
  const viewedPhotos = useRef(new Set());

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRegionDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setIsLoading(true);
        const [albumsRes, photosRes] = await Promise.all([
          api.get('/v1/albums'),
          api.get('/v1/photos')
        ]);
        
        setAlbums(albumsRes.data);
        setPhotos(photosRes.data);
      } catch (error) {
        console.error("Failed to fetch gallery data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGalleryData();
  }, []);

  // Get the label of the currently active region
  const activeRegionLabel = activeRegion
    ? GALLERY_REGIONS.find((r) => r.id === activeRegion)?.label
    : "All Regions";

  // Derive categories from published albums
  const galleryCategories = useMemo(() => {
    const publishedAlbums = albums.filter(a => a.isPublished);
    return [
      { id: "all", label: "All Photos" },
      ...publishedAlbums.map(a => ({ id: a.id, label: a.name }))
    ];
  }, [albums]);

  // Derive images from photos in published albums
  const galleryImages = useMemo(() => {
    const publishedAlbumIds = new Set(albums.filter(a => a.isPublished).map(a => a.id));
    return photos
      .filter(p => p.albumId && publishedAlbumIds.has(p.albumId))
      .map(p => ({
        id: p.id,
        src: `${api.defaults.baseURL}/v1/photos/${p.id}/view`,
        category: p.albumId,
        region: p.region,
        alt: p.caption || p.name || 'Gallery image'
      }));
  }, [albums, photos]);

  // Filter images based on category and region
  const filteredImages = useMemo(() => {
    return galleryImages.filter((img) => {
      const categoryMatch =
        activeCategory === "all" || img.category === activeCategory;
      const regionMatch = !activeRegion || img.region === activeRegion;
      return categoryMatch && regionMatch;
    });
  }, [galleryImages, activeCategory, activeRegion]);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Category Tabs — horizontally scrollable on mobile */}
        <div
          className="gallery-tabs-scroll flex flex-nowrap md:flex-wrap justify-start gap-2 md:gap-4 mb-8 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            .gallery-tabs-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {galleryCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                // Increment album view once per session per album
                if (cat.id !== "all" && !viewedAlbums.current.has(cat.id)) {
                  viewedAlbums.current.add(cat.id);
                  api.patch(`/v1/albums/${cat.id}/view`).catch((err) => console.error('[Album view error]', err));
                }
              }}
              className={`text-sm md:text-base font-secondary font-medium transition-all duration-300 relative pb-4 px-3 md:px-2 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === cat.id
                  ? "text-brand-lilac-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-brand-lilac-600 after:rounded-t-sm"
                  : "text-brand-dark-300 hover:text-brand-lilac-500"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Region Filters — Dropdown on mobile, pill buttons on desktop */}
        {/* Mobile Dropdown */}
        <div className="block md:hidden mb-10" ref={dropdownRef}>
          <div className="relative">
            <button
              onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3 rounded-xl bg-brand-lilac/10 border border-brand-lilac-200 text-sm font-bold text-brand-lilac-800 uppercase tracking-wider transition-all duration-300 cursor-pointer"
            >
              <span>{activeRegionLabel}</span>
              <Icon
                icon="heroicons:chevron-down"
                className={`w-5 h-5 transition-transform duration-300 ${
                  regionDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute z-30 left-0 right-0 mt-2 rounded-xl bg-brand-white border border-brand-lilac-100 shadow-xl overflow-hidden transition-all duration-300 origin-top ${
                regionDropdownOpen
                  ? "opacity-100 scale-y-100 pointer-events-auto"
                  : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
              {/* "All Regions" option */}
              <button
                onClick={() => {
                  setActiveRegion(null);
                  setRegionDropdownOpen(false);
                }}
                className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                  !activeRegion
                    ? "bg-brand-lilac-100 text-brand-lilac-800"
                    : "text-brand-dark-300 hover:bg-brand-lilac-50"
                }`}
              >
                All Regions
              </button>
              {GALLERY_REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => {
                    setActiveRegion(
                      activeRegion === region.id ? null : region.id,
                    );
                    setRegionDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                    activeRegion === region.id
                      ? "bg-brand-lilac-100 text-brand-lilac-800"
                      : "text-brand-dark-300 hover:bg-brand-lilac-50"
                  }`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Pill Buttons */}
        <div className="hidden md:flex flex-wrap items-center justify-start gap-4 mb-16">
          <span className="text-sm md:text-base font-primary font-medium text-gray-400 tracking-widest uppercase mr-4">
            REGIONS
          </span>
          <button
            onClick={() => setActiveRegion(null)}
            className={`cursor-pointer px-8 py-2.5 rounded-full text-sm font-bold text-brand-white uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
              !activeRegion
                ? "bg-brand-lilac-800 shadow-brand-lilac/50 scale-105 ring-2 ring-offset-2 ring-brand-lilac-800"
                : "bg-brand-lilac hover:bg-brand-lilac/90"
            }`}
          >
            ALL
          </button>
          {GALLERY_REGIONS.map((region) => (
            <button
              key={region.id}
              onClick={() =>
                setActiveRegion(activeRegion === region.id ? null : region.id)
              }
              className={`cursor-pointer px-8 py-2.5 rounded-full text-sm font-bold text-brand-white uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Icon icon="ph:spinner-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((img) => (
              <div
                key={img.id}
                onClick={() => {
                  setSelectedImage(img);
                  // Increment photo view once per session
                  if (!viewedPhotos.current.has(img.id)) {
                    viewedPhotos.current.add(img.id);
                    api.patch(`/v1/photos/${img.id}/view`).catch((err) => console.error('[Photo view error]', err));
                  }
                }}
                className="relative group overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300 cursor-zoom-in"
              >
                <ImageWithLoader src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && filteredImages.length === 0 && (
          <div className="text-center py-20 bg-brand-white-50 rounded-2xl border border-brand-lilac-100">
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

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 md:top-8 md:right-8 text-brand-white/70 hover:text-brand-white transition-colors cursor-pointer p-2"
            onClick={() => setSelectedImage(null)}
          >
            <Icon icon="heroicons:x-mark" className="w-8 h-8 md:w-10 md:h-10" />
          </button>

          <div
            className="relative max-w-5xl max-h-full w-auto h-auto rounded-lg overflow-hidden flex flex-col items-center"
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking image info
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryGrid;
