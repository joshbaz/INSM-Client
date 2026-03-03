import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import CampaignCard from "./CampaignCard";
import DonationPanel from "./DonationPanel";

/**
 * Donation Modal — Orchestrator.
 * Manages overlay, close logic, state, and composes
 * CampaignCard (left) + DonationPanel (right).
 *
 * @param {{
 *   isOpen: boolean,
 *   onClose: Function,
 *   tier: { title: string, subtitle: string, amount: string, description: string } | null
 * }} props
 */
const DonationModal = ({ isOpen, onClose, tier }) => {
  const [frequency, setFrequency] = useState("once");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [step, setStep] = useState("donation");

  /* ── Reset state when modal opens / tier changes ── */
  useEffect(() => {
    if (isOpen) {
      setStep("donation");
      setFrequency("once");
      if (tier?.amount) {
        setSelectedAmount(tier.amount.replace(/[^0-9]/g, ""));
        setCustomAmount("");
      } else {
        setSelectedAmount("");
        setCustomAmount("");
      }
    }
  }, [isOpen, tier]);

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

  /* ── Handlers ── */
  const handlePresetClick = (val) => {
    setSelectedAmount(val);
    setCustomAmount("");
  };
  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount("");
  };

  const finalAmount = selectedAmount || customAmount;
  const canContinue =
    finalAmount && parseFloat(finalAmount.replace(/,/g, "")) > 0;

  return (
    <>
      {/* ── FULL-SCREEN OVERLAY ── */}
      <div className="fixed inset-0 z-100 overflow-hidden">
        {/* Dark backdrop */}
        <div
          className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Close button — top-right of viewport */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 md:top-6 md:right-6 z-60 text-brand-white-100 hover:opacity-90 transition-opacity cursor-pointer"
          aria-label="Close modal"
        >
          <Icon icon="heroicons:x-mark" width={32} />
        </button>

        {/* ── CONTENT — cards + security links ── */}
        <div className="relative z-55 min-h-screen flex items-center justify-center p-3 py-12 md:p-8">
          <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-stretch md:items-end justify-center gap-4 md:gap-6">
            {/* Two cards side by side — CampaignCard hidden on mobile */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch">
              <div className="hidden md:flex">
                <CampaignCard tier={tier} />
              </div>

              <DonationPanel
                tier={tier}
                frequency={frequency}
                setFrequency={setFrequency}
                selectedAmount={selectedAmount}
                customAmount={customAmount}
                onPresetClick={handlePresetClick}
                onCustomChange={handleCustomChange}
                step={step}
                setStep={setStep}
                canContinue={canContinue}
                finalAmount={finalAmount}
              />
            </div>

            {/* Security links — to the right, bottom-aligned with cards */}
            <div className="hidden md:flex flex-col items-end gap-2 pb-2 shrink-0">
              <p className="flex items-center gap-2 text-sm text-brand-white-100/70 hover:text-brand-white-100 hover:underline transition-all cursor-help whitespace-nowrap">
                Is my donation secure
                <span className="w-5 h-5 rounded-full bg-brand-white-100/30 text-brand-white-100 grid place-items-center">
                  <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
                </span>
              </p>
              <p className="flex items-center gap-2 text-sm text-brand-white-100/70 hover:text-brand-white-100 hover:underline transition-all cursor-help whitespace-nowrap">
                Can I cancel my recurring donation
                <span className="w-5 h-5 rounded-full bg-brand-white-100/30 text-brand-white-100 grid place-items-center">
                  <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationModal;
