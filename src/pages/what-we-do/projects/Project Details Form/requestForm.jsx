import React, { useCallback, useEffect, useMemo } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

const RequestForm = ({ isOpen, onClose }) => {
  const validationSchema = useMemo(
    () =>
      Yup.object({
        companyName: Yup.string().trim().required("Company name is required"),
        contactPerson: Yup.string()
          .trim()
          .required("Contact person is required"),
        phoneNumber: Yup.string().trim().required("Phone number is required"),
        email: Yup.string()
          .trim()
          .email("Invalid email")
          .required("Email is required"),
        resourceType: Yup.string().trim().required("Resource type is required"),
        logisticsNote: Yup.string().trim(),
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
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
      {/* ── Dark backdrop ── */}
      <div
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* ── Close button ── */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-60 text-brand-cream-100 hover:opacity-90 transition-opacity cursor-pointer"
        aria-label="Close modal"
        type="button"
      >
        <Icon icon="heroicons:x-mark" width={32} />
      </button>

      {/* ── Content wrapper ── */}
      <div className="relative z-55 w-full max-w-[1000px] flex flex-col md:flex-row items-end justify-center gap-6 animate-[modalIn_0.25s_ease-out]">
        {/* ── White card ── */}
        <div className="w-full max-w-[720px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          {/* ── Fixed header ── */}
          <div className="px-5 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-brand-dark-200/30 shrink-0">
            <h2 className="text-xl md:text-2xl font-bold font-primary text-brand-dark flex justify-center">
              Sponsor with Assets
            </h2>
          </div>

          {/* ── Scrollable form body ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-10 py-6 md:py-8">
            <Formik
              initialValues={{
                companyName: "",
                contactPerson: "",
                phoneNumber: "",
                resourceType: "",
                email: "",
                logisticsNote: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  console.log("Assets Sponsorship Request:", values);
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
              }) => (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Name (Full Width) */}
                  <div>
                    <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                        <Icon
                          icon="heroicons:building-office-2"
                          className="w-4 h-4"
                        />
                      </span>
                      <input
                        name="companyName"
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Enter your company's name"
                        className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 pl-10 pr-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                      />
                    </div>
                    {touched.companyName && errors.companyName && (
                      <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  {/* Row: Contact Person & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Contact Person */}
                    <div>
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        Company contact person
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                          <Icon icon="heroicons:user" className="w-4 h-4" />
                        </span>
                        <input
                          name="contactPerson"
                          value={values.contactPerson}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your full name"
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 pl-10 pr-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                        />
                      </div>
                      {touched.contactPerson && errors.contactPerson && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                          {errors.contactPerson}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        Phone number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                          <Icon icon="heroicons:phone" className="w-4 h-4" />
                        </span>
                        <input
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your mobile number"
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 pl-10 pr-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                        />
                      </div>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Resource Type (Full Width) */}
                  <div>
                    <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                      Resource Type
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                        <Icon icon="heroicons:cube" className="w-4 h-4" />
                      </span>
                      <select
                        name="resourceType"
                        value={values.resourceType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 pl-10 pr-10 py-2.5 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all appearance-none cursor-pointer ${
                          values.resourceType
                            ? "text-brand-dark"
                            : "text-brand-dark-300"
                        }`}
                      >
                        <option value="" disabled>
                          Select type, i.e Tools/Equipment, Software, Training
                          Materials
                        </option>
                        <option value="Tools/Equipment">Tools/Equipment</option>
                        <option value="Professional Space">
                          Professional Space
                        </option>
                        <option value="Software">Software</option>
                        <option value="Training Materials">
                          Training Materials
                        </option>
                      </select>
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                        <Icon
                          icon="heroicons:chevron-down"
                          className="w-4 h-4"
                        />
                      </span>
                    </div>
                    {touched.resourceType && errors.resourceType && (
                      <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                        {errors.resourceType}
                      </p>
                    )}
                  </div>

                  {/* Email Address (Full Width) */}
                  <div>
                    <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                        <Icon icon="heroicons:envelope" className="w-4 h-4" />
                      </span>
                      <input
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="email@email.com"
                        className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 pl-10 pr-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Logistics Note (Full Width) */}
                  <div>
                    <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                      Logistics Note
                    </label>
                    <textarea
                      name="logisticsNote"
                      value={values.logisticsNote}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={3}
                      placeholder="Briefly describe the resources and your location in Uganda"
                      className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-cream-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="pt-2 flex items-center justify-start">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#9e76a0] hover:bg-[#9e76a0]/90 active:scale-[0.97] text-white font-primary font-semibold text-xs md:text-sm tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md"
                    >
                      SUBMIT FORM
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>

        {/* ── Sidebar: Security / Trust ── */}
        <div className="hidden md:flex flex-col items-end gap-2 pb-2 shrink-0">
          <p className="flex items-center gap-2 text-sm text-brand-cream-100/70 hover:text-brand-cream-100/90 hover:underline transition-all cursor-help whitespace-nowrap">
            How is my data used
            <span className="w-5 h-5 rounded-full bg-brand-cream-100/30 text-brand-cream-100 grid place-items-center">
              <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
            </span>
          </p>
          <p className="flex items-center gap-2 text-sm text-brand-cream-100/70 hover:text-brand-cream-100/90 hover:underline transition-all cursor-help whitespace-nowrap">
            Partnership guidelines
            <span className="w-5 h-5 rounded-full bg-brand-cream-100/30 text-brand-cream-100 grid place-items-center">
              <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
