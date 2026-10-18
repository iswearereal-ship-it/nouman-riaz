import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, ArrowDown, Film, Sparkles, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, getExperienceYears } from '../data/portfolioData';
import talkingHeadImanThumb from '../assets/images/talking_head_iman_thumb_1792319292714.jpg';

interface HeroSectionProps {
  onOpenShowreel: () => void;
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenShowreel, onOpenContact }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Simulated running timecode for cinematic editor authenticity
  useEffect(() => {
    let frame = 18;
    let sec = 24;
    let min = 1;

    const interval = setInterval(() => {
      if (!isPlaying) return;
      frame += 1;
      if (frame >= 24) {
        frame = 0;
        sec += 1;
        if (sec >= 60) {
          sec = 0;
          min += 1;
        }
      }
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`00:${pad(min)}:${pad(sec)}:${pad(frame)}`);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 bg-[#0c0c0e] text-white overflow-hidden border-b border-[#222226]"
    >
      {/* Background ambient lighting - minimal deep charcoal vignette */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-950/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-neutral-900/40 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Editorial Kicker */}
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-[#a1a1aa] tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-pulse" />
              <span>Nouman Riaz &middot; Video Editor &amp; Motion Artist</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              I Turn Raw Footage Into{' '}
              <span className="relative inline-block text-white">
                Stories That Matter.
                <span className="absolute left-0 bottom-1 w-full h-[3px] bg-[#dc2626]" />
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed mb-8 max-w-xl">
              {PERSONAL_INFO.heroSupportingText}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-white text-[#0c0c0e] hover:bg-[#e4e4e7] font-semibold text-sm tracking-wide transition-all shadow-lg shadow-white/5 active:scale-[0.98]"
              >
                View My Work
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-red-950/50 hover:shadow-red-900/70 active:scale-[0.98]"
              >
                Let's Work Together
              </button>
            </div>

            {/* Authentic Quick Highlights */}
            <div className="pt-6 border-t border-[#222226] grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs font-mono text-[#71717a] uppercase tracking-wider">Experience</p>
                <p className="text-base sm:text-lg font-bold text-white mt-0.5">Since 2021</p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">{getExperienceYears()}+ Years Crafting</p>
              </div>
              <div>
                <p className="text-xs font-mono text-[#71717a] uppercase tracking-wider">Primary Tools</p>
                <p className="text-base sm:text-lg font-bold text-white mt-0.5">Premiere &amp; CapCut</p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Advanced Mastery</p>
              </div>
              <div>
                <p className="text-xs font-mono text-[#71717a] uppercase tracking-wider">Turnaround</p>
                <p className="text-base sm:text-lg font-bold text-white mt-0.5">Agile &amp; Paced</p>
                <p className="text-[11px] text-[#a1a1aa] mt-0.5">Retain Every Second</p>
              </div>
            </div>

          </div>

          {/* Right Column: Cinematic Showreel Player Card */}
          <div className="lg:col-span-6">
            <div className="relative group rounded-xl overflow-hidden bg-[#16161a] border border-[#27272a] shadow-2xl shadow-black/80 transition-all hover:border-[#3f3f46]">
              
              {/* Header Bar: Editor Monitor UI */}
              <div className="bg-[#121214] px-4 py-2.5 border-b border-[#222226] flex items-center justify-between text-xs font-mono text-[#a1a1aa]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60" />
                  </div>
                  <span className="text-[11px] text-[#d4d4d8] font-semibold pl-2">
                    SHOWREEL // TALKING-HEAD &amp; CREATOR CUT
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-[#dc2626] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-ping" />
                    REC
                  </span>
                  <span className="text-[#a1a1aa]">{timecode}</span>
                  <span className="text-[#71717a] hidden sm:inline">4K &middot; 24 FPS</span>
                </div>
              </div>

              {/* Video Thumbnail Screen */}
              <div className="relative aspect-video w-full bg-black overflow-hidden">
                <img
                  src={talkingHeadImanThumb}
                  alt="Nouman Riaz Talking-Head & Creator Video Editing Showcase"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                  loading="eager"
                />

                {/* Subtle Cinematic Vignette & Anamorphic Letterbox effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Center Big Play Button */}
                <button
                  onClick={onOpenShowreel}
                  aria-label="Play Nouman Riaz Master Showreel"
                  className="absolute inset-0 m-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dc2626]/90 hover:bg-[#dc2626] text-white flex items-center justify-center shadow-2xl shadow-red-950/80 transition-all duration-300 transform group-hover:scale-110 hover:shadow-red-700/50 focus:outline-none"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
                </button>

                {/* Lower HUD Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs pointer-events-none">
                  <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10 text-white">
                    <Film className="w-3.5 h-3.5 text-[#dc2626]" />
                    <span className="font-medium text-[11px]">Click to Watch Showreel Reel</span>
                  </div>

                  {/* Simulated Audio Spectrum Meters */}
                  <div className="flex items-end gap-0.5 h-4 bg-black/60 px-2 py-1 rounded border border-white/10">
                    <span className="w-1 bg-[#dc2626] h-3 animate-pulse" />
                    <span className="w-1 bg-[#dc2626] h-4 animate-pulse delay-75" />
                    <span className="w-1 bg-white h-2 animate-pulse delay-150" />
                    <span className="w-1 bg-[#dc2626] h-3.5 animate-pulse delay-100" />
                    <span className="w-1 bg-white h-2.5 animate-pulse delay-200" />
                  </div>
                </div>
              </div>

              {/* Scrubber & Control Footer */}
              <div className="p-3 bg-[#121214] border-t border-[#222226] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
                    title={isPlaying ? "Pause timeline timecode" : "Resume timeline timecode"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 text-[#a1a1aa] hover:text-white transition-colors"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[11px] font-mono text-[#71717a] hidden sm:inline">
                    TIMELINE: 02:45 TOTAL
                  </span>
                </div>

                <div className="flex-1 max-w-xs mx-2">
                  <div className="h-1 bg-[#27272a] rounded-full overflow-hidden relative">
                    <div className="h-full bg-[#dc2626] w-3/5 rounded-full" />
                  </div>
                </div>

                <button
                  onClick={onOpenShowreel}
                  className="flex items-center gap-1.5 text-xs font-medium text-[#d4d4d8] hover:text-white bg-[#1a1a20] px-3 py-1.5 rounded transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>Expand Reel</span>
                </button>
              </div>

            </div>

            {/* Editor Verification Tagline */}
            <p className="text-center text-xs text-[#71717a] mt-3 font-mono">
              Crafted with Adobe Premiere Pro, CapCut &amp; After Effects
            </p>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-16 sm:mt-20 flex justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-2 text-[#71717a] hover:text-white transition-colors"
            aria-label="Scroll to About section"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717a] group-hover:text-[#dc2626]">
              Explore Profile
            </span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#a1a1aa] group-hover:text-[#dc2626]" />
          </a>
        </div>

      </div>
    </section>
  );
};
