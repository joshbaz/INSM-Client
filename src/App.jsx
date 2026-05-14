import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ── GLOBAL COMPONENTS ──
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// ── AUTHENTICATION ──
import { AuthProvider } from "./store/context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// ── PUBLIC PAGES ──
import Home from "./pages/1.home/homePage";
import HomeHero from "./pages/1.home/homeHero";
import Login from "./pages/0.auth/login";
import ForgotPassword from "./pages/0.auth/forgotPassword";

// Who We Are
import WhoWeArePage from "./pages/2.who-we-are/whoWeArePage";

// What We Do
import WhatWeDo from "./pages/3.what-we-do/whatWeDoPage";
import Projects from "./pages/3.what-we-do/projects/projectsPage";
import ProjectsList from "./pages/3.what-we-do/projects/projectsList";
import ProjectDetail from "./pages/3.what-we-do/projects/projectDetail";
import Gallery from "./pages/3.what-we-do/Gallery/galleryPage";
import Blog from "./pages/3.what-we-do/Blog/blogPage";
import BlogDetailPage from "./pages/3.what-we-do/Blog/details/blogDetailPage";

// How To Help
import DonatePage from "./pages/4.how-to-help/Partner-with-us-Page/donatePage";
import HowToHelp from "./pages/4.how-to-help/howToHelpPage";
import ContactUs from "./pages/4.how-to-help/contact-us/ContactUs";
import SeedPortals from "./pages/4.how-to-help/seed-portals/SeedPortals";

// Policies
import PrivacyPolicyPage from "./pages/policies/policiesPage";
import TermsOfUse from "./pages/policies/termsOfUse";
import EthicalConduct from "./pages/policies/ethicalConduct";

// ── CRM DASHBOARD (PROTECTED) ──
import DashboardLayout from "./CRM/Layout/DashboardLayout";
import CRMDashboard from "./CRM/1.Dashboard/DashboardPage";
import ProjectsManagementPage from "./CRM/5.ProjectsManagement/ProjectsManagementPage";
import BeneficiariesPage from "./CRM/6.Beneficiaries/BeneficiariesPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

function AppContent() {
  const location = useLocation();
  
  // Hide Navbar/Footer for Auth and CRM pages
  const hideNavAndFooter = [
    "/login",
    "/forgot-password",
    "/dashboard",
    "/crm",
  ].some(path => location.pathname.startsWith(path));

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {!hideNavAndFooter && <Navbar />}
        <main className="grow">
          <Routes>
            {/* ── Public Routes ── */}
            <Route path="/" element={<Home />} />
            <Route path="/home/hero" element={<HomeHero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Who We Are */}
            <Route path="/who-we-are" element={<WhoWeArePage />} />
            <Route path="/who-we-are/our-story" element={<WhoWeArePage />} />
            <Route path="/who-we-are/our-team" element={<WhoWeArePage />} />
            <Route path="/who-we-are/the-roadmap" element={<WhoWeArePage />} />

            {/* What We Do */}
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/what-we-do/projects" element={<Projects />} />
            <Route path="/what-we-do/projects/list" element={<ProjectsList />} />
            <Route path="/what-we-do/projects/list/:projectId" element={<ProjectDetail />} />
            <Route path="/what-we-do/gallery" element={<Gallery />} />
            <Route path="/what-we-do/blog" element={<Blog />} />
            <Route path="/what-we-do/blog/:articleId" element={<BlogDetailPage />} />

            {/* How To Help */}
            <Route path="/how-to-help/partner-with-us" element={<DonatePage />} />
            <Route path="/how-to-help/donate" element={<Navigate to="/how-to-help/partner-with-us" replace />} />
            <Route path="/how-to-help/join-the-assignment" element={<HowToHelp />} />
            <Route path="/how-to-help/contact-us" element={<ContactUs />} />
            <Route path="/how-to-help/seed-portals" element={<SeedPortals />} />

            {/* Policies */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/ethical-conduct" element={<EthicalConduct />} />

            {/* ── Protected CRM Routes ── */}
            <Route
              path="/crm"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<CRMDashboard />} />
              <Route path="media" element={<div className="text-brand-dark p-8">Media Manager Coming Soon</div>} />
              <Route path="donations" element={<div className="text-brand-dark p-8">Donation Manager Coming Soon</div>} />
              <Route path="blogs" element={<div className="text-brand-dark p-8">Blog Manager Coming Soon</div>} />
              <Route path="projects" element={<ProjectsManagementPage />} />
              <Route path="beneficiaries" element={<BeneficiariesPage />} />
              <Route path="partners" element={<div className="text-brand-dark p-8">Partners Manager Coming Soon</div>} />
              <Route path="settings" element={<div className="text-brand-dark p-8">Settings Manager Coming Soon</div>} />
            </Route>

            {/* Redirection for old dashboard link */}
            <Route
              path="/dashboard"
              element={<Navigate to="/crm/dashboard" replace />}
            />

          </Routes>
        </main>
        {!hideNavAndFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
