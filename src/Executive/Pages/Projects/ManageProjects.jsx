import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useManagedProjects, useDeleteProject, useUpdateExchangeRate } from "../../../store/tanstackStore/services/queries";
import { STATUS_LABELS, formatMoney, resolveImageUrl } from "../../../data/projectOptions";

const STATUS_STYLES = {
  UPCOMING: "bg-[#dca838]/10 text-[#b8871f]",
  FULLY_FUNDED: "bg-[#22C55E]/10 text-[#16A34A]",
  COMPLETED: "bg-[#78a2a5]/15 text-[#4d7a7d]",
};

const TABS = ["ALL", ...Object.keys(STATUS_LABELS)];

export const ProgressBar = ({ progress }) => (
  <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
    <div
      className="h-full rounded-full bg-[#a57ea9] transition-all"
      style={{ width: `${Math.round((progress || 0) * 100)}%` }}
    />
  </div>
);

const ExchangeRateControl = ({ rate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState("");
  const updateRate = useUpdateExchangeRate();

  const save = async () => {
    try {
      await updateRate.mutateAsync(parseFloat(value));
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update exchange rate.");
    }
  };

  if (!isEditing) {
    return (
      <button
        onClick={() => { setValue(rate ?? ""); setIsEditing(true); }}
        className="flex items-center gap-2 text-xs font-secondary text-gray-500 hover:text-gray-800 transition-colors"
        title="Used to convert USD and UGX donations"
      >
        <Icon icon="ph:arrows-left-right-bold" className="w-4 h-4" />
        1 USD = <strong className="text-gray-800">UGX {rate ? rate.toLocaleString() : "…"}</strong>
        <Icon icon="ph:pencil-simple-bold" className="w-3.5 h-3.5" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs font-secondary text-gray-500">
      1 USD = UGX
      <input
        type="number"
        min="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-24 px-2 py-1 border border-gray-300 rounded-md text-gray-800 outline-none focus:border-[#a57ea9]"
        autoFocus
      />
      <button onClick={save} disabled={updateRate.isPending || !(parseFloat(value) > 0)} className="px-3 py-1 rounded-md bg-[#a57ea9] text-white font-bold disabled:opacity-50">
        {updateRate.isPending ? "Saving..." : "Save"}
      </button>
      <button onClick={() => setIsEditing(false)} className="px-2 py-1 text-gray-500 hover:text-gray-800">Cancel</button>
    </div>
  );
};

const DeleteProjectModal = ({ project, onCancel, onConfirm, isDeleting, error }) => {
  if (!project) return null;
  return (
    <>
      <div className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]" onClick={isDeleting ? undefined : onCancel} />
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-5">
            <Icon icon="ph:trash-bold" className="w-6 h-6 text-[#EF4444]" />
          </div>
          <h2 className="text-lg font-secondary font-bold text-gray-900 mb-2">Delete this project?</h2>
          <p className="text-sm font-secondary text-gray-500 mb-6">
            <strong className="text-gray-800">"{project.title}"</strong> will be permanently removed. This can't be undone.
          </p>
          {error && (
            <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3 mb-6">{error}</p>
          )}
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} disabled={isDeleting} className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
              Cancel
            </button>
            {!error && (
              <button onClick={onConfirm} disabled={isDeleting} className="px-5 py-2.5 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete project"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const ManageProjects = () => {
  const [activeTab, setActiveTab] = useState("ALL");
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const { data, isLoading } = useManagedProjects();
  const deleteProject = useDeleteProject();

  const summary = data?.summary;
  const projects = (data?.projects || []).filter((p) => activeTab === "ALL" || p.status === activeTab);

  const handleDelete = async () => {
    try {
      await deleteProject.mutateAsync(projectToDelete.id);
      setProjectToDelete(null);
    } catch (error) {
      setDeleteError(error.response?.data?.message || "Failed to delete project.");
    }
  };

  const closeDeleteModal = () => {
    setProjectToDelete(null);
    setDeleteError(null);
  };

  const statCards = [
    {
      title: "Total Raised",
      value: formatMoney(summary?.raisedUsd, "USD"),
      subtitle: `≈ ${formatMoney(summary?.raisedUgx, "UGX")} across all projects`,
    },
    {
      title: "Projects",
      value: summary?.totalProjects ?? 0,
      subtitle: `${summary?.upcoming ?? 0} upcoming, ${summary?.completed ?? 0} completed`,
    },
    {
      title: "Fully Funded",
      value: summary?.fullyFunded ?? 0,
      subtitle: "Projects that reached funding.",
    },
    {
      title: "Supporters",
      value: summary?.donorCount ?? 0,
      subtitle: "Unique donors across projects.",
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-2">
        <h1 className="text-xl font-secondary font-bold text-gray-800">Projects</h1>
        <ExchangeRateControl rate={summary?.usdToUgxRate} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-32 justify-center">
            <p className="text-sm font-secondary font-bold text-gray-700 mb-1">{card.title}</p>
            <h3 className="text-3xl font-primary font-bold text-gray-900 mb-1">
              {isLoading ? <span className="inline-block w-16 h-8 bg-gray-100 animate-pulse rounded" /> : card.value}
            </h3>
            <p className="text-xs font-secondary text-gray-400">{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Tabs and Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 pr-4 flex-wrap">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 md:px-8 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors whitespace-nowrap ${
                  activeTab === tab ? "bg-[#78a2a5] text-white" : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab === "ALL" ? "All" : STATUS_LABELS[tab]}
              </button>
            ))}
          </div>
          <Link
            to="/executive/projects/new"
            className="flex items-center gap-2 bg-[#a57ea9] hover:bg-[#916b94] text-white px-5 py-2.5 my-2 rounded-full text-xs font-bold font-secondary transition-colors"
          >
            <Icon icon="ph:plus-bold" className="w-4 h-4" />
            New project
          </Link>
        </div>

        <div className="overflow-x-auto relative min-h-[200px]">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
            </div>
          )}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {["Project", "Status", "Raised", "Goal", "Supporters", ""].map((heading, i) => (
                  <th key={i} className={`py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase ${i === 5 ? "text-right" : ""}`}>
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={resolveImageUrl(project.coverImage)} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 font-secondary truncate max-w-xs">{project.title}</p>
                        <p className="text-xs text-gray-400 font-secondary">
                          {project.subcategory}
                          {!project.isPublished && <span className="ml-2 text-[#EF4444] font-bold">· Hidden</span>}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold font-secondary whitespace-nowrap ${STATUS_STYLES[project.status]}`}>
                      {STATUS_LABELS[project.status]}
                    </span>
                  </td>
                  <td className="py-4 px-6 min-w-[180px]">
                    <p className="text-sm font-bold text-gray-900 font-secondary mb-1.5">{formatMoney(project.raised, project.currency)}</p>
                    {project.goalAmount ? (
                      <ProgressBar progress={project.progress} />
                    ) : null}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">
                    {project.goalAmount ? (
                      <>
                        {formatMoney(project.goalAmount, project.currency)}
                        <span className="block text-xs text-gray-400">{Math.round(project.progress * 100)}% reached</span>
                      </>
                    ) : "No goal set"}
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary">{project.donorCount}</td>
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <Link to={`/executive/projects/${project.id}`} className="bg-brand-lilac/10 text-brand-lilac hover:bg-brand-lilac hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold font-secondary inline-block">
                      Track funds
                    </Link>
                    <Link to={`/executive/projects/edit/${project.id}`} className="ml-2 border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg text-xs font-bold font-secondary inline-block">
                      Edit
                    </Link>
                    <button
                      onClick={() => setProjectToDelete(project)}
                      className="ml-2 border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444] hover:text-white transition-colors px-3 py-2 rounded-lg text-xs font-bold font-secondary inline-block"
                      title="Delete project"
                    >
                      <Icon icon="ph:trash-bold" className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {!isLoading && projects.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-400 font-secondary">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteProjectModal
        project={projectToDelete}
        onCancel={closeDeleteModal}
        onConfirm={handleDelete}
        isDeleting={deleteProject.isPending}
        error={deleteError}
      />
    </div>
  );
};

export default ManageProjects;
