import React from "react";
import { Icon } from "@iconify/react";

const activities = [
  { id: 1, type: "registration", user: "Sarah Namono", action: "was registered as a new beneficiary", time: "2 hours ago", icon: "heroicons:user-plus", color: "text-brand-teal", bg: "bg-brand-teal/10" },
  { id: 2, type: "donation", user: "John Doe", action: "donated $500 to the 'Thread' tier", time: "4 hours ago", icon: "heroicons:banknotes", color: "text-brand-gold", bg: "bg-brand-gold/10" },
  { id: 3, type: "program", user: "Vocational Hub", action: "status updated to 'In Progress'", time: "Yesterday", icon: "heroicons:academic-cap", color: "text-brand-lilac", bg: "bg-brand-lilac/10" },
  { id: 4, type: "media", user: "Gallery", action: "5 new photos added to 'Western Region'", time: "2 days ago", icon: "heroicons:photo", color: "text-brand-navy", bg: "bg-brand-navy/10" },
];

const RecentActivity = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-brand-dark-200/10 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-primary font-bold text-brand-dark">Recent Activity</h3>
        <button className="text-xs font-bold text-brand-gold hover:underline">View All</button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="flex gap-4 relative">
            {index !== activities.length - 1 && (
              <div className="absolute left-6 top-10 bottom-0 w-[1px] bg-brand-dark-200/20"></div>
            )}
            <div className={`w-12 h-12 rounded-xl ${activity.bg} ${activity.color} flex items-center justify-center shrink-0 z-10`}>
              <Icon icon={activity.icon} className="w-6 h-6" />
            </div>
            <div className="pt-1">
              <p className="text-sm font-secondary text-brand-dark-600">
                <span className="font-bold text-brand-dark">{activity.user}</span> {activity.action}
              </p>
              <p className="text-[10px] font-bold text-brand-dark-400 uppercase tracking-widest mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
