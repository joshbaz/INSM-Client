import React from "react";
import { Icon } from "@iconify/react";

const MiddleSection = () => {
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
  );
};

export default MiddleSection;
