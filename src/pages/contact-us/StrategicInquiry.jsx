import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../../utils/animations";
import StrategyInquiryForm from "./StrategyInquiryForm";

const StrategicInquiry = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="bg-brand-lilac-100 p-8 md:p-12 border border-brand-lilac-200"
    >
      <h2 className="text-brand-lilac-900 font-primary font-black text-xl md:text-2xl tracking-tighter uppercase mb-6">
        Strategic Inquiry Form
      </h2>
      <p className="font-secondary text-brand-dark-400 text-base md:text-lg leading-relaxed mb-8 italic">
        For all other inquiries regarding the Makindye Blueprint or national
        scaling opportunities, please submit the brief below. Our strategic team
        will be in touch shortly to discuss the Efficiency and Market Dominance
        of our shared vision.
      </p>

      <StrategyInquiryForm />

      <div className="flex justify-center mt-12 border-t border-brand-lilac-200 pt-8">
        <span className="text-brand-lilac-600 font-primary text-sm font-bold uppercase tracking-widest opacity-60">
          -- INSM Strategic Inquiry Desk --
        </span>
      </div>
    </motion.div>
  );
};

export default StrategicInquiry;
