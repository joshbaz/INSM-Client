import React, { useCallback, useEffect, useMemo } from "react";
import { Formik } from "formik";
import { Icon } from "@iconify/react";
import * as Yup from "yup";
import useSEO from "../../../hooks/useSEO";
import { useCreateApplication } from "../../../store/tanstackStore/services/queries";
import ugandaData from "../../../assets/uganda_regions.json";

const CommunityEquipperForm = ({ isOpen, onClose }) => {
  useSEO({
    title: "Become a Community Equipper",
    description:
      "Join the Equipper Network to mobilize grassroots efforts and support single mothers in your community.",
  });
  
  const createApplicationMutation = useCreateApplication();

  const validationSchema = useMemo(
    () =>
      Yup.object({
        fullName: Yup.string().trim().required("Full name is required"),
        phoneNumber: Yup.string().trim().required("Phone number is required"),
        email: Yup.string()
          .trim()
          .email("Invalid email")
          .required("Email is required"),
        region: Yup.string().required("Region is required"),
        district: Yup.string().required("District is required"),
        subCounty: Yup.string().required("Sub-county is required"),
        parish: Yup.string().required("Parish is required"),
        leadershipConnection: Yup.string().required(
          "Please select your connection to leadership",
        ),
      }),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const connectionOptions = [
    { value: "spiritual_leader_wife", label: "Wife of a Spiritual Leader" },
    { value: "regional_leader_wife", label: "Wife of a Regional Leader" },
    { value: "community_leader", label: "Community Leader" },
    { value: "other", label: "Other" },
  ];

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const regions = Object.keys(ugandaData.uganda_regions);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* ── Dark backdrop ── */}
      <div
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* ── Close button — top-right of viewport ── */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] text-brand-white-100 hover:opacity-90 transition-opacity cursor-pointer"
        aria-label="Close modal"
        type="button"
      >
        <Icon icon="heroicons:x-mark" width={24} />
      </button>

      {/* ── Content wrapper ── */}
      <div className="relative z-[105] w-full max-w-[1000px] flex flex-col md:flex-row items-end justify-center gap-6 animate-[modalIn_0.25s_ease-out]">
        {/* ── White card ── */}
        <div className="w-full max-w-[720px] bg-brand-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
          {/* ── Fixed header ── */}
          <div className="px-5 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-brand-dark-200/30 shrink-0">
            <h2 className="text-lg md:text-2xl font-bold font-primary text-brand-dark">
              Join the Equipper Network
            </h2>
            <p className="mt-1 text-xs md:text-sm font-secondary text-brand-dark-400 max-w-sm">
              Mobilising the grassroots to weave one mother’s struggles into a
              collective force.
            </p>
          </div>

          {/* ── Scrollable form body ── */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 md:px-10 py-5 md:py-7">
            <Formik
              initialValues={{
                fullName: "",
                phoneNumber: "",
                email: "",
                region: "",
                district: "",
                subCounty: "",
                parish: "",
                leadershipConnection: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const payload = {
                    applicantName: values.fullName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    region: values.region.toUpperCase(),
                    parish: `${values.parish}, ${values.subCounty}, ${values.district}`,
                    leadershipConnection: values.leadershipConnection,
                    role: "COMMUNITY_EQUIPPER",
                    domain: "MISC"
                  };
                  
                  await createApplicationMutation.mutateAsync(payload);
                  resetForm();
                  onClose();
                } catch (error) {
                  console.error("Failed to submit equipper application:", error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({
                values,
                errors,
                touched,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => {
                // Compute dropdown options
                let districts = [];
                let subCounties = [];
                let parishes = [];

                if (values.region && ugandaData.uganda_regions[values.region]) {
                  districts = ugandaData.uganda_regions[values.region].districts;
                }
                
                const selectedDistrictObj = districts.find(d => d.district === values.district);
                if (selectedDistrictObj) {
                  subCounties = selectedDistrictObj.sub_counties;
                }

                const selectedSubCountyObj = subCounties.find(s => s.sub_county === values.subCounty);
                if (selectedSubCountyObj) {
                  parishes = selectedSubCountyObj.parishes;
                }

                // Handler to clear deeper fields when a higher level changes
                const handleRegionChange = (e) => {
                  handleChange(e);
                  setFieldValue('district', '');
                  setFieldValue('subCounty', '');
                  setFieldValue('parish', '');
                };
                
                const handleDistrictChange = (e) => {
                  handleChange(e);
                  setFieldValue('subCounty', '');
                  setFieldValue('parish', '');
                };
                
                const handleSubCountyChange = (e) => {
                  handleChange(e);
                  setFieldValue('parish', '');
                };

                return (
                  <form onSubmit={handleSubmit}>
                    {/* ── Section: Personal Details ── */}
                    <div className="flex items-center gap-2.5 text-brand-dark-400">
                      <span className="w-5 h-5 grid place-items-center">
                        <Icon icon="heroicons:user" className="w-[18px] h-[18px]" />
                      </span>
                      <span className="text-xs md:text-sm font-primary font-semibold text-brand-dark uppercase tracking-wide">
                        Personal Details
                      </span>
                    </div>
                    <div className="mt-3 h-px bg-brand-dark-200/30" />

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          Full Name
                        </label>
                        <input
                          name="fullName"
                          value={values.fullName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your full name"
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                        />
                        {touched.fullName && errors.fullName && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          Phone number
                        </label>
                        <input
                          name="phoneNumber"
                          value={values.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your mobile number"
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                            {errors.phoneNumber}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          Email Address
                        </label>
                        <input
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="email@email.com"
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark placeholder:text-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all"
                        />
                        {touched.email && errors.email && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ── Section: Regional Context ── */}
                    <div className="mt-8 flex items-center gap-2.5 text-brand-dark-400">
                      <span className="w-5 h-5 grid place-items-center">
                        <Icon icon="heroicons:map-pin" className="w-[18px] h-[18px]" />
                      </span>
                      <span className="text-xs md:text-sm font-primary font-semibold text-brand-dark uppercase tracking-wide">
                        Location Details
                      </span>
                    </div>
                    <div className="mt-3 h-px bg-brand-dark-200/30" />

                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                      {/* Region */}
                      <div>
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          Region
                        </label>
                        <div className="relative">
                          <select
                            name="region"
                            value={values.region}
                            onChange={handleRegionChange}
                            onBlur={handleBlur}
                            className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark appearance-none focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all cursor-pointer"
                          >
                            <option value="" disabled>Select Region</option>
                            {regions.map((reg) => (
                              <option key={reg} value={reg}>{capitalize(reg)}</option>
                            ))}
                          </select>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                            <Icon icon="ph:caret-down-bold" className="h-4 w-4" />
                          </span>
                        </div>
                        {touched.region && errors.region && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">{errors.region}</p>
                        )}
                      </div>

                      {/* District */}
                      <div>
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          District
                        </label>
                        <div className="relative">
                          <select
                            name="district"
                            value={values.district}
                            onChange={handleDistrictChange}
                            onBlur={handleBlur}
                            disabled={!values.region}
                            className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark appearance-none focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="" disabled>Select District</option>
                            {districts.map((d) => (
                              <option key={d.district} value={d.district}>{d.district}</option>
                            ))}
                          </select>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                            <Icon icon="ph:caret-down-bold" className="h-4 w-4" />
                          </span>
                        </div>
                        {touched.district && errors.district && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">{errors.district}</p>
                        )}
                      </div>

                      {/* Sub-county */}
                      <div>
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          Sub-county / Division
                        </label>
                        <div className="relative">
                          <select
                            name="subCounty"
                            value={values.subCounty}
                            onChange={handleSubCountyChange}
                            onBlur={handleBlur}
                            disabled={!values.district}
                            className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark appearance-none focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="" disabled>Select Sub-county</option>
                            {subCounties.map((s) => (
                              <option key={s.sub_county} value={s.sub_county}>{s.sub_county}</option>
                            ))}
                          </select>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                            <Icon icon="ph:caret-down-bold" className="h-4 w-4" />
                          </span>
                        </div>
                        {touched.subCounty && errors.subCounty && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">{errors.subCounty}</p>
                        )}
                      </div>

                      {/* Parish */}
                      <div>
                        <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                          Parish
                        </label>
                        <div className="relative">
                          <select
                            name="parish"
                            value={values.parish}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            disabled={!values.subCounty}
                            className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark appearance-none focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <option value="" disabled>Select Parish</option>
                            {parishes.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                            <Icon icon="ph:caret-down-bold" className="h-4 w-4" />
                          </span>
                        </div>
                        {touched.parish && errors.parish && (
                          <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">{errors.parish}</p>
                        )}
                      </div>
                    </div>

                    {/* ── Section: Leadership Context ── */}
                    <div className="mt-8 flex items-center gap-2.5 text-brand-dark-400">
                      <span className="w-5 h-5 grid place-items-center">
                        <Icon icon="heroicons:users" className="w-[18px] h-[18px]" />
                      </span>
                      <span className="text-xs md:text-sm font-primary font-semibold text-brand-dark uppercase tracking-wide">
                        Leadership Context
                      </span>
                    </div>
                    <div className="mt-3 h-px bg-brand-dark-200/30" />

                    <div className="mt-5">
                      <label className="block text-xs font-primary font-semibold text-brand-dark mb-1.5">
                        Connection to Leadership
                      </label>
                      <div className="relative">
                        <select
                          name="leadershipConnection"
                          value={values.leadershipConnection}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full rounded-lg border border-brand-dark-200/60 bg-brand-white-100/30 px-4 py-2.5 text-sm font-secondary text-brand-dark appearance-none focus:outline-none focus:ring-2 focus:ring-brand-lilac/40 focus:border-brand-lilac transition-all cursor-pointer"
                        >
                          <option value="" disabled>Select your current role/context</option>
                          {connectionOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-dark-300 pointer-events-none">
                          <Icon icon="ph:caret-down-bold" className="h-4 w-4" />
                        </span>
                      </div>
                      {touched.leadershipConnection && errors.leadershipConnection && (
                        <p className="mt-1.5 text-xs font-secondary text-brand-pink-700 font-medium">
                          {errors.leadershipConnection}
                        </p>
                      )}
                    </div>

                    {/* ── Submit ── */}
                    <div className="mt-10 flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-brand-lilac hover:bg-brand-lilac/90 active:scale-[0.97] text-brand-white font-primary font-semibold text-xs md:text-sm tracking-widest uppercase px-10 py-3.5 rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-brand-lilac/25 hover:shadow-lg hover:shadow-brand-lilac/30"
                      >
                        {isSubmitting ? "SUBMITTING..." : "SUBMIT FORM"}
                      </button>
                    </div>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>

        {/* ── Security links (Sidebar) ── */}
        <div className="hidden md:flex flex-col items-end gap-2 pb-2 shrink-0">
          <p className="flex items-center gap-2 text-sm text-brand-white-100/70 hover:text-brand-white-100/90 hover:underline transition-all cursor-help whitespace-nowrap">
            Is my information secure
            <span className="w-5 h-5 rounded-full bg-brand-white-100/30 text-brand-white-100 grid place-items-center">
              <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
            </span>
          </p>
          <p className="flex items-center gap-2 text-sm text-brand-white-100/70 hover:text-brand-white-100/90 hover:underline transition-all cursor-help whitespace-nowrap">
            Can I delete my form details
            <span className="w-5 h-5 rounded-full bg-brand-white-100/30 text-brand-white-100 grid place-items-center">
              <Icon icon="ph:question-mark-bold" className="w-3 h-3" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityEquipperForm;
