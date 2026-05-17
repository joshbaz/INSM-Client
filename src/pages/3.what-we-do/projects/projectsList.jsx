import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import projectsData from "../../../data/projects.json";

const projectsList = () => {
  // Subcategory checkbox selections
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [sortOrder, setSortOrder] = useState("Default");

  // Accordion open states
  const [isCommunityOpen, setIsCommunityOpen] = useState(true);
  const [isAgricultureOpen, setIsAgricultureOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

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
      className={`w-5 h-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors ${checked ? "bg-brand-lilac border-brand-lilac" : "border-brand-dark-200 bg-brand-white"}`}
    >
      {checked && (
        <Icon icon="heroicons:check-bold" className="w-3 h-3 text-brand-white" />
      )}
    </div>
  );

  // Chevron icon component
  const ChevronIcon = ({ isOpen }) => (
    <Icon
      icon="ph:caret-down-bold"
      className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "text-brand-lilac-600 rotate-180" : "text-brand-dark"}`}
    />
  );

  return (
    <section className="bg-page-bg min-h-screen pt-[173px] md:pt-[181px] lg:pt-[197px] pb-12 md:pb-20">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-[90px]">
        {/* Page Header */}
        <div className="mb-[32px]">
          <h1 className="text-3xl md:text-4xl font-bold font-primary text-brand-dark">
            Projects{" "}
            <span className="text-xl md:text-2xl font-normal text-brand-dark-300">
              ({filteredProjects.length} results)
            </span>
          </h1>
        </div>

        {/* Main Layout: Cards + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-[38px]">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[300px] shrink-0 self-start order-first lg:order-last space-y-8 bg-[var(--industrial-white)] rounded-[10px] shadow-sidebar p-5">
            {/* ─── Category ─── */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon
                  icon="mynaui:sprout"
                  className="w-5 h-5 text-brand-dark"
                />
                <span className="text-base font-semibold font-primary text-brand-dark">
                  Category
                </span>
              </div>

              <div>
                {/* Community Programs */}
                <div>
                  <button
                    onClick={() => setIsCommunityOpen(!isCommunityOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-sm font-semibold font-secondary ${isCommunityOpen ? "text-brand-lilac-600" : "text-brand-dark"}`}>
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
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
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
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-sm font-semibold font-secondary ${isAgricultureOpen ? "text-brand-lilac-600" : "text-brand-dark"}`}>
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
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
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
                  icon="mynaui:filter-one"
                  className="w-5 h-5 text-brand-dark"
                />
                <span className="text-base font-semibold font-primary text-brand-dark">
                  Filters
                </span>
              </div>

              <div>
                {/* Project Status */}
                <div>
                  <button
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-sm font-semibold font-secondary ${isStatusOpen ? "text-brand-lilac-600" : "text-brand-dark"}`}>
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
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
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
                    className="w-full flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <span className={`text-sm font-semibold font-secondary ${isSortOpen ? "text-brand-lilac-600" : "text-brand-dark"}`}>
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
                        className="w-full flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
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
          <div className="grow max-w-[922px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
              {filteredProjects.map((project) => (
                <Link
                  to={`/what-we-do/projects/list/${project.id}`}
                  key={project.id}
                  className="w-full max-w-[290px] h-[448px] rounded-[10px] border border-brand-dark-200/40 bg-[var(--industrial-white)] overflow-hidden flex flex-col shadow-card-project"
                >
                  {/* Image */}
                  <div className="w-full h-[200px] overflow-hidden shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="pt-[12px] px-5 pb-5 flex flex-col grow">
                    <h3 className="text-[18px] md:text-[22px] lg:text-[26px] font-albert font-extrabold text-[var(--dark)] tracking-normal mb-[15px] truncate">
                      {project.title}
                    </h3>
                    <p className="text-[14px] md:text-[17px] font-open font-normal text-[var(--dark)] line-clamp-3">
                      {project.description}
                    </p>

                    <div className="grow min-h-[47px]" />

                    {/* Stats */}
                    <div className="flex items-center gap-3">
                      <span className="text-[20px] md:text-[24px] lg:text-[28px] font-albert font-extrabold text-brand-lilac leading-none">
                        {project.capitalRaised}
                      </span>
                      <span className="text-sm font-secondary text-brand-dark-400">
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
