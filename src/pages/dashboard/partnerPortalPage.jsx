import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../utils/animations";
import useSEO from "../../hooks/useSEO";
import { useAuth } from "../../store/context/AuthContext";

const PartnerPortalPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useSEO({
    title: "Partner Portal | INSM Uganda",
    description: "Secure gateway for INSM Uganda strategic partners.",
  });

  return (
    <div className="min-h-screen bg-brand-navy-900 flex items-center justify-center relative overflow-hidden py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-lilac/5 rounded-full blur-[100px]"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-2xl w-full mx-4"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Entrance Case */}
        <motion.div
          variants={fadeUp}
          className="bg-brand-white/5 backdrop-blur-xl border border-brand-white/10 p-12 md:p-16 rounded-3xl shadow-[0_0_100px_-20px_rgba(212,175,55,0.1)] overflow-hidden relative group"
        >
          {/* Animated border pulse */}
          <div className="absolute inset-0 border-2 border-brand-gold/20 rounded-3xl group-hover:border-brand-gold/40 transition-colors duration-700 animate-pulse"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-brand-white rounded-full p-3 shadow-2xl border border-brand-gold/30 mb-8 transform group-hover:scale-110 transition-transform duration-500">
              <img
                src="/logo.png"
                alt="INSM Uganda Logo"
                className="w-20 h-20 object-contain rounded-full"
              />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <Icon
                icon="heroicons:shield-check-solid"
                className="w-5 h-5 text-brand-gold"
              />
              <span className="text-[10px] font-primary font-bold text-brand-gold uppercase tracking-[0.5em]">
                Secure Clearance Verified
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-primary font-black text-brand-white uppercase tracking-tighter text-center leading-none mb-4">
              Access the <br />{" "}
              <span className="text-brand-gold">Terminal</span>
            </h1>

            <p className="text-brand-white/60 font-secondary text-base text-center leading-relaxed mb-12 max-w-sm mx-auto">
              Welcome,{" "}
              <span className="text-brand-white font-bold">{user?.email}</span>.
              Your credentials grant high-level oversight of national deployment
              metrics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <button
                onClick={() => navigate("/dashboard")}
                className="bg-brand-gold text-brand-dark-900 font-primary font-bold text-[11px] uppercase tracking-[0.2em] py-5 px-8 rounded-full hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-3 shadow-lg group/btn"
              >
                Enter Dashboard
                <Icon
                  icon="heroicons:arrow-right"
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                />
              </button>

              <button
                onClick={logout}
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 font-primary font-bold text-[11px] uppercase tracking-[0.2em] py-5 px-8 rounded-full transition-all cursor-pointer flex items-center justify-center gap-3"
              >
                Terminate Session
                <Icon icon="heroicons:power" className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Security footer */}
        <motion.div variants={fadeUp} className="mt-12 text-center opacity-40">
          <p className="text-[9px] font-primary font-bold text-brand-white uppercase tracking-[0.4em]">
            Protocol 256-INSM • Global Institutional Standard
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PartnerPortalPage;
