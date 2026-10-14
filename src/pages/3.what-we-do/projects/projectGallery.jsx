import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { resolveImageUrl } from "../../../data/projectOptions";

export const Lightbox = ({ images, index, onClose, onChange, title }) => {
  const count = images.length;
  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
        aria-label="Close"
      >
        <Icon icon="ph:x-bold" className="w-5 h-5" />
      </button>

      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          aria-label="Previous image"
        >
          <Icon icon="ph:caret-left-bold" className="w-6 h-6" />
        </button>
      )}

      <img
        src={resolveImageUrl(images[index])}
        alt={`${title} gallery ${index + 1}`}
        onClick={(e) => e.stopPropagation()}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
      />

      {count > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          aria-label="Next image"
        >
          <Icon icon="ph:caret-right-bold" className="w-6 h-6" />
        </button>
      )}

      <p className="absolute bottom-5 text-sm font-secondary text-white/70">
        {index + 1} / {count}
      </p>
    </div>
  );
};

// Shows the gallery images that aren't already used elsewhere on the project page
const ProjectGallery = ({ project }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const shownElsewhere = new Set(
    [project.coverImage, project.galleryImages?.[0], project.extendedStory ? project.storyImage : null].filter(Boolean),
  );
  const images = [...new Set(project.galleryImages || [])].filter((url) => !shownElsewhere.has(url));

  if (images.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-6 md:px-24">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-primary text-brand-dark mb-6 leading-[1.1]">
          Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((url, i) => (
            <button
              key={url}
              onClick={() => setOpenIndex(i)}
              className="group relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-zoom-in"
            >
              <img
                src={resolveImageUrl(url)}
                alt={`${project.title} gallery ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox images={images} index={openIndex} onChange={setOpenIndex} onClose={() => setOpenIndex(null)} title={project.title} />
      )}
    </section>
  );
};

export default ProjectGallery;
