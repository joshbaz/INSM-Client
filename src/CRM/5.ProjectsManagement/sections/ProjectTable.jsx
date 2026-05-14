import React, { useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import projectsData from "../../../data/projects.json";
import ProjectModal from "./ProjectModal";

const ProjectTable = () => {
  const [data, setData] = useState(projectsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleAdd = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      setData((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (projectData) => {
    if (selectedProject) {
      // Edit existing
      setData((prev) =>
        prev.map((p) => (p.id === selectedProject.id ? { ...p, ...projectData } : p))
      );
    } else {
      // Add new
      const newProject = {
        ...projectData,
        id: Date.now(), // Generate a mock ID
        stats: { mothersEmpowered: 0, saccosFunded: 0, capitalDeployed: "$0" },
        galleryImages: [],
        story: "",
        extendedStory: "",
        subcategory: "",
        createdAt: new Date().toISOString().split("T")[0],
      };
      setData((prev) => [newProject, ...prev]);
    }
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Project Title",
        cell: (info) => (
          <div className="font-primary font-bold text-brand-dark">
            {info.getValue()}
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => (
          <span className="text-xs font-secondary text-brand-dark-400">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: (info) => (
          <span className="text-xs font-secondary text-brand-dark-400">
            {info.getValue()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
          const status = info.getValue();
          let colorClass = "bg-gray-100 text-gray-600 border-gray-200";
          if (status === "Fully Funded" || status === "Completed" || status === "Active") {
            colorClass = "bg-green-100 text-green-700 border-green-200";
          } else if (status === "Upcoming") {
            colorClass = "bg-brand-lilac-100 text-brand-lilac-700 border-brand-lilac-200";
          }
          return (
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${colorClass}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "capitalRaised",
        header: "Capital",
        cell: (info) => (
          <span className="font-primary font-bold text-brand-gold">
            {info.getValue()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="p-1.5 text-brand-teal-600 hover:bg-brand-teal-100 rounded-md transition-colors"
              title="Edit Project"
            >
              <Icon icon="heroicons:pencil-square" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(row.original.id, row.original.title)}
              className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete Project"
            >
              <Icon icon="heroicons:trash" className="w-5 h-5" />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <>
      <div className="bg-brand-white rounded-2xl border border-brand-dark-200/20 shadow-sm overflow-hidden">
        {/* Table Header / Toolbar */}
        <div className="p-6 border-b border-brand-dark-200/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-primary font-bold text-brand-dark">
              Projects Database
            </h3>
            <p className="text-xs font-secondary text-brand-dark-400">
              Manage your active and upcoming projects.
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold text-brand-navy-900 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-brand-gold-400 transition-colors"
          >
            <Icon icon="heroicons:plus" className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="bg-brand-white-100/50 border-b border-brand-dark-200/10"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="p-4 text-xs font-bold text-brand-dark-400 uppercase tracking-widest whitespace-nowrap"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-brand-dark-200/10 hover:bg-brand-white-100/30 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 whitespace-nowrap">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-8 text-center text-sm font-secondary text-brand-dark-400"
                  >
                    No projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-brand-dark-200/10 flex items-center justify-between bg-brand-white-100/30">
          <span className="text-xs font-secondary text-brand-dark-400">
            Showing {table.getRowModel().rows.length} of {data.length} projects
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 rounded-lg border border-brand-dark-200/20 text-brand-dark-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-white-100 transition-colors"
            >
              <Icon icon="heroicons:chevron-left" className="w-4 h-4" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 rounded-lg border border-brand-dark-200/20 text-brand-dark-400 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-white-100 transition-colors"
            >
              <Icon icon="heroicons:chevron-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        project={selectedProject}
      />
    </>
  );
};

export default ProjectTable;
