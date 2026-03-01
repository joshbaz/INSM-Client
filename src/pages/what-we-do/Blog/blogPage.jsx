import React from "react";
import BlogFeaturedStory from "./blogFeaturedStory";
import BlogList from "./blogList";
import useSEO from "../../../hooks/useSEO";

const Blog = () => {
  useSEO({
    title: "Stories & Insights",
    description:
      "Read stories from the field, latest insights, and updates from the International Network for Single Mothers Uganda Chapter.",
  });

  return (
    <div className="bg-brand-cream-100 min-h-screen">
      {/* Featured Story Hero */}
      <BlogFeaturedStory />

      {/* Horizontal Divider */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <hr className="border-t border-brand-dark-200/30" />
      </div>

      {/* Article List with Pagination */}
      <BlogList />
    </div>
  );
};

export default Blog;
