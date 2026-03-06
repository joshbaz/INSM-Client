import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { fadeUp, fadeIn, staggerContainer } from "../../utils/animations";

const HomeVision = () => {
  return (
    <section className="w-full bg-brand-white py-20 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto xl:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
        >
          {/* Image Side  */}
          <motion.div
            variants={fadeIn}
            className="w-full md:w-1/2 flex justify-center md:justify-start"
          >
            <div className="relative w-full aspect-4/5 overflow-hidden rounded-sm shadow-sm md:max-w-md">
              <img
                src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image.png"
                alt="INSM Vision"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            variants={fadeUp}
            className="w-full md:w-1/2 flex flex-col items-start text-left"
          >
            <p className="text-xs font-semibold text-brand-lilac-800 uppercase tracking-widest mb-4">
              Our Vision
            </p>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-primary text-brand-dark leading-tight mb-6">
              Architecting An Unshakeable Prosperity
            </h2>

            <div className="space-y-6 text-brand-dark-600 font-secondary text-base lg:text-[17px] leading-relaxed max-w-lg">
              <p>
                At the International Network for Single Mothers-Uganda Chapter,
                we don't just manage decentralized units; we optimize them. We
                have engineered a national infrastructure that converts the
                high-tenacity capability of 17,000+ members into a
                high-precision economic force.
              </p>
              <p>
                By providing the "Strategic Anchors" of Systems, Capital, and
                Mastery, we are securing the kitchen table to stabilize the
                Nation.
              </p>
            </div>

            <div className="mt-8 md:mt-10">
              <Link
                to="/who-we-are/our-story"
                className="inline-flex items-center gap-2 font-bold text-brand-dark text-sm uppercase tracking-wider hover:text-brand-lilac-700 transition-colors group"
              >
                LEARN MORE
                <Icon
                  icon="heroicons:chevron-right-20-solid"
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeVision;
