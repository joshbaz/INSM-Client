import React from "react";

/**
 * Left card of the Donation Modal.
 * Displays the campaign image, tier title, subtitle, and description.
 *
 * @param {{ tier: { title: string, subtitle: string, description: string } | null }} props
 */
const CampaignCard = ({ tier }) => {
  return (
    <div className="w-full md:max-w-[380px] bg-brand-white-100 rounded-xl shadow-lg overflow-hidden flex flex-col">
      {/* Campaign Image */}
      <div className="relative h-40 md:h-64 w-full shrink-0">
        <img
          src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/_image.png"
          alt="Campaign"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Campaign Details */}
      <div className="p-5 md:p-8 flex flex-col gap-3 md:gap-4 grow">
        {tier ? (
          <>
            <h3 className="text-2xl font-bold font-primary text-brand-dark">
              {tier.title}
            </h3>
            <p className="text-sm font-semibold text-brand-dark-400 font-secondary uppercase tracking-wide">
              {tier.subtitle}
            </p>
            <p className="text-sm italic text-brand-dark-300 mt-2">
              {tier.subtitle}
            </p>
            <p className="text-sm text-brand-dark-400 font-secondary leading-relaxed">
              {tier.description}
            </p>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold font-primary text-brand-dark">
              Empower A Mother
            </h3>
            <p className="text-sm font-semibold text-brand-dark-400 font-secondary uppercase tracking-wide">
              Identity & Orientation
            </p>
            <p className="text-sm italic text-brand-dark-300 mt-2">
              From Invisible to Official
            </p>
            <p className="text-sm text-brand-dark-400 font-secondary leading-relaxed">
              Your contribution directly impacts the lives of single mothers in
              Uganda.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
