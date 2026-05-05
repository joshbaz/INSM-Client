import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/1.home/homePage";
import HomeHero from "./pages/1.home/homeHero";
import Login from "./pages/0.auth/login";
import Signup from "./pages/0.auth/signup";
import ForgotPassword from "./pages/0.auth/forgotPassword";
import Dashboard from "./CRM/dashboard/dashboardPage";

// New Sitemap Pages
import WhoWeArePage from "./pages/2.who-we-are/whoWeArePage";
import WhatWeDo from "./pages/3.what-we-do/whatWeDoPage";
import Projects from "./pages/3.what-we-do/projects/projectsPage";
import ProjectsList from "./pages/3.what-we-do/projects/projectsList";
import ProjectDetail from "./pages/3.what-we-do/projects/projectDetail";
import Gallery from "./pages/3.what-we-do/Gallery/galleryPage";
import Blog from "./pages/3.what-we-do/Blog/blogPage";
import BlogDetailPage from "./pages/3.what-we-do/Blog/details/blogDetailPage";
import DonatePage from "./pages/4.how-to-help/Partner-with-us-Page/donatePage";
import HowToHelp from "./pages/4.how-to-help/howToHelpPage";
import ContactUs from "./pages/4.how-to-help/contact-us/ContactUs";
import PrivacyPolicyPage from "./pages/policies/policiesPage";
import TermsOfUse from "./pages/policies/termsOfUse";
import EthicalConduct from "./pages/policies/ethicalConduct";
import SeedPortals from "./pages/4.how-to-help/seed-portals/SeedPortals";
import PartnerPortalPage from "./CRM/dashboard/partnerPortalPage";

import { AuthProvider } from "./store/context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

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
  const hideNavAndFooter = [
    "/login",
    "/signup",
    "/forgot-password",
    "/dashboard",
  ].includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        {!hideNavAndFooter && <Navbar />}
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/hero" element={<HomeHero />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
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
            <Route
              path="/what-we-do/projects/list"
              element={<ProjectsList />}
            />
            <Route
              path="/what-we-do/projects/list/:projectId"
              element={<ProjectDetail />}
            />
            <Route path="/what-we-do/gallery" element={<Gallery />} />
            <Route path="/what-we-do/blog" element={<Blog />} />
            <Route
              path="/what-we-do/blog/:articleId"
              element={<BlogDetailPage />}
            />

            {/* How To Help */}
            <Route
              path="/how-to-help/partner-with-us"
              element={<DonatePage />}
            />
            <Route
              path="/how-to-help/donate"
              element={<Navigate to="/how-to-help/partner-with-us" replace />}
            />
            <Route
              path="/how-to-help/join-the-assignment"
              element={<HowToHelp />}
            />
            <Route path="/how-to-help/contact-us" element={<ContactUs />} />

            {/* Policies */}
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/ethical-conduct" element={<EthicalConduct />} />
            <Route path="/how-to-help/seed-portals" element={<SeedPortals />} />
            <Route
              path="/partner-portal"
              element={
                <ProtectedRoute>
                  <PartnerPortalPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {!hideNavAndFooter && <Footer />}
      </div>
    </>
  );
}

export default App;
