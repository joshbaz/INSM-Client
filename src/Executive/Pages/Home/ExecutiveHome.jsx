import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { useExecutiveSummary, useTierImpact } from "../../../store/tanstackStore/services/queries";
import DeliveryModal from "../Capital/components/DeliveryModal";
import { useSocket } from "../../../store/context/SocketContext";
import { useAuth } from "../../../store/context/AuthContext";
import { formatMoney, resolveImageUrl } from "../../../data/projectOptions";
import { ProgressBar } from "../Projects/ManageProjects";

const shortcuts = [
  { name: "New project", icon: "ph:folder-plus-bold", bgColor: "bg-[#a57ea9]", to: "/executive/projects/new" },
  { name: "Write a blog", icon: "ph:pencil-line-bold", bgColor: "bg-[#78a2a5]", to: "/executive/blogs/new" },
  { name: "Seed-a-Coop tiers", icon: "ph:plant-bold", bgColor: "bg-[#c6859d]", to: "/executive/capital/seed-a-cooperative/tiers" },
  { name: "Review leads", icon: "ph:stack-bold", bgColor: "bg-[#334b65]", to: "/executive/leads" },
];

const LEAD_STATUS_STYLES = {
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  PENDING: "bg-yellow-100 text-yellow-700",
};

const greeting = () => {
  const hour = new Date().getHours();
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
};

const shortDate = (date) => new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const Panel = ({ title, action, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center gap-4">
      <h2 className="text-base font-secondary font-bold text-gray-800">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

const ViewAll = ({ to, label = "View all" }) => (
  <Link to={to} className="text-xs font-bold font-secondary text-[#a57ea9] hover:underline whitespace-nowrap">{label} →</Link>
);

const KpiCard = ({ title, value, label, icon, tag, setupLink, onRecord }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[160px]">
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center">
        <Icon icon={icon} className="w-5 h-5 text-brand-lilac" />
      </div>
      <div className="flex items-center gap-2">
        {tag && <span className="text-[10px] font-bold text-[#b8871f] bg-[#dca838]/10 px-2 py-1 rounded-full tracking-wide">{tag}</span>}
        {onRecord && (
          <button
            onClick={onRecord}
            className="text-[10px] font-bold text-white bg-[#a57ea9] hover:bg-[#916b94] px-2.5 py-1 rounded-full tracking-wide flex items-center gap-1 cursor-pointer"
          >
            <Icon icon="ph:plus-bold" className="w-3 h-3" /> RECORD
          </button>
        )}
      </div>
    </div>
    <div className="mt-4">
      <p className="text-sm font-secondary font-bold text-gray-700 mb-1">{title}</p>
      {setupLink ? (
        <Link to={setupLink} className="text-sm font-secondary font-bold text-[#a57ea9] hover:underline">Set up tracking →</Link>
      ) : (
        <h3 className="text-2xl font-primary font-bold text-gray-900">{value}</h3>
      )}
      <p className="text-xs font-secondary font-medium mt-1 text-gray-400">{label}</p>
    </div>
  </div>
);

const ExecutiveHome = () => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useExecutiveSummary();
  const { data: tierImpact = [] } = useTierImpact();
  const [recordingTierId, setRecordingTierId] = useState(null);
  const trackedTiers = tierImpact.filter((t) => t.impact.unitName);

  // Real-time refresh when new leads or metrics arrive
  useEffect(() => {
    if (!socket) return;
    const refresh = () => queryClient.invalidateQueries({ queryKey: ["executive-summary"] });
    const events = ["metrics_updated", "new_application", "application_status_updated", "new_article_published"];
    events.forEach((event) => socket.on(event, refresh));
    return () => events.forEach((event) => socket.off(event, refresh));
  }, [socket, queryClient]);

  if (isLoading || !data) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-40 animate-pulse">
              <div className="w-10 h-10 rounded-lg bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mt-6" />
              <div className="h-8 bg-gray-200 rounded w-3/4 mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { capital, projects, seed, recentPayments, recentImpact, leads } = data;
  const tiersLink = "/executive/capital/seed-a-cooperative/tiers";
  const unitCard = (figures, title, icon, fallbackUnit) => ({
    title,
    icon,
    value: figures?.totalDelivered.toLocaleString(),
    label: figures
      ? figures.awaitingUnits > 0
        ? `${figures.awaitingUnits.toLocaleString()} funded, waiting to be issued`
        : `via ${figures.title}`
      : `Set a "${fallbackUnit}" unit on a Seed-a-Coop tier`,
    tag: figures?.awaitingUnits > 0 ? `${figures.awaitingUnits} WAITING` : null,
    setupLink: figures ? null : tiersLink,
    onRecord: figures ? () => setRecordingTierId(figures.id) : null,
  });

  const kpis = [
    {
      title: "Capital Raised",
      icon: "ph:chart-line-up-fill",
      value: formatMoney(capital.receivedUsd, "USD"),
      label: `≈ ${formatMoney(capital.receivedUgx, "UGX")}${capital.openingUsd ? ` · incl. ${formatMoney(capital.openingUsd, "USD")} opening balances` : ""}`,
      tag: capital.pendingCount ? `${capital.pendingCount} PROCESSING` : null,
    },
    {
      title: "Capital Deployed",
      icon: "ph:money-wavy-fill",
      value: formatMoney(capital.deployedUsd, "USD"),
      label: capital.receivedUsd
        ? `${Math.round((capital.deployedUsd / capital.receivedUsd) * 100)}% of capital raised · across projects`
        : "Across projects",
    },
    unitCard(seed.passbooks, "Cooperative Passbooks", "ph:book-fill", "passbook"),
    unitCard(seed.parishes, "Active Parishes", "ph:map-pin-fill", "parish"),
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-xl font-secondary font-bold text-gray-800">
          {greeting()}{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-sm font-secondary text-gray-500">
          {new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          {leads.pendingCount > 0 && (
            <> · <Link to="/executive/leads" className="font-bold text-[#a57ea9] hover:underline">{leads.pendingCount} lead{leads.pendingCount === 1 ? "" : "s"} waiting for review</Link></>
          )}
          {data.pendingFieldReports > 0 && (
            <> · <Link to="/executive/network" className="font-bold text-[#a57ea9] hover:underline">{data.pendingFieldReports} handout report{data.pendingFieldReports === 1 ? "" : "s"} from the field</Link></>
          )}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => <KpiCard key={kpi.title} {...kpi} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          <Panel title="Projects needing funding" action={<ViewAll to="/executive/projects" label="All projects" />}>
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap gap-x-6 gap-y-1 text-xs font-secondary text-gray-500">
              <span><strong className="text-gray-800">{projects.mothersSupported.toLocaleString()}</strong> mothers supported</span>
              <span><strong className="text-gray-800">{projects.upcoming}</strong> upcoming</span>
              <span><strong className="text-gray-800">{projects.fullyFunded}</strong> fully funded</span>
              <span><strong className="text-gray-800">{projects.completed}</strong> completed</span>
            </div>
            <ul className="divide-y divide-gray-100">
              {projects.needingFunding.map((p) => (
                <li key={p.id}>
                  <Link to={`/executive/projects/${p.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/60 transition-colors">
                    <img src={resolveImageUrl(p.coverImage)} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 mb-1.5">
                        <p className="text-sm font-bold font-secondary text-gray-900 truncate">{p.title}</p>
                        <p className="text-xs font-secondary text-gray-500 whitespace-nowrap">
                          <strong className="text-gray-800">{formatMoney(p.raised, p.currency)}</strong>
                          {p.goalAmount ? ` of ${formatMoney(p.goalAmount, p.currency)}` : " raised"}
                        </p>
                      </div>
                      {p.goalAmount ? <ProgressBar progress={p.progress} /> : <p className="text-xs font-secondary text-gray-400">No funding goal set</p>}
                    </div>
                  </Link>
                </li>
              ))}
              {projects.needingFunding.length === 0 && (
                <li className="px-6 py-8 text-center text-sm text-gray-400 font-secondary">No upcoming projects are seeking funding.</li>
              )}
            </ul>
          </Panel>

          <Panel
            title="Recent leads"
            action={<ViewAll to="/executive/leads" label={leads.pendingCount ? `${leads.pendingCount} pending · View all` : "View all"} />}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Applicant", "Role", "Location", "Submitted", "Status"].map((h) => (
                      <th key={h} className="py-3 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {leads.recent.map((lead) => (
                    <tr key={lead.id} onClick={() => navigate("/executive/leads")} className="hover:bg-gray-50/60 transition-colors cursor-pointer">
                      <td className="py-3 px-6 text-sm font-bold text-gray-900 font-secondary">{lead.applicantName}</td>
                      <td className="py-3 px-6 text-sm text-gray-500 font-secondary capitalize">{lead.role.replace("_", " ").toLowerCase()}</td>
                      <td className="py-3 px-6 text-sm text-gray-500 font-secondary">{[lead.parish, lead.region].filter(Boolean).join(", ") || "—"}</td>
                      <td className="py-3 px-6 text-sm text-gray-500 font-secondary whitespace-nowrap">{shortDate(lead.submissionDate)}</td>
                      <td className="py-3 px-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${LEAD_STATUS_STYLES[lead.status]}`}>{lead.status}</span>
                      </td>
                    </tr>
                  ))}
                  {leads.recent.length === 0 && (
                    <tr><td colSpan="5" className="py-8 text-center text-gray-400 text-sm font-secondary">No leads yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-base font-secondary font-bold text-gray-800 px-1">Shortcuts</h2>
            <div className="grid grid-cols-2 gap-4">
              {shortcuts.map((shortcut) => (
                <Link
                  key={shortcut.name}
                  to={shortcut.to}
                  className={`${shortcut.bgColor} text-white rounded-xl p-5 aspect-[4/3] flex flex-col items-center justify-center text-center hover:opacity-90 transition-opacity shadow-sm`}
                >
                  <Icon icon={shortcut.icon} className="w-7 h-7 mb-3 opacity-90" />
                  <span className="text-[11px] font-bold font-secondary tracking-wide uppercase leading-snug">{shortcut.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Panel title="Recent money in" action={<ViewAll to="/executive/capital/programs" />}>
            <ul className="divide-y divide-gray-100">
              {recentPayments.map((p) => (
                <li key={p.id} className="px-6 py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold font-secondary text-gray-900 truncate">
                      {`${p.donorFirstName || ""} ${p.donorLastName || ""}`.trim() || "Anonymous"}
                    </p>
                    <p className="text-xs font-secondary text-gray-400 truncate">
                      {p.tierTitle || "Donation"} · {shortDate(p.createdAt)}{p.isManual ? " · manual" : ""}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold font-secondary text-gray-900">{formatMoney(p.amount, p.currency)}</p>
                    {p.status === "PENDING" && <p className="text-[10px] font-bold text-[#A0AAB4] tracking-widest">PROCESSING</p>}
                  </div>
                </li>
              ))}
              {recentPayments.length === 0 && <li className="px-6 py-6 text-center text-sm text-gray-400 font-secondary">No payments yet.</li>}
            </ul>
          </Panel>

          <Panel title="Latest impact">
            <ul className="divide-y divide-gray-100">
              {recentImpact.map((item) => (
                <li key={`${item.kind}-${item.id}`}>
                  <Link to={item.link} className="px-6 py-3 flex items-start gap-3 hover:bg-gray-50/60 transition-colors">
                    <span className={`mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.kind === "seed" ? "bg-[#dca838]/10 text-[#b8871f]" : "bg-[#78a2a5]/15 text-[#4d7a7d]"}`}>
                      <Icon icon={item.kind === "seed" ? "ph:book-open-bold" : "ph:plant-bold"} className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold font-secondary text-gray-900">{item.title}</p>
                      <p className="text-xs font-secondary text-gray-400 truncate">
                        {item.source} · {shortDate(item.date)}{item.detail ? ` · ${item.detail}` : ""}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
              {recentImpact.length === 0 && (
                <li className="px-6 py-6 text-center text-sm text-gray-400 font-secondary">
                  Nothing recorded yet. Use "Record impact" on a project or "Record" on a Seed-a-Coop tier.
                </li>
              )}
            </ul>
          </Panel>
        </div>
      </div>

      {recordingTierId && trackedTiers.length > 0 && (
        <DeliveryModal tiers={trackedTiers} initialTierId={recordingTierId} onClose={() => setRecordingTierId(null)} />
      )}
    </div>
  );
};

export default ExecutiveHome;
