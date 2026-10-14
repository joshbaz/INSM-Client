// Shared display helpers for giving programmes (Seed Portals)

const THEMES = {
  lilac: { solid: "bg-brand-lilac", dark: "bg-brand-lilac-800", text: "text-brand-lilac", button: "bg-brand-lilac-600 hover:bg-brand-lilac-700" },
  teal: { solid: "bg-brand-teal", dark: "bg-brand-teal-700", text: "text-brand-teal", button: "bg-brand-teal-700 hover:bg-brand-teal-700/90" },
  gold: { solid: "bg-brand-gold", dark: "bg-brand-dark", text: "text-brand-gold", button: "bg-brand-dark hover:bg-brand-dark/90" },
  brown: { solid: "bg-brand-brown", dark: "bg-brand-brown", text: "text-brand-brown", button: "bg-brand-brown hover:bg-brand-brown/90" },
};

export const programTheme = (color) => THEMES[color] || THEMES.lilac;

export const FREQUENCY_LABELS = { once: "One-time", weekly: "Weekly", monthly: "Monthly" };

export const formatProgramAmount = (amount, currency) =>
  currency === "USD" ? `$${Number(amount).toLocaleString()}` : `${currency} ${Number(amount).toLocaleString()}`;
