import React from "react";
import { Icon } from "@iconify/react";
import { useTasks, useUpdateTask, useAnnouncements } from "../partnerQueries";
import { shortDate } from "../partnerOptions";

const TaskItem = ({ task, onToggle }) => (
  <li className="px-5 py-3.5 flex items-start gap-3">
    <button
      onClick={() => onToggle(task)}
      className={`mt-0.5 w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center ${task.done ? "bg-[#22C55E] border-[#22C55E]" : "border-gray-300 hover:border-[#997B94]"}`}
      title={task.done ? "Mark as not done" : "Mark done"}
    >
      {task.done && <Icon icon="ph:check-bold" className="w-3 h-3 text-white" />}
    </button>
    <div>
      <p className={`text-sm font-secondary whitespace-pre-line ${task.done ? "text-gray-400 line-through" : "text-gray-800"}`}>{task.body}</p>
      <p className="text-xs font-secondary text-gray-400">
        {shortDate(task.date)}{task.createdByName ? ` · from ${task.createdByName}` : ""}{task.done && task.doneAt ? ` · done ${shortDate(task.doneAt)}` : ""}
      </p>
    </div>
  </li>
);

// Tasks: "assignment" entries HQ logs on the member's profile in the Equippers Network
export const Tasks = () => {
  const { data: tasks = [], isLoading } = useTasks();
  const updateTask = useUpdateTask();
  const open = tasks.filter((t) => !t.done);
  const done = tasks.filter((t) => t.done);
  const toggle = (task) => updateTask.mutate({ id: task.id, done: !task.done });

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold font-secondary text-gray-900">Tasks</h1>
        <p className="text-sm font-secondary text-gray-500">Assignments from INSM headquarters. Tick them off when they're done.</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin text-[#997B94]" /></div>
      ) : (
        <>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            {open.length === 0 ? <p className="px-5 py-8 text-sm text-center font-secondary text-gray-400">No open tasks.</p> : (
              <ul className="divide-y divide-gray-100">{open.map((t) => <TaskItem key={t.id} task={t} onToggle={toggle} />)}</ul>
            )}
          </div>
          {done.length > 0 && (
            <>
              <h2 className="text-xs font-bold font-secondary text-gray-400 uppercase tracking-wider pt-2">Done</h2>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <ul className="divide-y divide-gray-100">{done.map((t) => <TaskItem key={t.id} task={t} onToggle={toggle} />)}</ul>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export const Announcements = () => {
  const { data: announcements = [], isLoading } = useAnnouncements();
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <div>
        <h1 className="text-xl font-bold font-secondary text-gray-900">Announcements</h1>
        <p className="text-sm font-secondary text-gray-500">News, guidance and resources from INSM headquarters.</p>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12"><Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin text-[#997B94]" /></div>
      ) : announcements.length === 0 ? (
        <p className="py-12 text-center text-sm font-secondary text-gray-400 bg-white rounded-xl border border-gray-100">No announcements yet.</p>
      ) : (
        <ul className="space-y-3">
          {announcements.map((a) => (
            <li key={a.id} className={`bg-white rounded-xl border shadow-sm p-5 ${a.isPinned ? "border-[#dca838]/40" : "border-gray-100"}`}>
              <p className="text-xs font-secondary text-gray-400 flex items-center gap-1.5">
                {a.isPinned && <><Icon icon="ph:push-pin-fill" className="w-3.5 h-3.5 text-[#b8871f]" /> Pinned ·</>}
                {shortDate(a.createdAt)}{a.createdByName ? ` · ${a.createdByName}` : ""}
              </p>
              <h2 className="text-base font-bold font-secondary text-gray-900 mt-1">{a.title}</h2>
              <p className="text-sm font-secondary text-gray-700 mt-1 whitespace-pre-line">{a.body}</p>
              {a.link && (
                <a href={a.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-sm font-bold text-[#997B94] hover:underline">
                  <Icon icon="ph:link-bold" /> Open resource
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
