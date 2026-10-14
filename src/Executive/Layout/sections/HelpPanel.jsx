import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useSetupChecklist, useHelpContact, useSaveHelpContact } from "../../../store/tanstackStore/services/queries";

// Short how-tos for the tasks admins do most often
const GUIDES = [
  {
    title: "Record passbooks handed out",
    steps: [
      "Capital Investment → Seed-a-Cooperative.",
      'Click "Record passbooks" on the Passbooks card (or "+ Record" on the Home page).',
      "Enter the number, parish and (optionally) the recipients and who facilitated it.",
    ],
    link: "/executive/capital/seed-a-cooperative",
  },
  {
    title: "Approve a handout report from an equipper",
    steps: [
      "Equippers Network → Handout reports tab.",
      "Check the names and photo, adjust the quantity if needed.",
      '"Approve & record" adds it to Seed-a-Cooperative; "Return" sends it back with your note.',
    ],
    link: "/executive/network",
  },
  {
    title: "Invite an equipper or mentor to the Partner Terminal",
    steps: [
      "Approve their application in Leads first.",
      "Equippers Network → click the person → Partner Terminal → Invite.",
      "Send the message on WhatsApp. They choose their own password at first sign-in.",
    ],
    link: "/executive/network",
  },
  {
    title: "Record money received outside PesaPal",
    steps: [
      'Projects → open the project → "Record contribution", or',
      'Capital Investment → Programs → open the programme → "Record contribution".',
    ],
    link: "/executive/projects",
  },
  {
    title: "Log impact on a project",
    steps: [
      'Projects → open the project → "Record impact".',
      "Add mothers supported, SACCOs funded and capital deployed. Capital can't exceed what's available.",
    ],
    link: "/executive/projects",
  },
  {
    title: "Add a giving programme (like The 1k Club)",
    steps: [
      'Capital Investment → Programs → "New program".',
      'Set the amount, currency and frequency; tick "Show on the Seed Portals page".',
    ],
    link: "/executive/capital/programs",
  },
  {
    title: "Change the exchange rate",
    steps: ["Settings → Finance. It's used for all USD ↔ UGX totals."],
    link: "/executive/settings",
  },
  {
    title: "Add another administrator",
    steps: ["Settings → Team → Add administrator, then share the login details privately."],
    link: "/executive/settings",
  },
];

const Checklist = ({ close }) => {
  const { data: items = [], isLoading } = useSetupChecklist();
  const done = items.filter((i) => i.done).length;

  if (isLoading) return <p className="text-sm font-secondary text-gray-400">Checking…</p>;
  if (items.length && done === items.length) {
    return <p className="text-sm font-secondary text-[#16A34A] flex items-center gap-2"><Icon icon="ph:check-circle-fill" className="w-5 h-5" /> Setup complete.</p>;
  }
  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        <div className="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${(done / Math.max(items.length, 1)) * 100}%` }} />
        </div>
        <span className="text-xs font-bold font-secondary text-gray-500">{done} of {items.length}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.key} className="flex items-start gap-3">
            <Icon
              icon={item.done ? "ph:check-circle-fill" : "ph:circle-bold"}
              className={`w-5 h-5 shrink-0 mt-0.5 ${item.done ? "text-[#22C55E]" : "text-gray-300"}`}
            />
            <div className="min-w-0">
              {item.done ? (
                <p className="text-sm font-secondary text-gray-400 line-through">{item.title}</p>
              ) : (
                <>
                  <Link to={item.link} onClick={close} className="text-sm font-bold font-secondary text-gray-900 hover:underline">{item.title}</Link>
                  <p className="text-xs font-secondary text-gray-500">{item.hint}</p>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

const ContactCard = () => {
  const { data: contact } = useHelpContact();
  const save = useSaveHelpContact();
  const [form, setForm] = useState(null);
  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-secondary outline-none focus:border-[#a57ea9]";

  if (form) {
    return (
      <div className="space-y-2">
        <input className={inputClass} value={form.name} onChange={set("name")} placeholder="Name (e.g. your web developer)" />
        <input className={inputClass} value={form.email} onChange={set("email")} placeholder="Email" />
        <input className={inputClass} value={form.whatsapp} onChange={set("whatsapp")} placeholder="WhatsApp number, e.g. +256 7..." />
        <div className="flex justify-end gap-2">
          <button onClick={() => setForm(null)} className="px-4 py-1.5 rounded-full border border-gray-300 text-xs font-bold text-gray-600">Cancel</button>
          <button
            onClick={() => save.mutate(form, { onSuccess: () => setForm(null) })}
            disabled={save.isPending}
            className="px-4 py-1.5 rounded-full bg-[#a57ea9] text-white text-xs font-bold disabled:opacity-50"
          >
            {save.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    );
  }

  const hasContact = contact && (contact.email || contact.whatsapp);
  const digits = (contact?.whatsapp || "").replace(/[^\d]/g, "").replace(/^0/, "256");
  return (
    <div className="space-y-2">
      {hasContact ? (
        <>
          {contact.name && <p className="text-sm font-bold font-secondary text-gray-900">{contact.name}</p>}
          <div className="flex flex-wrap gap-2">
            {contact.email && <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-bold"><Icon icon="ph:envelope-bold" /> {contact.email}</a>}
            {contact.whatsapp && <a href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366]/10 text-[#128C7E] text-xs font-bold"><Icon icon="ph:whatsapp-logo-bold" /> WhatsApp</a>}
          </div>
        </>
      ) : (
        <p className="text-sm font-secondary text-gray-400">No technical contact set yet.</p>
      )}
      <button onClick={() => setForm({ name: contact?.name || "", email: contact?.email || "", whatsapp: contact?.whatsapp || "" })} className="text-xs font-bold text-[#a57ea9] hover:underline">
        {hasContact ? "Edit contact" : "Add a contact"}
      </button>
    </div>
  );
};

const HelpPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openGuide, setOpenGuide] = useState(null);
  const close = () => setIsOpen(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-brand-dark-400 hover:text-brand-dark transition-colors cursor-pointer" aria-label="Help">
        <Icon icon="ph:info-fill" className="w-[22px] h-[22px]" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-brand-dark-900/30 z-[60]" onClick={close} />
          <aside className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-white shadow-2xl z-[60] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-bold font-secondary text-gray-900 flex items-center gap-2">
                <Icon icon="ph:info-fill" className="w-5 h-5 text-[#a57ea9]" /> Help
              </h2>
              <button onClick={close} className="p-1.5 text-gray-400 hover:text-gray-800" aria-label="Close"><Icon icon="ph:x-bold" className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              <section className="px-6 py-5">
                <h3 className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider mb-3">Setup checklist</h3>
                <Checklist close={close} />
              </section>

              <section className="px-6 py-5">
                <h3 className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider mb-3">Quick guide</h3>
                <ul className="space-y-1">
                  {GUIDES.map((guide, i) => (
                    <li key={guide.title} className="rounded-lg border border-gray-100">
                      <button onClick={() => setOpenGuide(openGuide === i ? null : i)} className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left">
                        <span className="text-sm font-bold font-secondary text-gray-800">{guide.title}</span>
                        <Icon icon="ph:caret-down-bold" className={`w-4 h-4 text-gray-400 transition-transform ${openGuide === i ? "rotate-180" : ""}`} />
                      </button>
                      {openGuide === i && (
                        <div className="px-3 pb-3">
                          <ol className="list-decimal pl-5 space-y-1 text-sm font-secondary text-gray-600">
                            {guide.steps.map((step) => <li key={step}>{step}</li>)}
                          </ol>
                          <Link to={guide.link} onClick={close} className="inline-block mt-2 text-xs font-bold text-[#a57ea9] hover:underline">Go there →</Link>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="px-6 py-5">
                <h3 className="text-xs font-bold font-secondary text-gray-500 uppercase tracking-wider mb-3">Technical help</h3>
                <ContactCard />
              </section>
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default HelpPanel;
