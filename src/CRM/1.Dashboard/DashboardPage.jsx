import React from "react";
import { Icon } from "@iconify/react";

const DashboardPage = () => {
  // Recent Assignment Leads Mock Data
  const leads = [
    {
      name: "Namono Patience",
      role: "Technical Mentor",
      date: "Oct 24, 2023",
      status: "New",
    },
    {
      name: "Okello David",
      role: "Community Equipper",
      date: "Oct 22, 2023",
      status: "Pending",
    },
    {
      name: "Achan Grace",
      role: "Technical Mentor",
      date: "Oct 21, 2023",
      status: "Verified",
    },
    {
      name: "Mugisha Ivan",
      role: "Community Equipper",
      date: "Oct 20, 2023",
      status: "New",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">

      {/* ═══════════════════════════════════════════
          2. CORE ANALYTICS STATISTICS CARDS
      ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Capital */}
        <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center text-brand-lilac shrink-0">
              <Icon icon="ph:wallet-bold" className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center gap-1 bg-[#eaf7ec] text-[#1fb039] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              <Icon icon="ph:check-circle-fill" className="w-3.5 h-3.5 shrink-0" />
              PesaPal Verified
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-dark-400 uppercase tracking-wider mb-1 font-secondary">
              Total Capital Deployed
            </p>
            <h3 className="text-3xl font-black text-brand-dark font-albert tracking-tight">
              UGX 2.45B
            </h3>
            <p className="text-sm font-bold text-[#1fb039] mt-2 flex items-center gap-0.5">
              +12.4% <span className="font-medium text-brand-dark-400">from last month</span>
            </p>
          </div>
        </div>

        {/* Card 2: Passbooks */}
        <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center text-brand-lilac shrink-0">
              <Icon icon="ph:book-open-bold" className="w-5 h-5" />
            </div>
            <Icon icon="ph:users-bold" className="w-5 h-5 text-brand-dark-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-dark-400 uppercase tracking-wider mb-1 font-secondary">
              Cooperative Passbooks
            </p>
            <h3 className="text-3xl font-black text-brand-dark font-albert tracking-tight">
              14,802
            </h3>
            <p className="text-sm font-semibold text-brand-lilac mt-2">
              Women registered across regions
            </p>
          </div>
        </div>

        {/* Card 3: Active Parishes */}
        <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow duration-300">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center text-brand-lilac shrink-0">
              <Icon icon="ph:map-trifold-bold" className="w-5 h-5" />
            </div>
            <Icon icon="ph:map-pin-bold" className="w-5 h-5 text-brand-dark-300" />
          </div>
          <div>
            <p className="text-xs font-semibold text-brand-dark-400 uppercase tracking-wider mb-1 font-secondary">
              Active Parishes
            </p>
            <h3 className="text-3xl font-black text-brand-dark font-albert tracking-tight">
              84
            </h3>
            <p className="text-sm font-semibold text-brand-brown mt-2">
              Geographic coverage (Uganda)
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          3. MIDDLE SECTION / GRID PANEL
      ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column: Leads Table */}
        <div className="xl:col-span-2 bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-black text-brand-lilac font-primary">
                Recent Assignment Leads
              </h4>
              <button className="inline-flex items-center gap-1.5 text-brand-lilac hover:text-brand-lilac-700 font-bold text-sm transition-colors cursor-pointer">
                View All <Icon icon="ph:arrow-right-bold" className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-dark-200/10 pb-3">
                    <th className="text-[11px] font-bold text-brand-dark-400 uppercase tracking-wider py-3">Name</th>
                    <th className="text-[11px] font-bold text-brand-dark-400 uppercase tracking-wider py-3">Role</th>
                    <th className="text-[11px] font-bold text-brand-dark-400 uppercase tracking-wider py-3">Submission Date</th>
                    <th className="text-[11px] font-bold text-brand-dark-400 uppercase tracking-wider py-3">Status</th>
                    <th className="text-[11px] font-bold text-brand-dark-400 uppercase tracking-wider py-3 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-dark-200/5">
                  {leads.map((lead, idx) => (
                    <tr key={idx} className="group hover:bg-brand-dark-100/10 transition-colors">
                      <td className="py-4 font-bold text-brand-dark text-sm">{lead.name}</td>
                      <td className="py-4 text-brand-dark-400 text-sm font-medium">{lead.role}</td>
                      <td className="py-4 text-brand-dark-400 text-sm font-medium">{lead.date}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                          lead.status === "New" 
                            ? "bg-slate-100 text-slate-700" 
                            : lead.status === "Pending" 
                            ? "bg-[#fef9c3] text-[#a16207] border border-[#fef08a]" 
                            : "bg-[#eaf7ec] text-[#1fb039] border border-[#d1fae5]"
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-3.5">
                          <button className="text-xs font-bold text-brand-lilac hover:text-brand-lilac-800 transition-colors cursor-pointer">
                            View Details
                          </button>
                          {lead.status === "Verified" ? (
                            <span className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-400 cursor-not-allowed">
                              Verified
                            </span>
                          ) : (
                            <button className="px-4 py-1.5 rounded-full bg-brand-lilac text-brand-white hover:bg-brand-lilac-700 text-xs font-black transition-colors cursor-pointer shadow-sm">
                              Verify
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Shortcuts + Transparency Log */}
        <div className="space-y-6">
          {/* Shortcuts Grid */}
          <div className="bg-brand-white border border-brand-dark-200/10 rounded-2xl p-6 shadow-sm">
            <h4 className="text-lg font-black text-brand-lilac font-primary mb-4">
              System shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {/* Shortcut 1 */}
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-brand-dark-200/10 bg-brand-white hover:bg-brand-dark-100/20 hover:scale-[1.02] transition-all cursor-pointer text-center group">
                <img 
                  src="/icons/capital.png" 
                  alt="Capital Investments Icon" 
                  className="w-8 h-8 object-contain mb-2 group-hover:scale-110 transition-transform" 
                />
                <span className="text-[10px] font-black text-brand-dark tracking-wide uppercase leading-tight mt-1">
                  Capital Investments
                </span>
              </button>

              {/* Shortcut 2 */}
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-brand-dark-200/10 bg-brand-white hover:bg-brand-dark-100/20 hover:scale-[1.02] transition-all cursor-pointer text-center group">
                <img 
                  src="/icons/network.png" 
                  alt="Network Map Icon" 
                  className="w-8 h-8 object-contain mb-2 group-hover:scale-110 transition-transform" 
                />
                <span className="text-[10px] font-black text-brand-dark tracking-wide uppercase leading-tight mt-1">
                  Network Map
                </span>
              </button>

              {/* Shortcut 3 */}
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-brand-dark-200/10 bg-brand-white hover:bg-brand-dark-100/20 hover:scale-[1.02] transition-all cursor-pointer text-center group">
                <img 
                  src="/icons/mentors.png" 
                  alt="Technical Mentors Icon" 
                  className="w-8 h-8 object-contain mb-2 group-hover:scale-110 transition-transform" 
                />
                <span className="text-[10px] font-black text-brand-dark tracking-wide uppercase leading-tight mt-1">
                  Technical Mentors
                </span>
              </button>

              {/* Shortcut 4 */}
              <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-brand-dark-200/10 bg-brand-white hover:bg-brand-dark-100/20 hover:scale-[1.02] transition-all cursor-pointer text-center group">
                <img 
                  src="/icons/content.png" 
                  alt="Blog/Gallery CMS Icon" 
                  className="w-8 h-8 object-contain mb-2 group-hover:scale-110 transition-transform" 
                />
                <span className="text-[10px] font-black text-brand-dark tracking-wide uppercase leading-tight mt-1">
                  Blog/Gallery CMS
                </span>
              </button>
            </div>
          </div>

          {/* Transparency Log Teal Card */}
          <div className="bg-[#8fbdbf]/90 text-brand-dark rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between group h-48">
            {/* Outline Eye Overlay watermark */}
            <Icon 
              icon="ph:eye-bold" 
              className="absolute -bottom-8 -right-8 w-32 h-32 text-brand-dark/10 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500" 
            />
            
            <div className="relative z-10">
              <h4 className="text-lg font-black tracking-tight mb-2">
                Transparency Log
              </h4>
              <p className="text-xs font-semibold text-brand-dark-800 leading-relaxed mb-4">
                All executive actions are logged in real-time to the blockchain ledger for total accountability.
              </p>
            </div>
            
            <button className="relative z-10 w-fit px-5 py-2 bg-brand-dark text-brand-white font-bold text-xs rounded-full hover:bg-brand-dark/95 transition-all shadow cursor-pointer uppercase tracking-wider">
              Review Audit Logs
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          4. BOTTOM ROW / REGIONAL MAP & NEXT STEPS
      ═══════════════════════════════════════════ */}
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
    </div>
  );
};

export default DashboardPage;
