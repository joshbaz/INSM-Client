import React from "react";
import StatCards from "./sections/StatCards";
import MiddleSection from "./sections/MiddleSection";
import BottomSection from "./sections/BottomSection";

const DashboardPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      {/* 1. Core Analytics Statistics Cards */}
      <StatCards />

      {/* 2. Middle Grid Panel (Leads Table + Shortcuts + Transparency Log) */}
      <MiddleSection />

      {/* 3. Bottom Grid Panel (Regional Map SVG + Event Planner) */}
      <BottomSection />
    </div>
  );
};

export default DashboardPage;
