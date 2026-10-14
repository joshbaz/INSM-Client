import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { usePayments, usePaymentSummary } from "../../../store/tanstackStore/services/queries";

const CapitalInvestments = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL, default to seed-a-cooperative
  const currentPath = location.pathname;
  let initialTab = "SEED-A-COOPERATIVE";
  if (currentPath.includes("programs")) initialTab = "PROGRAMS";
  if (currentPath.includes("1k-club")) initialTab = "1K-CLUB SUBSCRIBERS";
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    let tab = "SEED-A-COOPERATIVE";
    if (location.pathname.includes("programs")) tab = "PROGRAMS";
    if (location.pathname.includes("1k-club")) tab = "1K-CLUB SUBSCRIBERS";
    setActiveTab(tab);
    setCurrentPage(1); // Reset page on tab change
  }, [location.pathname]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "SEED-A-COOPERATIVE") navigate("/executive/capital/seed-a-cooperative");
    if (tab === "PROGRAMS") navigate("/executive/capital/programs");
    if (tab === "1K-CLUB SUBSCRIBERS") navigate("/executive/capital/1k-club");
  };

  // Queries
  const { data: summary, isLoading: isSummaryLoading } = usePaymentSummary();
  const { data: paymentsData, isLoading: isPaymentsLoading } = usePayments({
    page: currentPage,
    limit,
    tab: activeTab,
  });

  const formatCurrency = (val, currency = "UGX") => {
    if (val === undefined || val === null) return "-";
    if (currency === "USD") {
      return `$${parseFloat(val).toLocaleString()}`;
    }
    return `UGX ${parseFloat(val).toLocaleString()}`;
  };

  const formatStatValue = (val, isCount = false, currency = "UGX") => {
    if (val === undefined || val === null) return "0";
    if (isCount) return val.toString();
    
    // Format large numbers with M/B suffix
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`;
    return val.toLocaleString();
  };

  const statCards = [
    {
      title: "Total Capital Received",
      value: formatStatValue(summary?.totalCapital),
      subtitle: "Total funds received (UGX equivalent)",
      subtitleColor: "text-green-500",
    },
    {
      title: "Total Seed-a-Coop",
      value: formatStatValue(summary?.seedACoopTotal),
      subtitle: "Total funds received in UGX",
      subtitleColor: "text-brand-dark-400",
    },
    {
      title: "Total Programs",
      value: formatStatValue(summary?.programsTotal),
      subtitle: "Total funds received in UGX",
      subtitleColor: "text-brand-dark-400",
    },
    {
      title: "1K-Club Subscribers",
      value: formatStatValue(summary?.oneKClubSubscribers, true),
      subtitle: "Weekly contributing members",
      subtitleColor: "text-brand-dark-400",
    }
  ];

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

  const payments = paymentsData?.payments || [];
  const totalEntries = paymentsData?.total || 0;
  const totalPages = paymentsData?.pages || 1;

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between min-h-[140px]">
            <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary">{card.title}</h3>
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

      {/* Tabs & Table Section */}
      <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col mt-2">
        {/* Tabs Header */}
        <div className="flex items-center border-b border-brand-dark-200/20">
          {["SEED-A-COOPERATIVE", "PROGRAMS", "1K-CLUB SUBSCRIBERS"].map((tab) => (
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
        <div className="grid grid-cols-[1.2fr_1.5fr_1.5fr_1fr_1fr] px-8 py-4 bg-[#F9FAFB] border-b border-brand-dark-200/20 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase">
          <div>DATE</div>
          <div>FULLNAME</div>
          <div>TRANSACTION ID</div>
          <div>AMOUNT</div>
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
              <div key={row.id} className="grid grid-cols-[1.2fr_1.5fr_1.5fr_1fr_1fr] px-8 py-4 items-center text-[13px] text-brand-dark font-secondary">
                <div className="text-brand-dark/70 font-medium">
                  {new Date(row.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
                <div className="font-semibold">{`${row.donorFirstName} ${row.donorLastName}`}</div>
                <div className="font-bold text-[13px] font-mono">{row.orderTrackingId || row.id}</div>
                <div className="text-brand-dark/70 font-semibold">{formatCurrency(row.amount, row.currency)}</div>
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
                className={`p-1.5 transition-colors ${
                  currentPage === 1 ? "text-[#9BA1A6]/50 cursor-not-allowed" : "text-[#9BA1A6] hover:text-brand-dark cursor-pointer"
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
                className={`p-1.5 transition-colors ${
                  currentPage === totalPages ? "text-[#9BA1A6]/50 cursor-not-allowed" : "text-[#9BA1A6] hover:text-brand-dark cursor-pointer"
                }`}
              >
                <Icon icon="ph:caret-right-bold" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CapitalInvestments;
