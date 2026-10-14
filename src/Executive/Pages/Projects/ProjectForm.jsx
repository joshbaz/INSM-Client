import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import {
  useManagedProject, useCreateProject, useUpdateProject, useUploadPhoto,
} from "../../../store/tanstackStore/services/queries";
import { CATEGORY_STRUCTURE, STATUS_LABELS, CURRENCIES, resolveImageUrl } from "../../../data/projectOptions";

const EMPTY_PROJECT = {
  title: "",
  description: "",
  category: "Community Programs",
  subcategory: CATEGORY_STRUCTURE["Community Programs"][0],
  status: "UPCOMING",
  location: "",
  story: "",
  extendedStory: "",
  coverImage: "",
  storyImage: "",
  galleryImages: [],
  mothersEmpowered: 0,
  saccosFunded: 0,
  openingCapitalDeployed: 0,
  currency: "USD",
  goalAmount: "",
  openingBalance: 0,
  isPublished: true,
};

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#a57ea9] bg-white";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const Field = ({ label, hint, children }) => (
  <div>
    <label className={labelClass}>{label}</label>
    {children}
    {hint && <p className="text-xs font-secondary text-gray-400 mt-1.5">{hint}</p>}
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
    <h2 className="text-base font-secondary font-bold text-gray-800 mb-6">{title}</h2>
    <div className="space-y-5">{children}</div>
  </div>
);

const ImagePicker = ({ url, onUpload, onRemove, isUploading, label = "Upload image", badge, action }) => (
  <div className="relative w-full aspect-video rounded-lg border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
    {url ? (
      <>
        <img src={resolveImageUrl(url)} alt="" className="w-full h-full object-cover" />
        {badge && (
          <span className="absolute top-2 left-2 bg-[#a57ea9] text-white text-[10px] font-bold font-secondary px-1.5 py-0.5 rounded uppercase">
            {badge}
          </span>
        )}
        {action && (
          <button
            type="button"
            onClick={action.onClick}
            className="absolute bottom-2 left-2 bg-white/90 hover:bg-white text-gray-700 text-[10px] font-bold font-secondary px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            {action.label}
          </button>
        )}
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 text-[#EF4444] flex items-center justify-center shadow hover:bg-white"
          title="Remove image"
        >
          <Icon icon="ph:x-bold" className="w-4 h-4" />
        </button>
      </>
    ) : (
      <label className="flex flex-col items-center gap-2 cursor-pointer text-gray-400 hover:text-gray-600 w-full h-full justify-center">
        {isUploading ? (
          <Icon icon="ph:spinner-gap-bold" className="w-7 h-7 animate-spin" />
        ) : (
          <>
            <Icon icon="ph:image-square-duotone" className="w-8 h-8" />
            <span className="text-xs font-bold font-secondary">{label}</span>
          </>
        )}
        <input type="file" accept="image/*" className="hidden" disabled={isUploading} onChange={(e) => e.target.files[0] && onUpload(e.target.files[0])} />
      </label>
    )}
  </div>
);

const ProjectFormFields = ({ initial, isEdit, projectId }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [uploading, setUploading] = useState(null);
  const [error, setError] = useState(null);

  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const uploadPhoto = useUploadPhoto();
  const isSaving = createProject.isPending || updateProject.isPending;

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const setCategory = (e) => {
    const category = e.target.value;
    setForm((prev) => ({ ...prev, category, subcategory: CATEGORY_STRUCTURE[category][0] }));
  };

  const upload = async (file, slot) => {
    setUploading(slot);
    try {
      const photo = await uploadPhoto.mutateAsync({ file, caption: `${form.title || "Project"} image` });
      return `/photos/${photo.id}/view`;
    } catch (err) {
      console.error("Image upload failed", err);
      alert("Failed to upload image.");
      return null;
    } finally {
      setUploading(null);
    }
  };

  const uploadInto = (field) => async (file) => {
    const url = await upload(file, field);
    if (url) setForm((prev) => ({ ...prev, [field]: url }));
  };

  const addGalleryImage = async (file) => {
    const url = await upload(file, "gallery");
    if (url) setForm((prev) => ({ ...prev, galleryImages: [...prev.galleryImages, url] }));
  };

  const moveGalleryImageFirst = (index) =>
    setForm((prev) => {
      const images = [...prev.galleryImages];
      const [image] = images.splice(index, 1);
      return { ...prev, galleryImages: [image, ...images] };
    });

  const removeGalleryImage = (index) =>
    setForm((prev) => ({ ...prev, galleryImages: prev.galleryImages.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and short description are required.");
      return;
    }
    try {
      if (isEdit) {
        await updateProject.mutateAsync({ id: projectId, ...form });
        navigate(`/executive/projects/${projectId}`);
      } else {
        const created = await createProject.mutateAsync(form);
        navigate(`/executive/projects/${created.id}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to={isEdit ? `/executive/projects/${projectId}` : "/executive/projects"} className="p-2 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors">
            <Icon icon="ph:arrow-left-bold" className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-secondary font-bold text-gray-800">{isEdit ? "Edit project" : "New project"}</h1>
        </div>
        <button
          type="submit"
          disabled={isSaving || !!uploading}
          className="px-6 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50"
        >
          {isSaving ? "Saving..." : isEdit ? "Save changes" : "Create project"}
        </button>
      </div>

      {error && <p className="text-sm font-secondary text-[#EF4444] bg-[#EF4444]/5 rounded-lg p-3">{error}</p>}

      <Section title="Basics">
        <Field label="Title">
          <input className={inputClass} value={form.title} onChange={set("title")} placeholder="e.g. Commercial Tailoring Hub" />
        </Field>
        <Field label="Short description" hint="Shown on the project card in the projects list.">
          <textarea className={inputClass} rows={2} value={form.description} onChange={set("description")} />
        </Field>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Category">
            <select className={inputClass} value={form.category} onChange={setCategory}>
              {Object.keys(CATEGORY_STRUCTURE).map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Subcategory">
            <select className={inputClass} value={form.subcategory} onChange={set("subcategory")}>
              {CATEGORY_STRUCTURE[form.category].map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className={inputClass} value={form.status} onChange={set("status")}>
              {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </Field>
          <Field label="Location" hint={'Shown as "<title> along <location>".'}>
            <input className={inputClass} value={form.location || ""} onChange={set("location")} placeholder="e.g. Nakawa Division" />
          </Field>
        </div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={form.isPublished} onChange={set("isPublished")} className="w-4 h-4 accent-[#a57ea9]" />
          <span className="text-sm font-secondary font-bold text-gray-800">Show this project on the website</span>
        </label>
      </Section>

      <Section title="Funding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Currency" hint="Goal and totals are tracked in this currency.">
            <select className={inputClass} value={form.currency} onChange={set("currency")}>
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Funding goal" hint="Leave empty for no goal.">
            <input type="number" min="0" className={inputClass} value={form.goalAmount ?? ""} onChange={set("goalAmount")} />
          </Field>
          <Field label="Opening balance" hint="Money raised before online tracking started.">
            <input type="number" min="0" className={inputClass} value={form.openingBalance} onChange={set("openingBalance")} />
          </Field>
        </div>
      </Section>

      <Section title="Story">
        <Field label="Project story" hint="Separate paragraphs with a blank line.">
          <textarea className={inputClass} rows={6} value={form.story || ""} onChange={set("story")} />
        </Field>
        <Field label="Extended story" hint="Optional second section, shown below the impact stats.">
          <textarea className={inputClass} rows={5} value={form.extendedStory || ""} onChange={set("extendedStory")} />
        </Field>
      </Section>

      <Section title="Opening impact figures">
        <p className="text-xs font-secondary text-gray-400 -mt-3">
          Impact achieved before the impact log. Entries you add with "Record impact" are added on top of these.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Field label="Mothers supported">
            <input type="number" min="0" className={inputClass} value={form.mothersEmpowered} onChange={set("mothersEmpowered")} />
          </Field>
          <Field label="SACCOs funded">
            <input type="number" min="0" className={inputClass} value={form.saccosFunded} onChange={set("saccosFunded")} />
          </Field>
          <Field label={`Capital deployed (${form.currency})`}>
            <input type="number" min="0" step="any" className={inputClass} value={form.openingCapitalDeployed} onChange={set("openingCapitalDeployed")} />
          </Field>
        </div>
      </Section>

      <Section title="Images">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Cover image" hint="Top of the project page and on the project card.">
            <ImagePicker url={form.coverImage} isUploading={uploading === "coverImage"} onUpload={uploadInto("coverImage")} onRemove={() => setForm((p) => ({ ...p, coverImage: "" }))} />
          </Field>
          <Field label="Extended story image" hint="Shown with the extended story.">
            <ImagePicker url={form.storyImage} isUploading={uploading === "storyImage"} onUpload={uploadInto("storyImage")} onRemove={() => setForm((p) => ({ ...p, storyImage: "" }))} />
          </Field>
        </div>
        <Field label="Gallery" hint='The first image is shown under the project story; the rest appear in the Gallery section of the project page. Hover an image and click "Use under story" to swap.'>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {form.galleryImages.map((url, i) => (
              <ImagePicker
                key={url + i}
                url={url}
                onRemove={() => removeGalleryImage(i)}
                badge={i === 0 ? "Under story" : "Gallery"}
                action={i === 0 ? null : { label: "Use under story", onClick: () => moveGalleryImageFirst(i) }}
              />
            ))}
            <ImagePicker isUploading={uploading === "gallery"} onUpload={addGalleryImage} label="Add image" />
          </div>
        </Field>
      </Section>
    </form>
  );
};

const ProjectForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const { data: project, isLoading } = useManagedProject(id);

  if (isEdit && isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
      </div>
    );
  }

  if (isEdit && !project) {
    return <p className="text-center py-20 text-gray-500 font-secondary">Project not found.</p>;
  }

  const initial = isEdit
    ? Object.fromEntries(Object.keys(EMPTY_PROJECT).map((key) => [key, project[key] ?? EMPTY_PROJECT[key]]))
    : EMPTY_PROJECT;

  // Keyed so the form re-initialises if a different project is opened
  return <ProjectFormFields key={id || "new"} initial={initial} isEdit={isEdit} projectId={id} />;
};

export default ProjectForm;
