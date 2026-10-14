import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../store/context/AuthContext";
import { usePartnerDashboard, useUpdateTask } from "../partnerQueries";
import { shortDate } from "../partnerOptions";

const Stat = ({ label, value, hint, to, highlight }) => {
  const body = (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 h-full">
      <p className="text-xs font-bold font-secondary text-gray-500">{label}</p>
      <p className={`text-3xl font-black font-albert mt-1 ${highlight ? "text-[#b8871f]" : "text-gray-900"}`}>{value ?? "—"}</p>
      {hint && <p className="text-[11px] font-secondary text-gray-400 mt-0.5">{hint}</p>}
    </div>
  );
  return to ? <Link to={to} className="block hover:opacity-90">{body}</Link> : body;
};

const Action = ({ to, icon, label, color }) => (
  <Link to={to} className={`${color} text-white rounded-xl p-4 flex items-center gap-3 font-bold font-secondary text-sm hover:opacity-90 shadow-sm`}>
    <Icon icon={icon} className="w-6 h-6 shrink-0" /> {label}
  </Link>
);

const Panel = ({ title, to, children }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
    <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
      <h2 className="text-sm font-bold font-secondary text-gray-800">{title}</h2>
      {to && <Link to={to} className="text-xs font-bold text-[#997B94] hover:underline">See all →</Link>}
    </div>
    {children}
  </div>
);

const PartnerHome = () => {
  const { user } = useAuth();
  const { data, isLoading } = usePartnerDashboard();
  const updateTask = useUpdateTask();
  const isMentor = data?.role === "MENTOR";
  const s = data?.stats || {};

  if (isLoading) {
    return <div className="flex justify-center py-20"><Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-[#997B94] animate-spin" /></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold font-secondary text-gray-900">Hello{user?.name ? `, ${user.name.split(" ")[0]}` : ""}</h1>
        <p className="text-sm font-secondary text-gray-500">
          {isMentor ? "Support requests from Community Equippers in your field." : "Your parish at a glance."}
        </p>
      </div>

      {isMentor ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Open in your field" value={s.openInDomain} hint="Waiting for a mentor" to="/terminal/support" highlight={s.openInDomain > 0} />
          <Stat label="You're handling" value={s.mine} to="/terminal/support" />
          <Stat label="Resolved by you" value={s.resolved} />
          <Stat label="Tasks from HQ" value={s.openTasks} to="/terminal/tasks" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Mothers registered" value={s.mothersCount} to="/terminal/mothers" />
            <Stat label="Passbooks issued" value={s.passbooksIssued} hint="Approved by HQ" />
            <Stat label="Waiting for a passbook" value={s.awaitingPassbook} to="/terminal/mothers?passbook=waiting" highlight={s.awaitingPassbook > 0} />
            <Stat label="Tasks from HQ" value={s.openTasks} to="/terminal/tasks" highlight={s.openTasks > 0} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Action to="/terminal/mothers?new=1" icon="ph:user-plus-bold" label="Register a mother" color="bg-[#997B94]" />
            <Action to="/terminal/handouts?new=1" icon="ph:book-open-bold" label="Report a handout" color="bg-[#78a2a5]" />
            <Action to="/terminal/support?new=1" icon="ph:lifebuoy-bold" label="Ask a mentor" color="bg-[#334b65]" />
          </div>
          {(s.pendingReports > 0 || s.openRequests > 0) && (
            <p className="text-xs font-secondary text-gray-500">
              {s.pendingReports > 0 && <><Link to="/terminal/handouts" className="font-bold text-[#997B94]">{s.pendingReports} handout report{s.pendingReports === 1 ? "" : "s"}</Link> waiting for HQ review. </>}
              {s.openRequests > 0 && <><Link to="/terminal/support" className="font-bold text-[#997B94]">{s.openRequests} mentor request{s.openRequests === 1 ? "" : "s"}</Link> still open.</>}
            </p>
          )}
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Tasks from HQ" to="/terminal/tasks">
          {data.tasks.length === 0 ? (
            <p className="px-5 py-6 text-sm font-secondary text-gray-400">No open tasks. 🎉</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {data.tasks.map((task) => (
                <li key={task.id} className="px-5 py-3 flex items-start gap-3">
                  <button
                    onClick={() => updateTask.mutate({ id: task.id, done: true })}
                    className="mt-0.5 w-5 h-5 rounded border-2 border-gray-300 hover:border-[#997B94] shrink-0"
                    title="Mark done"
                  />
                  <div>
                    <p className="text-sm font-secondary text-gray-800 whitespace-pre-line">{task.body}</p>
                    <p className="text-xs font-secondary text-gray-400">{shortDate(task.date)}{task.createdByName ? ` · from ${task.createdByName}` : ""}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Announcements" to="/terminal/announcements">
          {data.announcements.length === 0 ? (
            <p className="px-5 py-6 text-sm font-secondary text-gray-400">No announcements yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {data.announcements.map((a) => (
                <li key={a.id} className="px-5 py-3">
                  <p className="text-sm font-bold font-secondary text-gray-900 flex items-center gap-1.5">
                    {a.isPinned && <Icon icon="ph:push-pin-fill" className="w-3.5 h-3.5 text-[#b8871f]" />} {a.title}
                  </p>
                  <p className="text-sm font-secondary text-gray-600 line-clamp-2">{a.body}</p>
                  <p className="text-xs font-secondary text-gray-400 mt-0.5">{shortDate(a.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {!isMentor && (
          <Panel title="Recently registered" to="/terminal/mothers">
            {data.recentMothers.length === 0 ? (
              <p className="px-5 py-6 text-sm font-secondary text-gray-400">
                No mothers registered yet. <Link to="/terminal/mothers?new=1" className="font-bold text-[#997B94]">Register the first one →</Link>
              </p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {data.recentMothers.map((m) => (
                  <li key={m.id}>
                    <Link to={`/terminal/mothers?open=${m.id}`} className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-gray-50">
                      <div>
                        <p className="text-sm font-bold font-secondary text-gray-900">{m.fullName}</p>
                        <p className="text-xs font-secondary text-gray-400">{m.village || "—"} · registered {shortDate(m.createdAt)}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${m.passbookIssuedAt ? "bg-[#22C55E]/10 text-[#16A34A]" : "bg-[#dca838]/15 text-[#b8871f]"}`}>
                        {m.passbookIssuedAt ? "HAS PASSBOOK" : "NO PASSBOOK YET"}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        )}
      </div>
    </div>
  );
};

export default PartnerHome;
