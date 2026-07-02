import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useApplications, useUpdateApplication } from "../../../store/tanstackStore/services/queries";
import LeadDetailsModal from "./LeadDetailsModal";

const ManageLeads = () => {
  const [activeTab, setActiveTab] = useState("MENTORS");
  const [selectedLead, setSelectedLead] = useState(null);

  // Fetch ALL applications to compute stats
  const { data: allApplications, isLoading } = useApplications();
  const updateStatusMutation = useUpdateApplication();

  // Computations
  const technicalMentors = allApplications?.filter(a => a.role === "TECHNICAL_MENTOR") || [];
  const equippers = allApplications?.filter(a => a.role === "COMMUNITY_EQUIPPER") || [];
  const approvedPartners = allApplications?.filter(a => a.status === "APPROVED").length || 0;
  const totalSubmissions = allApplications?.length || 0;

  const techMentorsLaw = technicalMentors.filter(a => a.domain === "LAW").length;
  const techMentorsFinance = technicalMentors.filter(a => a.domain === "FINANCE").length;
  const techMentorsHealth = technicalMentors.filter(a => a.domain === "HEALTH").length;

  const equipperCentral = equippers.filter(a => a.region === "CENTRAL").length;
  const equipperWestern = equippers.filter(a => a.region === "WESTERN").length;
  const equipperNorthern = equippers.filter(a => a.region === "NORTHERN").length;
  const equipperEastern = equippers.filter(a => a.region === "EASTERN").length;

  const activeApplications = activeTab === "MENTORS" ? technicalMentors : equippers;

  const handleUpdateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  const getDomainBadge = (domain) => {
    switch (domain) {
      case 'HEALTH': return 'border-[#a57ea9] text-[#a57ea9]';
      case 'FINANCE': return 'border-[#22c55e] text-[#22c55e]';
      case 'LAW': return 'border-[#996d54] text-[#996d54]';
      case 'MISC': return 'border-gray-500 text-gray-500';
      default: return 'border-gray-200 text-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': 
        return (
          <span className="flex items-center gap-1.5 text-gray-400 font-bold text-[10px] tracking-[0.1em] uppercase">
            PENDING <Icon icon="ph:clock-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case 'APPROVED': 
        return (
          <span className="flex items-center gap-1.5 text-green-600 font-bold text-[10px] tracking-[0.1em] uppercase">
            APPROVED <Icon icon="ph:check-circle-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case 'REJECTED': 
        return (
          <span className="flex items-center gap-1.5 text-red-600 font-bold text-[10px] tracking-[0.1em] uppercase">
            REJECTED <Icon icon="ph:x-circle-bold" className="w-3.5 h-3.5" />
          </span>
        );
      default: 
        return null;
    }
  };

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto p-4 md:p-8">
      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[140px]">
          <div>
            <h3 className="text-xs font-bold font-secondary text-gray-600 tracking-wide">Technical Mentor Applications</h3>
            <div className="text-3xl font-black font-secondary text-gray-900 mt-2">{technicalMentors.length}</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4">
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Law</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{techMentorsLaw}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Finance</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{techMentorsFinance}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Health</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{techMentorsHealth}</div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[140px]">
          <div>
            <h3 className="text-xs font-bold font-secondary text-gray-600 tracking-wide">Equipper Applications</h3>
            <div className="text-3xl font-black font-secondary text-gray-900 mt-2">{equippers.length}</div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Central</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{equipperCentral}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Western</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{equipperWestern}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Northern</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{equipperNorthern}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Eastern</div>
              <div className="text-sm font-bold font-secondary text-gray-800">{equipperEastern}</div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[140px]">
          <div>
            <h3 className="text-xs font-bold font-secondary text-gray-600 tracking-wide">Total Submissions</h3>
            <div className="text-3xl font-black font-secondary text-gray-900 mt-2">
              {totalSubmissions > 1000 ? (totalSubmissions / 1000).toFixed(1) + 'K' : totalSubmissions}
            </div>
          </div>
          <div className="text-[10px] font-secondary text-gray-400 mt-4">
            Applicants approved
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col justify-between h-[140px]">
          <div>
            <h3 className="text-xs font-bold font-secondary text-gray-600 tracking-wide">Approved Partners</h3>
            <div className="text-3xl font-black font-secondary text-gray-900 mt-2">{approvedPartners}</div>
          </div>
          <div className="text-[10px] font-secondary text-gray-400 mt-4">
            Applicants approved
          </div>
        </div>
      </div>

      {/* ── Tabs and Table ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 p-2">
          <button 
            className={`px-8 py-3 text-xs font-bold font-secondary tracking-wider uppercase transition-colors rounded-sm ${
              activeTab === "MENTORS" 
                ? "bg-[#78a2a5] text-white" 
                : "text-gray-400 hover:text-gray-600 bg-transparent"
            }`}
            onClick={() => setActiveTab("MENTORS")}
          >
            TECHNICAL MENTORS
          </button>
          <button 
            className={`px-8 py-3 text-xs font-bold font-secondary tracking-wider uppercase transition-colors rounded-sm ml-2 ${
              activeTab === "EQUIPPERS" 
                ? "bg-[#78a2a5] text-white" 
                : "text-gray-400 hover:text-gray-600 bg-transparent"
            }`}
            onClick={() => setActiveTab("EQUIPPERS")}
          >
            COMMUNITY EQUIPPERS
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto relative min-h-[300px]">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-[#78a2a5] animate-spin" />
            </div>
          )}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-8 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase">Applicant Name</th>
                {activeTab === "MENTORS" ? (
                  <>
                    <th className="py-4 px-6 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase">Domain</th>
                    <th className="py-4 px-6 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase text-center">LinkedIn</th>
                  </>
                ) : (
                  <>
                    <th className="py-4 px-6 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase">Parish</th>
                    <th className="py-4 px-6 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase">Region</th>
                  </>
                )}
                <th className="py-4 px-6 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase">Submission Date</th>
                <th className="py-4 px-6 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase">Status</th>
                <th className="py-4 px-8 text-[14px] font-semibold font-secondary tracking-[0.1em] text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeApplications.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-8 text-sm font-secondary font-medium text-gray-800">
                    {lead.applicantName}
                  </td>
                  {activeTab === "MENTORS" ? (
                    <>
                      <td className="py-5 px-6">
                        {lead.domain ? (
                          <span className={`px-4 py-1.5 text-[9px] font-bold font-secondary tracking-wider border rounded-full ${getDomainBadge(lead.domain)}`}>
                            {lead.domain}
                          </span>
                        ) : '-'}
                      </td>
                      <td className="py-5 px-6 text-center">
                        {lead.linkedInUrl ? (
                          <a href={lead.linkedInUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors inline-flex">
                            <Icon icon="heroicons:link" className="w-5 h-5" />
                          </a>
                        ) : '-'}
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-5 px-6 text-sm font-secondary text-gray-600">
                        {lead.parish || '-'}
                      </td>
                      <td className="py-5 px-6">
                        {lead.region ? (
                          <span className="px-4 py-1.5 text-[9px] font-bold font-secondary tracking-wider border border-gray-300 text-gray-600 rounded-full">
                            {lead.region}
                          </span>
                        ) : '-'}
                      </td>
                    </>
                  )}
                  <td className="py-5 px-6 text-sm font-medium text-gray-500 font-secondary">
                    {new Date(lead.submissionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="py-5 px-6">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="py-5 px-8 text-right">
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      className="bg-[#f2ebf5] text-[#866089] hover:bg-[#e6d8eb] transition-colors px-4 py-2 rounded-md text-[10px] font-bold font-secondary tracking-wider uppercase inline-flex items-center"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && activeApplications.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-gray-400 text-sm font-secondary">
                    No applications found in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <LeadDetailsModal 
        isOpen={!!selectedLead} 
        onClose={() => setSelectedLead(null)} 
        lead={selectedLead} 
        onUpdateStatus={handleUpdateStatus}
        isUpdating={updateStatusMutation.isPending}
      />
    </div>
  );
};

export default ManageLeads;
