import React from "react";
import { resolveImageUrl } from "../../data/projectOptions";

const initialsOf = (user) =>
  (user?.name || user?.email || "?")
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

// Profile photo, or initials on a brand colour when there isn't one
const UserAvatar = ({ user, size = 36, className = "" }) => {
  const style = { width: size, height: size, fontSize: Math.round(size * 0.38) };

  if (user?.avatar) {
    return (
      <img
        src={resolveImageUrl(user.avatar)}
        alt={user.name || "Profile"}
        style={style}
        className={`rounded-full object-cover border border-brand-dark-200/10 shadow-sm shrink-0 ${className}`}
      />
    );
  }

  return (
    <span
      style={style}
      className={`rounded-full bg-[#a57ea9] text-white font-bold font-secondary flex items-center justify-center shrink-0 ${className}`}
    >
      {initialsOf(user)}
    </span>
  );
};

export default UserAvatar;
