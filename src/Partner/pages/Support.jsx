import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../store/context/AuthContext";
import { useSupport, useCreateSupport, useUpdateSupport, useMothers } from "../partnerQueries";
import { DOMAINS, DOMAIN_LABELS, REQUEST_STATUS, shortDate, inputClass, labelClass } from "../partnerOptions";

const NewRequestForm = ({ initialMotherId, onClose }) => {
  const { data: mothers = [] } = useMothers({ status: "ACTIVE" });
  const createSupport = useCreateSupport();
  const [form, setForm] = useState({ domain: "", subject: "", details: "", motherId: initialMotherId || "" });
  const [error, setError] = useState(null);
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.domain) return setError("Choose the kind of help needed.");
    if (!form.subject.trim()) return setError("Describe what's needed in a sentence.");
    try {
      await createSupport.mutateAsync(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send request.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center md:p-6">
      <form onSubmit={submit} className="bg-white w-full md:max-w-lg max-h-[95vh] overflow-y-auto rounded-t-2xl md:rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-secondary text-gray-900">Ask a mentor</h2>
          <button type="button" onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-800"><Icon icon="ph:x-bold" className="w-5 h-5" /></button>
        </div>
        <div>
          <label className={labelClass}>Kind of help</label>
          <div className="grid grid-cols-2 gap-2">
            {DOMAINS.map(([key, label, icon]) => (
              <button
                type="button"
                key={key}
                onClick={() => setForm((prev) => ({ ...prev, domain: key }))}
                className={`flex items-center gap-2 px-3 py-3 rounded-lg border text-sm font-bold font-secondary ${form.domain === key ? "border-[#997B94] bg-[#997B94]/10 text-[#916b94]" : "border-gray-200 text-gray-600"}`}
              >
                <Icon icon={icon} className="w-5 h-5" /> {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>For which mother? (optional)</label>
          <select className={inputClass} value={form.motherId} onChange={set("motherId")}>
            <option value="">General / the whole group</option>
            {mothers.map((m) => <option key={m.id} value={m.id}>{m.fullName}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>What's needed</label>
          <input className={inputClass} value={form.subject} onChange={set("subject")} placeholder="e.g. Land dispute with her late husband's family" />
        </div>
        <div>
          <label className={labelClass}>Details (optional)</label>
          <textarea rows={4} className={inputClass} value={form.details} onChange={set("details")} />
        </div>
        {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3">{error}</p>}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button type="submit" disabled={createSupport.isPending} className="px-5 py-2.5 rounded-full bg-[#334b65] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50">
            {createSupport.isPending ? "Sending..." : "Send to mentors"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Mentor view of a request: take it, reply, resolve
const MentorActions = ({ request, isMine }) => {
  const updateSupport = useUpdateSupport();
  const [response, setResponse] = useState(request.response || "");

  const save = (changes) => updateSupport.mutate({ id: request.id, ...changes }, {
    onError: (err) => alert(err.response?.data?.message || "Failed to update request."),
  });

  if (!isMine) {
    return (
      <button onClick={() => save({ action: "take" })} disabled={updateSupport.isPending} className="mt-3 px-4 py-2 rounded-full bg-[#334b65] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50">
        I'll take this
      </button>
    );
  }
  if (request.status === "RESOLVED") return null;
  return (
    <div className="mt-3 space-y-2">
      <textarea rows={3} className={inputClass} value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Your advice or next steps (the equipper will see this)" />
      <div className="flex gap-2 justify-end">
        <button onClick={() => save({ response })} disabled={updateSupport.isPending} className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 text-xs font-bold">Save reply</button>
        <button onClick={() => save({ response, status: "RESOLVED" })} disabled={updateSupport.isPending} className="px-4 py-2 rounded-full bg-[#22C55E] text-white text-xs font-bold">Mark resolved</button>
      </div>
    </div>
  );
};

const Support = () => {
  const { user } = useAuth();
  const isMentor = user?.role === "MENTOR";
  const [params, setParams] = useSearchParams();
  const { data: requests = [], isLoading } = useSupport();
  const updateSupport = useUpdateSupport();
  const isCreating = !isMentor && params.get("new") === "1";
  const [tab, setTab] = useState("active");

  const visible = requests.filter((r) => (tab === "active" ? r.status !== "RESOLVED" : r.status === "RESOLVED"));

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold font-secondary text-gray-900">{isMentor ? "Support requests" : "Mentor help"}</h1>
          <p className="text-sm font-secondary text-gray-500">
            {isMentor ? "Requests from Community Equippers in your field of expertise." : "Ask a Technical Mentor for Legal, Finance or Health support."}
          </p>
        </div>
        {!isMentor && (
          <button onClick={() => setParams({ new: "1" }, { replace: true })} className="flex items-center gap-2 bg-[#334b65] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Icon icon="ph:plus-bold" className="w-4 h-4" /> Ask a mentor
          </button>
        )}
      </div>

      <div className="flex gap-2">
        {[["active", "Open"], ["resolved", "Resolved"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} className={`px-4 py-2 rounded-full text-xs font-bold font-secondary ${tab === key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500"}`}>
            {label} <span className="opacity-60">{requests.filter((r) => (key === "active" ? r.status !== "RESOLVED" : r.status === "RESOLVED")).length}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin text-[#997B94]" /></div>
      ) : visible.length === 0 ? (
        <p className="py-12 text-center text-sm font-secondary text-gray-400 bg-white rounded-xl border border-gray-100">Nothing here.</p>
      ) : (
        <ul className="space-y-3">
          {visible.map((r) => {
            const status = REQUEST_STATUS[r.status];
            const isMine = r.mentor?.id === user?.applicationId;
            return (
              <li key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold font-secondary text-[#916b94] uppercase tracking-wider">{DOMAIN_LABELS[r.domain]}</p>
                    <p className="text-sm font-bold font-secondary text-gray-900">{r.subject}</p>
                    <p className="text-xs font-secondary text-gray-400 mt-0.5">
                      {shortDate(r.createdAt)}
                      {isMentor && r.equipper && ` · from ${r.equipper.applicantName} (${[r.equipper.parish?.split(",")[0], r.equipper.district].filter(Boolean).join(", ")})`}
                      {!isMentor && r.mentor && ` · ${r.mentor.applicantName}`}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${status?.style}`}>{status?.label}</span>
                </div>

                {r.details && <p className="text-sm font-secondary text-gray-600 mt-2 whitespace-pre-line">{r.details}</p>}

                {r.mother && (
                  <div className="mt-2 text-xs font-secondary text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                    <strong>{r.mother.fullName}</strong>
                    {[r.mother.village, r.mother.phone, r.mother.numberOfChildren ? `${r.mother.numberOfChildren} children` : null].filter(Boolean).map((v) => ` · ${v}`)}
                  </div>
                )}

                {isMentor && r.equipper?.phoneNumber && (
                  <a href={`tel:${r.equipper.phoneNumber}`} className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-[#334b65]">
                    <Icon icon="ph:phone-bold" /> Call the equipper ({r.equipper.phoneNumber})
                  </a>
                )}

                {r.response && !isMentor && (
                  <div className="mt-3 border-l-4 border-[#78a2a5] pl-3">
                    <p className="text-xs font-bold font-secondary text-[#4d7a7d]">Mentor's reply</p>
                    <p className="text-sm font-secondary text-gray-700 whitespace-pre-line">{r.response}</p>
                    {r.mentor?.phoneNumber && <a href={`tel:${r.mentor.phoneNumber}`} className="text-xs font-bold text-[#4d7a7d]">Call {r.mentor.applicantName}</a>}
                  </div>
                )}

                {isMentor && <MentorActions request={r} isMine={isMine} />}
                {!isMentor && r.status !== "RESOLVED" && (
                  <button onClick={() => updateSupport.mutate({ id: r.id, status: "RESOLVED" })} className="mt-3 text-xs font-bold text-gray-400 hover:text-gray-700">
                    Mark as resolved
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {isCreating && <NewRequestForm initialMotherId={params.get("mother")} onClose={() => setParams({}, { replace: true })} />}
    </div>
  );
};

export default Support;
