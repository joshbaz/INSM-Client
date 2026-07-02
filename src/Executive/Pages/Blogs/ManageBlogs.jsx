import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useArticles } from "../../../store/tanstackStore/services/queries";

const ManageBlogs = () => {
  const [activeTab, setActiveTab] = useState("DRAFTS");

  const { data: allArticles, isLoading } = useArticles();

  const publishedCount = allArticles?.filter(a => a.status === "PUBLISHED").length || 0;
  const draftCount = allArticles?.filter(a => a.status === "DRAFT").length || 0;
  
  const totalViews = allArticles?.reduce((sum, a) => sum + (a.views || 0), 0) || 0;
  const totalReads = allArticles?.reduce((sum, a) => sum + (a.reads || 0), 0) || 0;

  const currentTabStatus = activeTab === "DRAFTS" ? "DRAFT" : activeTab === "PUBLISHED" ? "PUBLISHED" : "UNLISTED";
  const articles = allArticles?.filter(a => a.status === currentTabStatus);

  const getReadTime = (content) => {
    if (!content) return "1 min read (0 words)";
    const words = content.split(' ').length;
    const time = Math.ceil(words / 200);
    return `${time} min read (${words} words)`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-secondary font-bold text-gray-800">Manage Blogs</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-32 justify-center">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Published</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900 mb-1">{publishedCount}</h3>
          <p className="text-xs font-secondary text-gray-400">Stories you have published on website.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-32 justify-center">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">In Drafts</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900 mb-1">{draftCount}</h3>
          <p className="text-xs font-secondary text-gray-400">Stories you are working on.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-32 justify-center">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Views</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900 mb-1">{totalViews}</h3>
          <p className="text-xs font-secondary text-gray-400">Landed on your stories through website.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-32 justify-center">
          <p className="text-sm font-secondary font-bold text-gray-700 mb-1">Reads</p>
          <h3 className="text-3xl font-primary font-bold text-gray-900 mb-1">{totalReads}</h3>
          <p className="text-xs font-secondary text-gray-400">Read your stories for at least 10 seconds.</p>
        </div>
      </div>

      {/* Tabs and Table container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs and Write New Button */}
        <div className="flex items-center justify-between border-b border-gray-100 pr-4">
          <div className="flex">
            <button 
              className={`px-8 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
                activeTab === "DRAFTS" 
                  ? "bg-[#78a2a5] text-white" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("DRAFTS")}
            >
              DRAFTS
            </button>
            <button 
              className={`px-8 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
                activeTab === "PUBLISHED" 
                  ? "bg-[#78a2a5] text-white" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("PUBLISHED")}
            >
              PUBLISHED
            </button>
            <button 
              className={`px-8 py-4 text-xs font-bold font-secondary tracking-wider uppercase transition-colors ${
                activeTab === "UNLISTED" 
                  ? "bg-[#78a2a5] text-white" 
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("UNLISTED")}
            >
              UNLISTED
            </button>
          </div>
          
          <Link 
            to="/executive/blogs/new" 
            className="flex items-center gap-2 bg-[#a57ea9] hover:bg-[#916b94] text-white px-5 py-2.5 rounded-full text-xs font-bold font-secondary transition-colors"
          >
            <Icon icon="ph:pencil-simple-bold" className="w-4 h-4" />
            WRITE NEW
          </Link>
        </div>

        {/* Tables based on Active Tab */}
        <div className="overflow-x-auto relative min-h-[200px]">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
              <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
            </div>
          )}
          <table className="w-full text-left border-collapse">
            {activeTab === "DRAFTS" && (
              <>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Blog Title</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Updated Date</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Read Time</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles?.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-gray-900 font-secondary max-w-md truncate">{blog.title}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">
                        {getReadTime(blog.content)}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link 
                          to={`/executive/blogs/edit/${blog.id}`}
                          className="bg-brand-lilac/10 text-brand-lilac hover:bg-brand-lilac hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold font-secondary inline-block"
                        >
                          Edit story
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {!isLoading && (!articles || articles.length === 0) && (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-gray-400 font-secondary">
                        No drafts found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

            {activeTab === "PUBLISHED" && (
              <>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Blog Title</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Published Date</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Views</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Reads</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles?.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-gray-900 font-secondary max-w-md truncate">{blog.title}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">{blog.views || 0}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">{blog.reads || 0}</td>
                      <td className="py-4 px-6 text-right">
                        <Link 
                          to={`/executive/blogs/view/${blog.id}`}
                          className="bg-brand-lilac/10 text-brand-lilac hover:bg-brand-lilac hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold font-secondary inline-block"
                        >
                          View story
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {!isLoading && (!articles || articles.length === 0) && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400 font-secondary">
                        No published stories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

            {activeTab === "UNLISTED" && (
              <>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Blog Title</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Updated Date</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Views</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase">Reads</th>
                    <th className="py-4 px-6 text-xs font-bold font-secondary tracking-wider text-gray-500 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles?.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 text-sm font-bold text-gray-900 font-secondary max-w-md truncate">{blog.title}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">{blog.views || 0}</td>
                      <td className="py-4 px-6 text-sm font-medium text-gray-500 font-secondary whitespace-nowrap">{blog.reads || 0}</td>
                      <td className="py-4 px-6 text-right">
                        <Link 
                          to={`/executive/blogs/view/${blog.id}`}
                          className="bg-brand-lilac/10 text-brand-lilac hover:bg-brand-lilac hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold font-secondary inline-block"
                        >
                          View story
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {!isLoading && (!articles || articles.length === 0) && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-gray-400 font-secondary">
                        No unlisted stories found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBlogs;
