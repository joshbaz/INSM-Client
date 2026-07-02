import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// ── GLOBAL COMPONENTS ──
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SocketProvider } from "./store/context/SocketContext";


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

// ── EXECUTIVE PORTAL (PROTECTED) ──
import ExecutiveLayout from "./Executive/Layout/ExecutiveLayout";
import ExecutiveHome from "./Executive/Pages/Home/ExecutiveHome";
import CapitalInvestments from "./Executive/Pages/Capital/CapitalInvestments";
import SeedACooperative from "./Executive/Pages/Capital/SeedACooperative";
import InvestmentTiers from "./Executive/Pages/Capital/InvestmentTiers";
import ManageLeads from "./Executive/Pages/Leads/ManageLeads";
import ManageBlogs from "./Executive/Pages/Blogs/ManageBlogs";
import MediaLibrary from "./Executive/Pages/Photos/MediaLibrary";
import NewArticle from "./Executive/Pages/Blogs/NewArticle";
import EditArticle from "./Executive/Pages/Blogs/EditArticle";
import ExecutiveViewArticle from "./Executive/Pages/Blogs/ExecutiveViewArticle";
import ExecutiveLogin from "./Executive/Pages/Auth/ExecutiveLogin";
import RegisterSuperAdmin from "./Executive/Pages/Auth/RegisterSuperAdmin";

// Initialize QueryClient
const queryClient = new QueryClient();

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
    "/executive/login",
    "/register-superadmin",
  ].some(path => location.pathname.startsWith(path));

  // The executive layout also handles its own layout, so we hide for all /executive EXCEPT maybe we could hide for all /executive? 
  // Wait, the executive portal HAS its own layout. The previous plan added "/executive" to hideNavAndFooter.
  const isExecutiveRoute = location.pathname.startsWith("/executive");
  const shouldHideNavAndFooter = hideNavAndFooter || isExecutiveRoute;

  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          {!shouldHideNavAndFooter && <Navbar />}
          <main className="grow">
            <Routes>
              {/* ── Public Routes ── */}
              <Route path="/" element={<Home />} />
              <Route path="/home/hero" element={<HomeHero />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              />

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
                    <CRMDashboard />
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

              {/* ── One-Time Admin Setup ── */}
              <Route path="/register-superadmin" element={<RegisterSuperAdmin />} />

              {/* ── Protected Executive Routes ── */}
              <Route path="/executive/login" element={<ExecutiveLogin />} />

              <Route
                path="/executive"
                element={
                  <ProtectedRoute redirectTo="/executive/login" requiredRole="admin">
                    <ExecutiveLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="home" replace />} />
                <Route path="home" element={<ExecutiveHome />} />
                <Route path="capital" element={<Navigate to="seed-a-cooperative" replace />} />
                <Route path="capital/seed-a-cooperative" element={<SeedACooperative />} />
                <Route path="capital/seed-a-cooperative/tiers" element={<InvestmentTiers />} />
                <Route path="capital/programs" element={<CapitalInvestments />} />
                <Route path="capital/1k-club" element={<CapitalInvestments />} />
                <Route path="leads" element={<ManageLeads />} />
                <Route path="network" element={<div className="text-brand-dark p-8">Network Coming Soon</div>} />
                <Route path="blogs" element={<ManageBlogs />} />
                <Route path="blogs/new" element={<NewArticle />} />
                <Route path="blogs/edit/:id" element={<EditArticle />} />
                <Route path="blogs/view/:id" element={<ExecutiveViewArticle />} />
                <Route path="photos" element={<MediaLibrary />} />
                <Route path="settings" element={<div className="text-brand-dark p-8">Settings Coming Soon</div>} />
              </Route>

              {/* Redirection for old dashboard link */}
              <Route
                path="/dashboard"
                element={<Navigate to="/crm/dashboard" replace />}
              />

            </Routes>
          </main>
          {!shouldHideNavAndFooter && <Footer />}
        </div>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
