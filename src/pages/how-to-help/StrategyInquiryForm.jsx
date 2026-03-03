import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

const StrategyInquiryForm = () => {
  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Full name is required"),
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email is required"),
    organization: Yup.string()
      .trim()
      .required("Organization/Institution is required"),
    inquiryType: Yup.string().required("Please select an inquiry type"),
    message: Yup.string().trim().required("Strategic brief is required"),
  });

  const initialValues = {
    fullName: "",
    email: "",
    organization: "",
    inquiryType: "",
    message: "",
  };

  const inquiryOptions = [
    "Capital Deployment",
    "National Scaling",
    "Technical Mastery",
    "Institutional Partnership",
    "Market Mentorship",
    "Other Strategic Inquiry",
  ];

  return (
    <div className="w-full">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log("Strategic Inquiry Submitted:", values);
          setTimeout(() => {
            alert(
              "Strategic Brief Received. Our leadership team will be in touch shortly.",
            );
            setSubmitting(false);
            resetForm();
          }, 1000);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* ── Section: Leadership Contact ── */}
            <div>
              <div className="flex items-center gap-3 text-brand-gold mb-4">
                <Icon
                  icon="heroicons:user-circle"
                  className="w-6 h-6 outline-none"
                />
                <h3 className="text-sm font-primary font-bold uppercase tracking-[0.2em]">
                  Lead Representative
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-primary font-bold text-brand-dark uppercase tracking-[0.15em]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    placeholder="Enter your name"
                    className="w-full bg-brand-white-100 border border-brand-dark-200/40 rounded-sm px-4 py-3 text-sm font-secondary text-brand-dark focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all placeholder:text-brand-dark-200/40"
                  />
                  {touched.fullName && errors.fullName && (
                    <p className="text-brand-gold-700 text-[10px] font-bold uppercase tracking-wider">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-primary font-bold text-brand-dark uppercase tracking-[0.15em]">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="email@institution.org"
                    className="w-full bg-brand-white-100 border border-brand-dark-200/40 rounded-sm px-4 py-3 text-sm font-secondary text-brand-dark focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all placeholder:text-brand-dark-200/40"
                  />
                  {touched.email && errors.email && (
                    <p className="text-brand-gold-700 text-[10px] font-bold uppercase tracking-wider">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Section: Strategic Context ── */}
            <div>
              <div className="flex items-center gap-3 text-brand-gold mb-4">
                <Icon
                  icon="heroicons:briefcase"
                  className="w-6 h-6 outline-none"
                />
                <h3 className="text-sm font-primary font-bold uppercase tracking-[0.2em]">
                  Strategic Context
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Organization */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-primary font-bold text-brand-dark uppercase tracking-[0.15em]">
                    Organization / Entity
                  </label>
                  <input
                    type="text"
                    name="organization"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organization}
                    placeholder="Entity name"
                    className="w-full bg-brand-white-100 border border-brand-dark-200/40 rounded-sm px-4 py-3 text-sm font-secondary text-brand-dark focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all placeholder:text-brand-dark-200/40"
                  />
                  {touched.organization && errors.organization && (
                    <p className="text-brand-gold-700 text-[10px] font-bold uppercase tracking-wider">
                      {errors.organization}
                    </p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-primary font-bold text-brand-dark uppercase tracking-[0.15em]">
                    Nature of Strategic Inquiry
                  </label>
                  <div className="relative">
                    <select
                      name="inquiryType"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.inquiryType}
                      className="w-full bg-brand-white-100 border border-brand-dark-200/40 rounded-sm px-4 py-3 text-sm font-secondary text-brand-dark focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select inquiry type
                      </option>
                      {inquiryOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <Icon
                      icon="ph:caret-down-bold"
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gold pointer-events-none"
                    />
                  </div>
                  {touched.inquiryType && errors.inquiryType && (
                    <p className="text-brand-gold-700 text-[10px] font-bold uppercase tracking-wider">
                      {errors.inquiryType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── Section: The Brief ── */}
            <div>
              <div className="flex items-center gap-3 text-brand-gold mb-4">
                <Icon
                  icon="heroicons:document-text"
                  className="w-6 h-6 outline-none"
                />
                <h3 className="text-sm font-primary font-bold uppercase tracking-[0.2em]">
                  The Brief
                </h3>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-primary font-bold text-brand-dark uppercase tracking-[0.15em]">
                  Industrial/Strategic Brief
                </label>
                <textarea
                  name="message"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  rows={4}
                  placeholder="Outline the efficiency and market dominance of your shared vision..."
                  className="w-full bg-brand-white-100 border border-brand-dark-200/40 rounded-sm px-4 py-3 text-sm font-secondary text-brand-dark focus:ring-1 focus:ring-brand-gold focus:border-brand-gold outline-none transition-all placeholder:text-brand-dark-200/40 resize-none"
                />
                {touched.message && errors.message && (
                  <p className="text-brand-gold-700 text-[10px] font-bold uppercase tracking-wider">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex justify-start">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 40px -10px rgba(212, 175, 55, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="
                  bg-brand-gold hover:bg-brand-gold-600
                  text-brand-navy-900 font-primary font-bold text-sm
                  px-12 py-5
                  rounded-sm
                  transition-all duration-300
                  disabled:opacity-70 disabled:cursor-not-allowed
                  group cursor-pointer
                  uppercase tracking-[0.3em]
                  flex items-center gap-4
                  border border-brand-gold
                "
              >
                {isSubmitting ? "TRANSMITTING..." : "START THE CONVERSATION"}
                {!isSubmitting && (
                  <Icon
                    icon="heroicons:arrow-long-right"
                    className="w-5 h-5 group-hover:translate-x-3 transition-transform"
                  />
                )}
              </motion.button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default StrategyInquiryForm;
