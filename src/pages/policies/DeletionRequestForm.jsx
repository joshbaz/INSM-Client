import React, { useState, useEffect, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const DeletionSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  reason: Yup.string().max(500, "Reason must be less than 500 characters"),
});

const DeletionRequestForm = ({ isOpen, onClose }) => {
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: "",
  });

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]),
      )
      .join("&");
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "deletion-request", ...values }),
    })
      .then(() => {
        setSubmitStatus({
          success: true,
          message:
            "Your deletion request has been submitted. Our compliance team will contact you within 30 days.",
        });
        resetForm();
      })
      .catch((error) => {
        setSubmitStatus({
          success: false,
          message:
            "There was an error submitting your request. Please email compliance@insmuganda.org directly.",
        });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl bg-brand-white rounded-xl shadow-2xl p-6 md:p-10 max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-brand-dark-300 hover:text-brand-dark transition-colors p-1"
            >
              <Icon icon="heroicons:x-mark" width={28} />
            </button>

            <div className="w-full mb-8">
              <div className="border-b border-brand-dark-200/50 pb-6 mb-8">
                <h2 className="text-2xl md:text-3xl font-primary font-bold text-brand-dark mb-4 tracking-tight">
                  Deletion Request Form
                </h2>
                <p className="text-sm md:text-base font-secondary text-brand-dark-600 leading-relaxed max-w-xl">
                  Use this form to initiate a request for data access, update,
                  or permanent deletion from the International Network for
                  Single Mothers Uganda Chapter records.
                </p>
              </div>

              <Formik
                initialValues={{ fullName: "", email: "", reason: "" }}
                validationSchema={DeletionSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, touched, errors }) => (
                  <Form
                    className="space-y-8"
                    name="deletion-request"
                    data-netlify="true"
                  >
                    {/* Hidden field for Netlify Forms */}
                    <input
                      type="hidden"
                      name="form-name"
                      value="deletion-request"
                    />

                    {/* 1. Identity Verification */}
                    <div className="space-y-6">
                      <h3 className="text-lg md:text-xl font-primary font-bold text-brand-dark">
                        1. Identity Verification
                      </h3>

                      <div className="space-y-5">
                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="fullName"
                            className="text-xs font-primary font-bold text-brand-dark uppercase tracking-wide"
                          >
                            Full Name
                          </label>
                          <Field
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 bg-brand-white border rounded-md font-secondary text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-brand-lilac ${
                              touched.fullName && errors.fullName
                                ? "border-red-500 focus:border-red-500"
                                : "border-brand-dark-200/60 focus:border-brand-lilac"
                            } placeholder-brand-dark-300 placeholder:text-sm`}
                          />
                          <ErrorMessage
                            name="fullName"
                            component="span"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label
                            htmlFor="email"
                            className="text-xs font-primary font-bold text-brand-dark uppercase tracking-wide"
                          >
                            Email address
                          </label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Must match the email used in your Equipper or Mentor application"
                            className={`w-full px-4 py-3 bg-brand-white border rounded-md font-secondary text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-brand-lilac ${
                              touched.email && errors.email
                                ? "border-red-500 focus:border-red-500"
                                : "border-brand-dark-200/60 focus:border-brand-lilac"
                            } placeholder-brand-dark-300 placeholder:text-sm`}
                          />
                          <ErrorMessage
                            name="email"
                            component="span"
                            className="text-red-500 text-xs mt-1"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 2. Reason for Request */}
                    <div className="space-y-6">
                      <h3 className="text-lg md:text-xl font-primary font-bold text-brand-dark">
                        2. Reason for Request (Optional)
                      </h3>

                      <div className="flex flex-col gap-1.5">
                        <Field
                          as="textarea"
                          name="reason"
                          id="reason"
                          rows="5"
                          placeholder="Optional: Please share the reason for your request..."
                          className={`w-full px-4 py-3 bg-brand-white border rounded-md font-secondary text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-brand-lilac resize-y ${
                            touched.reason && errors.reason
                              ? "border-red-500 focus:border-red-500"
                              : "border-brand-dark-200/60 focus:border-brand-lilac"
                          } placeholder-brand-dark-300 placeholder:text-sm`}
                        />
                        <ErrorMessage
                          name="reason"
                          component="span"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    {/* Submit Status Message */}
                    {submitStatus.message && (
                      <div
                        className={`flex gap-3 items-center p-4 rounded-md text-sm ${
                          submitStatus.success
                            ? "bg-green-50 text-green-800 border-l-4 border-green-500"
                            : "bg-red-50 text-red-800 border-l-4 border-red-500"
                        }`}
                      >
                        <Icon
                          icon={
                            submitStatus.success
                              ? "heroicons:check-circle-solid"
                              : "heroicons:exclamation-circle-solid"
                          }
                          className="w-5 h-5 shrink-0"
                        />
                        <p>{submitStatus.message}</p>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-brand-lilac-600 hover:bg-brand-lilac-700 text-brand-white font-primary font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-full transition-colors duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Request"}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DeletionRequestForm;
