import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Auto-play interval (ms) ─────────────────────────────────────
const AUTO_PLAY_INTERVAL = 6000;

// ── Mission Data Array ──────────────────────────────────────────
const MISSION_DATA = [
  {
    id: 1,
    title: "Build the Financial Infrastructure",
    subtitle: "The Parish SACCOs",
    description:
      "We organize isolated production units into registered, disciplined Parish Cooperative Societies. These are the building blocks of our wealth-acceleration model.",
    benefit:
      "You aren't funding individuals; you are capitalizing governed financial institutions that unlock wholesale credit liquidity and collective investment power.",
    result: "17,000+ members now command a formal seat at the economic table",
  },
  {
    id: 2,
    title: "Deploy Market-Ready Mastery",
    subtitle: "Specialized Industrial Training",
    description:
      "We replace latent instincts with professional precision. Through our Venture Labs, we provide advanced technical training specifically tailored to the Nation's highest-growth sectors: Commercial Agriculture and Tourism.",
    benefit:
      "Your investment transforms unmapped labor into a certified, professional workforce ready to dominate national value chains.",
    result: 'Members move from "labor-for-hire" to "Industry Owners."',
  },
  {
    id: 3,
    title: "Bridge the Gap to National Wealth",
    subtitle: "Policy & Supply Chain Integration",
    description:
      "We act as the high-efficiency delivery vehicle for state and private sector resources. By aligning our 17,000-strong bloc with national wealth initiatives, we ensure every resource reaches its maximum fiscal utility.",
    benefit:
      "We provide the Radical Transparency and localized accountability that traditional programs lack.",
    result:
      "National policy becomes localized prosperity through disciplined industrial growth.",
  },
  {
    id: 4,
    title: "Secure the Next Generation",
    subtitle: "The Home Foundation",
    description:
      "By stabilizing the household balance sheet, we architect an unshakable environment for the future workforce. We integrate Professional Leadership and Mental Fortitude into our economic model because a secure nation requires strategic leaders.",
    benefit:
      "You are capitalizing the ultimate national safety net, neutralizing social friction at its source and securing the health and discipline of over 50,000+ children.",
    result:
      "A generation of Ugandans raised in an environment of provision and economic sovereignty.",
  },
];

// ── Framer Motion Variants ──
const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

// ── Component ──
const HomeOurMission = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = MISSION_DATA[activeIndex];

  // Auto-advance to the next slide every 6s, resets on manual click
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % MISSION_DATA.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goToNext, activeIndex]);

  return (
    <section
      id="our-mission"
      className="relative w-full lg:px-20 py-20 md:py-28 px-4 md:px-8 bg-brand-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* ── Left Column: Text Content ── */}
          <div className="w-full lg:w-1/2">
            {/* Section label */}
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-dark-400 mb-8">
              Our Mission
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-h1 font-extrabold font-primary text-brand-dark leading-tight mb-4">
                  {activeItem.title}
                </h2>

                {/* Subtitle */}
                <p className="text-lg font-secondary text-brand-dark-300 mb-6">
                  {activeItem.subtitle}
                </p>

                {/* Description */}
                <p className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed max-w-md">
                  {activeItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right Column: Cards + Vertical Nav ── */}
          <div className="w-full lg:w-1/2 flex items-center gap-6">
            {/* Cards Stack */}
            <div className="flex-1 flex flex-col gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cards-${activeItem.id}`}
                  className="flex flex-col gap-4"
                >
                  {/* Benefit Card */}
                  <motion.div
                    custom={0}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="rounded-lg p-6 md:p-8"
                    style={{ backgroundColor: "var(--lilac-200)" }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                      style={{ color: "var(--lilac-700)" }}
                    >
                      The Benefit to Partners
                    </p>
                    <p className="text-base font-secondary text-brand-dark leading-relaxed">
                      {activeItem.benefit}
                    </p>
                  </motion.div>

                  {/* Result Card */}
                  <motion.div
                    custom={1}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="rounded-lg p-6 md:p-8"
                    style={{ backgroundColor: "var(--teal-100)" }}
                  >
                    <p
                      className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                      style={{ color: "var(--teal-700)" }}
                    >
                      The Result
                    </p>
                    <p className="text-base font-secondary text-brand-dark leading-relaxed">
                      {activeItem.result}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Vertical Navigation Indicators ── */}
            <nav
              className="hidden md:flex flex-col items-center gap-3"
              aria-label="Mission section navigation"
            >
              {MISSION_DATA.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer transition-all duration-200 ease-out rounded-full"
                  style={{
                    width: "4px",
                    height: index === activeIndex ? "40px" : "20px",
                    backgroundColor:
                      index === activeIndex
                        ? "var(--lilac-600)"
                        : "var(--dark-200)",
                  }}
                  aria-label={`Go to mission ${index + 1}: ${item.title}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                />
              ))}
            </nav>
          </div>
        </div>

        {/* ── Mobile Navigation Dots ── */}
        <div className="flex md:hidden justify-center items-center gap-3 mt-10">
          {MISSION_DATA.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer transition-all duration-200 ease-out rounded-full"
              style={{
                width: index === activeIndex ? "32px" : "8px",
                height: "8px",
                backgroundColor:
                  index === activeIndex
                    ? "var(--lilac-600)"
                    : "var(--dark-200)",
              }}
              aria-label={`Go to mission ${index + 1}: ${item.title}`}
              aria-current={index === activeIndex ? "step" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOurMission;
