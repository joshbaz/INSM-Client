import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import Sidebar from "./sections/Sidebar";

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
    if (pathname.includes('/executive/settings')) return 'Settings';
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
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-brand-dark-400 hover:text-brand-dark focus:outline-none"
          >
            <Icon icon="heroicons:bars-3" className="w-6 h-6" />
          </button>
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
            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="text-[15px] font-secondary font-bold text-brand-dark group-hover:text-brand-gold transition-colors">
                Profile
              </span>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256" 
                alt="Profile" 
                className="w-9 h-9 rounded-full object-cover border border-brand-dark-200/10 shadow-sm shrink-0"
              />
            </div>
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
