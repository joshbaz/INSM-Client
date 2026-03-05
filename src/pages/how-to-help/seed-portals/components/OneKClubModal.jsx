import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import OneKClubPanel from "./OneKClubPanel";

/**
 * Specialized Modal for the 1k Club.
 * Focuses on UGX 1,000 recurring payments.
 */
const OneKClubModal = ({ isOpen, onClose, tier }) => {
  const [frequency, setFrequency] = useState("weekly"); // Default to weekly for 1k club
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
    <div className="fixed inset-0 z-100 overflow-hidden">
      {/* Dark backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-110 text-brand-white-100 hover:text-brand-gold transition-colors cursor-pointer p-2"
        aria-label="Close modal"
      >
        <Icon icon="heroicons:x-mark" width={32} />
      </button>

      {/* Content Container */}
      <div className="relative z-105 min-h-screen flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-[1000px] flex flex-col md:flex-row items-stretch bg-brand-white-100 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Left: Campaign Imagery & Specialized Text */}
          <div className="hidden md:flex md:w-[45%] bg-brand-lilac-800 text-brand-white p-8 md:p-12 flex-col justify-between relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[20px_20px]"></div>

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 border border-brand-white/20 px-3 py-1 rounded-full">
                <Icon
                  icon="heroicons:star-20-solid"
                  className="text-brand-gold w-4 h-4"
                />
                <span className="text-[10px] uppercase font-primary font-bold tracking-[0.2em]">
                  Liquidity Engine V1
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-primary font-black uppercase leading-tight tracking-tighter">
                The <br /> 1k Club <br />{" "}
                <span className="text-brand-gold">Partnership</span>
              </h2>

              <div className="h-px w-16 bg-brand-gold/50"></div>

              <p className="font-secondary text-sm leading-relaxed text-brand-white/80 italic">
                "By securing the kitchen table with a shared commit, we
                stabilize the State. Your UGX 1,000 creates the infrastructure
                for national sovereignty."
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-white/10 flex items-center justify-center">
                  <Icon
                    icon="heroicons:check-badge"
                    className="text-brand-gold w-5 h-5"
                  />
                </div>
                <div>
                  <h4 className="text-[11px] font-primary font-bold uppercase tracking-widest text-brand-gold">
                    Radical Transparency
                  </h4>
                  <p className="text-[10px] text-brand-white/60">
                    Full audit access provided quarterly.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-white/10 flex items-center justify-center">
                  <Icon
                    icon="heroicons:shield-check"
                    className="text-brand-gold w-5 h-5"
                  />
                </div>
                <div>
                  <h4 className="text-[11px] font-primary font-bold uppercase tracking-widest text-brand-gold">
                    Secure Deployment
                  </h4>
                  <p className="text-[10px] text-brand-white/60">
                    Institutional grade capital routing.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Payment specialized Panel */}
          <div className="flex-1">
            <OneKClubPanel
              frequency={frequency}
              setFrequency={setFrequency}
              step={step}
              setStep={setStep}
              onClose={onClose}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OneKClubModal;
