import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQueryClient } from "@tanstack/react-query";
import { useNotifications, useMarkNotificationsSeen } from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";

// Server events that mean something new for the bell
const LIVE_EVENTS = ["new_application", "application_status_updated", "payment_settled", "field_report_submitted", "support_request_created"];

const KIND_STYLES = {
  application: { icon: "ph:user-plus-bold", style: "bg-[#a57ea9]/15 text-[#916b94]" },
  payment: { icon: "ph:currency-circle-dollar-bold", style: "bg-[#22C55E]/10 text-[#16A34A]" },
  report: { icon: "ph:book-open-bold", style: "bg-[#dca838]/15 text-[#b8871f]" },
  support: { icon: "ph:lifebuoy-bold", style: "bg-[#78a2a5]/15 text-[#4d7a7d]" },
};

const timeAgo = (date) => {
  const minutes = Math.round((Date.now() - new Date(date)) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days}d ago`;
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useNotifications();
  const markSeen = useMarkNotificationsSeen();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const refresh = () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["executive-summary"] });
    };
    LIVE_EVENTS.forEach((event) => socket.on(event, refresh));
    return () => LIVE_EVENTS.forEach((event) => socket.off(event, refresh));
  }, [socket, queryClient]);

  const a = data?.attention;
  const attention = a ? [
    a.pendingLeads > 0 && { icon: "ph:stack-bold", text: `${a.pendingLeads} lead${a.pendingLeads === 1 ? "" : "s"} waiting for review`, to: "/executive/leads", cta: "Review" },
    a.pendingReports > 0 && { icon: "ph:book-open-bold", text: `${a.pendingReports} handout report${a.pendingReports === 1 ? "" : "s"} from the field`, to: "/executive/network", cta: "Review" },
    a.unassignedSupport > 0 && { icon: "ph:lifebuoy-bold", text: `${a.unassignedSupport} mentor request${a.unassignedSupport === 1 ? "" : "s"} with no mentor`, to: "/executive/network", cta: "Assign" },
    a.processingPayments > 0 && { icon: "ph:hourglass-bold", text: `${a.processingPayments} payment${a.processingPayments === 1 ? "" : "s"} still processing with PesaPal` },
  ].filter(Boolean) : [];
  const badge = (data?.attentionCount || 0) + (data?.unreadCount || 0);
  const close = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="relative p-1 text-brand-dark-400 hover:text-brand-dark transition-colors cursor-pointer"
        aria-label={`Notifications${badge ? ` (${badge})` : ""}`}
      >
        <Icon icon="ph:bell-fill" className="w-[22px] h-[22px]" />
        {badge > 0 && (
          <span className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={close} />
          <div className="absolute right-0 mt-3 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider">Needs attention</p>
            </div>
            {attention.length === 0 ? (
              <p className="px-4 py-3 text-sm font-secondary text-gray-400">All caught up.</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {attention.map((item) => (
                  <li key={item.text} className="px-4 py-2.5 flex items-center gap-3">
                    <Icon icon={item.icon} className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="flex-1 text-sm font-secondary text-gray-800">{item.text}</span>
                    {item.to && <Link to={item.to} onClick={close} className="text-xs font-bold text-[#a57ea9] hover:underline whitespace-nowrap">{item.cta} →</Link>}
                  </li>
                ))}
              </ul>
            )}

            <div className="px-4 py-3 border-y border-gray-100 flex items-center justify-between">
              <p className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider">Recent activity</p>
              {data?.unreadCount > 0 && (
                <button onClick={() => markSeen.mutate()} disabled={markSeen.isPending} className="text-xs font-bold text-[#a57ea9] hover:underline">
                  Mark all read
                </button>
              )}
            </div>
            <ul className="max-h-[340px] overflow-y-auto divide-y divide-gray-50">
              {(data?.activity || []).map((item) => {
                const kind = KIND_STYLES[item.kind];
                return (
                  <li key={item.id}>
                    <Link to={item.link} onClick={close} className={`px-4 py-3 flex items-start gap-3 hover:bg-gray-50 ${item.unread ? "bg-[#a57ea9]/5" : ""}`}>
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${kind.style}`}>
                        <Icon icon={kind.icon} className="w-4 h-4" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-secondary text-gray-900 ${item.unread ? "font-bold" : ""}`}>{item.title}</p>
                        <p className="text-xs font-secondary text-gray-400 truncate">{item.detail} · {timeAgo(item.at)}</p>
                      </div>
                      {item.unread && <span className="w-2 h-2 rounded-full bg-[#a57ea9] mt-2 shrink-0" />}
                    </Link>
                  </li>
                );
              })}
              {data && data.activity.length === 0 && (
                <li className="px-4 py-6 text-center text-sm font-secondary text-gray-400">Nothing in the last 14 days.</li>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
