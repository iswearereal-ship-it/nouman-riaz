import React from 'react';
import { PERSONAL_INFO, CLIENT_PLACEHOLDER_INFO } from '../data/portfolioData';
import { Youtube, Linkedin, Globe, ShieldCheck, ArrowUpRight, MessageSquare, Briefcase } from 'lucide-react';

export const ClientsSection: React.FC = () => {
  return (
    <section
      id="clients"
      className="py-16 sm:py-24 bg-[#fafaf9] text-[#18181b] border-b border-[#e4e4e7] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#dc2626]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#71717a]">
              Trust &middot; Collaborations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0c0c0e]">
            {CLIENT_PLACEHOLDER_INFO.sectionTitle}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#52525b] max-w-2xl">
            {CLIENT_PLACEHOLDER_INFO.subtitle}
          </p>
        </div>

        {/* Professional Profiles Grid - LinkedIn Verified Profile */}
        <div className="mb-12">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#71717a] mb-4">
            Professional Profile &middot; Connect Online
          </h3>
          <div className="max-w-xl">
            {PERSONAL_INFO.socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 sm:p-6 rounded-xl bg-white border border-[#e4e4e7] hover:border-[#0077b5] transition-all group flex items-center justify-between shadow-sm hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-colors shrink-0">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-[#0c0c0e] group-hover:text-[#0077b5] transition-colors">
                        Nouman Riaz on LinkedIn
                      </p>
                      <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs font-mono text-[#71717a] mt-0.5">
                      {link.label}
                    </p>
                    <p className="text-[11px] text-[#52525b] mt-1">
                      Connect for video editing, post-production collaborations, and project inquiries
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#f4f4f5] group-hover:bg-[#0077b5] text-xs font-semibold text-[#18181b] group-hover:text-white transition-colors shrink-0 ml-3">
                  <span>Open Profile</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Honest Client Spotlight Slot (Zero fake claims, ready for real testimonials) */}
        <div className="rounded-xl bg-white border-2 border-dashed border-[#d4d4d8] p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#f4f4f5] text-[#dc2626] flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-[#0c0c0e] mb-2">
            Client Testimonials &amp; Creator Endorsements
          </h3>

          <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed mb-6 max-w-xl mx-auto">
            {CLIENT_PLACEHOLDER_INFO.notice}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#0c0c0e] hover:bg-[#dc2626] text-white text-xs font-semibold transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discuss Your Upcoming Video Project</span>
            </a>
          </div>

          <p className="mt-4 text-[11px] font-mono text-[#a1a1aa]">
            Real creator logos and review quotes will be placed here as partnerships complete.
          </p>
        </div>

      </div>
    </section>
  );
};
