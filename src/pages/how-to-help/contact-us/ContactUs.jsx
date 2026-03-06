import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../../utils/animations";
import ContactHero from "./ContactHero";
import ContactConnect from "./ContactConnect";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <>
      <ContactHero />

      <section className="py-20 md:py-32 bg-brand-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <ContactConnect />

            <hr className="border-t border-brand-dark-200/50 max-w-3xl mx-auto my-12" />

            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
