import React from "react";
import { Icon } from "@iconify/react";

const LeadDetailsModal = ({ isOpen, onClose, lead, onUpdateStatus, isUpdating }) => {
  if (!isOpen || !lead) return null;

  const isTechnicalMentor = lead.role === "TECHNICAL_MENTOR";
  const title = isTechnicalMentor ? "TECHNICAL MENTOR PROFILE" : "COMMUNITY EQUIPPER PROFILE";

  const getDomainStyle = (domain) => {
    switch (domain) {
      case "FINANCE":
        return "border-[#22c55e] text-[#22c55e]";
      case "HEALTH":
        return "border-[#a57ea9] text-[#a57ea9]";
      case "LAW":
        return "border-[#996d54] text-[#996d54]";
      case "MISC":
      default:
        return "border-gray-500 text-gray-500";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-[fadeIn_0.2s_ease-out]">
        <div className="p-8">
          <div className="flex items-start justify-between mb-2">
            <span className="text-[10px] font-bold font-secondary text-gray-400 tracking-wider uppercase">
              {title}
            </span>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <Icon icon="ph:x-bold" className="w-5 h-5" />
            </button>
          </div>
          
          <h2 className="text-2xl font-secondary text-gray-800 mb-8">{lead.applicantName}</h2>

          {isTechnicalMentor ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold font-secondary text-gray-700 mb-2">Professional Domain</h3>
                <span className={`inline-block px-3 py-1 text-[10px] font-bold font-secondary tracking-wider border rounded-full ${getDomainStyle(lead.domain)}`}>
                  {lead.domain || "MISC"}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold font-secondary text-gray-700 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white">
                    <Icon icon="heroicons:envelope" className="w-5 h-5 text-[#866089]" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 font-secondary tracking-wider uppercase">EMAIL ADDRESS</div>
                      <div className="text-sm text-gray-800 font-secondary mt-0.5 font-medium">{lead.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white">
                    <Icon icon="heroicons:phone" className="w-5 h-5 text-[#866089]" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 font-secondary tracking-wider uppercase">PHONE NUMBER</div>
                      <div className="text-sm text-gray-800 font-secondary mt-0.5 font-medium">{lead.phoneNumber || "Not provided"}</div>
                    </div>
                  </div>
                </div>
              </div>

              {lead.linkedInUrl && (
                <div>
                  <h3 className="text-sm font-bold font-secondary text-gray-700 mb-2">External Verification</h3>
                  <a 
                    href={lead.linkedInUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 bg-[#1c1c1c] text-white rounded-lg p-4 hover:bg-black transition-colors"
                  >
                    <Icon icon="heroicons:link" className="w-5 h-5 opacity-70" />
                    <span className="text-sm font-secondary font-medium">LinkedIn Professional Profile</span>
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold font-secondary text-gray-700 mb-2">Region</h3>
                <span className="inline-block px-3 py-1 text-[10px] font-bold font-secondary tracking-wider border border-gray-400 text-gray-600 rounded-full">
                  {lead.region || "CENTRAL"}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold font-secondary text-gray-700 mb-2">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white">
                    <Icon icon="heroicons:map-pin" className="w-5 h-5 text-[#866089]" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 font-secondary tracking-wider uppercase">PARISH</div>
                      <div className="text-sm text-gray-800 font-secondary mt-0.5 font-medium">{lead.parish || "Kansanga, Makindye Division"}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white">
                    <Icon icon="heroicons:envelope" className="w-5 h-5 text-[#866089]" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 font-secondary tracking-wider uppercase">EMAIL ADDRESS</div>
                      <div className="text-sm text-gray-800 font-secondary mt-0.5 font-medium">{lead.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border border-gray-200 rounded-lg p-4 bg-white">
                    <Icon icon="heroicons:phone" className="w-5 h-5 text-[#866089]" />
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 font-secondary tracking-wider uppercase">PHONE NUMBER</div>
                      <div className="text-sm text-gray-800 font-secondary mt-0.5 font-medium">{lead.phoneNumber || "Not provided"}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold font-secondary text-gray-700 mb-2">Connection to Leadership</h3>
                <div className="text-sm text-gray-700 font-secondary font-medium">
                  {lead.leadershipConnection || "Pastor"}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-gray-50 flex items-center justify-end border-t border-gray-100 gap-3">
          {lead.status === "PENDING" && (
            <>
              <button 
                onClick={() => { onUpdateStatus(lead.id, "REJECTED"); onClose(); }}
                disabled={isUpdating}
                className="px-6 py-3 rounded-full text-xs font-bold font-secondary tracking-wider text-gray-500 hover:bg-gray-200 transition-colors uppercase"
              >
                Reject
              </button>
              <button 
                onClick={() => { onUpdateStatus(lead.id, "APPROVED"); onClose(); }}
                disabled={isUpdating}
                className="px-10 py-3 rounded-full bg-[#dfb236] hover:bg-[#c99e2a] text-white text-xs font-bold font-secondary tracking-wider uppercase transition-colors shadow-sm"
              >
                Verify
              </button>
            </>
          )}

          {lead.status !== "PENDING" && (
            <div className="text-sm font-bold font-secondary text-gray-400 w-full text-center tracking-wider">
              THIS LEAD IS {lead.status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
