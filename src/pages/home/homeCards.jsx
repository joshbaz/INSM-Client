import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const CARDS_DATA = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/cc9a5e89836850c364b70c4f8c5668e4d2ff8500.png",
    title: "17,000+ Lives Impacted.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec elit ornare purus.",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/c28126f0fa21ff64ada52f6689f43d1e74bf046c.png",
    title: "The Gold Standard of Transparency.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec elit ornare purus.",
  },
  {
    id: 3,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/8dbf70e93d3efe7df76b6e2153e64ea54d139809.png",
    title: "Beyond Resilience to Mastery.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec elit ornare purus.",
  },
  {
    id: 4,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/566072bc0c5d53da65e9b10a82415c4e1dad98f8.png",
    title: "Secure the Mother, Secure the Nation.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec elit ornare purus.",
  },
];

const HomeCards = () => {
  return (
    <section className="w-full pt-32 pb-20 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CARDS_DATA.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              className="group relative h-80 md:h-96 w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.01] bg-gray-200"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 flex flex-col gap-2 md:gap-3">
                <h3 className="text-2xl md:text-4xl font-bold text-brand-white font-primary leading-tight drop-shadow-lg">
                  {card.title}
                </h3>
                <p className="text-brand-white-100 text-base md:text-lg font-secondary font-medium leading-relaxed max-w-lg drop-shadow-md">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCards;
