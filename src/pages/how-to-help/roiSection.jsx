import React from "react";

const STEPS = [
  {
    label: "Equipping",
    description: "Transferring high-level professional knowledge.",
    icon: <img src="/icons/Equipping.png" alt="Equipping" className="w-16 h-16 object-contain" />
  },
  {
    label: "Productivity",
    description: "Helping mothers launching standardized production units.",
    icon: <img src="/icons/productivity.png" alt="Productivity" className="w-16 h-16 object-contain" />
  },
  {
    label: "Stability",
    description: "Household economic resilience and healthcare.",
    icon: <img src="/icons/stability.png" alt="Stability" className="w-16 h-16 object-contain" />
  },
  {
    label: "National Impact",
    description: "She can contribute to the national economy",
    icon: <img src="/icons/nationalImpact.png" alt="National Impact" className="w-16 h-16 object-contain" />
  },
];

const ROISection = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-primary text-black mb-4">
          The ROI of Your Time
        </h2>
        <p className="font-secondary text-brand-dark-400 text-base md:text-lg mb-16">
          Your expertise is the catalyst. See how it ripples through the nation.
        </p>

        <div className="relative">
          {/* Horizontal Line separating Icons and Text */}
          <div className="hidden md:block absolute top-34 left-0 right-0 h-1 bg-brand-lilac z-0"></div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4 relative z-10">
            {STEPS.map((step, index) => (
              <div key={index} className="flex flex-col items-center w-full md:w-1/4">
                {/* Icon Circle */}
                <div className="w-32 h-32 rounded-full bg-brand-white-400 flex items-center justify-center mb-6 relative z-10 shadow-sm cursor-pointer">
                  {step.icon}
                </div>

                {/* Label */}
                <h3 className="text-lg md:text-xl font-bold font-primary text-brand-dark mb-2">
                  {step.label}
                </h3>

                {/* Description */}
                <p className="text-[17px] font-secondary text-brand-dark-400 leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
