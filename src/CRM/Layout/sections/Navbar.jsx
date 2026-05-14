import React from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname.split("/").pop();
    if (!path || path === "dashboard") return "Overview";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <nav className="h-20 bg-white border-b border-brand-dark-200/10 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-white/80">
      <div></div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-brand-dark-400 hover:text-brand-gold transition-colors">
          <Icon icon="heroicons:bell" className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-teal rounded-full"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
