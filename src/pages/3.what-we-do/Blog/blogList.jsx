import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import api from "../../../store/tanstackStore/services/api";

const ARTICLES_PER_PAGE = 6;

const BlogList = ({ articles = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

  const startIdx = (currentPage - 1) * ARTICLES_PER_PAGE;
  const pageArticles = articles.slice(
    startIdx,
    startIdx + ARTICLES_PER_PAGE,
  );

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .toUpperCase();
  };

  const getImageUrl = (id) => {
    return id ? `${api.defaults.baseURL}/photos/${id}/view` : null;
  };

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
        <div className="flex flex-wrap justify-center gap-8 lg:gap-[40px]">
          {pageArticles.map((article) => (
            <Link
              to={`/what-we-do/blog/${article.slug || article.id}`}
              key={article.id}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.75rem)] max-w-[420px] h-full rounded-2xl border border-gray-100 bg-white overflow-hidden flex flex-col group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Image */}
              <div className="w-full h-[240px] lg:h-[260px] overflow-hidden shrink-0">
                {article.coverImageId ? (
                  <img
                    src={getImageUrl(article.coverImageId)}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-brand-lilac/30 to-brand-lilac/10 transition-transform duration-700 group-hover:scale-105" />
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col grow">
                {/* Date */}
                <p className="text-[11px] md:text-xs font-secondary font-bold text-gray-400 uppercase mb-3 tracking-widest">
                  {formatDate(article.publishedAt || article.createdAt)}
                </p>

                {/* Title */}
                <h3 className="text-xl md:text-[22px] font-black font-primary text-gray-900 leading-tight mb-3 group-hover:text-[#9e70a1] transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm font-secondary font-medium text-gray-500 mb-8 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Read More Button */}
                <span className="mt-auto inline-flex items-center justify-center px-6 py-2 border-2 border-[#9e70a1] text-[#9e70a1] font-bold text-[10px] rounded-full uppercase tracking-widest w-fit group-hover:bg-[#9e70a1] group-hover:text-white transition-all duration-300">
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
