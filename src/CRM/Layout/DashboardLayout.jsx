import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sections/Sidebar";
import Navbar from "./sections/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-brand-white-100 flex">
      <Sidebar />
      
      <main className="flex-1 ml-60 min-h-screen flex flex-col">
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
