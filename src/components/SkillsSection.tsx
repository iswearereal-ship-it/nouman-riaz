import React from 'react';
import { SKILLS_DATA } from '../data/portfolioData';
import { Video, Cpu, Film, Mic, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  return (
    <section
      id="skills"
      className="py-20 sm:py-28 bg-[#0c0c0e] text-white border-b border-[#222226] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#dc2626]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#a1a1aa]">
              Capabilities &middot; Toolset
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                Skills &amp; Software
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-xl">
                An honest overview of my primary editing environments, narrative disciplines, and post-production capabilities.
              </p>
            </div>
            <p className="text-xs font-mono text-[#71717a] shrink-0">
              *Verified proficiency levels based on real production hours
            </p>
          </div>
        </div>

        {/* Section 1: Software Suite (Premiere Pro, CapCut, After Effects) */}
        <div className="mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa] mb-6 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#dc2626]" />
            <span>Editing Software &amp; Post-Production Suites</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SKILLS_DATA.software.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#141417] p-6 rounded-xl border border-[#27272a] hover:border-[#3f3f46] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h4 className="font-bold text-base sm:text-lg text-white">
                      {item.name}
                    </h4>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${
                        item.level === 'Advanced'
                          ? 'bg-[#dc2626]/20 text-[#ef4444] border border-[#dc2626]/30'
                          : 'bg-[#27272a] text-[#a1a1aa] border border-[#3f3f46]'
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Minimal Progress Indicator */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#71717a] mb-1.5">
                    <span>Proficiency</span>
                    <span>{item.level}</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#222226] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.level === 'Advanced' ? 'bg-[#dc2626]' : 'bg-[#71717a]'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Creative & Narrative Disciplines */}
        <div className="mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa] mb-6 flex items-center gap-2">
            <Film className="w-4 h-4 text-[#dc2626]" />
            <span>Primary Creative Disciplines</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS_DATA.creativeDisciplines.map((discipline, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-[#141417] border border-[#27272a] hover:border-[#dc2626]/40 transition-colors group"
              >
                <div className="flex items-center gap-2 text-white font-semibold text-sm mb-2 group-hover:text-[#ef4444] transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
                  <span>{discipline.title}</span>
                </div>
                <p className="text-xs text-[#a1a1aa] leading-relaxed">
                  {discipline.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Craft Pillars */}
        <div className="pt-8 border-t border-[#222226]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#71717a] mb-6 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#dc2626]" />
            <span>The Four Editorial Pillars</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS_DATA.craftPillars.map((pillar, idx) => (
              <div key={idx} className="border-l-2 border-[#27272a] pl-4 hover:border-[#dc2626] transition-colors">
                <span className="text-[10px] font-mono text-[#dc2626] tracking-wider uppercase block">
                  Pillar 0{idx + 1}
                </span>
                <p className="font-bold text-sm text-white mt-1">
                  {pillar.name}
                </p>
                <p className="text-xs text-[#a1a1aa] mt-1">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
