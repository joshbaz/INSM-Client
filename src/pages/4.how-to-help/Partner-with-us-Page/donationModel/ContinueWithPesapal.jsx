import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useInitiatePayment, usePublicExchangeRate } from "../../../../store/tanstackStore/services/queries";

/**
 * PesaPal payment form view.
 * Integrates with back-end to submit transaction request and redirect to PesaPal gateway.
 *
 * @param {{ amount: string, currency?: "USD" | "UGX", tier: any, frequency: string, onBack: Function, projectId?: string, programId?: string }} props
 *   `currency` is the currency `amount` is given in (defaults to USD); the form starts in it.
 */
const FALLBACK_USD_TO_UGX = 3700;

const COUNTRY_CODES = [
  { code: "+256", label: "Uganda" },
  { code: "+254", label: "Kenya" },
  { code: "+255", label: "Tanzania" },
  { code: "+250", label: "Rwanda" },
  { code: "+257", label: "Burundi" },
  { code: "+211", label: "South Sudan" },
  { code: "+234", label: "Nigeria" },
  { code: "+233", label: "Ghana" },
  { code: "+27", label: "South Africa" },
  { code: "+251", label: "Ethiopia" },
  { code: "+252", label: "Somalia" },
  { code: "+253", label: "Djibouti" },
  { code: "+258", label: "Mozambique" },
  { code: "+260", label: "Zambia" },
  { code: "+261", label: "Madagascar" },
  { code: "+263", label: "Zimbabwe" },
  { code: "+264", label: "Namibia" },
  { code: "+265", label: "Malawi" },
  { code: "+266", label: "Lesotho" },
  { code: "+267", label: "Botswana" },
  { code: "+268", label: "Eswatini" },
  { code: "+269", label: "Comoros" },
  { code: "+20", label: "Egypt" },
  { code: "+212", label: "Morocco" },
  { code: "+213", label: "Algeria" },
  { code: "+216", label: "Tunisia" },
  { code: "+218", label: "Libya" },
  { code: "+220", label: "Gambia" },
  { code: "+221", label: "Senegal" },
  { code: "+222", label: "Mauritania" },
  { code: "+223", label: "Mali" },
  { code: "+224", label: "Guinea" },
  { code: "+225", label: "Cote d'Ivoire" },
  { code: "+226", label: "Burkina Faso" },
  { code: "+227", label: "Niger" },
  { code: "+228", label: "Togo" },
  { code: "+229", label: "Benin" },
  { code: "+231", label: "Liberia" },
  { code: "+232", label: "Sierra Leone" },
  { code: "+235", label: "Chad" },
  { code: "+236", label: "Central African Rep." },
  { code: "+237", label: "Cameroon" },
  { code: "+238", label: "Cape Verde" },
  { code: "+239", label: "Sao Tome and Principe" },
  { code: "+240", label: "Equatorial Guinea" },
  { code: "+241", label: "Gabon" },
  { code: "+242", label: "Congo" },
  { code: "+243", label: "DR Congo" },
  { code: "+244", label: "Angola" },
  { code: "+245", label: "Guinea-Bissau" },
  { code: "+248", label: "Seychelles" },
  { code: "+249", label: "Sudan" },
  { code: "+290", label: "Saint Helena" },
  { code: "+291", label: "Eritrea" },
  { code: "+1", label: "United States" },
  { code: "+1", label: "Canada" },
  { code: "+44", label: "United Kingdom" },
  { code: "+30", label: "Greece" },
  { code: "+31", label: "Netherlands" },
  { code: "+32", label: "Belgium" },
  { code: "+33", label: "France" },
  { code: "+34", label: "Spain" },
  { code: "+36", label: "Hungary" },
  { code: "+39", label: "Italy" },
  { code: "+40", label: "Romania" },
  { code: "+41", label: "Switzerland" },
  { code: "+43", label: "Austria" },
  { code: "+45", label: "Denmark" },
  { code: "+46", label: "Sweden" },
  { code: "+47", label: "Norway" },
  { code: "+48", label: "Poland" },
  { code: "+49", label: "Germany" },
  { code: "+350", label: "Gibraltar" },
  { code: "+351", label: "Portugal" },
  { code: "+352", label: "Luxembourg" },
  { code: "+353", label: "Ireland" },
  { code: "+354", label: "Iceland" },
  { code: "+355", label: "Albania" },
  { code: "+356", label: "Malta" },
  { code: "+357", label: "Cyprus" },
  { code: "+358", label: "Finland" },
  { code: "+359", label: "Bulgaria" },
  { code: "+370", label: "Lithuania" },
  { code: "+371", label: "Latvia" },
  { code: "+372", label: "Estonia" },
  { code: "+373", label: "Moldova" },
  { code: "+374", label: "Armenia" },
  { code: "+375", label: "Belarus" },
  { code: "+376", label: "Andorra" },
  { code: "+377", label: "Monaco" },
  { code: "+378", label: "San Marino" },
  { code: "+380", label: "Ukraine" },
  { code: "+381", label: "Serbia" },
  { code: "+382", label: "Montenegro" },
  { code: "+383", label: "Kosovo" },
  { code: "+385", label: "Croatia" },
  { code: "+386", label: "Slovenia" },
  { code: "+387", label: "Bosnia and Herzegovina" },
  { code: "+389", label: "North Macedonia" },
  { code: "+420", label: "Czech Republic" },
  { code: "+421", label: "Slovakia" },
  { code: "+852", label: "Hong Kong" },
  { code: "+853", label: "Macau" },
  { code: "+855", label: "Cambodia" },
  { code: "+856", label: "Laos" },
  { code: "+880", label: "Bangladesh" },
  { code: "+886", label: "Taiwan" },
  { code: "+90", label: "Turkey" },
  { code: "+91", label: "India" },
  { code: "+92", label: "Pakistan" },
  { code: "+93", label: "Afghanistan" },
  { code: "+94", label: "Sri Lanka" },
  { code: "+95", label: "Myanmar" },
  { code: "+98", label: "Iran" },
  { code: "+210", label: "Mauritius" },
  { code: "+297", label: "Aruba" },
  { code: "+298", label: "Faroe Islands" },
  { code: "+299", label: "Greenland" },
  { code: "+501", label: "Belize" },
  { code: "+502", label: "Guatemala" },
  { code: "+503", label: "El Salvador" },
  { code: "+504", label: "Honduras" },
  { code: "+505", label: "Nicaragua" },
  { code: "+506", label: "Costa Rica" },
  { code: "+507", label: "Panama" },
  { code: "+509", label: "Haiti" },
  { code: "+51", label: "Peru" },
  { code: "+52", label: "Mexico" },
  { code: "+53", label: "Cuba" },
  { code: "+54", label: "Argentina" },
  { code: "+55", label: "Brazil" },
  { code: "+56", label: "Chile" },
  { code: "+57", label: "Colombia" },
  { code: "+58", label: "Venezuela" },
  { code: "+590", label: "Guadeloupe" },
  { code: "+591", label: "Bolivia" },
  { code: "+592", label: "Guyana" },
  { code: "+593", label: "Ecuador" },
  { code: "+594", label: "French Guiana" },
  { code: "+595", label: "Paraguay" },
  { code: "+597", label: "Suriname" },
  { code: "+598", label: "Uruguay" },
  { code: "+60", label: "Malaysia" },
  { code: "+61", label: "Australia" },
  { code: "+62", label: "Indonesia" },
  { code: "+63", label: "Philippines" },
  { code: "+64", label: "New Zealand" },
  { code: "+65", label: "Singapore" },
  { code: "+66", label: "Thailand" },
  { code: "+670", label: "Timor-Leste" },
  { code: "+672", label: "Norfolk Island" },
  { code: "+673", label: "Brunei" },
  { code: "+674", label: "Nauru" },
  { code: "+675", label: "Papua New Guinea" },
  { code: "+676", label: "Tonga" },
  { code: "+677", label: "Solomon Islands" },
  { code: "+678", label: "Vanuatu" },
  { code: "+679", label: "Fiji" },
  { code: "+680", label: "Palau" },
  { code: "+681", label: "Wallis and Futuna" },
  { code: "+682", label: "Cook Islands" },
  { code: "+683", label: "Niue" },
  { code: "+685", label: "Samoa" },
  { code: "+686", label: "Kiribati" },
  { code: "+687", label: "New Caledonia" },
  { code: "+688", label: "Tuvalu" },
  { code: "+689", label: "French Polynesia" },
  { code: "+690", label: "Tokelau" },
  { code: "+691", label: "Micronesia" },
  { code: "+692", label: "Marshall Islands" },
  { code: "+81", label: "Japan" },
  { code: "+82", label: "South Korea" },
  { code: "+84", label: "Vietnam" },
  { code: "+86", label: "China" },
  { code: "+870", label: "Satellite" },
  { code: "+880", label: "Bangladesh" },
  { code: "+90", label: "Turkey" },
  { code: "+91", label: "India" },
  { code: "+92", label: "Pakistan" },
  { code: "+93", label: "Afghanistan" },
  { code: "+94", label: "Sri Lanka" },
  { code: "+95", label: "Myanmar" },
  { code: "+960", label: "Maldives" },
  { code: "+961", label: "Lebanon" },
  { code: "+962", label: "Jordan" },
  { code: "+963", label: "Syria" },
  { code: "+964", label: "Iraq" },
  { code: "+965", label: "Kuwait" },
  { code: "+966", label: "Saudi Arabia" },
  { code: "+967", label: "Yemen" },
  { code: "+968", label: "Oman" },
  { code: "+970", label: "Palestine" },
  { code: "+971", label: "United Arab Emirates" },
  { code: "+972", label: "Israel" },
  { code: "+973", label: "Bahrain" },
  { code: "+974", label: "Qatar" },
  { code: "+975", label: "Bhutan" },
  { code: "+976", label: "Mongolia" },
  { code: "+977", label: "Nepal" },
  { code: "+98", label: "Iran" },
  { code: "+992", label: "Tajikistan" },
  { code: "+993", label: "Turkmenistan" },
  { code: "+994", label: "Azerbaijan" },
  { code: "+995", label: "Georgia" },
  { code: "+996", label: "Kyrgyzstan" },
  { code: "+998", label: "Uzbekistan" },
];

const ContinueWithPesapal = ({ amount, currency: baseCurrency = "USD", tier, frequency, onBack, projectId, programId }) => {
  const [submitError, setSubmitError] = useState(null);
  const initiatePaymentMutation = useInitiatePayment();
  const { data: rateData } = usePublicExchangeRate();
  const usdToUgx = rateData?.usdToUgxRate || FALLBACK_USD_TO_UGX;
  const baseAmount = parseFloat(String(amount).replace(/,/g, ""));
  const [displayAmount, setDisplayAmount] = useState(baseAmount);

  // Amount in the chosen currency, converted from the currency it was offered in
  const amountIn = (currency) => {
    const base = baseAmount;
    if (currency === baseCurrency) return base;
    return currency === "UGX" ? Math.round(base * usdToUgx) : Math.round((base / usdToUgx) * 100) / 100;
  };

  const steps = [
    { num: 1, label: "Enter Details", active: true },
    { num: 2, label: "Make Payment", active: false },
    { num: 3, label: "Confirmation", active: false },
  ];

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^\d{7,15}$/, "Invalid phone number format")
      .required("Phone number is required"),
    countryCode: Yup.string().required("Country code is required"),
    currency: Yup.string().required("Currency is required"),
  });

  return (
    <>
      {/* ── Header ── */}
      <div className="px-6 md:px-10 pt-6 md:pt-8 pb-4 md:pb-5 border-b border-brand-dark-200/30 shrink-0 bg-brand-white flex items-center justify-between">
         <button
          onClick={onBack}
          type="button"
          className="text-sm font-semibold text-brand-dark-300 hover:text-brand-lilac/90 flex items-center gap-1.5 cursor-pointer transition-colors"
        >
          <Icon icon="heroicons:arrow-left" className="w-4 h-4" />
          Back
         </button>

         <span className="text-xl font-bold tracking-tight">
           <span className="text-[#0056B3]">pesa</span>
           <span className="text-[#DC3545]">pal</span>
         </span>
      </div>

      {/* ── Form Body ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain px-6 md:px-10 py-6 md:py-8">
        {/* Stepper */}
        <div className="flex items-center justify-between relative mb-8">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-brand-dark-200 -z-10" />
          <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-[#DC3545] -z-10" />

          {steps.map((s) => (
            <div
              key={s.num}
              className="flex flex-col items-center bg-brand-white px-2"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1
                    ${
                      s.active
                        ? "bg-[#DC3545] text-brand-white-100"
                        : "bg-brand-dark-200 text-brand-dark-400"
                    }`}
              >
                {s.num}
              </div>
              <span
                className={`text-xs ${s.active ? "text-brand-dark font-semibold" : "text-brand-dark-300"}`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {submitError && (
          <div className="mb-5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <Icon icon="ph:warning-octagon-bold" className="w-5 h-5 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Form */}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            countryCode: "+256",
            currency: baseCurrency,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitError(null);
            try {
              const numericAmount = displayAmount;

              const payload = {
                amount: numericAmount,
                currency: values.currency,
                firstname: values.firstName,
                lastname: values.lastName,
                email: values.email,
                phonenumber: values.countryCode + values.phoneNumber,
                tierTitle: tier?.title || "General Donation",
                frequency: frequency || "once",
                note: `Contribution for ${tier?.title || "General Donation"}`,
                ...(projectId ? { projectId } : {}),
                ...(!projectId && programId ? { programId } : {}),
                ...(!projectId && !programId && tier?.id ? { tierId: tier.id } : {}),
              };

              const response = await initiatePaymentMutation.mutateAsync(payload);

              if (response && response.redirect_url) {
                window.location.href = response.redirect_url;
              } else {
                setSubmitError("Failed to retrieve payment link. Please try again.");
                setSubmitting(false);
              }
            } catch (error) {
              console.error("Payment initiation failed:", error);
              setSubmitError(
                error.response?.data?.message || 
                "An error occurred while connecting to PesaPal. Please try again later."
              );
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            isValid,
            dirty,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1.5">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-10 border rounded-lg px-3 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-[#0056B3]/30 transition-all ${
                      touched.firstName && errors.firstName
                        ? "border-[#DC3545] bg-red-50"
                        : "border-brand-dark-200 bg-brand-white"
                    }`}
                  />
                  {touched.firstName && errors.firstName && (
                    <p className="text-xs text-[#DC3545] mt-1 font-secondary">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1.5">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-10 border rounded-lg px-3 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-[#0056B3]/30 transition-all ${
                      touched.lastName && errors.lastName
                        ? "border-[#DC3545] bg-red-50"
                        : "border-brand-dark-200 bg-brand-white"
                    }`}
                  />
                  {touched.lastName && errors.lastName && (
                    <p className="text-xs text-[#DC3545] mt-1 font-secondary">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark mb-1.5">
                  Email Address *
                </label>
                <input
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full h-10 border rounded-lg px-3 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-[#0056B3]/30 transition-all ${
                    touched.email && errors.email
                      ? "border-[#DC3545] bg-red-50"
                      : "border-brand-dark-200 bg-brand-white"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-xs text-[#DC3545] mt-1 font-secondary">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-dark mb-1.5">
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={values.countryCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-10 w-[140px] shrink-0 border border-brand-dark-200 rounded-lg px-2 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-[#0056B3]/30 bg-brand-white"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`${c.code}-${c.label}`} value={c.code}>
                        {c.code} {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    name="phoneNumber"
                    type="tel"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`flex-1 h-10 border rounded-lg px-3 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-[#0056B3]/30 transition-all ${
                      touched.phoneNumber && errors.phoneNumber
                        ? "border-[#DC3545] bg-red-50"
                        : "border-brand-dark-200 bg-brand-white"
                    }`}
                    placeholder="770 000 000"
                  />
                </div>
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="text-xs text-[#DC3545] mt-1 font-secondary">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-brand-dark mb-1.5">
                    Amount *
                  </label>
                  <div className="h-10 border border-brand-dark-200 rounded-lg bg-brand-white-100/50 flex items-center px-3 text-brand-dark-400 font-secondary cursor-not-allowed font-bold text-sm">
                    {values.currency === "USD" ? "$" : "UGX "}{displayAmount ? Number(displayAmount).toLocaleString() : "0.00"}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-dark mb-1.5">
                    Currency *
                  </label>
                  <select
                    name="currency"
                    value={values.currency}
                    onChange={(e) => {
                      const newCurrency = e.target.value;
                      setDisplayAmount(amountIn(newCurrency));
                      setFieldValue("currency", newCurrency);
                    }}
                    onBlur={handleBlur}
                    className="w-full h-10 border border-brand-dark-200 rounded-lg px-2 text-sm font-secondary focus:outline-none focus:ring-2 focus:ring-[#0056B3]/30 bg-brand-white"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="UGX">UGX (Shs)</option>
                  </select>
                </div>
              </div>

              {/* Proceed button */}
              <div className="mt-8 text-center pt-2">
                <p className="text-xs text-brand-dark-300 mb-4">
                  You will be redirected to the secure PesaPal payment gateway.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                  className={`block w-full text-brand-white-100 font-bold py-4 rounded-lg transition-all uppercase tracking-wide shadow-md ${
                    isSubmitting || !isValid || !dirty
                      ? "bg-gray-300 cursor-not-allowed text-brand-dark-400"
                      : "bg-[#DC3545] hover:bg-[#DC3545]/90 cursor-pointer hover:shadow-lg active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? "Redirecting..." : "Proceed to Payment"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ContinueWithPesapal;
