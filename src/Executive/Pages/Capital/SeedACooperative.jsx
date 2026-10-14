import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useTiers, usePayments, useTierImpact, useSeedOverview, useAllDeliveries,
} from "../../../store/tanstackStore/services/queries";
import { useSocket } from "../../../store/context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";
import DeliveryModal from "./components/DeliveryModal";

const LIMIT = 10;
const TIERS_PATH = "/executive/capital/seed-a-cooperative/tiers";

const formatCurrency = (val, currency = "UGX") => {
  if (val === undefined || val === null) return "-";
  if (currency === "USD") return `$${Math.round(parseFloat(val)).toLocaleString()}`;
  return `UGX ${Math.round(parseFloat(val)).toLocaleString()}`;
};

const shortDate = (date) => new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
const plural = (n, word) => `${n.toLocaleString()} ${word}${Math.abs(n) === 1 ? "" : "s"}`;
const recipientCount = (text) => (text || "").split("\n").filter((l) => l.trim()).length;

const renderStatus = (status) => {
  const styles = {
    PENDING: ["PROCESSING", "text-[#A0AAB4]", "ph:arrows-clockwise-bold"],
    SUCCESS: ["SETTLED", "text-[#22C55E]", "ph:check-circle-bold"],
    FAILED: ["FAILED", "text-[#EF4444]", "ph:x-circle-bold"],
  };
  const [label, color, icon] = styles[status] || [status, "text-[#A0AAB4]", null];
  return (
    <span className={`flex items-center gap-1.5 font-bold text-[11px] tracking-widest ${color}`}>
      {label} {icon && <Icon icon={icon} className="w-3.5 h-3.5" />}
    </span>
  );
};

const Pagination = ({ page, pages, total, onChange }) => {
  if (!total) return null;
  return (
    <div className="flex items-center justify-between px-8 py-4 border-t border-brand-dark-200/20 bg-white">
      <div className="text-[13px] text-[#9BA1A6] font-medium">
        Showing {(page - 1) * LIMIT + 1} to {Math.min(page * LIMIT, total)} of {total} entries
      </div>
      <div className="flex items-center gap-1 text-[13px] font-bold">
        <button disabled={page === 1} onClick={() => onChange(page - 1)} className="p-1.5 text-[#9BA1A6] hover:text-brand-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
          <Icon icon="ph:caret-left-bold" className="w-4 h-4" />
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${
              page === n ? "bg-gray-100 text-brand-dark font-bold border border-brand-dark-200/20" : "text-[#9BA1A6] hover:bg-gray-50"
            }`}
          >
            {n}
          </button>
        ))}
        <button disabled={page === pages} onClick={() => onChange(page + 1)} className="p-1.5 text-[#9BA1A6] hover:text-brand-dark disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer">
          <Icon icon="ph:caret-right-bold" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const EmptyRow = ({ icon, text, loading }) => (
  <div className="flex flex-col grow items-center justify-center py-20 gap-2">
    <Icon icon={loading ? "ph:spinner-gap-bold" : icon} className={`w-8 h-8 ${loading ? "animate-spin text-[#769E8D]" : "text-brand-dark-300"}`} />
    <span className="text-xs font-semibold text-brand-dark-400 uppercase tracking-widest">{loading ? "Loading..." : text}</span>
  </div>
);

// One card per tier that tracks a unit: funded vs delivered, with a direct Record button
const ImpactCard = ({ tier, onRecord }) => {
  const { impact } = tier;
  const waiting = impact.awaitingUnits;
  const figures = [
    ["Funded", Math.floor(impact.fundedUnits).toLocaleString(), "text-brand-dark"],
    ["Delivered", impact.totalDelivered.toLocaleString(), "text-brand-dark"],
    waiting >= 0
      ? ["Waiting", waiting.toLocaleString(), waiting > 0 ? "text-[#b8871f]" : "text-brand-dark"]
      : ["Ahead", Math.abs(waiting).toLocaleString(), "text-[#4d7a7d]"],
  ];

  return (
    <div className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[17px] font-bold text-brand-dark font-secondary capitalize">{impact.unitName}s</h3>
          <p className="text-[12px] font-secondary text-[#9BA1A6]">{tier.title} · ${impact.unitCost.toLocaleString()} each</p>
        </div>
        {waiting > 0 && (
          <span className="text-[10px] font-bold text-[#b8871f] bg-[#dca838]/10 px-2 py-1 rounded-full tracking-wide whitespace-nowrap">
            {waiting} TO ISSUE
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {figures.map(([label, value, color]) => (
          <div key={label}>
            <div className={`text-[28px] font-black font-albert leading-none ${color}`}>{value}</div>
            <div className="text-[10px] font-bold tracking-widest text-[#9BA1A6] uppercase mt-1.5">{label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          onClick={onRecord}
          className="bg-[#997B94] hover:bg-[#866881] text-white text-[11px] font-bold tracking-widest px-4 py-2 rounded-full transition-colors uppercase flex items-center gap-1.5 cursor-pointer"
        >
          <Icon icon="ph:plus-bold" className="w-3.5 h-3.5" /> Record {impact.unitName}s
        </button>
        <Link to={`${TIERS_PATH}/${tier.id}`} className="text-[12px] font-bold font-secondary text-[#997B94] hover:underline">
          View register →
        </Link>
      </div>
    </div>
  );
};

const PaymentsTable = ({ tiers }) => {
  const [frequency, setFrequency] = useState("ALL");
  const [tierId, setTierId] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePayments({
    page,
    limit: LIMIT,
    tab: "SEED-A-COOPERATIVE",
    frequency,
    ...(tierId ? { tierId } : {}),
  });
  const payments = data?.payments || [];

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-8 py-3 border-b border-brand-dark-200/20 flex-wrap">
        <div className="flex gap-2">
          {[["ALL", "All"], ["ONE-TIME", "One-time"], ["MONTHLY", "Monthly"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => { setFrequency(key); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-[12px] font-secondary font-semibold transition-colors cursor-pointer ${
                frequency === key ? "bg-brand-dark text-white" : "bg-gray-100 text-brand-dark-400 hover:text-brand-dark"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          value={tierId}
          onChange={(e) => { setTierId(e.target.value); setPage(1); }}
          className="border border-brand-dark-200/30 rounded-full px-4 py-1.5 text-[12px] font-secondary font-semibold text-brand-dark bg-white outline-none focus:border-[#997B94]"
        >
          <option value="">All tiers</option>
          {tiers.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.2fr_1fr] px-8 py-4 bg-[#F9FAFB] border-b border-brand-dark-200/20 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase">
            <div>DATE</div>
            <div>FULLNAME</div>
            <div>TRANSACTION ID</div>
            <div>AMOUNT</div>
            <div>TIER</div>
            <div>PESAPAL STATUS</div>
          </div>
          <div className="flex flex-col divide-y divide-brand-dark-200/10 min-h-[250px]">
            {isLoading || payments.length === 0 ? (
              <EmptyRow icon="ph:receipt-bold" text="No transactions found" loading={isLoading} />
            ) : payments.map((row) => (
              <div key={row.id} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.2fr_1fr] px-8 py-4 items-center text-[13px] text-brand-dark font-secondary">
                <div className="text-brand-dark/70 font-medium">{shortDate(row.createdAt)}</div>
                <div className="font-semibold">
                  {`${row.donorFirstName || ""} ${row.donorLastName || ""}`.trim() || "Anonymous"}
                  {row.type === "RECURRING" && <span className="ml-2 text-[10px] font-bold text-[#769E8D] tracking-widest">MONTHLY</span>}
                </div>
                <div className="font-bold text-[12px] font-mono truncate pr-4" title={row.orderTrackingId || row.id}>{row.orderTrackingId || row.id}</div>
                <div className="text-brand-dark/70 font-medium">{formatCurrency(row.amount, row.currency)}</div>
                <div>
                  <span className="bg-[#E5E7EB] text-brand-dark text-[11px] font-bold tracking-wide px-3 py-1 rounded-full">{row.tierTitle || "General"}</span>
                </div>
                <div>{renderStatus(row.status)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination page={page} pages={data?.pages || 1} total={data?.total || 0} onChange={setPage} />
    </>
  );
};

const DeliveriesTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAllDeliveries({ page, limit: LIMIT });
  const deliveries = data?.deliveries || [];

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="grid grid-cols-[1fr_1.4fr_1fr_1.3fr_0.9fr_1.6fr] px-8 py-4 bg-[#F9FAFB] border-b border-brand-dark-200/20 text-[11px] font-bold text-brand-dark/60 tracking-widest uppercase">
            <div>DATE</div>
            <div>TIER</div>
            <div>DELIVERED</div>
            <div>WHERE</div>
            <div>NAMES</div>
            <div>NOTE</div>
          </div>
          <div className="flex flex-col divide-y divide-brand-dark-200/10 min-h-[250px]">
            {isLoading || deliveries.length === 0 ? (
              <EmptyRow icon="ph:package-bold" text="No deliveries recorded yet" loading={isLoading} />
            ) : deliveries.map((d) => (
              <div
                key={d.id}
                onClick={() => navigate(`${TIERS_PATH}/${d.tierId}`)}
                className="grid grid-cols-[1fr_1.4fr_1fr_1.3fr_0.9fr_1.6fr] px-8 py-4 items-center text-[13px] text-brand-dark font-secondary cursor-pointer hover:bg-gray-50/60"
              >
                <div className="text-brand-dark/70 font-medium">{shortDate(d.date)}</div>
                <div className="font-semibold truncate pr-3">{d.tier?.title}</div>
                <div className="font-bold">{plural(d.quantity, d.tier?.unitName || "unit")}</div>
                <div className="text-brand-dark/70 truncate pr-3">
                  {[d.parish, d.region].filter(Boolean).join(", ") || "—"}
                  {d.facilitator && <span className="block text-xs text-gray-400 truncate">by {d.facilitator.applicantName}</span>}
                </div>
                <div className="text-brand-dark/70">{recipientCount(d.recipients) || "—"}</div>
                <div className="text-brand-dark/70 truncate">{d.note || ""}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination page={page} pages={data?.pages || 1} total={data?.total || 0} onChange={setPage} />
    </>
  );
};

const SeedACooperative = () => {
  const [bottomTab, setBottomTab] = useState("PAYMENTS");
  const [recording, setRecording] = useState(null); // null | { tierId?: string }

  const { data: tiers = [] } = useTiers();
  const { data: tierImpact = [], isLoading: isImpactLoading } = useTierImpact();
  const { data: overview, isLoading: isOverviewLoading } = useSeedOverview();
  const trackedTiers = tierImpact.filter((t) => t.impact.unitName);

  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;
    const handleTiersUpdate = () => queryClient.invalidateQueries({ queryKey: ["tiers"] });
    socket.on("tiers_updated", handleTiersUpdate);
    return () => socket.off("tiers_updated", handleTiersUpdate);
  }, [socket, queryClient]);

  const moneyCards = [
    {
      title: "Seed-a-Coop received",
      value: formatCurrency(overview?.receivedUsd, "USD"),
      subtitle: `≈ ${formatCurrency(overview?.receivedUgx, "UGX")}${overview?.pendingCount ? ` · ${overview.pendingCount} processing` : ""}`,
    },
    {
      title: "Donors",
      value: (overview?.donorCount ?? 0).toLocaleString(),
      subtitle: `${plural(overview?.donationCount ?? 0, "settled donation")}`,
    },
    {
      title: "Monthly supporters",
      value: (overview?.monthlySupporters ?? 0).toLocaleString(),
      subtitle: "Donors giving every month",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-[1200px] w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm font-secondary font-medium text-[#A0AAB4]">
        <Link to="/executive/home" className="hover:text-brand-dark transition-colors text-[#997B94]">Home</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
        <Link to="/executive/capital" className="hover:text-brand-dark transition-colors text-[#997B94]">Capital Investments</Link>
        <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-[#A0AAB4]" />
        <span className="text-brand-dark font-semibold">Seed a Cooperative</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-[28px] font-black font-albert text-brand-dark tracking-tight leading-none">Seed a Cooperative</h1>
          <p className="text-[#6B7280] text-[15px] font-medium font-secondary mt-2">
            What donors have funded, and what has been delivered to mothers.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={TIERS_PATH}
            className="border border-brand-dark-200/40 text-brand-dark hover:bg-gray-50 text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors uppercase flex items-center gap-2"
          >
            <Icon icon="ph:sliders-horizontal-bold" className="w-4 h-4" /> Manage tiers
          </Link>
          {trackedTiers.length > 0 && (
            <button
              onClick={() => setRecording({})}
              className="bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-full transition-colors uppercase flex items-center gap-2 cursor-pointer"
            >
              <Icon icon="ph:plus-bold" className="w-4 h-4" /> Record delivery
            </button>
          )}
        </div>
      </div>

      {/* Impact: funded vs delivered per tracked tier */}
      {isImpactLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((i) => <div key={i} className="bg-white rounded-lg border border-brand-dark-200/20 h-48 animate-pulse" />)}
        </div>
      ) : trackedTiers.length === 0 ? (
        <div className="bg-white rounded-lg border border-dashed border-brand-dark-200/40 p-6 flex items-center gap-4 flex-wrap">
          <Icon icon="ph:book-open-bold" className="w-8 h-8 text-[#997B94] shrink-0" />
          <div className="flex-1 min-w-[240px]">
            <p className="text-sm font-bold font-secondary text-brand-dark">Track what donations deliver</p>
            <p className="text-sm font-secondary text-[#6B7280]">
              Give a tier a unit (e.g. "passbook" on The First Threads) to see funded vs delivered here and record handouts.
            </p>
          </div>
          <Link to={TIERS_PATH} className="text-xs font-bold tracking-widest text-[#997B94] hover:underline uppercase">Set up in tiers →</Link>
        </div>
      ) : (
        <div className={`grid grid-cols-1 gap-6 ${trackedTiers.length > 1 ? "md:grid-cols-2" : ""} ${trackedTiers.length > 2 ? "xl:grid-cols-3" : ""}`}>
          {trackedTiers.map((tier) => (
            <ImpactCard key={tier.id} tier={tier} onRecord={() => setRecording({ tierId: tier.id })} />
          ))}
        </div>
      )}

      {/* Money in */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {moneyCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between min-h-[130px]">
            <h3 className="text-[15px] font-bold text-brand-dark/80 font-secondary">{card.title}</h3>
            <div className="mt-3">
              <div className="text-[32px] font-black font-albert tracking-tight leading-none mb-2">
                {isOverviewLoading ? <span className="inline-block w-16 h-8 bg-brand-dark-200 animate-pulse rounded" /> : card.value}
              </div>
              <p className="text-[13px] font-secondary font-medium text-brand-dark-400">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Payments / Deliveries */}
      <div className="bg-white rounded-lg border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col">
        <div className="flex items-center border-b border-brand-dark-200/20">
          {[["PAYMENTS", "Payments"], ["DELIVERIES", "Deliveries"]].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setBottomTab(key)}
              className={`px-8 py-4 text-xs font-bold tracking-widest transition-colors uppercase cursor-pointer ${
                bottomTab === key ? "bg-[#769E8D] text-white" : "text-[#9BA1A6] hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        {bottomTab === "PAYMENTS" ? <PaymentsTable tiers={tiers} /> : <DeliveriesTable />}
      </div>

      {recording && (
        <DeliveryModal tiers={trackedTiers} initialTierId={recording.tierId} onClose={() => setRecording(null)} />
      )}
    </div>
  );
};

export default SeedACooperative;
