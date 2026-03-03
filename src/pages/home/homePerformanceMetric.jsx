import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const METRICS = [
  { id: 1, label: "Active Production Units", value: "17,000+", suffix: "" },
  { id: 2, label: "National Coverage", value: "146", suffix: " Districts" },
  { id: 3, label: "Female Leadership", value: "100", suffix: "%" },
  { id: 4, label: "Economic Surplus", value: "Growing", suffix: " Daily" },
];

const HomePerformanceMetric = () => {
  return (
    <section className="w-full bg-brand-navy py-16 px-4 md:px-8 border-y border-brand-navy-400/30">
      <div className="max-w-6xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Header / Intro */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/20 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            <span className="text-xs font-secondary font-semibold text-brand-teal uppercase tracking-wider">
              Live Network Status
            </span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-primary font-bold text-brand-white text-center">
            Real-Time Mobilization Impact
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {METRICS.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-brand-navy-600/50 border border-brand-navy-400/20 backdrop-blur-sm group hover:border-brand-gold/30 hover:bg-brand-navy-600/80 transition-all"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-primary text-brand-gold mb-2 flex items-baseline gap-1">
                <span>{metric.value}</span>
                <span className="text-lg md:text-xl font-medium text-brand-gold/80">
                  {metric.suffix}
                </span>
              </div>
              <p className="text-xs md:text-sm font-secondary font-medium text-brand-white-200 text-center uppercase tracking-wide">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePerformanceMetric;
