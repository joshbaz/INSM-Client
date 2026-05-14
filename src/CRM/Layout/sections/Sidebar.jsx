import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/crm/dashboard", icon: "heroicons:home-20-solid" },
    { name: "Media (Gallery)", path: "/crm/media", icon: "heroicons:photo" },
    { name: "Donation Management", path: "/crm/donations", icon: "heroicons:banknotes" },
    { name: "Blog Management", path: "/crm/blogs", icon: "heroicons:document-text" },
    { name: "Projects Management", path: "/crm/projects", icon: "heroicons:academic-cap" },
    { name: "Beneficiaries", path: "/crm/beneficiaries", icon: "heroicons:users" },
    { name: "Partners", path: "/crm/partners", icon: "heroicons:briefcase" },
    { name: "Settings", path: "/crm/settings", icon: "heroicons:cog-6-tooth" },
  ];

  return (
    <aside className="w-60 bg-brand-white border-r border-brand-dark-200/20 h-screen fixed left-0 top-0 text-brand-dark p-5 z-50 flex flex-col">
      <div className="mb-8 px-1 shrink-0">
        <div className="flex items-center gap-3 mb-4">
          <img src="/logo.png" alt="INSM Logo" className="w-8 h-8 object-contain rounded-full bg-brand-navy" />
          <div>
            <h1 className="text-lg font-primary font-bold text-brand-gold tracking-tight leading-none">INSM</h1>
          </div>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center gap-2.5 px-1 py-2">
          <div className="w-8 h-8 rounded-lg bg-brand-teal-100 flex shrink-0 items-center justify-center text-brand-teal-700 text-xs font-bold">
            JK
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-primary font-bold text-brand-dark truncate">Joshua Kimbareeba</p>
            <p className="text-[9px] font-secondary text-brand-dark-400 font-bold truncate">System Developer</p>
          </div>
        </div>
      </div>

      <nav className="space-y-0.5 flex-1 overflow-y-auto pr-2 no-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-300 group ${
                isActive 
                  ? "bg-brand-gold text-brand-white shadow-md shadow-brand-gold/20" 
                  : "hover:bg-brand-white-100 text-brand-dark-400 hover:text-brand-dark"
              }`}
            >
              <Icon 
                icon={item.icon} 
                className={`w-4 h-4 ${isActive ? "text-brand-white" : "text-brand-gold group-hover:scale-110 transition-transform"}`} 
              />
              <span className="text-[13px] font-secondary font-bold tracking-tight">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 pt-5 border-t border-brand-dark-200/10 shrink-0">
        <Link
          to="/login"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-all duration-300 group hover:bg-brand-white-100 text-brand-dark-400 hover:text-brand-dark"
        >
          <Icon 
            icon="heroicons:arrow-right-on-rectangle" 
            className="w-4 h-4 text-brand-gold group-hover:scale-110 transition-transform" 
          />
          <span className="text-[13px] font-secondary font-bold tracking-tight">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
