import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/animations";

const ContactConnect = () => {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Connect Section */}
      <motion.div
        variants={fadeUp}
        className="space-y-6 flex flex-col items-start text-left"
      >
        <h2 className="text-brand-white-900 font-primary font-bold text-3xl tracking-tight">
          Connect With The Architecture
        </h2>
        <p className="font-secondary text-brand-dark-500 text-base leading-relaxed max-w-2xl">
          For strategic inquiries, institutional questions, or to authorize a
          capital deployment, please connect with our team:
        </p>
        <div className="space-y-1 font-secondary text-brand-dark text-base pt-2">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="font-bold sm:w-48 shrink-0">
              Strategic Hotline:
            </span>
            <a
              href="tel:+256784323406"
              className="text-brand-dark-500 hover:text-brand-lilac transition-colors"
            >
              +256 784 323 406
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="font-bold sm:w-48 shrink-0">
              Operational Hours:
            </span>
            <span className="text-brand-dark-500">
              Mon–Fri, 8:30am–5:00pm EAT
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="font-bold sm:w-48 shrink-0">
              National Headquarters:
            </span>
            <span className="text-brand-dark-500">
              La Grande Chez Johnson Building, Kisugu...
            </span>
          </div>
        </div>
      </motion.div>

      {/* Venture Partnership Section */}
      <motion.div
        variants={fadeUp}
        className="space-y-6 flex flex-col items-start text-left pt-6"
      >
        <h2 className="text-brand-dark-500 font-primary font-bold text-2xl tracking-tight">
          Manage Your Venture Partnership
        </h2>
        <p className="font-secondary text-brand-dark-500 text-base leading-relaxed max-w-2xl">
          To optimize your recurring capital deployment or for high-level
          inquiries regarding Market Mentorship and Institutional Partnership,
          please contact our finance desk:
        </p>
        <div className="space-y-1 font-secondary text-brand-dark text-base pt-2">
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="font-bold sm:w-48 shrink-0">Email:</span>
            <a
              href="mailto:partnership@insmuganda.org"
              className="text-brand-dark-500 hover:text-brand-lilac transition-colors"
            >
              partnership@insmuganda.org
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <span className="font-bold sm:w-48 shrink-0">Direct Line:</span>
            <a
              href="tel:+256784323406"
              className="text-brand-dark-500 hover:text-brand-lilac transition-colors"
            >
              +256 784 323 406
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactConnect;
