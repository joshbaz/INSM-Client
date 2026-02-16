import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import projectsData from "./projectsData";

const projectsList = () => {
  // Subcategory checkbox selections
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortOrder, setSortOrder] = useState("Default");

  // Accordion open states
  const [isCommunityOpen, setIsCommunityOpen] = useState(true);
  const [isAgricultureOpen, setIsAgricultureOpen] = useState(true);
  const [isStatusOpen, setIsStatusOpen] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(true);

  const categoryStructure = {
    "Community Programs": [
      "Local Businesses",
      "Fashion & Wearables",
      "Other Projects",
    ],
    "Agriculture & Food": [
      "Land",
      "Dairy & Poultry business",
      "Food market",
      "Other farming projects",
    ],
  };

  const statuses = ["Upcoming", "Fully Funded", "Completed"];
  const sortOptions = [
    "Default",
    "A-Z",
    "Z-A",
    "Newest",
    "Oldest",
    "Recently added updates",
  ];

  // Toggle subcategory
  const toggleSubcategory = (sub) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub],
    );
  };

  // Toggle status
  const toggleStatus = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    let results = [...projectsData];

    if (selectedSubcategories.length > 0) {
      results = results.filter((p) =>
        selectedSubcategories.includes(p.subcategory),
      );
    }
    if (selectedStatuses.length > 0) {
      results = results.filter((p) => selectedStatuses.includes(p.status));
    }

    switch (sortOrder) {
      case "A-Z":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Newest":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Oldest":
        results.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "Recently added updates":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return results;
  }, [selectedSubcategories, selectedStatuses, sortOrder]);

  // Checkbox component
  const Checkbox = ({ checked }) => (
    <div
      className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${checked ? "bg-brand-lilac border-brand-lilac" : "border-brand-dark-200 bg-white"}`}
    >
      {checked && (
        <Icon icon="heroicons:check-bold" className="w-3 h-3 text-white" />
      )}
    </div>
  );

  // Chevron icon component
  const ChevronIcon = ({ isOpen }) => (
    <Icon
      icon="ph:caret-down-bold"
      className={`w-5 h-5 text-brand-dark-300 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
    />
  );

  return (
    <section className="bg-brand-cream-100 min-h-screen py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-24">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-primary text-brand-dark">
            Projects{" "}
            <span className="text-xl md:text-2xl font-normal text-brand-dark-300">
              ({filteredProjects.length} results)
            </span>
          </h1>
        </div>

        {/* Main Layout: Cards + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[280px] shrink-0 order-first lg:order-last space-y-8">
            {/* ─── Category ─── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon
                  icon="heroicons:squares-2x2"
                  className="w-5 h-5 text-brand-lilac"
                />
                <span className="text-base font-semibold font-primary text-brand-dark">
                  Category
                </span>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Community Programs */}
                <div>
                  <button
                    onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-sm font-semibold font-secondary text-brand-lilac">
                      Community Programs
                    </span>
                    <ChevronIcon isOpen={isCommunityOpen} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isCommunityOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {categoryStructure["Community Programs"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => toggleSubcategory(sub)}
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        <Checkbox
                          checked={selectedSubcategories.includes(sub)}
                        />
                        <span className="text-sm font-secondary text-brand-dark-400">
                          {sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Agriculture & Food */}
                <div>
                  <button
                    onClick={() => setIsAgricultureOpen(!isAgricultureOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-sm font-semibold font-secondary text-brand-lilac">
                      Agriculture & Food
                    </span>
                    <ChevronIcon isOpen={isAgricultureOpen} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isAgricultureOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {categoryStructure["Agriculture & Food"].map((sub) => (
                      <button
                        key={sub}
                        onClick={() => toggleSubcategory(sub)}
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        <Checkbox
                          checked={selectedSubcategories.includes(sub)}
                        />
                        <span className="text-sm font-secondary text-brand-dark-400">
                          {sub}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── Filters ─── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon
                  icon="heroicons:adjustments-horizontal"
                  className="w-5 h-5 text-brand-lilac"
                />
                <span className="text-base font-semibold font-primary text-brand-dark">
                  Filters
                </span>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Project Status */}
                <div>
                  <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-sm font-semibold font-secondary text-brand-lilac">
                      Project status
                    </span>
                    <ChevronIcon isOpen={isStatusOpen} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isStatusOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => toggleStatus(status)}
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        <Checkbox checked={selectedStatuses.includes(status)} />
                        <span className="text-sm font-secondary text-brand-dark-400">
                          {status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="text-sm font-semibold font-secondary text-brand-lilac">
                      Sort
                    </span>
                    <ChevronIcon isOpen={isSortOpen} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isSortOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortOrder(option)}
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                      >
                        <Checkbox checked={sortOrder === option} />
                        <span className="text-sm font-secondary text-brand-dark-400">
                          {option}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grow">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Link
                  to={`/projects/list/${project.id}`}
                  key={project.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  {/* Image */}
                  <div className="w-full h-[160px] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col grow">
                    <h3 className="text-base font-bold font-primary text-brand-dark mb-1.5 truncate">
                      {project.title}
                    </h3>
                    <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-auto flex items-center gap-3">
                      <span className="text-lg font-bold font-primary text-brand-lilac">
                        {project.capitalRaised}
                      </span>
                      <span className="text-xs font-secondary text-brand-dark-300">
                        Capital raised
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-lg font-secondary text-brand-dark-300">
                  No projects match the selected filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default projectsList;
