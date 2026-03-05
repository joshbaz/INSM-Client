import React from "react";
import { Icon } from "@iconify/react";
import ContinueWithPesapal from "../../../Donate Page/donationModel/ContinueWithPesapal";

/**
 * Specialized Payment Panel for the 1k Club.
 * Redesigned to match DonationPanel dimensions and styling to fit h-screen correctly.
 */
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

            {/* Subtitle */}
            <p className="text-center text-[10px] font-secondary text-brand-dark-400 uppercase tracking-widest mb-6 border-b border-brand-dark/5 pb-6">
              Select your partnership velocity.
            </p>

            {/* ── TOGGLE SWITCH ── */}
            <div className="flex justify-center mb-10">
              <div className="relative bg-brand-dark-200 rounded-full h-10 md:h-12 flex items-center p-1 w-full border border-brand-dark/5">
                {[
                  { id: "once", label: "Once", color: "bg-brand-lilac" },
                  { id: "weekly", label: "Weekly", color: "bg-brand-teal" },
                  {
                    id: "monthly",
                    label: "Monthly",
                    color: "bg-brand-lilac-700",
                  },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFrequency(opt.id)}
                    className={`flex-1 h-full font-primary rounded-full text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer z-10
                      ${
                        frequency === opt.id
                          ? `${opt.color} text-brand-white-100 shadow-md`
                          : "text-brand-dark-400 hover:text-brand-dark/90"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
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
                {frequency === "once"
                  ? "Single Deployment"
                  : `${frequency} Automated Seed`}
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
