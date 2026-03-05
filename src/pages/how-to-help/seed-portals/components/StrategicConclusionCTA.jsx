import React from "react";
import { Link } from "react-router-dom";

const StrategicConclusionCTA = () => {
  return (
    <section className="relative w-full h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/24d67f7bedf75fdebe204784ab41ceb9f7e96699.png")`, // Re-using image for consistency, adjust if needed
        }}
      ></div>

      {/* Deep Navy/Lilac Overlay for contrast */}
      <div
        className="absolute inset-0 mix-blend-multiply bg-brand-navy-900"
        style={{ opacity: 0.95 }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-brand-white flex flex-col items-center">
        <div className="inline-flex items-center gap-2 mb-8 opacity-70">
          <span className="w-10 h-px bg-brand-white"></span>
          <span className="text-[10px] font-primary font-bold text-brand-white uppercase tracking-[0.4em]">
            Strategic Conclusion
          </span>
          <span className="w-10 h-px bg-brand-white"></span>
        </div>

        <h2 className="text-xl md:text-2xl font-black font-primary mb-6 drop-shadow-sm leading-tight uppercase tracking-tight">
          When you optimize a single mother, <br className="hidden md:block" />{" "}
          you secure the nation's{" "}
          <span className="text-brand-lilac-300">human capital.</span>
        </h2>

        <p className="text-sm md:text-lg font-secondary leading-relaxed mb-10 opacity-90 max-w-2xl mx-auto font-light">
          When you secure that capital, you stabilize the domestic unit. When
          the domestic unit is fiscally sovereign, the Nation becomes an
          unshakable industrial powerhouse.
        </p>

        <Link
          to="/how-to-help/partner-with-us"
          className="bg-[#E5DAD4] text-[#7F4829] font-bold text-xs md:text-sm py-4 px-10 rounded-full cursor-pointer hover:bg-white transition-all transform hover:scale-105 uppercase tracking-widest shadow-xl flex items-center justify-center gap-3"
        >
          Build the Legacy
        </Link>
      </div>
    </section>
  );
};

export default StrategicConclusionCTA;
