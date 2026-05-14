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

      <Sidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <main className="flex-1 min-w-0 w-full ml-0 md:ml-60 min-h-screen flex flex-col transition-all duration-300">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-brand-white border-b border-brand-dark-200/10 sticky top-0 z-30">
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

        <div className="p-4 md:p-8 flex-1 overflow-y-auto min-w-0 w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
