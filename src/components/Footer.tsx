import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, MessageSquare, Youtube, Linkedin, Globe, Briefcase } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#08080a] text-[#a1a1aa] border-t border-[#1c1c20] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tier: Name, Description & Quick Nav */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#1c1c20] items-start">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#dc2626]" />
              <span className="text-xl font-extrabold text-white tracking-tight">
                NOUMAN RIAZ
              </span>
            </div>
            <p className="text-xs font-mono uppercase text-[#dc2626] tracking-wider">
              Video Editor &amp; Motion Graphics Artist
            </p>
            <p className="text-xs text-[#71717a] max-w-sm leading-relaxed">
              Crafting narrative documentaries, high-retention talking-head videos, podcasts, and kinetic motion design since 2021.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase text-white tracking-widest">
              Navigation
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles & WhatsApp */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase text-white tracking-widest">
              Connect Directly
            </p>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp message"
                className="w-8 h-8 rounded-lg bg-[#141417] border border-[#27272a] hover:border-[#dc2626] text-white flex items-center justify-center transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#dc2626]" />
              </a>

              {PERSONAL_INFO.socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-8 h-8 rounded-lg bg-[#141417] border border-[#27272a] hover:border-[#dc2626] text-[#a1a1aa] hover:text-white flex items-center justify-center transition-colors"
                >
                  {social.name === 'YouTube' && <Youtube className="w-4 h-4" />}
                  {social.name === 'LinkedIn' && <Linkedin className="w-4 h-4" />}
                  {social.name === 'Behance' && <Globe className="w-4 h-4" />}
                  {social.name === 'Upwork' && <Briefcase className="w-4 h-4" />}
                </a>
              ))}
            </div>
            <p className="text-[11px] font-mono text-[#71717a]">
              WhatsApp: {PERSONAL_INFO.whatsappNumber}
            </p>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717a]">
          <div>
            &copy; {new Date().getFullYear()} Nouman Riaz. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span>Portfolio &middot; Editorial Post-Production</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#a1a1aa] hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
