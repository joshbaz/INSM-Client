import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const CARDS_DATA = [
  {
    id: 1,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/cc9a5e89836850c364b70c4f8c5668e4d2ff8500.png",
    title: "Institutional SACCO Infrastructure",
    description:
      "We have consolidated 17,000+ fragmented producers into governed Cooperative Societies.",
  },
  {
    id: 2,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/c28126f0fa21ff64ada52f6689f43d1e74bf046c.png",
    title: 'The "Makindye Blueprint" Engine',
    description:
      "We turned 17,000+ unmapped labor into a professional workforce for wealth creation.",
  },
  {
    id: 3,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/8dbf70e93d3efe7df76b6e2153e64ea54d139809.png",
    title: "Commanding the Value Chain",
    description:
      "We transitioned 17,000+ producers from subsistence output to commanding a seat at the economic table.",
  },
  {
    id: 4,
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/566072bc0c5d53da65e9b10a82415c4e1dad98f8.png",
    title: "Securing National Economic Sovereignty",
    description:
      "By fortifying 17,000+ household, we anchor the long-term stability of 50,000+ future stakeholders.",
  },
];

const HomeCards = () => {
  return (
    <section className="w-full py-20 md:py-28 px-4 md:px-8 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header Section */}
        <motion.div
          className="mb-14 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Gold Title */}
          <motion.h2
            variants={fadeUp}
            className="text-base md:text-lg lg:text-xl xl:text-5xl 2xl:text-6xl font-primary text-brand-gold leading-tight mb-3"
            style={{ fontStyle: "italic", fontWeight: 400 }}
          >
            17,000+ Economic Units Deployed
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-brand-white-200 font-medium mb-6"
          >
            The Industrial Proof Is In The Parish
          </motion.p>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base font-secondary text-brand-dark-200 leading-relaxed"
          >
            In Uganda, Market Dominance is a game of scale—and we are the Lead
            Aggregators. With women comprising 51% of the national population,
            the 17,000+ operatives we have mobilized represent a high-velocity
            Economic Bloc, not a social demographic. We have weaponized latent
            tenacity into Precision Market Mastery.
          </motion.p>
        </motion.div>

        {/* 2×2 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6 2xl:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CARDS_DATA.map((card) => (
            <motion.div
              key={card.id}
              variants={fadeUp}
              className="group relative h-64 sm:h-72 md:h-80 xl:h-96 2xl:h-[480px] w-full overflow-hidden rounded-lg"
            >
              {/* Background Image */}
              <img
                src={card.image}
                alt={card.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10"></div>

              {/* Content — anchored to bottom */}
              <div className="absolute bottom-0 left-0 w-full p-5 md:p-8 xl:p-10 flex flex-col gap-2">
                <h3
                  className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold font-primary leading-tight drop-shadow-lg"
                  style={{ color: "var(--industrial-white)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm md:text-base font-secondary leading-relaxed max-w-md drop-shadow-md"
                  style={{ color: "var(--dark-200)" }}
                >
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
