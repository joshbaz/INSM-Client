import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

const TierDetailModal = ({ tier, onClose, onDonate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    setIsPlaying(false);
  }, [tier]);

  if (!tier) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center gap-4 animate-modal-in z-10">
        {/* Main Content Card */}
        <div
          className="relative w-full bg-brand-white rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Image */}
          <div className="w-full h-32 md:h-40 relative shrink-0">
            <img
              src={tier.modalImage}
              alt={tier.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Area */}
          <div className="p-5 md:p-7 overflow-y-auto custom-scrollbar flex-1 flex flex-col items-center text-center">
            {/* Audio Player Container */}
            <div className="mb-4 w-full p-3 border border-gray-100 rounded-xl bg-brand-white shadow-sm flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-brand-lilac flex items-center justify-center text-brand-white hover:scale-105 transition-transform cursor-pointer shrink-0"
              >
                <Icon
                  icon={
                    isPlaying
                      ? "material-symbols:pause"
                      : "material-symbols:play-arrow"
                  }
                  width="24"
                />
              </button>

              <div className="grow">
                <div className="w-full h-7 bg-gray-50/50 flex items-center justify-center rounded overflow-hidden">
                  <div className="flex items-end gap-[2px] h-full py-2">
                    {[...Array(25)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 bg-brand-lilac/40 rounded-full transition-all duration-300 ${isPlaying ? "animate-waveform" : ""}`}
                        style={{
                          height: `${Math.random() * 60 + 20}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={tier.audioSrc}
                onEnded={() => setIsPlaying(false)}
              />
            </div>

            <div className="space-y-3 w-full">
              <div className="text-brand-dark/80 leading-relaxed font-secondary text-[12px] md:text-[13px]">
                {tier.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="mb-2">
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={() => {
                    onDonate && onDonate(tier);
                    onClose();
                  }}
                  className="bg-brand-lilac text-brand-white py-2.5 px-7 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-[11px] hover:bg-brand-lilac-600 transition-all shadow-md shadow-brand-lilac/20 active:scale-[0.98] cursor-pointer"
                >
                  Invest in a mother's future today
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button UI */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-0 md:-right-12 text-brand-white/80 hover:text-brand-white hover:scale-110 transition-all cursor-pointer p-2"
          aria-label="Close modal"
        >
          <Icon icon="ph:x-light" width="32" className="drop-shadow-lg" />
        </button>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes modal-in {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes animate-waveform {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
        .animate-waveform {
          animation: animate-waveform 1s ease-in-out infinite;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e2e2;
          border-radius: 10px;
        }
      `,
        }}
      />
    </div>
  );
};

export default TierDetailModal;
