import React, { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, Film, ArrowRight } from 'lucide-react';
import docThumb from '../assets/images/project_doc_1792296098333.jpg';
import studioThumb from '../assets/images/project_studio_1792296120148.jpg';
import motionThumb from '../assets/images/project_motion_1792296139688.jpg';
import aiCinematicThumb from '../assets/images/project_aicinematic_1792296158501.jpg';
import jenniferAnistonThumb from '../assets/images/jennifer_aniston_doc_thumb_1792318325367.jpg';
import talkingHeadImanThumb from '../assets/images/talking_head_iman_thumb_1792319292714.jpg';
import pricingMotionThumb from '../assets/images/pricing_motion_thumb_1792318521249.jpg';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const reelSegments = [
    {
      title: "Documentary Biographical Arc",
      time: "00:00 — 00:45",
      thumb: jenniferAnistonThumb,
      highlight: "Emotional pacing, archival photo tracking, kinetic paper cutouts, and multi-track Foley sound design."
    },
    {
      title: "Talking-Head Creator Retention",
      time: "00:45 — 01:25",
      thumb: talkingHeadImanThumb,
      highlight: "Pattern interrupts, surgical vocal jump cuts, animated Premiere Pro icons, and textured luxury graphics."
    },
    {
      title: "Kinetic Motion & Title Design",
      time: "01:25 — 02:05",
      thumb: pricingMotionThumb,
      highlight: "3D typography sequences, banknote rotational choreography, barcode branding, and broadcast pacing."
    },
    {
      title: "AI Cinematic & Generative Integration",
      time: "02:05 — 02:45",
      thumb: aiCinematicThumb,
      highlight: "AI-generated world building, neural audio isolation, neo-noir color grading."
    }
  ];

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const currentSegment = reelSegments[activeSegmentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-showreel-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#111114] border border-[#27272a] rounded-xl max-w-5xl w-full text-white shadow-2xl overflow-hidden z-10 my-6">
        
        {/* Top Header */}
        <div className="bg-[#16161a] px-5 py-3.5 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
            <h3 id="modal-showreel-title" className="text-xs sm:text-sm font-extrabold uppercase font-mono tracking-wider text-white">
              Nouman Riaz &mdash; Master Showreel {new Date().getFullYear()}
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Showreel"
            className="p-1.5 rounded bg-[#27272a] hover:bg-[#3f3f46] text-[#d4d4d8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-black overflow-hidden border-b border-[#222226]">
          <img
            src={currentSegment.thumb}
            alt={currentSegment.title}
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : ''
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

          {/* Center Play Button Overlay */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dc2626]/90 hover:bg-[#dc2626] text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-105"
            aria-label="Toggle Playback"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Lower HUD Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
            <div className="bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded font-mono text-[#d4d4d8] border border-white/10">
              <span className="text-[#dc2626] font-bold">SEGMENT 0{activeSegmentIndex + 1}:</span>{' '}
              {currentSegment.title}
            </div>

            <div className="bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded font-mono text-[#a1a1aa] border border-white/10">
              {currentSegment.time}
            </div>
          </div>
        </div>

        {/* Segment Switcher Navigation (Interactive Chapters) */}
        <div className="p-4 sm:p-5 bg-[#141418] border-b border-[#222226]">
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#71717a] mb-2.5">
            Select Reel Chapter:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {reelSegments.map((seg, i) => (
              <button
                key={i}
                onClick={() => setActiveSegmentIndex(i)}
                className={`p-2.5 rounded text-left transition-all text-xs font-mono border ${
                  activeSegmentIndex === i
                    ? 'bg-[#1c1c22] border-[#dc2626] text-white shadow-md'
                    : 'bg-[#18181c] border-[#27272a] text-[#a1a1aa] hover:text-white hover:border-[#3f3f46]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-[#dc2626] font-semibold mb-1">
                  <span>0{i + 1}</span>
                  <span className="text-[#71717a]">{seg.time.split(' — ')[0]}</span>
                </div>
                <p className="font-sans font-medium line-clamp-1 text-white">
                  {seg.title}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Details & Direct WhatsApp/Inquiry Actions */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#111114]">
          <div>
            <p className="text-xs font-mono text-[#dc2626] uppercase">Active Chapter Breakdown</p>
            <p className="text-xs sm:text-sm text-[#d4d4d8] mt-1 max-w-xl">
              {currentSegment.highlight}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded text-xs font-medium text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold shadow-md transition-colors"
            >
              <span>Work With Nouman</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
