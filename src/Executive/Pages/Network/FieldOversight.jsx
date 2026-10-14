import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useFieldReports, useApproveFieldReport, useRejectFieldReport, useSupportRequests, useUpdateSupportRequest,
  useFieldAnnouncements, useSaveAnnouncement, useDeleteAnnouncement, useNetwork,
} from "../../../store/tanstackStore/services/queries";
import { resolveImageUrl } from "../../../data/projectOptions";
import { DOMAIN_LABELS, shortDate } from "./networkOptions";

const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
const pill = (active) => `px-4 py-1.5 rounded-full text-[12px] font-secondary font-semibold ${active ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-800"}`;

const STATUS_STYLES = {
  PENDING: "bg-[#dca838]/15 text-[#b8871f]",
  APPROVED: "bg-[#22C55E]/10 text-[#16A34A]",
  REJECTED: "bg-[#EF4444]/10 text-[#DC2626]",
  OPEN: "bg-[#dca838]/15 text-[#b8871f]",
  IN_PROGRESS: "bg-[#78a2a5]/15 text-[#4d7a7d]",
  RESOLVED: "bg-[#22C55E]/10 text-[#16A34A]",
};
const STATUS_LABELS = { IN_PROGRESS: "IN PROGRESS" };

const Empty = ({ children }) => <p className="py-12 text-center text-sm font-secondary text-gray-400">{children}</p>;
const Loading = () => <div className="flex justify-center py-12"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 text-brand-lilac animate-spin" /></div>;

// ── Handout reports from equippers ──

const ReportCard = ({ report }) => {
  const approve = useApproveFieldReport();
  const reject = useRejectFieldReport();
  const [quantity, setQuantity] = useState(report.quantity);
  const [note, setNote] = useState("");
  const [showNames, setShowNames] = useState(false);
  const unit = report.tier?.unitName || "unit";

  const doApprove = () => approve.mutate({ id: report.id, quantity, reviewNote: note }, {
    onError: (err) => alert(err.response?.data?.message || "Failed to approve."),
  });
  const doReject = () => {
    if (!note.trim()) return alert("Add a note explaining what to correct; the equipper will see it.");
    reject.mutate({ id: report.id, reviewNote: note }, { onError: (err) => alert(err.response?.data?.message || "Failed to return report.") });
  };

  return (
    <li className="p-5 space-y-3">
      <div className="flex items-start gap-4">
        {report.photo && (
          <a href={resolveImageUrl(report.photo)} target="_blank" rel="noreferrer">
            <img src={resolveImageUrl(report.photo)} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
          </a>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold font-secondary text-gray-900">
            {report.quantity} {unit}{report.quantity === 1 ? "" : "s"} · {report.tier?.title}
          </p>
          <p className="text-xs font-secondary text-gray-500">
            {report.equipper?.applicantName} · {report.parish || report.equipper?.parish?.split(",")[0] || "—"} · handed out {shortDate(report.date)} · sent {shortDate(report.createdAt)}
          </p>
          {report.note && <p className="text-sm font-secondary text-gray-700 mt-1">{report.note}</p>}
          {report.mothers.length > 0 && (
            <button onClick={() => setShowNames(!showNames)} className="text-xs font-bold text-[#997B94] mt-1">
              {report.mothers.length} named mother{report.mothers.length === 1 ? "" : "s"} {showNames ? "▲" : "▼"}
            </button>
          )}
          {showNames && (
            <ol className="text-xs font-mono text-gray-600 list-decimal pl-5 mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {report.mothers.map((m) => <li key={m.id}>{[m.fullName, m.phone, m.passbookNumber].filter(Boolean).join(", ")}</li>)}
            </ol>
          )}
          {report.reviewNote && report.status !== "PENDING" && <p className="text-xs font-secondary text-gray-500 mt-1">HQ note: {report.reviewNote}</p>}
        </div>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${STATUS_STYLES[report.status]}`}>{report.status}</span>
      </div>

      {report.status === "PENDING" && (
        <div className="flex items-end gap-2 flex-wrap bg-gray-50 rounded-lg p-3">
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity to count</label>
            <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className={`${inputClass} w-24`} />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Note to equipper (required to return)</label>
            <input value={note} onChange={(e) => setNote(e.target.value)} className={inputClass} placeholder="Optional when approving" />
          </div>
          <button onClick={doReject} disabled={reject.isPending || approve.isPending} className="px-4 py-2 rounded-full border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold disabled:opacity-50">Return</button>
          <button onClick={doApprove} disabled={approve.isPending || reject.isPending} className="px-4 py-2 rounded-full bg-[#22C55E] text-white text-xs font-bold disabled:opacity-50">
            {approve.isPending ? "Approving..." : "Approve & record"}
          </button>
        </div>
      )}
    </li>
  );
};

export const FieldReportsPanel = () => {
  const [status, setStatus] = useState("PENDING");
  const { data: reports = [], isLoading } = useFieldReports(status);
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-gray-100 flex-wrap">
        <div className="flex gap-2">
          {[["PENDING", "Waiting for review"], ["APPROVED", "Approved"], ["REJECTED", "Returned"], ["", "All"]].map(([key, label]) => (
            <button key={key || "all"} onClick={() => setStatus(key)} className={pill(status === key)}>{label}</button>
          ))}
        </div>
        <p className="text-xs font-secondary text-gray-400">Approving records the handout under <Link to="/executive/capital/seed-a-cooperative" className="underline">Seed-a-Cooperative</Link>.</p>
      </div>
      {isLoading ? <Loading /> : reports.length === 0 ? <Empty>No reports here.</Empty> : (
        <ul className="divide-y divide-gray-100">{reports.map((r) => <ReportCard key={r.id} report={r} />)}</ul>
      )}
    </div>
  );
};

// ── Mentor support requests ──

export const SupportRequestsPanel = () => {
  const [status, setStatus] = useState("OPEN");
  const { data: requests = [], isLoading } = useSupportRequests(status);
  const { data: network } = useNetwork();
  const update = useUpdateSupportRequest();
  const mentors = (network?.members || []).filter((m) => m.role === "TECHNICAL_MENTOR" && m.memberStatus === "ACTIVE");

  const assign = (request, mentorId) => update.mutate({ id: request.id, mentorId }, {
    onError: (err) => alert(err.response?.data?.message || "Failed to assign."),
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex gap-2 px-5 py-3 border-b border-gray-100 flex-wrap">
        {[["OPEN", "Waiting for a mentor"], ["IN_PROGRESS", "In progress"], ["RESOLVED", "Resolved"], ["", "All"]].map(([key, label]) => (
          <button key={key || "all"} onClick={() => setStatus(key)} className={pill(status === key)}>{label}</button>
        ))}
      </div>
      {isLoading ? <Loading /> : requests.length === 0 ? <Empty>No requests here.</Empty> : (
        <ul className="divide-y divide-gray-100">
          {requests.map((r) => {
            const suitable = mentors.filter((m) => m.domain === r.domain);
            const others = mentors.filter((m) => m.domain !== r.domain);
            return (
              <li key={r.id} className="p-5 flex items-start gap-4 flex-wrap">
                <div className="flex-1 min-w-[240px]">
                  <p className="text-xs font-bold font-secondary text-[#916b94] uppercase tracking-wider">{DOMAIN_LABELS[r.domain]}</p>
                  <p className="text-sm font-bold font-secondary text-gray-900">{r.subject}</p>
                  <p className="text-xs font-secondary text-gray-500">
                    From {r.equipper?.applicantName}{r.mother ? ` · for ${r.mother.fullName}` : ""} · {shortDate(r.createdAt)}
                  </p>
                  {r.details && <p className="text-sm font-secondary text-gray-600 mt-1 whitespace-pre-line">{r.details}</p>}
                  {r.response && <p className="text-sm font-secondary text-gray-700 mt-2 border-l-4 border-[#78a2a5] pl-3">{r.response}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${STATUS_STYLES[r.status]}`}>{STATUS_LABELS[r.status] || r.status}</span>
                  {r.status !== "RESOLVED" && (
                    <select
                      value={r.mentor?.id || ""}
                      onChange={(e) => assign(r, e.target.value || null)}
                      disabled={update.isPending}
                      className="border border-gray-200 rounded-full px-3 py-1.5 text-[12px] font-secondary text-gray-700 bg-white"
                    >
                      <option value="">{r.mentor ? "Unassign" : "Assign a mentor…"}</option>
                      {suitable.length > 0 && <optgroup label={`${DOMAIN_LABELS[r.domain]} mentors`}>{suitable.map((m) => <option key={m.id} value={m.id}>{m.applicantName}</option>)}</optgroup>}
                      {others.length > 0 && <optgroup label="Other mentors">{others.map((m) => <option key={m.id} value={m.id}>{m.applicantName} ({DOMAIN_LABELS[m.domain]})</option>)}</optgroup>}
                    </select>
                  )}
                  {r.mentor && r.status === "RESOLVED" && <span className="text-xs font-secondary text-gray-400">by {r.mentor.applicantName}</span>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// ── Announcements & resources ──

const AnnouncementForm = ({ announcement, onDone }) => {
  const save = useSaveAnnouncement();
  const [form, setForm] = useState({
    title: announcement?.title || "", body: announcement?.body || "", link: announcement?.link || "",
    audience: announcement?.audience || "ALL", isPinned: announcement?.isPinned || false,
  });
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    try {
      await save.mutateAsync({ ...(announcement ? { id: announcement.id } : {}), ...form });
      onDone();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save announcement.");
    }
  };
  return (
    <form onSubmit={submit} className="p-5 space-y-3 bg-gray-50 border-b border-gray-100">
      <input className={inputClass} value={form.title} onChange={set("title")} placeholder="Title" autoFocus />
      <textarea className={inputClass} rows={4} value={form.body} onChange={set("body")} placeholder="Message to equippers and/or mentors" />
      <input className={inputClass} value={form.link} onChange={set("link")} placeholder="Link to a resource (optional), e.g. a Google Drive training guide" />
      <div className="flex items-center gap-4 flex-wrap">
        <select className={`${inputClass} w-auto`} value={form.audience} onChange={set("audience")}>
          <option value="ALL">Everyone</option>
          <option value="EQUIPPERS">Community Equippers</option>
          <option value="MENTORS">Technical Mentors</option>
        </select>
        <label className="flex items-center gap-2 text-sm font-secondary text-gray-700">
          <input type="checkbox" checked={form.isPinned} onChange={set("isPinned")} className="accent-[#997B94]" /> Pin to the top
        </label>
        <div className="flex-1" />
        <button type="button" onClick={onDone} className="px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-600">Cancel</button>
        <button type="submit" disabled={save.isPending || !form.title.trim() || !form.body.trim()} className="px-4 py-1.5 rounded-full bg-[#997B94] text-white text-xs font-bold disabled:opacity-40">
          {save.isPending ? "Posting..." : announcement ? "Save" : "Post"}
        </button>
      </div>
    </form>
  );
};

export const AnnouncementsPanel = () => {
  const { data: announcements = [], isLoading } = useFieldAnnouncements();
  const remove = useDeleteAnnouncement();
  const [editing, setEditing] = useState(null); // null | { announcement?: object }
  const audienceLabel = { ALL: "Everyone", EQUIPPERS: "Equippers", MENTORS: "Mentors" };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
        <p className="text-sm font-secondary text-gray-500">Shown on the Partner Terminal home and Announcements page.</p>
        {!editing && (
          <button onClick={() => setEditing({})} className="flex items-center gap-1.5 bg-[#a57ea9] text-white px-4 py-2 rounded-full text-xs font-bold">
            <Icon icon="ph:plus-bold" /> New announcement
          </button>
        )}
      </div>
      {editing && <AnnouncementForm announcement={editing.announcement} onDone={() => setEditing(null)} />}
      {isLoading ? <Loading /> : announcements.length === 0 ? <Empty>No announcements yet.</Empty> : (
        <ul className="divide-y divide-gray-100">
          {announcements.map((a) => (
            <li key={a.id} className="p-5 flex items-start gap-3 group">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-secondary text-gray-400">
                  {a.isPinned && "📌 "}{audienceLabel[a.audience]} · {shortDate(a.createdAt)}{a.createdByName ? ` · ${a.createdByName}` : ""}
                </p>
                <p className="text-sm font-bold font-secondary text-gray-900">{a.title}</p>
                <p className="text-sm font-secondary text-gray-600 whitespace-pre-line line-clamp-3">{a.body}</p>
                {a.link && <a href={a.link} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#997B94] hover:underline">{a.link}</a>}
              </div>
              <button onClick={() => setEditing({ announcement: a })} className="p-1.5 text-gray-300 hover:text-gray-700" title="Edit"><Icon icon="ph:pencil-simple-bold" className="w-4 h-4" /></button>
              <button
                onClick={() => window.confirm("Delete this announcement?") && remove.mutate(a.id)}
                className="p-1.5 text-gray-300 hover:text-[#EF4444]"
                title="Delete"
              >
                <Icon icon="ph:trash-bold" className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
