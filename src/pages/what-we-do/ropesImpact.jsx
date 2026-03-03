import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const STATS = [
  {
    id: 1,
    value: 57,
    label: "Investments\nto Date",
    description: "Active capital deployed into single-mother-led ventures.",
  },
  {
    id: 2,
    value: 17000,
    label: "Mothers\nSupported",
    description: "Moving from orientation to economic independence.",
  },
  {
    id: 3,
    value: 203,
    label: "Ventures\nLaunched",
    description: "New businesses funded by the Network and are thriving.",
  },
];

/* ── Animated counter hook ── */
function useCounter(target, duration = 2000, shouldAnimate) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldAnimate) return;

    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration, shouldAnimate]);

  return count;
}

/* ── Section ── */
const RopesImpact = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full bg-brand-white py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section header — left aligned */}
        <motion.div
          className="mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-2">
            Impact of the Ropes
          </h2>
          <p className="text-base font-secondary text-brand-dark-400">
            Visual proof of the Makindye Model in motion across Uganda.
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              className="bg-brand-lilac-100 flex flex-col items-start gap-5 px-6 py-8"
            >
              {/* LABEL */}
              <span className="text-base md:text-2xl font-semibold font-primary text-brand-pink-800 leading-tight whitespace-pre-line">
                {stat.label}
              </span>

              {/* NUMBER */}
              <span className="text-5xl md:text-6xl font-bold font-primary text-brand-pink-800 leading-none">
                {(isVisible ? stat.value : 0).toLocaleString()}
              </span>

              {/* DESCRIPTION */}
              <p className="text-lg font-secondary text-brand-pink-900 leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RopesImpact;
