import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const NewArticle = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="h-20 border-b border-gray-200 flex items-center justify-between px-8 shrink-0 bg-white shadow-sm">
        <div className="flex items-center gap-6">
          <Link 
            to="/executive/blogs"
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
          >
            <Icon icon="ph:x-bold" className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-secondary font-bold text-gray-800">New Article</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Link 
            to="/executive/blogs"
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-secondary font-bold text-xs tracking-wider uppercase hover:bg-gray-50 transition-colors"
          >
            SAVE & CANCEL
          </Link>
          <button className="px-6 py-2.5 rounded-full bg-[#dca838] hover:bg-[#c99525] text-white font-secondary font-bold text-xs tracking-wider uppercase transition-colors shadow-sm">
            PUBLISH BLOG
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Main Editor */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Title <span className="font-normal text-gray-500">(Name your blog)</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-lilac/20 focus:border-brand-lilac bg-white shadow-sm"
              />
            </div>

            {/* Content Editor */}
            <div className="flex flex-col h-[500px]">
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Content <span className="font-normal text-gray-500">(Write your blog post)</span>
              </label>
              <div className="flex-1 flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {/* Toolbar */}
                <div className="flex items-center gap-2 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
                  <select className="bg-transparent text-sm font-secondary font-medium px-2 py-1 outline-none text-gray-700 cursor-pointer border-r border-gray-300 pr-4">
                    <option>Normal Text</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                  </select>
                  
                  <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:text-b-bold" className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:text-italic-bold" className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:text-underline-bold" className="w-4 h-4" /></button>
                  </div>

                  <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:link-bold" className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:quotes-bold" className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:image-bold" className="w-4 h-4" /></button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:list-bullets-bold" className="w-4 h-4" /></button>
                    <button className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:list-numbers-bold" className="w-4 h-4" /></button>
                  </div>
                </div>
                {/* Editor Area (Simulated) */}
                <div className="flex-1 p-6 bg-white outline-none" contentEditable suppressContentEditableWarning></div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full lg:w-[350px] space-y-6">
            {/* Slug */}
            <div>
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Slug <span className="font-normal text-gray-500">(Write a slug for this blog)</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter your full name" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-lilac/20 focus:border-brand-lilac bg-white shadow-sm"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Excerpt <span className="font-normal text-gray-500">(Add a short excerpt to summarise this post)</span>
              </label>
              <textarea 
                placeholder="Enter your full name" 
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-lilac/20 focus:border-brand-lilac bg-white shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                <Icon icon="ph:image-square-duotone" className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm font-bold font-secondary text-gray-500">Upload Image</span>
              </div>
              <p className="text-xs text-gray-500 font-secondary mt-3 leading-relaxed">
                To upload your photo to a 1280x720 <span className="font-bold text-gray-700">(720p)</span> resolution, you can use <a href="#" className="underline font-bold text-gray-700">Web Upon</a> a free web-based tool to resize your images.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewArticle;
