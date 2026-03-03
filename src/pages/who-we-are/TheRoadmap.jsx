import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const PHASES = [
  {
    id: 1,
    label: "PROVEN SUCCESS",
    phase: "Phase I:",
    title: "Institutional Asset Mobilization",
    text: "We have successfully consolidated over 17,000 production units into governed, bankable SACCOs, securing the foundational ledger required for large-scale economic expansion.",
  },
  {
    id: 2,
    label: "CURRENT FOCUS",
    phase: "Phase II:",
    title: "Vertical Value-Addition & Industrialization",
    text: 'We are executing the transition from primary production to Advanced Industrial Processing. Through our "Venture Hubs," our members command the entire supply chain in Commercial Agriculture and Tourism—capturing the total surplus.',
  },
  {
    id: 3,
    label: "VISION 2027 - 2030",
    phase: "Phase III:",
    title: "National Economic Integration",
    text: 'We are deploying the "Makindye Prototype" across all 146 districts. This will transform the single-mother demographic into the Nation\u2019s most Reliable, Disciplined, and High-Yield Production Workforce.',
  },
];

const TheRoadmap = () => {
  return (
    <section
      id="the-roadmap"
      className="w-full bg-white py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* ── Header ── */}
        <motion.div
          className="mb-14 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-bold font-primary text-brand-dark mb-2"
          >
            The Strategic Blueprint
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-secondary text-brand-dark-300 mb-6"
          >
            Architecting Permanent Fiscal Sovereignty
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="font-secondary text-base md:text-lg text-brand-dark leading-relaxed"
          >
            INSM is a Permanent Economic Infrastructure with a definitive 2030
            Roadmap for National Integration. Our institutionalized governance
            architecture ensures Absolute Fiscal Integrity and structural
            transparency
          </motion.p>
        </motion.div>

        {/* ── Phase Cards ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {PHASES.map((phase) => (
            <motion.div
              key={phase.id}
              variants={fadeUp}
              className="bg-brand-gold-300 p-8 md:p-10 flex flex-col items-start overflow-hidden"
            >
              {/* Label */}
              <span className="text-brand-gold-700 font-primary font-semibold text-xs tracking-[0.12em] uppercase mb-10">
                {phase.label}
              </span>

              {/* Phase number + Title */}
              <h3 className="font-primary mb-6 leading-tight normal-case!">
                <span className="block text-lg md:text-xl font-semibold text-brand-gold-700">
                  {phase.phase}
                </span>
                <span className="block text-xl md:text-2xl font-extrabold">
                  {phase.title}
                </span>
              </h3>

              {/* Description */}
              <p className="font-secondary text-sm md:text-base text-brand-gold-800 leading-relaxed mt-auto">
                {phase.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TheRoadmap;
