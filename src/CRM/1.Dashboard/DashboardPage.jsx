import React from "react";
import StatCards from "./sections/StatCards";
import ImpactChart from "./sections/ImpactChart";
import RecentActivity from "./sections/RecentActivity";

const DashboardPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-primary font-bold text-brand-dark">Jambo, Admin!</h2>
        <p className="text-sm font-secondary text-brand-dark-400 font-medium">Here's what's happening with the INSM network today.</p>
      </div>

      {/* Statistics Section */}
      <section>
        <StatCards />
      </section>

      {/* Analytics & Activity Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <ImpactChart />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
