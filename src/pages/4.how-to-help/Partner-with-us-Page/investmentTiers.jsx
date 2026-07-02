import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../../../utils/animations";
import TierDetailModal from "./TierDetailModal";
import { useTiers } from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

// Fallback UI assets
const COLORS = ["bg-brand-teal", "bg-brand-pink", "bg-brand-brown"];
const IMAGES = [
  "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1494172961521-33799654c414?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a40d?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1529391409740-59f2dee08361?auto=format&fit=crop&q=80&w=1000"
];

const InvestmentTiers = ({ onDonateClick }) => {
  const [selectedTier, setSelectedTier] = useState(null);
  const { data: dbTiers = [], isLoading } = useTiers();
  
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleTiersUpdate = () => {
      console.log("Socket Event Received: tiers_updated");
      queryClient.invalidateQueries({ queryKey: ["tiers"], refetchType: 'all' });
    };
    
    socket.on("tiers_updated", handleTiersUpdate);
    return () => socket.off("tiers_updated", handleTiersUpdate);
  }, [socket, queryClient]);

  // Map DB data to the shape required by the public components
  const formattedTiers = dbTiers.map((tier, index) => ({
    ...tier,
    amount: String(tier.amount).startsWith('$') ? tier.amount : `$${tier.amount}`,
    colorClass: COLORS[index % COLORS.length],
    modalImage: IMAGES[index % IMAGES.length],
    audioSrc: tier.audioFileUrl ? `http://localhost:5000${tier.audioFileUrl}` : null,
    longDescription: tier.audioDescription || tier.description || "Description not available."
  }));

  return (
    <section className="w-full py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-primary text-black">
            Our Investment Tiers
          </h2>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Icon icon="ph:spinner-gap-bold" className="w-10 h-10 text-brand-dark animate-spin" />
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {formattedTiers.map((tier, index) => (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.1 }}
                variants={fadeUp}
                key={tier.id}
                className="bg-brand-white-100 rounded-[10px] shadow-sm border border-brand-dark-200/40 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow p-6 group"
              >
              <div className="mb-6">
                <h3 className="text-2xl font-bold font-primary text-black mb-1">
                  {tier.title}
                </h3>
                <p className="text-xs font-bold text-gray-400 font-secondary uppercase tracking-widest">
                  {tier.subtitle}
                </p>
              </div>

              <div
                className={`w-full h-48 ${tier.colorClass} flex items-center justify-center text-brand-white rounded-lg`}
              >
                <span className="text-6xl font-bold font-primary">
                  {tier.amount}
                </span>
              </div>

              <div className="flex flex-col grow mt-6">
                <p className="text-brand-dark font-secondary leading-relaxed mb-8 grow text-sm">
                  {tier.description}
                </p>

                <div className="flex flex-col xl:flex-row justify-between items-center mt-auto gap-3 w-full">
                  <button
                    onClick={() => setSelectedTier(tier)}
                    className="w-full xl:flex-1 border border-gray-300 text-gray-400 font-bold text-[10px] md:text-xs lg:text-sm py-3 md:py-4 px-2 md:px-4 rounded-full flex justify-center items-center gap-1 hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap min-h-[48px]"
                  >
                    More Info
                    <Icon
                      icon="material-symbols:play-circle-outline"
                      width="16"
                    />
                  </button>
                  <button
                    onClick={() => onDonateClick && onDonateClick(tier)}
                    className="w-full xl:flex-1 bg-brand-lilac-600 text-brand-white font-bold text-[10px] md:text-xs lg:text-sm py-3 md:py-4 px-2 md:px-6 rounded-full flex justify-center items-center hover:bg-brand-lilac-700 transition-colors uppercase tracking-wider cursor-pointer whitespace-nowrap shadow-sm min-h-[48px]"
                  >
                    Give Seed
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>

      {selectedTier && (
        <TierDetailModal
          tier={selectedTier}
          onClose={() => setSelectedTier(null)}
          onDonate={onDonateClick}
        />
      )}
    </section>
  );
};

export default InvestmentTiers;
