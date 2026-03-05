import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const Footer = () => {
  const [showTransparency, setShowTransparency] = useState(false);

  return (
    <footer className="bg-[#111] w-full text-white">
      {/* ─── MAIN CONTENT ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-14">
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-8">
          {/* LEFT: Logo + Brand Statement */}
          <div className="flex gap-6 lg:max-w-[520px]">
            {/* Logo */}
            <div className="shrink-0">
              <div className="w-[100px] h-[100px] rounded-full bg-brand-lilac-200/20 border border-brand-lilac-300/30 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="INSM Uganda Logo"
                  className="w-[88px] h-[88px] object-contain rounded-full"
                />
              </div>
            </div>

            {/* Text Block */}
            <div className="space-y-4 pt-1">
              <h3 className="font-primary font-bold italic text-brand-gold text-lg leading-snug">
                One Home. One Parish.
                <br />
                One Unshakable Nation.
              </h3>
              <p className="font-secondary text-white/50 text-[13px] leading-relaxed max-w-sm">
                The International Network for Single Mothers-Uganda Chapter is
                more than a movement; it is a structural mandate. By securing
                the kitchen table, we stabilize the State. By optimizing the
                mother, we secure the future workforce.
              </p>
              <p className="font-primary font-semibold italic text-brand-gold text-[13px] tracking-wide">
                "A mother in power is a nation in motion."
              </p>
            </div>
          </div>

          {/* RIGHT: Navigation Columns */}
          <div className="flex gap-16 lg:gap-24 lg:ml-auto lg:pt-1">
            {/* THE TERMINAL */}
            <div className="space-y-6">
              <h4 className="font-primary font-bold text-brand-dark-400 text-[11px] tracking-[0.25em] uppercase">
                The Terminal
              </h4>
              <ul className="space-y-4">
                {[
                  { to: "/who-we-are/the-roadmap", label: "The Blueprint" },
                  { to: "/how-to-help/seed-portals", label: "The Funds" },
                  { to: "/what-we-do/projects", label: "Impact Data" },
                  { to: "/ethical-conduct", label: "Governance" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="font-primary font-bold text-sm text-white/80 hover:text-brand-gold transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* THE ASSIGNMENT */}
            <div className="space-y-6">
              <h4 className="font-primary font-bold text-brand-dark-400 text-[11px] tracking-[0.25em] uppercase">
                The Assignment
              </h4>
              <ul className="space-y-4">
                {[
                  {
                    to: "/how-to-help/partner-with-us",
                    label: "Capitalize a Hub",
                  },
                  {
                    to: "/how-to-help/join-the-assignment",
                    label: "Equip a Master",
                  },
                  {
                    to: "/how-to-help/contact-us",
                    label: "Market Mentorship",
                  },
                  {
                    to: "/how-to-help/join-the-assignment#partners",
                    label: "Strategic Gatekeepers",
                  },
                ].map((link, i) => (
                  <li key={i}>
                    <Link
                      to={link.to}
                      className="font-primary font-bold text-sm text-white/80 hover:text-brand-gold transition-colors block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Copyright + Links */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-secondary text-[12px] text-white/40">
            <span>
              © 2026 International Network for Single Mothers-Uganda Chapter
            </span>
            <span className="text-white/20">•</span>
            <button
              onClick={() => setShowTransparency(true)}
              className="hover:text-brand-gold transition-colors cursor-pointer"
            >
              Radical Transparency
            </button>
            <span className="text-white/20">•</span>
            <Link
              to="/privacy-policy"
              className="hover:text-brand-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/terms-of-use"
              className="hover:text-brand-gold transition-colors"
            >
              Terms of Use
            </Link>
          </div>

          {/* Right: Socials + Partner Portal */}
          <div className="flex flex-col md:flex-row items-center gap-6 ">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/winifred-nassanga-5459063a8/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-brand-gold transition-colors"
              >
                <Icon icon="mdi:linkedin" className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white/40 hover:text-brand-gold transition-colors"
              >
                <Icon icon="ri:twitter-x-fill" className="w-[18px] h-[18px]" />
              </a>
            </div>

            <Link
              to="/partner-portal"
              className="border border-brand-gold text-brand-gold rounded-full px-5 py-1.5 text-[10px] font-primary font-bold uppercase tracking-[0.15em] hover:bg-brand-gold hover:text-[#111] transition-all"
            >
              Partner Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* ─── RADICAL TRANSPARENCY MODAL ─── */}
      {showTransparency && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-navy-900/60 backdrop-blur-xl"
            onClick={() => setShowTransparency(false)}
          ></motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-brand-navy-900/40 backdrop-blur-2xl border border-brand-gold/30 p-8 md:p-16 max-w-3xl w-full shadow-[0_0_80px_-20px_rgba(212,175,55,0.15)] overflow-hidden group"
          >
            {/* Morphing Background Element */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/5 rounded-full blur-[100px] group-hover:bg-brand-gold/10 transition-colors duration-1000"></div>

            <button
              onClick={() => setShowTransparency(false)}
              className="absolute top-6 right-6 text-brand-white/40 hover:text-brand-gold transition-colors p-2 cursor-pointer z-10"
            >
              <Icon icon="heroicons:x-mark" className="w-6 h-6" />
            </button>

            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-gold">
                  <Icon icon="heroicons:shield-check" className="w-5 h-5" />
                  <span className="text-[10px] font-primary font-bold uppercase tracking-[0.4em]">
                    Institutional Protocol
                  </span>
                </div>
                <h2 className="font-primary font-black text-brand-white text-3xl md:text-4xl uppercase tracking-tighter leading-none">
                  Radical <br /> Transparency <br />{" "}
                  <span className="text-brand-gold">Metrics</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-brand-white/5 border-l-2 border-brand-gold p-6 space-y-2">
                  <span className="block text-brand-gold font-primary font-black text-4xl tracking-tighter">
                    98.4%
                  </span>
                  <div>
                    <span className="block text-[10px] text-brand-white font-bold uppercase tracking-[0.2em] mb-1">
                      Efficiency Rating
                    </span>
                    <p className="text-[10px] text-brand-white/40 font-secondary leading-relaxed uppercase">
                      Operational output vs resource allocation. Optimized for
                      national scaling.
                    </p>
                  </div>
                </div>

                <div className="bg-brand-white/5 border-l-2 border-brand-gold p-6 space-y-2">
                  <span className="block text-brand-gold font-primary font-black text-4xl tracking-tighter">
                    100%
                  </span>
                  <div>
                    <span className="block text-[10px] text-brand-white font-bold uppercase tracking-[0.2em] mb-1">
                      Audit Compliance
                    </span>
                    <p className="text-[10px] text-brand-white/40 font-secondary leading-relaxed uppercase">
                      Zero-friction fiscal transparency. Verified by strategic
                      gatekeepers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-brand-white/10">
                <p className="text-sm font-secondary text-brand-white/60 leading-relaxed italic">
                  "By securing the state through the mother, we maintain zero
                  operational friction in our capital deployments. Our 'Gold
                  Standard' ensures every unit of capital is a building block
                  for National Stability."
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowTransparency(false)}
                  className="text-[10px] font-primary font-bold uppercase tracking-[0.3em] text-brand-gold hover:text-brand-white transition-colors cursor-pointer"
                >
                  Terminate Briefing
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
