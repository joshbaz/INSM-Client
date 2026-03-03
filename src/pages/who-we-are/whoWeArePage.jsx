import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import WhoWeAreHero from "./whoWeAreHero";
import OurStory from "./OurStory";
import OurTeam from "./OurTeam";
import AnchorsOfTransformation from "./AnchorsOfTransformation";
import RoadMap from "./TheRoadmap";
import WhoWeAreOutro from "./whoWeAreOutro";
import useSEO from "../../hooks/useSEO";

const whoWeArePage = () => {
  useSEO({
    title: "Who We Are",
    description:
      "Meet the team behind the International Network for Single Mothers Uganda Chapter and learn about our roadmap for radical transparency and economic dignity.",
  });

  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let targetId = null;

    if (path.includes("our-team")) targetId = "our-team";
    else if (path.includes("the-roadmap")) targetId = "the-roadmap";
    // our-story intentionally left out so it falls through to scroll-to-top

    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Delay to ensure the DOM is painted and scroll position is accurate
        setTimeout(() => {
          const y = element.getBoundingClientRect().top + window.scrollY - 100; // 100px offset for fixed navbar
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top for generic /who-we-are or our-story route
    }
  }, [location.pathname, location.key]);

  return (
    <div className="overflow-hidden">
      <WhoWeAreHero />
      <OurStory />
      <OurTeam />
      <AnchorsOfTransformation />
      <RoadMap />
      <WhoWeAreOutro />
    </div>
  );
};

export default whoWeArePage;
