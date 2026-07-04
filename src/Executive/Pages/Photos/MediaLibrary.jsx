import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const MediaLibrary = () => {
  const [activeTab, setActiveTab] = useState('ALL PHOTOS');

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isCreateAlbumModalOpen, setIsCreateAlbumModalOpen] = useState(false);
  const [albumToEdit, setAlbumToEdit] = useState(null);
  const [isUploadPhotoModalOpen, setIsUploadPhotoModalOpen] = useState(false);
  const [selectedFilePreview, setSelectedFilePreview] = useState(null);
  const [uploadPhotoName, setUploadPhotoName] = useState("");

  const [photoToEdit, setPhotoToEdit] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [selectedPhotoForGallery, setSelectedPhotoForGallery] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFilePreview(URL.createObjectURL(file));
      const fileNameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setUploadPhotoName(fileNameWithoutExt);
    }
  };

  const closeUploadModal = () => {
    setIsUploadPhotoModalOpen(false);
    setSelectedFilePreview(null);
    setUploadPhotoName("");
  };

  const stats = [
    {
      title: "Total Published",
      value: "10",
      description: "All photo's you have published on website."
    },
    {
      title: "Albums",
      value: "8",
      description: "Photo albums you have published on website."
    },
    {
      title: "Views",
      value: "2.4K",
      description: "Landed on your albums through website."
    }
  ];

  const photos = Array(8).fill({
    name: "Photo_05052026_UHD",
    format: "PNG",
    size: "20.70 KB",
    resolution: "600x450"
  });

  const albums = Array(8).fill(null).map((_, i) => ({
    name: `Album_${i + 1}`,
    isPublished: i % 2 === 0
  }));

  const renderPhotoCard = (photo, index) => (
    <div key={index} className="flex flex-col rounded-xl border border-brand-dark-200/20 overflow-hidden hover:shadow-md transition-shadow bg-white group">
      <div 
        className="w-full aspect-[4/3] bg-gray-100 relative cursor-pointer"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}
        onClick={() => setSelectedPhotoForGallery(photo)}
      >
        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={(e) => { e.stopPropagation(); setPhotoToEdit(photo); }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-brand-dark flex items-center justify-center shadow-sm backdrop-blur-sm transition-colors"
          >
            <Icon icon="ph:pencil-simple-bold" className="w-4 h-4" />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setPhotoToDelete(photo); }}
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-red-600 flex items-center justify-center shadow-sm backdrop-blur-sm transition-colors"
          >
            <Icon icon="ph:trash-bold" className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4 bg-white flex flex-col gap-1.5 border-t border-brand-dark-200/10">
        <h4 
          className="text-[14px] font-secondary font-bold text-brand-dark group-hover:text-brand-gold transition-colors truncate cursor-pointer"
          onClick={() => setSelectedPhotoForGallery(photo)}
        >
          {photo.name}
        </h4>
        <p className="text-[12px] font-secondary text-brand-dark-400">
          {photo.format} <span className="mx-1">|</span> {photo.size} <span className="mx-1">|</span> {photo.resolution}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] w-full flex flex-col gap-8 pb-10">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-brand-dark-200/20 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-[15px] font-secondary font-medium text-brand-dark mb-4">{stat.title}</h3>
              <p className="text-[32px] font-secondary font-bold text-brand-dark leading-none">{stat.value}</p>
            </div>
            <p className="text-[13px] font-secondary text-brand-dark-400 mt-6 max-w-[200px] leading-relaxed">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {selectedAlbum ? (
        <div className="flex flex-col gap-4">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-[14px] font-secondary">
            <span className="text-[#9E7B9D] hover:underline cursor-pointer transition-all">Home</span>
            <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-brand-dark-400" />
            <span 
              className="text-[#9E7B9D] hover:underline cursor-pointer transition-all"
              onClick={() => setSelectedAlbum(null)}
            >
              Media library
            </span>
            <Icon icon="ph:caret-right-bold" className="w-3 h-3 text-brand-dark-400" />
            <span className="text-brand-dark font-medium">{selectedAlbum.name}</span>
          </div>

          {/* Album Content Box */}
          <div className="bg-white rounded-xl border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col">
            <div className="flex flex-col sm:flex-row items-center justify-between border-b border-brand-dark-200/20 p-4">
              <h2 className="text-[16px] font-secondary font-bold text-brand-dark pl-2">{selectedAlbum.name}</h2>
              <button 
                onClick={() => setIsUploadPhotoModalOpen(true)}
                className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold flex items-center gap-2 transition-colors shadow-sm"
              >
                <Icon icon="ph:plus-bold" className="w-4 h-4" />
                UPLOAD NEW PHOTO
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo, index) => renderPhotoCard(photo, index))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-brand-dark-200/20 shadow-sm overflow-hidden flex flex-col">
          
          {/* Tabs & Upload Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-brand-dark-200/20 p-2 pl-0 gap-4 sm:gap-0">
            <div className="flex items-center">
              <button
                onClick={() => setActiveTab('ALL PHOTOS')}
                className={`px-8 py-3.5 text-[13px] font-secondary font-semibold tracking-wider transition-colors ${
                  activeTab === 'ALL PHOTOS' 
                    ? 'bg-[#7E9C9F] text-white rounded-r-md' 
                    : 'text-brand-dark-400 hover:text-brand-dark'
                }`}
              >
                ALL PHOTOS
              </button>
              <button
                onClick={() => setActiveTab('ALBUMS')}
                className={`px-8 py-3.5 text-[13px] font-secondary font-semibold tracking-wider transition-colors ${
                  activeTab === 'ALBUMS' 
                    ? 'bg-[#7E9C9F] text-white rounded-r-md' 
                    : 'text-brand-dark-400 hover:text-brand-dark'
                }`}
              >
                ALBUMS
              </button>
            </div>
            <div className="pr-4 pb-2 sm:pb-0">
              {activeTab === 'ALL PHOTOS' ? (
                <button 
                  onClick={() => setIsUploadPhotoModalOpen(true)}
                  className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Icon icon="ph:plus-bold" className="w-4 h-4" />
                  UPLOAD NEW PHOTO
                </button>
              ) : (
                <button 
                  onClick={() => setIsCreateAlbumModalOpen(true)}
                  className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Icon icon="ph:plus-bold" className="w-4 h-4" />
                  CREATE NEW ALBUM
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeTab === 'ALL PHOTOS' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {photos.map((photo, index) => renderPhotoCard(photo, index))}
              </div>
            )}

            {activeTab === 'ALBUMS' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl border border-brand-dark-200/20 bg-white hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="flex items-center gap-4">
                    <Icon icon="ph:folder-fill" className="w-8 h-8 text-[#545454]" />
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-[14px] font-secondary font-bold text-brand-dark group-hover:text-brand-gold transition-colors">
                        {album.name}
                      </span>
                      {album.isPublished ? (
                        <span className="text-[11px] font-secondary font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-md border border-green-200/60 leading-none">
                          Published
                        </span>
                      ) : (
                        <span className="text-[11px] font-secondary font-medium text-brand-gold bg-[#F3EAD3]/50 px-2 py-0.5 rounded-md border border-brand-gold/30 leading-none">
                          Draft
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setAlbumToEdit(album);
                    }}
                    className="p-2 text-brand-dark-400 hover:text-brand-dark hover:bg-brand-dark-200/20 rounded-lg transition-colors"
                  >
                    <Icon icon="ph:pencil-simple-bold" className="w-5 h-5" />
                  </button>
                </div>
              ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Album Modal */}
      {isCreateAlbumModalOpen && (
        <div className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-dark-200/10">
              <h2 className="text-[18px] font-secondary font-bold text-brand-dark">Create New Album</h2>
              <button 
                onClick={() => setIsCreateAlbumModalOpen(false)}
                className="text-brand-dark-400 hover:text-brand-dark transition-colors"
              >
                <Icon icon="ph:x-bold" className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-5 flex flex-col gap-4">
              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Album Name</label>
                <input 
                  type="text" 
                  placeholder="Enter album name" 
                  className="w-full border border-brand-dark-200/20 rounded-lg px-4 py-2.5 text-[14px] font-secondary text-brand-dark focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
            </div>
            {/* Footer */}
            <div className="p-5 border-t border-brand-dark-200/10 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => setIsCreateAlbumModalOpen(false)}
                className="px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold text-brand-dark hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsCreateAlbumModalOpen(false)}
                className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold transition-colors shadow-sm"
              >
                Create Album
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Album Modal */}
      {albumToEdit && (
        <div className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-dark-200/10">
              <h2 className="text-[18px] font-secondary font-bold text-brand-dark">Edit Album</h2>
              <button 
                onClick={() => setAlbumToEdit(null)}
                className="text-brand-dark-400 hover:text-brand-dark transition-colors"
              >
                <Icon icon="ph:x-bold" className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-5 flex flex-col gap-6">
              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Album Name</label>
                <input 
                  type="text" 
                  defaultValue={albumToEdit.name}
                  placeholder="Enter album name" 
                  className="w-full border border-brand-dark-200/20 rounded-lg px-4 py-2.5 text-[14px] font-secondary text-brand-dark focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-2">Publish Status</label>
                <div className="flex items-center gap-3">
                  <button 
                    className={`flex-1 py-2.5 rounded-lg border text-[13px] font-secondary font-semibold transition-all ${
                      albumToEdit.isPublished 
                        ? 'bg-green-50 border-green-300 text-green-700 shadow-sm' 
                        : 'bg-white border-brand-dark-200/20 text-brand-dark-400 hover:bg-gray-50'
                    }`}
                  >
                    Published
                  </button>
                  <button 
                    className={`flex-1 py-2.5 rounded-lg border text-[13px] font-secondary font-semibold transition-all ${
                      !albumToEdit.isPublished 
                        ? 'bg-[#F3EAD3]/50 border-brand-gold/40 text-brand-gold shadow-sm' 
                        : 'bg-white border-brand-dark-200/20 text-brand-dark-400 hover:bg-gray-50'
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </div>
            </div>
            {/* Footer */}
            <div className="p-5 border-t border-brand-dark-200/10 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => setAlbumToEdit(null)}
                className="px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold text-brand-dark hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setAlbumToEdit(null)}
                className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {isUploadPhotoModalOpen && (
        <div className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-brand-dark-200/10">
              <h2 className="text-[18px] font-secondary font-bold text-brand-dark">Upload New Photo</h2>
              <button 
                onClick={closeUploadModal}
                className="text-brand-dark-400 hover:text-brand-dark transition-colors"
              >
                <Icon icon="ph:x-bold" className="w-5 h-5" />
              </button>
            </div>
            {/* Body */}
            <div className="p-5 flex flex-col gap-5">
              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Photo Name</label>
                <input 
                  type="text" 
                  value={uploadPhotoName}
                  onChange={(e) => setUploadPhotoName(e.target.value)}
                  placeholder="Enter photo name" 
                  className="w-full border border-brand-dark-200/20 rounded-lg px-4 py-2.5 text-[14px] font-secondary text-brand-dark focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Assign to Album (Optional)</label>
                <div className="relative">
                  <select 
                    defaultValue={selectedAlbum ? selectedAlbum.name : ""}
                    className="w-full border border-brand-dark-200/20 rounded-lg px-4 py-2.5 text-[14px] font-secondary text-brand-dark focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none cursor-pointer bg-white"
                  >
                    <option value="">Do not assign</option>
                    {albums.map((album, idx) => (
                      <option key={idx} value={album.name}>{album.name}</option>
                    ))}
                  </select>
                  <Icon icon="ph:caret-down-bold" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Photo File</label>
                {selectedFilePreview ? (
                  <div className="relative border border-brand-dark-200/20 rounded-xl overflow-hidden group">
                    <img src={selectedFilePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <div className="absolute inset-0 bg-brand-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => {
                          setSelectedFilePreview(null);
                          setUploadPhotoName("");
                        }}
                        className="bg-white hover:bg-gray-100 text-brand-dark px-4 py-2 rounded-full text-[13px] font-secondary font-semibold transition-colors shadow-sm flex items-center gap-2"
                      >
                        <Icon icon="ph:trash-bold" className="w-4 h-4" />
                        Remove Photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="border-2 border-dashed border-brand-dark-200/40 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center p-8 gap-3 relative overflow-hidden">
                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} />
                    <div className="w-12 h-12 rounded-full bg-[#9E7B9D]/10 text-[#9E7B9D] flex items-center justify-center pointer-events-none">
                      <Icon icon="ph:upload-simple-bold" className="w-6 h-6" />
                    </div>
                    <div className="text-center flex flex-col gap-1 pointer-events-none">
                      <span className="text-[14px] font-secondary font-bold text-brand-dark">Click to upload or drag and drop</span>
                      <span className="text-[12px] font-secondary text-brand-dark-400">PNG, JPG, JPEG (max. 10MB)</span>
                    </div>
                  </label>
                )}
              </div>
            </div>
            {/* Footer */}
            <div className="p-5 border-t border-brand-dark-200/10 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={closeUploadModal}
                className="px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold text-brand-dark hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={closeUploadModal}
                className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold transition-colors shadow-sm"
              >
                Upload Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox / Gallery Popup */}
      {selectedPhotoForGallery && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center backdrop-blur-sm p-4">
          <button 
            onClick={() => setSelectedPhotoForGallery(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
          >
            <Icon icon="ph:x-bold" className="w-8 h-8" />
          </button>
          
          <div className="w-full max-w-[800px] flex flex-col items-center gap-4">
            <div 
              className="w-full aspect-[4/3] bg-gray-100 rounded-lg shadow-2xl relative"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                  linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                  linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)`,
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
            />
            <div className="text-white text-center flex flex-col gap-1 w-full">
              <span className="text-[18px] font-secondary font-bold">{selectedPhotoForGallery.name}</span>
              <span className="text-[14px] font-secondary text-white/70">
                {selectedPhotoForGallery.format} • {selectedPhotoForGallery.size} • {selectedPhotoForGallery.resolution}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Photo Modal */}
      {photoToEdit && (
        <div className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-brand-dark-200/10">
              <h2 className="text-[18px] font-secondary font-bold text-brand-dark">Edit Photo</h2>
              <button 
                onClick={() => setPhotoToEdit(null)}
                className="text-brand-dark-400 hover:text-brand-dark transition-colors"
              >
                <Icon icon="ph:x-bold" className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex flex-col gap-5">
              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Photo Name</label>
                <input 
                  type="text" 
                  defaultValue={photoToEdit.name}
                  className="w-full border border-brand-dark-200/20 rounded-lg px-4 py-2.5 text-[14px] font-secondary text-brand-dark focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>

              <div>
                <label className="block text-[13px] font-secondary font-semibold text-brand-dark mb-1.5">Album Assignment</label>
                <div className="relative">
                  <select 
                    defaultValue={selectedAlbum ? selectedAlbum.name : ""}
                    className="w-full border border-brand-dark-200/20 rounded-lg px-4 py-2.5 text-[14px] font-secondary text-brand-dark focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all appearance-none cursor-pointer bg-white"
                  >
                    <option value="">No Album</option>
                    {albums.map((album, idx) => (
                      <option key={idx} value={album.name}>{album.name}</option>
                    ))}
                  </select>
                  <Icon icon="ph:caret-down-bold" className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dark-400 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-brand-dark-200/10 flex justify-end gap-3 bg-gray-50">
              <button 
                onClick={() => setPhotoToEdit(null)}
                className="px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold text-brand-dark hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setPhotoToEdit(null)}
                className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Photo Confirmation Modal */}
      {photoToDelete && (
        <div className="fixed inset-0 bg-brand-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl overflow-hidden flex flex-col items-center p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
              <Icon icon="ph:trash-bold" className="w-7 h-7" />
            </div>
            <h2 className="text-[18px] font-secondary font-bold text-brand-dark mb-2">Delete Photo</h2>
            <p className="text-[13px] font-secondary text-brand-dark-400 mb-6">
              Are you sure you want to delete <span className="font-bold text-brand-dark">"{photoToDelete.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex w-full gap-3">
              <button 
                onClick={() => setPhotoToDelete(null)}
                className="flex-1 py-2.5 rounded-full text-[13px] font-secondary font-semibold text-brand-dark bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setPhotoToDelete(null)}
                className="flex-1 py-2.5 rounded-full text-[13px] font-secondary font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
