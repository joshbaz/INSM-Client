import React from "react";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

const TermsOfUse = () => {
  useSEO({
    title: "Terms of Use | INSM Uganda",
    description:
      "Guidelines for Capital Partners, Technical Mentors, and Strategic Equippers. Review the protocols for nation-building within the INSM ecosystem.",
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 border-l-4 border-brand-gold pl-6">
          <h1 className="text-4xl md:text-5xl font-black font-primary text-brand-dark uppercase tracking-tight mb-4">
            Terms of Use
          </h1>
          <p className="text-lg font-primary font-bold text-brand-gold uppercase tracking-[0.2em]">
            Protocols for Nation-Building
          </p>
        </div>

        <div className="space-y-12">
          {/* Guidelines Intro */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              Guidelines for Capital Partners, Technical Mentors, and Strategic
              Equippers
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              By accessing this National Economic Terminal or the Equipper
              Portal, you agree to uphold the structural integrity of the
              International Network for Single Mothers (INSM) Uganda Chapter:
              Converting latent tenacity into Market Dominance.
            </p>
          </section>

          {/* 1. Acceptance of Strategic Terms */}
          <section className="space-y-6 bg-brand-white-100 p-8 md:p-10 border border-brand-dark-200/30">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              1. Acceptance of Strategic Terms
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              By accessing the digital infrastructure of INSM, you agree to be
              bound by these Terms of Use and all applicable laws and
              regulations within the Nation.
            </p>
          </section>

          {/* 2. Intellectual Property & Industrial IP */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              2. Intellectual Property & Industrial IP
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              The "Makindye Blueprint," the "Strategic Anchors" methodology, and
              all proprietary "Economic Portraits" are the intellectual property
              of INSM. Users are strictly prohibited from reproducing,
              distributing, or utilizing these industrial frameworks for
              unauthorized commercial purposes.
            </p>
          </section>

          {/* 3. Standards of Professional Conduct */}
          <section className="space-y-8">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              3. Standards of Professional Conduct
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              To maintain the structural integrity of the Bloc, all participants
              must adhere to the following industrial standards:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-dark/5 flex items-center justify-center rounded-sm border border-brand-dark/10">
                  <span className="font-primary font-black text-brand-dark text-lg">
                    A
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    Technical Mentors
                  </h4>
                  <p className="text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    Must deploy expertise in Law, Finance, or Industry in
                    accordance with professional standards and the
                    infrastructure requirements of the Network.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-dark/5 flex items-center justify-center rounded-sm border border-brand-dark/10">
                  <span className="font-primary font-black text-brand-dark text-lg">
                    B
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    Strategic Equippers
                  </h4>
                  <p className="text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    Must utilize the official portal solely for the registration
                    and optimization of members within their designated
                    parishes.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-dark/5 flex items-center justify-center rounded-sm border border-brand-dark/10">
                  <span className="font-primary font-black text-brand-dark text-lg">
                    C
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    Corporate & Civic Allies
                  </h4>
                  <p className="text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    Must act in alignment with the National Economic Priority,
                    providing market access and supply-chain support that
                    facilitates Asset-Ownership without exploitative friction.
                  </p>
                </div>
              </li>
            </ul>
          </section>

          {/* 4. Investment Integrity & Capital Mandate */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              4. Investment Integrity & Capital Mandate
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              When you "Capitalize a Seed," you acknowledge that your
              contribution is a strategic investment in National Economic
              Infrastructure. INSM provides Radical Accountability via our
              Transparency Tracker. By deploying capital, you agree that all
              funds are utilized toward the specific financial mandates and
              efficiency goals described.
            </p>
          </section>

          {/* 5. Portal Security & Data Governance */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              5. Portal Security & Data Governance
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              Strategic Equippers and Mentors accessing restricted command
              portals must maintain the highest ethical and security standards.
              Any misuse of data or unauthorized representation of the INSM
              brand will result in the immediate termination of access and
              potential legal action within the national courts.
            </p>
          </section>

          {/* Sovereignty Footer */}
          <section className="pt-10 border-t border-brand-dark-200">
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/privacy-policy"
                className="inline-flex items-center justify-center border-2 border-brand-lilac-700 text-brand-lilac-700 hover:bg-brand-lilac-700 hover:text-brand-white text-sm font-primary font-bold px-8 py-3 rounded-full transition-all cursor-pointer uppercase tracking-widest"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-use"
                className="inline-flex items-center justify-center bg-brand-lilac-700 text-brand-white text-sm font-primary font-bold px-8 py-3 rounded-full transition-all cursor-default uppercase tracking-widest shadow-md"
              >
                Terms of Use
              </Link>
              <Link
                to="/ethical-conduct"
                className="inline-flex items-center justify-center border-2 border-brand-lilac-700 text-brand-lilac-700 hover:bg-brand-lilac-700 hover:text-brand-white text-sm font-primary font-bold px-8 py-3 rounded-full transition-all cursor-pointer uppercase tracking-widest"
              >
                Ethical Conduct
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
