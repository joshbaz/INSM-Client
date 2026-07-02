import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { useCreateTier, useUpdateTier, useDeleteTier } from "../../../../store/tanstackStore/services/queries";
import { useQueryClient } from "@tanstack/react-query";

const Toggle = ({ enabled, onChange, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={`relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-[#997B94]' : 'bg-gray-200'} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    onClick={() => !disabled && onChange(!enabled)}
  >
    <span
      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${enabled ? 'translate-x-4' : 'translate-x-0'}`}
    />
  </button>
);

const TierModal = ({ isOpen, onClose, tier, mode = 'create' }) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const fileInputRef = useRef(null);
  const audioRef = useRef(null);

  const createTier = useCreateTier();
  const updateTier = useUpdateTier();
  const deleteTier = useDeleteTier();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    subtitle: "",
    hookQuote: "",
    description: "",
    customPayment: false,
    premiumTier: false,
    audioFile: null,
    audioDescription: ""
  });
  
  const [fileToUpload, setFileToUpload] = useState(null);
  const [removeAudio, setRemoveAudio] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = (e) => {
    e.preventDefault();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (tier) {
      setFormData({
        title: tier.title || "",
        amount: tier.amount || "",
        subtitle: tier.subtitle || "",
        hookQuote: tier.hookQuote || "",
        description: tier.description || "",
        customPayment: tier.customPayment || false,
        premiumTier: tier.premiumTier || false,
        audioFile: tier.audioFileName || null,
        audioDescription: tier.audioDescription || ""
      });
    } else {
      setFormData({
        title: "", amount: "", subtitle: "", hookQuote: "", description: "", customPayment: false, premiumTier: false, audioFile: null, audioDescription: ""
      });
    }
    setFileToUpload(null);
    setRemoveAudio(false);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [tier, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileToUpload(file);
      setFormData({ ...formData, audioFile: file.name });
      setRemoveAudio(false);
    }
  };

  const handleRemoveAudio = () => {
    setFileToUpload(null);
    setFormData({ ...formData, audioFile: null });
    setRemoveAudio(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("amount", formData.amount);
    data.append("subtitle", formData.subtitle);
    data.append("hookQuote", formData.hookQuote);
    data.append("description", formData.description);
    data.append("customPayment", formData.customPayment);
    data.append("premiumTier", formData.premiumTier);
    data.append("audioDescription", formData.audioDescription);
    
    if (fileToUpload) {
      data.append("audioFile", fileToUpload);
    }
    if (removeAudio) {
      data.append("removeAudio", "true");
    }

    try {
      if (isEditMode) {
        await updateTier.mutateAsync({ id: tier.id, formData: data });
      } else {
        await createTier.mutateAsync(data);
      }
      // Force immediate cache invalidation and refetch
      await queryClient.invalidateQueries({ queryKey: ["tiers"], refetchType: 'all' });
      onClose();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  const handleDelete = async () => {
    if (!tier) return;
    try {
      await deleteTier.mutateAsync(tier.id);
      await queryClient.invalidateQueries({ queryKey: ["tiers"], refetchType: 'all' });
      onClose();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-brand-dark-900/40 backdrop-blur-[2px] z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[700px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-brand-dark-200/20 shrink-0">
          <div className="flex items-center gap-6">
            <button onClick={onClose} className="p-1.5 text-[#9BA1A6] hover:text-brand-dark transition-colors">
              <Icon icon="ph:x-bold" className="w-5 h-5" />
            </button>
            <h2 className="text-[17px] font-bold font-secondary text-brand-dark">
              {isViewMode ? "View Tier" : isEditMode ? "Edit Tier" : "Add New Tier"}
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditMode && (
              <button 
                onClick={handleDelete}
                disabled={deleteTier.isPending}
                className="px-5 py-2.5 rounded-full border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444]/5 text-xs font-bold tracking-widest transition-colors uppercase disabled:opacity-50"
              >
                {deleteTier.isPending ? "DELETING..." : "DELETE TIER"}
              </button>
            )}
            {isViewMode ? (
              <button 
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold tracking-widest transition-colors uppercase"
              >
                CLOSE
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                disabled={createTier.isPending || updateTier.isPending}
                className="px-5 py-2.5 rounded-full bg-[#997B94] hover:bg-[#866881] text-white text-xs font-bold tracking-widest transition-colors uppercase disabled:opacity-50"
              >
                {createTier.isPending || updateTier.isPending ? "SAVING..." : "SAVE & CLOSE"}
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto px-10 py-8 no-scrollbar flex flex-col gap-10">
          
          {/* Tier Details Section */}
          <section className="flex flex-col gap-6">
            <h3 className="text-xl font-bold font-secondary text-brand-dark">Tier Details</h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold font-secondary text-brand-dark/80">Title</label>
                <input 
                  type="text" 
                  placeholder="Enter tier title"
                  className={`w-full border border-brand-dark-200/20 rounded-md px-4 py-3 text-[14px] text-brand-dark placeholder-[#9BA1A6] focus:outline-none focus:border-[#997B94] ${isViewMode ? 'bg-gray-50' : ''}`}
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  readOnly={isViewMode}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold font-secondary text-brand-dark/80">Amount <span className="text-[#9BA1A6] font-normal">($)</span></label>
                <input 
                  type="text" 
                  placeholder="Enter amount"
                  className={`w-full border border-brand-dark-200/20 rounded-md px-4 py-3 text-[14px] text-brand-dark placeholder-[#9BA1A6] focus:outline-none focus:border-[#997B94] ${isViewMode ? 'bg-gray-50' : ''}`}
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  readOnly={isViewMode}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold font-secondary text-brand-dark/80">Subtitle</label>
                <input 
                  type="text" 
                  placeholder="Enter tier subtitle"
                  className={`w-full border border-brand-dark-200/20 rounded-md px-4 py-3 text-[14px] text-brand-dark placeholder-[#9BA1A6] focus:outline-none focus:border-[#997B94] ${isViewMode ? 'bg-gray-50' : ''}`}
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  readOnly={isViewMode}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-bold font-secondary text-brand-dark/80">Hook Quote</label>
                <input 
                  type="text" 
                  placeholder="Enter tier hook"
                  className={`w-full border border-brand-dark-200/20 rounded-md px-4 py-3 text-[14px] text-brand-dark placeholder-[#9BA1A6] focus:outline-none focus:border-[#997B94] ${isViewMode ? 'bg-gray-50' : ''}`}
                  value={formData.hookQuote}
                  onChange={(e) => setFormData({...formData, hookQuote: e.target.value})}
                  readOnly={isViewMode}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold font-secondary text-brand-dark/80">
                Tier Description Copy <span className="text-[#9BA1A6] font-medium">(Add a short excerpt to summarise this tier)</span>
              </label>
              <textarea 
                placeholder="Enter description"
                className={`w-full border border-brand-dark-200/20 rounded-md px-4 py-3 text-[14px] text-brand-dark placeholder-[#9BA1A6] focus:outline-none focus:border-[#997B94] min-h-[100px] resize-y ${isViewMode ? 'bg-gray-50' : ''}`}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                readOnly={isViewMode}
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[14px] font-bold font-secondary text-brand-dark/90">Custom Payment Input</label>
                <div className="flex items-start gap-3">
                  <Toggle enabled={formData.customPayment} onChange={(v) => setFormData({...formData, customPayment: v})} disabled={isViewMode} />
                  <p className="text-[13px] text-[#6B7280] font-medium leading-tight pt-0.5">
                    Adding this will include a custom amount text box on the donation form.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[14px] font-bold font-secondary text-brand-dark/90">Premium Tier</label>
                <div className="flex items-start gap-3">
                  <Toggle enabled={formData.premiumTier} onChange={(v) => setFormData({...formData, premiumTier: v})} disabled={isViewMode} />
                  <p className="text-[13px] text-[#6B7280] font-medium leading-tight pt-0.5">
                    Adding this will include a custom amount text box on the donation form.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Audio Assets Section */}
          <section className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold font-secondary text-brand-dark mb-1">Audio Assets</h3>
              <p className="text-[#6B7280] text-[13px] font-medium">Manage localized voice descriptions for this tier.</p>
            </div>

            {/* Audio File Box */}
            <div className={`border rounded-lg p-5 flex flex-col gap-4 ${formData.audioFile ? 'border-brand-dark-200/20 bg-white' : 'border-dashed border-brand-dark-200/40 bg-[#F9FAFB]'}`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-md flex items-center justify-center shrink-0 ${formData.audioFile ? 'bg-[#F3EAD3]' : 'bg-[#E5E7EB]'}`}>
                  <Icon icon="ph:microphone-fill" className={`w-5 h-5 ${formData.audioFile ? 'text-[#8C7030]' : 'text-brand-dark/60'}`} />
                </div>
                <div className="flex flex-col gap-1 pt-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-brand-dark">English Description (MP3, WAV)</span>
                    {!formData.audioFile && <span className="bg-[#E5E7EB] text-brand-dark/60 text-[10px] font-bold px-2 py-0.5 rounded">Empty</span>}
                  </div>
                </div>
              </div>

              {formData.audioFile ? (
                <div className="flex flex-col gap-3 border-t border-brand-dark-200/10 pt-4 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#6B7280] truncate max-w-[200px]">{formData.audioFile}</span>
                    <div className="flex items-center gap-3">
                      
                      {tier?.audioFileUrl && !fileToUpload && (
                        <audio 
                          ref={audioRef} 
                          src={`http://localhost:5000${tier.audioFileUrl}`} 
                          onEnded={() => setIsPlaying(false)} 
                          onTimeUpdate={handleTimeUpdate}
                          onLoadedMetadata={handleLoadedMetadata}
                          className="hidden" 
                        />
                      )}
                      
                      {!isViewMode && (
                        <>
                          <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[#6B7280] hover:text-brand-dark transition-colors"
                            title="Replace Audio"
                          >
                            <Icon icon="ph:arrows-clockwise-bold" className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={handleRemoveAudio}
                            className="text-[#EF4444] hover:text-[#DC2626] transition-colors"
                            title="Delete Audio"
                          >
                            <Icon icon="ph:trash-fill" className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Audio Player Controls */}
                  {tier?.audioFileUrl && !fileToUpload && (
                    <div className="flex items-center gap-3 bg-white border border-brand-dark-200/20 rounded-full px-4 py-2 mt-1">
                      <button 
                        onClick={togglePlay}
                        className="text-brand-dark hover:text-[#8C7030] transition-colors flex-shrink-0"
                        title={isPlaying ? "Pause Audio" : "Play Audio"}
                      >
                        <Icon icon={isPlaying ? "ph:pause-circle-fill" : "ph:play-circle-fill"} className="w-8 h-8" />
                      </button>
                      
                      <div className="text-[11px] font-bold font-secondary text-[#6B7280] w-10 text-right">
                        {formatTime(currentTime)}
                      </div>
                      
                      <div className="flex-1 flex items-center">
                        <input 
                          type="range" 
                          min="0" 
                          max={duration || 100} 
                          value={currentTime} 
                          onChange={handleSeek}
                          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#997B94]"
                        />
                      </div>
                      
                      <div className="text-[11px] font-bold font-secondary text-[#6B7280] w-10">
                        {formatTime(duration)}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-t border-dashed border-brand-dark-200/20 pt-4 mt-2 flex justify-center">
                  {!isViewMode ? (
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 text-[13px] font-bold text-brand-dark/70 hover:text-brand-dark transition-colors tracking-wide"
                    >
                      <Icon icon="ph:upload-simple-bold" className="w-4 h-4" />
                      Upload Audio
                    </button>
                  ) : (
                    <span className="text-[13px] font-bold text-brand-dark/40 tracking-wide">
                      No audio available
                    </span>
                  )}
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="audio/*"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold font-secondary text-brand-dark/80">
                Audio Description Copy <span className="text-[#9BA1A6] font-medium">(Add a short excerpt to summarise this tier)</span>
              </label>
              <textarea 
                placeholder="Enter description"
                className={`w-full border border-brand-dark-200/20 rounded-md px-4 py-3 text-[14px] text-brand-dark placeholder-[#9BA1A6] focus:outline-none focus:border-[#997B94] min-h-[140px] resize-y ${isViewMode ? 'bg-gray-50' : ''}`}
                value={formData.audioDescription}
                onChange={(e) => setFormData({...formData, audioDescription: e.target.value})}
                readOnly={isViewMode}
              />
            </div>
            
          </section>

          {/* Padding bottom to ensure scrolling works well */}
          <div className="h-4"></div>
        </div>
      </div>
    </>
  );
};

export default TierModal;
