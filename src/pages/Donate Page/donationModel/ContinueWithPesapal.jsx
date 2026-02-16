import React from "react";
import { Icon } from "@iconify/react";

/**
 * PesaPal payment mock view.
 * Shown after the user clicks "Continue with PesaPal" on the DonationPanel.
 *
 * @param {{ amount: string, onBack: Function }} props
 */
const ContinueWithPesapal = ({ amount, onBack }) => {
  const steps = [
    { num: 1, label: "Enter Details", active: true },
    { num: 2, label: "Make Payment", active: false },
    { num: 3, label: "Confirmation", active: false },
  ];

  return (
    <>
      {/* ── Fixed Header ── */}
      <div className="px-6 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-brand-dark-200/30 shrink-0 bg-white flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-brand-dark-300 hover:text-brand-lilac flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Icon icon="heroicons:arrow-left" className="w-4 h-4" />
          Back
        </button>

        <span className="text-xl font-bold tracking-tight">
          <span className="text-pesapal-blue">pesa</span>
          <span className="text-pesapal-red">pal</span>
        </span>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-6 md:px-10 py-6 md:py-8">
        {/* Stepper */}
        <div className="flex items-center justify-between relative mb-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-dark-200 -z-10" />
          <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-pesapal-red -z-10" />

          {steps.map((s) => (
            <div
              key={s.num}
              className="flex flex-col items-center bg-white px-2"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1
                    ${
                      s.active
                        ? "bg-pesapal-red text-brand-cream-100"
                        : "bg-brand-dark-200 text-brand-dark-400"
                    }`}
              >
                {s.num}
              </div>
              <span
                className={`text-xs ${s.active ? "text-brand-dark font-semibold" : "text-brand-dark-300"}`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Mock Form Fields */}
        <div className="space-y-5 opacity-60 pointer-events-none select-none">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-dark mb-1.5">
                First Name *
              </label>
              <div className="h-10 border border-brand-dark-200 rounded-lg bg-brand-cream-100/50" />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-dark mb-1.5">
                Last Name *
              </label>
              <div className="h-10 border border-brand-dark-200 rounded-lg bg-brand-cream-100/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1.5">
              Email Address *
            </label>
            <div className="h-10 border border-brand-dark-200 rounded-lg bg-brand-cream-100/50" />
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-dark mb-1.5">
              Amount (USD) *
            </label>
            <div className="h-10 border border-brand-dark-200 rounded-lg bg-brand-cream-100/50 flex items-center px-3 text-brand-dark-400 font-secondary">
              ${amount || "0.00"}
            </div>
          </div>
        </div>

        {/* Mock proceed button */}
        <div className="mt-8 text-center">
          <p className="text-xs text-brand-dark-300 mb-4">
            This is a demo. In production, this redirects to the secure PesaPal
            gateway.
          </p>
          <button className="block w-full bg-pesapal-red hover:bg-red-700 text-brand-cream-100 font-bold py-4 rounded-lg transition-colors uppercase tracking-wide cursor-pointer shadow-md">
            Proceed to Payment (Mock)
          </button>
        </div>
      </div>
    </>
  );
};

export default ContinueWithPesapal;
