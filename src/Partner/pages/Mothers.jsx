import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useMothers, useMother, useSaveMother, usePartnerMe } from "../partnerQueries";
import {
  NEEDS, MARITAL_STATUSES, EDUCATION_LEVELS, DOMAIN_LABELS, REQUEST_STATUS, shortDate, inputClass, labelClass,
} from "../partnerOptions";

const FILTERS = [["", "All"], ["waiting", "Waiting for passbook"], ["INACTIVE", "Inactive"]];
const maritalLabel = Object.fromEntries(MARITAL_STATUSES);

const Field = ({ label, children, className = "" }) => (
  <div className={className}>
    <label className={labelClass}>{label}</label>
    {children}
  </div>
);

const MotherForm = ({ mother, onClose, onSaved }) => {
  const isEdit = !!mother;
  const { data: me } = usePartnerMe();
  const home = me?.member || {};
  const saveMother = useSaveMother();
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    fullName: mother?.fullName || "",
    phone: mother?.phone || "",
    nationalId: mother?.nationalId || "",
    dateOfBirth: mother?.dateOfBirth ? mother.dateOfBirth.slice(0, 10) : "",
    maritalStatus: mother?.maritalStatus || "",
    village: mother?.village || "",
    parish: mother?.parish ?? home.parish ?? "",
    subCounty: mother?.subCounty ?? home.subCounty ?? "",
    district: mother?.district ?? home.district ?? "",
    numberOfChildren: mother?.numberOfChildren ?? "",
    childrenAges: mother?.childrenAges || "",
    educationLevel: mother?.educationLevel || "",
    occupation: mother?.occupation || "",
    monthlyIncome: mother?.monthlyIncome || "",
    cooperativeGroup: mother?.cooperativeGroup || "",
    needs: mother?.needs || [],
    passbookNumber: mother?.passbookNumber || "",
    notes: mother?.notes || "",
    consent: mother?.consent || false,
  });
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));
  const toggleNeed = (need) => setForm((prev) => ({
    ...prev,
    needs: prev.needs.includes(need) ? prev.needs.filter((n) => n !== need) : [...prev.needs, need],
  }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.fullName.trim()) return setError("Enter her full name.");
    if (!form.consent) return setError("She must agree to her details being recorded. Tick the consent box.");
    try {
      const saved = await saveMother.mutateAsync({ ...(isEdit ? { id: mother.id } : {}), ...form });
      onSaved?.(saved);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center md:p-6">
      <form onSubmit={submit} className="bg-white w-full md:max-w-2xl max-h-[95vh] overflow-y-auto rounded-t-2xl md:rounded-2xl">
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold font-secondary text-gray-900">{isEdit ? `Edit ${mother.fullName}` : "Register a mother"}</h2>
          <button type="button" onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-800"><Icon icon="ph:x-bold" className="w-5 h-5" /></button>
        </div>

        <div className="p-5 space-y-6">
          <section className="space-y-3">
            <h3 className="text-sm font-bold font-secondary text-[#997B94]">About her</h3>
            <Field label="Full name *"><input className={inputClass} value={form.fullName} onChange={set("fullName")} autoFocus /></Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Phone"><input type="tel" className={inputClass} value={form.phone} onChange={set("phone")} placeholder="07..." /></Field>
              <Field label="National ID (NIN)"><input className={inputClass} value={form.nationalId} onChange={set("nationalId")} /></Field>
              <Field label="Date of birth"><input type="date" className={inputClass} value={form.dateOfBirth} onChange={set("dateOfBirth")} /></Field>
              <Field label="Marital status">
                <select className={inputClass} value={form.maritalStatus} onChange={set("maritalStatus")}>
                  <option value="">—</option>
                  {MARITAL_STATUSES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </Field>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold font-secondary text-[#997B94]">Where she lives</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Village / zone"><input className={inputClass} value={form.village} onChange={set("village")} /></Field>
              <Field label="Parish"><input className={inputClass} value={form.parish} onChange={set("parish")} /></Field>
              <Field label="Sub-county"><input className={inputClass} value={form.subCounty} onChange={set("subCounty")} /></Field>
              <Field label="District"><input className={inputClass} value={form.district} onChange={set("district")} /></Field>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold font-secondary text-[#997B94]">Family & livelihood</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Number of children"><input type="number" min="0" className={inputClass} value={form.numberOfChildren} onChange={set("numberOfChildren")} /></Field>
              <Field label="Children's ages"><input className={inputClass} value={form.childrenAges} onChange={set("childrenAges")} placeholder="e.g. 2, 5, 9" /></Field>
              <Field label="Education">
                <select className={inputClass} value={form.educationLevel} onChange={set("educationLevel")}>
                  <option value="">—</option>
                  {EDUCATION_LEVELS.map((level) => <option key={level}>{level}</option>)}
                </select>
              </Field>
              <Field label="Occupation / business"><input className={inputClass} value={form.occupation} onChange={set("occupation")} /></Field>
              <Field label="Monthly income (UGX)"><input className={inputClass} value={form.monthlyIncome} onChange={set("monthlyIncome")} placeholder="e.g. 150,000" /></Field>
              <Field label="Cooperative / savings group"><input className={inputClass} value={form.cooperativeGroup} onChange={set("cooperativeGroup")} /></Field>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-bold font-secondary text-[#997B94]">What support does she need?</h3>
            <div className="flex flex-wrap gap-2">
              {NEEDS.map((need) => (
                <button
                  type="button"
                  key={need}
                  onClick={() => toggleNeed(need)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold font-secondary border ${form.needs.includes(need) ? "bg-[#997B94] border-[#997B94] text-white" : "border-gray-200 text-gray-600"}`}
                >
                  {need}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Passbook number (if she has one)"><input className={inputClass} value={form.passbookNumber} onChange={set("passbookNumber")} /></Field>
            </div>
            <Field label="Notes"><textarea rows={3} className={inputClass} value={form.notes} onChange={set("notes")} /></Field>
          </section>

          <label className={`flex items-start gap-3 rounded-xl border p-4 cursor-pointer ${form.consent ? "border-[#22C55E]/40 bg-[#22C55E]/5" : "border-[#dca838]/40 bg-[#dca838]/5"}`}>
            <input type="checkbox" checked={form.consent} onChange={set("consent")} className="w-5 h-5 mt-0.5 accent-[#997B94]" />
            <span className="text-sm font-secondary text-gray-700">
              <strong>Consent *</strong> — I have explained to her that INSM will keep these details to support her, that only her equipper
              and INSM staff can see them, and she agreed.
            </span>
          </label>

          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3">{error}</p>}
        </div>

        <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button type="submit" disabled={saveMother.isPending} className="px-5 py-2.5 rounded-full bg-[#997B94] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50">
            {saveMother.isPending ? "Saving..." : isEdit ? "Save changes" : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

const MotherDetail = ({ id, onClose, onEdit }) => {
  const { data: mother, isLoading } = useMother(id);
  const saveMother = useSaveMother();

  const rows = mother ? [
    ["Phone", mother.phone], ["National ID", mother.nationalId], ["Date of birth", mother.dateOfBirth && shortDate(mother.dateOfBirth)],
    ["Marital status", maritalLabel[mother.maritalStatus] || mother.maritalStatus],
    ["Lives in", [mother.village, mother.parish, mother.subCounty, mother.district].filter(Boolean).join(", ")],
    ["Children", mother.numberOfChildren ? `${mother.numberOfChildren}${mother.childrenAges ? ` (ages ${mother.childrenAges})` : ""}` : null],
    ["Education", mother.educationLevel], ["Occupation", mother.occupation], ["Monthly income", mother.monthlyIncome],
    ["Cooperative group", mother.cooperativeGroup], ["Passbook", mother.passbookNumber ? `${mother.passbookNumber}${mother.passbookIssuedAt ? ` · issued ${shortDate(mother.passbookIssuedAt)}` : ""}` : mother.passbookIssuedAt ? `Issued ${shortDate(mother.passbookIssuedAt)}` : null],
    ["Registered", shortDate(mother.createdAt)],
  ] : [];

  const toggleStatus = () => saveMother.mutate({ id: mother.id, status: mother.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" });

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Mother</span>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-800"><Icon icon="ph:x-bold" className="w-5 h-5" /></button>
        </div>
        {isLoading || !mother ? (
          <div className="flex-1 flex items-center justify-center"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin text-[#997B94]" /></div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold font-secondary text-gray-900">{mother.fullName}</h2>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {mother.needs.map((n) => <span key={n} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#997B94]/10 text-[#916b94]">{n}</span>)}
                </div>
              </div>
              <button onClick={() => onEdit(mother)} className="px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700">Edit</button>
            </div>
            <dl className="divide-y divide-gray-100">
              {rows.filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="py-2 grid grid-cols-[130px_1fr] gap-3 text-sm font-secondary">
                  <dt className="text-gray-400">{label}</dt>
                  <dd className="text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
            {mother.notes && <p className="text-sm font-secondary text-gray-600 bg-gray-50 rounded-lg p-3 whitespace-pre-line">{mother.notes}</p>}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mentor support</h3>
                <Link to={`/terminal/support?new=1&mother=${mother.id}`} className="text-xs font-bold text-[#997B94]">+ Ask a mentor</Link>
              </div>
              {mother.supportRequests.length === 0 ? (
                <p className="text-sm font-secondary text-gray-400">No requests yet.</p>
              ) : mother.supportRequests.map((r) => (
                <div key={r.id} className="border border-gray-100 rounded-lg p-3 mb-2">
                  <p className="text-sm font-bold font-secondary text-gray-900">{r.subject}</p>
                  <p className="text-xs font-secondary text-gray-400">
                    {DOMAIN_LABELS[r.domain]} · {REQUEST_STATUS[r.status]?.label}{r.mentor ? ` · ${r.mentor.applicantName}` : ""}
                  </p>
                </div>
              ))}
            </div>

            <button onClick={toggleStatus} disabled={saveMother.isPending} className="text-xs font-bold text-gray-400 hover:text-gray-700">
              {mother.status === "ACTIVE" ? "Mark as inactive (moved away, left the programme)" : "Mark as active again"}
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

const Mothers = () => {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const filter = params.get("passbook") === "waiting" ? "waiting" : params.get("status") === "INACTIVE" ? "INACTIVE" : "";
  const { data: mothers = [], isLoading } = useMothers({
    ...(search.trim() ? { q: search.trim() } : {}),
    ...(filter === "waiting" ? { passbook: "waiting" } : {}),
    ...(filter === "INACTIVE" ? { status: "INACTIVE" } : {}),
  });
  const [editing, setEditing] = useState(null); // null | { mother?: object }
  const isCreating = params.get("new") === "1";
  const openId = params.get("open");

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };
  const setFilter = (key) => {
    const next = new URLSearchParams(params);
    next.delete("passbook"); next.delete("status");
    if (key === "waiting") next.set("passbook", "waiting");
    if (key === "INACTIVE") next.set("status", "INACTIVE");
    setParams(next, { replace: true });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold font-secondary text-gray-900">Mothers</h1>
          <p className="text-sm font-secondary text-gray-500">Single mothers you've registered in your parish.</p>
        </div>
        <button onClick={() => setParam("new", "1")} className="flex items-center gap-2 bg-[#997B94] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Icon icon="ph:user-plus-bold" className="w-4 h-4" /> Register
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Icon icon="ph:magnifying-glass-bold" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, village, NIN, passbook no." className="w-full pl-9 pr-3 py-2.5 rounded-full bg-white border border-gray-200 outline-none focus:border-[#997B94] text-sm font-secondary" />
        </div>
        {FILTERS.map(([key, label]) => (
          <button key={key || "all"} onClick={() => setFilter(key)} className={`px-4 py-2 rounded-full text-xs font-bold font-secondary ${filter === key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500"}`}>
            {label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin text-[#997B94]" /></div>
        ) : mothers.length === 0 ? (
          <p className="py-12 text-center text-sm font-secondary text-gray-400">
            {search || filter ? "No mothers match." : "No mothers registered yet."}
          </p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {mothers.map((m) => (
              <li key={m.id}>
                <button onClick={() => setParam("open", m.id)} className="w-full text-left px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold font-secondary ${m.status === "INACTIVE" ? "text-gray-400" : "text-gray-900"}`}>{m.fullName}</p>
                    <p className="text-xs font-secondary text-gray-400 truncate">
                      {[m.village, m.phone, m.numberOfChildren ? `${m.numberOfChildren} children` : null].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${m.passbookIssuedAt ? "bg-[#22C55E]/10 text-[#16A34A]" : "bg-[#dca838]/15 text-[#b8871f]"}`}>
                    {m.passbookIssuedAt ? "PASSBOOK" : "NO PASSBOOK"}
                  </span>
                  <Icon icon="ph:caret-right-bold" className="w-4 h-4 text-gray-300" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="text-xs font-secondary text-gray-400">{mothers.length} shown</p>

      {(isCreating || editing) && (
        <MotherForm
          key={editing?.mother?.id || "new"}
          mother={editing?.mother}
          onClose={() => { setEditing(null); setParam("new", null); }}
        />
      )}
      {openId && !editing && (
        <MotherDetail id={openId} onClose={() => setParam("open", null)} onEdit={(m) => setEditing({ mother: m })} />
      )}
    </div>
  );
};

export default Mothers;
