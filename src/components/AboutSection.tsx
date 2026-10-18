import React from 'react';
import { ABOUT_TEXT, PERSONAL_INFO, getCurrentYear } from '../data/portfolioData';
import { Check, Film, Sliders } from 'lucide-react';

export const AboutSection: React.FC = () => {
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
          
          {/* Left: Editorial Studio Identity & Principles */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121214] text-white p-7 rounded-xl border border-[#27272a] shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#222226] pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
                  <span className="font-extrabold text-xl tracking-tight text-white">
                    NOUMAN RIAZ
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#a1a1aa] uppercase tracking-wider">
                  Post-Production
                </span>
              </div>

              <div>
                <p className="text-xs font-mono uppercase text-[#dc2626] tracking-wider font-semibold">
                  Video Editor &amp; Motion Graphics Artist
                </p>
                <p className="text-xs text-[#a1a1aa] mt-2 leading-relaxed">
                  Crafting narrative documentaries, high-retention talking-head creator videos, multi-track podcasts, and kinetic motion design.
                </p>
              </div>

              <div className="pt-4 border-t border-[#222226] grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[#71717a] block text-[10px] uppercase tracking-wider">Active In Craft</span>
                  <span className="text-white font-bold text-sm">Since 2021</span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[10px] uppercase tracking-wider">Direct Availability</span>
                  <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Open For Work
                  </span>
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
