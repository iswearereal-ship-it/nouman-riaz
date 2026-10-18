import React, { useState } from 'react';
import { X, Play, Clock, Film, Sliders, Volume2, Sparkles, AlertCircle, Layers, ArrowRight } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  if (!project) return null;

  const [activeTab, setActiveTab] = useState<'preview' | 'before-after' | 'breakdown'>('preview');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Background click backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-[#121214] border border-[#27272a] rounded-xl max-w-4xl w-full text-white shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Control Bar */}
        <div className="bg-[#18181c] px-4 py-3 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span className="text-xs font-mono uppercase text-[#a1a1aa] tracking-wider">
              {project.category} &middot; {project.duration}
            </span>
            {project.isPlaceholder && (
              <span className="text-[10px] font-mono bg-[#27272a] text-[#a1a1aa] px-2 py-0.5 rounded border border-[#3f3f46]">
                Portfolio Slot
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="p-1.5 rounded bg-[#27272a] hover:bg-[#3f3f46] text-[#d4d4d8] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media / Player Viewport */}
        <div className="relative bg-black aspect-video w-full overflow-hidden border-b border-[#222226]">
          {activeTab === 'before-after' && project.beforeAfter ? (
            /* Interactive Before/After Comparison View */
            <div className="relative w-full h-full select-none overflow-hidden">
              {/* After Image (Full color grade) */}
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Before Image (Desaturated Flat Log Camera simulation) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={project.thumbnail}
                  alt="Raw Flat Log Camera Feed"
                  className="w-full h-full object-cover filter contrast-75 brightness-110 saturate-[0.25]"
                  style={{
                    width: '100%',
                    maxWidth: 'none',
                    minWidth: '100%',
                  }}
                />
                <div className="absolute top-4 left-4 bg-black/80 px-2.5 py-1 rounded text-[11px] font-mono text-[#a1a1aa] border border-white/15">
                  RAW LOG FOOTAGE
                </div>
              </div>

              {/* After Label */}
              <div className="absolute top-4 right-4 bg-[#dc2626]/90 px-2.5 py-1 rounded text-[11px] font-mono text-white font-semibold shadow-md">
                FINAL GRADE &amp; SOUND
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize shadow-2xl"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-xs font-bold shadow-xl border-2 border-black">
                  ↔
                </div>
              </div>

              {/* Range Input Overlay for Dragging */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label="Before and after color grade comparison slider"
                className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
              />

              <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                <span className="bg-black/70 backdrop-blur-sm text-[11px] text-white/90 px-3 py-1 rounded-full font-mono">
                  Drag slider horizontally to compare Raw Log vs. Finished Grade
                </span>
              </div>
            </div>
          ) : (
            /* Main Video Showcase Preview */
            <div className="relative w-full h-full flex items-center justify-center group">
              <img
                src={project.thumbnail}
                alt={project.title}
                className={`w-full h-full object-cover transition-all ${
                  isPlayingSimulation ? 'scale-105 duration-1000' : ''
                }`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Play Simulation Button */}
              <button
                onClick={() => setIsPlayingSimulation(!isPlayingSimulation)}
                className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dc2626] hover:bg-[#b91c1c] text-white flex items-center justify-center shadow-2xl shadow-red-950/80 transition-transform hover:scale-105 active:scale-95"
                aria-label="Toggle Playback Preview"
              >
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </button>

              {/* Lower HUD Overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
                <div className="bg-black/70 px-3 py-1.5 rounded font-mono text-[#a1a1aa] border border-white/10">
                  <span>Aspect: {project.aspectRatio}</span>
                  <span className="mx-2">&middot;</span>
                  <span>Audio: Stereo 48kHz</span>
                </div>

                <div className="bg-[#dc2626]/80 text-white font-mono px-2.5 py-1 rounded text-[11px]">
                  {project.duration}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Switcher Tabs */}
        <div className="px-6 pt-4 border-b border-[#222226] flex items-center gap-2">
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-[#dc2626] text-white'
                : 'border-transparent text-[#a1a1aa] hover:text-white'
            }`}
          >
            Project Overview
          </button>

          {project.beforeAfter && (
            <button
              onClick={() => setActiveTab('before-after')}
              className={`pb-3 text-xs font-medium border-b-2 transition-colors ${
                activeTab === 'before-after'
                  ? 'border-[#dc2626] text-white'
                  : 'border-transparent text-[#a1a1aa] hover:text-white'
              }`}
            >
              Before &amp; After Grade
            </button>
          )}

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors ${
              activeTab === 'breakdown'
                ? 'border-[#dc2626] text-white'
                : 'border-transparent text-[#a1a1aa] hover:text-white'
            }`}
          >
            Editing Breakdown
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 max-h-[45vh] overflow-y-auto space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#dc2626] mb-1">
              <span>{project.category}</span>
              <span className="text-[#71717a]">&middot;</span>
              <span className="text-[#a1a1aa]">{project.role}</span>
            </div>
            <h3 id="modal-project-title" className="text-xl sm:text-2xl font-bold text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-[#d4d4d8] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Detailed Breakdown Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#222226]">
            <div className="p-4 rounded-lg bg-[#18181c] border border-[#27272a]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase mb-1">
                <Sliders className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>Pacing &amp; Rhythm</span>
              </div>
              <p className="text-xs text-[#d4d4d8] leading-normal">
                {project.breakdown.pacingNotes}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#18181c] border border-[#27272a]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase mb-1">
                <Volume2 className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>Sound Design</span>
              </div>
              <p className="text-xs text-[#d4d4d8] leading-normal">
                {project.breakdown.soundDesign}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#18181c] border border-[#27272a]">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>Color &amp; Finishing</span>
              </div>
              <p className="text-xs text-[#d4d4d8] leading-normal">
                {project.breakdown.colorGrading}
              </p>
            </div>
          </div>

          {/* Software used indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#222226] text-xs text-[#a1a1aa]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#71717a]">Software:</span>
              <div className="flex items-center gap-1.5 text-white">
                {project.software.map((sw, i) => (
                  <span key={i} className="bg-[#222226] px-2 py-0.5 rounded text-[11px] font-mono">
                    {sw}
                  </span>
                ))}
              </div>
            </div>

            {project.isPlaceholder && (
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#a1a1aa]">
                <AlertCircle className="w-3.5 h-3.5 text-yellow-500/80" />
                <span>Ready to be replaced with your direct YouTube/Vimeo embed URL</span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#18181c] px-6 py-4 border-t border-[#27272a] flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-xs font-medium text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors"
          >
            Close View
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="flex items-center gap-2 px-5 py-2 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold shadow-md transition-colors"
          >
            <span>Inquire About Similar Edit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
