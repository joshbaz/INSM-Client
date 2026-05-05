import React from "react";
import { Link } from "react-router-dom";
import ARTICLES from "./blogData";

const BlogFeaturedStory = () => {
  const featured = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  // Format date
  const formattedDate = new Date(featured.date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    .toUpperCase();

  return (
    <section className="pt-10 md:pt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Featured Image with Overlay Card */}
        <div className="relative w-full  overflow-hidden">
          <img
            src={featured.image}
            alt={featured.title}
            className="w-full h-[320px] md:h-[480px] object-cover"
          />

          {/* Overlay Card — centered */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 md:p-0 ">
            <div className="bg-brand-white/95 backdrop-blur-sm p-6 md:p-8 max-w-xl w-full shadow-lg text-left">
              <p className="text-xs font-secondary text-brand-lilac tracking-widest uppercase mb-3">
                {formattedDate}
              </p>
              <h2 className="text-xl md:text-2xl font-bold font-primary text-brand-dark leading-snug mb-3">
                {featured.title}
              </h2>
              <p className="text-sm font-secondary text-brand-dark-400 leading-relaxed mb-5 line-clamp-2 md:line-clamp-3">
                {featured.excerpt}
              </p>
              <Link
                to={`/what-we-do/blog/${featured.id}`}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-brand-lilac text-brand-white font-bold text-xs rounded-full hover:bg-brand-lilac/90 transition-colors uppercase tracking-wider"
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
