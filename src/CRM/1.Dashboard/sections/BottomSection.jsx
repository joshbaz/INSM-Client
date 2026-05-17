import React from "react";
import { Icon } from "@iconify/react";

const BottomSection = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Left Column: Regional Coverage Map */}
      <div className="xl:col-span-2 bg-brand-white border border-brand-dark-200/10 rounded-2xl overflow-hidden shadow-sm flex flex-col md:flex-row">
        {/* Text Left */}
        <div className="p-6 flex flex-col justify-between md:w-1/2">
          <div>
            <h4 className="text-xl font-black text-brand-lilac font-primary mb-2">
              Regional Coverage Map
            </h4>
            <p className="text-sm font-medium text-brand-dark-400 leading-relaxed mb-6">
              Monitoring impact across 84 parishes in Northern and Central Uganda. Growth projected at 15% for Q4.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-brand-dark-200/10 pt-4">
            <div>
              <p className="text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest leading-none mb-1">
                High Growth
              </p>
              <p className="text-base font-black text-brand-dark leading-tight">
                Gulu District
              </p>
            </div>
            
            <div>
              <p className="text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest leading-none mb-1">
                Emerging
              </p>
              <p className="text-base font-black text-brand-dark leading-tight">
                Lira Cluster
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Dynamic SVG Console Map Right */}
        <div className="bg-[#051a1b] p-4 flex items-center justify-center relative md:w-1/2 h-64 md:h-auto border-t md:border-t-0 md:border-l border-brand-dark-200/10">
          {/* Digital Console HUD details */}
          <div className="absolute top-2 left-2 text-[9px] font-mono text-[#00ff88]/60 uppercase tracking-widest">
            INSM System Active
          </div>
          <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#00ff88]/60 uppercase tracking-widest">
            Grid status: optimal
          </div>

          {/* Glowing Map Component */}
          <div className="w-full h-full max-h-[220px] relative flex items-center justify-center">
            {/* Radar glowing sweep */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,136,0.06)_0%,transparent_70%)] animate-pulse" />

            {/* Uganda stylized green dots map */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-full h-full text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,136,0.4)]"
            >
              {/* SVG Outline for Uganda shape representation */}
              <path 
                d="M 50 15 C 55 12, 65 14, 70 20 C 72 23, 76 25, 78 30 C 82 40, 84 45, 80 55 C 77 62, 73 66, 75 70 C 77 75, 75 80, 68 85 C 60 90, 50 88, 45 84 C 40 80, 30 78, 25 70 C 22 66, 18 60, 20 50 C 22 42, 28 35, 32 30 C 35 25, 42 20, 50 15 Z" 
                fill="none" 
                stroke="rgba(0,255,136,0.3)" 
                strokeWidth="1" 
                strokeDasharray="2, 2" 
              />

              {/* Pulsing grid coordinates */}
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(0,255,136,0.1)" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(0,255,136,0.1)" strokeWidth="0.5" />

              {/* Glowing coordinate target dots */}
              <circle cx="48" cy="35" r="2.5" fill="#00ff88" className="animate-ping duration-1000" />
              <circle cx="48" cy="35" r="1.5" fill="#00ff88" />
              <text x="52" y="36" className="text-[5px] font-mono fill-[#00ff88]/80 font-bold">GULU</text>

              <circle cx="58" cy="46" r="2.5" fill="#00ff88" className="animate-ping duration-1000" />
              <circle cx="58" cy="46" r="1.5" fill="#00ff88" />
              <text x="62" y="47" className="text-[5px] font-mono fill-[#00ff88]/80 font-bold">LIRA</text>

              <circle cx="44" cy="65" r="1.5" fill="#00ff88" />
              <circle cx="50" cy="74" r="1.5" fill="#00ff88" />
              <circle cx="65" cy="58" r="1.5" fill="#00ff88" />
              <circle cx="35" cy="42" r="1.5" fill="#00ff88" />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Column: Next Step event planner */}
      <div className="bg-[#8fc0c2]/90 text-brand-dark rounded-2xl p-6 shadow-sm flex flex-col justify-between group h-64 relative overflow-hidden">
        {/* Top arrow */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-black tracking-tight">
            Next Step
          </h4>
          <button className="text-brand-dark hover:scale-110 transition-transform cursor-pointer">
            <Icon icon="ph:arrow-up-right-bold" className="w-6 h-6" />
          </button>
        </div>

        <div>
          <p className="text-base font-bold text-brand-dark-900 leading-snug mb-8">
            Host the Q4 Network Alignment Summit in Entebbe.
          </p>
        </div>

        {/* Manage Event Pill in premium figma pink */}
        <button className="w-full py-3 bg-[#e490b8] text-brand-white font-bold text-sm rounded-full hover:bg-[#e490b8]/95 transition-all shadow cursor-pointer uppercase tracking-widest text-center">
          Manage Event
        </button>
      </div>
    </div>
  );
};

export default BottomSection;
