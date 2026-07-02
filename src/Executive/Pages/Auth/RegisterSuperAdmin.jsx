import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { registerSuperAdminService } from "../../../services/api";
import { fadeUp, staggerContainer } from "../../../utils/animations";

const SetupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email institutional format")
    .required("Email is required for authentication"),
  password: Yup.string()
    .min(6, "Security protocol requires at least 6 characters")
    .required("Password is required"),
});

const RegisterSuperAdmin = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center relative overflow-hidden py-20 px-4">
      {/* Decorative background elements tailored for Executive */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-white/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-md w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <div className="inline-block bg-brand-white rounded-full p-2 shadow-lg border border-[#D4AF37]/20 mb-6">
            <img
              src="/logo.png"
              alt="INSM Uganda Logo"
              className="w-16 h-16 object-contain rounded-full"
            />
          </div>
          <h1 className="text-3xl font-primary font-black text-brand-white uppercase tracking-tight mb-2">
            System <span className="text-[#D4AF37]">Initialization</span>
          </h1>
          <p className="text-brand-white/60 font-secondary text-sm">
            One-Time Administrator Provisioning
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-brand-white/5 backdrop-blur-md border border-brand-white/10 p-8 md:p-10 rounded-xl shadow-2xl"
        >
          {success ? (
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-4">
                <Icon icon="heroicons:check" className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-primary text-brand-white">Setup Complete</h3>
              <p className="text-brand-white/60 font-secondary text-sm">
                The primary administrator account has been successfully provisioned. This setup portal is now permanently locked.
              </p>
              <button
                onClick={() => navigate("/executive/login")}
                className="w-full bg-[#D4AF37] text-[#111111] font-primary font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-full hover:bg-[#c49a2a] transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/10 active:scale-[0.98]"
              >
                Proceed to Login
              </button>
            </div>
          ) : (
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={SetupSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setError("");
                try {
                  await registerSuperAdminService(values);
                  setSuccess(true);
                } catch (err) {
                  setError(
                    err.response?.data?.message || "An unexpected error occurred."
                  );
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs py-3 px-4 rounded-sm flex items-center gap-2">
                      <Icon
                        icon="heroicons:exclamation-circle"
                        className="w-4 h-4"
                      />
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-[10px] font-primary font-bold text-brand-white/40 uppercase tracking-[0.15em]">
                      Full Name
                    </label>
                    <div className="relative">
                      <Icon
                        icon="heroicons:user"
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                          errors.name && touched.name
                            ? "text-red-400"
                            : "text-brand-white/20"
                        }`}
                      />
                      <Field
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        className={`w-full bg-brand-white/5 border rounded-sm pl-12 pr-4 py-4 text-sm font-secondary text-brand-white placeholder:text-brand-white/20 focus:bg-brand-white/10 outline-none transition-all ${
                          errors.name && touched.name
                            ? "border-red-500/50"
                            : "border-brand-white/10 focus:border-[#D4AF37]/50"
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-[9px] text-red-400 font-bold uppercase tracking-wider mt-1 ml-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-primary font-bold text-brand-white/40 uppercase tracking-[0.15em]">
                      Admin Email
                    </label>
                    <div className="relative">
                      <Icon
                        icon="heroicons:envelope"
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                          errors.email && touched.email
                            ? "text-red-400"
                            : "text-brand-white/20"
                        }`}
                      />
                      <Field
                        type="email"
                        name="email"
                        placeholder="admin@insmuganda.org"
                        className={`w-full bg-brand-white/5 border rounded-sm pl-12 pr-4 py-4 text-sm font-secondary text-brand-white placeholder:text-brand-white/20 focus:bg-brand-white/10 outline-none transition-all ${
                          errors.email && touched.email
                            ? "border-red-500/50"
                            : "border-brand-white/10 focus:border-[#D4AF37]/50"
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-[9px] text-red-400 font-bold uppercase tracking-wider mt-1 ml-1"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-primary font-bold text-brand-white/40 uppercase tracking-[0.15em]">
                      Secure Password
                    </label>
                    <div className="relative">
                      <Icon
                        icon="heroicons:lock-closed"
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                          errors.password && touched.password
                            ? "text-red-400"
                            : "text-brand-white/20"
                        }`}
                      />
                      <Field
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        className={`w-full bg-brand-white/5 border rounded-sm pl-12 pr-4 py-4 text-sm font-secondary text-brand-white placeholder:text-brand-white/20 focus:bg-brand-white/10 outline-none transition-all ${
                          errors.password && touched.password
                            ? "border-red-500/50"
                            : "border-brand-white/10 focus:border-[#D4AF37]/50"
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-[9px] text-red-400 font-bold uppercase tracking-wider mt-1 ml-1"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] text-[#111111] font-primary font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-full hover:bg-[#c49a2a] transition-all cursor-pointer flex items-center justify-center gap-3 shadow-lg shadow-[#D4AF37]/10 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Icon
                          icon="heroicons:shield-check"
                          className="w-5 h-5"
                        />
                        Provision Administrator
                      </>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 text-center">
          <p className="text-xs text-brand-white/40 font-secondary">
            Notice: This action can only be performed once during initial deployment.
          </p>
          <div className="mt-6 flex flex-col items-center gap-2">
            <a
              href="/executive/login"
              className="text-[10px] font-primary font-bold text-brand-white/30 hover:text-[#D4AF37] uppercase tracking-[0.3em] transition-colors inline-flex items-center gap-2"
            >
              <Icon icon="heroicons:arrow-left" className="w-3 h-3" />
              Back to Login
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterSuperAdmin;
