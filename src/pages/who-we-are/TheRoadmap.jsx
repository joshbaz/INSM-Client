import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const PHASES = [
  {
    id: 1,
    label: "PROVEN SUCCESS",
    title: "Phase I:\nInstitutional Asset Mobilization",
    text: "We have successfully consolidated over 17,000 production units into governed, bankable SACCOs, securing the foundational ledger required for large-scale economic expansion.",
  },
  {
    id: 2,
    label: "CURRENT FOCUS",
    title: "Phase II:\nVertical Value-Addition & Industrialization",
    text: 'We are executing the transition from primary production to Advanced Industrial Processing. Through our "Venture Hubs," our members command the entire supply chain in Commercial Agriculture and Tourism—capturing the total surplus.',
  },
  {
    id: 3,
    label: "VISION 2027 - 2030",
    title: "Phase III:\nNational Economic Integration",
    text: 'We are deploying the "Makindye Prototype" across all 146 districts. This will transform the single-mother demographic into the Nation’s most Reliable, Disciplined, and High-Yield Production Workforce.',
  },
];

const TheRoadmap = () => {
  return (
    <section id="the-roadmap" className="w-full bg-white py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-5xl font-bold font-primary text-brand-navy-900 mb-2"
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
            className="font-secondary text-base md:text-lg text-brand-navy-900 leading-relaxed font-medium"
          >
            INSM is a Permanent Economic Infrastructure with a definitive 2030
            Roadmap for National Integration. Our institutionalized governance
            architecture ensures Absolute Fiscal Integrity and structural
            transparency.
          </motion.p>
        </motion.div>

        {/* Phase Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {PHASES.map((phase) => (
            <motion.div
              key={phase.id}
              variants={fadeUp}
              className="bg-brand-gold/40 p-8 md:p-10 flex flex-col items-start min-h-[400px]"
            >
              <span className="text-brand-navy-900/80 font-primary font-bold text-[10px] tracking-[0.15em] uppercase mb-8">
                {phase.label}
              </span>
              <h3 className="text-2xl lg:text-[1.75rem] font-bold font-primary text-brand-navy-900 mb-6 whitespace-pre-line leading-tight">
                {phase.title}
              </h3>
              <p className="font-secondary text-base md:text-lg text-brand-navy-800 leading-relaxed font-medium">
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
