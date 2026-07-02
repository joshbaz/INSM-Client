import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const MediaLibrary = () => {
  const [activeTab, setActiveTab] = useState('ALL PHOTOS');

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

      {/* Main Content Area */}
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
            <button className="bg-[#9E7B9D] hover:bg-[#8d6d8c] text-white px-5 py-2.5 rounded-full text-[13px] font-secondary font-semibold flex items-center gap-2 transition-colors shadow-sm">
              <Icon icon="ph:plus-bold" className="w-4 h-4" />
              UPLOAD NEW PHOTO
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="flex flex-col rounded-xl border border-brand-dark-200/20 overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-white group">
                {/* Checkered Placeholder Image */}
                <div 
                  className="w-full aspect-[4/3] bg-gray-100 relative"
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
                
                {/* Photo Details */}
                <div className="p-4 bg-white flex flex-col gap-1.5 border-t border-brand-dark-200/10">
                  <h4 className="text-[14px] font-secondary font-bold text-brand-dark group-hover:text-brand-gold transition-colors truncate">
                    {photo.name}
                  </h4>
                  <p className="text-[12px] font-secondary text-brand-dark-400">
                    {photo.format} <span className="mx-1">|</span> {photo.size} <span className="mx-1">|</span> {photo.resolution}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLibrary;
