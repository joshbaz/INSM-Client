import React from "react";
import BlogFeaturedStory from "./blogFeaturedStory";
import BlogList from "./blogList";
import useSEO from "../../../hooks/useSEO";
import { useArticles } from "../../../store/tanstackStore/services/queries";
import { Icon } from "@iconify/react";

const Blog = () => {
  useSEO({
    title: "Stories & Insights",
    description:
      "Read stories from the field, latest insights, and updates from the International Network for Single Mothers Uganda Chapter.",
  });

  const { data: articles, isLoading } = useArticles({ status: 'PUBLISHED' });

  if (isLoading) {
    return (
      <div className="bg-brand-white-100 min-h-screen flex items-center justify-center">
        <Icon icon="ph:spinner-gap-bold" className="w-12 h-12 text-brand-lilac animate-spin" />
      </div>
    );
  }

  // Ensure we sort by latest publishedAt or createdAt if backend doesn't already sort by desc
  const sortedArticles = [...(articles || [])].sort((a, b) => 
    new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt)
  );

  const featuredArticle = sortedArticles[0];
  const listArticles = sortedArticles.slice(1);

  if (!isLoading && sortedArticles.length === 0) {
    return (
      <div className="bg-brand-white-100 min-h-[70vh] flex flex-col items-center justify-center px-4">
        <Icon icon="ph:article-light" className="w-20 h-20 text-brand-lilac/40 mb-4" />
        <h2 className="text-2xl md:text-3xl font-black font-primary text-brand-dark mb-2 text-center">
          Stories Coming Soon
        </h2>
        <p className="text-base font-secondary text-brand-dark-400 text-center max-w-md">
          We are currently curating new insights and stories from the field. Check back later for updates from the INSM community!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-brand-white-100 min-h-screen">
      {/* Featured Story Hero */}
      {featuredArticle && <BlogFeaturedStory article={featuredArticle} />}

      {/* Article List with Pagination */}
      <BlogList articles={listArticles} />
    </div>
  );
};

export default Blog;
