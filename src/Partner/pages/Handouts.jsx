import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useReports, useCreateReport, useWithdrawReport, usePartnerTiers, useMothers } from "../partnerQueries";
import { useUploadPhoto } from "../../store/tanstackStore/services/queries";
import { resolveImageUrl } from "../../data/projectOptions";
import { REPORT_STATUS, shortDate, today, inputClass, labelClass } from "../partnerOptions";

const ReportForm = ({ onClose }) => {
  const { data: tiers = [] } = usePartnerTiers();
  const { data: mothers = [] } = useMothers({ status: "ACTIVE" });
  const createReport = useCreateReport();
  const uploadPhoto = useUploadPhoto();
  const [tierId, setTierId] = useState("");
  const [date, setDate] = useState(today());
  const [selected, setSelected] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const tier = tiers.find((t) => t.id === tierId) || tiers[0];
  const isPassbook = /passbook/i.test(tier?.unitName || "");

  // Mothers still waiting for a passbook first
  const sorted = useMemo(() => {
    const term = search.trim().toLowerCase();
    return mothers
      .filter((m) => !term || [m.fullName, m.village, m.phone].some((v) => v?.toLowerCase().includes(term)))
      .sort((a, b) => (!!a.passbookIssuedAt - !!b.passbookIssuedAt) || a.fullName.localeCompare(b.fullName));
  }, [mothers, search]);

  const toggle = (id) => setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const count = parseInt(quantity) || selected.length;

  const handlePhoto = async (file) => {
    try {
      const uploaded = await uploadPhoto.mutateAsync({ file, caption: "Field handout photo" });
      setPhoto(`/photos/${uploaded.id}/view`);
    } catch {
      setError("Photo upload failed. Try again or continue without it.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!tier) return setError("HQ hasn't set up anything to report yet.");
    if (!(count > 0)) return setError("Select the mothers who received them, or enter how many were handed out.");
    try {
      await createReport.mutateAsync({ tierId: tier.id, date, motherIds: selected, quantity: count, note, photo });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send report.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center md:p-6">
      <form onSubmit={submit} className="bg-white w-full md:max-w-xl max-h-[95vh] overflow-y-auto rounded-t-2xl md:rounded-2xl">
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold font-secondary text-gray-900">Report a handout</h2>
          <button type="button" onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-800"><Icon icon="ph:x-bold" className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>What was handed out</label>
              <select className={inputClass} value={tier?.id || ""} onChange={(e) => setTierId(e.target.value)}>
                {tiers.map((t) => <option key={t.id} value={t.id}>{t.unitName}s ({t.title})</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Date</label>
              <input type="date" className={inputClass} value={date} max={today()} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Who received them ({selected.length} selected)</label>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your mothers" className={`${inputClass} mb-2`} />
            <ul className="max-h-60 overflow-y-auto border border-gray-100 rounded-lg divide-y divide-gray-100">
              {sorted.length === 0 && <li className="px-3 py-4 text-sm text-gray-400 font-secondary">No mothers registered yet. You can still enter a number below.</li>}
              {sorted.map((m) => (
                <li key={m.id}>
                  <label className="flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-gray-50">
                    <input type="checkbox" checked={selected.includes(m.id)} onChange={() => toggle(m.id)} className="w-4 h-4 accent-[#997B94]" />
                    <span className="flex-1 text-sm font-secondary text-gray-800">{m.fullName}<span className="text-xs text-gray-400"> · {m.village || "—"}</span></span>
                    {isPassbook && m.passbookIssuedAt && <span className="text-[10px] font-bold text-[#16A34A]">HAS ONE</span>}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>How many</label>
              <input type="number" min="1" className={inputClass} value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder={selected.length ? String(selected.length) : "0"} />
            </div>
            <div>
              <label className={labelClass}>Photo (optional)</label>
              {photo ? (
                <div className="relative h-[42px] rounded-lg overflow-hidden">
                  <img src={resolveImageUrl(photo)} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setPhoto("")} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-[#EF4444] flex items-center justify-center"><Icon icon="ph:x-bold" className="w-3 h-3" /></button>
                </div>
              ) : (
                <label className="h-[42px] flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 text-xs font-bold text-gray-400 cursor-pointer">
                  {uploadPhoto.isPending ? <Icon icon="ph:spinner-gap-bold" className="w-4 h-4 animate-spin" /> : <><Icon icon="ph:camera-bold" className="w-4 h-4" /> Add photo</>}
                  <input type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => e.target.files[0] && handlePhoto(e.target.files[0])} />
                </label>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Note (optional)</label>
            <textarea rows={2} className={inputClass} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Issued at the parish meeting in Kiwatule" />
          </div>

          <p className="text-xs font-secondary text-gray-500 bg-gray-50 rounded-lg p-3">
            HQ will review this report. Once approved, it counts toward {tier?.title || "the programme"} and the mothers you selected are marked as having received them.
          </p>
          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3">{error}</p>}
        </div>
        <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-wider">Cancel</button>
          <button type="submit" disabled={createReport.isPending || uploadPhoto.isPending} className="px-5 py-2.5 rounded-full bg-[#78a2a5] text-white text-xs font-bold uppercase tracking-wider disabled:opacity-50">
            {createReport.isPending ? "Sending..." : `Send report${count ? ` (${count})` : ""}`}
          </button>
        </div>
      </form>
    </div>
  );
};

const Handouts = () => {
  const [params, setParams] = useSearchParams();
  const { data: reports = [], isLoading } = useReports();
  const withdraw = useWithdrawReport();
  const isCreating = params.get("new") === "1";
  const setCreating = (open) => setParams(open ? { new: "1" } : {}, { replace: true });

  const handleWithdraw = async (report) => {
    if (!window.confirm("Withdraw this report?")) return;
    try {
      await withdraw.mutateAsync(report.id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to withdraw.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-xl font-bold font-secondary text-gray-900">Handouts</h1>
          <p className="text-sm font-secondary text-gray-500">Report passbooks and other items you've handed out. HQ approves each report.</p>
        </div>
        <button onClick={() => setCreating(true)} className="flex items-center gap-2 bg-[#78a2a5] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <Icon icon="ph:plus-bold" className="w-4 h-4" /> Report a handout
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-12"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin text-[#997B94]" /></div>
        ) : reports.length === 0 ? (
          <p className="py-12 text-center text-sm font-secondary text-gray-400">No reports yet.</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {reports.map((r) => {
              const status = REPORT_STATUS[r.status];
              return (
                <li key={r.id} className="px-5 py-4 flex items-start gap-3">
                  {r.photo && <img src={resolveImageUrl(r.photo)} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold font-secondary text-gray-900">
                      {r.quantity} {r.tier?.unitName}{r.quantity === 1 ? "" : "s"}
                      <span className="font-normal text-gray-400"> · {shortDate(r.date)}</span>
                    </p>
                    <p className="text-xs font-secondary text-gray-500">{r.motherIds.length ? `${r.motherIds.length} named mother${r.motherIds.length === 1 ? "" : "s"}` : "No names attached"}{r.note ? ` · ${r.note}` : ""}</p>
                    {r.reviewNote && <p className="text-xs font-secondary mt-1 text-gray-700 bg-gray-50 rounded px-2 py-1">HQ: {r.reviewNote}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${status?.style}`}>{status?.label}</span>
                    {r.status === "PENDING" && (
                      <button onClick={() => handleWithdraw(r)} className="text-[11px] font-bold text-gray-400 hover:text-[#EF4444]">Withdraw</button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {isCreating && <ReportForm onClose={() => setCreating(false)} />}
    </div>
  );
};

export default Handouts;
