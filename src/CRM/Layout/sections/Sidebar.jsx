import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { 
      name: "Dashboard", 
      path: "/crm/dashboard", 
      icon: "material-symbols:dashboard-outline-rounded",
      isImg: false
    },
    { 
      name: "Capital", 
      path: "/crm/capital", 
      icon: "/icons/capital.png",
      isImg: true
    },
    { 
      name: "Network", 
      path: "/crm/network", 
      icon: "/icons/network.png",
      isImg: true
    },
    { 
      name: "Mentors", 
      path: "/crm/mentors", 
      icon: "/icons/mentors.png",
      isImg: true
    },
    { 
      name: "Content", 
      path: "/crm/content", 
      icon: "/icons/content.png",
      isImg: true
    },
  ];

  return (
    <aside className={`w-[280px] bg-brand-white border-r border-brand-dark-200/10 h-screen fixed left-0 top-0 text-brand-dark z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      {/* Logo / Header */}
      <div className="pt-8 pb-6 px-8 shrink-0 relative">
        {/* Mobile Close Button */}
        <button 
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 p-1.5 text-brand-dark-400 hover:text-brand-dark hover:bg-brand-dark-100/50 rounded-lg transition-colors cursor-pointer"
        >
          <Icon icon="heroicons:x-mark" className="w-5 h-5" />
        </button>

        {/* Text-only Branding */}
        <div>
          <h1 className="text-brand-lilac text-[22px] font-black tracking-tight leading-none mb-1.5 font-albert">
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
                  ? "bg-brand-dark-100/60 text-brand-dark after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[4px] after:bg-brand-lilac" 
                  : "hover:bg-brand-dark-100/30 text-brand-dark-700 hover:text-brand-dark"
              }`}
            >
              {item.isImg ? (
                <img 
                  src={item.icon} 
                  alt={`${item.name} Icon`} 
                  className={`w-5 h-5 object-contain transition-all duration-200 shrink-0 group-hover:scale-105 ${
                    isActive ? "brightness-75 contrast-125 saturate-150" : "opacity-75 group-hover:opacity-100"
                  }`} 
                />
              ) : (
                <Icon 
                  icon={item.icon} 
                  className={`w-5 h-5 transition-all duration-200 shrink-0 ${isActive ? "text-brand-lilac" : "text-brand-dark-400 group-hover:text-brand-dark group-hover:scale-105"}`} 
                />
              )}
              <span className={`text-[15px] font-secondary font-medium tracking-normal transition-colors duration-200 ${isActive ? 'font-semibold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Gray Divider situated strictly BELOW Content and ABOVE Settings */}
      <div className="border-t border-brand-dark-200/10 my-4 mx-6 shrink-0" />

      {/* Bottom Panel (Settings, Logout, and User Card) */}
      <div className="shrink-0 flex flex-col pb-8">
        {/* Settings */}
        <Link
          to="/crm/settings"
          className={`w-full relative py-3 px-8 flex items-center gap-3.5 transition-all duration-200 group ${
            location.pathname.startsWith("/crm/settings")
              ? "bg-brand-dark-100/60 text-brand-dark after:absolute after:right-0 after:top-0 after:bottom-0 after:w-[4px] after:bg-brand-lilac"
              : "hover:bg-brand-dark-100/30 text-brand-dark-700 hover:text-brand-dark"
          }`}
        >
          <Icon 
            icon="ph:gear-bold" 
            className="w-5 h-5 text-brand-dark-400 group-hover:text-brand-dark transition-colors" 
          />
          <span className="text-[15px] font-secondary font-medium">Settings</span>
        </Link>

        {/* Logout */}
        <Link
          to="/login"
          className="w-full py-3 px-8 flex items-center gap-3.5 hover:bg-brand-dark-100/30 text-brand-dark-700 hover:text-brand-dark transition-all duration-200"
        >
          <Icon 
            icon="ph:sign-out-bold" 
            className="w-5 h-5 text-brand-dark-400 hover:text-brand-dark transition-colors" 
          />
          <span className="text-[15px] font-secondary font-medium">Logout</span>
        </Link>

        {/* Space spacing */}
        <div className="h-4" />

        {/* Executive Profile Card */}
        <div className="px-8 pt-1 flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256" 
            alt="Joshua Kimbareeba Profile Portrait" 
            className="w-11 h-11 rounded-full object-cover border border-gray-100 shadow-sm shrink-0"
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-brand-dark leading-snug truncate">
              Director Admin
            </p>
            <p className="text-xs text-brand-dark-400 font-medium font-secondary leading-none mt-0.5">
              Joshua Kimbareeba
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
