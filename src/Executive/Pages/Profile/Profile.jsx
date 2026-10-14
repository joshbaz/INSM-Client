import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from "../../../store/context/AuthContext";
import { useUpdateProfile, useChangePassword, useUploadPhoto } from "../../../store/tanstackStore/services/queries";
import UserAvatar from "../../components/UserAvatar";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-secondary text-gray-800 outline-none focus:border-[#a57ea9] bg-white disabled:bg-gray-50";
const labelClass = "block text-xs font-bold font-secondary text-gray-600 uppercase tracking-wider mb-2";

const Notice = ({ notice }) =>
  notice ? (
    <p className={`text-sm font-secondary rounded-lg p-3 ${notice.type === "error" ? "text-[#EF4444] bg-[#EF4444]/5" : "text-[#16A34A] bg-[#22C55E]/10"}`}>
      {notice.text}
    </p>
  ) : null;

const Card = ({ title, description, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
    <h2 className="text-base font-secondary font-bold text-gray-800">{title}</h2>
    {description && <p className="text-sm font-secondary text-gray-500 mt-1">{description}</p>}
    <div className="mt-6">{children}</div>
  </div>
);

const ProfileHeader = ({ user, onAvatarChange, isSaving }) => {
  const uploadPhoto = useUploadPhoto();

  const handleFile = async (file) => {
    try {
      const photo = await uploadPhoto.mutateAsync({ file, caption: `${user.name || user.email} profile photo` });
      await onAvatarChange(`/photos/${photo.id}/view`);
    } catch (err) {
      console.error("Profile photo upload failed", err);
      alert("Failed to upload photo.");
    }
  };

  const busy = uploadPhoto.isPending || isSaving;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-center gap-6">
      <div className="relative">
        <UserAvatar user={user} size={96} />
        {busy && (
          <span className="absolute inset-0 rounded-full bg-white/70 flex items-center justify-center">
            <Icon icon="ph:spinner-gap-bold" className="w-6 h-6 text-brand-lilac animate-spin" />
          </span>
        )}
      </div>
      <div className="flex-1 text-center sm:text-left">
        <h1 className="text-xl font-secondary font-bold text-gray-900">{user.name || "Unnamed administrator"}</h1>
        <p className="text-sm font-secondary text-gray-500">{user.jobTitle || "No job title"} · {user.email}</p>
        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#a57ea9]/10 text-[#916b94] tracking-wider">{user.role}</span>
          {user.createdAt && (
            <span className="text-xs font-secondary text-gray-400">
              Member since {new Date(user.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long" })}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <label className={`px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 ${busy ? "opacity-50 pointer-events-none" : ""}`}>
          <Icon icon="ph:camera-bold" /> {user.avatar ? "Change photo" : "Add photo"}
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
        </label>
        {user.avatar && (
          <button
            onClick={() => onAvatarChange("")}
            disabled={busy}
            className="px-4 py-2.5 rounded-full border border-[#EF4444]/40 text-[#EF4444] hover:bg-[#EF4444]/5 text-xs font-bold font-secondary tracking-wider uppercase transition-colors disabled:opacity-50"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

const DetailsForm = ({ user, onSaved }) => {
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    jobTitle: user.jobTitle || "",
  });
  const [notice, setNotice] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  const isDirty = Object.keys(form).some((key) => form[key] !== (user[key] || ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice(null);
    try {
      const updated = await updateProfile.mutateAsync(form);
      onSaved(updated);
      setNotice({ type: "success", text: "Profile updated." });
    } catch (err) {
      setNotice({ type: "error", text: err.response?.data?.message || "Failed to update profile." });
    }
  };

  return (
    <Card title="Personal details" description="Shown to other administrators in Settings → Team.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full name</label>
            <input className={inputClass} value={form.name} onChange={set("name")} />
          </div>
          <div>
            <label className={labelClass}>Job title</label>
            <input className={inputClass} value={form.jobTitle} onChange={set("jobTitle")} placeholder="e.g. Executive Director" />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" className={inputClass} value={form.email} onChange={set("email")} />
            <p className="text-xs font-secondary text-gray-400 mt-1.5">Used to sign in.</p>
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={form.phone} onChange={set("phone")} placeholder="+256 ..." />
          </div>
        </div>
        <Notice notice={notice} />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isDirty || updateProfile.isPending}
            className="px-6 py-2.5 rounded-full bg-[#a57ea9] hover:bg-[#916b94] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {updateProfile.isPending ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </Card>
  );
};

const PasswordForm = () => {
  const changePassword = useChangePassword();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice(null);
    if (form.newPassword.length < 8) {
      setNotice({ type: "error", text: "New password must be at least 8 characters." });
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setNotice({ type: "error", text: "New passwords don't match." });
      return;
    }
    try {
      await changePassword.mutateAsync({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setNotice({ type: "success", text: "Password changed." });
    } catch (err) {
      setNotice({ type: "error", text: err.response?.data?.message || "Failed to change password." });
    }
  };

  const type = show ? "text" : "password";

  return (
    <Card title="Password" description="Use at least 8 characters. If an administrator created your account, change the temporary password here.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className={labelClass}>Current password</label>
            <input type={type} autoComplete="current-password" className={inputClass} value={form.currentPassword} onChange={set("currentPassword")} />
          </div>
          <div>
            <label className={labelClass}>New password</label>
            <input type={type} autoComplete="new-password" className={inputClass} value={form.newPassword} onChange={set("newPassword")} />
          </div>
          <div>
            <label className={labelClass}>Confirm new password</label>
            <input type={type} autoComplete="new-password" className={inputClass} value={form.confirmPassword} onChange={set("confirmPassword")} />
          </div>
        </div>
        <Notice notice={notice} />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-secondary text-gray-600 cursor-pointer">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} className="accent-[#a57ea9]" />
            Show passwords
          </label>
          <button
            type="submit"
            disabled={!form.currentPassword || !form.newPassword || changePassword.isPending}
            className="px-6 py-2.5 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50"
          >
            {changePassword.isPending ? "Updating..." : "Change password"}
          </button>
        </div>
      </form>
    </Card>
  );
};

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const updateProfile = useUpdateProfile();

  if (!user) return null;

  const handleAvatarChange = async (avatar) => {
    try {
      updateUser(await updateProfile.mutateAsync({ avatar }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update profile photo.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <ProfileHeader user={user} onAvatarChange={handleAvatarChange} isSaving={updateProfile.isPending} />
      {/* Keyed so the form picks up changes saved elsewhere (e.g. a new email) */}
      <DetailsForm key={`${user.email}-${user.name}`} user={user} onSaved={updateUser} />
      <PasswordForm />
      <div className="flex justify-end">
        <button
          onClick={() => logout("/executive/login")}
          className="flex items-center gap-2 text-sm font-bold font-secondary text-gray-500 hover:text-[#EF4444] transition-colors"
        >
          <Icon icon="ph:sign-out-bold" /> Sign out
        </button>
      </div>
    </div>
  );
};

export default Profile;
