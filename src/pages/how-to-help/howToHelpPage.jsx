import React from "react";
import JoinAssignmentHero from "./joinAssigmentHero";
import Partners from "./partners";
import ROISection from "./roiSection";
import useSEO from "../../hooks/useSEO";

const JoinTheAssignment = () => {
  useSEO({
    title: "How to Help",
    description:
      "Join the assignment as a Technical Mentor, Community Equipper, or Corporate Ally to empower single mothers in Uganda.",
  });

  return (
    <div className="min-h-screen">
      <JoinAssignmentHero />
      <Partners />
      <ROISection />
    </div>
  );
};

export default JoinTheAssignment;
