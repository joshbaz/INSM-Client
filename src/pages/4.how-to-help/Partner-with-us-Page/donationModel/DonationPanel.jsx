import React from "react";
import ContinueWithPesapal from "./ContinueWithPesapal";

const PRESET_AMOUNTS = [
  "10",
  "100",
  "500",
  "1000",
  "2,500",
  "5,000",
  "10,000",
  "20,000",
  "50,000",
];

/**
 * Right card of the Donation Modal.
 * On mobile, also shows a compact campaign summary since the
 * CampaignCard is hidden.
 */
const DonationPanel = ({
  tier,
  frequency,
  setFrequency,
  selectedAmount,
  customAmount,
  onPresetClick,
  onCustomChange,
  step,
  setStep,
  canContinue,
  finalAmount,
}) => {
  const campaignTitle = tier?.title || "Empower A Mother";
  const campaignSubtitle = tier?.subtitle || "Identity & Orientation";

  return (
    <div className="w-full md:max-w-[400px] bg-brand-white-100 rounded-xl shadow-lg flex flex-col overflow-hidden">
      {/* ── Mobile-only compact campaign banner ── */}
      <div className="flex md:hidden items-center gap-3 p-4 bg-brand-white-200/50 border-b border-brand-dark-200/30">
        <img
          src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/_image.png"
          alt="Campaign"
          className="w-14 h-14 rounded-lg object-cover shrink-0"
        />
        <div className="min-w-0">
          <h3 className="text-sm font-bold font-primary text-brand-dark truncate">
            {campaignTitle}
          </h3>
          <p className="text-xs font-secondary text-brand-dark-400 truncate">
            {campaignSubtitle}
          </p>
        </div>
      </div>

      {/* ── Form content ── */}
      <div className="p-4 md:p-8 flex flex-col">
        {step === "donation" ? (
          <div className="flex flex-col space-y-3 md:space-y-6">
            {/* Title — hidden on mobile since banner shows it */}
            <h2 className="hidden md:block text-2xl font-bold font-primary text-brand-dark text-center">
              Empower A Mother Today
            </h2>

            {/* ── TOGGLE SWITCH ── */}
            <div className="flex justify-center">
              <div className="relative bg-brand-dark-200 rounded-full h-10 md:h-12 flex items-center p-1 w-full max-w-[260px]">
                <button
                  onClick={() => setFrequency("once")}
                  className={`flex-1 h-full rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer z-10
                    ${
                      frequency === "once"
                        ? "bg-brand-lilac text-brand-white-100 shadow-md"
                        : "text-brand-dark-400 hover:text-brand-dark/90"
                    }`}
                >
                  Give Once
                </button>

                {/* OR badge */}
                <span className="absolute left-1/2 -translate-x-1/2 z-20 w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand-white-100 shadow-sm flex items-center justify-center text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-bold text-brand-dark-400">
                  OR
                </span>

                <button
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 h-full rounded-full text-xs font-bold uppercase tracking-wide transition-all duration-300 cursor-pointer z-10
                    ${
                      frequency === "monthly"
                        ? "bg-brand-teal text-brand-white-100 shadow-md"
                        : "text-brand-dark-400 hover:text-brand-dark/90"
                    }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* ── PRESET AMOUNT GRID ── */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {PRESET_AMOUNTS.map((val) => {
                const numericVal = val.replace(/,/g, "");
                const isActive = selectedAmount === numericVal;
                return (
                  <button
                    key={val}
                    onClick={() => onPresetClick(numericVal)}
                    className={`h-10 md:h-11 rounded-md border text-sm font-semibold font-secondary transition-all duration-200 cursor-pointer
                      ${
                        isActive
                          ? "bg-brand-lilac-100 border-brand-lilac text-brand-lilac-800 shadow-inner"
                          : "bg-brand-white-100 border-brand-dark-200 text-brand-dark-400 hover:border-brand-lilac-300/90 hover:text-brand-dark/90"
                      }`}
                  >
                    ${val}
                  </button>
                );
              })}
            </div>

            {/* ── CUSTOM AMOUNT INPUT ── */}
            <div className="flex items-center border-b-2 border-brand-dark-200 focus-within:border-brand-lilac transition-colors h-12 md:h-14">
              <span className="text-xl md:text-2xl text-brand-dark-300 font-secondary pl-1 pr-3">
                $
              </span>
              <input
                type="number"
                placeholder="0.00"
                value={customAmount}
                onChange={onCustomChange}
                className="flex-1 h-full bg-transparent text-xl md:text-2xl font-secondary text-brand-dark placeholder-brand-dark-200 focus:outline-none"
              />
            </div>

            {/* ── CONTINUE WITH PESAPAL BUTTON ── */}
            <button
              onClick={() => canContinue && setStep("pesapal")}
              disabled={!canContinue}
              className={`w-full h-12 md:h-14 rounded-md border border-brand-dark-200 bg-brand-white-100 shadow-sm flex items-center justify-center gap-2 transition-all duration-200
                ${
                  canContinue
                    ? "hover:shadow-md hover:bg-brand-white-200/90 cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
            >
              <span className="text-brand-dark-400 font-semibold text-sm">
                Continue with
              </span>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-pesapal-blue">pesa</span>
                <span className="text-pesapal-red">pal</span>
              </span>
            </button>
          </div>
        ) : (
          <ContinueWithPesapal
            amount={finalAmount}
            onBack={() => setStep("donation")}
          />
        )}
      </div>
    </div>
  );
};

export default DonationPanel;
