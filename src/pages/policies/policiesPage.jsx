import React from "react";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

const PrivacyPolicyPage = () => {
  useSEO({
    title: "Privacy Policy | INSM Uganda",
    description:
      "Securing the Data of the Movement. Read the International Network for Single Mothers Uganda Chapter privacy protocols regarding data protection and industrial integrity.",
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 border-l-4 border-brand-gold pl-6">
          <h1 className="text-4xl md:text-5xl font-black font-primary text-brand-dark uppercase tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg font-primary font-bold text-brand-gold uppercase tracking-[0.2em]">
            Securing the Data of the Movement
          </p>
        </div>

        <div className="space-y-12">
          {/* Protecting the Integrity */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              Protecting the Integrity of Your Economic Footprint
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              The International Network for Single Mothers (INSM) Uganda Chapter
              is committed to the highest standards of data security for all
              Capital Partners, Production Units, and Strategic Mentors. We
              recognize that in a high-velocity economy, data is a primary
              asset. The following details our protocols for the collection,
              optimization, and protection of the information we steward.
            </p>
          </section>
          {/* Our Institutional Policy */}
          <section className="space-y-6 bg-brand-white-100 p-8 md:p-10 border border-brand-dark-200/30">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              Our Institutional Policy
            </h2>
            <div className="space-y-4 text-brand-dark-400 font-secondary leading-relaxed">
              <p>
                INSM recognizes that protecting the data of our partners is
                foundational to National Stability. We maintain advanced
                security protocols to ensure all sensitive information remains
                confidential and structurally sound.
              </p>
              <p>
                We adhere to Industrial Standards for Information Security to
                safeguard the movement’s intelligence. This includes multi-tier
                data encryption, high-grade password protocols, and specialized
                security training for our strategic team. Personally
                Identifiable Information (PII) is restricted via role-based
                access controls, ensuring that data is accessible only to
                authorized personnel for the purposes of Market Dominance and
                Operational Efficiency.
              </p>
            </div>
          </section>
          {/* Strategic Data Collection */}
          <section className="space-y-8">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              Strategic Data Collection
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              We do not collect information from visitors unless it is provided
              voluntarily to facilitate the Makindye Blueprint. Certain features
              require data sharing to optimize the movement’s output:
            </p>
            <ul className="space-y-6">
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-gold/10 flex items-center justify-center rounded-sm border border-brand-gold/20">
                  <span className="font-primary font-black text-brand-gold text-lg">
                    01
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    The Equipper Network
                  </h4>
                  <p className="text-base md:text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    We collect Full Name, Contact Intelligence, and
                    Jurisdictional Data (Parish/District) to facilitate
                    precision grassroots mobilization.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-gold/10 flex items-center justify-center rounded-sm border border-brand-gold/20">
                  <span className="font-primary font-black text-brand-gold text-lg">
                    02
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    Technical Mentorship
                  </h4>
                  <p className="text-base md:text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    We collect Professional Credentials, LinkedIn Profiles, and
                    Subject Matter Expertise to build the intellectual
                    infrastructure of our members.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-gold/10 flex items-center justify-center rounded-sm border border-brand-gold/20">
                  <span className="font-primary font-black text-brand-gold text-lg">
                    03
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    The 1k Club & Parish Seeds
                  </h4>
                  <p className="text-base md:text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    We collect transaction data to maintain our Radical
                    Transparency Tracker, ensuring every unit of capital is
                    accounted for in our national ledger.
                  </p>
                </div>
              </li>
              <li className="flex gap-6">
                <div className="shrink-0 w-12 h-12 bg-brand-gold/10 flex items-center justify-center rounded-sm border border-brand-gold/20">
                  <span className="font-primary font-black text-brand-gold text-lg">
                    04
                  </span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-primary font-bold text-brand-dark uppercase tracking-wide">
                    Analytical Intelligence
                  </h4>
                  <p className="text-base md:text-sm text-brand-dark-400 font-secondary leading-relaxed">
                    We automatically gather non-personally identifiable behavior
                    data to optimize the digital architecture of our National
                    Economic Terminal.
                  </p>
                </div>
              </li>
            </ul>
          </section>
          {/* Capital Security */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              Capital Security & Global Transactions
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              Our financial processors utilize Bank-Grade Encryption to ensure
              secure capital deployments and data management. We maintain a
              "Gold Standard" of Structural Integrity, providing partners with
              the assurance that their investment is handled with the precision
              of a Tier-1 financial institution.
            </p>
          </section>
          {/* Disclosure */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider">
              Disclosure of Strategic Intelligence
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              Subject to applicable law, we may disclose PII exclusively to:
            </p>
            <ul className="list-disc pl-6 space-y-4 text-brand-dark-400 font-secondary">
              <li>
                <strong>Technical Mentors & Industrial Advisors:</strong>{" "}
                Certified professionals (Law, Finance, Tourism, and Agriculture)
                under strict confidentiality contracts who utilize the data
                solely for the Optimization of the Bloc.
              </li>
              <li>
                <strong>National Authorities:</strong> If compelled by law to
                protect the National Interest or the physical and economic
                safety of our members.
              </li>
            </ul>
          </section>
          {/* Sovereignty */}
          <section className="pt-10 border-t border-brand-dark-200">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider mb-6">
              The Right to Data Sovereignty
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed mb-8">
              You maintain the right to access, update, or authorize the
              deletion of your data within the INSM ecosystem. For any inquiries
              regarding your Economic Footprint or to optimize your
              communication preferences, contact our headquarters at +256 784
              323 406 or email partnership@insmuganda.org.
            </p>
            <div className="flex flex-nowrap overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 gap-4 pt-4 no-scrollbar">
              <Link
                to="/privacy-policy"
                className="inline-flex items-center justify-center shrink-0 bg-brand-lilac-700 text-brand-white text-[12px] sm:text-sm font-primary font-bold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full transition-all cursor-default uppercase tracking-widest shadow-md whitespace-nowrap"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-use"
                className="inline-flex items-center justify-center shrink-0 border-2 border-brand-lilac-700 text-brand-lilac-700 hover:bg-brand-lilac-700 hover:text-brand-white text-[12px] sm:text-sm font-primary font-bold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full transition-all cursor-pointer uppercase tracking-widest whitespace-nowrap"
              >
                Terms of Use
              </Link>
              <Link
                to="/ethical-conduct"
                className="inline-flex items-center justify-center shrink-0 border-2 border-brand-lilac-700 text-brand-lilac-700 hover:bg-brand-lilac-700 hover:text-brand-white text-[12px] sm:text-sm font-primary font-bold px-6 py-2.5 sm:px-8 sm:py-3 rounded-full transition-all cursor-pointer uppercase tracking-widest whitespace-nowrap"
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

export default PrivacyPolicyPage;
