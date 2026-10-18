import React, { useState, useEffect } from 'react';
import { ABOUT_TEXT, PERSONAL_INFO, getCurrentYear } from '../data/portfolioData';
import { Check, Camera, RefreshCw, Film, Sparkles, Layers, Sliders } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [timecode, setTimecode] = useState('00:01:24:18');

  // Load custom real photo from localStorage if saved
  useEffect(() => {
    const saved = localStorage.getItem('nouman_real_original_photo');
    if (saved) {
      setUserPhoto(saved);
    }
  }, []);

  // Timecode counter for the motion graphics viewfinder
  useEffect(() => {
    let frame = 18;
    let sec = 24;
    const interval = setInterval(() => {
      frame += 1;
      if (frame >= 24) {
        frame = 0;
        sec += 1;
        if (sec >= 60) sec = 0;
      }
      const pad = (n: number) => n.toString().padStart(2, '0');
      setTimecode(`00:01:${pad(sec)}:${pad(frame)}`);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Handle direct file upload so Nouman's real face is NEVER altered by AI
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setUserPhoto(result);
          try {
            localStorage.setItem('nouman_real_original_photo', result);
          } catch {
            // quota handling
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    localStorage.removeItem('nouman_real_original_photo');
    setUserPhoto(null);
  };

  const dynamicTimeline = ABOUT_TEXT.getTimeline();
  const currentYear = getCurrentYear();

  return (
    <section
      id="about"
      className="py-20 sm:py-28 bg-[#fafaf9] text-[#18181b] border-b border-[#e4e4e7] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Subtitle */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#dc2626]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#71717a]">
              Background &middot; Philosophy
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c0c0e]">
            {ABOUT_TEXT.heading}
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left: Motion Graphics Photo Viewfinder Frame */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cinematic Motion Graphics Card */}
            <div className="relative rounded-2xl overflow-hidden bg-[#0c0c0e] border border-[#27272a] shadow-2xl p-2 group">
              
              {/* Outer Viewfinder Container */}
              <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#141417] flex items-center justify-center">
                
                {/* 4 Motion Graphics Viewfinder Corners */}
                <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#dc2626] z-20 pointer-events-none" />
                <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#dc2626] z-20 pointer-events-none" />
                <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#dc2626] z-20 pointer-events-none" />
                <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#dc2626] z-20 pointer-events-none" />

                {/* Top HUD Graphics Bar */}
                <div className="absolute top-4 inset-x-6 z-20 flex items-center justify-between text-[11px] font-mono text-white/90 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-ping" />
                    <span className="font-bold text-[#ef4444]">REC</span>
                    <span className="text-white/60">4K DCI</span>
                  </div>
                  <div className="text-[#a1a1aa] font-mono">
                    {timecode}
                  </div>
                </div>

                {/* The Photo or Upload Dropzone */}
                {userPhoto ? (
                  /* Display Nouman's 100% UNTOUCHED REAL PHOTO with Motion Graphics Overlays */
                  <div className="relative w-full h-full">
                    <img
                      src={userPhoto}
                      alt="Nouman Riaz - Professional Video Editor & Motion Graphics Artist"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle cinematic vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                    {/* Change Photo Button */}
                    <div className="absolute top-14 right-4 z-30">
                      <label
                        htmlFor="nouman-real-photo-input"
                        title="Click to change your photo"
                        className="cursor-pointer bg-black/80 hover:bg-[#dc2626] text-white text-[11px] font-mono px-3 py-1.5 rounded-md backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 shadow-lg"
                      >
                        <Camera className="w-3.5 h-3.5 text-[#ef4444]" />
                        <span>Change Photo</span>
                      </label>
                      <input
                        id="nouman-real-photo-input"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                    </div>
                  </div>
                ) : (
                  /* Upload Prompt Dropzone with Motion Graphics Graphics */
                  <div className="p-6 text-center space-y-4 relative z-10 w-full flex flex-col items-center justify-center">
                    
                    {/* Animated Center Focus Ring */}
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#dc2626]/80 flex items-center justify-center animate-[spin_20s_linear_infinite] p-2">
                      <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center">
                        <Camera className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="font-extrabold text-base text-white tracking-tight">
                        Apni Original Photo Add Karein
                      </p>
                      <p className="text-xs text-[#a1a1aa] max-w-xs mx-auto leading-relaxed">
                        Aapka real face 100% untouched rahega. Direct apni photo select karein, yeh graphics ke sath lag jayegi.
                      </p>
                    </div>

                    {/* One-Click Upload Button */}
                    <label
                      htmlFor="nouman-photo-uploader"
                      className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-bold font-mono tracking-wide shadow-lg shadow-red-950/60 transition-all active:scale-95"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Select Your Photo File</span>
                    </label>
                    <input
                      id="nouman-photo-uploader"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />

                    <p className="text-[10px] font-mono text-[#71717a]">
                      PNG ya JPG &middot; Saved securely in your browser
                    </p>
                  </div>
                )}

                {/* Lower-Third Motion Graphics Banner */}
                <div className="absolute bottom-4 inset-x-6 z-20 bg-black/85 backdrop-blur-md p-3.5 rounded-lg border border-white/10 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
                        <p className="font-extrabold text-base tracking-tight">NOUMAN RIAZ</p>
                      </div>
                      <p className="text-[11px] font-mono text-[#ef4444] uppercase tracking-wider mt-0.5 font-semibold">
                        Lead Video Editor &middot; Motion Artist
                      </p>
                    </div>

                    <div className="text-right font-mono text-[10px] text-[#a1a1aa]">
                      <span className="block text-white font-bold">SINCE 2021</span>
                      <span>5+ YRS CRAFT</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Guiding Principles */}
            <div className="bg-white p-6 rounded-xl border border-[#e4e4e7] shadow-sm space-y-3.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#71717a]">
                Core Editorial Priorities
              </h3>
              <ul className="space-y-2.5 text-xs text-[#3f3f46]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span><strong>Storytelling First:</strong> Pacing follows the emotional subtext and logic of the narrative.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span><strong>Sound Design Depth:</strong> Foley, room atmosphere, clean vocal EQ, and intentional silence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span><strong>Retention Without Gimmicks:</strong> Intentional cuts, visual re-hooks, and zero dead air.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span><strong>Visual Consistency:</strong> Natural skin tones, cohesive color science, and clean framing.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right: Authentic Biography & Evolution Timeline (Auto-Updating Every Year) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Story Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-[#3f3f46] leading-relaxed">
              <p className="text-[#09090b] font-medium leading-relaxed">
                {ABOUT_TEXT.paragraph1}
              </p>
              <p className="leading-relaxed">
                {ABOUT_TEXT.paragraph2}
              </p>
              <p className="text-sm sm:text-base text-[#52525b] leading-relaxed">
                {ABOUT_TEXT.paragraph3}
              </p>
            </div>

            {/* Clean Timeline: Auto-Updating dynamically every year */}
            <div className="mt-10 pt-10 border-t border-[#e4e4e7]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#71717a]">
                    Development Timeline
                  </h3>
                  <p className="text-[11px] text-[#a1a1aa] font-mono mt-0.5">
                    *Automated dynamic yearly progression
                  </p>
                </div>
                <span className="text-xs font-mono text-[#dc2626] font-bold">
                  2021 &mdash; {currentYear}
                </span>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#e4e4e7]">
                {dynamicTimeline.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node */}
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-white border-2 border-[#18181b] group-hover:border-[#dc2626] group-hover:bg-[#dc2626] transition-colors" />

                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#dc2626] font-semibold">
                        <span>{item.year}</span>
                        <span className="text-[#a1a1aa]">&middot;</span>
                        <span className="text-[#71717a] font-normal">{item.title}</span>
                      </div>
                      <p className="mt-1.5 text-xs sm:text-sm text-[#52525b] leading-normal">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote / Editorial Manifesto */}
            <div className="mt-10 p-5 rounded-lg bg-[#f4f4f5] border-l-4 border-[#dc2626] text-sm text-[#27272a] italic">
              &ldquo;Great editing isn't noticed by flashy transitions; it is felt through seamless emotion, rhythmic clarity, and stories that stay with the viewer long after the screen goes dark.&rdquo;
              <span className="block mt-1 font-mono not-italic text-xs text-[#71717a]">
                &mdash; Nouman Riaz
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
