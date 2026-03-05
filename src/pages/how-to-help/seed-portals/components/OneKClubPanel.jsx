import React from "react";
import { Icon } from "@iconify/react";
import ContinueWithPesapal from "../../../Donate Page/donationModel/ContinueWithPesapal";

/**
 * Specialized Payment Panel for the 1k Club.
 * Fixed amount: 1,000 UGX.
 * Frequencies: Once, Weekly, Monthly.
 */
const OneKClubPanel = ({ frequency, setFrequency, step, setStep, onClose }) => {
  return (
    <div className="w-full h-full flex flex-col bg-brand-white-100 p-8 md:p-12">
      {/* Mobile Header (Campaign Identity) */}
      <div className="md:hidden flex items-center gap-4 mb-8 bg-brand-lilac-100/50 p-4 rounded-xl">
        <div className="w-12 h-12 rounded-full bg-brand-lilac-800 flex items-center justify-center text-brand-white">
          <Icon icon="heroicons:star-20-solid" width={24} />
        </div>
        <div>
          <h3 className="text-sm font-primary font-bold text-brand-dark uppercase tracking-tight">
            The 1k Club
          </h3>
          <p className="text-[10px] font-secondary text-brand-dark-400">
            UGX 1,000 Recurring Partner
          </p>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {step === "donation" ? (
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-2xl font-primary font-black text-brand-dark uppercase tracking-tight">
                Empower A <span className="text-brand-lilac">Mother</span>
              </h2>
              <p className="text-xs font-secondary text-brand-dark-400 leading-relaxed uppercase tracking-widest">
                Select your partnership velocity.
              </p>
            </div>

            {/* ── TOGGLE SWITCH ── */}
            <div className="flex justify-center w-full">
              <div className="relative bg-brand-dark-200 rounded-lg h-12 flex items-center p-1 w-full border border-brand-dark/5">
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
                    className={`flex-1 h-full rounded text-[10px] font-primary font-black uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer z-10
                      ${
                        frequency === opt.id
                          ? `${opt.color} text-brand-white-100 shadow-lg scale-[1.02]`
                          : "text-brand-dark-400 hover:text-brand-dark/90"
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── FIXED AMOUNT DISPLAY ── */}
            <div className="flex flex-col items-center justify-center py-10 border-y border-brand-dark/5 bg-brand-white-200/30 rounded-2xl">
              <span className="text-[10px] font-primary font-bold text-brand-lilac uppercase tracking-[0.4em] mb-2">
                Deployment Amount
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-secondary font-bold text-brand-dark-300">
                  UGX
                </span>
                <span className="text-6xl font-primary font-black text-brand-dark tracking-tighter">
                  1,000
                </span>
              </div>
              <p className="mt-4 text-[10px] font-secondary text-brand-dark-400 uppercase tracking-widest">
                {frequency === "once"
                  ? "Single Deployment"
                  : `${frequency} Automated Seed`}
              </p>
            </div>

            {/* ── CONTINUE WITH PESAPAL BUTTON ── */}
            <button
              onClick={() => setStep("pesapal")}
              className="w-full h-16 rounded-xl border-2 border-brand-dark bg-brand-white-100 shadow-[4px_4px_0px_0px_rgba(9,10,12,1)] flex items-center justify-center gap-3 transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer"
            >
              <span className="text-brand-dark font-primary font-black text-sm uppercase tracking-widest">
                Initialize with
              </span>
              <span className="text-xl font-bold tracking-tighter">
                <span className="text-pesapal-blue">pesa</span>
                <span className="text-pesapal-red">pal</span>
              </span>
            </button>

            <p className="text-center text-[9px] font-secondary text-brand-dark-300 uppercase leading-relaxed max-w-[280px] mx-auto opacity-70">
              * By proceeding, you authorize INSM Uganda to facilitate this
              structural mandate deployment via Pesapal's secure gateway.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <ContinueWithPesapal
              amount="1000"
              currency="UGX"
              onBack={() => setStep("donation")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OneKClubPanel;
