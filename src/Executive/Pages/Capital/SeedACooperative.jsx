import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useTiers, usePayments, usePaymentSummary } from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";

const SeedACooperative = () => {
  const [activeTab, setActiveTab] = useState("ONE-TIME");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

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

  const { data: summary, isLoading: isSummaryLoading } = usePaymentSummary();
  const { data: paymentsData, isLoading: isPaymentsLoading } = usePayments({
    page: currentPage,
    limit,
    tab: "SEED-A-COOPERATIVE",
    frequency: activeTab,
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const formatStatValue = (val, isCount = false) => {
    if (val === undefined || val === null) return "0";
    if (isCount) return val.toString();
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`;
    if (val >= 1e3) return `${(val / 1e3).toFixed(1)}K`;
    return val.toLocaleString();
  };

  const formatCurrency = (val, currency = "UGX") => {
    if (val === undefined || val === null) return "-";
    if (currency === "USD") {
      return `$${parseFloat(val).toLocaleString()}`;
    }
    return `UGX ${parseFloat(val).toLocaleString()}`;
  };

  const statCards = [
    {
      title: "Total Capital Received",
      value: formatStatValue(summary?.seedACoopTotal),
      subtitle: "Total seed-a-coop funds received",
      subtitleColor: "text-green-500",
    },
    {
      title: "Total For Threads",
      value: formatStatValue(summary?.totalCapital),
      subtitle: "Total funds received overall",
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

  const payments = paymentsData?.payments || [];
  const totalEntries = paymentsData?.total || 0;
  const totalPages = paymentsData?.pages || 1;

  const renderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="flex items-center gap-1.5 text-[#A0AAB4] font-bold text-[11px] tracking-widest">
            PROCESSING <Icon icon="ph:arrows-clockwise-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case "SUCCESS":
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
        return (
          <span className="flex items-center gap-1.5 text-[#A0AAB4] font-bold text-[11px] tracking-widest">
            {status}
          </span>
        );
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
                  className="bg-[#997B94] hover:bg-[#866881] text-white text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  {card.action.label}
                </button>
              )}
            </div>
            <div className="mt-3">
              <div className="text-[32px] font-black font-albert tracking-tight leading-none mb-2">
                {isSummaryLoading ? (
                  <span className="inline-block w-16 h-8 bg-brand-dark-200 animate-pulse rounded" />
                ) : (
                  card.value
                )}
              </div>
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
                onClick={() => handleTabChange(tab)}
                className={`px-8 py-4 text-xs font-bold tracking-widest transition-colors uppercase cursor-pointer ${
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
            <div>AMOUNT</div>
            <div>TIER</div>
            <div>PESAPAL STATUS</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col divide-y divide-brand-dark-200/10 min-h-[250px] justify-start">
            {isPaymentsLoading ? (
              <div className="flex flex-col grow items-center justify-center py-20 gap-2">
                <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 animate-spin text-[#769E8D]" />
                <span className="text-xs font-semibold text-brand-dark-400 uppercase tracking-widest">Loading transactions...</span>
              </div>
            ) : payments.length === 0 ? (
              <div className="flex flex-col grow items-center justify-center py-20 gap-2">
                <Icon icon="ph:receipt-bold" className="w-8 h-8 text-brand-dark-300" />
                <span className="text-xs font-semibold text-brand-dark-400 uppercase tracking-widest">No transactions found</span>
              </div>
            ) : (
              payments.map((row) => (
                <div key={row.id} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr] px-8 py-4 items-center text-[13px] text-brand-dark font-secondary">
                  <div className="text-brand-dark/70 font-medium">
                    {new Date(row.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="font-semibold">{`${row.donorFirstName} ${row.donorLastName}`}</div>
                  <div className="font-bold text-[14px] font-mono">{row.orderTrackingId || row.id}</div>
                  <div className="text-brand-dark/70 font-medium">{formatCurrency(row.amount, row.currency)}</div>
                  <div>
                    <span className="bg-[#E5E7EB] text-brand-dark text-[11px] font-bold tracking-widest px-3 py-1 rounded-full">
                      {row.tierTitle || "General"}
                    </span>
                  </div>
                  <div>{renderStatus(row.status)}</div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Footer */}
          {totalEntries > 0 && (
            <div className="flex items-center justify-between px-8 py-4 border-t border-brand-dark-200/20 bg-white">
              <div className="text-[13px] text-[#9BA1A6] font-medium">
                Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalEntries)} of {totalEntries} entries
              </div>
              <div className="flex items-center gap-1 text-[13px] font-bold">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    currentPage === 1 ? "text-[#9BA1A6]/50 cursor-not-allowed" : "text-[#9BA1A6] hover:text-brand-dark"
                  }`}
                >
                  <Icon icon="ph:caret-left-bold" className="w-4 h-4" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
                      currentPage === page 
                        ? "bg-gray-100 text-brand-dark font-bold border border-brand-dark-200/20" 
                        : "text-[#9BA1A6] hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={`p-1.5 transition-colors cursor-pointer ${
                    currentPage === totalPages ? "text-[#9BA1A6]/50 cursor-not-allowed" : "text-[#9BA1A6] hover:text-brand-dark"
                  }`}
                >
                  <Icon icon="ph:caret-right-bold" className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeedACooperative;
