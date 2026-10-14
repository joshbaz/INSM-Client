import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  useAddImpactEntry, useUpdateImpactEntry, useDeleteImpactEntry, useUploadPhoto,
} from "../../../store/tanstackStore/services/queries";
import { CURRENCIES, formatMoney, resolveImageUrl } from "../../../data/projectOptions";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#a57ea9] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const today = () => new Date().toISOString().slice(0, 10);

const convert = (amount, from, to, usdToUgx) => {
  if (from === to) return amount;
  return from === "USD" ? amount * usdToUgx : amount / usdToUgx;
};

export const ImpactModal = ({ project, entry, onClose }) => {
  const isEdit = !!entry;
  const addEntry = useAddImpactEntry();
  const updateEntry = useUpdateImpactEntry();
  const uploadPhoto = useUploadPhoto();
  const isSaving = addEntry.isPending || updateEntry.isPending;

  const [form, setForm] = useState({
    date: entry ? entry.date.slice(0, 10) : today(),
    title: entry?.title || "",
    note: entry?.note || "",
    mothersSupported: entry?.mothersSupported || "",
    saccosFunded: entry?.saccosFunded || "",
    capitalDeployed: entry?.capitalDeployed || "",
    currency: entry?.currency || project.currency,
    photo: entry?.photo || "",
    isPublic: entry ? entry.isPublic : true,
  });
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  // Raised minus deployed, plus this entry's own amount when editing, shown in the entry's currency
  const rate = project.usdToUgxRate;
  const ownAmount = entry ? convert(entry.capitalDeployed, entry.currency, project.currency, rate) : 0;
  const available = Math.max(project.impact.balance + ownAmount, 0);
  const availableInCurrency = convert(available, project.currency, form.currency, rate);
  const previousInCurrency = entry ? convert(entry.capitalDeployed, entry.currency, form.currency, rate) : 0;
  const requested = parseFloat(form.capitalDeployed) || 0;
  const overAvailable = requested > availableInCurrency + 0.01 && requested > previousInCurrency + 0.01;

  const handlePhoto = async (file) => {
    try {
      const photo = await uploadPhoto.mutateAsync({ file, caption: `${project.title} impact photo` });
      setForm((prev) => ({ ...prev, photo: `/photos/${photo.id}/view` }));
    } catch (err) {
      console.error("Photo upload failed", err);
      alert("Failed to upload photo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.title.trim()) {
      setError("Describe what happened.");
      return;
    }
    const payload = {
      ...form,
      mothersSupported: form.mothersSupported || 0,
      saccosFunded: form.saccosFunded || 0,
      capitalDeployed: form.capitalDeployed || 0,
    };
    try {
      if (isEdit) {
        await updateEntry.mutateAsync({ id: project.id, entryId: entry.id, ...payload });
      } else {
        await addEntry.mutateAsync({ id: project.id, ...payload });
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save impact entry.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]" onClick={isSaving ? undefined : onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 pointer-events-auto max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-secondary font-bold text-gray-900 mb-1">{isEdit ? "Edit impact entry" : "Record impact"}</h2>
          <p className="text-sm font-secondary text-gray-500 mb-6">
            Log what this project achieved. Figures are added to the project's totals; leave any that don't apply empty.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-[150px_1fr] gap-3">
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" className={inputClass} value={form.date} max={today()} onChange={set("date")} />
              </div>
              <div>
                <label className={labelClass}>What happened</label>
                <input className={inputClass} value={form.title} onChange={set("title")} placeholder="e.g. 4 sewing machines delivered" autoFocus />
              </div>
            </div>
            <div>
              <label className={labelClass}>Details (optional)</label>
              <textarea className={inputClass} rows={3} value={form.note} onChange={set("note")} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Mothers supported (+)</label>
                <input type="number" min="0" className={inputClass} value={form.mothersSupported} onChange={set("mothersSupported")} placeholder="0" />
              </div>
              <div>
                <label className={labelClass}>SACCOs funded (+)</label>
                <input type="number" min="0" className={inputClass} value={form.saccosFunded} onChange={set("saccosFunded")} placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-[1fr_110px] gap-3">
              <div>
                <label className={labelClass}>Capital deployed (+)</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  className={`${inputClass} ${overAvailable ? "border-[#EF4444] focus:border-[#EF4444]" : ""}`}
                  value={form.capitalDeployed}
                  onChange={set("capitalDeployed")}
                  placeholder="Money spent on the project"
                />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select className={inputClass} value={form.currency} onChange={set("currency")}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <p className={`col-span-2 -mt-1 text-xs font-secondary ${overAvailable ? "text-[#EF4444] font-bold" : "text-gray-400"}`}>
                Available to deploy: {formatMoney(availableInCurrency, form.currency)}
                {overAvailable && " — record the extra money as a contribution first."}
              </p>
            </div>

            <div>
              <label className={labelClass}>Photo (optional)</label>
              {form.photo ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <img src={resolveImageUrl(form.photo)} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, photo: "" }))}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-[#EF4444] flex items-center justify-center shadow hover:bg-white"
                    title="Remove photo"
                  >
                    <Icon icon="ph:x-bold" className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 w-full py-6 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400 hover:text-gray-600 cursor-pointer text-xs font-bold font-secondary">
                  {uploadPhoto.isPending ? (
                    <Icon icon="ph:spinner-gap-bold" className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Icon icon="ph:image-square-duotone" className="w-6 h-6" /> Upload photo
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" disabled={uploadPhoto.isPending} onChange={(e) => e.target.files[0] && handlePhoto(e.target.files[0])} />
                </label>
              )}
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isPublic} onChange={set("isPublic")} className="w-4 h-4 accent-[#a57ea9]" />
              <span className="text-sm font-secondary font-bold text-gray-800">Show as an update on the website</span>
            </label>
          </div>

          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mt-5">{error}</p>}

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} disabled={isSaving} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSaving || uploadPhoto.isPending || overAvailable} className="px-5 py-2.5 rounded-full bg-[#78a2a5] hover:bg-[#668f92] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              {isSaving ? "Saving..." : isEdit ? "Save changes" : "Record impact"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export const ImpactLog = ({ project, onEdit }) => {
  const deleteEntry = useDeleteImpactEntry();

  const handleDelete = async (entry) => {
    if (!window.confirm(`Delete the impact entry "${entry.title}"? Its figures will be removed from the project totals.`)) return;
    try {
      await deleteEntry.mutateAsync({ id: project.id, entryId: entry.id });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete impact entry.");
    }
  };

  const figure = (value) => (value ? <span className="font-bold text-gray-900">+{value.toLocaleString()}</span> : <span className="text-gray-300">—</span>);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {["Date", "What happened", "Mothers", "SACCOs", "Capital deployed", "Visibility", ""].map((heading, i) => (
              <th key={i} className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase whitespace-nowrap">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {project.impactEntries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50/50 transition-colors text-sm font-secondary align-top">
              <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                {new Date(entry.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
              </td>
              <td className="py-4 px-6">
                <div className="flex items-start gap-3">
                  {entry.photo && <img src={resolveImageUrl(entry.photo)} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                  <div>
                    <p className="font-bold text-gray-900">{entry.title}</p>
                    {entry.note && <p className="text-xs text-gray-400 mt-0.5 line-clamp-2 max-w-sm">{entry.note}</p>}
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">{figure(entry.mothersSupported)}</td>
              <td className="py-4 px-6">{figure(entry.saccosFunded)}</td>
              <td className="py-4 px-6 whitespace-nowrap">
                {entry.capitalDeployed ? <span className="font-bold text-gray-900">{formatMoney(entry.capitalDeployed, entry.currency)}</span> : <span className="text-gray-300">—</span>}
              </td>
              <td className="py-4 px-6">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${entry.isPublic ? "bg-[#22C55E]/10 text-[#16A34A]" : "bg-gray-100 text-gray-500"}`}>
                  {entry.isPublic ? "ON WEBSITE" : "INTERNAL"}
                </span>
              </td>
              <td className="py-4 px-6 text-right whitespace-nowrap">
                <button onClick={() => onEdit(entry)} className="p-2 text-gray-400 hover:text-gray-800 transition-colors" title="Edit entry">
                  <Icon icon="ph:pencil-simple-bold" className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(entry)} disabled={deleteEntry.isPending} className="p-2 text-gray-400 hover:text-[#EF4444] transition-colors disabled:opacity-50" title="Delete entry">
                  <Icon icon="ph:trash-bold" className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
          {project.impactEntries.length === 0 && (
            <tr>
              <td colSpan="7" className="py-10 text-center text-gray-400 font-secondary">No impact recorded yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
