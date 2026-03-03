import React from "react";
import { motion } from "framer-motion";

const WhoWeAreOutro = () => {
  return (
    <section className="w-full bg-transparent py-24 md:py-44 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <div className="relative flex items-center min-h-[400px]">
          {/* 1. Background Image - Shifted Left/Top */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-0 w-full max-w-lg aspect-video md:aspect-square md:max-w-xl overflow-hidden bg-brand-navy-100"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
              alt="Strategic blueprint background"
              className="w-full h-full object-cover opacity-30 grayscale mix-blend-multiply"
            />
            {/* The "checkerboard/grid" effect overlay from the screenshot */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          </motion.div>

          {/* 2. Overlapping Text Box - Offset to the right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute left-10 md:left-48 right-0 z-10 bg-brand-navy-400 p-10 md:p-16 shadow-2xl"
          >
            <h2 className="text-white text-xl md:text-3xl lg:text-h2 font-light leading-relaxed tracking-tight">
              This is no longer an appeal for charity. It is an invitation to{" "}
              <span className="font-semibold">Capitalize</span> strategically in
              a movement that will redefine the national economic landscape. The
              blueprint is written; the momentum is building.{" "}
              <span className="italic">Now, we run.</span>
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreOutro;
