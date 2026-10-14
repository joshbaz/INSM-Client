import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useManagedProject, useAddProjectContribution, useDeleteProjectContribution,
} from "../../../store/tanstackStore/services/queries";
import { STATUS_LABELS, CURRENCIES, PAYMENT_METHODS, formatMoney, resolveImageUrl } from "../../../data/projectOptions";
import { ProgressBar } from "./ManageProjects";
import { ImpactModal, ImpactLog } from "./ProjectImpact";

const SOURCE_TABS = ["ALL", "PESAPAL", "MANUAL"];

const STATUS_BADGES = {
  SUCCESS: { label: "SETTLED", className: "text-[#22C55E]", icon: "ph:check-circle-bold" },
  PENDING: { label: "PROCESSING", className: "text-[#A0AAB4]", icon: "ph:arrows-clockwise-bold" },
  FAILED: { label: "FAILED", className: "text-[#EF4444]", icon: "ph:x-circle-bold" },
};

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#a57ea9] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const today = () => new Date().toISOString().slice(0, 10);

const RecordContributionModal = ({ project, onClose }) => {
  const addContribution = useAddProjectContribution();
  const [form, setForm] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    amount: "",
    currency: project.currency,
    paymentMethod: PAYMENT_METHODS[0],
    receivedAt: today(),
    note: "",
  });
  const [error, setError] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!(parseFloat(form.amount) > 0)) {
      setError("Enter an amount greater than 0.");
      return;
    }
    try {
      await addContribution.mutateAsync({ id: project.id, ...form });
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
          <p className="text-sm font-secondary text-gray-500 mb-6">For money received outside PesaPal, e.g. bank transfer or cash.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_110px] gap-3">
              <div>
                <label className={labelClass}>Amount</label>
                <input type="number" min="0" step="any" className={inputClass} value={form.amount} onChange={set("amount")} autoFocus />
              </div>
              <div>
                <label className={labelClass}>Currency</label>
                <select className={inputClass} value={form.currency} onChange={set("currency")}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Method</label>
                <select className={inputClass} value={form.paymentMethod} onChange={set("paymentMethod")}>
                  {PAYMENT_METHODS.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Date received</label>
                <input type="date" className={inputClass} value={form.receivedAt} max={today()} onChange={set("receivedAt")} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Donor name</label>
              <input className={inputClass} value={form.donorName} onChange={set("donorName")} placeholder="Leave empty for anonymous" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Email (optional)</label>
                <input type="email" className={inputClass} value={form.donorEmail} onChange={set("donorEmail")} />
              </div>
              <div>
                <label className={labelClass}>Phone (optional)</label>
                <input className={inputClass} value={form.donorPhone} onChange={set("donorPhone")} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Note / reference</label>
              <input className={inputClass} value={form.note} onChange={set("note")} placeholder="e.g. bank reference number" />
            </div>
          </div>

          {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mt-5">{error}</p>}

          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onClose} disabled={addContribution.isPending} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={addContribution.isPending} className="px-5 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              {addContribution.isPending ? "Saving..." : "Record contribution"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const downloadCsv = (project, contributions) => {
  const header = ["Date", "Donor", "Email", "Phone", "Amount", "Currency", "Method", "Source", "Status", "Reference", "Note"];
  const rows = contributions.map((c) => [
    new Date(c.createdAt).toISOString().slice(0, 10),
    `${c.donorFirstName || ""} ${c.donorLastName || ""}`.trim(),
    c.donorEmail || "",
    c.donorPhone || "",
    c.amount,
    c.currency,
    c.paymentMethod || "",
    c.isManual ? "Manual" : "PesaPal",
    c.status,
    c.orderTrackingId || "",
    c.isManual ? c.description || "" : "",
  ]);
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `${project.slug}-contributions.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const downloadImpactCsv = (project) => {
  const header = ["Date", "What happened", "Details", "Mothers supported", "SACCOs funded", "Capital deployed", "Currency", "Public"];
  const rows = project.impactEntries.map((e) => [
    e.date.slice(0, 10), e.title, e.note || "", e.mothersSupported, e.saccosFunded, e.capitalDeployed, e.currency, e.isPublic ? "Yes" : "No",
  ]);
  const escape = (value) => `"${String(value).replace(/"/g, '""')}"`;
  const csv = [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  link.download = `${project.slug}-impact.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
};

const ProjectFunds = () => {
  const { id } = useParams();
  const { data: project, isLoading } = useManagedProject(id);
  const deleteContribution = useDeleteProjectContribution();
  const [view, setView] = useState("CONTRIBUTIONS");
  const [sourceTab, setSourceTab] = useState("ALL");
  const [isRecording, setIsRecording] = useState(false);
  const [impactModal, setImpactModal] = useState(null); // null | { entry?: object }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
      </div>
    );
  }

  if (!project) {
    return <p className="text-center py-20 text-gray-500 font-secondary">Project not found.</p>;
  }

  const contributions = project.contributions.filter(
    (c) => sourceTab === "ALL" || (sourceTab === "MANUAL" ? c.isManual : !c.isManual),
  );
  const pendingCount = project.contributions.filter((c) => c.status === "PENDING").length;

  const handleDeleteContribution = async (contribution) => {
    const name = `${contribution.donorFirstName || ""} ${contribution.donorLastName || ""}`.trim();
    if (!window.confirm(`Delete the ${formatMoney(contribution.amount, contribution.currency)} contribution from ${name || "Anonymous"}?`)) return;
    try {
      await deleteContribution.mutateAsync({ id: project.id, paymentId: contribution.id });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete contribution.");
    }
  };

  const statCards = [
    { title: "Total raised", value: formatMoney(project.raised, project.currency), subtitle: project.goalAmount ? `of ${formatMoney(project.goalAmount, project.currency)} goal` : "No goal set" },
    { title: "Via PesaPal", value: formatMoney(project.pesapalRaised, project.currency), subtitle: pendingCount ? `${pendingCount} payment(s) still processing` : "Settled online payments" },
    { title: "Recorded manually", value: formatMoney(project.manualRaised, project.currency), subtitle: "Bank transfers, cash, etc." },
    { title: "Opening balance", value: formatMoney(project.openingBalance, project.currency), subtitle: `${project.donorCount} supporter${project.donorCount === 1 ? "" : "s"} since tracking began` },
  ];

  const { impact } = project;
  const impactCards = [
    { title: "Capital deployed", value: formatMoney(impact.capitalDeployed, project.currency), subtitle: `incl. ${formatMoney(project.openingCapitalDeployed, project.currency)} opening figure` },
    {
      title: "Unspent balance",
      value: formatMoney(impact.balance, project.currency),
      subtitle: impact.balance < 0 ? "More deployed than raised" : "Raised but not yet deployed",
      valueClass: impact.balance < 0 ? "text-[#EF4444]" : "text-gray-900",
    },
    { title: "Mothers supported", value: impact.mothersSupported.toLocaleString(), subtitle: `${project.mothersEmpowered} opening + logged impact` },
    { title: "SACCOs funded", value: impact.saccosFunded.toLocaleString(), subtitle: `${impact.entryCount} impact entr${impact.entryCount === 1 ? "y" : "ies"} recorded` },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <Link to="/executive/projects" className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors shrink-0">
            <Icon icon="ph:arrow-left-bold" className="w-5 h-5" />
          </Link>
          <img src={resolveImageUrl(project.coverImage)} alt="" className="w-14 h-14 rounded-lg object-cover bg-gray-100 shrink-0" />
          <div className="min-w-0">
            <h1 className="text-xl font-secondary font-bold text-gray-800 truncate">{project.title}</h1>
            <p className="text-xs font-secondary text-gray-500">
              {STATUS_LABELS[project.status]} · {project.subcategory}
              {!project.isPublished && <span className="ml-1 text-[#EF4444] font-bold">· Hidden from website</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {project.isPublished && (
            <a href={`/what-we-do/projects/list/${project.slug}`} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-wider uppercase transition-colors flex items-center gap-2">
              <Icon icon="ph:arrow-square-out-bold" /> View on site
            </a>
          )}
          <Link to={`/executive/projects/edit/${project.id}`} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-wider uppercase transition-colors flex items-center gap-2">
            <Icon icon="ph:pencil-simple-bold" /> Edit
          </Link>
          <button onClick={() => setImpactModal({})} className="px-5 py-2.5 rounded-full bg-[#78a2a5] hover:bg-[#668f92] text-white text-xs font-bold font-secondary tracking-wider uppercase transition-colors flex items-center gap-2">
            <Icon icon="ph:plant-bold" /> Record impact
          </button>
          <button onClick={() => setIsRecording(true)} className="px-5 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-wider uppercase transition-colors flex items-center gap-2">
            <Icon icon="ph:plus-bold" /> Record contribution
          </button>
        </div>
      </div>

      {/* Overspent warning */}
      {impact.balance < -0.01 && (
        <div className="flex items-start gap-3 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-xl p-4 text-sm font-secondary text-gray-700">
          <Icon icon="ph:warning-bold" className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
          <p>
            <strong className="text-[#EF4444]">{formatMoney(-impact.balance, project.currency)} more has been deployed than raised.</strong>{" "}
            Check the opening balance and opening capital deployed in <Link to={`/executive/projects/edit/${project.id}`} className="underline font-bold">Edit</Link>,
            or record any missing contributions. New capital can't be deployed on this project until the balance is positive.
          </p>
        </div>
      )}

      {/* Progress */}
      {project.goalAmount > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-end justify-between mb-3 gap-4">
            <p className="text-sm font-secondary font-bold text-gray-700">Funding progress</p>
            <p className="text-sm font-secondary text-gray-500">
              <strong className="text-gray-900">{Math.round(project.progress * 100)}%</strong>
              {project.raised < project.goalAmount && ` · ${formatMoney(project.goalAmount - project.raised, project.currency)} to go`}
            </p>
          </div>
          <ProgressBar progress={project.progress} />
        </div>
      )}

      {/* KPI Cards */}
      {[["Funding", statCards], ["Impact", impactCards]].map(([heading, cards]) => (
        <div key={heading}>
          <p className="text-xs font-bold font-secondary text-gray-400 uppercase tracking-wider mb-3">{heading}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card) => (
              <div key={card.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-32 justify-center">
                <p className="text-sm font-secondary font-bold text-gray-700 mb-1">{card.title}</p>
                <h3 className={`text-2xl font-primary font-bold mb-1 ${card.valueClass || "text-gray-900"}`}>{card.value}</h3>
                <p className="text-xs font-secondary text-gray-400">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Contributions / Impact switch */}
      <div className="flex gap-2">
        {[["CONTRIBUTIONS", "Contributions", project.contributions.length], ["IMPACT", "Impact log", project.impactEntries.length]].map(([key, label, count]) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-5 py-2 rounded-full text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
              view === key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-800"
            }`}
          >
            {label} <span className="opacity-60 ml-1">{count}</span>
          </button>
        ))}
      </div>

      {view === "IMPACT" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-end border-b border-gray-100 px-4">
            <button
              onClick={() => downloadImpactCsv(project)}
              disabled={project.impactEntries.length === 0}
              className="flex items-center gap-2 text-xs font-bold font-secondary text-gray-500 hover:text-gray-800 py-3 disabled:opacity-40"
            >
              <Icon icon="ph:download-simple-bold" className="w-4 h-4" /> Export CSV
            </button>
          </div>
          <ImpactLog project={project} onEdit={(entry) => setImpactModal({ entry })} />
        </div>
      )}

      {/* Contributions */}
      {view === "CONTRIBUTIONS" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-100 pr-4 flex-wrap">
            <div className="flex">
              {SOURCE_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSourceTab(tab)}
                  className={`px-6 md:px-8 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
                    sourceTab === tab ? "bg-[#78a2a5] text-white" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tab === "ALL" ? "All contributions" : tab === "PESAPAL" ? "PesaPal" : "Manual"}
                </button>
              ))}
            </div>
            <button
              onClick={() => downloadCsv(project, contributions)}
              disabled={contributions.length === 0}
              className="flex items-center gap-2 text-xs font-bold font-secondary text-gray-500 hover:text-gray-800 py-3 disabled:opacity-40"
            >
              <Icon icon="ph:download-simple-bold" className="w-4 h-4" /> Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["Date", "Donor", "Amount", "Method", "Status", ""].map((heading, i) => (
                    <th key={i} className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">{heading}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {contributions.map((c) => {
                  const badge = STATUS_BADGES[c.status] || { label: c.status, className: "text-[#A0AAB4]" };
                  const converted = c.currency !== project.currency;
                  return (
                    <tr key={c.id} className="hover:bg-gray-50/50 transition-colors text-sm font-secondary">
                      <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                        {new Date(c.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-900">{`${c.donorFirstName || ""} ${c.donorLastName || ""}`.trim() || "Anonymous"}</p>
                        {c.donorEmail && <p className="text-xs text-gray-400">{c.donorEmail}</p>}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <p className="font-bold text-gray-900">{formatMoney(c.amount, c.currency)}</p>
                        {converted && (
                          <p className="text-xs text-gray-400">
                            ≈ {formatMoney(c.currency === "USD" ? c.amount * project.usdToUgxRate : c.amount / project.usdToUgxRate, project.currency)}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold mr-2 ${c.isManual ? "bg-[#dca838]/10 text-[#b8871f]" : "bg-[#78a2a5]/15 text-[#4d7a7d]"}`}>
                          {c.isManual ? "MANUAL" : "PESAPAL"}
                        </span>
                        {c.paymentMethod || ""}
                        {c.isManual && c.description && <p className="text-xs text-gray-400 mt-1">{c.description}</p>}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`flex items-center gap-1.5 font-bold text-[11px] tracking-widest ${badge.className}`}>
                          {badge.label} {badge.icon && <Icon icon={badge.icon} className="w-3.5 h-3.5" />}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        {c.isManual && (
                          <button
                            onClick={() => handleDeleteContribution(c)}
                            disabled={deleteContribution.isPending}
                            className="p-2 text-gray-400 hover:text-[#EF4444] transition-colors disabled:opacity-50"
                            title="Delete this manual contribution"
                          >
                            <Icon icon="ph:trash-bold" className="w-4 h-4" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {contributions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-10 text-center text-gray-400 font-secondary">No contributions yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isRecording && <RecordContributionModal project={project} onClose={() => setIsRecording(false)} />}
      {impactModal && <ImpactModal project={project} entry={impactModal.entry} onClose={() => setImpactModal(null)} />}
    </div>
  );
};

export default ProjectFunds;
