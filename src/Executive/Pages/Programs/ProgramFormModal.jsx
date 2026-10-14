import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useCreateProgram, useUpdateProgram } from "../../../store/tanstackStore/services/queries";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const COLORS = [
  ["lilac", "bg-brand-lilac"],
  ["teal", "bg-brand-teal"],
  ["gold", "bg-brand-gold"],
  ["brown", "bg-brand-brown"],
];

const Field = ({ label, hint, children, className = "" }) => (
  <div className={className}>
    <label className={labelClass}>{label}</label>
    {children}
    {hint && <p className="text-xs font-secondary text-gray-400 mt-1.5">{hint}</p>}
  </div>
);

const ProgramFormModal = ({ program, onClose, onSaved }) => {
  const isEdit = !!program;
  const createProgram = useCreateProgram();
  const updateProgram = useUpdateProgram();
  const isSaving = createProgram.isPending || updateProgram.isPending;

  const [form, setForm] = useState({
    title: program?.title || "",
    subtitle: program?.subtitle || "",
    description: program?.description || "",
    quote: program?.quote || "",
    bullets: (program?.bullets || []).join("\n"),
    amount: program?.amount ?? "",
    currency: program?.currency || "UGX",
    frequency: program?.frequency || "once",
    allowCustomAmount: program?.allowCustomAmount || false,
    goalSupporters: program?.goalSupporters ?? "",
    goalAmount: program?.goalAmount ?? "",
    color: program?.color || "lilac",
    buttonLabel: program?.buttonLabel || "",
    isPublished: program ? program.isPublished : true,
    sortOrder: program?.sortOrder ?? 0,
  });
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.title.trim()) return setError("Give the programme a name.");
    if (!(parseFloat(form.amount) > 0)) return setError("Enter an amount greater than 0.");
    try {
      const saved = isEdit
        ? await updateProgram.mutateAsync({ id: program.id, ...form })
        : await createProgram.mutateAsync(form);
      onSaved?.(saved);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save programme.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]" onClick={isSaving ? undefined : onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 pointer-events-auto max-h-[92vh] overflow-y-auto">
          <h2 className="text-lg font-secondary font-bold text-gray-900 mb-1">{isEdit ? `Edit ${program.title}` : "New programme"}</h2>
          <p className="text-sm font-secondary text-gray-500 mb-6">Published programmes appear as cards on the public Seed Portals page.</p>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Name">
                <input className={inputClass} value={form.title} onChange={set("title")} placeholder="e.g. The 1k Club" autoFocus />
              </Field>
              <Field label="Label (optional)" hint="Small text above the name.">
                <input className={inputClass} value={form.subtitle} onChange={set("subtitle")} placeholder="e.g. Liquidity Engine: 1K-CLUB-V1" />
              </Field>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Field label="Amount" className="col-span-1">
                <input type="number" min="0" step="any" className={inputClass} value={form.amount} onChange={set("amount")} />
              </Field>
              <Field label="Currency">
                <select className={inputClass} value={form.currency} onChange={set("currency")}>
                  <option>UGX</option>
                  <option>USD</option>
                </select>
              </Field>
              <Field label="Frequency" className="col-span-2">
                <select className={inputClass} value={form.frequency} onChange={set("frequency")}>
                  <option value="once">One-time</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </Field>
            </div>
            <label className="flex items-center gap-3 cursor-pointer -mt-1">
              <input type="checkbox" checked={form.allowCustomAmount} onChange={set("allowCustomAmount")} className="w-4 h-4 accent-[#997B94]" />
              <span className="text-sm font-secondary text-gray-700">Let donors change the amount (the amount above is the suggested one)</span>
            </label>

            <Field label="Description" hint="Shown on the programme card.">
              <textarea className={inputClass} rows={3} value={form.description} onChange={set("description")} />
            </Field>
            <Field label="Quote (optional)" hint="Shown beside the payment form.">
              <textarea className={inputClass} rows={2} value={form.quote} onChange={set("quote")} />
            </Field>
            <Field label="Benefits (optional)" hint="One per line; shown as a checklist on the card.">
              <textarea className={inputClass} rows={3} value={form.bullets} onChange={set("bullets")} />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Member goal (optional)" hint='e.g. 10,000, shown as "X of 10,000 members".'>
                <input type="number" min="0" className={inputClass} value={form.goalSupporters} onChange={set("goalSupporters")} />
              </Field>
              <Field label={`Funding goal in ${form.currency} (optional)`}>
                <input type="number" min="0" step="any" className={inputClass} value={form.goalAmount} onChange={set("goalAmount")} />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Card colour">
                <div className="flex gap-2 pt-1">
                  {COLORS.map(([name, bg]) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, color: name }))}
                      className={`w-9 h-9 rounded-full ${bg} flex items-center justify-center ring-offset-2 ${form.color === name ? "ring-2 ring-gray-800" : ""}`}
                      title={name}
                    >
                      {form.color === name && <Icon icon="ph:check-bold" className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Button text (optional)">
                <input className={inputClass} value={form.buttonLabel} onChange={set("buttonLabel")} placeholder={form.frequency === "once" ? "Give now" : "Join now"} />
              </Field>
              <Field label="Order" hint="Lower numbers show first.">
                <input type="number" className={inputClass} value={form.sortOrder} onChange={set("sortOrder")} />
              </Field>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isPublished} onChange={set("isPublished")} className="w-4 h-4 accent-[#997B94]" />
              <span className="text-sm font-secondary font-bold text-gray-800">Show on the Seed Portals page</span>
            </label>
          </div>

          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mt-5">{error}</p>}

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} disabled={isSaving} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSaving} className="px-5 py-2.5 rounded-full bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              {isSaving ? "Saving..." : isEdit ? "Save changes" : "Create programme"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProgramFormModal;
