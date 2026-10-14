import React, { useState } from "react";
import { formatMoney, resolveImageUrl } from "../../../data/projectOptions";
import { Lightbox } from "./projectGallery";

const ImpactChips = ({ update }) => {
  const chips = [
    update.mothersSupported > 0 && `+${update.mothersSupported.toLocaleString()} mother${update.mothersSupported === 1 ? "" : "s"} supported`,
    update.saccosFunded > 0 && `+${update.saccosFunded} SACCO${update.saccosFunded === 1 ? "" : "s"} funded`,
    update.capitalDeployed > 0 && `${formatMoney(update.capitalDeployed, update.currency)} deployed`,
  ].filter(Boolean);

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {chips.map((chip) => (
        <span key={chip} className="px-3 py-1 rounded-full bg-brand-brown-200/60 text-brand-brown text-xs md:text-sm font-bold font-secondary">
          {chip}
        </span>
      ))}
    </div>
  );
};

// Public timeline of impact entries marked "show on website", newest first
const ProjectUpdates = ({ project }) => {
  const [openPhoto, setOpenPhoto] = useState(null);
  const updates = project.updates || [];

  if (updates.length === 0) return null;

  return (
    <section className="py-8 md:py-10">
      <div className="max-w-5xl mx-auto px-6 md:px-24">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-primary text-brand-dark mb-8 leading-[1.1]">
          Project Updates
        </h2>

        <ol className="relative border-l-2 border-brand-dark-200/40 ml-2 space-y-10">
          {updates.map((update) => (
            <li key={update.id} className="pl-6 md:pl-8 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-brown border-4 border-brand-white-100" />
              <p className="text-xs md:text-sm font-bold font-secondary text-brand-lilac uppercase tracking-wide mb-1">
                {new Date(update.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <h3 className="text-lg md:text-2xl font-bold font-primary text-brand-dark leading-snug">{update.title}</h3>
              {update.note && (
                <div className="text-base md:text-lg font-secondary font-medium text-brand-dark-400 leading-relaxed mt-2 space-y-3">
                  {update.note.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
                </div>
              )}
              <ImpactChips update={update} />
              {update.photo && (
                <button
                  onClick={() => setOpenPhoto(update.photo)}
                  className="mt-4 block w-full max-w-md aspect-video rounded-lg overflow-hidden cursor-zoom-in"
                >
                  <img src={resolveImageUrl(update.photo)} alt={update.title} loading="lazy" className="w-full h-full object-cover" />
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>

      {openPhoto && (
        <Lightbox images={[openPhoto]} index={0} onChange={() => {}} onClose={() => setOpenPhoto(null)} title={project.title} />
      )}
    </section>
  );
};

export default ProjectUpdates;
