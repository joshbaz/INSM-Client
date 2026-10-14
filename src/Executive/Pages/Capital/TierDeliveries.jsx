import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useTierDeliveries, useAddTierDelivery, useUpdateTierDelivery, useDeleteTierDelivery, useUploadPhoto,
} from "../../../store/tanstackStore/services/queries";
import { resolveImageUrl } from "../../../data/projectOptions";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const today = () => new Date().toISOString().slice(0, 10);
const plural = (n, word) => `${n.toLocaleString()} ${word}${Math.abs(n) === 1 ? "" : "s"}`;
const recipientLines = (text) => (text || "").split("\n").map((l) => l.trim()).filter(Boolean);
const formatUnits = (n) => (Number.isInteger(n) ? n.toLocaleString() : n.toFixed(1));

const DeliveryModal = ({ tier, delivery, onClose }) => {
  const isEdit = !!delivery;
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
  });
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

const downloadCsv = (tier) => {
  const header = ["Date", "Quantity", "Parish", "Region", "Recipient", "Phone", "Reference", "Note"];
  const rows = tier.deliveries.flatMap((d) => {
    const base = [d.date.slice(0, 10), d.quantity, d.parish || "", d.region || ""];
    const people = recipientLines(d.recipients).map((line) => line.split(",").map((part) => part.trim()));
    if (people.length === 0) return [[...base, "", "", "", d.note || ""]];
    return people.map(([name = "", phone = "", ref = ""]) => [...base, name, phone, ref, d.note || ""]);
  });
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `${tier.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-deliveries.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const TierDeliveries = () => {
  const { id } = useParams();
  const { data: tier, isLoading } = useTierDeliveries(id);
  const deleteDelivery = useDeleteTierDelivery();
  const [modal, setModal] = useState(null); // null | { delivery?: object }
  const [expanded, setExpanded] = useState(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
      </div>
    );
  }
  if (!tier) return <p className="text-center py-20 text-gray-500 font-secondary">Tier not found.</p>;

  const { impact } = tier;
  const unit = impact.unitName;

  const handleDelete = async (delivery) => {
    if (!window.confirm(`Delete this record of ${plural(delivery.quantity, unit)}? It will be removed from the delivered total.`)) return;
    try {
      await deleteDelivery.mutateAsync({ tierId: tier.id, deliveryId: delivery.id });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete delivery.");
    }
  };

  const cards = unit && [
    { title: `${unit}s funded`, value: formatUnits(impact.fundedUnits), subtitle: `$${Math.round(impact.receivedUsd).toLocaleString()} from ${plural(impact.donationCount, "donation")} at $${impact.unitCost.toLocaleString()} each` },
    { title: `${unit}s delivered`, value: impact.totalDelivered.toLocaleString(), subtitle: tier.openingUnits ? `incl. ${tier.openingUnits.toLocaleString()} before tracking` : `${plural(impact.deliveryCount, "delivery")} recorded` },
    impact.awaitingUnits >= 0
      ? { title: "Waiting to be delivered", value: impact.awaitingUnits.toLocaleString(), subtitle: `Funded ${unit}s not yet handed out`, highlight: impact.awaitingUnits > 0 ? "text-[#b8871f]" : "" }
      : { title: "Delivered ahead of funding", value: Math.abs(impact.awaitingUnits).toLocaleString(), subtitle: "More delivered than donations cover so far", highlight: "text-[#4d7a7d]" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-secondary font-medium text-[#A0AAB4] flex-wrap">
        <Link to="/executive/capital/seed-a-cooperative" className="hover:text-brand-dark transition-colors text-[#997B94]">Seed a Cooperative</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3" />
        <Link to="/executive/capital/seed-a-cooperative/tiers" className="hover:text-brand-dark transition-colors text-[#997B94]">Investment Tiers</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3" />
        <span className="text-brand-dark font-semibold">{tier.title}</span>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[28px] font-black font-albert text-brand-dark tracking-tight leading-none">{tier.title}</h1>
          <p className="text-[#6B7280] text-[15px] font-medium font-secondary mt-2">
            {unit ? `$${impact.unitCost.toLocaleString()} funds one ${unit}` : tier.description}
          </p>
        </div>
        {unit && (
          <div className="flex items-center gap-3">
            <button onClick={() => downloadCsv(tier)} disabled={tier.deliveries.length === 0} className="flex items-center gap-2 text-xs font-bold font-secondary text-gray-500 hover:text-gray-800 disabled:opacity-40">
              <Icon icon="ph:download-simple-bold" className="w-4 h-4" /> Export register
            </button>
            <button onClick={() => setModal({})} className="bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors flex items-center gap-2 uppercase">
              <Icon icon="ph:plus-bold" className="w-3.5 h-3.5" /> Record {unit}s
            </button>
          </div>
        )}
      </div>

      {!unit ? (
        <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm p-8 text-center">
          <Icon icon="ph:target-bold" className="w-8 h-8 text-[#997B94] mx-auto mb-3" />
          <p className="text-sm font-secondary text-gray-700 font-bold">Impact tracking isn't set up for this tier.</p>
          <p className="text-sm font-secondary text-gray-500 mt-1">
            Open the tier in <Link to="/executive/capital/seed-a-cooperative/tiers" className="underline font-bold">Investment Tiers</Link>, click Edit, and set a unit name under Impact Tracking (e.g. "passbook").
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm min-h-[130px] flex flex-col justify-between">
                <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary capitalize">{card.title}</h3>
                <div>
                  <div className={`text-[32px] font-black font-albert tracking-tight leading-none mb-2 ${card.highlight || "text-brand-dark"}`}>{card.value}</div>
                  <p className="text-[13px] font-secondary font-medium text-brand-dark-400">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-brand-dark-200/20">
                    {["Date", "Delivered", "Where", "Recipients", "Note", ""].map((h, i) => (
                      <th key={i} className="py-4 px-6 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-dark-200/10">
                  {tier.deliveries.map((d) => {
                    const people = recipientLines(d.recipients);
                    return (
                      <React.Fragment key={d.id}>
                        <tr className="text-[13px] font-secondary text-brand-dark align-top">
                          <td className="py-4 px-6 whitespace-nowrap text-brand-dark/70">
                            {new Date(d.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                          </td>
                          <td className="py-4 px-6 font-bold whitespace-nowrap">{plural(d.quantity, unit)}</td>
                          <td className="py-4 px-6">{[d.parish, d.region].filter(Boolean).join(", ") || <span className="text-gray-300">—</span>}</td>
                          <td className="py-4 px-6">
                            {people.length ? (
                              <button onClick={() => setExpanded(expanded === d.id ? null : d.id)} className="text-[#997B94] font-bold hover:underline flex items-center gap-1">
                                {plural(people.length, "name")}
                                <Icon icon="ph:caret-down-bold" className={`w-3 h-3 transition-transform ${expanded === d.id ? "rotate-180" : ""}`} />
                              </button>
                            ) : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="py-4 px-6 text-brand-dark/70 max-w-xs">
                            <div className="flex items-start gap-3">
                              {d.photo && <img src={resolveImageUrl(d.photo)} alt="" className="w-10 h-10 rounded object-cover shrink-0" />}
                              <span>{d.note || ""}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <button onClick={() => setModal({ delivery: d })} className="p-2 text-gray-400 hover:text-gray-800" title="Edit">
                              <Icon icon="ph:pencil-simple-bold" className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(d)} disabled={deleteDelivery.isPending} className="p-2 text-gray-400 hover:text-[#EF4444] disabled:opacity-50" title="Delete">
                              <Icon icon="ph:trash-bold" className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                        {expanded === d.id && (
                          <tr className="bg-[#F9FAFB]">
                            <td colSpan="6" className="px-6 py-3">
                              <ol className="text-xs font-mono text-brand-dark/80 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 list-decimal pl-5">
                                {people.map((line, i) => <li key={i}>{line}</li>)}
                              </ol>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {tier.deliveries.length === 0 && (
                    <tr>
                      <td colSpan="6" className="py-12 text-center text-[13px] text-brand-dark-400 font-secondary">
                        No {unit}s recorded yet. Use "Record {unit}s" when a batch is handed out.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {modal && <DeliveryModal tier={tier} delivery={modal.delivery} onClose={() => setModal(null)} />}
    </div>
  );
};

export default TierDeliveries;
