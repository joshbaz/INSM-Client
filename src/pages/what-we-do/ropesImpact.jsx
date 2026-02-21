import React, { useEffect, useRef, useState } from "react";

const STATS = [
  {
    id: 1,
    value: 57,
    label: "Investments to Date",
    description:
      "Total verified financial instruments that have generated measurable returns for the community.",
  },
  {
    id: 2,
    value: 17000,
    suffix: "",
    label: "Mothers Supported",
    description:
      "Mothers and families that have been part of the network across Uganda.",
  },
  {
    id: 3,
    value: 203,
    label: "Ventures Launched",
    description:
      "Micro-enterprises launched in the community as a direct result of our programmes.",
  },
];

const SECTION_IMAGE =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/566072bc0c5d53da65e9b10a82415c4e1dad98f8.png";

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

/* ── Stat card ── */
const StatCard = ({ stat, shouldAnimate }) => {
  const count = useCounter(stat.value, 2000, shouldAnimate);

  const formatted = count.toLocaleString();

  return (
    <div className="flex flex-col items-center text-center gap-2 px-4 py-6 md:px-6">
      <span className="text-sm font-semibold font-primary text-brand-brown uppercase tracking-wider">
        {stat.label}
      </span>
      <span className="text-5xl md:text-6xl font-bold font-primary text-brand-dark leading-none">
        {formatted}
      </span>
      <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed max-w-xs">
        {stat.description}
      </p>
    </div>
  );
};

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
    <section className="w-full bg-brand-cream py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto px-2 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-dark mb-3">
            Impact of the Ropes
          </h2>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="h-0.5 w-12 bg-brand-lilac rounded-full" />
            <p className="text-sm font-secondary text-brand-dark-300 italic">
              Results that speak louder than figures
            </p>
            <span className="h-0.5 w-12 bg-brand-lilac rounded-full" />
          </div>
        </div>

        {/* Stats grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-14 md:mb-20"
        >
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} shouldAnimate={isVisible} />
          ))}
        </div>

        {/* Full-width image */}
        <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={SECTION_IMAGE}
            alt="Mothers in the INSM community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80 font-secondary italic">
            Mothers from across the network at a community gathering
          </p>
        </div>
      </div>
    </section>
  );
};

export default RopesImpact;
