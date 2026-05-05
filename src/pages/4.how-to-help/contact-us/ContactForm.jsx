import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { fadeUp } from "../../../utils/animations";

const ContactSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  message: Yup.string()
    .max(1600, "Must be 1600 characters or less")
    .required("Message is required"),
});

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

const ContactForm = () => {
  return (
    <motion.div variants={fadeUp} className="max-w-3xl mx-auto space-y-6 pt-6">
      <h2 className="text-brand-dark font-primary font-bold text-2xl tracking-tight">
        Strategic Inquiry Form
      </h2>
      <p className="font-secondary text-brand-dark-500 text-base leading-relaxed max-w-2xl">
        For all other inquiries regarding the Makindye Blueprint or national
        scaling opportunities, please submit the brief below. Our strategic team
        will be in touch shortly to discuss the Efficiency and Market Dominance
        of our shared vision.
      </p>

      <Formik
        initialValues={{ fullName: "", email: "", message: "" }}
        validationSchema={ContactSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact", ...values }),
          })
            .then(() => {
              alert("Thank you! Your strategic inquiry has been submitted.");
              setSubmitting(false);
              resetForm();
            })
            .catch((error) => {
              alert("Submission failed. Please try again.");
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className="space-y-6 pt-4" name="contact" data-netlify="true">
            {/* Hidden field for Netlify Forms (also passed in body) */}
            <input type="hidden" name="form-name" value="contact" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-[80%]">
              <div className="space-y-2">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold font-secondary text-brand-dark"
                >
                  Full Name
                </label>
                <Field
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 bg-brand-white border border-brand-dark-200 rounded-lg text-brand-dark-600 outline-none focus:border-brand-lilac focus:ring-1 focus:ring-brand-lilac font-secondary text-base md:text-sm placeholder:text-brand-dark-300 transition-all"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-brand-pink text-xs mt-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold font-secondary text-brand-dark"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="email@email.com"
                  className="w-full px-4 py-3 bg-brand-white border border-brand-dark-200 rounded-lg text-brand-dark-600 outline-none focus:border-brand-lilac focus:ring-1 focus:ring-brand-lilac font-secondary text-base md:text-sm placeholder:text-brand-dark-300 transition-all"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-brand-pink text-xs mt-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-xs font-bold font-secondary text-brand-dark"
              >
                Your message
              </label>
              <Field
                as="textarea"
                name="message"
                rows="5"
                placeholder="Please let us know what's on your mind. Have a question for us? Ask away."
                className="w-full px-4 py-3 bg-brand-white border border-brand-dark-200 rounded-lg text-brand-dark-600 outline-none focus:border-brand-lilac focus:ring-1 focus:ring-brand-lilac font-secondary text-base md:text-sm resize-y placeholder:text-brand-dark-300 transition-all"
              />
              <div className="flex justify-between items-center mt-1">
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-brand-pink text-xs"
                />
                <span className="text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg text-brand-dark-300 ml-auto font-secondary">
                  1600 max characters
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-lilac hover:bg-brand-lilac-600 text-brand-white rounded-full px-8 py-3.5 font-primary text-sm font-semibold uppercase tracking-wide transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default ContactForm;
