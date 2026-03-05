import React from "react";

const JoinAssignmentHero = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
      style={{
        backgroundImage: `url("https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/join.png")`,
      }}
    >
      {/* White transparent overlay on the image */}
      <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700"></div>

      {/* Content with glass background */}
      <div className="relative z-10 w-full">
        <div className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] xl:h-[380px] flex flex-col justify-center items-center p-6 md:p-12 xl:p-16 text-center w-full shadow-sm border-t border-brand-white/50">
          <h1 className="text-3xl md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold font-primary text-brand-teal-900 mb-4 md:mb-6 uppercase tracking-tight">
            Join The <br className="hidden md:block" /> Assignment
          </h1>
          <p className="text-base md:text-xl font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed">
            We have the tools; now, we need your hands. We are seeking the
            "Equippers" and "Mentors" ready to weave individual resilience into
            a collective force strong enough to pull communities out of poverty
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinAssignmentHero;
