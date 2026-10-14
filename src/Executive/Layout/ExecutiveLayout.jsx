import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import Sidebar from "./sections/Sidebar";
import UserAvatar from "../components/UserAvatar";
import { useAuth } from "../../store/context/AuthContext";

const ProfileMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen((open) => !open)} className="flex items-center gap-3 cursor-pointer group">
        <span className="text-right hidden lg:block">
          <span className="block text-[14px] font-secondary font-bold text-brand-dark group-hover:text-brand-gold transition-colors leading-tight">
            {user?.name || "Profile"}
          </span>
          {user?.jobTitle && <span className="block text-[12px] font-secondary text-brand-dark-400 leading-tight">{user.jobTitle}</span>}
        </span>
        <UserAvatar user={user} size={36} />
        <Icon icon="ph:caret-down-bold" className={`w-3.5 h-3.5 text-brand-dark-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={close} />
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-gray-100">
              <UserAvatar user={user} size={40} />
              <div className="min-w-0">
                <p className="text-sm font-bold font-secondary text-gray-900 truncate">{user?.name || "Administrator"}</p>
                <p className="text-xs font-secondary text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
            <Link to="/executive/profile" onClick={close} className="flex items-center gap-3 px-4 py-3 text-sm font-secondary text-gray-700 hover:bg-gray-50">
              <Icon icon="ph:user-circle-bold" className="w-4 h-4" /> My profile
            </Link>
            <Link to="/executive/settings" onClick={close} className="flex items-center gap-3 px-4 py-3 text-sm font-secondary text-gray-700 hover:bg-gray-50">
              <Icon icon="ph:gear-bold" className="w-4 h-4" /> Settings
            </Link>
            <button onClick={() => logout("/executive/login")} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-secondary text-[#EF4444] hover:bg-[#EF4444]/5 border-t border-gray-100">
              <Icon icon="ph:sign-out-bold" className="w-4 h-4" /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ExecutiveLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.includes('/executive/home')) return 'Dashboard';
    if (pathname.includes('/executive/leads')) return 'Lead Management';
    if (pathname.includes('/executive/blogs/new')) return 'New Article';
    if (pathname.includes('/executive/blogs')) return 'Manage Blogs';
    if (pathname.includes('/executive/capital')) return 'Capital Investments';
    if (pathname.includes('/executive/network')) return 'Equippers Network';
    if (pathname.includes('/executive/photos')) return 'Media library';
    if (pathname.includes('/executive/projects')) return 'Projects';
    if (pathname.includes('/executive/settings')) return 'Settings';
    if (pathname.includes('/executive/profile')) return 'My Profile';
    return 'Executive Portal';
  };

  const title = getPageTitle(location.pathname);

  return (
    <div className="min-h-screen bg-brand-white flex overflow-x-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Main Panel Content Area */}
      <main className="flex-1 min-w-0 w-full ml-0 md:ml-[280px] min-h-screen flex flex-col transition-all duration-300">
        
        {/* ═══════════════════════════════════════════
            MOBILE ONLY HEADER
        ═══════════════════════════════════════════ */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-brand-dark-200/10 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-primary font-bold text-brand-gold tracking-tight leading-none">INSM</h1>
          </div>
          <div className="flex items-center gap-2">
            <ProfileMenu />
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-brand-dark-400 hover:text-brand-dark focus:outline-none"
            >
              <Icon icon="heroicons:bars-3" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            DESKTOP ONLY TOP NAVBAR
        ═══════════════════════════════════════════ */}
        <header className="hidden md:flex h-20 bg-white items-center justify-between px-8 sticky top-0 z-30 shrink-0">
          {/* Page Title */}
          <div className="flex-1">
            <h1 className="text-[17px] font-bold font-secondary text-brand-dark">{title}</h1>
          </div>

          {/* Action Navigation Items */}
          <div className="flex items-center gap-6">
            {/* Bell Notification Icon */}
            <button className="relative p-1 text-brand-dark-400 hover:text-brand-dark transition-colors cursor-pointer">
              <Icon icon="ph:bell-fill" className="w-[22px] h-[22px]" />
            </button>

            {/* Help Question Icon */}
            <button className="text-brand-dark-400 hover:text-brand-dark transition-colors cursor-pointer">
              <Icon icon="ph:info-fill" className="w-[22px] h-[22px]" />
            </button>

            {/* Thin Vertical Divider */}
            <div className="w-px h-6 bg-brand-dark-200/50" />

            {/* Profile Navigation Dropdown */}
            <ProfileMenu />
          </div>
        </header>

        {/* ═══════════════════════════════════════════
            MAIN VIEW WRAPPER
        ═══════════════════════════════════════════ */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto min-w-0 w-full bg-[#f9fafb]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ExecutiveLayout;
