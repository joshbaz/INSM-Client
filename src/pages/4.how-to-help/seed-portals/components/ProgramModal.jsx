import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import ContinueWithPesapal from "../../Partner-with-us-Page/donationModel/ContinueWithPesapal";
import { programTheme, formatProgramAmount, FREQUENCY_LABELS } from "./programDisplay";

/**
 * Join / give to a giving programme (e.g. The 1k Club).
 * Left: programme story. Right: amount, then the PesaPal details form.
 */
const ProgramPanel = ({ program, step, setStep }) => {
  const theme = programTheme(program.color);
  const [customAmount, setCustomAmount] = useState(String(program.amount));
  const amount = program.allowCustomAmount ? parseFloat(customAmount) || 0 : program.amount;
  const isRecurring = program.frequency !== "once";
  const frequencyWord = FREQUENCY_LABELS[program.frequency]?.toLowerCase();

  return (
    <div className="w-full md:max-w-[400px] bg-brand-white-100 rounded-xl shadow-lg flex flex-col overflow-hidden shrink-0">
      {/* Mobile-only compact banner */}
      <div className="flex md:hidden items-center gap-3 p-4 bg-brand-white-200/50 border-b border-brand-dark-200/30">
        <div className={`w-12 h-12 rounded-lg ${theme.dark} flex items-center justify-center text-brand-gold shrink-0`}>
          <Icon icon="heroicons:star-20-solid" width={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold font-primary text-brand-dark uppercase truncate">{program.title}</h3>
          {program.subtitle && (
            <p className="text-[10px] font-secondary text-brand-dark-400 uppercase tracking-widest truncate">{program.subtitle}</p>
          )}
        </div>
      </div>

      <div className="p-5 md:p-8 flex flex-col grow">
        {step === "donation" ? (
          <div className="flex flex-col h-full">
            <h2 className="hidden md:block text-2xl font-bold font-primary text-brand-dark text-center uppercase mb-6 tracking-tight">
              Empower A <span className="text-brand-lilac">Mother</span>
            </h2>

            <div className="text-center mb-8 border-b border-brand-dark/5 pb-6">
              <p className="text-[10px] md:text-xs font-secondary text-brand-dark-400 uppercase tracking-widest mb-2">
                {isRecurring ? `${FREQUENCY_LABELS[program.frequency]} partnership` : "One-time contribution"}
              </p>
              <p className="text-sm font-secondary text-brand-dark-600 leading-relaxed max-w-[300px] mx-auto">
                {isRecurring ? (
                  <>
                    Members contribute <span className="font-bold text-brand-dark">{formatProgramAmount(program.amount, program.currency)} every {frequencyWord === "weekly" ? "week" : "month"}</span>.
                    You'll make this {frequencyWord} contribution now through PesaPal.
                  </>
                ) : (
                  <>Your contribution goes directly to {program.title}.</>
                )}
              </p>
            </div>

            {/* Amount */}
            <div className="flex flex-col items-center justify-center py-8 bg-brand-white-200/40 rounded-xl mb-8 grow border border-brand-dark/5">
              <span className="text-[9px] md:text-[10px] font-primary font-bold text-brand-lilac uppercase tracking-[0.3em] mb-2 opacity-80">
                Contribution Amount
              </span>
              {program.allowCustomAmount ? (
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-secondary font-bold text-brand-dark-300 pb-2">{program.currency === "USD" ? "$" : "UGX"}</span>
                  <input
                    type="number"
                    min="1"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-44 text-5xl font-primary font-black text-brand-dark tracking-tighter bg-transparent border-b-2 border-brand-dark-200 focus:border-brand-lilac outline-none text-center"
                  />
                </div>
              ) : (
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-xl font-secondary font-bold text-brand-dark-300 pb-1">{program.currency === "USD" ? "$" : "UGX"}</span>
                  <span className="text-5xl md:text-6xl font-primary font-black text-brand-dark tracking-tighter leading-none">
                    {program.amount.toLocaleString()}
                  </span>
                </div>
              )}
              {isRecurring && (
                <p className="text-[9px] md:text-[10px] font-secondary text-brand-dark-400 uppercase tracking-widest font-bold">
                  {FREQUENCY_LABELS[program.frequency]} contribution
                </p>
              )}
            </div>

            <div className="mt-auto">
              <button
                onClick={() => setStep("pesapal")}
                disabled={!(amount > 0)}
                className="w-full h-12 md:h-14 rounded-md border-2 border-brand-dark bg-brand-white-100 shadow-[4px_4px_0px_0px_rgba(9,10,12,1)] flex items-center justify-center gap-3 transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-brand-dark font-bold text-xs uppercase tracking-widest">Continue with</span>
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-pesapal-blue">pesa</span>
                  <span className="text-pesapal-red">pal</span>
                </span>
              </button>
              <p className="text-center text-[9px] md:text-[10px] font-secondary text-brand-dark-300 uppercase leading-relaxed max-w-[280px] mx-auto opacity-70 mt-4">
                * Payments are processed securely through PesaPal.
              </p>
            </div>
          </div>
        ) : (
          <ContinueWithPesapal
            amount={String(amount)}
            currency={program.currency}
            frequency={program.frequency}
            tier={{ title: program.title }}
            programId={program.id}
            onBack={() => setStep("donation")}
          />
        )}
      </div>
    </div>
  );
};

const ProgramModal = ({ program, onClose }) => {
  const [step, setStep] = useState("donation");
  const theme = programTheme(program?.color);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleKeyDown = useCallback((e) => { if (e.key === "Escape") onClose(); }, [onClose]);
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="fixed inset-0 z-100 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-brand-dark/90 backdrop-blur-sm"
        onClick={onClose}
      />

      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-60 text-brand-white-100 hover:opacity-90 transition-opacity cursor-pointer p-2"
        aria-label="Close"
      >
        <Icon icon="heroicons:x-mark" width={32} />
      </button>

      <div className="relative z-55 min-h-screen flex items-center justify-center p-3 py-12 md:p-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[1200px] flex flex-col md:flex-row gap-4 md:gap-6 items-stretch justify-center pointer-events-auto"
        >
          {/* Programme story (hidden on mobile) */}
          <div className={`hidden md:flex w-full md:max-w-[380px] ${theme.dark} rounded-xl shadow-lg overflow-hidden flex-col text-brand-white relative`}>
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[20px_20px]" />
            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
              {program.subtitle && (
                <div className="inline-flex items-center gap-2 border border-brand-white/20 px-3 py-1 rounded-full w-max mb-6">
                  <Icon icon="heroicons:star-20-solid" className="text-brand-gold w-4 h-4" />
                  <span className="text-[10px] md:text-xs uppercase font-primary font-bold tracking-[0.15em] text-brand-gold">
                    {program.subtitle}
                  </span>
                </div>
              )}
              <h2 className="text-3xl font-primary font-black uppercase leading-tight tracking-tight mb-4">{program.title}</h2>
              <div className="h-px w-12 bg-brand-gold/50 mb-6" />
              {(program.quote || program.description) && (
                <p className="font-secondary text-sm leading-relaxed text-brand-white/80 italic mb-8 grow">
                  "{program.quote || program.description}"
                </p>
              )}
              <div className="space-y-4">
                {program.bullets.slice(0, 3).map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-white/10 flex items-center justify-center shrink-0">
                      <Icon icon="heroicons:check-badge" className="text-brand-gold w-4 h-4" />
                    </div>
                    <p className="text-xs text-brand-white/80 leading-relaxed pt-1.5">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ProgramPanel program={program} step={step} setStep={setStep} />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgramModal;
