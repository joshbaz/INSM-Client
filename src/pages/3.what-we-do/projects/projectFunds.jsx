import React from "react";

const projectFunds = () => {
  const funds = [
    {
      title: "Fund I: Seed Fund",
      description:
        "We fund pre-seed and seed-stage projects building scalable businesses that integrate single mothers into the value chain.",
    },
    {
      title: "Fund II: Green Harvest Fund",
      description:
        "We invest in early-stage startups developing commercial agriculture solutions that drive food security and rural wealth.",
    },
    {
      title: "Fund III: SACCO Venture Labs",
      description:
        "With the help of Community Equippers, we launch, and fund grassroots ventures in the agriculture and tourism sectors.",
    },
  ];

  return (
    <section className="bg-brand-white-100 py-20">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-[146px]">
        {/* Heading */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-white-900 mb-3">
            Our Network funds
          </h2>
          <p className="text-base md:text-lg font-secondary text-brand-dark-400">
            Solving challenges that demand diverse, coordinated capital
            strategies.
          </p>
        </div>

        {/* Fund Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {funds.map((fund, index) => (
            <div
              key={index}
              className="bg-brand-teal-400 rounded-sm p-8 md:p-10 flex flex-col justify-end min-h-[320px] md:min-h-[380px]"
            >
              <h3 className="text-2xl md:text-3xl font-bold font-primary text-brand-teal-900 mb-4">
                {fund.title}
              </h3>
              <p className="text-sm md:text-base font-secondary text-brand-teal-800 leading-relaxed">
                {fund.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default projectFunds;
