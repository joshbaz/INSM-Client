import React from "react";
import { Icon } from "@iconify/react";

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Total Capital */}
      <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center text-brand-lilac shrink-0">
            <Icon icon="ph:wallet-bold" className="w-5 h-5" />
          </div>
          <span className="inline-flex items-center gap-1 bg-[#eaf7ec] text-[#1fb039] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
            <Icon icon="ph:check-circle-fill" className="w-3.5 h-3.5 shrink-0" />
            PesaPal Verified
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-dark-400 uppercase tracking-wider mb-1 font-secondary">
            Total Capital Deployed
          </p>
          <h3 className="text-3xl font-black text-brand-dark font-albert tracking-tight">
            UGX 2.45B
          </h3>
          <p className="text-sm font-bold text-[#1fb039] mt-2 flex items-center gap-0.5">
            +12.4% <span className="font-medium text-brand-dark-400">from last month</span>
          </p>
        </div>
      </div>

      {/* Card 2: Passbooks */}
      <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center text-brand-lilac shrink-0">
            <Icon icon="ph:book-open-bold" className="w-5 h-5" />
          </div>
          <Icon icon="ph:users-bold" className="w-5 h-5 text-brand-dark-300" />
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-dark-400 uppercase tracking-wider mb-1 font-secondary">
            Cooperative Passbooks
          </p>
          <h3 className="text-3xl font-black text-brand-dark font-albert tracking-tight">
            14,802
          </h3>
          <p className="text-sm font-semibold text-brand-lilac mt-2">
            Women registered across regions
          </p>
        </div>
      </div>

      {/* Card 3: Active Parishes */}
      <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center text-brand-lilac shrink-0">
            <Icon icon="ph:map-trifold-bold" className="w-5 h-5" />
          </div>
          <Icon icon="ph:map-pin-bold" className="w-5 h-5 text-brand-dark-300" />
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-dark-400 uppercase tracking-wider mb-1 font-secondary">
            Active Parishes
          </p>
          <h3 className="text-3xl font-black text-brand-dark font-albert tracking-tight">
            84
          </h3>
          <p className="text-sm font-semibold text-brand-brown mt-2">
            Geographic coverage (Uganda)
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatCards;
