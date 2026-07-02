import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useArticle, useUpdateArticle } from "../../../store/tanstackStore/services/queries";
import api from "../../../store/tanstackStore/services/api";

const ExecutiveViewArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: article, isLoading } = useArticle(id);
  const updateArticle = useUpdateArticle();

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold font-primary text-gray-800 mb-4">Article Not Found</h2>
        <Link to="/executive/blogs" className="px-6 py-2.5 bg-brand-lilac text-white rounded-full font-bold font-secondary text-sm">
          Go Back
        </Link>
      </div>
    );
  }

  const handleStatusChange = async (newStatus) => {
    try {
      await updateArticle.mutateAsync({
        id,
        status: newStatus
      });
      alert(`Article status updated to ${newStatus}`);
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-hidden">
      {/* Top Header */}
      <div className="h-20 border-b border-gray-200 flex items-center justify-between px-8 shrink-0 bg-white shadow-sm">
        <div className="flex items-center gap-6">
          <Link
            to="/executive/blogs"
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
          >
            <Icon icon="ph:arrow-left-bold" className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <h1 className="text-xl font-secondary font-bold text-gray-800 line-clamp-1">{article.title}</h1>
            <span className="text-xs font-secondary text-gray-500">Status: <strong className="text-brand-lilac uppercase">{article.status}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={`/executive/blogs/edit/${article.id}`}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-secondary font-bold text-xs tracking-wider uppercase hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Icon icon="ph:pencil-simple-bold" />
            EDIT
          </Link>
          {article.status === "PUBLISHED" ? (
            <button
              onClick={() => handleStatusChange("UNLISTED")}
              disabled={updateArticle.isPending}
              className="px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-secondary font-bold text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center gap-2"
            >
              <Icon icon="ph:eye-slash-bold" />
              UNLIST STORY
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange("PUBLISHED")}
              disabled={updateArticle.isPending}
              className="px-6 py-2.5 rounded-full bg-[#dca838] hover:bg-[#c99525] text-white font-secondary font-bold text-xs tracking-wider uppercase transition-colors shadow-sm flex items-center gap-2"
            >
              <Icon icon="ph:eye-bold" />
              PUBLISH STORY
            </button>
          )}
        </div>
      </div>

      {/* Main Content Preview */}
      <div className="flex-1 overflow-y-auto bg-gray-50 py-10 px-8">
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {article.coverImageId && (
            <div className="w-full h-[400px]">
              <img 
                src={`${api.defaults.baseURL}/photos/${article.coverImageId}/view`} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="p-10 md:p-14">
            <h1 className="text-4xl md:text-5xl font-black font-primary text-gray-900 mb-6 leading-[1.1]">
              {article.title}
            </h1>
            <div className="flex items-center gap-3 mb-10 text-gray-500 font-secondary text-sm">
              <span className="font-bold">
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" }).toUpperCase()}
              </span>
            </div>
            
            <hr className="border-gray-100 mb-10" />

            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveViewArticle;
