import React from "react";
import { Link } from "react-router-dom";

const EthicalConduct = () => {
  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold font-primary text-brand-dark mb-2">
          Ethical Conduct Policy
        </h1>
        <p className="text-lg font-secondary text-brand-dark-400 italic mb-10">
          Our Commitment to Integrity and Accountability
        </p>

        {/* Intro */}
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          The International Network for Single Mothers Uganda Chapter upholds
          the highest standards of ethical conduct in every aspect of our
          operations. This policy governs the behavior of all staff, volunteers,
          partners, mentors, and equippers associated with the Network.
        </p>

        {/* 1. Mission Alignment */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          1. Mission Alignment
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          All activities conducted under the Network's name must align with our
          core mission of turning resilience into economic power. Any actions
          that undermine the dignity, safety, or economic empowerment of single
          mothers are strictly prohibited.
        </p>

        {/* 2. Financial Transparency */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          2. Financial Transparency
        </h2>
        <div className="space-y-5 mb-10">
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            We maintain a "Gold Standard" of radical transparency. This means:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base font-secondary text-brand-dark-400 leading-relaxed">
            <li>
              Every shilling received is tracked and accounted for in our
              Transparency Tracker.
            </li>
            <li>
              Quarterly deployment reports are published and made available to
              all stakeholders.
            </li>
            <li>
              Any misuse or misallocation of funds will be investigated and
              reported to the appropriate authorities.
            </li>
          </ul>
        </div>

        {/* 3. Partner Responsibilities */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          3. Partner Responsibilities
        </h2>
        <div className="space-y-5 mb-10">
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            All partners, including Technical Mentors, Community Equippers, and
            Corporate & Civic Allies, must:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base font-secondary text-brand-dark-400 leading-relaxed">
            <li>
              Act with honesty, integrity, and professionalism in all
              interactions with the Network and the communities we serve.
            </li>
            <li>
              Avoid conflicts of interest and disclose any potential conflicts
              promptly to the Network's leadership.
            </li>
            <li>
              Refrain from exploiting their position for personal gain at the
              expense of the Network or its beneficiaries.
            </li>
          </ul>
        </div>

        {/* 4. Data Ethics */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          4. Data Ethics
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          Personal data collected from mothers, donors, and partners is treated
          with the utmost care and confidentiality. Data must only be used for
          its stated purpose and never shared with unauthorized parties. Any
          breach of data ethics will result in immediate termination of access
          and potential legal action.
        </p>

        {/* 5. Community Standards */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          5. Community Standards
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          All members of the Network's community — online and offline — are
          expected to treat each other with respect and dignity. Discrimination,
          harassment, or any form of abuse will not be tolerated and will be met
          with swift action, including removal from the Network.
        </p>

        {/* 6. Reporting Violations */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          6. Reporting Violations
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-12">
          If you witness or suspect a violation of this Ethical Conduct Policy,
          you are encouraged to report it immediately by contacting us at{" "}
          <a
            href="tel:+256784323406"
            className="text-brand-lilac-700 border-b border-brand-lilac-700 hover:text-brand-lilac-900 transition-colors"
          >
            +256 784 323 406
          </a>{" "}
          or emailing{" "}
          <a
            href="mailto:ethics@insmuganda.org"
            className="text-brand-lilac-700 border-b border-brand-lilac-700 hover:text-brand-lilac-900 transition-colors"
          >
            ethics@insmuganda.org
          </a>
          . All reports will be handled confidentially.
        </p>

        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/privacy-policy"
            className="px-5 py-2 border-2 border-brand-dark-200 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark-400 hover:border-brand-lilac hover:text-brand-lilac transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-use"
            className="px-5 py-2 border-2 border-brand-dark-200 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark-400 hover:border-brand-lilac hover:text-brand-lilac transition-all"
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EthicalConduct;
