import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer } from "../../utils/animations";

const ASSIGNMENT_POINTS = [
  {
    id: 1,
    title: "1. Join the 1k Club: The Liquidity Engine",
    description:
      "Authorize a recurring weekly subscription of 1,000/- via Mobile Money. This creates a National Sovereign Fund that provides the continuous liquidity required to maintain the industrial output of our production units.",
    roi: "Continuous, mass-scale capitalization of the national supply chain.",
    icon: "heroicons:banknotes-20-solid",
    technical: "SYSTEM: MM-LIQUIDITY-TX",
  },
  {
    id: 2,
    title: "2. Capitalize a Cooperative: The Parish Anchor",
    description:
      'Provide the "Parish Seed" ($500) to launch a new 50-member production unit. This transitions 50 households from subsistence to Permanent Industrial Surplus.',
    roi: "Governance-integrated economic units.",
    icon: "heroicons:map-pin-20-solid",
    technical: "UNIT: PARISH-SEED-50",
  },
  {
    id: 3,
    title: "3. Activate a Production Unit: The Primary Link",
    description:
      "A $10 investment secures a member’s Cooperative Passbook—the essential terminal for financial literacy and Tier-1 credit access.",
    roi: "Official Economic Asset Transition.",
    icon: "heroicons:identification-20-solid",
    technical: "NODE: PASSBOOK-T1",
  },
  {
    id: 4,
    title: '4. Deploy Technical Mastery: The "Equipper"',
    description:
      'We require elite professionals in Law, Finance, and Agribusiness. Your specialized IP forms the "Strategic Anchors" required to command markets.',
    roi: "Human Capital Optimization.",
    icon: "heroicons:academic-cap-20-solid",
    technical: "MASTER: IP-STRAT-ANCHOR",
  },
  {
    id: 5,
    title: '5. Join the "Gatekeepers": District Integration',
    description:
      "Strategic partnerships with regional leaders to deploy the Makindye Blueprint. Ensure no production unit is left unoptimized.",
    roi: "Regional Economic Sovereignty.",
    icon: "heroicons:shield-check-20-solid",
    technical: "COMMAND: JURISDICTIONAL-OPT",
  },
];

const WhoWeAreAssignment = () => {
  return (
    <section className="w-full bg-brand-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* ── Header: Matching Strategic Blueprint Style ── */}
        <motion.div
          className="mb-14 md:mb-20 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            variants={fadeUp}
            className="text-lg md:text-xl lg:text-2xl font-black font-primary text-brand-white-900 uppercase mb-4"
          >
            The <span className="text-brand-lilac-700">Assignment</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-sm md:text-base font-secondary text-brand-dark-400 mb-6 italic border-l-2 border-brand-lilac-200 pl-6"
          >
            "This is no longer an appeal for charity. This is an invitation to{" "}
            <span className="text-brand-lilac-800 font-bold not-italic">
              Capitalize strategically
            </span>{" "}
            in a movement that will redefine the national economic landscape."
          </motion.p>

          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <span className="text-[10px] font-primary font-bold text-brand-lilac-600 uppercase tracking-widest">
              Objective:
            </span>
            <span className="text-[11px] font-secondary text-brand-dark-300 uppercase tracking-wider">
              Transition to Permanent Industrial Surplus.
            </span>
          </motion.div>
        </motion.div>

        {/* ── Phase Cards: Blueprint Grid Layout ── */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          {ASSIGNMENT_POINTS.map((point) => (
            <motion.div
              key={point.id}
              variants={fadeUp}
              className="bg-brand-lilac-100 p-8 md:p-10 flex flex-col items-start overflow-hidden relative group"
            >
              {/* Technical Marker Label (Matches Phase labels) */}
              <span className="text-brand-lilac-700 font-primary font-bold text-[10px] tracking-[0.15em] uppercase mb-10">
                {point.technical}
              </span>

              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center bg-brand-white/50 text-brand-lilac-700 rounded-full">
                  <Icon icon={point.icon} width="20" />
                </div>
                <h3 className="text-sm md:text-base font-primary font-bold text-brand-lilac-900 uppercase tracking-tight leading-tight">
                  {point.title}
                </h3>
              </div>

              {/* Description */}
              <p className="font-secondary text-xs md:text-sm text-brand-lilac-800 leading-relaxed mb-8">
                {point.description}
              </p>

              {/* ROI (Matches Roadmap Footer) */}
              <div className="mt-auto pt-6 border-t border-brand-lilac-200 w-full flex justify-between items-center">
                <div>
                  <span className="block text-[9px] font-primary font-black text-brand-lilac-600 uppercase tracking-widest mb-1">
                    Expected ROI
                  </span>
                  <span className="text-[10px] font-secondary font-bold text-brand-lilac-900 uppercase italic">
                    {point.roi}
                  </span>
                </div>
                <Icon
                  icon="heroicons:arrow-up-right-20-solid"
                  className="w-4 h-4 text-brand-lilac-400 group-hover:text-brand-lilac-700 transition-colors"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── The Bottom Line Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 bg-brand-lilac-800 p-8 md:p-12 lg:p-16 relative overflow-hidden group shadow-xl flex flex-col lg:flex-row justify-between items-center gap-10"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(var(--white)_1px,transparent_1px)] bg-size-[24px_24px]"></div>

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 mb-4 opacity-70"
            >
              <span className="w-6 h-px bg-brand-white"></span>
              <span className="text-[9px] font-primary font-bold text-brand-white uppercase tracking-[0.4em]">
                Strategic Conclusion
              </span>
            </motion.div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-primary font-black text-brand-white mb-4 leading-tight uppercase tracking-wide">
              When you optimize a single mother,{" "}
              <br className="hidden md:block" />
              <span className="text-brand-lilac-200">
                you secure the nation’s human capital.
              </span>
            </h3>

            <p className="text-brand-white/80 font-secondary text-sm md:text-base leading-relaxed">
              When you secure that capital, you stabilize the domestic unit.
              When the domestic unit is fiscally sovereign, the Nation becomes
              an unshakable industrial powerhouse.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              to="/how-to-help/partner-with-us"
              className="
                 inline-flex items-center justify-center
                 border border-brand-white/40 hover:border-brand-white
                 text-brand-white text-[11px] font-primary font-bold
                 px-8 py-4
                 rounded-full
                 transition-all duration-300
                 uppercase tracking-[0.2em]
                 hover:bg-brand-white/10
                 cursor-pointer
               "
            >
              Capitalize the Bloc. Build the Legacy.
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreAssignment;
