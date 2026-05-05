import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import OneKClubPanel from "./OneKClubPanel";

/**
 * Specialized Modal for the 1k Club.
 * Focuses on UGX 1,000 recurring payments.
 * Redesigned to match the architecture of DonationModal.
 */
const OneKClubModal = ({ isOpen, onClose, tier }) => {
  const [frequency, setFrequency] = useState("weekly");
  const [step, setStep] = useState("donation");

  /* ── Reset state when modal opens ── */
  useEffect(() => {
    if (isOpen) {
      setStep("donation");
      setFrequency("weekly");
    }
  }, [isOpen]);

  /* ── Lock body scroll ── */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* ── ESC key closes modal ── */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <>
      {/* ── FULL-SCREEN OVERLAY ── */}
      <div className="fixed inset-0 z-100 overflow-hidden">
        {/* Dark backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Close button — top-right of viewport */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-60 text-brand-white-100 hover:opacity-90 transition-opacity cursor-pointer p-2"
          aria-label="Close modal"
        >
          <Icon icon="heroicons:x-mark" width={32} />
        </button>

        {/* ── CONTENT — cards + security links ── */}
        <div className="relative z-55 min-h-screen flex items-center justify-center p-3 py-12 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-[1200px] flex flex-col md:flex-row items-stretch md:items-end justify-center gap-4 md:gap-6"
          >
            {/* Two cards side by side */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch w-full md:w-auto justify-center">
              {/* Left Card: Campaign Details (hidden on mobile) */}
              <div className="hidden md:flex w-full md:max-w-[380px] bg-brand-lilac-800 rounded-xl shadow-lg overflow-hidden flex-col text-brand-white relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[20px_20px]"></div>

                <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                  <div className="inline-flex items-center gap-2 border border-brand-white/20 px-3 py-1 rounded-full w-max mb-6">
                    <Icon
                      icon="heroicons:star-20-solid"
                      className="text-brand-gold w-4 h-4"
                    />
                    <span className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg uppercase font-primary font-bold tracking-[0.15em] text-brand-gold">
                      Liquidity Engine V1
                    </span>
                  </div>

                  <h2 className="text-3xl font-primary font-black uppercase leading-tight tracking-tight mb-4">
                    The 1k Club <br />{" "}
                    <span className="text-brand-gold">Partnership</span>
                  </h2>

                  <div className="h-px w-12 bg-brand-gold/50 mb-6"></div>

                  <p className="font-secondary text-sm leading-relaxed text-brand-white/80 italic mb-8 grow">
                    "By securing the kitchen table with a shared commit, we
                    stabilize the State. Your UGX 1,000 creates the
                    infrastructure for national sovereignty."
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-white/10 flex items-center justify-center shrink-0">
                        <Icon
                          icon="heroicons:check-badge"
                          className="text-brand-gold w-4 h-4"
                        />
                      </div>
                      <div>
                        <h4 className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-primary font-bold uppercase tracking-widest text-brand-gold">
                          Radical Transparency
                        </h4>
                        <p className="text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base text-brand-white/60">
                          Full audit access provided quarterly.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-white/10 flex items-center justify-center shrink-0">
                        <Icon
                          icon="heroicons:shield-check"
                          className="text-brand-gold w-4 h-4"
                        />
                      </div>
                      <div>
                        <h4 className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-primary font-bold uppercase tracking-widest text-brand-gold">
                          Secure Deployment
                        </h4>
                        <p className="text-[9px] md:text-[10px] lg:text-xs xl:text-sm 2xl:text-base text-brand-white/60">
                          Institutional grade capital routing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Card: Payment Panel */}
              <OneKClubPanel
                frequency={frequency}
                setFrequency={setFrequency}
                step={step}
                setStep={setStep}
              />
            </div>

            {/* Security links — to the right, bottom-aligned with cards */}
            <div className="hidden lg:flex flex-col items-end gap-2 pb-2 shrink-0 ml-auto">
              <p className="flex items-center gap-2 text-sm text-brand-white-100/70 hover:text-brand-white-100 hover:underline transition-all cursor-help whitespace-nowrap">
                Is my partnership secure
                <span className="w-5 h-5 rounded-full bg-brand-white-100/30 text-brand-white-100 grid place-items-center">
                  <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
                </span>
              </p>
              <p className="flex items-center gap-2 text-sm text-brand-white-100/70 hover:text-brand-white-100 hover:underline transition-all cursor-help whitespace-nowrap">
                Can I cancel my recurring mandate
                <span className="w-5 h-5 rounded-full bg-brand-white-100/30 text-brand-white-100 grid place-items-center">
                  <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default OneKClubModal;
