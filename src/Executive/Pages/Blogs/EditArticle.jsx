import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useUpdateArticle, useArticle, useUploadPhoto } from "../../../store/tanstackStore/services/queries";
import { useAuth } from "../../../store/context/AuthContext";
import api from "../../../store/tanstackStore/services/api";

const EditArticle = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const updateArticle = useUpdateArticle();
  const uploadPhoto = useUploadPhoto();

  const { data: articleData, isLoading: isArticleLoading } = useArticle(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [savedSelection, setSavedSelection] = useState(null);
  const editorRef = React.useRef(null);

  useEffect(() => {
    if (articleData) {
      setTitle(articleData.title || "");
      setContent(articleData.content || "");
      setSlug(articleData.slug || "");
      setExcerpt(articleData.excerpt || "");
      if (articleData.coverImageId) {
        setPreviewUrl(`${api.defaults.baseURL}/photos/${articleData.coverImageId}/view`);
      }
      if (editorRef.current && editorRef.current.innerHTML !== articleData.content) {
        editorRef.current.innerHTML = articleData.content || "";
      }
    }
  }, [articleData]);

  const saveSelection = () => {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        setSavedSelection(sel.getRangeAt(0));
      }
    }
  };

  const restoreSelection = () => {
    if (savedSelection) {
      if (window.getSelection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(savedSelection);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleEditorImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      try {
        const photoResponse = await uploadPhoto.mutateAsync({ file: selectedFile, caption: 'inline image' });
        const fullUrl = `${api.defaults.baseURL}/photos/${photoResponse.id}/view`;

        // Restore cursor position and insert
        restoreSelection();
        document.execCommand('insertImage', false, fullUrl);
      } catch (error) {
        console.error("Failed to upload inline image", error);
        alert("Failed to upload image.");
      }
    }
    // reset input
    e.target.value = '';
  };

  const handleSave = async (status) => {
    if (!title || !slug) {
      alert("Title and Slug are required.");
      return;
    }

    try {
      let coverImageId = articleData?.coverImageId || null;

      // 1. Upload photo if selected
      if (file) {
        const photoResponse = await uploadPhoto.mutateAsync({ file, caption: `${title} cover image` });
        coverImageId = photoResponse.id;
      }

      // 2. Update article
      await updateArticle.mutateAsync({
        id,
        title,
        content,
        slug,
        excerpt,
        status,
        coverImageId,
      });

      // Navigate back on success
      navigate("/executive/blogs");
    } catch (error) {
      console.error("Failed to update article:", error);
      alert("Failed to update article.");
    }
  };

  if (isArticleLoading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <Icon icon="ph:spinner-gap-bold" className="w-8 h-8 text-brand-lilac animate-spin" />
      </div>
    );
  }

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
          <h1 className="text-xl font-secondary font-bold text-gray-800">Edit Article</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handleSave("DRAFT")}
            disabled={updateArticle.isPending || uploadPhoto.isPending}
            className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-700 font-secondary font-bold text-xs tracking-wider uppercase hover:bg-gray-50 transition-colors"
          >
            {updateArticle.isPending ? "SAVING..." : "SAVE AS DRAFT"}
          </button>
          <button
            onClick={() => handleSave("PUBLISHED")}
            disabled={updateArticle.isPending || uploadPhoto.isPending}
            className="px-6 py-2.5 rounded-full bg-[#dca838] hover:bg-[#c99525] text-white font-secondary font-bold text-xs tracking-wider uppercase transition-colors shadow-sm"
          >
            {updateArticle.isPending ? "PUBLISHING..." : "PUBLISH BLOG"}
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
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
                  <select
                    className="bg-transparent text-sm font-secondary font-medium px-2 py-1 outline-none text-gray-700 cursor-pointer border-r border-gray-300 pr-4"
                    onChange={(e) => document.execCommand('formatBlock', false, e.target.value)}
                    defaultValue="p"
                  >
                    <option value="p">Normal Text</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                  </select>

                  <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button type="button" onClick={() => document.execCommand('bold', false, null)} className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:text-b-bold" className="w-4 h-4" /></button>
                    <button type="button" onClick={() => document.execCommand('italic', false, null)} className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:text-italic-bold" className="w-4 h-4" /></button>
                    <button type="button" onClick={() => document.execCommand('underline', false, null)} className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:text-underline-bold" className="w-4 h-4" /></button>
                  </div>

                  <div className="flex items-center gap-1 border-r border-gray-300 pr-2">
                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt('Enter link URL:');
                        if (url) document.execCommand('createLink', false, url);
                      }}
                      className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Icon icon="ph:link-bold" className="w-4 h-4" />
                    </button>
                    <button type="button" onClick={() => document.execCommand('formatBlock', false, 'blockquote')} className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:quotes-bold" className="w-4 h-4" /></button>
                    <button
                      type="button"
                      onClick={() => {
                        saveSelection();
                        document.getElementById('editor-image-upload').click();
                      }}
                      className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Icon icon="ph:image-bold" className="w-4 h-4" />
                    </button>
                    {/* Hidden input for inline image upload */}
                    <input
                      id="editor-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleEditorImageChange}
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <button type="button" onClick={() => document.execCommand('insertUnorderedList', false, null)} className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:list-bullets-bold" className="w-4 h-4" /></button>
                    <button type="button" onClick={() => document.execCommand('insertOrderedList', false, null)} className="p-1.5 text-gray-600 hover:bg-gray-200 rounded transition-colors"><Icon icon="ph:list-numbers-bold" className="w-4 h-4" /></button>
                  </div>
                </div>
                {/* Editor Area */}
                <div
                  ref={editorRef}
                  className="flex-1 p-6 bg-white outline-none overflow-y-auto"
                  contentEditable
                  suppressContentEditableWarning
                  onInput={(e) => setContent(e.currentTarget.innerHTML)}
                ></div>
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
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g., my-awesome-post"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-lilac/20 focus:border-brand-lilac bg-white shadow-sm"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Excerpt <span className="font-normal text-gray-500">(Add a short excerpt to summarise this post)</span>
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-lilac/20 focus:border-brand-lilac bg-white shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-bold font-secondary text-gray-800 mb-2">
                Cover Image
              </label>

              <div
                className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 h-48 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
                onClick={() => document.getElementById('cover-image-upload').click()}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Icon icon="ph:image-square-duotone" className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm font-bold font-secondary text-gray-500">Upload Image</span>
                  </>
                )}
              </div>
              <input
                id="cover-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
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

export default EditArticle;
