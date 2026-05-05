import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import * as Yup from "yup";
import ContinueWithPesapal from "../../../4.how-to-help/Partner-with-us-Page/donationModel/ContinueWithPesapal";

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

const SendDonation = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("donation"); // 'donation' | 'pesapal'
  const [confirmedAmount, setConfirmedAmount] = useState("");

  const validationSchema = useMemo(
    () =>
      Yup.object({
        amount: Yup.string()
          .required("Amount is required")
          .test(
            "is-positive",
            "Amount must be greater than 0",
            (value) => parseFloat((value || "0").replace(/,/g, "")) > 0,
          ),
      }),
    [],
  );

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("donation");
      setConfirmedAmount("");
    }
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC key closes modal
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
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 md:top-6 md:right-6 z-60 text-brand-white-100 hover:opacity-90 transition-opacity cursor-pointer"
        aria-label="Close modal"
      >
        <Icon icon="heroicons:x-mark" width={32} />
      </button>

      {/* Content Wrapper */}
      <div className="relative z-55 w-full max-w-[550px] flex flex-col max-h-[85vh] p-4">
        {/* Card - Flex Container */}
        <div className="w-full bg-brand-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-full">
          {step === "donation" ? (
            <Formik
              initialValues={{ amount: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                setConfirmedAmount(values.amount);
                setStep("pesapal");
              }}
            >
              {({
                values,
                errors,
                touched,
                isValid,
                dirty,
                handleBlur,
                handleChange,
                setFieldValue,
                handleSubmit,
              }) => {
                const currentAmount = values.amount;
                const onPresetClick = (val) => {
                  const numeric = val.replace(/,/g, "");
                  setFieldValue("amount", numeric);
                };

                return (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col h-full"
                  >
                    {/* Fixed Header */}
                    <div className="px-6 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-brand-dark-200/30 shrink-0 bg-brand-white">
                      <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark text-center">
                        Sponsor with Capital
                      </h2>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto overscroll-contain px-6 md:px-10 py-6 md:py-8">
                      {/* Amount Grid */}
                      <div className="grid grid-cols-3 gap-3 w-full mb-6">
                        {PRESET_AMOUNTS.map((val) => {
                          const numericVal = val.replace(/,/g, "");
                          const isActive = currentAmount === numericVal;
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => onPresetClick(numericVal)}
                              className={`h-12 rounded border text-sm font-bold font-primary transition-all duration-200 cursor-pointer flex items-center justify-center
                                ${
                                  isActive
                                    ? "bg-brand-lilac-100 border-brand-lilac text-brand-lilac-800 shadow-inner"
                                    : "bg-brand-white-100 border-transparent text-brand-dark hover:border-brand-lilac-300/90"
                                }`}
                            >
                              ${val}
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom Amount Input */}
                      <div
                        className={`flex items-center w-full bg-brand-white-100/50 border rounded h-14 px-4 mb-2 transition-colors ${
                          errors.amount && touched.amount
                            ? "border-brand-pink-700 focus-within:border-brand-pink-700"
                            : "border-brand-dark-200 focus-within:border-brand-lilac"
                        }`}
                      >
                        <span className="text-xl text-brand-dark-400 font-secondary border-r border-brand-dark-200 pr-3 mr-3 h-6 flex items-center">
                          $
                        </span>
                        <input
                          name="amount"
                          type="number"
                          placeholder="0.00"
                          value={values.amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="flex-1 h-full bg-transparent text-2xl font-secondary text-brand-dark placeholder-brand-dark-200/50 focus:outline-none"
                        />
                      </div>
                      {errors.amount && touched.amount && (
                        <div className="w-full text-left mb-6">
                          <p className="text-xs font-secondary text-brand-pink-700">
                            {errors.amount}
                          </p>
                        </div>
                      )}
                      {/* Spacer */}
                      {!(errors.amount && touched.amount) && (
                        <div className="mb-6" />
                      )}

                      {/* Continue Button */}
                      <button
                        type="submit"
                        disabled={!isValid || !dirty}
                        className={`w-full h-14 rounded border border-brand-dark-200 bg-brand-white shadow-sm flex items-center justify-center gap-2 transition-all duration-200 mb-6
                          ${
                            isValid && dirty
                              ? "hover:shadow-md hover:bg-brand-white-100/90 cursor-pointer"
                              : "opacity-60 cursor-not-allowed"
                          }`}
                      >
                        <span className="text-brand-dark-400 font-bold text-sm tracking-wide">
                          Continue with
                        </span>
                        <span className="text-xl font-bold tracking-tight">
                          <span className="text-pesapal-blue">pesa</span>
                          <span className="text-pesapal-red">pal</span>
                        </span>
                      </button>

                      <p className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg text-brand-dark-400 leading-tight text-center max-w-xs mx-auto">
                        PesaPal gateway ensures your donation is secure and
                        tracked with a "Gold Standard" of integrity.
                      </p>
                    </div>
                  </form>
                );
              }}
            </Formik>
          ) : (
            <ContinueWithPesapal
              amount={confirmedAmount}
              onBack={() => setStep("donation")}
            />
          )}
        </div>
      </div>

      {/* Security links - Fixed positioning to screen */}
      <div className="fixed bottom-8 right-8 flex-col items-end gap-3 z-60 hidden md:flex">
        <button className="flex items-center gap-2 text-xs font-bold text-brand-white hover:text-brand-white-200 transition-colors group cursor-help">
          Is my donation secure
          <span className="w-4 h-4 rounded-full bg-brand-white text-brand-dark flex items-center justify-center group-hover:bg-brand-white-200">
            <Icon icon="ph:question-mark-bold" width={10} />
          </span>
        </button>
        <button className="flex items-center gap-2 text-xs font-bold text-brand-white hover:text-brand-white-200 transition-colors group cursor-help">
          Can I cancel my recurring donation
          <span className="w-4 h-4 rounded-full bg-brand-white text-brand-dark flex items-center justify-center group-hover:bg-brand-white-200">
            <Icon icon="ph:question-mark-bold" width={10} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default SendDonation;
