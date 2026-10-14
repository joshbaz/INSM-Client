import api from "../store/tanstackStore/services/api";

export const CATEGORY_STRUCTURE = {
  "Community Programs": ["Local Businesses", "Fashion & Wearables", "Other Projects"],
  "Agriculture & Food": ["Land", "Dairy & Poultry business", "Food market", "Other farming projects"],
};

export const STATUS_LABELS = {
  UPCOMING: "Upcoming",
  FULLY_FUNDED: "Fully Funded",
  COMPLETED: "Completed",
};

export const CURRENCIES = ["USD", "UGX"];

export const PROGRAM_FREQUENCY_LABELS = { once: "One-time", weekly: "Weekly", monthly: "Monthly" };

export const PAYMENT_METHODS = ["Bank transfer", "Cash", "Mobile money", "Cheque", "Other"];

export const formatMoney = (amount, currency = "USD") => {
  const value = Math.round(amount || 0).toLocaleString();
  return currency === "USD" ? `$ ${value}` : `${currency} ${value}`;
};

// Uploaded images are stored as /photos/<id>/view; older ones are full URLs
export const resolveImageUrl = (url) => {
  if (!url) return "";
  return url.startsWith("/") ? `${api.defaults.baseURL}${url}` : url;
};
