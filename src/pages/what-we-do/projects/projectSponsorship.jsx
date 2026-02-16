import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import projectsData from "./projectsData";

const projectSponsorship = () => {
  const projects = projectsData.slice(0, 3);

  return (
    <section className="bg-brand-cream-100 py-20">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        {/* Heading */}
        <div className="mb-12 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-brand-dark mb-3">
            Sponsorship Opportunities
          </h2>
          <p className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed">
            Each program below are active ventures seeking partners to provide
            the capital or technical resources necessary to revamp the
            microeconomics of Uganda by empowering the single mother.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              to={`/projects/list/${project.id}`}
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="w-full h-[220px] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-bold font-primary text-brand-dark mb-2 truncate">
                  {project.title}
                </h3>
                <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Stats */}
                <div className="mt-auto flex items-center gap-4 pt-4 ">
                  <span className="text-xl font-bold font-primary text-brand-lilac">
                    {project.capitalRaised}
                  </span>
                  <span className="text-sm font-secondary text-brand-dark-300">
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
            to="/projects/list"
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
