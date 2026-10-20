/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ServicesSection } from './components/ServicesSection';
import { SkillsSection } from './components/SkillsSection';
import { ClientsSection } from './components/ClientsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ShowreelModal } from './components/ShowreelModal';
import { MacMiniStudioAnimation } from './components/MacMiniStudioAnimation';
import { Project } from './data/portfolioData';
import { Volume2, VolumeX } from 'lucide-react';
import { playHoverSound, playClickSound, setGlobalSoundMuted, isGlobalSoundMuted } from './utils/soundEffects';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string>('Documentary Video Editing');
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Global Interactive Sound Effects: Trigger on mouse hover over any interactive element
  useEffect(() => {
    let lastHoverTime = 0;

    const handleGlobalMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer, [data-interactive]');
      if (interactive) {
        const now = Date.now();
        // Debounce to prevent acoustic overlap
        if (now - lastHoverTime > 80) {
          lastHoverTime = now;
          playHoverSound();
        }
      }
    };

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const clickable = target.closest('button, a, [role="button"]');
      if (clickable) {
        playClickSound();
      }
    };

    window.addEventListener('mouseover', handleGlobalMouseOver);
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('mouseover', handleGlobalMouseOver);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForInquiry = (serviceTitle: string) => {
    setInquiryService(serviceTitle);
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleGlobalAudio = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    setGlobalSoundMuted(nextState);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#dc2626] selection:text-white relative">
      {/* Sticky Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      <main className="flex-1">
        {/* Hero with Headline, CTAs, and Interactive Reel Preview */}
        <HeroSection
          onOpenShowreel={() => setIsShowreelOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Authentic About Me with 2021 Development Timeline */}
        <AboutSection />

        {/* Featured Projects Gallery with Before/After Grade Comparison */}
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />

        {/* 6 Core Post-Production Services */}
        <ServicesSection onSelectServiceForInquiry={handleSelectServiceForInquiry} />

        {/* Software & Skills Honest Breakdown */}
        <SkillsSection />

        {/* Verified Social Profiles & Honest Collaboration Proof */}
        <ClientsSection />

        {/* Direct WhatsApp & Inquiry Form Contact */}
        <ContactSection initialService={inquiryService} />

        {/* 3D Interactive Mac Mini M5 Studio & Premiere Pro Motion Graphics Suite */}
        <MacMiniStudioAnimation />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating UI Audio Toggle Pill */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:block">
        <button
          onClick={toggleGlobalAudio}
          title={isAudioMuted ? 'Turn UI Sound Effects ON' : 'Turn UI Sound Effects OFF'}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full border backdrop-blur-md shadow-xl transition-all text-xs font-mono font-medium ${
            !isAudioMuted
              ? 'bg-[#141418]/90 border-[#dc2626]/60 text-white hover:border-[#dc2626]'
              : 'bg-black/80 border-white/10 text-[#71717a] hover:text-white'
          }`}
        >
          {!isAudioMuted ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
              <Volume2 className="w-3.5 h-3.5 text-[#ef4444]" />
              <span className="text-[11px] tracking-wider">UI AUDIO: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#71717a]" />
              <span className="text-[11px] tracking-wider">UI AUDIO: MUTED</span>
            </>
          )}
        </button>
      </div>

      {/* Project Detail & Before/After Comparison Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={handleOpenContact}
      />

      {/* Master Showreel Chapter Modal */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
