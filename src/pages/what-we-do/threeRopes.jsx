import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const ROPES = [
  /* ─── CARD 1: Financial Mastery ─── */
  {
    id: 1,
    label: "FIRST ROPE",
    title: "Financial Mastery",
    bg: "bg-brand-lilac-100",
    labelColor: "text-brand-lilac-400", // ← label color
    titleColor: "text-brand-lilac-800", // ← title color
    leftTextColor: "text-brand-lilac-800", // ← left quote-text color
    rightTextColor: "text-brand-lilac-700", // ← right description color
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/cc9a5e89836850c364b70c4f8c5668e4d2ff8500.png",
    leftText: {
      heading: "Solving problems through micro-investment pooling",
    },
    rightText:
      "We organize mothers into registered SACCOs, providing the financial literacy needed to move them from subsistence crisis to wealth creation.",
  },
  /* ─── CARD 2: Vocational Mastery ─── */
  {
    id: 2,
    label: "SECOND ROPE",
    title: "Vocational Mastery",
    bg: "bg-brand-teal-100",
    labelColor: "text-brand-teal-400", // ← label color
    titleColor: "text-brand-teal-800", // ← title color
    leftTextColor: "text-brand-teal-800", // ← left quote-text color
    rightTextColor: "text-brand-teal-700", // ← right description color
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/c28126f0fa21ff64ada52f6689f43d1e74bf046c.png",
    leftText: {
      heading: "Identifying and accelerating growth in key sectors.",
    },
    rightText:
      "We provide specialized training for high-potential sectors including Commercial Agriculture and Tourism Support Services.",
  },
  /* ─── CARD 3: Family Stability ─── */
  {
    id: 3,
    label: "THIRD ROPE",
    title: "Family Stability",
    bg: "bg-brand-white-100",
    labelColor: "text-brand-white-700", // ← label color
    titleColor: "text-brand-white-800", // ← title color
    leftTextColor: "text-brand-white-800", // ← left quote-text color
    rightTextColor: "text-brand-white-700", // ← right description color
    image:
      "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/8dbf70e93d3efe7df76b6e2153e64ea54d139809.png",
    leftText: {
      heading: "Building a stable Uganda from the home up.",
    },
    rightText:
      "Through mental health resilience and positive parenting resources, we are securing a stable home for the next generation of Ugandan.",
  },
];

/* ── Decorative quote-mark icon ── */
const QuoteMark = () => (
  <Icon
    icon="mdi:format-quote-open"
    className="w-16 h-16 sm:hidden md:block absolute top-1/2 -translate-y-1/8 text-brand-lilac-200 opacity-40 shrink-0"
  />
);

const ThreeRopes = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section header — left aligned */}
        <motion.div
          className="mb-12 md:mb-16 max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-4">
            The Three Ropes
          </h2>
          <p className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed">
            A single mother is not a &ldquo;survivor,&rdquo; nor is she a
            burden. She is the untapped cornerstone of our national prosperity.
            We use the &ldquo;Three Rope&rdquo; blueprint to ensure every
            household we reach transitions from surviving to building
            generational wealth.
          </p>
        </motion.div>

        {/* Rope cards */}
        <motion.div
          className="flex flex-col gap-10 md:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {ROPES.map((rope) => (
            <motion.div
              key={rope.id}
              variants={fadeUp}
              className={`${rope.bg} relative overflow-hidden`}
            >
              {/* Full card row: left column | image | right column */}
              <div className="flex flex-col md:flex-row items-stretch md:h-[340px]">
                {/* Left column — label + title at top, quote + text at bottom */}
                <div className="w-full md:w-1/4 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    {/* LABEL COLOR */}
                    <span
                      className={`text-xs font-semibold font-primary ${rope.labelColor} uppercase tracking-widest block mb-3`}
                    >
                      {rope.label}
                    </span>
                    {/* TITLE COLOR */}
                    <h3
                      className={`text-2xl mt-2 md:mt-8 md:text-3xl font-bold font-primary ${rope.titleColor}`}
                    >
                      {rope.title}
                    </h3>
                  </div>

                  <div className="mt-6 flex flex-col gap-2">
                    <QuoteMark />
                    {/* LEFT QUOTE-TEXT COLOR */}
                    <p
                      className={`text-sm md:text-xl font-semibold font-primary ${rope.leftTextColor} leading-snug`}
                    >
                      {rope.leftText.heading}
                    </p>
                  </div>
                </div>

                {/* Center image — fills full card height */}
                <div className="w-full md:w-2/4">
                  <img
                    src={rope.image}
                    alt={rope.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>

                {/* Right column — text at bottom */}
                <div className="w-full md:w-1/4 p-6 md:p-8 flex flex-col justify-end">
                  {/* RIGHT DESCRIPTION COLOR */}
                  <p
                    className={`text-sm font-secondary ${rope.rightTextColor} leading-relaxed`}
                  >
                    {rope.rightText}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ThreeRopes;
