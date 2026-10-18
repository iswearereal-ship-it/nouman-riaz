import React from 'react';
import { SERVICES, Service } from '../data/portfolioData';
import { Film, Youtube, Smartphone, Mic, Sparkles, Wand2, Check, ArrowUpRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForInquiry }) => {
  const serviceIcons: Record<string, React.ReactNode> = {
    documentary: <Film className="w-5 h-5 text-[#dc2626]" />,
    youtube: <Youtube className="w-5 h-5 text-[#dc2626]" />,
    'short-form': <Smartphone className="w-5 h-5 text-[#dc2626]" />,
    podcast: <Mic className="w-5 h-5 text-[#dc2626]" />,
    'motion-graphics': <Sparkles className="w-5 h-5 text-[#dc2626]" />,
    'ai-assisted': <Wand2 className="w-5 h-5 text-[#dc2626]" />,
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-28 bg-[#0c0c0e] text-white border-b border-[#222226] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#dc2626]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#a1a1aa]">
              Post-Production Services &middot; Offerings
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                What I Bring To Your Cut
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-xl">
                Purpose-built video editing services centered around storytelling, surgical pacing, pristine sound design, and audience retention.
              </p>
            </div>
            
            <a
              href="#contact"
              className="text-xs font-mono text-[#dc2626] hover:text-[#ef4444] transition-colors flex items-center gap-1.5"
            >
              <span>Custom Scope Request</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Services Grid (6 Core Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#141417] rounded-xl p-6 sm:p-7 border border-[#27272a] hover:border-[#3f3f46] transition-all flex flex-col justify-between group hover:shadow-2xl hover:shadow-black/60"
            >
              <div>
                {/* Header: Number & Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="p-2.5 rounded-lg bg-[#1c1c20] border border-[#2e2e33]">
                    {serviceIcons[service.id] || <Film className="w-5 h-5 text-[#dc2626]" />}
                  </div>
                  <span className="text-xl font-bold font-mono text-[#71717a] group-hover:text-[#dc2626] transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#dc2626] transition-colors mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6 pt-4 border-t border-[#222226]">
                  {service.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#d4d4d8]">
                      <Check className="w-3.5 h-3.5 text-[#dc2626] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom: Deliverables & Quick Inquire */}
              <div className="pt-4 border-t border-[#222226]">
                <p className="text-[11px] font-mono text-[#71717a] mb-3">
                  <strong className="text-[#a1a1aa]">Ideal for:</strong> {service.recommendedFor}
                </p>

                <button
                  onClick={() => onSelectServiceForInquiry(service.title)}
                  className="w-full py-2.5 px-3 rounded bg-[#1c1c20] hover:bg-[#dc2626] text-xs font-semibold text-[#f4f4f5] hover:text-white transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
