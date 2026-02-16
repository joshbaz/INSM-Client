import React from "react";

const TIERS = [
  {
    title: "The First Thread",
    subtitle: "From Invisible to Official",
    amount: "$10",
    description:
      "Provides a mother with her official Cooperative Passbook and first financial literacy induction.",
    colorClass: "bg-brand-teal",
  },
  {
    title: "The Safety Rope",
    subtitle: "From Conflict to Stability",
    amount: "$100",
    description:
      "Funds a mental health and positive parenting seminar for 10 mothers, securing the future of their children.",
    colorClass: "bg-brand-pink",
  },
  {
    title: "The Parish Seed",
    subtitle: "From Isolation to Power",
    amount: "$500",
    description:
      "Seeds the registration and mobilization of a new 50-member Parish Cooperative.",
    colorClass: "bg-brand-brown",
  },
  {
    title: "The Masterclass",
    subtitle: "From Resilience to a Pro",
    amount: "$2,500",
    description:
      "Funds a 4-week certification in Commercial Agriculture or Tourism for 100 women.",
    colorClass: "bg-brand-brown",
  },
  {
    title: "The SACCO Engine",
    subtitle: "From Subsistence to Wealth",
    amount: "$10,000",
    description:
      "Provides the initial revolving credit fund to scale small businesses across an entire division.",
    colorClass: "bg-brand-teal",
  },
  {
    title: "The Legacy Fund",
    subtitle: "Building the Republic",
    amount: "$20,000+",
    description:
      "Seeds the registration and mobilization of a new 50-member Parish Cooperative.",
    colorClass: "bg-brand-pink",
  },
];

const InvestmentTiers = ({ onDonateClick }) => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-dark-400">
            Investment Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TIERS.map((tier, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow p-6 group"
            >
              {/* Header Section */}
              <div className="mb-6">
                <h3 className="text-xl font-bold font-primary text-black mb-1">
                  {tier.title}
                </h3>
                <p className="text-sm font-bold text-gray-400 font-secondary uppercase tracking-wide">
                  {tier.subtitle}
                </p>
              </div>

              {/* Color Block with Amount */}
              <div
                className={`w-full h-48 ${tier.colorClass} flex items-center justify-center text-white`}
              >
                <span className="text-5xl font-bold font-primary">
                  {tier.amount}
                </span>
              </div>

              {/* Description & Action */}
              <div className="flex flex-col grow mt-6">
                <p className="text-brand-dark font-secondary leading-relaxed mb-8 grow">
                  {tier.description}
                </p>
                <div className="flex justify-end mt-auto">
                  <button
                    onClick={() => onDonateClick && onDonateClick(tier)}
                    className="bg-brand-lilac-600 text-white font-bold text-xs py-3 px-6 rounded-full hover:bg-brand-lilac-600/90 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Give Seed
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestmentTiers;
