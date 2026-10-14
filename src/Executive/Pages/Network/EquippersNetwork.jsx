import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useNetwork } from "../../../store/tanstackStore/services/queries";
import UserAvatar from "../../components/UserAvatar";
import MemberDrawer from "./MemberDrawer";
import { FieldReportsPanel, SupportRequestsPanel, AnnouncementsPanel } from "./FieldOversight";
import {
  REGIONS, MEMBER_STATUS_STYLES, LEADERSHIP_LABELS, DOMAIN_LABELS, contactLinks, shortDate, titleCase,
} from "./networkOptions";

const TABS = [
  ["COMMUNITY_EQUIPPER", "Community Equippers"],
  ["TECHNICAL_MENTOR", "Technical Mentors"],
];

// Partner Terminal oversight
const FIELD_TABS = [
  ["REPORTS", "Handout reports", FieldReportsPanel],
  ["SUPPORT", "Mentor requests", SupportRequestsPanel],
  ["ANNOUNCEMENTS", "Announcements", AnnouncementsPanel],
];

const selectClass = "border border-gray-200 rounded-full px-3 py-1.5 text-[12px] font-secondary font-semibold text-gray-700 bg-white outline-none focus:border-[#997B94]";

const downloadCsv = (members, role) => {
  const isEquipper = role === "COMMUNITY_EQUIPPER";
  const header = isEquipper
    ? ["Name", "Phone", "Email", "Parish", "Sub-county", "District", "Region", "Leadership connection", "Status", "Joined", "Units facilitated", "Log entries"]
    : ["Name", "Phone", "Email", "Expertise", "LinkedIn", "Status", "Joined", "Log entries"];
  const rows = members.map((m) => (isEquipper
    ? [m.applicantName, m.phoneNumber, m.email, m.parish, m.subCounty, m.district, titleCase(m.region), LEADERSHIP_LABELS[m.leadershipConnection] || m.leadershipConnection, MEMBER_STATUS_STYLES[m.memberStatus]?.label, shortDate(m.joinedAt), m.facilitated.units, m.noteCount]
    : [m.applicantName, m.phoneNumber, m.email, DOMAIN_LABELS[m.domain], m.linkedInUrl, MEMBER_STATUS_STYLES[m.memberStatus]?.label, shortDate(m.joinedAt), m.noteCount]));
  const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((r) => r.map(escape).join(",")).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `${isEquipper ? "community-equippers" : "technical-mentors"}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const ContactIcons = ({ member }) => {
  const links = contactLinks(member);
  const stop = (e) => e.stopPropagation();
  return (
    <div className="flex items-center gap-1" onClick={stop}>
      {links.tel && <a href={links.tel} className="p-1.5 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100" title={member.phoneNumber}><Icon icon="ph:phone-bold" className="w-4 h-4" /></a>}
      {links.whatsapp && <a href={links.whatsapp} target="_blank" rel="noreferrer" className="p-1.5 rounded-full text-gray-400 hover:text-[#128C7E] hover:bg-[#25D366]/10" title="WhatsApp"><Icon icon="ph:whatsapp-logo-bold" className="w-4 h-4" /></a>}
      {links.mail && <a href={links.mail} className="p-1.5 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100" title={member.email}><Icon icon="ph:envelope-bold" className="w-4 h-4" /></a>}
    </div>
  );
};

const MemberRow = ({ member, onOpen }) => {
  const isEquipper = member.role === "COMMUNITY_EQUIPPER";
  const status = MEMBER_STATUS_STYLES[member.memberStatus] || MEMBER_STATUS_STYLES.ACTIVE;
  return (
    <li onClick={onOpen} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/70 cursor-pointer flex-wrap sm:flex-nowrap">
      <UserAvatar user={{ name: member.applicantName, email: member.email }} size={40} />
      <div className="flex-1 min-w-[180px]">
        <p className="text-sm font-bold font-secondary text-gray-900">{member.applicantName}</p>
        <p className="text-xs font-secondary text-gray-500 truncate">
          {isEquipper
            ? [member.parish, member.district, titleCase(member.region)].filter(Boolean).join(" · ") || "Location not given"
            : `${DOMAIN_LABELS[member.domain] || member.domain} mentor`}
        </p>
        <p className="text-[11px] font-secondary text-gray-400 mt-0.5">
          {isEquipper && member.leadershipConnection ? `${LEADERSHIP_LABELS[member.leadershipConnection] || member.leadershipConnection} · ` : ""}
          Joined {shortDate(member.joinedAt)}
          {member.lastActivityAt ? ` · last activity ${shortDate(member.lastActivityAt)}` : ""}
        </p>
      </div>
      {member.facilitated.units > 0 && (
        <span className="text-[11px] font-bold font-secondary text-[#b8871f] bg-[#dca838]/10 px-2.5 py-1 rounded-full whitespace-nowrap" title="Seed-a-Cooperative units facilitated">
          {member.facilitated.units.toLocaleString()} delivered
        </span>
      )}
      <ContactIcons member={member} />
      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${status.style}`}>{status.label}</span>
    </li>
  );
};

const CoveragePanel = ({ members, region, setRegion, district, setDistrict }) => {
  const byRegion = REGIONS.map((r) => [r, members.filter((m) => m.region === r)]);
  const max = Math.max(1, ...byRegion.map(([, list]) => list.length));
  const districts = useMemo(() => {
    const counts = new Map();
    members.filter((m) => !region || m.region === region).forEach((m) => {
      const key = m.district || "Unknown district";
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [members, region]);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5 self-start">
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider">Coverage by region</h3>
          {region && <button onClick={() => { setRegion(""); setDistrict(""); }} className="text-[11px] font-bold text-[#997B94] hover:underline">Clear</button>}
        </div>
        <ul className="space-y-2.5">
          {byRegion.map(([r, list]) => (
            <li key={r}>
              <button
                onClick={() => { setRegion(region === r ? "" : r); setDistrict(""); }}
                className={`w-full text-left rounded-lg px-2 py-1.5 transition-colors ${region === r ? "bg-[#997B94]/10" : "hover:bg-gray-50"}`}
              >
                <div className="flex justify-between text-sm font-secondary mb-1">
                  <span className="font-semibold text-gray-800">{titleCase(r)}</span>
                  <span className={list.length ? "font-bold text-gray-900" : "text-[#b8871f] text-xs font-bold flex items-center gap-1"}>
                    {list.length || <><Icon icon="ph:warning-bold" className="w-3.5 h-3.5" /> No equippers</>}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-[#997B94]" style={{ width: `${(list.length / max) * 100}%` }} />
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {districts.length > 0 && (
        <div>
          <h3 className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider mb-2">
            Districts{region ? ` in ${titleCase(region)}` : ""}
          </h3>
          <ul className="space-y-1">
            {districts.map(([name, count]) => (
              <li key={name}>
                <button
                  onClick={() => setDistrict(district === name ? "" : name)}
                  className={`w-full flex justify-between text-sm font-secondary rounded-md px-2 py-1 ${district === name ? "bg-[#997B94]/10 font-bold" : "hover:bg-gray-50"}`}
                >
                  <span className="text-gray-700">{name}</span>
                  <span className="text-gray-500">{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const EquippersNetwork = () => {
  const { data, isLoading } = useNetwork();
  const [tab, setTab] = useState("COMMUNITY_EQUIPPER");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [region, setRegion] = useState("");
  const [district, setDistrict] = useState("");
  const [domain, setDomain] = useState("");
  const [openId, setOpenId] = useState(null);

  const members = data?.members || [];
  const summary = data?.summary;
  const ofRole = members.filter((m) => m.role === tab);
  const term = search.trim().toLowerCase();
  const filtered = ofRole.filter((m) =>
    (!status || m.memberStatus === status)
    && (!term || [m.applicantName, m.email, m.phoneNumber, m.parish, m.district].some((v) => v?.toLowerCase().includes(term)))
    && (tab !== "COMMUNITY_EQUIPPER" || ((!region || m.region === region) && (!district || (m.district || "Unknown district") === district)))
    && (tab !== "TECHNICAL_MENTOR" || !domain || m.domain === domain));

  const ActiveFieldPanel = FIELD_TABS.find(([key]) => key === tab)?.[2];

  const switchTab = (key) => {
    setTab(key);
    setRegion(""); setDistrict(""); setDomain("");
  };

  const kpis = summary && [
    { title: "Active members", value: summary.active, subtitle: `${summary.withAccess} with terminal access${summary.joinedThisMonth ? ` · +${summary.joinedThisMonth} this month` : ""}`, icon: "ph:users-three-fill" },
    { title: "Community Equippers", value: summary.equippers, subtitle: `${Object.values(summary.equippersByRegion).filter(Boolean).length} of 4 regions · ${summary.mothersRegistered} mothers registered`, icon: "ph:house-line-fill" },
    { title: "Technical Mentors", value: summary.mentors, subtitle: Object.entries(summary.mentorsByDomain).filter(([, n]) => n).map(([d, n]) => `${DOMAIN_LABELS[d]} ${n}`).join(" · ") || "None yet", icon: "ph:graduation-cap-fill" },
    { title: "Coverage", value: `${summary.parishesCovered} parishes`, subtitle: `across ${summary.districtsCovered} district${summary.districtsCovered === 1 ? "" : "s"}`, icon: "ph:map-pin-fill" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-secondary font-bold text-gray-800">Equippers Network</h1>
          <p className="text-sm font-secondary text-gray-500">Approved Technical Mentors and Community Equippers from Join the Assignment.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => downloadCsv(filtered, tab)} disabled={!filtered.length} className="flex items-center gap-2 text-xs font-bold font-secondary text-gray-500 hover:text-gray-800 disabled:opacity-40">
            <Icon icon="ph:download-simple-bold" className="w-4 h-4" /> Export CSV
          </button>
          {summary?.pendingLeads > 0 && (
            <Link to="/executive/leads" className="flex items-center gap-2 bg-[#a57ea9] hover:bg-[#916b94] text-white px-5 py-2.5 rounded-full text-xs font-bold font-secondary">
              Review {summary.pendingLeads} pending lead{summary.pendingLeads === 1 ? "" : "s"} →
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {(kpis || Array.from({ length: 4 }, (_, i) => ({ title: i }))).map((kpi) => (
          <div key={kpi.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between min-h-[140px]">
            {isLoading ? (
              <div className="animate-pulse space-y-3"><div className="w-10 h-10 bg-gray-100 rounded-lg" /><div className="h-6 bg-gray-100 rounded w-1/2" /></div>
            ) : (
              <>
                <div className="w-10 h-10 rounded-lg bg-brand-lilac/10 flex items-center justify-center">
                  <Icon icon={kpi.icon} className="w-5 h-5 text-brand-lilac" />
                </div>
                <div className="mt-3">
                  <p className="text-sm font-secondary font-bold text-gray-700">{kpi.title}</p>
                  <h3 className="text-2xl font-primary font-bold text-gray-900">{kpi.value}</h3>
                  <p className="text-xs font-secondary text-gray-400 mt-0.5">{kpi.subtitle}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        {TABS.map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${tab === key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-800"}`}
          >
            {label} <span className="opacity-60 ml-1">{members.filter((m) => m.role === key).length}</span>
          </button>
        ))}
        <span className="w-px bg-gray-200 mx-1" />
        {FIELD_TABS.map(([key, label]) => (
          <button
            key={key}
            onClick={() => switchTab(key)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${tab === key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-800"}`}
          >
            {label}
            {key === "REPORTS" && summary?.pendingReports > 0 && (
              <span className="ml-1.5 bg-[#dca838] text-white rounded-full px-1.5 py-0.5 text-[10px]">{summary.pendingReports}</span>
            )}
          </button>
        ))}
      </div>

      {ActiveFieldPanel && <ActiveFieldPanel />}

      {TABS.some(([key]) => key === tab) && (
      <div className={`grid grid-cols-1 gap-6 ${tab === "COMMUNITY_EQUIPPER" ? "lg:grid-cols-[300px_1fr]" : ""}`}>
        {tab === "COMMUNITY_EQUIPPER" && (
          <CoveragePanel members={ofRole} region={region} setRegion={setRegion} district={district} setDistrict={setDistrict} />
        )}

        {tab === "TECHNICAL_MENTOR" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
              const count = ofRole.filter((m) => m.domain === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setDomain(domain === key ? "" : key)}
                  className={`bg-white rounded-xl border p-4 text-left transition-colors ${domain === key ? "border-[#997B94] ring-1 ring-[#997B94]" : "border-gray-100 hover:border-gray-300"}`}
                >
                  <p className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider">{label}</p>
                  <p className={`text-2xl font-primary font-bold ${count ? "text-gray-900" : "text-gray-300"}`}>{count}</p>
                </button>
              );
            })}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Icon icon="ph:magnifying-glass-bold" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={tab === "COMMUNITY_EQUIPPER" ? "Search name, phone, parish, district" : "Search name, email, phone"}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-gray-50 border border-transparent focus:border-[#997B94] focus:bg-white outline-none text-sm font-secondary"
              />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
              <option value="">All statuses</option>
              {Object.entries(MEMBER_STATUS_STYLES).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}
            </select>
            {(region || district || domain) && (
              <span className="text-[11px] font-bold font-secondary text-[#997B94] bg-[#997B94]/10 px-2.5 py-1 rounded-full flex items-center gap-1">
                {[titleCase(region), district, DOMAIN_LABELS[domain]].filter(Boolean).join(" · ")}
                <button onClick={() => { setRegion(""); setDistrict(""); setDomain(""); }} aria-label="Clear filter"><Icon icon="ph:x-bold" className="w-3 h-3" /></button>
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 text-brand-lilac animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-sm font-secondary text-gray-400">
              {ofRole.length === 0
                ? <>No approved {tab === "COMMUNITY_EQUIPPER" ? "equippers" : "mentors"} yet. Approve applications in <Link to="/executive/leads" className="underline">Leads</Link>.</>
                : "No members match these filters."}
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filtered.map((member) => <MemberRow key={member.id} member={member} onOpen={() => setOpenId(member.id)} />)}
            </ul>
          )}
        </div>
      </div>

      )}

      {openId && <MemberDrawer key={openId} memberId={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
};

export default EquippersNetwork;
