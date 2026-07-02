import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const CapitalInvestments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL, default to seed-a-cooperative
  const currentPath = location.pathname;
  let initialTab = "SEED-A-COOPERATIVE";
  if (currentPath.includes("programs")) initialTab = "PROGRAMS";
  if (currentPath.includes("1k-club")) initialTab = "1K-CLUB SUBSCRIBERS";
  
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    let tab = "SEED-A-COOPERATIVE";
    if (location.pathname.includes("programs")) tab = "PROGRAMS";
    if (location.pathname.includes("1k-club")) tab = "1K-CLUB SUBSCRIBERS";
    setActiveTab(tab);
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "SEED-A-COOPERATIVE") navigate("/executive/capital/seed-a-cooperative");
    if (tab === "PROGRAMS") navigate("/executive/capital/programs");
    if (tab === "1K-CLUB SUBSCRIBERS") navigate("/executive/capital/1k-club");
  };

  const statCards = [
    {
      title: "Total Capital Received",
      value: "10.3M",
      subtitle: "+12.4% from last month",
      subtitleColor: "text-green-500",
    },
    {
      title: "Total Seed-a-Coop",
      value: "734M",
      subtitle: "Total funds received in UGX",
      subtitleColor: "text-brand-dark-400",
    },
    {
      title: "Total Programs",
      value: "147M",
      subtitle: "Total funds received in UGX",
      subtitleColor: "text-brand-dark-400",
    },
    {
      title: "1K-Club Subscribers",
      value: "103",
      subtitle: "Number of subscribers depositing 1000UGX weekly",
      subtitleColor: "text-brand-dark-400",
    }
  ];

  const dummyData = [
    { date: "Oct 24, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "PROCESSING" },
    { date: "Oct 22, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "PROCESSING" },
    { date: "Oct 21, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "PROCESSING" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "SETTLED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "SETTLED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "FAILED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "SETTLED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "15,000,000", status: "SETTLED" },
  ];

  const renderStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return (
          <span className="flex items-center gap-1.5 text-[#A0AAB4] font-bold text-[11px] tracking-widest">
            PROCESSING <Icon icon="ph:arrows-clockwise-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case "SETTLED":
        return (
          <span className="flex items-center gap-1.5 text-[#22C55E] font-bold text-[11px] tracking-widest">
            SETTLED <Icon icon="ph:check-circle-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case "FAILED":
        return (
          <span className="flex items-center gap-1.5 text-[#EF4444] font-bold text-[11px] tracking-widest">
            FAILED <Icon icon="ph:x-circle-bold" className="w-3.5 h-3.5" />
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between min-h-[140px]">
            <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary">{card.title}</h3>
            <div className="mt-3">
              <div className="text-[32px] font-black font-albert tracking-tight leading-none mb-2">{card.value}</div>
              <p className={`text-[13px] font-secondary font-medium ${card.subtitleColor}`}>
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Table Section */}
      <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col mt-2">
        {/* Tabs Header */}
        <div className="flex items-center border-b border-brand-dark-200/20">
          {["SEED-A-COOPERATIVE", "PROGRAMS", "1K-CLUB SUBSCRIBERS"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-8 py-4 text-xs font-bold tracking-widest transition-colors uppercase ${
                activeTab === tab
                  ? "bg-[#769E8D] text-white" 
                  : "text-[#9BA1A6] hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table List Header */}
        <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr] px-8 py-4 bg-[#F9FAFB] border-b border-brand-dark-200/20 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase">
          <div>DATE</div>
          <div>FULLNAME</div>
          <div>TRANSACTION ID</div>
          <div>AMOUNT ($)</div>
          <div>PESAPAL STATUS</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col divide-y divide-brand-dark-200/10">
          {dummyData.map((row, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr] px-8 py-4 items-center text-[13px] text-brand-dark font-secondary">
              <div className="text-brand-dark/70 font-medium">{row.date}</div>
              <div className="font-semibold">{row.name}</div>
              <div className="font-bold text-[14px]">{row.transactionId}</div>
              <div className="text-brand-dark/70 font-medium">{row.amount}</div>
              <div>{renderStatus(row.status)}</div>
            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-8 py-4 border-t border-brand-dark-200/20 bg-white">
          <div className="text-[13px] text-[#9BA1A6] font-medium">
            Showing 1 to 1 of 8 entries
          </div>
          <div className="flex items-center gap-1 text-[13px] font-bold">
            <button className="p-1.5 text-[#9BA1A6] hover:text-brand-dark transition-colors"><Icon icon="ph:caret-left-bold" className="w-4 h-4" /></button>
            <button className="w-8 h-8 rounded bg-gray-100 text-brand-dark flex items-center justify-center">1</button>
            <button className="w-8 h-8 rounded hover:bg-gray-50 text-[#9BA1A6] flex items-center justify-center">2</button>
            <button className="w-8 h-8 rounded hover:bg-gray-50 text-[#9BA1A6] flex items-center justify-center">3</button>
            <span className="px-1 text-[#9BA1A6]">...</span>
            <button className="p-1.5 text-[#9BA1A6] hover:text-brand-dark transition-colors"><Icon icon="ph:caret-right-bold" className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapitalInvestments;
