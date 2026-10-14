import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useNetworkMember, useUpdateNetworkMember, useAddMemberNote, useDeleteMemberNote, useInviteMember, useRemoveMemberAccess,
} from "../../../store/tanstackStore/services/queries";
import UserAvatar from "../../components/UserAvatar";
import {
  REGIONS, MEMBER_STATUS_STYLES, NOTE_KINDS, LEADERSHIP_LABELS, DOMAIN_LABELS, contactLinks, shortDate,
} from "./networkOptions";

const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#997B94] bg-white";
const labelClass = "block text-[10px] font-bold font-secondary text-gray-500 uppercase tracking-wider mb-1";
const today = () => new Date().toISOString().slice(0, 10);

const Section = ({ title, action, children }) => (
  <section className="px-6 py-5 border-b border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider">{title}</h3>
      {action}
    </div>
    {children}
  </section>
);

const DetailsEditor = ({ member, onDone }) => {
  const update = useUpdateNetworkMember();
  const [form, setForm] = useState({
    phoneNumber: member.phoneNumber || "",
    email: member.email || "",
    region: member.region || "",
    district: member.district || "",
    subCounty: member.subCounty || "",
    parish: member.parish || "",
  });
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const save = async () => {
    try {
      await update.mutateAsync({ id: member.id, ...form });
      onDone();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save details.");
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className={labelClass}>Phone</label><input className={inputClass} value={form.phoneNumber} onChange={set("phoneNumber")} /></div>
        <div><label className={labelClass}>Email</label><input className={inputClass} value={form.email} onChange={set("email")} /></div>
      </div>
      {member.role === "COMMUNITY_EQUIPPER" && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Region</label>
            <select className={inputClass} value={form.region} onChange={set("region")}>
              <option value="">—</option>
              {REGIONS.map((r) => <option key={r} value={r}>{r[0] + r.slice(1).toLowerCase()}</option>)}
            </select>
          </div>
          <div><label className={labelClass}>District</label><input className={inputClass} value={form.district} onChange={set("district")} /></div>
          <div><label className={labelClass}>Sub-county</label><input className={inputClass} value={form.subCounty} onChange={set("subCounty")} /></div>
          <div><label className={labelClass}>Parish</label><input className={inputClass} value={form.parish} onChange={set("parish")} /></div>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <button onClick={onDone} className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-xs font-bold">Cancel</button>
        <button onClick={save} disabled={update.isPending} className="px-4 py-1.5 rounded-full bg-[#997B94] text-white text-xs font-bold disabled:opacity-50">
          {update.isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

const ActivityLog = ({ member }) => {
  const addNote = useAddMemberNote();
  const deleteNote = useDeleteMemberNote();
  const [form, setForm] = useState({ kind: "call", date: today(), body: "" });
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.body.trim()) return;
    try {
      await addNote.mutateAsync({ id: member.id, ...form });
      setForm((prev) => ({ ...prev, body: "" }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to save note.");
    }
  };

  const remove = async (note) => {
    if (!window.confirm("Delete this log entry?")) return;
    try {
      await deleteNote.mutateAsync({ id: member.id, noteId: note.id });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete note.");
    }
  };

  return (
    <>
      <form onSubmit={submit} className="space-y-2 mb-4">
        <div className="flex gap-2">
          <select className={`${inputClass} w-36`} value={form.kind} onChange={set("kind")}>
            {Object.entries(NOTE_KINDS).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}
          </select>
          <input type="date" className={`${inputClass} w-40`} value={form.date} max={today()} onChange={set("date")} />
        </div>
        <textarea
          className={inputClass}
          rows={2}
          value={form.body}
          onChange={set("body")}
          placeholder="e.g. Onboarding call; agreed to mobilise mothers in Kiwatule for the next passbook handout"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-secondary text-gray-400">
            {form.kind === "assignment" ? "Assignments show up as tasks in their Partner Terminal." : ""}
          </p>
          <button type="submit" disabled={addNote.isPending || !form.body.trim()} className="px-4 py-1.5 rounded-full bg-gray-900 text-white text-xs font-bold disabled:opacity-40">
            {addNote.isPending ? "Saving..." : "Add to log"}
          </button>
        </div>
      </form>

      {member.notes.length === 0 ? (
        <p className="text-sm font-secondary text-gray-400">No activity logged yet.</p>
      ) : (
        <ol className="space-y-3">
          {member.notes.map((note) => {
            const kind = NOTE_KINDS[note.kind] || NOTE_KINDS.note;
            return (
              <li key={note.id} className="flex gap-3 group">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${kind.style}`}>
                  <Icon icon={kind.icon} className="w-3.5 h-3.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-secondary text-gray-400">
                    {kind.label} · {shortDate(note.date)}{note.createdByName ? ` · ${note.createdByName}` : ""}
                  </p>
                  <p className="text-sm font-secondary text-gray-800 whitespace-pre-line">{note.body}</p>
                </div>
                <button onClick={() => remove(note)} className="opacity-0 group-hover:opacity-100 p-1 text-gray-300 hover:text-[#EF4444] self-start" title="Delete">
                  <Icon icon="ph:trash-bold" className="w-3.5 h-3.5" />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
};

// Partner Terminal login: invite, reset the password, or remove access
const TerminalAccess = ({ member }) => {
  const invite = useInviteMember();
  const removeAccess = useRemoveMemberAccess();
  const [credentials, setCredentials] = useState(null);
  const [copied, setCopied] = useState(false);

  const sendInvite = async () => {
    if (member.access && !window.confirm(`Reset ${member.applicantName}'s password? Their current password will stop working.`)) return;
    try {
      setCredentials(await invite.mutateAsync(member.id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create the login.");
    }
  };

  const revoke = async () => {
    if (!window.confirm(`Remove ${member.applicantName}'s Partner Terminal login? Their records stay; you can invite them again later.`)) return;
    try {
      await removeAccess.mutateAsync(member.id);
      setCredentials(null);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove access.");
    }
  };

  const message = credentials
    ? `Hello ${member.applicantName.split(" ")[0]}, your INSM Partner Terminal login is ready.\n\nLink: ${window.location.origin}/login\nEmail: ${credentials.email}\nTemporary password: ${credentials.tempPassword}\n\nYou'll be asked to choose your own password when you first sign in.`
    : "";
  const copy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const whatsapp = contactLinks(member).whatsapp;

  if (credentials) {
    return (
      <div className="space-y-3">
        <p className="text-sm font-secondary text-gray-700">
          {credentials.isNew ? "Login created." : "Password reset."} Share these details privately; the temporary password is only shown once.
        </p>
        <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs font-mono text-gray-800 whitespace-pre-wrap break-all">{message}</pre>
        <div className="flex gap-2 flex-wrap">
          <button onClick={copy} className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700">
            <Icon icon={copied ? "ph:check-bold" : "ph:copy-bold"} /> {copied ? "Copied" : "Copy message"}
          </button>
          {whatsapp && (
            <a href={`${whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] text-xs font-bold">
              <Icon icon="ph:whatsapp-logo-bold" /> Send on WhatsApp
            </a>
          )}
          <button onClick={() => setCredentials(null)} className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-400">Done</button>
        </div>
      </div>
    );
  }

  if (!member.access) {
    return (
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <p className="text-sm font-secondary text-gray-500">
          {member.email ? "No login yet." : "Add an email under Details before inviting."}
        </p>
        <button onClick={sendInvite} disabled={invite.isPending || !member.email || member.memberStatus !== "ACTIVE"} className="px-4 py-2 rounded-full bg-[#997B94] text-white text-xs font-bold disabled:opacity-40">
          {invite.isPending ? "Creating..." : "Invite to Partner Terminal"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-secondary text-gray-700 space-y-0.5">
        <p><Icon icon="ph:check-circle-fill" className="inline w-4 h-4 text-[#16A34A] -mt-0.5" /> Can sign in as <strong>{member.access.email}</strong></p>
        <p className="text-xs text-gray-400">
          {member.access.lastLoginAt ? `Last signed in ${shortDate(member.access.lastLoginAt)}` : "Hasn't signed in yet"}
          {member.access.mustChangePassword ? " · still on the temporary password" : ""}
          {member.memberStatus !== "ACTIVE" ? " · blocked while not Active" : ""}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={sendInvite} disabled={invite.isPending} className="px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-700 disabled:opacity-50">Reset password</button>
        <button onClick={revoke} disabled={removeAccess.isPending} className="px-4 py-1.5 rounded-full border border-[#EF4444]/40 text-[#EF4444] text-xs font-bold disabled:opacity-50">Remove access</button>
      </div>
    </div>
  );
};

const MemberDrawer = ({ memberId, onClose }) => {
  const { data: member, isLoading } = useNetworkMember(memberId);
  const update = useUpdateNetworkMember();
  const [isEditing, setIsEditing] = useState(false);

  const changeStatus = async (e) => {
    try {
      await update.mutateAsync({ id: member.id, memberStatus: e.target.value });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  const links = member ? contactLinks(member) : null;
  const isEquipper = member?.role === "COMMUNITY_EQUIPPER";
  const totalUnits = member?.deliveries.reduce((sum, d) => sum + d.quantity, 0) || 0;

  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/30 z-[60]" onClick={onClose} />
      <aside className="fixed inset-y-0 right-0 w-full max-w-[520px] bg-white shadow-2xl z-[60] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <span className="text-xs font-bold font-secondary text-gray-400 uppercase tracking-wider">Network member</span>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-800" aria-label="Close">
            <Icon icon="ph:x-bold" className="w-5 h-5" />
          </button>
        </div>

        {isLoading || !member ? (
          <div className="flex-1 flex items-center justify-center">
            <Icon icon="ph:spinner-gap-bold" className="w-7 h-7 text-brand-lilac animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Identity */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-start gap-4">
              <UserAvatar user={{ name: member.applicantName, email: member.email }} size={56} />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold font-secondary text-gray-900">{member.applicantName}</h2>
                <p className="text-sm font-secondary text-gray-500">
                  {isEquipper ? "Community Equipper" : `Technical Mentor · ${DOMAIN_LABELS[member.domain] || member.domain}`}
                </p>
                <p className="text-xs font-secondary text-gray-400 mt-1">Joined {shortDate(member.joinedAt)}</p>
              </div>
              <select
                value={member.memberStatus}
                onChange={changeStatus}
                disabled={update.isPending}
                className={`text-[11px] font-bold rounded-full px-3 py-1.5 border-0 outline-none cursor-pointer ${MEMBER_STATUS_STYLES[member.memberStatus]?.style}`}
              >
                {Object.entries(MEMBER_STATUS_STYLES).map(([value, { label }]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </div>

            {/* Partner Terminal */}
            <Section title="Partner Terminal">
              <TerminalAccess member={member} />
              {isEquipper && (
                <p className="text-xs font-secondary text-gray-500 mt-3">
                  {member.mothersCount || 0} mother{member.mothersCount === 1 ? "" : "s"} registered
                  {member.pendingReports ? ` · ${member.pendingReports} handout report${member.pendingReports === 1 ? "" : "s"} waiting for review` : ""}
                </p>
              )}
            </Section>

            {/* Contact & location */}
            <Section
              title="Details"
              action={!isEditing && <button onClick={() => setIsEditing(true)} className="text-xs font-bold text-[#997B94] hover:underline">Edit</button>}
            >
              {isEditing ? (
                <DetailsEditor member={member} onDone={() => setIsEditing(false)} />
              ) : (
                <div className="space-y-3 text-sm font-secondary text-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {links.tel && <a href={links.tel} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold"><Icon icon="ph:phone-bold" /> {member.phoneNumber}</a>}
                    {links.whatsapp && <a href={links.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 text-xs font-bold"><Icon icon="ph:whatsapp-logo-bold" /> WhatsApp</a>}
                    {links.mail && <a href={links.mail} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold"><Icon icon="ph:envelope-bold" /> {member.email}</a>}
                    {member.linkedInUrl && <a href={member.linkedInUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A66C2]/10 text-[#0A66C2] text-xs font-bold"><Icon icon="ph:linkedin-logo-bold" /> LinkedIn</a>}
                  </div>
                  {isEquipper && (
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {[["Parish", member.parish], ["Sub-county", member.subCounty], ["District", member.district], ["Region", member.region && member.region[0] + member.region.slice(1).toLowerCase()]].map(([label, value]) => (
                        <div key={label}>
                          <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</dt>
                          <dd>{value || "—"}</dd>
                        </div>
                      ))}
                      <div className="col-span-2">
                        <dt className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Leadership connection</dt>
                        <dd>{LEADERSHIP_LABELS[member.leadershipConnection] || member.leadershipConnection || "—"}</dd>
                      </div>
                    </dl>
                  )}
                </div>
              )}
            </Section>

            {/* Seed-a-Cooperative deliveries they facilitated */}
            <Section title={`Facilitated deliveries${totalUnits ? ` · ${totalUnits.toLocaleString()} total` : ""}`}>
              {member.deliveries.length === 0 ? (
                <p className="text-sm font-secondary text-gray-400">
                  None yet. Choose them under "Facilitated by" when recording passbooks or parishes in{" "}
                  <Link to="/executive/capital/seed-a-cooperative" className="underline">Seed-a-Cooperative</Link>.
                </p>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {member.deliveries.map((d) => (
                    <li key={d.id} className="py-2 flex items-center justify-between gap-3 text-sm font-secondary">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900">{d.quantity.toLocaleString()} {d.tier?.unitName || "unit"}{d.quantity === 1 ? "" : "s"}</p>
                        <p className="text-xs text-gray-400 truncate">{d.tier?.title}{d.parish ? ` · ${d.parish}` : ""}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{shortDate(d.date)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>

            {/* Activity log */}
            <Section title="Activity log">
              <ActivityLog member={member} />
            </Section>
          </div>
        )}
      </aside>
    </>
  );
};

export default MemberDrawer;
