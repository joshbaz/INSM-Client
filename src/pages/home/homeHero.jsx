import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../../utils/animations";

const BG_IMAGE =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/image%201.png";
const EXTRACTED_IMAGE =
  "https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/photo-clip.png?updatedAt=1770380897324";

const HomeHero = () => {
  // Shared styles for the panel positioning
  const panelPositionClasses =
    "absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md md:left-auto md:translate-x-0 md:max-w-none h-auto md:h-full md:bottom-0 right-auto md:right-0 lg:right-[10%] md:w-[40%] lg:w-[28%] flex flex-col justify-center p-8 md:p-0 md:px-12 lg:px-12 rounded-3xl md:rounded-none";

  // Content component to ensure identical layout in both layers
  const PanelContent = ({ visibleContent }) => (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="max-w-xl flex flex-col items-start gap-2"
    >
      <motion.h1
        variants={fadeUp}
        className={`text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-[#F5F5DD] leading-tight font-primary tracking-wide ${visibleContent === "button" ? "invisible" : ""}`}
      >
        WE DIDN'T
        <br />
        START WITH
        <br />A <span className="italic">THEORY</span>;<br />
        WE STARTED
        <br />
        WITH
      </motion.h1>

      <motion.div
        variants={fadeUp}
        className={`text-white leading-none mt-2 ${visibleContent === "button" ? "invisible" : ""}`}
      >
        <span className="block text-4xl md:text-5xl lg:text-6xl font-bold">
          17,000
        </span>
        <span className="block text-2xl md:text-3xl lg:text-4xl font-bold mt-1">
          LIVES
        </span>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Link
          to="/how-to-help/join-the-assignment"
          className={`inline-flex items-center justify-center text-lg md:text-base font-bold text-white transition-all duration-300 transform hover:scale-105 hover:bg-brand-teal/90 bg-brand-teal mt-4 md:mt-8 lg:mt-14 ${visibleContent === "text" ? "invisible" : "pointer-events-auto"}`}
          style={{
            borderRadius: "99px",
            padding: "14px 48px",
            whiteSpace: "nowrap",
          }}
        >
          JOIN THE ASSIGNMENT
        </Link>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] lg:h-[calc(110vh-6rem)] overflow-hidden">
      {/* Layer 0: Background Gradient (Behind everything) */}
      <div className="absolute inset-0 z-0 bg-linear-to-br from-brand-lilac-600 to-brand-pink-300"></div>

      {/* Layer 1: Main Background (All the way behind) */}
      <div className="absolute inset-0 z-10">
        <img
          src={BG_IMAGE}
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layer 2: Glass Panel (Background + Text) */}
      {/* On mobile: z-40 (In front of image). On desktop: z-20 (Behind image). */}
      <div
        className={`z-40 md:z-20 ${panelPositionClasses}`}
        style={{
          background: "rgba(245, 245, 221, 0.12)", // #F5F5DD1F
          backdropFilter: "blur(8px)",
        }}
      >
        <PanelContent visibleContent="text" />
      </div>

      {/* Layer 3: Extracted Foreground Image (Photo Clip) */}
      {/* This sits on top of the Glass Panel Background and Text */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        <img
          src={EXTRACTED_IMAGE}
          alt="Hero Foreground"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layer 4: CTA Button */}
      {/* This sits on top of everything. */}
      <div
        className={`z-50 md:z-40 pointer-events-none ${panelPositionClasses}`}
      >
        <PanelContent visibleContent="button" />
      </div>
    </div>
  );
};

export default HomeHero;
