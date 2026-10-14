// Shared labels for the Partner Terminal

export const NEEDS = ["Health", "Legal", "Finance", "Training", "Capital", "Housing", "Education", "Other"];

export const MARITAL_STATUSES = [
  ["single", "Single (never married)"],
  ["widowed", "Widowed"],
  ["divorced", "Divorced"],
  ["separated", "Separated"],
  ["other", "Other"],
];

export const EDUCATION_LEVELS = ["None", "Primary", "Secondary (O-Level)", "Secondary (A-Level)", "Vocational", "Tertiary"];

export const DOMAINS = [
  ["LAW", "Legal", "ph:scales-bold"],
  ["FINANCE", "Finance", "ph:coins-bold"],
  ["HEALTH", "Health", "ph:first-aid-kit-bold"],
  ["MISC", "Other", "ph:question-bold"],
];
export const DOMAIN_LABELS = Object.fromEntries(DOMAINS.map(([key, label]) => [key, label]));

export const REQUEST_STATUS = {
  OPEN: { label: "Waiting for a mentor", style: "bg-[#dca838]/15 text-[#b8871f]" },
  IN_PROGRESS: { label: "In progress", style: "bg-[#78a2a5]/15 text-[#4d7a7d]" },
  RESOLVED: { label: "Resolved", style: "bg-[#22C55E]/10 text-[#16A34A]" },
};

export const REPORT_STATUS = {
  PENDING: { label: "Waiting for HQ review", style: "bg-[#dca838]/15 text-[#b8871f]" },
  APPROVED: { label: "Approved", style: "bg-[#22C55E]/10 text-[#16A34A]" },
  REJECTED: { label: "Returned", style: "bg-[#EF4444]/10 text-[#DC2626]" },
};

export const shortDate = (date) =>
  date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";

export const today = () => new Date().toISOString().slice(0, 10);

export const inputClass = "w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
export const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-1.5";
