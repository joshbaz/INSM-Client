import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ARTICLES from "../../../data/blogs.json";

const ARTICLES_PER_PAGE = 6;

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Exclude featured article from the list
  const listArticles = ARTICLES.filter((a) => !a.featured);

  const totalPages = Math.ceil(listArticles.length / ARTICLES_PER_PAGE);

  const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = listArticles.slice(
    startIdx,
    startIdx + ARTICLES_PER_PAGE,
  );

  // Format date helper
  const formatDate = (dateStr) =>
    new Date(dateStr)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .toUpperCase();

  // Generate pagination numbers with ellipsis
  const getPaginationRange = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first 5, then ellipsis, then last 3
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 lg:px-6 2xl:px-8">
        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px]">
          {pageArticles.map((article) => (
            <Link
              to={`/what-we-do/blog/${article.id}`}
              key={article.id}
              className="w-full max-w-[356px] h-[621px] rounded-[10px] border border-brand-dark-200/40 bg-brand-white overflow-hidden flex flex-col shadow-card group"
            >
              {/* Image */}
              <div className="w-full h-[256px] overflow-hidden shrink-0">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="pt-[24px] px-5 pb-5 flex flex-col grow">
                {/* Date */}
                <p className="text-[18px] font-albert font-normal text-brand-lilac uppercase mb-3">
                  {formatDate(article.date)}
                </p>

                {/* Title */}
                <h3 className="text-[27px] font-albert font-extrabold text-brand-dark tracking-normal mb-[10px] group-hover:text-brand-lilac-700 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[21px] font-open font-normal text-brand-dark-400 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read More Button */}
                <span className="mt-auto inline-flex items-center justify-center px-5 py-2 border-2 border-brand-lilac text-brand-lilac font-bold text-xs rounded-full uppercase tracking-wider w-fit group-hover:bg-brand-lilac group-hover:text-brand-white transition-all duration-300">
                  Read More
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Horizontal Divider */}
        {totalPages > 1 && (
          <>
            <div className="py-10 md:py-14">
              <hr className="border-t border-brand-dark-200/30" />
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 pb-8">
              {getPaginationRange().map((page, idx) =>
                page === "..." ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-sm font-secondary text-brand-dark-300"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-secondary transition-colors cursor-pointer ${
                      currentPage === page
                        ? "font-bold text-brand-dark"
                        : "text-brand-dark-300 hover:text-brand-dark"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              {/* Next arrow */}
              {currentPage < totalPages && (
                <button
                  onClick={() => {
                    setCurrentPage(currentPage + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-8 h-8 flex items-center justify-center text-brand-dark-300 hover:text-brand-dark transition-colors cursor-pointer"
                >
                  <Icon icon="heroicons:chevron-right" className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default BlogList;
