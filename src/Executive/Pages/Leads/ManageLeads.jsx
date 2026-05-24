import React, { useState } from "react";
import { Icon } from "@iconify/react";

const mentorsData = [
  { name: "Namono, Patience", domain: "HEALTH", date: "Oct 24, 2023", status: "PENDING" },
  { name: "Okello, David", domain: "HEALTH", date: "Oct 22, 2023", status: "PENDING" },
  { name: "Achan, Grace", domain: "HEALTH", date: "Oct 21, 2023", status: "PENDING" },
  { name: "Mugisha, Ivan", domain: "FINANCE", date: "Oct 20, 2023", status: "APPROVED" },
  { name: "Mugisha, Ivan", domain: "LAW", date: "Oct 20, 2023", status: "APPROVED" },
  { name: "Mugisha, Ivan", domain: "LAW", date: "Oct 20, 2023", status: "REJECTED" },
  { name: "Mugisha, Ivan", domain: "MISC.", date: "Oct 20, 2023", status: "APPROVED" },
  { name: "Mugisha, Ivan", domain: "FINANCE", date: "Oct 20, 2023", status: "APPROVED" },
  { name: "Mugisha, Ivan", domain: "MISC.", date: "Oct 20, 2023", status: "APPROVED" },
];

const ManageLeads = () => {
  const [activeTab, setActiveTab] = useState("MENTORS");

  const getDomainBadge = (domain) => {
    switch (domain) {
      case 'HEALTH': return 'border-[#a57ea9] text-[#a57ea9]';
      case 'FINANCE': return 'border-[#78a2a5] text-[#78a2a5]';
      case 'LAW': return 'border-[#996d54] text-[#996d54]';
      case 'MISC.': return 'border-gray-400 text-gray-500';
      default: return 'border-gray-200 text-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PENDING': 
        return (
          <span className="flex items-center gap-1 text-gray-400 font-bold text-[11px] tracking-wider uppercase">
            PENDING <Icon icon="ph:clock-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case 'APPROVED': 
        return (
          <span className="flex items-center gap-1 text-green-600 font-bold text-[11px] tracking-wider uppercase">
            APPROVED <Icon icon="ph:check-circle-bold" className="w-3.5 h-3.5" />
          </span>
        );
      case 'REJECTED': 
        return (
          <span className="flex items-center gap-1 text-red-600 font-bold text-[11px] tracking-wider uppercase">
            REJECTED <Icon icon="ph:x-circle-bold" className="w-3.5 h-3.5" />
          </span>
        );
      default: 
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-secondary font-bold text-gray-800">Lead Management</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Technical Mentor Applications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Technical Mentor Applications</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900">42</h3>
          <div className="flex justify-between items-center mt-auto text-xs font-secondary text-gray-500">
            <div className="text-center"><span className="block mb-0.5">Law</span><span className="font-bold text-gray-900">18</span></div>
            <div className="text-center"><span className="block mb-0.5">Finance</span><span className="font-bold text-gray-900">14</span></div>
            <div className="text-center"><span className="block mb-0.5">Health</span><span className="font-bold text-gray-900">10</span></div>
          </div>
        </div>

        {/* Equipper Applications */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Equipper Applications</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900">128</h3>
          <div className="flex justify-between items-center mt-auto text-xs font-secondary text-gray-500">
            <div className="text-center"><span className="block mb-0.5">Central</span><span className="font-bold text-gray-900">56</span></div>
            <div className="text-center"><span className="block mb-0.5">Western</span><span className="font-bold text-gray-900">34</span></div>
            <div className="text-center"><span className="block mb-0.5">Northern</span><span className="font-bold text-gray-900">22</span></div>
            <div className="text-center"><span className="block mb-0.5">Eastern</span><span className="font-bold text-gray-900">16</span></div>
          </div>
        </div>

        {/* Total Submissions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Total Submissions</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900">14.2K</h3>
          <p className="mt-auto text-xs font-secondary text-gray-400">Applicants approved</p>
        </div>

        {/* Approved Partners */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-36">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Approved Partners</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900">5</h3>
          <p className="mt-auto text-xs font-secondary text-gray-400">Applicants approved</p>
        </div>
      </div>

      {/* Tabs and Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            className={`px-6 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
              activeTab === "MENTORS" 
                ? "bg-[#78a2a5] text-white" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("MENTORS")}
          >
            TECHNICAL MENTORS
          </button>
          <button 
            className={`px-6 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
              activeTab === "EQUIPPERS" 
                ? "bg-[#78a2a5] text-white" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab("EQUIPPERS")}
          >
            COMMUNITY EQUIPPERS
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Applicant Name</th>
                <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Domain</th>
                <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">LinkedIn</th>
                <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Submission Date</th>
                <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Status</th>
                <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mentorsData.map((mentor, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-gray-900 font-secondary">{mentor.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 text-[11px] font-bold font-secondary tracking-wider border rounded-full ${getDomainBadge(mentor.domain)}`}>
                      {mentor.domain}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <a href="#" className="text-gray-400 hover:text-brand-dark transition-colors inline-flex">
                      <Icon icon="ph:link-bold" className="w-4 h-4" />
                    </a>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary">{mentor.date}</td>
                  <td className="py-4 px-6">
                    {getStatusBadge(mentor.status)}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="bg-brand-lilac/10 text-brand-lilac hover:bg-brand-lilac hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold font-secondary">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageLeads;
