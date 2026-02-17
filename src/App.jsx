import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/home/home";
import HomeHero from "./pages/home/homeHero";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgotPassword";
import Dashboard from "./pages/dashboard/dashboardPage";

// New Sitemap Pages
import OurStory from "./pages/who-we-are/OurStory";
import OurTeam from "./pages/who-we-are/OurTeam";
import TheRoadmap from "./pages/who-we-are/TheRoadmap";
import Projects from "./pages/what-we-do/projects/projectsPage";
import ProjectsList from "./pages/what-we-do/projects/projectsList";
import ProjectDetail from "./pages/what-we-do/projects/projectDetail";
import Gallery from "./pages/what-we-do/Gallery/galleryPage";
import Blog from "./pages/what-we-do/Blog/blogPage";
import BlogDetailPage from "./pages/what-we-do/Blog/details/blogDetailPage";
import DonatePage from "./pages/Donate Page/donatePage";
import HowToHelp from "./pages/how-to-help/howToHelpPage";
import ContactUs from "./pages/how-to-help/ContactUs";
import PrivacyPolicyTermsOfUse from "./pages/privacy-policy/privacyPolicy-TermsOfUse";

function App() {
  return (
    <Router>
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

            {/* New Sitemap Routes */}
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/the-roadmap" element={<TheRoadmap />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/list" element={<ProjectsList />} />
            <Route
              path="/projects/list/:projectId"
              element={<ProjectDetail />}
            />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:articleId" element={<BlogDetailPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/how-to-help" element={<HowToHelp />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicyTermsOfUse />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
