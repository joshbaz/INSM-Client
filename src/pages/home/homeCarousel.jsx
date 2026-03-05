import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeUp,
  slideInLeft,
  slideInRight,
  staggerContainer,
} from "../../utils/animations";

const CAROUSEL_DATA = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image.png",
    title: "Who we are",
    description:
      "We are a global community dedicated to uplifting single mothers through connection, advocacy, and opportunity. Born from lived experience, our network brings together women across borders to share strength, build resilience, and create lasting change for families everywhere.",
    link: "/who-we-are/our-story",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/Frame%202.png",
    title: "What we do",
    description:
      "From skills training and mentorship to community-driven projects, we equip single mothers with the tools they need to thrive. Our programmes span education, entrepreneurship, and wellness — empowering women to build sustainable livelihoods and brighter futures for their children.",
    link: "/what-we-do",
  },
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_DATA.length);
    }, 6000); // Change every 6 seconds to allow for animations

    return () => clearInterval(interval);
  }, []);

  const currentItem = CAROUSEL_DATA[currentIndex];

  return (
    <section className="w-full bg-brand-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
          >
            {/* Image Side */}
            <motion.div
              variants={slideInLeft}
              className="w-full md:w-1/2 flex justify-center md:justify-start"
            >
              <div className="relative w-full max-w-[500px] aspect-square md:aspect-square xl:aspect-4/5 overflow-hidden rounded-lg shadow-sm">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
              variants={fadeUp}
              className="w-full md:w-1/2 flex flex-col gap-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-primary text-brand-dark leading-tight">
                {currentItem.title}
              </h2>

              <p className="text-lg text-brand-dark-400 font-secondary leading-relaxed">
                {currentItem.description}
              </p>

              <div className="mt-4">
                <Link
                  to={currentItem.link}
                  className="inline-flex items-center gap-2 font-bold text-brand-dark text-sm uppercase tracking-wider hover:text-brand-lilac/90 transition-colors group"
                >
                  LEARN More
                  <Icon
                    icon="heroicons:arrow-right"
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeCarousel;
