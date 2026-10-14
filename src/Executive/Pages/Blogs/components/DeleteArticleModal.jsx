import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useArticleImages } from "../../../../store/tanstackStore/services/queries";
import api from "../../../../store/tanstackStore/services/api";

const AttachedImages = ({ images, isLoading, deleteImages, setDeleteImages }) => {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-xs font-secondary text-gray-400 mb-8">
        <Icon icon="ph:spinner-gap-bold" className="w-4 h-4 animate-spin" />
        Checking attached images...
      </div>
    );
  }

  if (!images || images.length === 0) {
    return <p className="text-xs font-secondary text-gray-400 mb-8">This story has no attached images.</p>;
  }

  const removableCount = images.filter((image) => image.usedBy.length === 0).length;

  return (
    <div className="mb-8">
      <label className={`flex items-center gap-3 mb-4 ${removableCount ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`}>
        <input
          type="checkbox"
          checked={deleteImages}
          disabled={!removableCount}
          onChange={(e) => setDeleteImages(e.target.checked)}
          className="w-4 h-4 accent-[#EF4444]"
        />
        <span className="text-sm font-secondary font-bold text-gray-800">
          Also delete {removableCount} attached image{removableCount === 1 ? "" : "s"}
        </span>
      </label>

      <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
        {images.map((image) => {
          const isShared = image.usedBy.length > 0;
          const willDelete = deleteImages && !isShared;
          return (
            <div key={image.id} className="flex flex-col gap-1">
              <div
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                  willDelete ? "border-[#EF4444]" : "border-gray-100"
                }`}
              >
                <img
                  src={`${api.defaults.baseURL}/photos/${image.id}/view`}
                  alt={image.name || "Attached image"}
                  className={`w-full h-full object-cover ${willDelete ? "opacity-60" : ""}`}
                />
                {image.isCover && (
                  <span className="absolute top-1 left-1 bg-brand-lilac text-white text-[10px] font-bold font-secondary px-1.5 py-0.5 rounded">
                    COVER
                  </span>
                )}
                {willDelete && (
                  <Icon icon="ph:trash-bold" className="absolute top-1 right-1 w-4 h-4 text-white drop-shadow" />
                )}
              </div>
              {isShared && (
                <span className="text-[10px] font-secondary text-gray-500 leading-tight" title={image.usedBy.join(", ")}>
                  Kept — also used in "{image.usedBy[0]}"{image.usedBy.length > 1 ? ` +${image.usedBy.length - 1}` : ""}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DeleteDialog = ({ article, onCancel, onConfirm, isDeleting }) => {
  const [deleteImages, setDeleteImages] = useState(false);
  const { data: images, isLoading } = useArticleImages(article.id);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-[60]"
        onClick={isDeleting ? undefined : onCancel}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 pointer-events-auto">
          <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-5">
            <Icon icon="ph:trash-bold" className="w-6 h-6 text-[#EF4444]" />
          </div>
          <h2 className="text-lg font-secondary font-bold text-gray-900 mb-2">Delete this story?</h2>
          <p className="text-sm font-secondary text-gray-500 mb-6">
            <strong className="text-gray-800">"{article.title}"</strong> will be permanently removed
            {article.status === "PUBLISHED" ? " from the website" : ""}. This can't be undone.
          </p>

          <AttachedImages
            images={images}
            isLoading={isLoading}
            deleteImages={deleteImages}
            setDeleteImages={setDeleteImages}
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(deleteImages)}
              disabled={isDeleting}
              className="px-5 py-2.5 rounded-full bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold font-secondary tracking-widest uppercase transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : deleteImages ? "Delete story & images" : "Delete story"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteArticleModal = ({ article, ...props }) => {
  if (!article) return null;

  // Keyed so the checkbox resets for each article
  return <DeleteDialog key={article.id} article={article} {...props} />;
};

export default DeleteArticleModal;
