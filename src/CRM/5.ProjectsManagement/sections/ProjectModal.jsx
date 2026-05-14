import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const ProjectModal = ({ isOpen, onClose, onSave, project = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "Upcoming",
    location: "",
    capitalRaised: "$ 0",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        category: project.category || "",
        status: project.status || "Upcoming",
        location: project.location || "",
        capitalRaised: project.capitalRaised || "$ 0",
        image: project.image || "",
        description: project.description || "",
      });
    } else {
      setFormData({
        title: "",
        category: "",
        status: "Upcoming",
        location: "",
        capitalRaised: "$ 0",
        image: "",
        description: "",
      });
    }
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-dark-900/50 backdrop-blur-sm p-4">
      <div className="bg-brand-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-brand-dark-200/20 flex items-center justify-between bg-brand-white-100">
          <h3 className="text-xl font-primary font-bold text-brand-dark">
            {project ? "Edit Project" : "Add New Project"}
          </h3>
          <button onClick={onClose} className="p-2 text-brand-dark-400 hover:text-brand-dark transition-colors">
            <Icon icon="heroicons:x-mark" className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto grow no-scrollbar">
          <form id="project-form" onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <div className="space-y-1">
                <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Project Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent" placeholder="e.g. Commercial Tailoring Hub" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Category</label>
                <input required type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent" placeholder="e.g. Community Programs" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent">
                  <option value="Upcoming">Upcoming</option>
                  <option value="Active">Active</option>
                  <option value="Fully Funded">Fully Funded</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Location</label>
                <input required type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent" placeholder="e.g. Nakawa Division" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Capital Raised</label>
                <input required type="text" name="capitalRaised" value={formData.capitalRaised} onChange={handleChange} className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent" placeholder="e.g. $ 21,400" />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent" placeholder="https://..." />
              </div>

            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold font-primary text-brand-dark uppercase tracking-widest">Short Description</label>
              <textarea required name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border border-brand-dark-200/30 rounded-lg px-4 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-gold bg-transparent" placeholder="Briefly describe the project..." />
            </div>

          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-brand-dark-200/20 bg-brand-white-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-5 py-2 text-sm font-bold text-brand-dark-400 hover:text-brand-dark transition-colors uppercase tracking-wider">
            Cancel
          </button>
          <button form="project-form" type="submit" className="px-6 py-2 bg-brand-gold text-brand-navy-900 font-bold text-sm rounded-lg hover:bg-brand-gold-400 transition-colors uppercase tracking-wider">
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
