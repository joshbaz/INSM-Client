import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import TierModal from "./components/TierModal";
import { useTiers } from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const InvestmentTiers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit' | 'view'
  
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleTiersUpdate = () => queryClient.invalidateQueries({ queryKey: ["tiers"] });
    socket.on("tiers_updated", handleTiersUpdate);
    return () => socket.off("tiers_updated", handleTiersUpdate);
  }, [socket, queryClient]);

  const handleCreateNew = () => {
    setSelectedTier(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleEdit = (e, tier) => {
    e.stopPropagation();
    setSelectedTier(tier);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleView = (tier) => {
    setSelectedTier(tier);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const { data: tiers = [], isLoading } = useTiers();

  return (
    <>
      <div className="flex flex-col gap-6 max-w-[1200px] w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-secondary font-medium text-[#A0AAB4]">
          <Link to="/executive/home" className="hover:text-brand-dark transition-colors text-[#997B94]">Home</Link>
          <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
          <Link to="/executive/capital" className="hover:text-brand-dark transition-colors text-[#997B94]">Capital Investments</Link>
          <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
          <Link to="/executive/capital/seed-a-cooperative" className="hover:text-brand-dark transition-colors text-[#997B94]">Seed a Cooperative</Link>
          <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
          <span className="text-brand-dark font-semibold">Investment Tiers</span>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-2 mt-2">
          <h1 className="text-[28px] font-black font-albert text-brand-dark tracking-tight leading-none">
            Investment Tiers Studio
          </h1>
          <p className="text-[#6B7280] text-[15px] font-medium font-secondary">
            Configure funding levels, manage descriptions, and upload localize audio narratives for each tier.
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm p-8 flex flex-col gap-8 mt-2">
          {/* Top Actions */}
          <div>
            <button 
              onClick={handleCreateNew}
              className="bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors flex items-center gap-2"
            >
              <Icon icon="ph:plus-bold" className="w-3.5 h-3.5" />
              CREATE NEW
            </button>
          </div>

          {/* Tiers Grid */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-dark animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tiers.map((tier, index) => (
                <div 
                  key={tier.id} 
                  onClick={() => handleView(tier)}
                  className="border border-brand-dark-200/20 rounded-xl p-6 flex flex-col justify-between min-h-[260px] cursor-pointer hover:border-brand-dark-200/50 hover:shadow-md transition-all"
                >
                  <div>
                    {/* Badge */}
                    <div className="mb-4">
                      <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase ${
                        tier.premiumTier 
                          ? "bg-[#997B94] text-white" 
                          : "bg-[#E5E7EB] text-brand-dark"
                      }`}>
                        {tier.premiumTier ? `TIER ${index + 1} PREMIUM` : `TIER ${index + 1}`}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-brand-dark font-secondary mb-1">
                      {tier.title}
                    </h3>
                    <div className="text-[26px] font-black font-albert text-[#6A4C6A] mb-4">
                      ${tier.amount}
                    </div>
                    <p className="text-[#6B7280] text-sm font-medium leading-relaxed font-secondary">
                      {tier.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mt-6 flex gap-3 flex-col">
                    {tier.audioFileUrl && (
                      <div className="flex items-center gap-2 text-xs font-bold text-[#8C7030]">
                         <Icon icon="ph:microphone-fill" className="w-4 h-4" />
                         AUDIO AVAILABLE
                      </div>
                    )}
                    <button 
                      onClick={(e) => handleEdit(e, tier)}
                      className="w-full bg-[#D4AF37] hover:bg-[#C4A030] text-brand-dark text-xs font-black tracking-widest py-3 rounded-full transition-colors uppercase"
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <TierModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        tier={selectedTier} 
        mode={modalMode}
      />
    </>
  );
};

export default InvestmentTiers;
