import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../../utils/animations";
import { usePrograms } from "../../../../store/tanstackStore/services/queries";
import ProgramModal from "./ProgramModal";
import { programTheme, formatProgramAmount, FREQUENCY_LABELS } from "./programDisplay";

// Giving programmes ("engines") come from the dashboard: Capital Investment → Programs
const TheEngines = () => {
  const { data: programs = [], isLoading } = usePrograms();
  const [selected, setSelected] = useState(null);

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

        {isLoading && (
          <div className="flex justify-center py-16">
            <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
          </div>
        )}

        {!isLoading && programs.length === 0 && (
          <p className="text-center font-secondary text-brand-dark-400 py-16">New partnership portals are opening soon.</p>
        )}

        <motion.div
          className={`grid grid-cols-1 gap-10 mx-auto ${programs.length > 1 ? "md:grid-cols-2 max-w-5xl" : "max-w-2xl"}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {programs.map((program) => {
            const theme = programTheme(program.color);
            return (
              <motion.div
                variants={fadeUp}
                key={program.id}
                className="bg-brand-white-100 rounded-[10px] shadow-sm border border-brand-dark-200/40 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow p-6 md:p-10 group"
              >
                <div className="mb-6">
                  {program.subtitle && (
                    <p className="text-[10px] md:text-xs lg:text-sm font-bold text-gray-400 font-secondary uppercase tracking-[0.15em] mb-2">
                      {program.subtitle}
                    </p>
                  )}
                  <h3 className="text-2xl font-bold font-primary text-black flex items-center gap-3">
                    <Icon icon="heroicons:star-20-solid" className={`${theme.text} w-6 h-6`} />
                    {program.title}
                  </h3>
                </div>

                <div className={`w-full h-40 md:h-48 ${theme.solid} flex flex-col items-center justify-center text-brand-white rounded-lg mb-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-[size:24px_24px]" />
                  <span className="relative z-10 text-4xl md:text-6xl font-black font-primary tracking-tighter">
                    {program.allowCustomAmount ? "Any amount" : formatProgramAmount(program.amount, program.currency)}
                  </span>
                  {program.frequency !== "once" && (
                    <span className="relative z-10 text-[10px] md:text-xs lg:text-sm font-secondary uppercase tracking-widest mt-2 opacity-80 font-bold">
                      {FREQUENCY_LABELS[program.frequency]}
                    </span>
                  )}
                </div>

                <div className="flex flex-col grow">
                  {program.description && (
                    <p className="text-brand-dark font-secondary leading-relaxed mb-6 text-sm md:text-base">{program.description}</p>
                  )}

                  {program.goalSupporters > 0 && (
                    <div className="mb-8">
                      <div className="flex justify-between text-[11px] font-secondary font-bold uppercase tracking-widest text-brand-dark-400 mb-2">
                        <span>{program.supporterCount.toLocaleString()} members</span>
                        <span>Goal {program.goalSupporters.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-brand-dark-200/40 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${theme.solid}`}
                          style={{ width: `${Math.min((program.supporterCount / program.goalSupporters) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {program.bullets.length > 0 && (
                    <ul className="space-y-4 pt-6 border-t border-gray-100 w-full mb-10 grow">
                      {program.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-4">
                          <Icon icon="heroicons:check-circle" className={`${theme.text} w-5 h-5 shrink-0 mt-0.5`} />
                          <span className="text-[11px] md:text-xs lg:text-sm font-secondary text-brand-dark-400 uppercase tracking-widest leading-loose">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto pt-4">
                    <button
                      onClick={() => setSelected(program)}
                      className={`w-full ${theme.button} text-brand-white font-bold text-[11px] md:text-xs lg:text-sm py-4 px-6 rounded-full transition-colors uppercase tracking-widest cursor-pointer shadow-sm flex items-center justify-center gap-2`}
                    >
                      {program.buttonLabel || (program.frequency === "once" ? "Give now" : "Join now")}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {selected && <ProgramModal program={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default TheEngines;
