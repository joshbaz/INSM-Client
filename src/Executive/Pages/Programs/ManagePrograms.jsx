import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useManagedPrograms } from "../../../store/tanstackStore/services/queries";
import { formatMoney, PROGRAM_FREQUENCY_LABELS as FREQUENCY_LABELS } from "../../../data/projectOptions";
import ProgramFormModal from "./ProgramFormModal";

const COLOR_BARS = {
  lilac: "bg-brand-lilac",
  teal: "bg-brand-teal",
  gold: "bg-brand-gold",
  brown: "bg-brand-brown",
};

export const ProgressRow = ({ label, value, color = "bg-[#997B94]" }) => (
  <div>
    <div className="flex justify-between text-[11px] font-secondary font-bold text-gray-500 mb-1">
      <span>{label}</span>
      <span>{Math.round(value * 100)}%</span>
    </div>
    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  </div>
);

const ProgramCard = ({ program, onEdit }) => {
  const f = program.figures;
  const bar = COLOR_BARS[program.color] || "bg-gray-300";

  return (
    <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col">
      <div className={`h-1.5 ${program.isBuiltIn ? "bg-gray-300" : bar}`} />
      <div className="p-6 flex flex-col gap-5 grow">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[17px] font-bold font-secondary text-brand-dark truncate">{program.title}</h3>
            <p className="text-[12px] font-secondary text-[#9BA1A6]">
              {program.isBuiltIn
                ? "Built-in · gifts with no programme"
                : `${program.allowCustomAmount ? "From " : ""}${formatMoney(program.amount, program.currency)} · ${FREQUENCY_LABELS[program.frequency]}`}
            </p>
          </div>
          {!program.isBuiltIn && (
            <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded-full whitespace-nowrap ${program.isPublished ? "bg-[#22C55E]/10 text-[#16A34A]" : "bg-gray-100 text-gray-500"}`}>
              {program.isPublished ? "ON WEBSITE" : "HIDDEN"}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["Raised", formatMoney(f.raised, program.currency)],
            ["This month", formatMoney(f.raisedThisMonth, program.currency)],
            [program.frequency && program.frequency !== "once" ? "Members" : "Donors", f.supporterCount.toLocaleString()],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <div className="text-[18px] font-black font-albert text-brand-dark leading-tight truncate">{value}</div>
              <div className="text-[10px] font-bold tracking-widest text-[#9BA1A6] uppercase mt-1">{label}</div>
            </div>
          ))}
        </div>

        {(f.supporterProgress !== null || f.amountProgress !== null) && (
          <div className="space-y-3">
            {f.supporterProgress !== null && (
              <ProgressRow label={`${f.supporterCount.toLocaleString()} of ${program.goalSupporters.toLocaleString()} members`} value={f.supporterProgress} color={bar} />
            )}
            {f.amountProgress !== null && (
              <ProgressRow label={`${formatMoney(f.raised, program.currency)} of ${formatMoney(program.goalAmount, program.currency)}`} value={f.amountProgress} color={bar} />
            )}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="text-[12px] font-secondary text-[#9BA1A6]">
            {f.pendingCount ? `${f.pendingCount} processing` : f.lastPaymentAt ? `Last gift ${new Date(f.lastPaymentAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}` : "No gifts yet"}
          </span>
          <div className="flex items-center gap-2">
            {!program.isBuiltIn && (
              <button onClick={() => onEdit(program)} className="p-2 text-gray-400 hover:text-gray-800 transition-colors" title="Edit programme">
                <Icon icon="ph:pencil-simple-bold" className="w-4 h-4" />
              </button>
            )}
            <Link
              to={`/executive/capital/programs/${program.id}`}
              className="bg-[#997B94] hover:bg-[#866881] text-white text-[11px] font-bold tracking-widest px-4 py-2 rounded-full transition-colors uppercase"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManagePrograms = () => {
  const { data, isLoading } = useManagedPrograms();
  const [editing, setEditing] = useState(null); // null | { program?: object }

  const summary = data?.summary;
  const cards = [
    { title: "Raised across programmes", value: formatMoney(summary?.raisedUsd, "USD"), subtitle: `≈ ${formatMoney(summary?.raisedUgx, "UGX")}${summary?.pendingCount ? ` · ${summary.pendingCount} processing` : ""}` },
    { title: "This month", value: formatMoney(summary?.raisedThisMonthUsd, "USD"), subtitle: "Settled since the 1st" },
    { title: "Supporters", value: (summary?.supporterCount ?? 0).toLocaleString(), subtitle: "Unique donors per programme, combined" },
    { title: "Programmes on website", value: summary?.activePrograms ?? 0, subtitle: `${data?.programs.length ?? 0} in total` },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full">
      <div className="flex items-center gap-2 text-sm font-secondary font-medium text-[#A0AAB4]">
        <Link to="/executive/home" className="hover:text-brand-dark transition-colors text-[#997B94]">Home</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3" />
        <span className="text-brand-dark font-semibold">Programs</span>
      </div>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[28px] font-black font-albert text-brand-dark tracking-tight leading-none">Programs</h1>
          <p className="text-[#6B7280] text-[15px] font-medium font-secondary mt-2">
            Giving programmes on the Seed Portals page, such as The 1k Club, plus general donations.
          </p>
        </div>
        <button
          onClick={() => setEditing({})}
          className="bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors uppercase flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="ph:plus-bold" className="w-4 h-4" /> New program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between min-h-[130px]">
            <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary">{card.title}</h3>
            <div className="mt-3">
              <div className="text-[28px] font-black font-albert tracking-tight leading-none mb-2">
                {isLoading ? <span className="inline-block w-16 h-8 bg-brand-dark-200 animate-pulse rounded" /> : card.value}
              </div>
              <p className="text-[13px] font-secondary font-medium text-brand-dark-400">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.programs.map((program) => (
            <ProgramCard key={program.id} program={program} onEdit={(p) => setEditing({ program: p })} />
          ))}
          <ProgramCard program={data.general} />
          {data.programs.length === 0 && (
            <button
              onClick={() => setEditing({})}
              className="rounded-lg border-2 border-dashed border-brand-dark-200/40 p-6 flex flex-col items-center justify-center gap-2 text-[#997B94] hover:bg-white transition-colors min-h-[220px]"
            >
              <Icon icon="ph:plus-circle-bold" className="w-8 h-8" />
              <span className="text-sm font-bold font-secondary">Create your first programme</span>
              <span className="text-xs font-secondary text-gray-400">e.g. The 1k Club, UGX 1,000 weekly</span>
            </button>
          )}
        </div>
      )}

      {editing && <ProgramFormModal program={editing.program} onClose={() => setEditing(null)} />}
    </div>
  );
};

export default ManagePrograms;
