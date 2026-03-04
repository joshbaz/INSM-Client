import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/animations";
import ContactUsHero from "./ContactUsHero";
import ContactDetails from "./ContactDetails";
import StrategicInquiry from "./StrategicInquiry";

const ContactUsPage = () => {
  return (
    <>
      <ContactUsHero />

      <section className="py-20 md:py-32 bg-brand-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-16"
          >
            <hr className="border-brand-dark-100" />

            <ContactDetails />

            <StrategicInquiry />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUsPage;
