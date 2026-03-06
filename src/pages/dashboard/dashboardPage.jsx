import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useAuth } from "../../store/context/AuthContext";
import { fadeUp, staggerContainer } from "../../utils/animations";

const Dashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      label: "Active Mothers",
      value: "17,402",
      icon: "heroicons:users",
      color: "text-brand-lilac",
    },
    {
      label: "Deployment Hubs",
      value: "142",
      icon: "heroicons:building-office-2",
      color: "text-brand-gold",
    },
    {
      label: "Market Dominance",
      value: "92%",
      icon: "heroicons:chart-bar",
      color: "text-green-400",
    },
    {
      label: "Capital Deployed",
      value: "UGX 4.2B",
      icon: "heroicons:currency-dollar",
      color: "text-brand-lilac-300",
    },
  ];

  const activities = [
    {
      id: 1,
      type: "Registration",
      user: "Sarah Nabiddo",
      region: "Kampala",
      status: "Verified",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "Seed Funding",
      user: "Grace Atim",
      region: "Gulu",
      status: "Processed",
      time: "15 mins ago",
    },
    {
      id: 3,
      type: "Market Report",
      user: "Mary Nakato",
      region: "Masaka",
      status: "Updated",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col pt-10 pb-20 px-6 md:px-12 lg:px-20">
      <motion.div
        className="max-w-7xl mx-auto w-full"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {/* Header */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
        >
          <div>
            <h1 className="text-3xl font-primary font-black text-brand-dark uppercase tracking-tight">
              Institutional{" "}
              <span className="text-brand-lilac-700">Dashboard</span>
            </h1>
            <p className="text-brand-dark-300 font-secondary text-sm mt-1">
              Welcome back,{" "}
              <span className="font-bold text-brand-lilac-800">
                {user?.email}
              </span>{" "}
              — Monitoring National Economic Stability
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-brand-white border border-brand-dark-100 p-2 rounded-lg text-brand-dark-400 hover:text-brand-lilac transition-colors cursor-pointer relative">
              <Icon icon="heroicons:bell" className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-brand-dark text-brand-white px-5 py-2.5 rounded-full text-xs font-primary font-bold uppercase tracking-wider hover:bg-brand-dark-900 transition-all cursor-pointer"
            >
              <Icon
                icon="heroicons:arrow-right-on-rectangle"
                className="w-4 h-4"
              />
              Terminate Session
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={fadeUp}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white border border-brand-dark-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                  <Icon icon={stat.icon} className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">
                  +4.2%
                </span>
              </div>
              <p className="text-3xl font-primary font-black text-brand-dark leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-xs font-secondary text-brand-dark-300 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-2 bg-white border border-brand-dark-100 rounded-2xl overflow-hidden shadow-sm"
          >
            <div className="px-6 py-5 border-b border-brand-dark-100 flex items-center justify-between">
              <h3 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                Live Infrastructure Feed
              </h3>
              <button className="text-brand-lilac-700 text-[10px] font-bold uppercase tracking-widest hover:underline">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest">
                      Operative
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest">
                      Region
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest">
                      Action
                    </th>
                    <th className="px-6 py-4 text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-dark-100">
                  {activities.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-lilac-100 flex items-center justify-center text-brand-lilac-700 text-xs font-bold">
                            {item.user.charAt(0)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-brand-dark">
                              {item.user}
                            </p>
                            <p className="text-[9px] text-brand-dark-300">
                              {item.time}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-brand-dark-400">
                        {item.region}
                      </td>
                      <td className="px-6 py-4 text-xs font-medium text-brand-dark">
                        {item.type}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-500 px-2 py-1 rounded-sm uppercase tracking-widest border border-blue-100">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Quick Actions / System Health */}
          <motion.div
            variants={fadeUp}
            className="bg-brand-dark rounded-2xl p-8 text-white shadow-xl"
          >
            <h3 className="font-primary font-bold text-brand-gold uppercase tracking-widest text-xs mb-8">
              System Directives
            </h3>

            <div className="space-y-6">
              <button className="w-full bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-all text-left">
                <div className="p-2 rounded-lg bg-brand-gold/20 text-brand-gold">
                  <Icon icon="heroicons:plus-circle" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide">
                    Register Hub
                  </p>
                  <p className="text-[10px] text-white/40">
                    Authorized Entry Only
                  </p>
                </div>
              </button>

              <button className="w-full bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 transition-all text-left">
                <div className="p-2 rounded-lg bg-brand-lilac/20 text-brand-lilac">
                  <Icon icon="heroicons:document-text" className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide">
                    Generate Report
                  </p>
                  <p className="text-[10px] text-white/40">
                    Fiscal & Impact Audit
                  </p>
                </div>
              </button>

              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    Protocol Integrity
                  </span>
                  <span className="text-[10px] text-green-400 font-bold">
                    OPTIMAL
                  </span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[98%] h-full bg-brand-gold"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
