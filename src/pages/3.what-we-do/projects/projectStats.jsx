import React from "react";

const projectStats = () => {
  const stats = [
    { value: "56", label: "Investments To Date" },
    { value: "760", label: "Mothers Supported" },
    { value: "32", label: "Ventures Launched" },
    { value: "$2.4M", label: "Capital Deployed" },
  ];

  return (
    <section className="bg-brand-white-100 py-20 overflow-x-hidden">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-[146px]">
        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-dark mb-4">
            Duplicating the Prototype of Prosperity
          </h2>
          <p className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed">
            The International Network for Single Mothers Uganda Chapter operates
            through the Makindye Model, a tested prototype for national wealth
            building. Our programs are not "charity projects"; they are the
            foundational building blocks of a new economy for the Republic of
            Uganda.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0 text-center md:text-left">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col w-full md:w-auto ${index !== stats.length - 1 ? "md:border-r md:border-brand-dark-200 md:pr-16 lg:pr-24" : ""} ${index !== 0 ? "md:pl-16 lg:pl-2" : ""}`}
            >
              <span className="text-4xl md:text-5xl font-bold font-primary text-brand-brown mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-semibold text-brand-dark-300 uppercase tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Project Image & Text Section */}
        <div className="relative mt-20 flex justify-end">
          {/* Image Container */}
          <div className="w-full md:w-[500px] h-[300px] md:h-[350px] lg:h-[400px] shrink-0">
            <img
              src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/projectImage.png"
              alt="Ugandan mother holding her baby"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Overlay */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-[90%] md:w-[85%] bg-brand-brown/60 px-8 md:px-12 py-10 md:py-14">
            <p className="text-xl md:text-3xl font-primary font-semibold text-brand-white leading-snug">
              We identify, invest in, and accelerate the growth of innovative
              solutions across the agriculture and tourism sectors to transform
              30% of Ugandan households into a unified economic power.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default projectStats;
