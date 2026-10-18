/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { Project } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [inquiryService, setInquiryService] = useState<string>('Documentary Video Editing');

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

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#dc2626] selection:text-white">
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
      </main>

      {/* Footer */}
      <Footer />

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
