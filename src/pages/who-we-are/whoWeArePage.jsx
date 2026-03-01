import React from "react";
import OurStory from "./OurStory";
import OuTeam from "./OurTeam";
import RoadMap from "./TheRoadmap";
import useSEO from "../../hooks/useSEO";

const whoWeArePage = () => {
  useSEO({
    title: "Who We Are",
    description:
      "Meet the team behind the International Network for Single Mothers Uganda Chapter and learn about our roadmap for radical transparency and economic dignity.",
  });

  return (
    <div>
      <OurStory />
      <OuTeam />
      <RoadMap />
    </div>
  );
};

export default whoWeArePage;
