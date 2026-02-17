import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold font-primary text-brand-dark mb-2">
          Privacy Policy
        </h1>
        <p className="text-lg font-secondary text-brand-dark-400 italic mb-10">
          Protecting the movement of your Data
        </p>

        {/* Intro */}
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          The International Network for Single Mothers Uganda Chapter is
          committed to respecting the privacy rights of all donors, members, and
          visitors to our website. The following information details our
          collection, protection, and use of the data we receive from donors and
          visitors to this website.
        </p>

        {/* Our General Policy */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          Our General Policy
        </h2>
        <div className="space-y-5 mb-10">
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            The International Network for Single Mothers Uganda Chapter
            recognizes the importance of protecting information we may collect
            from donors and visitors to our website. We maintain appropriate
            security measures to keep this information private and secure.
          </p>
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            We follow industry standards on information security to safeguard
            sensitive information, including strong passwords, data encryption,
            and security awareness training for all team members. Personally
            Identifiable Information (PII) is accessible only to staff and
            volunteers who need it for business purposes. Confidential data is
            protected via role-based access controls to ensure it is not
            improperly disclosed or modified.
          </p>
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            If you choose to give us personal information via the Internet for
            the purposes of correspondence, seeding a cooperative, or
            subscribing to our newsletter, it is our intent to let you know how
            we will use such information.
          </p>
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            The International Network for Single Mothers Chapter will remove
            your name from our mailing list, email list, or telephone
            solicitation list at any time at your request. To do so, please
            email{" "}
            <a
              href="mailto:recurringgiving@insmuganda.org"
              className="text-brand-lilac-700 border-b border-brand-lilac-700 hover:text-brand-lilac-900 transition-colors"
            >
              recurringgiving@insmuganda.org
            </a>
            .
          </p>
        </div>

        {/* Information Collected */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-2">
          Information Collected by the International Network for Single Mothers
          Uganda Chapter
        </h2>
        <div className="space-y-5 mb-10">
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            We are committed to protecting your privacy and maintaining
            transparency about how we handle your information. We do not collect
            personally identifiable information (PII) from visitors unless it is
            provided voluntarily and knowingly. Certain features and
            interactions require you to share information with us. For instance,
            we collect PII when you:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base font-secondary text-brand-dark-400 leading-relaxed">
            <li>
              <strong>Join the Equipper Network:</strong> We collect your{" "}
              <em>
                Full Name, Phone Number, Email Address, Parish or District of
                Residence, and Conversion to Leadership
              </em>{" "}
              to facilitate grassroots mobilization.
            </li>
            <li>
              <strong>Join the Technical Mentorship:</strong> We collect your{" "}
              <em>
                Full Name, Phone Number, Email Address, LinkedIn Profile, and
                your specific Area of Expertise
              </em>{" "}
              (Law, Finance, Health, or other) to build the infrastructure of
              our movement.
            </li>
            <li>
              <strong>Interact with our Portals:</strong> We automatically
              gather non-personally identifiable information about your device
              and browsing behavior to improve the content and structure of our
              national economic priority.
            </li>
          </ul>
        </div>

        {/* Online Investments & Security */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          Online Investments & Security
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          Our online donation and investment processors utilize high-grade
          encryption to ensure secure transactions and data management. We
          maintain a "Gold Standard" of radical transparency to ensure every
          shilling is accounted for in our Transparency Tracker.
        </p>

        {/* Disclosure of Your Information */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          Disclosure of Your Information
        </h2>
        <div className="space-y-5 mb-10">
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            Subject to applicable law, we may disclose PII to:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base font-secondary text-brand-dark-400 leading-relaxed">
            <li>
              <strong>Technical Mentors & Advisors:</strong> Professionals under
              contract (Law, Finance, Health) who are required to protect
              confidentiality and use information solely for the service
              provided.
            </li>
            <li>
              <strong>Law Enforcement:</strong> if compelled by law or in
              connection with a government request to protect the integrity of
              the Republic of Uganda or the safety of our members.
            </li>
          </ul>
        </div>

        {/* Your Rights */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          Your Rights
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-12">
          You have the right to access data about you processed by the
          International Network for Single Mothers Uganda Chapter. You may
          request an update or deletion of your personal data by contacting us
          at{" "}
          <a
            href="tel:+256784323406"
            className="text-brand-lilac-700 border-b border-brand-lilac-700 hover:text-brand-lilac-900 transition-colors"
          >
            +256 784 323 406
          </a>
          .
        </p>

        {/* Navigation Pills */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/terms-of-use"
            className="px-5 py-2 border-2 border-brand-dark-200 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark-400 hover:border-brand-lilac hover:text-brand-lilac transition-all"
          >
            Terms
          </Link>
          <Link
            to="/ethical-conduct"
            className="px-5 py-2 border-2 border-brand-dark-200 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark-400 hover:border-brand-lilac hover:text-brand-lilac transition-all"
          >
            Ethical Conduct
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
