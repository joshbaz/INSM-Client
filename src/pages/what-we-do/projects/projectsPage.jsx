import React from "react";
import Projects from "./projectsHero";
import Stats from "./projectStats";
import Funds from "./projectFunds";
import Sponsorship from "./projectSponsorship";
import useSEO from "../../../hooks/useSEO";

const whatWeDo = () => {
  useSEO({
    title: "Our Projects",
    description:
      "Explore the specific community projects and cooperative groups supported by the International Network for Single Mothers Uganda.",
  });

  return (
    <div>
      <Projects />
      <Stats />
      <Funds />
      <Sponsorship />
    </div>
  );
};

export default whatWeDo;
