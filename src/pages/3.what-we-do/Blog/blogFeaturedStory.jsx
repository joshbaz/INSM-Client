import React from "react";
import { Link } from "react-router-dom";

import api from "../../../store/tanstackStore/services/api";

const BlogFeaturedStory = ({ article }) => {
  if (!article) return null;

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

  const imageUrl = getImageUrl(article.coverImageId);

  return (
    <section className="pt-8 md:pt-12">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 lg:px-6 2xl:px-8">
        {/* Featured Image with Overlay Card */}
        <div className="relative w-full overflow-hidden rounded-2xl">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={article.title}
              className="w-full h-[400px] md:h-[450px] lg:h-[500px] object-cover"
            />
          ) : (
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] bg-gradient-to-r from-brand-lilac/30 to-brand-lilac/10" />
          )}

          {/* Overlay Card — bottom center */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] md:w-[85%] lg:w-[75%] max-w-[900px]">
            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-[0_-4px_30px_rgba(0,0,0,0.05)] rounded-t-[2rem] text-center md:text-left">
              <p className="text-[11px] md:text-xs font-secondary font-bold text-gray-500 tracking-widest uppercase mb-3">
                {formatDate(article.publishedAt || article.createdAt)}
              </p>
              <h2 className="text-2xl md:text-3xl font-black font-primary text-gray-900 leading-tight mb-3">
                {article.title}
              </h2>
              <p className="text-sm md:text-base font-secondary font-medium text-gray-600 leading-relaxed mb-6 line-clamp-2">
                {article.excerpt}
              </p>
              <Link
                to={`/what-we-do/blog/${article.slug || article.id}`}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#9e70a1] text-white font-bold text-[11px] rounded-full hover:bg-[#8a618d] transition-colors uppercase tracking-[0.1em]"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogFeaturedStory;
