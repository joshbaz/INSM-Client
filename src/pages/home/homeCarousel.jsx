import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const CAROUSEL_DATA = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image.png",
    title: "Who we are",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec elit ornare purus consequat faucibus non a orci. Duis eleifend eu ipsum ut commodo. Etiam mollis fermentum dapibus. Proin at consectetur sapien. Aenean ultricies, est eu rhoncus mattis, libero libero dictum ipsum, sit amet ultricies nulla lacus eu erat.",
    link: "/who-we-are",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/Frame%202.png",
    title: "What we do",
    description:
      "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.",
    link: "/what-we-do",
  },
];

const HomeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_DATA.length);
      setIsAnimating(false);
    }, 500); // Wait for fade out animation
  };

  const currentItem = CAROUSEL_DATA[currentIndex];

  return (
    <section className="w-full bg-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div
          className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 transition-opacity duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[500px] aspect-4/5 md:aspect-square overflow-hidden rounded-lg shadow-sm">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-bold font-primary text-brand-dark leading-tight">
              {currentItem.title}
            </h2>

            <p className="text-lg text-brand-dark-400 font-secondary leading-relaxed">
              {currentItem.description}
            </p>

            <div className="mt-4">
              <Link
                to={currentItem.link}
                className="inline-flex items-center gap-2 font-bold text-brand-dark text-sm uppercase tracking-wider hover:text-brand-lilac transition-colors group"
              >
                LEARN More
                <Icon
                  icon="heroicons:arrow-right"
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;
