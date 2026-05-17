import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import Sidebar from "./sections/Sidebar";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-white-100 flex overflow-x-hidden">
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
        <div className="md:hidden flex items-center justify-between p-4 bg-[#f5f5dd] border-b border-brand-dark-200/10 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="INSM Logo" className="w-8 h-8 object-contain rounded-full bg-brand-navy" />
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
            DESKTOP ONLY TOP NAVBAR (Figma High-Fidelity)
        ═══════════════════════════════════════════ */}
        <header className="hidden md:flex h-20 bg-[#f5f5dd] border-b border-brand-dark-200/10 items-center justify-between px-8 sticky top-0 z-30 shadow-sm shrink-0">
          {/* Search Input Box */}
          <div className="relative max-w-md w-full">
            <Icon 
              icon="ph:magnifying-glass" 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-dark w-5 h-5" 
            />
            <input 
              type="text" 
              placeholder="Search capital, mentors, or parishes..." 
              className="w-full bg-[#f1f3f4] pl-12 pr-4 py-2 rounded-full border border-brand-dark-200/10 text-sm text-brand-dark placeholder-brand-dark-400/80 focus:outline-none focus:bg-white focus:border-brand-lilac/30 focus:ring-1 focus:ring-brand-lilac/20 transition-all font-secondary font-medium shadow-inner"
            />
          </div>

          {/* Action Navigation Items */}
          <div className="flex items-center gap-6">
            {/* Bell Notification Icon */}
            <button className="relative p-1 text-brand-dark hover:text-brand-lilac transition-colors cursor-pointer">
              <Icon icon="ph:bell-bold" className="w-[22px] h-[22px]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-pink rounded-full border border-brand-white" />
            </button>

            {/* Help Question Icon */}
            <button className="text-brand-dark hover:text-brand-lilac transition-colors cursor-pointer">
              <Icon icon="ph:question-bold" className="w-[22px] h-[22px]" />
            </button>

            {/* Thin Vertical Divider */}
            <div className="w-px h-6 bg-brand-dark-200/20" />

            {/* Profile Navigation Dropdown */}
            <div className="flex items-center gap-3 cursor-pointer group">
              <span className="text-base font-secondary font-bold text-brand-dark group-hover:text-brand-lilac transition-colors">
                Profile
              </span>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256" 
                alt="Director Profile Portrait" 
                className="w-9 h-9 rounded-full object-cover border border-brand-dark-200/10 shadow-sm shrink-0"
              />
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════
            MAIN VIEW WRAPPER
        ═══════════════════════════════════════════ */}
        <div className="p-4 md:p-8 flex-1 overflow-y-auto min-w-0 w-full bg-[#f5f5f5]">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
