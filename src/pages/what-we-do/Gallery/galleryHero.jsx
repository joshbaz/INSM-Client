import React from "react";

const GalleryHero = () => {
  return (
    <section className="bg-brand-pink-100/50 py-20 md:py-32 w-full text-center px-4">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-primary text-brand-dark uppercase tracking-wide">
          GALLERY
        </h1>
        <p className="text-base md:text-lg lg:text-xl font-secondary text-brand-dark-400 max-w-2xl leading-relaxed">
          We're documenting National Transformation: From a Single Mothers
          Resilience to Her Economic Power.
        </p>
      </div>
    </section>
  );
};

export default GalleryHero;
