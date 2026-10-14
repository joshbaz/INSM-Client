import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useAuth } from "../../../store/context/AuthContext";
import {
  useAdmins, useCreateAdmin, useRemoveAdmin, useExchangeRate, useUpdateExchangeRate,
} from "../../../store/tanstackStore/services/queries";
import UserAvatar from "../../components/UserAvatar";

const TABS = [
  ["TEAM", "Team", "ph:users-three-bold"],
  ["FINANCE", "Finance", "ph:currency-circle-dollar-bold"],
];

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#a57ea9] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const generatePassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const values = crypto.getRandomValues(new Uint32Array(12));
  return Array.from(values, (v) => chars[v % chars.length]).join("");
};

const AddAdminModal = ({ onClose }) => {
  const createAdmin = useCreateAdmin();
  const [form, setForm] = useState({ name: "", email: "", jobTitle: "", password: generatePassword() });
  const [created, setCreated] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createAdmin.mutateAsync(form);
      setCreated(form);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add administrator.");
    }
  };

  const loginDetails = created
    ? `Executive portal: ${window.location.origin}/executive/login\nEmail: ${created.email}\nTemporary password: ${created.password}`
    : "";

  const copy = async () => {
    await navigator.clipboard.writeText(loginDetails);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]" onClick={createAdmin.isPending ? undefined : onClose} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 pointer-events-auto max-h-[90vh] overflow-y-auto">
          {created ? (
            <>
              <div className="w-12 h-12 rounded-full bg-[#22C55E]/10 flex items-center justify-center mb-5">
                <Icon icon="ph:check-bold" className="w-6 h-6 text-[#16A34A]" />
              </div>
              <h2 className="text-lg font-secondary font-bold text-gray-900 mb-1">{created.name} can now sign in</h2>
              <p className="text-sm font-secondary text-gray-500 mb-5">
                Share these details privately. This is the only time the temporary password is shown; ask them to change it under Profile after signing in.
              </p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-xs font-mono text-gray-800 whitespace-pre-wrap break-all">{loginDetails}</pre>
              <div className="flex justify-end gap-3 mt-6">
                <button onClick={copy} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors flex items-center gap-2">
                  <Icon icon={copied ? "ph:check-bold" : "ph:copy-bold"} /> {copied ? "Copied" : "Copy details"}
                </button>
                <button onClick={onClose} className="px-5 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors">
                  Done
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-secondary font-bold text-gray-900 mb-1">Add administrator</h2>
              <p className="text-sm font-secondary text-gray-500 mb-6">They'll have full access to the executive portal.</p>
              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Full name</label>
                  <input className={inputClass} value={form.name} onChange={set("name")} autoFocus />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" className={inputClass} value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label className={labelClass}>Job title (optional)</label>
                  <input className={inputClass} value={form.jobTitle} onChange={set("jobTitle")} />
                </div>
                <div>
                  <label className={labelClass}>Temporary password</label>
                  <div className="flex gap-2">
                    <input className={`${inputClass} font-mono`} value={form.password} onChange={set("password")} />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, password: generatePassword() }))}
                      className="px-3 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      title="Generate a new password"
                    >
                      <Icon icon="ph:arrows-clockwise-bold" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mt-5">{error}</p>}
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={onClose} disabled={createAdmin.isPending} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
                  Cancel
                </button>
                <button type="submit" disabled={createAdmin.isPending || !form.name.trim() || !form.email.trim()} className="px-5 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
                  {createAdmin.isPending ? "Adding..." : "Add administrator"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

const TeamTab = () => {
  const { user } = useAuth();
  const { data: admins = [], isLoading } = useAdmins();
  const removeAdmin = useRemoveAdmin();
  const [isAdding, setIsAdding] = useState(false);

  const handleRemove = async (admin) => {
    if (!window.confirm(`Remove ${admin.name || admin.email}'s admin access? They will no longer be able to sign in to the executive portal.`)) return;
    try {
      await removeAdmin.mutateAsync(admin.id);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove admin access.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-100 flex-wrap">
        <div>
          <h2 className="text-base font-secondary font-bold text-gray-800">Administrators</h2>
          <p className="text-sm font-secondary text-gray-500 mt-1">People who can sign in to this executive portal.</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 bg-[#a57ea9] hover:bg-[#916b94] text-white px-5 py-2.5 rounded-full text-xs font-bold font-secondary transition-colors">
          <Icon icon="ph:user-plus-bold" className="w-4 h-4" /> Add administrator
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Icon icon="ph:spinner-gap-bold" className="w-7 h-7 text-brand-lilac animate-spin" />
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {admins.map((admin) => {
            const isYou = admin.id === user?.id;
            return (
              <li key={admin.id} className="flex items-center gap-4 px-6 py-4 flex-wrap">
                <UserAvatar user={admin} size={40} />
                <div className="flex-1 min-w-[180px]">
                  <p className="text-sm font-bold font-secondary text-gray-900">
                    {admin.name || "Unnamed"}
                    {isYou && <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-500">YOU</span>}
                  </p>
                  <p className="text-xs font-secondary text-gray-500">
                    {admin.jobTitle ? `${admin.jobTitle} · ` : ""}{admin.email}
                  </p>
                </div>
                <p className="text-xs font-secondary text-gray-400">
                  Added {new Date(admin.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                </p>
                {isYou ? (
                  <Link to="/executive/profile" className="text-xs font-bold font-secondary text-[#a57ea9] hover:underline">Edit profile</Link>
                ) : (
                  <button
                    onClick={() => handleRemove(admin)}
                    disabled={removeAdmin.isPending}
                    className="text-xs font-bold font-secondary text-gray-400 hover:text-[#EF4444] transition-colors disabled:opacity-50"
                  >
                    Remove access
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {isAdding && <AddAdminModal onClose={() => setIsAdding(false)} />}
    </div>
  );
};

const FinanceTab = () => {
  const { data, isLoading } = useExchangeRate();
  const updateRate = useUpdateExchangeRate();
  const [value, setValue] = useState(null);
  const [notice, setNotice] = useState(null);

  const current = data?.usdToUgxRate;
  const shown = value ?? current ?? "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice(null);
    try {
      await updateRate.mutateAsync(parseFloat(shown));
      setValue(null);
      setNotice({ type: "success", text: "Exchange rate updated. Project totals now use the new rate." });
    } catch (err) {
      setNotice({ type: "error", text: err.response?.data?.message || "Failed to update exchange rate." });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      <h2 className="text-base font-secondary font-bold text-gray-800">Exchange rate</h2>
      <p className="text-sm font-secondary text-gray-500 mt-1 max-w-2xl">
        Donations arrive in USD or UGX. This rate converts between them for project totals, funding progress,
        the deployable balance and the Capital Investment summary.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex items-end gap-3 flex-wrap">
        <div>
          <label className={labelClass}>UGX per 1 USD</label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-secondary text-gray-500">1 USD =</span>
            <input
              type="number"
              min="1"
              step="any"
              className={`${inputClass} w-40`}
              value={shown}
              disabled={isLoading}
              onChange={(e) => setValue(e.target.value)}
            />
            <span className="text-sm font-secondary text-gray-500">UGX</span>
          </div>
        </div>
        <button
          type="submit"
          disabled={updateRate.isPending || !(parseFloat(shown) > 0) || parseFloat(shown) === current}
          className="px-6 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50"
        >
          {updateRate.isPending ? "Saving..." : "Save rate"}
        </button>
      </form>
      {notice && (
        <p className={`text-sm font-secondary rounded-lg p-3 mt-5 ${notice.type === "error" ? "text-[#EF4444] bg-[#EF4444]/5" : "text-[#16A34A] bg-[#22C55E]/10"}`}>
          {notice.text}
        </p>
      )}
    </div>
  );
};

const Settings = () => {
  const [tab, setTab] = useState("TEAM");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex gap-2">
        {TABS.map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
              tab === key ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:text-gray-800"
            }`}
          >
            <Icon icon={icon} className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>
      {tab === "TEAM" && <TeamTab />}
      {tab === "FINANCE" && <FinanceTab />}
    </div>
  );
};

export default Settings;
