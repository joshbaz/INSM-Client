import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";
import { fadeUp, staggerContainer } from "../../utils/animations";
import StrategyInquiryForm from "./StrategyInquiryForm";

const SeedPortals = () => {
  useSEO({
    title: "Seed Portals & 1k Club | INSM Uganda",
    description:
      "The dual engine of national transformation. Join the 1k Club or capitalize a Parish Seed Portal to secure Uganda's industrial future.",
  });

  return (
    <div className="min-h-screen bg-brand-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* ── Header: Matching Strategic Blueprint Style ── */}
        <motion.div
          className="mb-14 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 text-brand-lilac-700 mb-6"
          >
            <span className="w-12 h-px bg-brand-lilac-600"></span>
            <span className="text-[10px] font-primary font-bold uppercase tracking-[0.4em]">
              Institutional Grade Deployment
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-lg md:text-xl lg:text-2xl font-black font-primary text-brand-white-900 uppercase leading-tight mb-6"
          >
            The Seed <span className="text-brand-lilac-700">Portals</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base font-secondary text-brand-dark-400 mb-6 italic border-l-2 border-brand-lilac-200 pl-6 leading-relaxed"
          >
            "This is the dual engine of our structural mandate. Whether you are
            an elite individual partner or a cooperative architect, these
            portals are where transition becomes momentum."
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="text-[10px] font-primary font-bold text-brand-lilac-600 uppercase tracking-widest">
              Mandate:
            </span>
            <span className="text-[11px] font-secondary text-brand-dark-300 uppercase tracking-wider">
              National Structural Transition.
            </span>
          </motion.div>
        </motion.div>

        {/* ── The Two Engines: Architectural Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {/* Engine 1: The 1k Club */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-lilac-100 p-8 md:p-12 relative group flex flex-col h-full overflow-hidden"
          >
            <span className="text-brand-lilac-700 font-primary font-bold text-[10px] tracking-[0.15em] uppercase mb-10">
              LIQUIDITY ENGINE: 1K-CLUB-V1
            </span>

            <div className="flex items-center gap-4 mb-6 text-brand-lilac-700">
              <Icon icon="heroicons:star-20-solid" className="w-8 h-8" />
              <h2 className="text-sm md:text-base font-primary font-bold uppercase tracking-tight text-brand-lilac-900">
                The 1k Club
              </h2>
            </div>

            <p className="font-secondary text-xs md:text-sm text-brand-lilac-800 mb-10 leading-relaxed grow">
              An elite cadre of 1,000 individual partners committing $1,000
              annually ($84/mo) to provide the baseline liquidity for national
              scale. This fund supports the intellectual and legal
              infrastructure for 17,000+ mothers.
            </p>

            <ul className="space-y-4 pt-6 border-t border-brand-lilac-200 w-full mb-10">
              <li className="flex items-start gap-3">
                <Icon
                  icon="heroicons:check-circle"
                  className="text-brand-lilac-600 w-4 h-4 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-lilac-800 uppercase tracking-wide">
                  Quarterly Efficiency Audits & Radical Transparency access.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  icon="heroicons:check-circle"
                  className="text-brand-lilac-600 w-4 h-4 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-lilac-800 uppercase tracking-wide">
                  Direct influence on regional economic strategy.
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Engine 2: Parish Seed Portals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-brand-teal-100 p-8 md:p-12 relative group flex flex-col h-full overflow-hidden"
          >
            <span className="text-brand-teal-700 font-primary font-bold text-[10px] tracking-[0.15em] uppercase mb-10">
              UNIT DEPLOYMENT: PARISH-SEED-PORTAL
            </span>

            <div className="flex items-center gap-4 mb-6 text-brand-teal-700">
              <Icon icon="heroicons:map-pin-20-solid" className="w-8 h-8" />
              <h2 className="text-sm md:text-base font-primary font-bold uppercase tracking-tight text-brand-teal-900">
                Parish Seeds
              </h2>
            </div>

            <p className="font-secondary text-xs md:text-sm text-brand-teal-800 mb-10 leading-relaxed grow">
              The $500 mobile capital unit used to fund the complete
              registration, mobilization, and induction of a new 50-member
              Parish Cooperative. This is where we break isolation and build
              organized power.
            </p>

            <ul className="space-y-4 pt-6 border-t border-brand-teal-200 w-full mb-10">
              <li className="flex items-start gap-3">
                <Icon
                  icon="heroicons:check-circle"
                  className="text-brand-teal-600 w-4 h-4 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-teal-800 uppercase tracking-wide">
                  Immediate deployment to verified grassroots units.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  icon="heroicons:check-circle"
                  className="text-brand-teal-600 w-4 h-4 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-teal-800 uppercase tracking-wide">
                  Real-time impact tracking on the national ledger.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* ── Strategic Inquiry Form ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12 text-center">
            <h2 className="text-lg md:text-xl lg:text-2xl font-primary font-black text-brand-white-900 uppercase mb-4">
              Secure Your Assignment
            </h2>
            <p className="text-sm md:text-base text-brand-dark-400 font-secondary max-w-xl mx-auto italic">
              "Outline your intent to transition from a spectator to a
              structural partner."
            </p>
          </div>
          <div className="bg-brand-white border border-brand-white-100 p-8 md:p-16 shadow-[0_30px_60px_rgba(0,0,0,0.03)] hover:border-brand-lilac-200 transition-colors">
            <StrategyInquiryForm />
          </div>
        </motion.div>

        {/* Strategic Conclusion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 bg-brand-lilac-800 p-8 md:p-12 lg:p-16 relative overflow-hidden group shadow-xl flex flex-col lg:flex-row justify-between items-center gap-10"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 opacity-70"
            >
              <span className="w-6 h-px bg-brand-white"></span>
              <span className="text-[9px] font-primary font-bold text-brand-white uppercase tracking-[0.4em]">
                Strategic Conclusion
              </span>
            </motion.div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-primary font-black text-brand-white mb-4 leading-tight uppercase tracking-wide">
              When you optimize a single mother,{" "}
              <br className="hidden md:block" />
              <span className="text-brand-lilac-200">
                you secure the nation’s human capital.
              </span>
            </h3>

            <p className="text-brand-white/80 font-secondary text-sm md:text-base leading-relaxed">
              When you secure that capital, you stabilize the domestic unit.
              When the domestic unit is fiscally sovereign, the Nation becomes
              an unshakable industrial powerhouse.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/how-to-help/donate"
              className="
                inline-flex items-center justify-center
                border border-brand-white/40 hover:border-brand-white
                text-brand-white text-[11px] font-primary font-bold
                px-8 py-4
                rounded-full
                transition-all duration-300
                uppercase tracking-[0.2em]
                hover:bg-brand-white/10
                cursor-pointer
              "
            >
              Build the Legacy.
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SeedPortals;
