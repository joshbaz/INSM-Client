import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [showTransparency, setShowTransparency] = useState(false);

  return (
    <footer className="bg-brand-navy-900 w-full pt-20 pb-10 text-brand-white-100 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
          {/* Brand & Mandate */}
          <div className="md:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <div className="shrink-0 bg-brand-white rounded-full p-1 shadow-md border border-brand-gold/20">
                <img
                  src="/logo.png"
                  alt="INSM Uganda Logo"
                  className="w-14 h-14 object-contain rounded-full"
                />
              </div>
              <div>
                <h2 className="font-primary font-black text-brand-gold text-xs tracking-[0.2em] uppercase leading-tight">
                  INSM-UGANDA
                </h2>
                <p className="text-[10px] text-brand-white/40 uppercase font-primary font-bold tracking-widest">
                  Structural Mandate
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-primary font-bold text-2xl text-brand-white leading-tight">
                One Home. One Parish. <br /> One Unshakable Nation.
              </h3>
              <p className="font-secondary text-brand-white/60 text-sm leading-relaxed max-w-md">
                The International Network for Single Mothers-Uganda Chapter is a
                structural mandate. By securing the kitchen table, we stabilize
                the State. By optimizing the mother, we secure the future.
              </p>
              <p className="font-primary font-bold text-brand-gold italic text-xs tracking-wide">
                "A mother in power is a nation in motion."
              </p>
            </div>
          </div>

          {/* Quick Links: Terminal */}
          <div className="md:col-span-3 space-y-8">
            <h3 className="font-primary font-black text-brand-gold text-[10px] tracking-[0.3em] uppercase">
              THE TERMINAL
            </h3>
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
                    className="font-primary font-bold text-xs tracking-wider text-brand-white/60 hover:text-brand-gold transition-colors block uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links: Assignment */}
          <div className="md:col-span-4 space-y-8">
            <h3 className="font-primary font-black text-brand-gold text-[10px] tracking-[0.3em] uppercase">
              THE ASSIGNMENT
            </h3>
            <ul className="space-y-4">
              {[
                {
                  to: "/how-to-help/donate",
                  label: "Capitalize a Hub",
                },
                {
                  to: "/how-to-help/join-the-assignment",
                  label: "Equip a Master",
                },
                { to: "/how-to-help/contact-us", label: "Market Mentorship" },
                {
                  to: "/how-to-help/join-the-assignment#partners",
                  label: "Strategic Gatekeepers",
                },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="font-primary font-bold text-xs tracking-wider text-brand-white/60 hover:text-brand-gold transition-colors block uppercase"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM UTILITY BAR */}
        <div className="border-t border-brand-white/10 pt-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 font-primary text-[10px] font-bold tracking-widest uppercase text-brand-white/40">
            <span>© 2026 INSM-UGANDA</span>
            <div className="flex gap-6">
              <button
                onClick={() => setShowTransparency(true)}
                className="hover:text-brand-gold transition-colors cursor-pointer"
              >
                Radical Transparency
              </button>
              <Link
                to="/privacy-policy"
                className="hover:text-brand-gold transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-use"
                className="hover:text-brand-gold transition-colors"
              >
                Terms of Use
              </Link>
              <Link
                to="/ethical-conduct"
                className="hover:text-brand-gold transition-colors"
              >
                Ethical Conduct
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex gap-5">
              {["mdi:facebook", "mdi:twitter", "mdi:linkedin"].map(
                (icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-brand-white/20 hover:text-brand-gold transition-colors"
                  >
                    <Icon icon={icon} className="w-5 h-5" />
                  </a>
                ),
              )}
            </div>

            <a
              href="https://portal.insmuganda.org"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-white/5 hover:bg-brand-gold hover:text-brand-navy-900 border border-brand-white/10 px-6 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              Partner Portal
              <Icon icon="heroicons:lock-closed-20-solid" className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Radical Transparency Modal: Premium Liquid Glass Implementation */}
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
            {/* Morphing Background Element (Subtle) */}
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
