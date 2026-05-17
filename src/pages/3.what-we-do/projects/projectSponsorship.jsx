import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import projectsData from "../../../data/projects.json";

const projectSponsorship = () => {
  const projects = projectsData.slice(0, 3);

  return (
    <section className="bg-brand-white-100 py-20">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-[146px]">
        {/* Heading */}
        <div className="w-full mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-3">
            Sponsorship Opportunities
          </h2>
          <p className="text-sm md:text-base font-open font-normal text-brand-dark-400 leading-relaxed">
            Each program below are active ventures seeking partners to provide
            the capital or technical resources necessary to revamp the
            microeconomics of Uganda by empowering the single mother.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] justify-items-center">
          {projects.map((project, index) => (
            <Link
              to={`/what-we-do/projects/list/${project.id}`}
              key={index}
              className="w-full max-w-[356px] h-[525px] rounded-[10px] border border-brand-dark-200/40 bg-brand-white overflow-hidden flex flex-col shadow-sponsorship"
            >
              {/* Image */}
              <div className="w-full h-[256px] overflow-hidden shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="pt-[24px] px-5 pb-5 flex flex-col grow">
                <h3 className="text-lg md:text-xl font-albert font-extrabold text-brand-dark tracking-normal mb-[10px] truncate">
                  {project.title}
                </h3>
                <p className="text-xs md:text-sm font-open font-normal text-brand-dark-400 mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="mt-auto flex items-center gap-4 pt-4 ">
                  <span className="text-base md:text-lg font-bold font-primary text-brand-lilac">
                    {project.capitalRaised}
                  </span>
                  <span className="text-[11px] md:text-xs font-secondary text-brand-dark-400">
                    Capital raised
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Projects */}
        <div className="flex justify-center mt-12">
          <Link
            to="/what-we-do/projects/list"
            className="inline-flex items-center gap-2 text-base font-secondary text-brand-dark-400 hover:text-brand-dark transition-colors group"
          >
            View more projects
            <Icon
              icon="heroicons:arrow-right"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default projectSponsorship;
