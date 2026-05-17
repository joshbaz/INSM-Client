import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../../../utils/animations";
import OneKClubModal from "./OneKClubModal";

const ENGINES = [
  {
    id: "1k-club",
    title: "The 1k Club",
    subtitle: "Liquidity Engine: 1K-CLUB-V1",
    amount: "UGX 1,000",
    colorClass: "bg-brand-lilac",
    description:
      "An elite cadre of 10,000 individual partners committing UGX 1,000 Weekly. This fund supports the intellectual and legal infrastructure for 17,000+ mothers.",
    bullets: [
      "Quarterly Efficiency Audits & Radical Transparency access.",
      "Direct influence on regional economic strategy.",
    ],
    actionType: "modal", // Triggers the modal
    buttonLabel: "Activate My Subscription",
  },
];

const TheEngines = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="w-full py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-primary font-bold text-brand-lilac-600 uppercase tracking-widest">
              Mandate:
            </span>
            <span className="text-[11px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-secondary text-brand-dark-300 uppercase tracking-wider">
              National Structural Transition.
            </span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 max-w-2xl mx-auto gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {ENGINES.map((engine) => (
            <motion.div
              variants={fadeUp}
              key={engine.id}
              className="bg-brand-white-100 rounded-[10px] shadow-sm border border-brand-dark-200/40 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow p-6 md:p-10 group"
            >
              <div className="mb-6">
                <p className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-bold text-gray-400 font-secondary uppercase tracking-[0.15em] mb-2">
                  {engine.subtitle}
                </p>
                <h3 className="text-2xl font-bold font-primary text-black flex items-center gap-3">
                  {engine.id === "1k-club" ? (
                    <Icon
                      icon="heroicons:star-20-solid"
                      className="text-brand-lilac w-6 h-6"
                    />
                  ) : (
                    <Icon
                      icon="heroicons:map-pin-20-solid"
                      className="text-brand-teal w-6 h-6"
                    />
                  )}
                  {engine.title}
                </h3>
              </div>

              <div
                className={`w-full h-40 md:h-48 ${engine.colorClass} flex flex-col items-center justify-center text-brand-white rounded-lg mb-8 relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <span className="relative z-10 text-4xl md:text-6xl font-black font-primary tracking-tighter">
                  {engine.amount}
                </span>
                {engine.id === "1k-club" && (
                  <span className="relative z-10 text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-secondary uppercase tracking-widest mt-2 opacity-80 font-bold">
                    Weekly
                  </span>
                )}
              </div>

              <div className="flex flex-col grow">
                <p className="text-brand-dark font-secondary leading-relaxed mb-8 text-sm md:text-base">
                  {engine.description}
                </p>

                <ul className="space-y-4 pt-6 border-t border-gray-100 w-full mb-10 grow">
                  {engine.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <Icon
                        icon="heroicons:check-circle"
                        className={`${engine.id === "1k-club" ? "text-brand-lilac" : "text-brand-teal"} w-5 h-5 shrink-0 mt-0.5`}
                      />
                      <span className="text-[11px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-secondary text-brand-dark-400 uppercase tracking-widest leading-loose">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  {engine.actionType === "modal" ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="w-full bg-brand-lilac-600 hover:bg-brand-lilac-700 text-brand-white font-bold text-[11px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg py-4 px-6 rounded-full transition-colors uppercase tracking-widest cursor-pointer shadow-sm flex items-center justify-center gap-2"
                    >
                      {engine.buttonLabel}
                    
                    </button>
                  ) : (
                    <Link
                      to={engine.linkTo}
                      className="w-full border-2 border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-white font-bold text-[11px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg py-4 px-6 rounded-full transition-colors uppercase tracking-widest cursor-pointer flex items-center justify-center gap-2"
                    >
                      {engine.buttonLabel}
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <OneKClubModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default TheEngines;
