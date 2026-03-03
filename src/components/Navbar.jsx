import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const menuRef = useRef(null);

  const menuCategories = [
    {
      title: "Who we are?",
      items: [
        { name: "Our Story", path: "/who-we-are/our-story" },
        { name: "The Visionary", path: "/who-we-are/our-team" },
        { name: "Strategic Blueprint", path: "/who-we-are/the-roadmap" },
      ],
    },
    {
      title: "What we do?",
      items: [
        { name: "Projects", path: "/what-we-do/projects" },
        { name: "Gallery", path: "/what-we-do/gallery" },
        { name: "Blog", path: "/what-we-do/blog" },
      ],
    },
    {
      title: "How to help?",
      items: [
        { name: "Donate", path: "/how-to-help/donate" },
        {
          name: "Join the Assignment",
          path: "/how-to-help/join-the-assignment",
        },
        {
          name: "Equipper Portal",
          path: "https://portal.insmuganda.org",
          external: true,
        },
        { name: "Contact Us", path: "/how-to-help/contact-us" },
      ],
    },
  ];

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !e.target.closest('button[aria-label="Toggle menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when menu is open
  // Lock body scroll when menu is open and handle scrollbar shift
  useEffect(() => {
    if (isMenuOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    // Cleanup function to ensure state is reset if component unmounts
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isMenuOpen]);

  const toggleCategory = (title) => {
    setExpandedCategory(expandedCategory === title ? null : title);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-80 transition-all duration-500 ${isScrolled ? "bg-brand-white shadow-md" : "bg-brand-white shadow-sm"}`}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* NAV BAR HEADER */}
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-4 z-50 relative">
              <div className="relative w-28 h-20 shrink-0">
                <img
                  src="/logo.png"
                  alt="INSM Logo"
                  className="absolute top-0 left-0 w-24 h-24 rounded-full object-contain max-w-none shadow-sm bg-brand"
                />
              </div>

              <div className="hidden sm:block">
                <h1 className="font-primary font-bold text-body uppercase leading-tight">
                  <span className="text-brand-lilac text-sm">
                    INTERNATIONAL NETWORK <br /> FOR SINGLE MOTHERS
                  </span>
                  <br />
                  <span className="text-brand-lilac-700 text-sm">UGANDA CHAPTER</span>
                </h1>
              </div>
            </Link>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center gap-6 z-30 relative">
              {/* CTA BUTTON */}
              <Link
                to={isHomePage ? "/how-to-help/donate" : "/"}
                className="
                hidden md:inline-flex
                items-center justify-center
                bg-brand-lilac-700 hover:bg-brand-lilac-700/90
                text-brand-white text-body font-semibold text-sm
                px-8 py-3
                rounded-full
                transition-colors
                cursor-pointer
                uppercase tracking-wide
              "
                style={{ minWidth: "150px", height: "45px" }}
              >
                {isHomePage ? "DONATE" : "GO BACK HOME"}
              </Link>

              {/* TOGGLE BUTTON (BURGER / CLOSE) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-brand-lilac-700 hover:text-brand-lilac-700/90 focus:outline-none cursor-pointer p-2"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <Icon icon="heroicons:x-mark" width={40} />
                ) : (
                  <Icon icon="heroicons:bars-3" width={40} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MENU OVERLAY */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-brand-white z-60 pt-24 overflow-y-auto"
          ref={menuRef}
        >
          {/* Header Separation Line */}
          <div className="absolute top-20 left-0 w-full border-b border-gray-100"></div>

          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
            <div className="flex flex-col">
              {menuCategories.map((category, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-0"
                >
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="w-full flex items-center justify-between py-6 group hover:bg-brand-dark-100/90 transition-colors px-4 rounded-lg cursor-pointer"
                  >
                    <span className="text-2xl md:text-3xl text-brand-dark font-normal">
                      {category.title}
                    </span>
                    <span
                      className={`text-brand-dark transition-transform duration-300 ${
                        expandedCategory === category.title ? "rotate-180" : ""
                      }`}
                    >
                      <Icon icon="ph:caret-down-bold" width={24} />
                    </span>
                  </button>

                  {/* EXPANDED CONTENT */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${expandedCategory === category.title ? "max-h-96 opacity-100 mb-6" : "max-h-0 opacity-0"}
                    `}
                  >
                    <div className="px-4 space-y-3 pt-2">
                      {category.items.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-lg text-brand-dark-400 hover:text-brand-lilac/90 pl-4 border-l-2 border-transparent hover:border-brand-lilac transition-all cursor-pointer"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Menu CTA */}
            <div className="mt-8 px-4 md:hidden">
              <Link
                to={isHomePage ? "/how-to-help/donate" : "/"}
                onClick={() => setIsMenuOpen(false)}
                className="
                  w-full md:w-auto
                  items-center justify-center
                  bg-brand-navy hover:bg-brand-navy/90
                  text-brand-white text-body font-semibold
                  px-8 py-3
                  rounded-full
                  transition-colors
                  cursor-pointer
                  uppercase tracking-wide
                  flex
                "
                style={{ height: "54px" }}
              >
                {isHomePage ? "DONATE" : "GO BACK HOME"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
