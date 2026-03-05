import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import useSEO from "../../../hooks/useSEO";
import { fadeUp, staggerContainer } from "../../../utils/animations";
import OneKClubModal from "./components/OneKClubModal";

const SeedPortals = () => {
  useSEO({
    title: "Seed Portals & 1k Club | INSM Uganda",
    description:
      "The dual engine of national transformation. Join the 1k Club or capitalize a Parish Seed Portal to secure Uganda's industrial future.",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-white pt-32 pb-20 overflow-x-hidden">
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
            className="text-lg md:text-xl lg:text-3xl font-black font-primary text-brand-white-900 uppercase leading-tight mb-6"
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
            className="bg-brand-lilac-800 p-8 md:p-12 relative group flex flex-col h-full overflow-hidden text-brand-white rounded-2xl shadow-xl"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

            <span className="text-brand-gold font-primary font-bold text-[10px] tracking-[0.15em] uppercase mb-10">
              LIQUIDITY ENGINE: 1K-CLUB-V1
            </span>

            <div className="flex items-center gap-4 mb-6 text-brand-gold">
              <Icon icon="heroicons:star-20-solid" className="w-10 h-10" />
              <h2 className="text-xl md:text-2xl font-primary font-black uppercase tracking-tight text-brand-white">
                The 1k Club
              </h2>
            </div>

            <p className="font-secondary text-sm md:text-base text-brand-white/80 mb-10 leading-relaxed grow">
              An elite cadre of 10,000 individual partners committing UGX 1,000
              Weekly. This fund supports the intellectual and legal
              infrastructure for 17,000+ mothers.
            </p>

            <ul className="space-y-4 pt-6 border-t border-brand-white/10 w-full mb-10">
              <li className="flex items-start gap-4">
                <Icon
                  icon="heroicons:check-circle"
                  className="text-brand-gold w-5 h-5 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-white/70 uppercase tracking-widest leading-loose">
                  Quarterly Efficiency Audits & Radical Transparency access.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Icon
                  icon="heroicons:check-circle"
                  className="text-brand-gold w-5 h-5 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-white/70 uppercase tracking-widest leading-loose">
                  Direct influence on regional economic strategy.
                </span>
              </li>
            </ul>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-brand-gold hover:bg-brand-white text-brand-dark-900 font-primary font-black text-[12px] uppercase tracking-[0.2em] py-5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Icon icon="heroicons:bolt-20-solid" className="w-5 h-5" />
              Initialize Partnership — UGX 1,000
            </button>
          </motion.div>

          {/* Engine 2: Parish Seed Portals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-brand-white-100 p-8 md:p-12 relative group flex flex-col h-full overflow-hidden border border-brand-dark/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <span className="text-brand-dark-300 font-primary font-bold text-[10px] tracking-[0.15em] uppercase mb-10">
              UNIT DEPLOYMENT: PARISH-SEED-PORTAL
            </span>

            <div className="flex items-center gap-4 mb-6 text-brand-dark">
              <Icon
                icon="heroicons:map-pin-20-solid"
                className="w-10 h-10 text-brand-teal"
              />
              <h2 className="text-xl md:text-2xl font-primary font-black uppercase tracking-tight text-brand-dark">
                Parish Seeds
              </h2>
            </div>

            <p className="font-secondary text-sm md:text-base text-brand-dark-400 mb-10 leading-relaxed grow">
              The $500 mobile capital unit used to fund the complete
              registration, mobilization, and induction of a new 50-member
              Parish Cooperative.
            </p>

            <ul className="space-y-4 pt-6 border-t border-brand-dark/5 w-full mb-10">
              <li className="flex items-start gap-4">
                <Icon
                  icon="heroicons:cpu-chip-20-solid"
                  className="text-brand-teal w-5 h-5 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-dark-400 uppercase tracking-widest leading-loose">
                  Immediate deployment to verified grassroots units.
                </span>
              </li>
              <li className="flex items-start gap-4">
                <Icon
                  icon="heroicons:chart-bar-20-solid"
                  className="text-brand-teal w-5 h-5 shrink-0 mt-0.5"
                />
                <span className="text-[11px] md:text-xs font-secondary text-brand-dark-400 uppercase tracking-widest leading-loose">
                  Real-time impact tracking on the national ledger.
                </span>
              </li>
            </ul>

            <Link
              to="/how-to-help/partner-with-us"
              className="w-full bg-brand-dark text-brand-white font-primary font-black text-[12px] uppercase tracking-[0.2em] py-5 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-3 hover:bg-brand-lilac shadow-lg"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Strategic Conclusion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 bg-brand-white-100 border border-brand-dark/5 p-8 md:p-12 lg:p-16 relative overflow-hidden group shadow-xl flex flex-col lg:flex-row justify-between items-center gap-10 rounded-3xl"
        >
          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 opacity-50"
            >
              <span className="w-6 h-px bg-brand-dark"></span>
              <span className="text-[9px] font-primary font-bold text-brand-dark uppercase tracking-[0.4em]">
                Strategic Conclusion
              </span>
            </motion.div>

            <h3 className="text-xl md:text-2xl lg:text-3xl font-primary font-black text-brand-dark mb-4 leading-tight uppercase tracking-tight">
              When you optimize a single mother,{" "}
              <br className="hidden md:block" />
              <span className="text-brand-lilac">
                you secure the nation’s human capital.
              </span>
            </h3>

            <p className="text-brand-dark-400 font-secondary text-sm md:text-base leading-relaxed">
              When you secure that capital, you stabilize the domestic unit.
              When the domestic unit is fiscally sovereign, the Nation becomes
              an unshakable industrial powerhouse.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/how-to-help/partner-with-us"
              className="
                inline-flex items-center justify-center
                bg-brand-dark text-brand-white text-[11px] font-primary font-bold
                px-10 py-5
                rounded-xl
                transition-all duration-500
                uppercase tracking-[0.2em]
                hover:bg-brand-lilac
                hover:shadow-2xl hover:scale-105
                cursor-pointer
              "
            >
              Build the Legacy.
            </Link>
          </div>
        </motion.div>
      </div>

      <OneKClubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SeedPortals;
