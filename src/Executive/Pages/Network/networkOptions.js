// Shared labels and helpers for the Equippers Network pages

export const REGIONS = ["CENTRAL", "EASTERN", "NORTHERN", "WESTERN"];

export const MEMBER_STATUS_STYLES = {
  ACTIVE: { label: "Active", style: "bg-[#22C55E]/10 text-[#16A34A]" },
  PAUSED: { label: "Paused", style: "bg-[#dca838]/15 text-[#b8871f]" },
  INACTIVE: { label: "Inactive", style: "bg-gray-100 text-gray-500" },
};

export const NOTE_KINDS = {
  call: { label: "Call", icon: "ph:phone-bold", style: "bg-[#78a2a5]/15 text-[#4d7a7d]" },
  meeting: { label: "Meeting", icon: "ph:users-three-bold", style: "bg-[#a57ea9]/15 text-[#916b94]" },
  assignment: { label: "Assignment", icon: "ph:flag-bold", style: "bg-[#dca838]/15 text-[#b8871f]" },
  note: { label: "Note", icon: "ph:note-pencil-bold", style: "bg-gray-100 text-gray-500" },
};

// Values from the public Community Equipper form
export const LEADERSHIP_LABELS = {
  spiritual_leader_wife: "Wife of a Spiritual Leader",
  regional_leader_wife: "Wife of a Regional Leader",
  community_leader: "Community Leader",
  other: "Other",
};

export const DOMAIN_LABELS = { LAW: "Legal", FINANCE: "Finance", HEALTH: "Health", MISC: "Other" };

export const titleCase = (value) => (value ? value[0] + value.slice(1).toLowerCase() : "");

export const shortDate = (date) =>
  date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) : "—";

// tel:, mailto: and WhatsApp links; local Ugandan numbers (07…) become +256…
export const contactLinks = (member) => {
  const digits = (member.phoneNumber || "").replace(/[^\d+]/g, "");
  const international = digits.startsWith("+") ? digits.slice(1) : digits.startsWith("0") ? `256${digits.slice(1)}` : digits;
  return {
    tel: digits ? `tel:${digits}` : null,
    whatsapp: international.length >= 9 ? `https://wa.me/${international}` : null,
    mail: member.email ? `mailto:${member.email}` : null,
  };
};
