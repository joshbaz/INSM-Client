import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { fadeUp, staggerContainer } from "../../utils/animations";
import useSEO from "../../hooks/useSEO";

const PartnerPortalPage = () => {
  useSEO({
    title: "Partner Portal",
    description:
      "INSM Uganda Partner Portal — A secure dashboard for strategic partners. Coming soon.",
  });

  return (
    <div className="min-h-screen bg-brand-navy-900 flex items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-lilac/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[32px_32px]"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-xl w-full mx-4 md:mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Logo + Badge */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col items-center mb-10"
        >
          <div className="bg-brand-white rounded-full p-2 shadow-lg border border-brand-gold/20 mb-6">
            <img
              src="/logo.png"
              alt="INSM Uganda Logo"
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-brand-gold/40"></span>
            <span className="text-[9px] font-primary font-bold text-brand-gold uppercase tracking-[0.4em]">
              Partner Portal
            </span>
            <span className="w-8 h-px bg-brand-gold/40"></span>
          </div>
          <h1 className="text-3xl md:text-4xl font-primary font-black text-brand-white uppercase tracking-tight text-center leading-tight">
            Coming <span className="text-brand-gold">Soon</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          className="text-brand-white/60 font-secondary text-sm md:text-base text-center leading-relaxed mb-12 max-w-md mx-auto"
        >
          We are building a secure, institutional-grade portal for strategic
          partners. This dashboard will provide real-time access to impact
          metrics, capital deployment reports, and cooperative governance tools.
        </motion.p>

        {/* Login Form (placeholder) */}
        <motion.div
          variants={fadeUp}
          className="bg-brand-white/5 backdrop-blur-sm border border-brand-white/10 p-8 md:p-10 space-y-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Icon
              icon="heroicons:lock-closed-20-solid"
              className="w-4 h-4 text-brand-gold"
            />
            <span className="text-[10px] font-primary font-bold text-brand-gold uppercase tracking-[0.3em]">
              Partner Login
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-primary font-bold text-brand-white/40 uppercase tracking-[0.15em]">
                Email Address
              </label>
              <input
                type="email"
                placeholder="partner@organisation.org"
                disabled
                className="w-full bg-brand-white/5 border border-brand-white/10 rounded-sm px-4 py-3 text-sm font-secondary text-brand-white/30 placeholder:text-brand-white/20 outline-none cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-primary font-bold text-brand-white/40 uppercase tracking-[0.15em]">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                disabled
                className="w-full bg-brand-white/5 border border-brand-white/10 rounded-sm px-4 py-3 text-sm font-secondary text-brand-white/30 placeholder:text-brand-white/20 outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <button
            disabled
            className="w-full bg-brand-gold/20 text-brand-gold/40 font-primary font-bold text-[10px] uppercase tracking-[0.2em] py-4 rounded-full cursor-not-allowed border border-brand-gold/10 flex items-center justify-center gap-3"
          >
            <Icon icon="heroicons:lock-closed-20-solid" className="w-4 h-4" />
            Portal Under Construction
          </button>
        </motion.div>

        {/* Back link */}
        <motion.div variants={fadeUp} className="mt-8 text-center">
          <a
            href="/"
            className="text-[10px] font-primary font-bold text-brand-white/30 hover:text-brand-gold uppercase tracking-[0.3em] transition-colors"
          >
            ← Return to Main Site
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PartnerPortalPage;
