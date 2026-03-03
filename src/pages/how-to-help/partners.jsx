import React, { useState } from "react";
import TechnicalMentorForm from "./partnersForms/technicalMentorForm";
import CommunityEquipperForm from "./partnersForms/communityEquipperForm";

const Partners = () => {
  const [isTechnicalMentorFormOpen, setIsTechnicalMentorFormOpen] =
    useState(false);
  const [isCommunityEquipperFormOpen, setIsCommunityEquipperFormOpen] =
    useState(false);

  return (
    <section className="py-16 md:py-24 bg-brand-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ───── Header ───── */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-4">
            Our Strategic Partners
          </h2>
          <p className="font-secondary text-brand-dark-400 text-base md:text-lg leading-relaxed max-w-4xl">
            This is not a call for charity, but a summons to national
            transformation. We are seeking professionals, leaders, and allies to
            help turn the survival instinct of 17,000+ single mothers into an
            unstoppable economic force. Join us in duplicating the Makindye
            Model across every district of the Republic.
          </p>
        </div>

        {/* ───── 1 · Technical Mentors  (image LEFT, text RIGHT) ───── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-20 md:mb-32">
          {/* Image container with curved left side – head overflows top */}
          <div className="relative w-[280px] sm:w-[320px] md:w-[360px] h-[360px] sm:h-[400px] md:h-[430px] shrink-0">
            {/* D-shaped colored background – sits at the bottom (clips image) */}
            <div className="absolute bottom-0 left-0 w-full h-[300px] sm:h-[340px] md:h-[360px] bg-brand-lilac-200 rounded-tl-[180px] rounded-bl-[180px] rounded-tr-none rounded-br-none overflow-hidden">
              <img
                src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/technical.png"
                alt="Technical Mentor – a professional in a white doctor's coat"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-full object-contain object-bottom"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 max-w-md text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-bold font-primary text-brand-lilac-700 mb-1">
              Technical Mentors
            </h3>
            <p className="font-primary font-semibold text-brand-dark text-base md:text-lg mb-3">
              Specialized Professional Expertise
            </p>
            <p className="font-secondary text-brand-dark-400 text-sm md:text-base leading-relaxed mb-5">
              We are looking for professionals in Law, Finance, and Health to
              provide the mentorship required for entrepreneurial mastery.
            </p>
            <ul className="space-y-3 mb-8 text-left font-secondary text-sm md:text-base text-brand-dark-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-lilac-700 shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">Legal Mentors</strong>:
                  Help cooperatives navigate registration and land rights.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-lilac-700 shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">Financial Mentors</strong>
                  : Provide induction into the "
                  <em>Rope of Financial Mastery</em>" and SACCO management.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-lilac-700 shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">Health Mentors</strong>:
                  Support the "<em>Rope of Family Stability</em>" through mental
                  health resilience.
                </span>
              </li>
            </ul>
            <div className="flex justify-center md:justify-end">
              <button
                type="button"
                onClick={() => setIsTechnicalMentorFormOpen(true)}
                className="inline-block bg-brand-lilac hover:bg-brand-lilac/90 text-brand-white font-primary font-semibold text-xs md:text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer"
              >
                Become a Technical Mentor
              </button>
            </div>
          </div>
        </div>

        {/* ───── 2 · Community Equippers  (text LEFT, image RIGHT) ───── */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16 mb-20 md:mb-32">
          {/* Text content */}
          <div className="flex-1 max-w-md text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-bold font-primary italic text-brand-teal-700 mb-1">
              Community Equippers
            </h3>
            <p className="font-primary font-semibold text-brand-dark text-base md:text-lg mb-3">
              Grassroots Mobilization at the Parish Level
            </p>
            <p className="font-secondary text-brand-dark-400 text-sm md:text-base leading-relaxed mb-5">
              We partner with the wives of spiritual and regional leaders to act
              as "Equippers"
            </p>
            <ul className="space-y-3 mb-8 text-left font-secondary text-sm md:text-base text-brand-dark-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-teal-700 shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">The Role:</strong>{" "}
                  Mobilizing the single mothers, registering new members, and
                  delivering the training "<em>Ropes</em>" (toolkits) in the
                  field.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-teal-700 shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">The Impact:</strong>{" "}
                  Weaving personal struggles into a collective force strong
                  enough to pull communities out of poverty.
                </span>
              </li>
            </ul>
            <div className="flex justify-center md:justify-start">
              <button
                type="button"
                onClick={() => setIsCommunityEquipperFormOpen(true)}
                className="inline-block bg-brand-teal-800 hover:bg-brand-teal-800/90 text-brand-white font-primary font-semibold text-xs md:text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-colors duration-300 cursor-pointer"
              >
                Inquire About Equippers Portal
              </button>
            </div>
          </div>

          {/* Image container with curved right side */}
          <div className="relative w-[280px] sm:w-[320px] md:w-[360px] shrink-0">
            <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] bg-brand-teal-200 rounded-tr-[180px] rounded-br-[180px] rounded-tl-none rounded-bl-none overflow-hidden">
              <img
                src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/equippers.png"
                alt="Community Equipper – a woman in a yellow African print dress"
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          </div>
        </div>

        {/* ───── 3 · Corporate & Civic Allies  (image LEFT, text RIGHT) ───── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Image container with curved left side */}
          <div className="relative w-[280px] sm:w-[320px] md:w-[360px] shrink-0">
            <div className="w-full h-[300px] sm:h-[340px] md:h-[380px] bg-brand-brown-100 rounded-tl-[180px] rounded-bl-[180px] rounded-tr-none rounded-br-none overflow-hidden">
              <img
                src="https://ik.imagekit.io/sbgenu6wj/Internation%20Network%20For%20Single%20Mothers/coorporate.png"
                alt="Corporate ally – a professional woman in a green blazer"
                className="w-full h-full object-contain object-bottom"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 max-w-md text-center md:text-left">
            <h3 className="text-2xl md:text-4xl font-bold font-primary text-brand-brown mb-1">
              Corporate &amp; Civic Allies
            </h3>
            <p className="font-primary font-semibold text-brand-dark text-base md:text-lg mb-3">
              Market Access &amp; Policy Alignment
            </p>
            <p className="font-secondary text-brand-dark-400 text-sm md:text-base leading-relaxed mb-5">
              We invite businesses and Government officials (RDCs/ RCCs) to join
              the national economic priority.
            </p>
            <ul className="space-y-3 mb-8 text-left font-secondary text-sm md:text-base text-brand-dark-400 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-brown shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">Market Access:</strong>{" "}
                  Partner with our vocational graduates in Commercial
                  Agriculture and Tourism.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-brown shrink-0"></span>
                <span>
                  <strong className="text-brand-dark">Policy Alignment:</strong>{" "}
                  Work with leadership to ensure our model integrates with
                  national development goals.
                </span>
              </li>
            </ul>
            <div className="flex justify-center md:justify-end">
              <a
                href="#"
                className="inline-block bg-brand-brown hover:bg-brand-brown/90 text-brand-white font-primary font-semibold text-xs md:text-sm tracking-widest uppercase px-6 py-3 rounded-full transition-colors duration-300"
              >
                Partner at the Executive Level
              </a>
            </div>
          </div>
        </div>
      </div>

      <TechnicalMentorForm
        isOpen={isTechnicalMentorFormOpen}
        onClose={() => setIsTechnicalMentorFormOpen(false)}
      />
      <CommunityEquipperForm
        isOpen={isCommunityEquipperFormOpen}
        onClose={() => setIsCommunityEquipperFormOpen(false)}
      />
    </section>
  );
};

export default Partners;
