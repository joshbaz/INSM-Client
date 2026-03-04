import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/home/home";
import HomeHero from "./pages/home/homeHero";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgotPassword";
import Dashboard from "./pages/dashboard/dashboardPage";

// New Sitemap Pages
import WhoWeArePage from "./pages/who-we-are/whoWeArePage";
import WhatWeDo from "./pages/what-we-do/whatWeDoPage";
import Projects from "./pages/what-we-do/projects/projectsPage";
import ProjectsList from "./pages/what-we-do/projects/projectsList";
import ProjectDetail from "./pages/what-we-do/projects/projectDetail";
import Gallery from "./pages/what-we-do/Gallery/galleryPage";
import Blog from "./pages/what-we-do/Blog/blogPage";
import BlogDetailPage from "./pages/what-we-do/Blog/details/blogDetailPage";
import DonatePage from "./pages/Donate Page/donatePage";
import HowToHelp from "./pages/how-to-help/howToHelpPage";
import ContactUs from "./pages/contact-us/contactUsPage";
import PrivacyPolicyPage from "./pages/policies/policiesPage";
import TermsOfUse from "./pages/policies/termsOfUse";
import EthicalConduct from "./pages/policies/ethicalConduct";
import SeedPortals from "./pages/how-to-help/SeedPortals";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home/hero" element={<HomeHero />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />

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
            <Route path="/how-to-help/donate" element={<DonatePage />} />
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
