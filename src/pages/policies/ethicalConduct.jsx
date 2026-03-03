import React from "react";
import { Link } from "react-router-dom";
import useSEO from "../../hooks/useSEO";

const EthicalConduct = () => {
  useSEO({
    title: "Ethical Compliance & Security | INSM Uganda",
    description:
      "Operational security and ethical compliance protocols for the INSM Uganda Chapter. Protecting the structural integrity of our members and capital.",
  });

  return (
    <div className="pt-32 pb-20 min-h-screen bg-brand-white text-brand-dark">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Header */}
        <div className="mb-16 border-l-4 border-brand-gold pl-6">
          <h1 className="text-4xl md:text-5xl font-black font-primary text-brand-dark uppercase tracking-tight mb-4">
            Ethical Compliance & Security
          </h1>
          <p className="text-lg font-primary font-bold text-brand-gold uppercase tracking-[0.2em]">
            Operational Security Protocols
          </p>
        </div>

        <div className="space-y-16">
          {/* Mission & Policy Intro */}
          <section className="space-y-6">
            <p className="text-lg font-secondary leading-relaxed font-medium">
              The International Network for Single Mothers (INSM) Uganda Chapter
              exists to optimize the fiscal sovereignty of the household unit.
              We maintain a zero-tolerance mandate for any conduct that
              compromises the Structural Integrity or safety of the members
              within our Bloc.
            </p>
          </section>

          {/* 1. Protection of the Industrial Asset */}
          <section className="space-y-6">
            <h2 className="text-xl font-primary font-black text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4">
              1. Protection of the Industrial Asset
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              As a National Economic Priority, we ensure that no member is
              subjected to coercion or operational friction in exchange for
              access to cooperatives or SACCO capital within the Nation.
            </p>
          </section>

          {/* 2. Reporting and Accountability */}
          <section className="space-y-6 bg-brand-navy-900 p-8 md:p-12 text-brand-white border-t-2 border-brand-gold">
            <h2 className="text-xl font-primary font-black text-brand-gold uppercase tracking-wider">
              2. Reporting and Accountability
            </h2>
            <p className="font-secondary leading-relaxed opacity-80">
              If you observe or experience conduct that violates the operational
              protocols of INSM, report it immediately to our Compliance and
              Audit Team:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                  Hotline
                </span>
                <a
                  href="tel:+256784323406"
                  className="text-xl font-primary font-bold hover:text-brand-gold transition-colors"
                >
                  +256 784 323 406
                </a>
              </div>
              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                  Email
                </span>
                <a
                  href="mailto:compliance@insmuganda.org"
                  className="text-xl font-primary font-bold hover:text-brand-gold transition-colors"
                >
                  compliance@insmuganda.org
                </a>
              </div>
            </div>
          </section>

          {/* DATA SOVEREIGNTY */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-primary font-black text-brand-dark uppercase tracking-tight">
                Data Sovereignty: Is my information secure?
              </h2>
              <p className="text-brand-gold font-bold uppercase tracking-widest text-sm">
                Intellectual Asset Protection
              </p>
            </div>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              INSM recognizes that data is a primary asset. We protect the
              intelligence collected from Capital Partners, Mentors, and
              Equippers with industrial-grade protocols.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <li className="bg-brand-white-100 p-6 border border-brand-dark-200/50">
                <h4 className="font-primary font-bold text-xs uppercase tracking-widest mb-3">
                  Access Controls
                </h4>
                <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                  Personally Identifiable Information (PII) is restricted to
                  authorized Strategic Staff and Technical Mentors for specific
                  industrial training or operational mandates.
                </p>
              </li>
              <li className="bg-brand-white-100 p-6 border border-brand-dark-200/50">
                <h4 className="font-primary font-bold text-xs uppercase tracking-widest mb-3">
                  Data Integrity
                </h4>
                <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                  Confidential data is secured via Role-Based Access Controls
                  (RBAC) to prevent unauthorized modification or disclosure.
                </p>
              </li>
              <li className="bg-brand-white-100 p-6 border border-brand-dark-200/50">
                <h4 className="font-primary font-bold text-xs uppercase tracking-widest mb-3">
                  Retention
                </h4>
                <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                  Sensitive data is retained strictly according to legal,
                  regulatory, and industrial requirements within the Nation.
                </p>
              </li>
            </ul>
          </section>

          {/* CAPITAL SECURITY */}
          <section className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-primary font-black text-brand-dark uppercase tracking-tight">
                Capital Security: Is my investment secure?
              </h2>
              <p className="text-brand-gold font-bold uppercase tracking-widest text-sm">
                Institutional Integrity Standards
              </p>
            </div>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              Your capitalization of this movement is handled with the highest
              level of institutional integrity.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <li className="space-y-3">
                <h4 className="font-primary font-bold text-xs text-brand-dark uppercase tracking-widest border-l-2 border-brand-gold pl-3">
                  Industrial Standards
                </h4>
                <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                  Our capital processors meet global industry standards for
                  secure transactions and multi-tier data management.
                </p>
              </li>
              <li className="space-y-3">
                <h4 className="font-primary font-bold text-xs text-brand-dark uppercase tracking-widest border-l-2 border-brand-gold pl-3">
                  Encryption
                </h4>
                <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                  We utilize high-grade encryption to ensure every
                  investment—from "The Primary Link" ($10) to "The SACCO Engine"
                  ($10,000+)—is transferred with bank-grade security.
                </p>
              </li>
              <li className="space-y-3">
                <h4 className="font-primary font-bold text-xs text-brand-dark uppercase tracking-widest border-l-2 border-brand-gold pl-3">
                  Recurring Controls
                </h4>
                <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                  For partners choosing Continuous Capitalization (Monthly), you
                  maintain full command and may terminate the subscription at
                  any time.
                </p>
              </li>
            </ul>
          </section>

          {/* THE RIGHT TO BE FORGOTTEN */}
          <section className="pt-16 border-t border-brand-dark-200 space-y-8">
            <h2 className="text-2xl font-primary font-black text-brand-dark uppercase tracking-tight">
              The Right to be Forgotten: Can I delete my data?
            </h2>
            <p className="text-brand-dark-400 font-secondary leading-relaxed">
              INSM respects your Data Sovereignty. In alignment with our
              commitment to Radical Transparency, you maintain the right to
              request the update or deletion of your economic footprint at any
              time.
            </p>
            <div className="bg-brand-white-100 p-8 border border-brand-dark-200/50 space-y-6">
              <h4 className="font-primary font-black text-sm uppercase tracking-widest text-brand-dark">
                Our Industrial Deletion Policy
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5"></div>
                  <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                    <strong>Verification Mandatory:</strong> To protect the
                    integrity of the Bloc, identity verification is required
                    before any data subject request is authorized.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5"></div>
                  <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                    <strong>Timeline:</strong> Data requests are typically
                    processed within 30 days; you will receive a formal
                    notification once the deletion is finalized.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-1.5"></div>
                  <p className="text-xs text-brand-dark-400 font-secondary leading-relaxed">
                    <strong>Lifecycle Management:</strong> All hardware and
                    media containing PII are wiped and destroyed at the end of
                    their operational lifecycle to ensure zero data leakage.
                  </p>
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                to="/privacy-policy"
                className="inline-flex items-center justify-center border-2 border-brand-lilac-700 text-brand-lilac-700 hover:bg-brand-lilac-700 hover:text-brand-white text-sm font-primary font-bold px-8 py-3 rounded-full transition-all cursor-pointer uppercase tracking-widest"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-use"
                className="inline-flex items-center justify-center border-2 border-brand-lilac-700 text-brand-lilac-700 hover:bg-brand-lilac-700 hover:text-brand-white text-sm font-primary font-bold px-8 py-3 rounded-full transition-all cursor-pointer uppercase tracking-widest"
              >
                Terms of Use
              </Link>
              <Link
                to="/ethical-conduct"
                className="inline-flex items-center justify-center bg-brand-lilac-700 text-brand-white text-sm font-primary font-bold px-8 py-3 rounded-full transition-all cursor-default uppercase tracking-widest shadow-md"
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

export default EthicalConduct;
