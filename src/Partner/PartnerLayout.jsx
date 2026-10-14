import React, { useState } from "react";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../store/context/AuthContext";
import UserAvatar from "../Executive/components/UserAvatar";
import { usePartnerMe } from "./partnerQueries";

const EQUIPPER_NAV = [
  { to: "/terminal", label: "Home", icon: "ph:house-bold", end: true },
  { to: "/terminal/mothers", label: "Mothers", icon: "ph:users-three-bold" },
  { to: "/terminal/handouts", label: "Handouts", icon: "ph:book-open-bold" },
  { to: "/terminal/support", label: "Mentor help", icon: "ph:lifebuoy-bold" },
  { to: "/terminal/tasks", label: "Tasks", icon: "ph:check-square-bold" },
  { to: "/terminal/announcements", label: "Announcements", icon: "ph:megaphone-bold" },
  { to: "/terminal/profile", label: "My profile", icon: "ph:user-circle-bold" },
];

const MENTOR_NAV = [
  { to: "/terminal", label: "Home", icon: "ph:house-bold", end: true },
  { to: "/terminal/support", label: "Requests", icon: "ph:lifebuoy-bold" },
  { to: "/terminal/tasks", label: "Tasks", icon: "ph:check-square-bold" },
  { to: "/terminal/announcements", label: "Announcements", icon: "ph:megaphone-bold" },
  { to: "/terminal/profile", label: "My profile", icon: "ph:user-circle-bold" },
];

const PartnerLayout = () => {
  const { user, logout } = useAuth();
  const { data: me } = usePartnerMe();
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const isMentor = user?.role === "MENTOR";
  const nav = isMentor ? MENTOR_NAV : EQUIPPER_NAV;
  const member = me?.member;
  const place = isMentor ? "Technical Mentor" : [member?.parish, member?.district].filter(Boolean).join(", ") || "Community Equipper";

  // Invited accounts must replace their temporary password before using the terminal
  if (user?.mustChangePassword && location.pathname !== "/terminal/profile") {
    return <Navigate to="/terminal/profile" replace />;
  }

  // Phones: first four items in the bottom bar, the rest under "More"
  const primary = nav.slice(0, 4);
  const more = nav.slice(4);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 text-[14px] font-secondary transition-colors ${
      isActive ? "bg-white/10 text-white font-bold border-l-4 border-[#D4AF37]" : "text-[#9aa0a6] hover:text-white hover:bg-white/5 border-l-4 border-transparent"
    }`;

  return (
    <div className="min-h-screen bg-[#f6f5f2] md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[250px] shrink-0 bg-[#1f2a2b] text-white flex-col fixed inset-y-0 left-0">
        <div className="px-6 pt-8 pb-6">
          <p className="text-[#D4AF37] text-[20px] font-black tracking-tight font-albert leading-none">INSM Uganda</p>
          <p className="text-[#9aa0a6] text-sm font-secondary mt-1">Partner Terminal</p>
        </div>
        <nav className="flex-1 overflow-y-auto">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              <Icon icon={item.icon} className="w-5 h-5" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 py-5 border-t border-white/10 flex items-center gap-3">
          <UserAvatar user={user} size={36} />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold font-secondary truncate">{user?.name}</p>
            <p className="text-xs font-secondary text-[#9aa0a6] truncate">{place}</p>
          </div>
          <button onClick={() => logout("/login")} className="p-1.5 text-[#9aa0a6] hover:text-white" title="Sign out">
            <Icon icon="ph:sign-out-bold" className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden sticky top-0 z-30 bg-[#1f2a2b] text-white px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-[#D4AF37] text-base font-black font-albert leading-none">INSM Partner Terminal</p>
          <p className="text-[11px] font-secondary text-[#9aa0a6] mt-0.5">{place}</p>
        </div>
        <UserAvatar user={user} size={32} />
      </header>

      <main className="flex-1 md:ml-[250px] min-w-0 px-4 py-5 md:px-8 md:py-8 pb-24 md:pb-8">
        {user?.mustChangePassword && (
          <div className="max-w-4xl mx-auto mb-5 flex items-start gap-3 rounded-xl bg-[#dca838]/10 border border-[#dca838]/30 p-4 text-sm font-secondary text-gray-800">
            <Icon icon="ph:key-bold" className="w-5 h-5 text-[#b8871f] shrink-0 mt-0.5" />
            <p><strong>Welcome!</strong> Please replace the temporary password HQ gave you before continuing. Use the Password section below.</p>
          </div>
        )}
        <Outlet />
      </main>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-gray-200 grid grid-cols-5">
        {primary.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `flex flex-col items-center gap-0.5 py-2 text-[10px] font-bold font-secondary ${isActive ? "text-[#997B94]" : "text-gray-400"}`}
          >
            <Icon icon={item.icon} className="w-6 h-6" />
            {item.label}
          </NavLink>
        ))}
        <button onClick={() => setIsMoreOpen(true)} className="flex flex-col items-center gap-0.5 py-2 text-[10px] font-bold font-secondary text-gray-400">
          <Icon icon="ph:dots-three-circle-bold" className="w-6 h-6" /> More
        </button>
      </nav>

      {isMoreOpen && (
        <>
          <div className="md:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setIsMoreOpen(false)} />
          <div className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white rounded-t-2xl p-4 pb-8 space-y-1">
            {more.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setIsMoreOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold font-secondary text-gray-700 hover:bg-gray-50">
                <Icon icon={item.icon} className="w-5 h-5" /> {item.label}
              </NavLink>
            ))}
            <button onClick={() => logout("/login")} className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-bold font-secondary text-[#EF4444] hover:bg-[#EF4444]/5">
              <Icon icon="ph:sign-out-bold" className="w-5 h-5" /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PartnerLayout;
