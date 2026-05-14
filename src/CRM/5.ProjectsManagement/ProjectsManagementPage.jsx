import React from "react";
import { Icon } from "@iconify/react";
import ProjectTable from "./sections/ProjectTable";

const ProjectsManagementPage = () => {
  return (
    <div className="space-y-8 pb-12 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-primary font-bold text-brand-dark">Projects Management</h2>
          <p className="text-sm font-secondary text-brand-dark-400">Manage adding, deleting, and editing the projects that appear on the projects page.</p>
        </div>
      </div>

      <section className="w-full overflow-hidden">
        <ProjectTable />
      </section>
    </div>
  );
};

export default ProjectsManagementPage;
