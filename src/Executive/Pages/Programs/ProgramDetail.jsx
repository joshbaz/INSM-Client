import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useManagedProgram, useDeleteProgram, useAddProgramContribution, useDeleteProgramContribution,
} from "../../../store/tanstackStore/services/queries";
import { getManagedProgram } from "../../../store/tanstackStore/services/api";
import { formatMoney, PAYMENT_METHODS, PROGRAM_FREQUENCY_LABELS } from "../../../data/projectOptions";
import ProgramFormModal from "./ProgramFormModal";
import { ProgressRow } from "./ManagePrograms";

const LIMIT = 15;
const FILTERS = [["", "All"], ["once", "One-time"], ["weekly", "Weekly"], ["monthly", "Monthly"]];
const STATUS = {
  SUCCESS: ["SETTLED", "text-[#22C55E]", "ph:check-circle-bold"],
  PENDING: ["PROCESSING", "text-[#A0AAB4]", "ph:arrows-clockwise-bold"],
  FAILED: ["FAILED", "text-[#EF4444]", "ph:x-circle-bold"],
};

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";
const today = () => new Date().toISOString().slice(0, 10);

// Older payments have no frequency stored; recurring ones were monthly
const frequencyOf = (p) => p.frequency || (p.type === "RECURRING" ? "monthly" : "once");

const ContributionModal = ({ program, onClose }) => {
  const addContribution = useAddProgramContribution();
  const [form, setForm] = useState({
    donorName: "", donorEmail: "", amount: program.amount || "", currency: program.currency || "USD",
    frequency: program.frequency || "once", paymentMethod: PAYMENT_METHODS[0], receivedAt: today(), note: "",
  });
  const [error, setError] = useState(null);
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!(parseFloat(form.amount) > 0)) return setError("Enter an amount greater than 0.");
    try {
      await addContribution.mutateAsync({ id: program.id, ...form });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to record contribution.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]" onClick={addContribution.isPending ? undefined : onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 pointer-events-auto max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-secondary font-bold text-gray-900 mb-1">Record a contribution</h2>
          <p className="text-sm font-secondary text-gray-500 mb-6">Money for {program.title} received outside PesaPal (cash, bank transfer, ...).</p>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_110px] gap-3">
              <div>
                <label className={labelClass}>Amount</label>
                <input type="number" min="0" step="any" className={inputClass} value={form.amount} onChange={set("amount")} autoFocus />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select className={inputClass} value={form.currency} onChange={set("currency")}>
                  <option>UGX</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={labelClass}>Type</label>
                <select className={inputClass} value={form.frequency} onChange={set("frequency")}>
                  {Object.entries(PROGRAM_FREQUENCY_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Method</label>
                <select className={inputClass} value={form.paymentMethod} onChange={set("paymentMethod")}>
                  {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" className={inputClass} value={form.receivedAt} max={today()} onChange={set("receivedAt")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Donor name</label>
                <input className={inputClass} value={form.donorName} onChange={set("donorName")} placeholder="Anonymous if empty" />
              </div>
              <div>
                <label className={labelClass}>Email (optional)</label>
                <input type="email" className={inputClass} value={form.donorEmail} onChange={set("donorEmail")} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Note / reference</label>
              <input className={inputClass} value={form.note} onChange={set("note")} />
            </div>
          </div>
          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mt-5">{error}</p>}
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} disabled={addContribution.isPending} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={addContribution.isPending} className="px-5 py-2.5 rounded-full bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold font-secondary tracking-widest uppercase disabled:opacity-50">
              {addContribution.isPending ? "Saving..." : "Record contribution"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Exports every payment for the current filter (fetched page by page)
const exportCsv = async (program, frequency) => {
  const rows = [];
  for (let page = 1; ; page++) {
    const data = await getManagedProgram(program.id, { page, limit: 100, ...(frequency ? { frequency } : {}) });
    rows.push(...data.payments);
    if (page >= data.pages) break;
  }
  const header = ["Date", "Donor", "Email", "Phone", "Amount", "Currency", "Type", "Method", "Source", "Status", "Reference"];
  const lines = rows.map((p) => [
    p.createdAt.slice(0, 10), `${p.donorFirstName || ""} ${p.donorLastName || ""}`.trim(), p.donorEmail || "", p.donorPhone || "",
    p.amount, p.currency, PROGRAM_FREQUENCY_LABELS[frequencyOf(p)], p.paymentMethod || "", p.isManual ? "Manual" : "PesaPal", p.status, p.orderTrackingId || "",
  ]);
  const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [header, ...lines].map((r) => r.map(escape).join(",")).join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `${(program.slug || program.id)}-payments.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const ProgramDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState("");
  const [page, setPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const { data: program, isLoading } = useManagedProgram(id, { page, limit: LIMIT, ...(frequency ? { frequency } : {}) });
  const deleteProgram = useDeleteProgram();
  const deleteContribution = useDeleteProgramContribution();

  if (isLoading && !program) {
    return (
      <div className="flex justify-center py-20">
        <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
      </div>
    );
  }
  if (!program) return <p className="text-center py-20 text-gray-500 font-secondary">Programme not found.</p>;

  const f = program.figures;
  const currency = program.currency || "USD";

  const handleDeleteProgram = async () => {
    if (!window.confirm(`Delete "${program.title}"? This can't be undone.`)) return;
    try {
      await deleteProgram.mutateAsync(program.id);
      navigate("/executive/capital/programs");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete programme.");
    }
  };

  const handleDeleteContribution = async (p) => {
    if (!window.confirm(`Delete the ${formatMoney(p.amount, p.currency)} contribution from ${`${p.donorFirstName || ""} ${p.donorLastName || ""}`.trim() || "Anonymous"}?`)) return;
    try {
      await deleteContribution.mutateAsync({ id: program.id, paymentId: p.id });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete contribution.");
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportCsv(program, frequency);
    } catch (err) {
      console.error("Export failed", err);
      alert("Failed to export payments.");
    } finally {
      setIsExporting(false);
    }
  };

  const cards = [
    { title: "Raised", value: formatMoney(f.raised, currency), subtitle: currency === "USD" ? `${f.donationCount} settled gifts` : `≈ ${formatMoney(f.raisedUsd, "USD")} · ${f.donationCount} settled gifts` },
    { title: "This month", value: formatMoney(f.raisedThisMonth, currency), subtitle: f.pendingCount ? `${f.pendingCount} still processing` : "Settled since the 1st" },
    { title: program.frequency && program.frequency !== "once" ? "Members" : "Donors", value: f.supporterCount.toLocaleString(), subtitle: program.goalSupporters ? `Goal: ${program.goalSupporters.toLocaleString()}` : "Unique donors" },
    { title: "Repeat supporters", value: f.recurringSupporters.toLocaleString(), subtitle: "Gave as weekly/monthly" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full">
      <div className="flex items-center gap-2 text-sm font-secondary font-medium text-[#A0AAB4]">
        <Link to="/executive/capital/programs" className="hover:text-brand-dark transition-colors text-[#997B94]">Programs</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3" />
        <span className="text-brand-dark font-semibold">{program.title}</span>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[28px] font-black font-albert text-brand-dark tracking-tight leading-none">{program.title}</h1>
          <p className="text-[#6B7280] text-[15px] font-medium font-secondary mt-2">
            {program.isBuiltIn
              ? program.description
              : `${program.allowCustomAmount ? "Suggested " : ""}${formatMoney(program.amount, currency)} · ${PROGRAM_FREQUENCY_LABELS[program.frequency]} · ${program.isPublished ? "On Seed Portals" : "Hidden from website"}`}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {!program.isBuiltIn && (
            <>
              <button onClick={handleDeleteProgram} disabled={deleteProgram.isPending} className="p-2.5 rounded-full border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/5 disabled:opacity-50" title="Delete programme">
                <Icon icon="ph:trash-bold" className="w-4 h-4" />
              </button>
              <button onClick={() => setIsEditing(true)} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase flex items-center gap-2">
                <Icon icon="ph:pencil-simple-bold" /> Edit
              </button>
            </>
          )}
          <button onClick={() => setIsRecording(true)} className="px-5 py-2.5 rounded-full bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold font-secondary tracking-widest uppercase flex items-center gap-2">
            <Icon icon="ph:plus-bold" /> Record contribution
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between min-h-[130px]">
            <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary">{card.title}</h3>
            <div className="mt-3">
              <div className="text-[26px] font-black font-albert tracking-tight leading-none mb-2">{card.value}</div>
              <p className="text-[13px] font-secondary font-medium text-brand-dark-400">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {(f.supporterProgress !== null || f.amountProgress !== null) && (
        <div className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm space-y-4">
          {f.supporterProgress !== null && <ProgressRow label={`${f.supporterCount.toLocaleString()} of ${program.goalSupporters.toLocaleString()} members`} value={f.supporterProgress} />}
          {f.amountProgress !== null && <ProgressRow label={`${formatMoney(f.raised, currency)} of ${formatMoney(program.goalAmount, currency)}`} value={f.amountProgress} />}
        </div>
      )}

      <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-6 py-3 border-b border-brand-dark-200/20 flex-wrap">
          <div className="flex gap-2">
            {FILTERS.map(([key, label]) => (
              <button
                key={key || "all"}
                onClick={() => { setFrequency(key); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-[12px] font-secondary font-semibold transition-colors ${frequency === key ? "bg-brand-dark text-white" : "bg-gray-100 text-brand-dark-400 hover:text-brand-dark"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <button onClick={handleExport} disabled={isExporting || !program.total} className="flex items-center gap-2 text-xs font-bold font-secondary text-gray-500 hover:text-gray-800 disabled:opacity-40">
            <Icon icon={isExporting ? "ph:spinner-gap-bold" : "ph:download-simple-bold"} className={`w-4 h-4 ${isExporting ? "animate-spin" : ""}`} /> Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-brand-dark-200/20">
                {["Date", "Donor", "Amount", "Type", "Method", "Status", ""].map((h, i) => (
                  <th key={i} className="py-4 px-6 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-dark-200/10">
              {program.payments.map((p) => {
                const [label, color, icon] = STATUS[p.status] || [p.status, "text-[#A0AAB4]"];
                return (
                  <tr key={p.id} className="text-[13px] font-secondary text-brand-dark">
                    <td className="py-4 px-6 text-brand-dark/70 whitespace-nowrap">{new Date(p.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold">{`${p.donorFirstName || ""} ${p.donorLastName || ""}`.trim() || "Anonymous"}</p>
                      {p.donorEmail && <p className="text-xs text-gray-400">{p.donorEmail}</p>}
                    </td>
                    <td className="py-4 px-6 font-bold whitespace-nowrap">{formatMoney(p.amount, p.currency)}</td>
                    <td className="py-4 px-6 text-brand-dark/70">{PROGRAM_FREQUENCY_LABELS[frequencyOf(p)]}</td>
                    <td className="py-4 px-6 text-brand-dark/70">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-2 ${p.isManual ? "bg-[#dca838]/10 text-[#b8871f]" : "bg-[#78a2a5]/15 text-[#4d7a7d]"}`}>
                        {p.isManual ? "MANUAL" : "PESAPAL"}
                      </span>
                      {p.paymentMethod || ""}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`flex items-center gap-1.5 font-bold text-[11px] tracking-widest ${color}`}>
                        {label} {icon && <Icon icon={icon} className="w-3.5 h-3.5" />}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {p.isManual && (
                        <button onClick={() => handleDeleteContribution(p)} disabled={deleteContribution.isPending} className="p-2 text-gray-400 hover:text-[#EF4444] disabled:opacity-50" title="Delete manual contribution">
                          <Icon icon="ph:trash-bold" className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
              {program.payments.length === 0 && (
                <tr><td colSpan="7" className="py-12 text-center text-[13px] text-brand-dark-400 font-secondary">No payments yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {program.total > LIMIT && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-brand-dark-200/20 text-[13px]">
            <span className="text-[#9BA1A6] font-medium">Page {program.currentPage} of {program.pages} · {program.total} payments</span>
            <div className="flex gap-2">
              <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 rounded-full border border-gray-200 font-bold text-gray-600 disabled:opacity-40">Previous</button>
              <button disabled={page >= program.pages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 rounded-full border border-gray-200 font-bold text-gray-600 disabled:opacity-40">Next</button>
            </div>
          </div>
        )}
      </div>

      {isEditing && <ProgramFormModal program={program} onClose={() => setIsEditing(false)} />}
      {isRecording && <ContributionModal program={program} onClose={() => setIsRecording(false)} />}
    </div>
  );
};

export default ProgramDetail;
