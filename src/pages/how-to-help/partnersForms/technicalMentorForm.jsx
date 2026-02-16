import React, { useCallback, useEffect, useMemo } from "react";
import { Formik } from "formik";
import { Icon } from "@iconify/react";
import * as Yup from "yup";

/* ── Inline SVG icons for each expertise option ── */
const ExpertiseIcons = {
  Law: <Icon icon="heroicons:scale" className="w-6 h-6" />,
  Finance: <Icon icon="heroicons:currency-dollar" className="w-6 h-6" />,
  Health: <Icon icon="heroicons:heart" className="w-6 h-6" />,
  Other: <Icon icon="heroicons:sparkles" className="w-6 h-6" />,
};

const TechnicalMentorForm = ({ isOpen, onClose }) => {
  const validationSchema = useMemo(
    () =>
      Yup.object({
        fullName: Yup.string().trim().required("Full name is required"),
        phoneNumber: Yup.string().trim().required("Phone number is required"),
        email: Yup.string()
          .trim()
          .email("Invalid email")
          .required("Email is required"),
        linkedin: Yup.string().trim().url("Invalid URL").nullable(),
        areaOfExpertise: Yup.string()
          .oneOf(["Law", "Finance", "Health", "Other"])
          .required("Select an area of expertise"),
      }),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const expertiseOptions = [
    { key: "Law", label: "Law" },
    { key: "Finance", label: "Finance" },
    { key: "Health", label: "Health" },
    { key: "Other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
      {/* ── Dark backdrop ── */}
      <div
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* ── Close button — top-right of viewport ── */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-60 text-brand-cream-100 hover:opacity-90 transition-opacity cursor-pointer"
        aria-label="Close modal"
        type="button"
      >
        <Icon icon="heroicons:x-mark" width={24} />
      </button>

      {/* ── Content wrapper — includes card + security links ── */}
      <div className="relative z-55 w-full max-w-[1000px] flex flex-col md:flex-row items-end justify-center gap-6 animate-[modalIn_0.25s_ease-out]">
        {/* ── White card ── */}
        <div className="w-full max-w-[720px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          {/* ── Fixed header ── */}
          <div className="px-5 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-brand-dark-200/30 shrink-0">
            <h2 className="text-lg md:text-2xl font-bold font-primary text-brand-dark">
              Join the Technical Mentorship
            </h2>
            <p className="mt-1 text-xs md:text-sm font-secondary text-brand-dark-400 max-w-md">
              Lend your expertise to build the infrastructure of a movement.
            </p>
          </div>

          {/* ── Scrollable form body ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-10 py-5 md:py-7">
            <Formik
              initialValues={{
                fullName: "",
                phoneNumber: "",
                email: "",
                linkedin: "",
                areaOfExpertise: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  console.log("Technical mentor application:", values);
                  resetForm();
                  onClose();
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  {/* ── Section: Professional Details ── */}
                  <div className="flex items-center gap-2.5 text-brand-dark-400">
                    <span className="w-5 h-5 grid place-items-center">
                      <Icon
                        icon="heroicons:user"
                        className="w-[18px] h-[18px]"
                      />
                    </span>
                    <span className="text-xs md:text-sm font-primary font-semibold text-brand-dark uppercase tracking-wide">
                      Professional Details
                    </span>
                  </div>
                  <div className="mt-3 h-px bg-brand-dark-200/30" />

                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your full name"
                        className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                      />
                      {touched.fullName && errors.fullName && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        Phone number
                      </label>
                      <input
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your mobile number"
                        className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                      />
                      {touched.phoneNumber && errors.phoneNumber && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="email@email.com"
                        className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* LinkedIn */}
                    <div>
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        LinkedIn profile
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300">
                          <Icon icon="heroicons:link" className="w-4 h-4" />
                        </span>
                        <input
                          name="linkedin"
                          value={values.linkedin}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="linkedin.com/in/..."
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 pl-10 pr-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                        />
                      </div>
                      {touched.linkedin && errors.linkedin && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700">
                          {errors.linkedin}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ── Section: Area of Expertise ── */}
                  <div className="mt-8 flex items-center gap-2.5 text-brand-dark-400">
                    <span className="w-5 h-5 grid place-items-center">
                      <Icon
                        icon="heroicons:briefcase"
                        className="w-[18px] h-[18px]"
                      />
                    </span>
                    <span className="text-xs md:text-sm font-primary font-semibold text-brand-dark uppercase tracking-wide">
                      Area of Expertise
                    </span>
                  </div>
                  <div className="mt-3 h-px bg-brand-dark-200/30" />

                  <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                    {expertiseOptions.map((opt) => {
                      const active = values.areaOfExpertise === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() =>
                            setFieldValue("areaOfExpertise", opt.key)
                          }
                          className={`group relative h-20 md:h-[88px] rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                            active
                              ? "border-brand-lilac bg-brand-lilac-100/60 shadow-sm shadow-brand-lilac/20"
                              : "border-brand-dark-200/40 bg-white hover:border-brand-lilac-300/90 hover:bg-brand-lilac-100/20"
                          }`}
                        >
                          <span
                            className={`transition-colors duration-200 ${
                              active
                                ? "text-brand-lilac-700"
                                : "text-brand-dark-300 group-hover:text-brand-lilac/90"
                            }`}
                          >
                            {ExpertiseIcons[opt.key]}
                          </span>
                          <span
                            className={`text-xs font-primary font-semibold transition-colors duration-200 ${
                              active
                                ? "text-brand-lilac-700"
                                : "text-brand-dark"
                            }`}
                          >
                            {opt.label}
                          </span>
                          {/* Active indicator dot */}
                          {active && (
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-lilac animate-[fadeIn_0.15s_ease-out]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {touched.areaOfExpertise && errors.areaOfExpertise && (
                    <p className="mt-2 text-xs font-secondary text-brand-pink-700">
                      {errors.areaOfExpertise}
                    </p>
                  )}

                  {/* ── Submit ── */}
                  <div className="mt-8 md:mt-10 flex items-center justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-lilac hover:bg-brand-lilac/90 active:scale-[0.97] text-white font-primary font-semibold text-xs md:text-sm tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-brand-lilac/25 hover:shadow-lg hover:shadow-brand-lilac/30"
                    >
                      SUBMIT FORM
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        {/* ── Security links — to the right, bottom-aligned with form ── */}
        <div className="hidden md:flex flex-col items-end gap-2 pb-2 shrink-0">
          <p className="flex items-center gap-2 text-sm text-brand-cream-100/70 hover:text-brand-cream-100/90 hover:underline transition-all cursor-help whitespace-nowrap">
            Is my information secure
            <span className="w-5 h-5 rounded-full bg-brand-cream-100/30 text-brand-cream-100 grid place-items-center">
              <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
            </span>
          </p>
          <p className="flex items-center gap-2 text-sm text-brand-cream-100/70 hover:text-brand-cream-100/90 hover:underline transition-all cursor-help whitespace-nowrap">
            Can I delete my form details
            <span className="w-5 h-5 rounded-full bg-brand-cream-100/30 text-brand-cream-100 grid place-items-center">
              <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalMentorForm;
