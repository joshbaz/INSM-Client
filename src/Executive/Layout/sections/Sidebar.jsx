import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { 
      name: "Home", 
      path: "/executive/home", 
      icon: "ph:squares-four-bold"
    },
    { 
      name: "Capital", 
      path: "/executive/capital", 
      icon: "ph:money-wavy-bold"
    },
    { 
      name: "Leads", 
      path: "/executive/leads", 
      icon: "ph:stack-bold"
    },
    { 
      name: "Equippers Network", 
      path: "/executive/network", 
      icon: "ph:graph-bold"
    },
    { 
      name: "Manage Blogs", 
      path: "/executive/blogs", 
      icon: "ph:article-bold"
    },
    { 
      name: "Manage Photos", 
      path: "/executive/photos", 
      icon: "ph:image-bold"
    }
  ];

  return (
    <aside className={`w-[280px] bg-[#1a1c1d] border-r border-brand-dark-200/10 h-screen fixed left-0 top-0 text-brand-white z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      {/* Logo / Header */}
      <div className="pt-8 pb-6 px-8 shrink-0 relative">
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-1.5 text-brand-dark-400 hover:text-white hover:bg-brand-dark-700 rounded-lg transition-colors cursor-pointer"
        >
          <Icon icon="heroicons:x-mark" className="w-5 h-5" />
        </button>

        {/* Text-only Branding */}
        <div>
          <h1 className="text-[#D4AF37] text-[22px] font-black tracking-tight leading-none mb-1.5 font-albert">
            INSM Uganda
          </h1>
          <p className="text-brand-dark-400 text-sm font-medium font-secondary">
            Executive Portal
          </p>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-2 no-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`w-full relative py-3.5 px-8 flex items-center gap-3.5 transition-all duration-200 group ${
                isActive 
                  ? "bg-[#D4AF37]/10 text-brand-white after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[4px] after:bg-[#D4AF37]" 
                  : "hover:bg-brand-dark-700/50 text-[#8b8e91] hover:text-brand-white"
              }`}
            >
              <Icon 
                icon={item.icon} 
                className={`w-5 h-5 transition-all duration-200 shrink-0 ${isActive ? "text-[#D4AF37]" : "text-[#8b8e91] group-hover:text-brand-white group-hover:scale-105"}`} 
              />
              <span className={`text-[15px] font-secondary font-medium tracking-normal transition-colors duration-200 ${isActive ? 'font-semibold text-[#D4AF37]' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Gray Divider */}
      <div className="border-t border-brand-dark-700/50 my-4 mx-6 shrink-0" />

      {/* Bottom Panel (Settings, Logout) */}
      <div className="shrink-0 flex flex-col pb-8">
        {/* Settings */}
        <Link
          to="/executive/settings"
          className={`w-full relative py-3 px-8 flex items-center gap-3.5 transition-all duration-200 group ${
            location.pathname.startsWith("/executive/settings")
              ? "bg-[#D4AF37]/10 text-brand-white after:absolute after:left-0 after:top-0 after:bottom-0 after:w-[4px] after:bg-[#D4AF37]"
              : "hover:bg-brand-dark-700/50 text-[#8b8e91] hover:text-brand-white"
          }`}
        >
          <Icon 
            icon="ph:gear-bold" 
            className="w-5 h-5 transition-colors" 
          />
          <span className="text-[15px] font-secondary font-medium">Settings</span>
        </Link>

        {/* Logout */}
        <Link
          to="/login"
          className="w-full py-3 px-8 flex items-center gap-3.5 hover:bg-brand-dark-700/50 text-[#8b8e91] hover:text-brand-white transition-all duration-200 group"
        >
          <Icon 
            icon="ph:sign-out-bold" 
            className="w-5 h-5 transition-colors" 
          />
          <span className="text-[15px] font-secondary font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
