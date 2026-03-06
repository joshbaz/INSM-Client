import React from "react";
import { Icon } from "@iconify/react";
import ContinueWithPesapal from "../../../Donate Page/donationModel/ContinueWithPesapal";

/**
 * Specialized Payment Panel for the 1k Club. */
const OneKClubPanel = ({ frequency, setFrequency, step, setStep }) => {
  return (
    <div className="w-full md:max-w-[400px] bg-brand-white-100 rounded-xl shadow-lg flex flex-col overflow-hidden shrink-0">
      {/* ── Mobile-only compact banner ── */}
      <div className="flex md:hidden items-center gap-3 p-4 bg-brand-white-200/50 border-b border-brand-dark-200/30">
        <div className="w-12 h-12 rounded-lg bg-brand-lilac-800 flex items-center justify-center text-brand-gold shrink-0">
          <Icon icon="heroicons:star-20-solid" width={24} />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold font-primary text-brand-dark uppercase truncate">
            The 1k Club
          </h3>
          <p className="text-[10px] font-secondary text-brand-dark-400 uppercase tracking-widest truncate">
            Liquidity Engine V1
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5 md:p-8 flex flex-col grow">
        {step === "donation" ? (
          <div className="flex flex-col h-full">
            <h2 className="hidden md:block text-2xl font-bold font-primary text-brand-dark text-center uppercase mb-6 tracking-tight">
              Empower A <span className="text-brand-lilac">Mother</span>
            </h2>

            {/* Subtitle / Explanation */}
            <div className="text-center mb-10 border-b border-brand-dark/5 pb-6">
              <p className="text-[10px] font-secondary text-brand-dark-400 uppercase tracking-widest mb-2">
                Automated Partnership
              </p>
              <p className="text-sm font-secondary text-brand-dark-600 leading-relaxed max-w-[280px] mx-auto">
                By proceeding, you agree to an automated, recurring deployment
                of{" "}
                <span className="font-bold text-brand-dark">
                  1,000 UGX every week
                </span>
                .
              </p>
            </div>

            {/* ── FIXED AMOUNT DISPLAY ── */}
            <div className="flex flex-col items-center justify-center py-8 bg-brand-white-200/40 rounded-xl mb-10 grow border border-brand-dark/5">
              <span className="text-[9px] font-primary font-bold text-brand-lilac uppercase tracking-[0.3em] mb-2 opacity-80">
                Deployment Amount
              </span>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-xl font-secondary font-bold text-brand-dark-300 pb-1">
                  UGX
                </span>
                <span className="text-5xl md:text-6xl font-primary font-black text-brand-dark tracking-tighter leading-none">
                  1,000
                </span>
              </div>
              <p className="text-[9px] font-secondary text-brand-dark-400 uppercase tracking-widest font-bold">
                Weekly Automated Seed
              </p>
            </div>

            {/* ── CONTINUE WITH PESAPAL BUTTON ── */}
            <div className="mt-auto">
              <button
                onClick={() => setStep("pesapal")}
                className="w-full h-12 md:h-14 rounded-md border-2 border-brand-dark bg-brand-white-100 shadow-[4px_4px_0px_0px_rgba(9,10,12,1)] flex items-center justify-center gap-3 transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
              >
                <span className="text-brand-dark font-bold text-xs uppercase tracking-widest">
                  Initialize with
                </span>
                <span className="text-lg font-bold tracking-tight">
                  <span className="text-pesapal-blue">pesa</span>
                  <span className="text-pesapal-red">pal</span>
                </span>
              </button>
              <p className="text-center text-[8px] font-secondary text-brand-dark-300 uppercase leading-relaxed max-w-[280px] mx-auto opacity-70 mt-4">
                * By proceeding, you authorize INSM Uganda to facilitate this
                structural mandate deployment via Pesapal's secure gateway.
              </p>
            </div>
          </div>
        ) : (
          <ContinueWithPesapal
            amount="1000"
            currency="UGX"
            onBack={() => setStep("donation")}
          />
        )}
      </div>
    </div>
  );
};

export default OneKClubPanel;
