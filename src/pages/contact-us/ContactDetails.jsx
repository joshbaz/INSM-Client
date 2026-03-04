import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

const ContactDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
      {/* Connect Section */}
      <motion.div variants={fadeUp} className="space-y-6">
        <h2 className="text-brand-lilac-800 font-primary font-black text-xl md:text-2xl tracking-tighter uppercase">
          CONNECT WITH THE ARCHITECTURE
        </h2>
        <p className="font-secondary text-brand-dark-400 text-base md:text-lg leading-relaxed">
          For strategic inquiries, institutional questions, or to authorize a
          capital deployment, please connect with our team:
        </p>
        <ul className="space-y-4 font-secondary text-brand-dark-900 font-semibold text-base md:text-lg">
          <li className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-brand-lilac-600 font-bold mb-1">
              Strategic Hotline
            </span>
            <a
              href="tel:+256784323406"
              className="hover:text-brand-lilac-700 transition-colors"
            >
              +256 784 323 406
            </a>
          </li>
          <li className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-brand-lilac-600 font-bold mb-1">
              Operational Hours
            </span>
            <span>Mon–Fri, 8:30am–5:00pm EAT</span>
          </li>
          <li className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-brand-lilac-600 font-bold mb-1">
              National Headquarters
            </span>
            <span>La Grande Chez Johnson Building, Kisugu</span>
          </li>
        </ul>
      </motion.div>

      {/* Venture Partnership Section */}
      <motion.div variants={fadeUp} className="space-y-6">
        <h2 className="text-brand-lilac-800 font-primary font-black text-xl md:text-2xl tracking-tighter uppercase">
          Manage Your Venture Partnership
        </h2>
        <p className="font-secondary text-brand-dark-400 text-base md:text-lg leading-relaxed">
          To optimize your recurring capital deployment or for high-level
          inquiries regarding Market Mentorship and Institutional Partnership,
          please contact our finance desk:
        </p>
        <ul className="space-y-4 font-secondary text-brand-dark-900 font-semibold text-base md:text-lg">
          <li className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-brand-lilac-600 font-bold mb-1">
              Email
            </span>
            <a
              href="mailto:partnership@insmuganda.org"
              className="hover:text-brand-lilac-700 transition-colors"
            >
              partnership@insmuganda.org
            </a>
          </li>
          <li className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-brand-lilac-600 font-bold mb-1">
              Direct Line
            </span>
            <a
              href="tel:+256784323406"
              className="hover:text-brand-lilac-700 transition-colors"
            >
              +256 784 323 406
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default ContactDetails;
