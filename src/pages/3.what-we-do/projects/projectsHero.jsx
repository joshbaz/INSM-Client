import React from "react";

const projects = () => {
  return (
    <section
      className="relative w-full h-[500px] md:h-[600px] xl:h-[700px] 2xl:h-[800px] bg-cover bg-center flex items-end justify-center overflow-hidden group"
      style={{
        backgroundImage: `url(https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/IMAAGE.png)`,
      }}
    >
      {/* White transparent overlay on the image */}
      <div className="absolute inset-0 bg-brand-white/50 transition-opacity duration-700"></div>

      {/* Content with glass background */}
      <div className="relative z-10 w-full">
        <div className="bg-brand-white/60 backdrop-blur-md h-auto md:h-[340px] xl:h-[380px] flex flex-col justify-center items-center p-6 md:p-12 xl:p-16 text-center w-full shadow-sm border-t border-brand-white/50">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-primary text-brand-teal-900 mb-4 md:mb-6 uppercase tracking-tight">
            Scaling the <br className="hidden md:block" /> Wealth Model
          </h1>
          <p className="text-base md:text-lg font-secondary text-brand-dark-400 max-w-3xl mx-auto leading-relaxed">
            When we empower the mother, we save the child. Duplicating the
            Makindye Model is not just a theory; it is a viable strategy to
            transform Uganda. All of our programs are designed for scale and
            transparency.
          </p>
        </div>
      </div>
    </section>
  );
};

export default projects;
