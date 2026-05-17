import React from "react";
import { Link } from "react-router-dom";
import ARTICLES from "../../../../data/blogs.json";

const BlogRelatedArticles = ({ currentArticleId }) => {
  // Get 4 articles excluding the current one
  const related = ARTICLES.filter((a) => a.id !== currentArticleId).slice(0, 4);

  const formatDate = (dateStr) =>
    new Date(dateStr)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      })
      .toUpperCase();

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4 lg:px-6 xl:px-24">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-primary text-brand-dark mb-8 leading-[1.1]">
          Related articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px]">
          {related.map((article) => (
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
                <p className="text-sm font-albert font-bold text-brand-lilac uppercase mb-3">
                  {formatDate(article.date)}
                </p>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-albert font-extrabold text-brand-dark tracking-normal mb-[10px] group-hover:text-brand-lilac-700 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm md:text-base font-open font-medium text-brand-dark-400 line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogRelatedArticles;
