import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, scaleUp, staggerContainer } from "../../utils/animations";

const PowerMovement = () => {
  return (
    <section className="relative w-full h-[449px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/24d67f7bedf75fdebe204784ab41ceb9f7e96699.png")`,
        }}
      ></div>

      {/* Color Overlay — brand lilac with 85% opacity */}
      <div
        className="absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: "#7F4829", opacity: 0.98 }}
      ></div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center text-brand-white flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-5xl font-bold font-primary mb-6 drop-shadow-sm leading-tight"
        >
          Ready to Power the Movement?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="text-base md:text-xl font-secondary leading-relaxed mb-10 opacity-95 max-w-3xl mx-auto font-light"
        >
          Our data proves that when you provide the infrastructure, single
          mothers provide the growth. We invite you to join us in building the
          economic future of Uganda.
        </motion.p>

        <motion.div variants={scaleUp}>
          <Link
            to="/how-to-help/join-the-assignment"
            className="bg-[#E5DAD4] text-[#7F4829] font-bold text-xs md:text-sm py-4 px-8 rounded-full cursor-pointer hover:bg-[#E5DAD4]/90 transition-all transform hover:scale-105 uppercase tracking-widest shadow-lg"
          >
            Empower A Mother Today
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PowerMovement;
