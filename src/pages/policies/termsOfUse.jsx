import React from "react";
import { Link } from "react-router-dom";

const TermsOfUse = () => {
  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold font-primary text-brand-dark mb-2">
          Terms of Use
        </h1>
        <p className="text-lg font-secondary text-brand-dark-400 italic mb-10">
          Guidelines for Partners, Mentors, and Equippers
        </p>

        {/* Intro */}
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          By accessing this site or the Equipper Portal, you agree to uphold the
          integrity of the International Network for Single Mothers Uganda
          Chapter mission: turning resilience into economic power.
        </p>

        {/* 1. Acceptance of Terms */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          By accessing the website or portals of the International Network for
          Single Mothers Uganda Chapter, you agree to be bound by these Terms of
          Use and all applicable laws and regulations in the Republic of Uganda.
        </p>

        {/* 2. Intellectual Property */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          2. Intellectual Property
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          The "Makindye Model," the "Three Ropes" methodology, and all "Power
          Portraits" are the intellectual property of the International Network
          for Single Mothers Uganda Chapter. Users may not use, reproduce, or
          distribute these materials for unauthorized commercial purposes.
        </p>

        {/* 3. Partnership Conduct */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          3. Partnership Conduct
        </h2>
        <div className="space-y-5 mb-10">
          <p className="text-base font-secondary text-brand-dark-400 leading-relaxed">
            To maintain the Network's integrity, all partners must adhere to the
            following standards of conduct:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base font-secondary text-brand-dark-400 leading-relaxed">
            <li>
              <strong>Technical Mentors:</strong> Must provide expertise in Law,
              Finance, or Health in accordance with professional standards and
              the infrastructure of the Network.
            </li>
            <li>
              <strong>Community Equippers:</strong> Must utilize the official
              portal solely for the registration and empowerment of single
              mothers within their designated parishes.
            </li>
            <li>
              <strong>Corporate & Civic Allies:</strong> Must act in alignment
              with the national economic priority, providing market access and
              policy support that directly benefits the cooperatives without
              exploitative practices.
            </li>
          </ul>
        </div>

        {/* 4. Investment Integrity */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          4. Investment Integrity
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-10">
          When you "Give & Send," you acknowledge that your contribution is an
          investment in national economic infrastructure. The International
          Network for Single Mothers Uganda Chapter provides radical
          accountability via our Transparency Tracker, and users agree that all
          funds are deployed toward the specific financial mandates described.
        </p>

        {/* 5. Portal Conduct */}
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
          5. Portal Conduct
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 leading-relaxed mb-12">
          Community Equippers, and Mentors accessing restricted portals must
          maintain the highest ethical standards. Any misuse of user data or
          unauthorized use of the International Network for Single Mothers' name
          will result in immediate termination of access and potential legal
          action within the Republic of Uganda.
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

export default TermsOfUse;
