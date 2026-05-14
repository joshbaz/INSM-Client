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
      <div className="max-w-5xl mx-auto px-6 md:px-24">
        <h2 className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mb-8">
          Related articles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {related.map((article) => (
            <Link
              to={`/what-we-do/blog/${article.id}`}
              key={article.id}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="w-full h-[180px] rounded-lg overflow-hidden mb-3">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Date */}
              <p className="text-xs font-secondary text-brand-lilac tracking-widest uppercase mb-1.5">
                {formatDate(article.date)}
              </p>

              {/* Title */}
              <h3 className="text-base font-bold font-primary text-brand-dark leading-snug mb-1.5 group-hover:text-brand-lilac-700 transition-colors">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogRelatedArticles;
