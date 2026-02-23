import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SLIDER_IMAGES = [
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/projectImage.png",
    alt: "Mothers in the Makindye Model programme",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/cc9a5e89836850c364b70c4f8c5668e4d2ff8500.png",
    alt: "Community gathering for impact",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/technical.png",
    alt: "Technical mentorship session",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/equippers.png",
    alt: "Community equipper in action",
  },
  {
    src: "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/566072bc0c5d53da65e9b10a82415c4e1dad98f8.png",
    alt: "Secure the Mother, Secure the Nation",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const total = SLIDER_IMAGES.length;

  /* Auto-advance every 4s */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = (current - 1 + total) % total;
  const next = (current + 1) % total;

  return (
    <section className="w-full bg-white py-10 md:py-16 overflow-hidden">
      {/* Slider row — full width */}
      <div className="relative flex items-center justify-center gap-2 md:gap-3">
        {/* Previous image peek */}
        <div className="hidden md:block w-[6%] shrink-0 h-[400px] overflow-hidden">
          <img
            src={SLIDER_IMAGES[prev].src}
            alt={SLIDER_IMAGES[prev].alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main image */}
        <div className="w-full md:w-[88%] h-[300px] md:h-[520px] overflow-hidden">
          <img
            src={SLIDER_IMAGES[current].src}
            alt={SLIDER_IMAGES[current].alt}
            className="w-full h-full object-cover transition-all duration-500"
          />
        </div>

        {/* Next image peek */}
        <div className="hidden md:block w-[6%] shrink-0 h-[400px] overflow-hidden">
          <img
            src={SLIDER_IMAGES[next].src}
            alt={SLIDER_IMAGES[next].alt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Gallery link */}
      <div className="text-center mt-6">
        <Link
          to="/what-we-do/gallery"
          className="text-sm font-secondary text-brand-dark-400 hover:text-brand-dark transition-colors underline underline-offset-2"
        >
          Click here to view more photos
        </Link>
      </div>
    </section>
  );
};

export default ImageSlider;
