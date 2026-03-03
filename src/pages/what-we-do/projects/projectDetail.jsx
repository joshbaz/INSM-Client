import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import SendDonation from "./Project Details Form/sendDonation";
import RequestForm from "./Project Details Form/requestForm";
import projectsData from "./projectsData";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === parseInt(projectId));
  const [copied, setCopied] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);

  /* ── 404 Handling ── */
  if (!project) {
    return (
      <section className="bg-brand-white-100 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold font-primary text-brand-dark mb-4">
            Project Not Found
          </h1>
          <p className="text-base font-secondary text-brand-dark-400 mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/what-we-do/projects/list"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lilac text-white font-semibold text-sm rounded-full hover:bg-brand-lilac/90 transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-brand-white-100">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="pt-10 md:pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          {/* Title — centered above image */}
          <h1 className="text-3xl md:text-5xl font-bold font-primary text-brand-dark text-center leading-tight mb-8 md:mb-10">
            {project.title}
            {project.location && (
              <>
                <br />
                <span className="text-brand-dark">
                  along {project.location}
                </span>
              </>
            )}
          </h1>

          {/* Contained image */}
          <div className="w-full rounded-lg overflow-hidden mb-6">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[280px] md:h-[420px] object-cover"
            />
          </div>

          {/* Category pills + Share icons row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left — Category label + pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-secondary text-brand-dark-400">
                Category
              </span>
              <span className="px-3 py-1 rounded-full border border-brand-lilac-300 text-xs font-semibold text-brand-lilac uppercase tracking-wide">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full border border-brand-lilac-300 text-xs font-semibold text-brand-lilac uppercase tracking-wide">
                {project.subcategory}
              </span>
            </div>

            {/* Right — Share label + social icons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-secondary text-brand-dark-400 uppercase tracking-wide">
                Share
              </span>
              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Copy link"
              >
                <Icon icon="mdi:link-variant" width={18} />
                {copied && (
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-white bg-brand-dark px-2 py-0.5 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
              {/* Facebook */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "facebook-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on Facebook"
              >
                <Icon icon="ri:facebook-fill" width={18} />
              </button>
              {/* Threads */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.threads.net/intent/post?text=${encodeURIComponent(project.title + " — " + window.location.href)}`,
                    "threads-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on Threads"
              >
                <Icon icon="ri:threads-fill" width={18} />
              </button>
              {/* X (Twitter) */}
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(project.title)}&url=${encodeURIComponent(window.location.href)}`,
                    "x-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on X"
              >
                <Icon icon="ri:twitter-x-fill" width={18} />
              </button>
              {/* LinkedIn */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(project.title)}`,
                    "linkedin-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on LinkedIn"
              >
                <Icon icon="ri:linkedin-fill" width={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider below hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-6 md:py-8">
        <hr className="border-t border-brand-dark-200/30" />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 2 — PROGRAMS STORY
      ═══════════════════════════════════════════ */}
      <section className="py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-24">
          <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-6">
            Project Story
          </h2>

          {/* Story text */}
          <div className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed space-y-4 mb-10">
            {project.story.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Single image */}
          <div className="w-full rounded-lg overflow-hidden mb-12">
            <img
              src={project.galleryImages[0]}
              alt={`${project.title} story`}
              className="w-full h-[300px] md:h-[420px] object-cover"
            />
          </div>

          {/* Stats row with dividers */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0 mb-6">
            <div className="flex-1">
              <p className="text-4xl md:text-5xl font-bold font-primary text-brand-brown mb-1">
                {project.stats.mothersEmpowered}
              </p>
              <p className="text-sm font-secondary text-brand-dark-400 uppercase tracking-wide">
                Mothers Supported
              </p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-brand-dark-200/40" />
            <div className="flex-1 sm:pl-8">
              <p className="text-4xl md:text-5xl font-bold font-primary text-brand-brown mb-1">
                {project.stats.saccosFunded}
              </p>
              <p className="text-sm font-secondary text-brand-dark-400 uppercase tracking-wide">
                Total SACCOs Funded
              </p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-brand-dark-200/40" />
            <div className="flex-1 sm:pl-8">
              <p className="text-4xl md:text-5xl font-bold font-primary text-brand-brown mb-1">
                {project.stats.capitalDeployed}
              </p>
              <p className="text-sm font-secondary text-brand-dark-400 uppercase tracking-wide">
                Capital Deployed
              </p>
            </div>
          </div>

          {/* Caption */}
          <p className="text-sm font-secondary text-brand-dark-400/70 italic max-w-2xl">
            Integrity is our anchor. This live counter provides visual proof of
            how your capital is transforming the lives of single mothers.
          </p>

          {/* Extended story */}
          {project.extendedStory && (
            <div className="mt-12">
              <div className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed space-y-4 mb-6">
                {project.extendedStory.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Story image */}
              {project.storyImage && (
                <div className="w-full rounded-lg overflow-hidden">
                  <img
                    src={project.storyImage}
                    alt={`${project.title} extended`}
                    className="w-full h-[300px] md:h-[420px] object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-24 py-2 ">
        <hr className="border-t border-brand-dark-200/30" />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3 — SUPPORT THIS INITIATIVE
      ═══════════════════════════════════════════ */}
      <section className="pb-20 md:pb-28 py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-24">
          <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-3">
            Support this Initiative
          </h2>
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
            Your partnership turns potential into national prosperity. Whether
            you provide technical assets or the capital required to scale, you
            are helping a mother thrive in her venture.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 — Capital */}
            <div className="bg-brand-brown-200/60 rounded-xl p-8 md:p-10 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold font-primary text-brand-brown mb-4 leading-snug">
                Sponsor this Project with Capital
              </h3>
              <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed mb-8 grow">
                This is a direct capital into this project. Your investment via
                PesaPal provides the "Ropes" needed to move these mothers from
                subsistence to surplus.
              </p>
              <button
                onClick={() => setIsDonationModalOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-brown text-white font-bold text-xs rounded-full hover:bg-brand-brown/90 transition-colors uppercase tracking-wider w-fit cursor-pointer"
              >
                Send Donation
              </button>
            </div>

            {/* Card 2 — Equipment */}
            <div className="bg-brand-teal-200/60 rounded-xl p-8 md:p-10 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold font-primary text-brand-teal-700 mb-4 leading-snug">
                Sponsor this Project with Equipment
              </h3>
              <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed mb-8 grow">
                Equip this project with the physical tools of productivity.
                We're seeking equipment, or professional space to accelerate the
                growth of these ventures.
              </p>
              <button
                onClick={() => setIsRequestFormOpen(true)}
                className="inline-flex items-center justify-center px-6 py-3 bg-brand-teal-700 text-white font-bold text-xs rounded-full hover:bg-brand-teal-700/90 transition-colors uppercase tracking-wider w-fit cursor-pointer"
              >
                Fill Request Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      <SendDonation
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
      />

      {/* Request Form Modal */}
      <RequestForm
        isOpen={isRequestFormOpen}
        onClose={() => setIsRequestFormOpen(false)}
      />
    </div>
  );
};

export default ProjectDetail;
