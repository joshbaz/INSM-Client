import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTiers } from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const SeedACooperative = () => {
  const [activeTab, setActiveTab] = useState("ONE-TIME");

  const navigate = useNavigate();
  const { data: tiers = [] } = useTiers();
  
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleTiersUpdate = () => queryClient.invalidateQueries({ queryKey: ["tiers"] });
    socket.on("tiers_updated", handleTiersUpdate);
    return () => socket.off("tiers_updated", handleTiersUpdate);
  }, [socket, queryClient]);

  const statCards = [
    {
      title: "Total Capital Received",
      value: "10.3M",
      subtitle: "+12.4% from last month",
      subtitleColor: "text-green-500",
    },
    {
      title: "Total For Threads",
      value: "31.8K",
      subtitle: "Total funds received in USD ($)",
      subtitleColor: "text-brand-dark-400",
    },
    {
      title: "Tiers",
      value: tiers.length.toString(),
      subtitle: "Number of investment tiers.",
      subtitleColor: "text-brand-dark-400",
      action: {
        label: "VIEW TIERS",
        onClick: () => navigate("/executive/capital/seed-a-cooperative/tiers")
      }
    }
  ];

  const dummyData = [
    { date: "Oct 24, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$10", tier: "TIER 1", status: "PROCESSING" },
    { date: "Oct 22, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$10", tier: "TIER 1", status: "PROCESSING" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$500", tier: "TIER 3", status: "SETTLED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$500", tier: "TIER 3", status: "SETTLED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$10", tier: "TIER 1", status: "FAILED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$10,000", tier: "TIER 5", status: "SETTLED" },
    { date: "Oct 20, 2023", name: "Achan, Grace", transactionId: "QH7X8LKJ22", amount: "$500", tier: "TIER 3", status: "SETTLED" },
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
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-secondary font-medium text-[#A0AAB4]">
        <Link to="/executive/home" className="hover:text-brand-dark transition-colors text-[#997B94]">Home</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
        <Link to="/executive/capital" className="hover:text-brand-dark transition-colors text-[#997B94]">Capital Investments</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
        <span className="text-brand-dark font-semibold">Seed a Cooperative</span>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between min-h-[140px] relative">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary">{card.title}</h3>
              {card.action && (
                <button 
                  onClick={card.action.onClick}
                  className="bg-[#997B94] hover:bg-[#866881] text-white text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full transition-colors"
                >
                  {card.action.label}
                </button>
              )}
            </div>
            <div className="mt-3">
              <div className="text-[32px] font-black font-albert tracking-tight leading-none mb-2">{card.value}</div>
              <p className={`text-[13px] font-secondary font-medium ${card.subtitleColor}`}>
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Transactions Section */}
      <div className="mt-2 flex flex-col gap-4">
        <h2 className="text-2xl font-bold font-albert text-brand-dark tracking-tight">Transactions</h2>
        
        <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col">
          {/* Tabs Header */}
          <div className="flex items-center border-b border-brand-dark-200/20">
            {["ONE-TIME", "MONTHLY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
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
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] px-8 py-4 bg-[#F9FAFB] border-b border-brand-dark-200/20 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase">
            <div>DATE</div>
            <div>FULLNAME</div>
            <div>TRANSACTION ID</div>
            <div>AMOUNT ($)</div>
            <div>TIER</div>
            <div>PESAPAL STATUS</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col divide-y divide-brand-dark-200/10">
            {dummyData.map((row, idx) => (
              <div key={idx} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] px-8 py-4 items-center text-[13px] text-brand-dark font-secondary">
                <div className="text-brand-dark/70 font-medium">{row.date}</div>
                <div className="font-semibold">{row.name}</div>
                <div className="font-bold text-[14px]">{row.transactionId}</div>
                <div className="text-brand-dark/70 font-medium">{row.amount}</div>
                <div>
                  <span className="bg-[#E5E7EB] text-brand-dark text-[11px] font-bold tracking-widest px-3 py-1 rounded-full">
                    {row.tier}
                  </span>
                </div>
                <div>{renderStatus(row.status)}</div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between px-8 py-4 border-t border-brand-dark-200/20 bg-white">
            <div className="text-[13px] text-[#9BA1A6] font-medium">
              Showing 1 to 7 of 12 entries
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
    </div>
  );
};

export default SeedACooperative;
