import React, { useEffect, useMemo } from "react";
import { Icon } from "@iconify/react";
import { useMetrics, useApplications } from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";

const shortcuts = [
  { name: "CAPITAL INVESTMENTS", icon: "ph:money-bold", bgColor: "bg-[#a57ea9]" },
  { name: "EQUIPPERS NETWORK", icon: "ph:graph-bold", bgColor: "bg-[#78a2a5]" },
  { name: "TECHNICAL MENTORS", icon: "ph:users-three-bold", bgColor: "bg-[#c6859d]" },
  { name: "CONTENT MANAGEMENT", icon: "ph:article-bold", bgColor: "bg-[#334b65]" },
];

const ExecutiveHome = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const { data: metricsData, isLoading: isLoadingMetrics } = useMetrics();
  const { data: applicationsData, isLoading: isLoadingApps } = useApplications();

  // Socket listeners for real-time updates
  useEffect(() => {
    if (!socket) return;

    const handleMetricsUpdate = () => queryClient.invalidateQueries({ queryKey: ["metrics"] });
    const handleAppsUpdate = () => queryClient.invalidateQueries({ queryKey: ["applications"] });

    socket.on("metrics_updated", handleMetricsUpdate);
    socket.on("new_application", handleAppsUpdate);
    socket.on("application_status_updated", handleAppsUpdate);

    return () => {
      socket.off("metrics_updated", handleMetricsUpdate);
      socket.off("new_application", handleAppsUpdate);
      socket.off("application_status_updated", handleAppsUpdate);
    };
  }, [socket, queryClient]);

  const kpiData = useMemo(() => {
    if (!metricsData) return [];

    const getMetric = (key) => {
      const m = metricsData.systemMetrics?.find((sm) => sm.key === key);
      return m ? m.value : "0";
    };

    return [
      {
        title: "Total Capital Deployed",
        value: `UGX ${getMetric("CAPITAL_DEPLOYED")}`,
        label: "Capital invested in the Network",
        icon: "ph:money-wavy-fill",
        iconColor: "text-brand-lilac"
      },
      {
        title: "Cooperative Passbooks",
        value: getMetric("PASSBOOKS"),
        label: "Women registered",
        icon: "ph:book-fill",
        iconColor: "text-brand-lilac"
      },
      {
        title: "Active Parishes",
        value: getMetric("PARISHES"),
        label: "Geographic coverage (Uganda)",
        icon: "ph:map-pin-fill",
        iconColor: "text-brand-lilac"
      },
      {
        title: "Total Capital Received",
        value: `UGX ${metricsData.totalCapitalReceived.toLocaleString()}`,
        label: "Aggregated from successful payments",
        labelColor: "text-green-600",
        icon: "ph:chart-line-up-fill",
        iconColor: "text-brand-lilac",
        tag: "LIVE"
      }
    ];
  }, [metricsData]);

  const recentLeads = applicationsData ? applicationsData.slice(0, 5) : [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoadingMetrics ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-40 animate-pulse flex flex-col justify-between">
               <div className="w-10 h-10 rounded-lg bg-gray-200"></div>
               <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
               <div className="h-8 bg-gray-200 rounded w-3/4 mt-2"></div>
            </div>
          ))
        ) : (
          kpiData.map((kpi, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-40">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center">
                  <Icon icon={kpi.icon} className={`w-5 h-5 ${kpi.iconColor}`} />
                </div>
                {kpi.tag && (
                  <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full tracking-wide">
                    {kpi.tag}
                  </span>
                )}
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-secondary font-bold text-gray-700 mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-primary font-bold text-gray-900">{kpi.value}</h3>
                <p className={`text-xs font-secondary font-medium mt-1 ${kpi.labelColor || 'text-gray-400'}`}>
                  {kpi.label}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-secondary font-bold text-gray-800">Recent Leads</h2>
            {isLoadingApps && <div className="text-xs text-gray-400 animate-pulse">Live updating...</div>}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Applicant Name</th>
                  <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Role</th>
                  <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Submission Date</th>
                  <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentLeads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-bold text-gray-900 font-secondary">{lead.applicantName}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary">{lead.role.replace('_', ' ')}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary">
                      {new Date(lead.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        lead.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        lead.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {!isLoadingApps && recentLeads.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-gray-400 text-sm font-secondary">
                      No recent leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Shortcuts */}
        <div className="space-y-4">
          <h2 className="text-lg font-secondary font-bold text-gray-800 px-1">System shortcuts</h2>
          <div className="grid grid-cols-2 gap-4">
            {shortcuts.map((shortcut, idx) => (
              <button 
                key={idx} 
                className={`${shortcut.bgColor} text-white rounded-xl p-6 aspect-square flex flex-col items-center justify-center text-center hover:opacity-90 transition-opacity shadow-sm`}
              >
                <Icon icon={shortcut.icon} className="w-8 h-8 mb-4 opacity-90" />
                <span className="text-xs font-bold font-secondary tracking-wide uppercase leading-snug">
                  {shortcut.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveHome;
