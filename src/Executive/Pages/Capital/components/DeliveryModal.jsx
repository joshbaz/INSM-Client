import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
  useAddTierDelivery, useUpdateTierDelivery, useUploadPhoto, useNetwork,
} from "../../../../store/tanstackStore/services/queries";
import { resolveImageUrl } from "../../../../data/projectOptions";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const today = () => new Date().toISOString().slice(0, 10);
const plural = (n, word) => `${n.toLocaleString()} ${word}${Math.abs(n) === 1 ? "" : "s"}`;
const recipientLines = (text) => (text || "").split("\n").map((l) => l.trim()).filter(Boolean);

// Record or edit a batch of a tier's units. Pass one tier, or several to show a tier picker.
const DeliveryModal = ({ tiers, initialTierId, delivery, onClose }) => {
  const isEdit = !!delivery;
  const defaultTier = tiers.find((t) => t.id === initialTierId)
    || [...tiers].sort((a, b) => b.impact.awaitingUnits - a.impact.awaitingUnits)[0];
  const [tierId, setTierId] = useState(defaultTier?.id);
  const tier = tiers.find((t) => t.id === tierId) || defaultTier;
  const addDelivery = useAddTierDelivery();
  const updateDelivery = useUpdateTierDelivery();
  const uploadPhoto = useUploadPhoto();
  const isSaving = addDelivery.isPending || updateDelivery.isPending;
  const unit = tier.impact.unitName;

  const [form, setForm] = useState({
    date: delivery ? delivery.date.slice(0, 10) : today(),
    quantity: delivery?.quantity || "",
    parish: delivery?.parish || "",
    region: delivery?.region || "",
    recipients: delivery?.recipients || "",
    note: delivery?.note || "",
    photo: delivery?.photo || "",
    facilitatorId: delivery?.facilitatorId || "",
  });

  // Equippers Network members who can be credited with the handout (community equippers first)
  const { data: network } = useNetwork();
  const facilitators = (network?.members || [])
    .filter((m) => m.memberStatus !== "INACTIVE" || m.id === form.facilitatorId)
    .sort((a, b) => (a.role === b.role ? a.applicantName.localeCompare(b.applicantName) : a.role === "COMMUNITY_EQUIPPER" ? -1 : 1));
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const names = recipientLines(form.recipients);
  const quantity = parseInt(form.quantity) || 0;

  const handlePhoto = async (file) => {
    try {
      const photo = await uploadPhoto.mutateAsync({ file, caption: `${tier.title} delivery photo` });
      setForm((prev) => ({ ...prev, photo: `/photos/${photo.id}/view` }));
    } catch (err) {
      console.error("Photo upload failed", err);
      alert("Failed to upload photo.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (quantity < 1) {
      setError(`Enter how many ${unit}s were delivered.`);
      return;
    }
    try {
      if (isEdit) {
        await updateDelivery.mutateAsync({ tierId: tier.id, deliveryId: delivery.id, ...form });
      } else {
        await addDelivery.mutateAsync({ tierId: tier.id, ...form });
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save delivery.");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]" onClick={isSaving ? undefined : onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 pointer-events-auto max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-secondary font-bold text-gray-900 mb-1 capitalize">{isEdit ? "Edit delivery" : `Record ${unit}s`}</h2>
          <p className="text-sm font-secondary text-gray-500 mb-6">
            {tier.title} · {Math.max(tier.impact.awaitingUnits, 0).toLocaleString()} funded {unit}s waiting to be delivered
          </p>

          <div className="space-y-4">
            {!isEdit && tiers.length > 1 && (
              <div>
                <label className={labelClass}>What was delivered</label>
                <select className={inputClass} value={tier.id} onChange={(e) => setTierId(e.target.value)}>
                  {tiers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.impact.unitName}s · {t.title}{t.impact.awaitingUnits > 0 ? ` (${t.impact.awaitingUnits} waiting)` : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Date</label>
                <input type="date" className={inputClass} value={form.date} max={today()} onChange={set("date")} />
              </div>
              <div>
                <label className={labelClass}>Number of {unit}s</label>
                <input type="number" min="1" className={inputClass} value={form.quantity} onChange={set("quantity")} autoFocus />
              </div>
              <div>
                <label className={labelClass}>Parish</label>
                <input className={inputClass} value={form.parish} onChange={set("parish")} placeholder="e.g. Nakawa" />
              </div>
              <div>
                <label className={labelClass}>Region / district</label>
                <input className={inputClass} value={form.region} onChange={set("region")} placeholder="e.g. Kampala" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Facilitated by (optional)</label>
              <select className={inputClass} value={form.facilitatorId} onChange={set("facilitatorId")}>
                <option value="">— No one / not recorded —</option>
                {facilitators.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.applicantName} · {m.role === "COMMUNITY_EQUIPPER" ? [m.parish, m.district].filter(Boolean).join(", ") || "Equipper" : "Mentor"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Recipients (optional)</label>
              <textarea
                className={`${inputClass} font-mono text-xs`}
                rows={5}
                value={form.recipients}
                onChange={set("recipients")}
                placeholder={"One per line: Name, Phone, Passbook no.\nSarah Nakato, 0772 000000, PB-0142"}
              />
              <p className={`text-xs font-secondary mt-1.5 ${names.length && quantity && names.length !== quantity ? "text-[#b8871f]" : "text-gray-400"}`}>
                {names.length
                  ? `${plural(names.length, "recipient")} listed${quantity && names.length !== quantity ? ` (you entered ${quantity} ${unit}s)` : ""}`
                  : "Add names to keep a register of who received them."}
              </p>
            </div>

            <div>
              <label className={labelClass}>Note (optional)</label>
              <input className={inputClass} value={form.note} onChange={set("note")} placeholder="e.g. Issued at the parish induction session" />
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
                  {uploadPhoto.isPending ? <Icon icon="ph:spinner-gap-bold" className="w-5 h-5 animate-spin" /> : <><Icon icon="ph:image-square-duotone" className="w-6 h-6" /> Upload photo</>}
                  <input type="file" accept="image/*" className="hidden" disabled={uploadPhoto.isPending} onChange={(e) => e.target.files[0] && handlePhoto(e.target.files[0])} />
                </label>
              )}
            </div>
          </div>

          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mt-5">{error}</p>}

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} disabled={isSaving} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isSaving || uploadPhoto.isPending} className="px-5 py-2.5 rounded-full bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              {isSaving ? "Saving..." : isEdit ? "Save changes" : "Record delivery"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeliveryModal;
