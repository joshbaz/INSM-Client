import React from "react";
import { Icon } from "@iconify/react";

const stats = [
  { label: "Total Mothers", value: "1,284", icon: "heroicons:users", color: "text-brand-lilac", bg: "bg-brand-lilac/10" },
  { label: "Impact Score", value: "84%", icon: "heroicons:chart-bar", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { label: "Funds Raised", value: "$42.5k", icon: "heroicons:banknotes", color: "text-brand-gold", bg: "bg-brand-gold/10" },
  { label: "Active Programs", value: "12", icon: "heroicons:academic-cap", color: "text-brand-navy", bg: "bg-brand-navy/10" },
];

const StatCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div 
          key={stat.label} 
          className="bg-white p-6 rounded-2xl border border-brand-dark-200/10 shadow-sm hover:shadow-xl transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <Icon icon={stat.icon} className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">+12%</span>
          </div>
          <h3 className="text-sm font-secondary font-bold text-brand-dark-400 uppercase tracking-wider">{stat.label}</h3>
          <p className="text-3xl font-primary font-bold text-brand-dark mt-1 tracking-tight">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
