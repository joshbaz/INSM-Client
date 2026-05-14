import React from "react";
import { Icon } from "@iconify/react";
import MothersTable from "./sections/MothersTable";

const BeneficiariesPage = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-primary font-bold text-brand-dark">Beneficiary Management</h2>
          <p className="text-sm font-secondary text-brand-dark-400">Total of 1,284 single mothers registered across Uganda.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2 bg-brand-gold text-brand-navy-900 rounded-xl text-sm font-bold shadow-lg shadow-brand-gold/20 hover:scale-105 transition-all duration-300">
            <Icon icon="heroicons:plus" className="w-5 h-5" />
            Register New Mother
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-brand-dark-200/10 flex flex-wrap items-center gap-4">
        <div className="flex-1 relative min-w-[200px]">
          <Icon icon="heroicons:magnifying-glass" className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dark-400 w-5 h-5" />
          <input type="text" placeholder="Search by name, ID, or location..." className="w-full pl-10 pr-4 py-2 bg-brand-white rounded-xl border-none focus:ring-2 focus:ring-brand-gold transition-all outline-none text-sm font-secondary" />
        </div>
      </div>

      <section>
        <MothersTable />
      </section>
    </div>
  );
};

export default BeneficiariesPage;
