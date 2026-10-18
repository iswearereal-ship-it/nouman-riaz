import React, { useState } from 'react';
import { PROJECTS, PROJECT_CATEGORIES, Project } from '../data/portfolioData';
import { Play, Clock, Film, ExternalLink, SlidersHorizontal, Eye } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categorySlug === selectedCategory);

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 bg-[#fafaf9] text-[#18181b] border-b border-[#e4e4e7] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#dc2626]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#71717a]">
              Selected Works &middot; Visual Stories
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0c0c0e]">
                Featured Projects
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#52525b] max-w-xl">
                Explore editing demonstrations spanning long-form documentaries, talking-head YouTube content, kinetic short-form reels, and motion design.
              </p>
            </div>

            <div className="text-xs font-mono text-[#71717a]">
              Showing {filteredProjects.length} of {PROJECTS.length} Projects
            </div>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Functional Segmented Control) */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex items-center gap-1.5 p-1 bg-[#eaeaea] rounded-lg border border-[#e4e4e7]">
            {PROJECT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0c0c0e] text-white shadow-sm'
                      : 'text-[#52525b] hover:text-[#0c0c0e] hover:bg-white/60'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-white rounded-xl overflow-hidden border border-[#e4e4e7] hover:border-[#a1a1aa] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Thumbnail Preview Area */}
                <div className="relative aspect-video w-full bg-[#18181c] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-12 h-12 rounded-full bg-[#dc2626] text-white flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <Play className="w-5 h-5 fill-current translate-x-0.5" />
                    </span>
                  </div>

                  {/* Top Metadata: Category & Aspect */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {project.aspectRatio}
                    </span>

                    <span className="bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded">
                      {project.duration}
                    </span>
                  </div>

                  {/* Before & After Badge if present */}
                  {project.beforeAfter && (
                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <span className="bg-[#dc2626]/90 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                        Before &middot; After Grade
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6">
                  {/* Category unboxed text metadata */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#dc2626] mb-2 font-semibold">
                    <span>{project.category}</span>
                    <span className="text-[#a1a1aa]">&middot;</span>
                    <span className="text-[#71717a] font-normal">{project.software[0]}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0c0c0e] group-hover:text-[#dc2626] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#52525b] leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Watch Action & Breakdown Hint */}
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#f4f4f5] flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProject(project);
                  }}
                  className="font-semibold text-[#0c0c0e] group-hover:text-[#dc2626] flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>Watch Project &amp; Breakdown</span>
                </button>

                <span className="text-[11px] font-mono text-[#a1a1aa]">
                  {project.software.length} Tools
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Customization Notice for Nouman */}
        <div className="mt-12 p-4 rounded-lg bg-white border border-[#e4e4e7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#71717a]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dc2626]" />
            <span>
              <strong>Personalization Ready:</strong> You can replace project titles, thumbnails, and insert direct YouTube or Vimeo links in <code className="font-mono bg-[#f4f4f5] px-1.5 py-0.5 rounded text-[#18181b]">src/data/portfolioData.ts</code>.
            </span>
          </div>

          <a
            href="#contact"
            className="text-[#dc2626] hover:underline font-semibold shrink-0"
          >
            Commission a Video &rarr;
          </a>
        </div>

      </div>
    </section>
  );
};
