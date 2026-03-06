import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const BG_IMAGE =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/purple.png?updatedAt=1772790851526";

const HomeHero = () => {
  return (
    <section className="w-full flex flex-col bg-brand-dark-900">
      {/* ── TOP SECTION (IMAGE HOOK) ── */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center pt-24 md:pt-32 pb-16 md:pb-20">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={BG_IMAGE}
            alt="Single mothers economic empowerment"
            className="w-full h-full object-cover md:object-center object-right"
          />
          {/* Subtle overlay to guarantee text legibility */}
          <div className="absolute inset-0 bg-brand-dark-900/40 md:bg-brand-dark-900/20" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-10 md:pt-0">
          <motion.div
            className="w-full md:max-w-xl lg:max-w-2xl border-y border-brand-white/20 p-6 md:p-10 xl:p-12 backdrop-blur-[2px]"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              variants={fadeUp}
              className="font-primary font-bold text-brand-white leading-[1.1] tracking-tight"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl block uppercase mb-4">
                Forget The <br className="hidden sm:block" />
                Theories
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl block text-brand-white/90">
                We've Engineered <br className="hidden sm:block" />
                an Economic Force <br className="hidden sm:block" />
                of 17,000 Lives.
              </span>
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM SECTION (CTA ENGINE) ── */}
      <div className="relative w-full bg-brand-dark-900 py-16 md:py-24 z-20">
        <motion.div
          className="max-w-4xl mx-auto px-6 md:px-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          {/* Headers */}
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-primary tracking-wide leading-tight mb-6 text-transparent bg-clip-text bg-linear-to-l from-brand-gold-300 via-brand-gold to-brand-gold-600"
          >
            The Engine Of Market <br className="hidden sm:block" /> Dominance
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base font-secondary text-brand-white-100/80 leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            Uganda's 17,000 single mothers are no longer a demographic of
            survivors — they are a disciplined economic bloc dominating
            Agriculture and Tourism value chains.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/how-to-help/join-the-assignment"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] bg-brand-gold text-brand-navy-900 font-primary font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-transform hover:scale-105"
            >
              Access The Terminal
            </Link>

            <Link
              to="/how-to-help/partner-with-us"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[52px] border-2 border-brand-gold text-brand-gold font-primary font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-full transition-all hover:bg-brand-gold/10 hover:scale-105"
            >
              Invest in the Bloc
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
