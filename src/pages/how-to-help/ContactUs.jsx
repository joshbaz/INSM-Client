import React from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";
import StrategyInquiryForm from "./StrategyInquiryForm";

const ContactUs = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[500px] md:h-[600px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/contact.png")`,
        }}
      >
        {/* White transparent overlay on the image */}
        <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700"></div>

        {/* Content with glass background */}
        <div className="relative z-10 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] flex flex-col justify-center items-center p-6 md:p-12 text-center w-full shadow-sm border-t border-brand-white/50"
          >
            <motion.h1
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold font-primary text-brand-teal-900 uppercase tracking-tight mb-4 md:mb-6 leading-tight max-w-5xl mx-auto"
            >
              Let’s Architect the <br className="hidden md:block" /> Future of
              Uganda
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed"
            >
              Whether you are ready to deploy catalytic capital, offer technical
              mastery, or scale the Makindye Blueprint to a new district, our
              leadership team is ready to coordinate. This is where your
              resources meet our results.
            </motion.p>
          </motion.div>
        </div>
      </section>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
              {/* Connect Section */}
              <motion.div variants={fadeUp} className="space-y-6">
                <h2 className="text-brand-lilac-800 font-primary font-black text-xl md:text-2xl tracking-tighter uppercase">
                  CONNECT WITH THE ARCHITECTURE
                </h2>
                <p className="font-secondary text-brand-dark-400 text-base md:text-lg leading-relaxed">
                  For strategic inquiries, institutional questions, or to
                  authorize a capital deployment, please connect with our team:
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
                  To optimize your recurring capital deployment or for
                  high-level inquiries regarding Market Mentorship and
                  Institutional Partnership, please contact our finance desk:
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

            {/* Strategic Inquiry Section */}
            <motion.div
              variants={fadeUp}
              className="bg-brand-lilac-100 p-8 md:p-12 border border-brand-lilac-200"
            >
              <h2 className="text-brand-lilac-900 font-primary font-black text-xl md:text-2xl tracking-tighter uppercase mb-6">
                Strategic Inquiry Form
              </h2>
              <p className="font-secondary text-brand-dark-400 text-base md:text-lg leading-relaxed mb-8 italic">
                For all other inquiries regarding the Makindye Blueprint or
                national scaling opportunities, please submit the brief below.
                Our strategic team will be in touch shortly to discuss the
                Efficiency and Market Dominance of our shared vision.
              </p>

              <StrategyInquiryForm />

              <div className="flex justify-center mt-12 border-t border-brand-lilac-200 pt-8">
                <span className="text-brand-lilac-600 font-primary text-sm font-bold uppercase tracking-widest opacity-60">
                  -- INSM Strategic Inquiry Desk --
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
