import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ARTICLES from "../blogData";
import BlogRelatedArticles from "./blogRelatedArticles";

const BlogDetailPage = () => {
  const { articleId } = useParams();
  const article = ARTICLES.find((a) => a.id === parseInt(articleId));
  const [copied, setCopied] = useState(false);

  /* ── 404 Handling ── */
  if (!article) {
    return (
      <section className="bg-brand-white-100 min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold font-primary text-brand-dark mb-4">
            Article Not Found
          </h1>
          <p className="text-base font-secondary text-brand-dark-400 mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/what-we-do/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-lilac text-brand-white font-semibold text-sm rounded-full hover:bg-brand-lilac/90 transition-colors"
          >
            ← Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  // Format date
  const formattedDate = new Date(article.date)
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
    .toUpperCase();

  return (
    <div className="bg-brand-white-100">
      {/* ═══════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════ */}
      <section className="pt-10 md:pt-16">
        <div className="max-w-7xl mx-auto px-6 md:px-24">
          {/* Title — centered above image */}
          <h1 className="text-3xl md:text-5xl font-bold font-primary text-brand-dark text-center leading-tight mb-8 md:mb-10">
            {article.title}
          </h1>

          {/* Contained image */}
          <div className="w-full rounded-lg overflow-hidden mb-6">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[280px] md:h-[420px] object-cover"
            />
          </div>

          {/* Category pill + Share icons row */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left — Date + Category */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-secondary text-brand-dark-400">
                {formattedDate}
              </span>
              {article.category && (
                <span className="px-3 py-1 rounded-full border border-brand-lilac-300 text-xs font-semibold text-brand-lilac uppercase tracking-wide">
                  {article.category}
                </span>
              )}
            </div>

            {/* Right — Share label + social icons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-secondary text-brand-dark-400 uppercase tracking-wide">
                Share
              </span>
              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="relative w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Copy link"
              >
                <Icon icon="mdi:link-variant" width={18} />
                {copied && (
                  <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg font-semibold text-brand-white bg-brand-dark px-2 py-0.5 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>
              {/* Facebook */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                    "facebook-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on Facebook"
              >
                <Icon icon="ri:facebook-fill" width={18} />
              </button>
              {/* Threads */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.threads.net/intent/post?text=${encodeURIComponent(article.title + " — " + window.location.href)}`,
                    "threads-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on Threads"
              >
                <Icon icon="ri:threads-fill" width={18} />
              </button>
              {/* X (Twitter) */}
              <button
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`,
                    "x-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on X"
              >
                <Icon icon="ri:twitter-x-fill" width={18} />
              </button>
              {/* LinkedIn */}
              <button
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`,
                    "linkedin-share",
                    "width=580,height=400,left=200,top=200",
                  )
                }
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-dark-300 hover:text-brand-dark/90 transition-colors cursor-pointer"
                title="Share on LinkedIn"
              >
                <Icon icon="ri:linkedin-fill" width={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal divider below hero */}
      <div className="max-w-7xl mx-auto px-6 md:px-24 py-6 md:py-8">
        <hr className="border-t border-brand-dark-200/30" />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 2 — ARTICLE BODY
      ═══════════════════════════════════════════ */}
      <section className="py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-6 md:px-24">
          <div className="space-y-6">
            {article.body.map((block, index) => {
              switch (block.type) {
                case "text":
                  return (
                    <p
                      key={index}
                      className="text-base md:text-lg font-secondary text-brand-dark-400 leading-relaxed"
                    >
                      {block.content}
                    </p>
                  );
                case "heading":
                  return (
                    <h2
                      key={index}
                      className="text-2xl md:text-3xl font-bold font-primary text-brand-dark mt-4"
                    >
                      {block.content}
                    </h2>
                  );
                case "image":
                  return (
                    <div
                      key={index}
                      className="w-full rounded-lg overflow-hidden my-4"
                    >
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-[250px] md:h-[380px] object-cover"
                      />
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      </section>

      {/* Horizontal divider */}
      <div className="max-w-5xl mx-auto px-6 md:px-24 py-2">
        <hr className="border-t border-brand-dark-200/30" />
      </div>

      {/* ═══════════════════════════════════════════
          SECTION 3 — RELATED ARTICLES
      ═══════════════════════════════════════════ */}
      <BlogRelatedArticles currentArticleId={article.id} />
    </div>
  );
};

export default BlogDetailPage;
