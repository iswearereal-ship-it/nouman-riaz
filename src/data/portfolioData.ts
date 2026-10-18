/**
 * Nouman Riaz — Portfolio Content & Data Configuration
 * 
 * Edit this file to customize your project links, videos, client testimonials,
 * and social profiles without touching component code.
 */

import docThumb from '../assets/images/project_doc_1792296098333.jpg';
import studioThumb from '../assets/images/project_studio_1792296120148.jpg';
import motionThumb from '../assets/images/project_motion_1792296139688.jpg';
import aiCinematicThumb from '../assets/images/project_aicinematic_1792296158501.jpg';
import noumanExactPhoto from '../assets/images/nouman_exact_photo_1792297234462.jpg';

export interface Project {
  id: string;
  title: string;
  category: string;
  categorySlug: 'documentary' | 'talking-head' | 'short-form' | 'podcast' | 'motion-graphics' | 'ai-cinematic';
  clientNote?: string;
  description: string;
  thumbnail: string;
  duration: string;
  software: string[];
  role: string;
  aspectRatio: '16:9' | '9:16' | '2.39:1';
  embedUrl?: string; // YouTube, Vimeo, or MP4 URL
  breakdown: {
    pacingNotes: string;
    soundDesign: string;
    colorGrading: string;
  };
  beforeAfter?: {
    rawLabel: string;
    finalLabel: string;
    description: string;
  };
  isPlaceholder?: boolean;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  deliverables: string;
  recommendedFor: string;
}

/**
 * Dynamic year calculation utilities:
 * Automatically update years, timeline, experience calculations, and copyright
 * as time progresses (e.g. 2026 -> 2027 -> 2028) without any manual code edits.
 */
export const getCurrentYear = (): number => new Date().getFullYear();

export const getExperienceYears = (): number => {
  const startYear = 2021;
  const current = getCurrentYear();
  return Math.max(1, current - startYear);
};

export const PERSONAL_INFO = {
  name: "Nouman Riaz",
  roleTitle: "Professional Video Editor & Motion Graphics Artist",
  tagline: "I Turn Raw Footage Into Stories That Matter.",
  heroSupportingText: "Video editor specializing in documentaries, talking-head content, short-form videos, podcasts, and motion graphics. I help creators and brands turn their ideas into compelling visual stories.",
  whatsappNumber: "+923070511548",
  whatsappUrl: "https://wa.me/923070511548",
  emailPlaceholder: "noumanriaz3341@gmail.com",
  location: "Available Worldwide (Remote)",
  portraitImage: noumanExactPhoto,
  headshotImage: noumanExactPhoto,
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/nouman-riaz-91a66141a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      label: "nouman-riaz-91a66141a",
      placeholder: false
    }
  ]
};

export const ABOUT_TEXT = {
  heading: "A Little About Me",
  paragraph1: "I began my video editing journey in 2021 with a simple belief: the difference between ordinary video and an unforgettable story isn't the camera gear—it's what happens in the edit.",
  paragraph2: "Over the years, I've developed deep, hands-on experience across documentary storytelling, talking-head YouTube content, podcast editing, high-density short-form reels, and AI-assisted video workflows. I bridge the technical and narrative halves of post-production—obsessing over rhythm, sound design, visual tone, and audience retention so every frame earns its place on screen.",
  paragraph3: "Whether I'm structuring a multi-layer narrative arc, timing micro-cuts for maximum viewer engagement, or creating clean motion graphics to explain complex concepts, my focus remains strictly on authentic storytelling and lasting visual impact.",
  getTimeline: () => {
    const currentYear = getCurrentYear();
    const previousYear = currentYear - 1;

    return [
      {
        year: "2021",
        title: "Foundations & Narrative Assembly",
        description: "Started video editing journey. Mastered core timeline rhythm, cutting on action, audio track structuring, and visual storytelling fundamentals."
      },
      {
        year: previousYear >= 2023 ? `2022 — ${previousYear}` : "2022 — 2025",
        title: "Creator Retention & Short-Form Mastery",
        description: "Specialized in high-retention YouTube talking-head videos, multi-track podcast dialogue editing, and hyper-paced vertical short-form reels."
      },
      {
        year: `${currentYear} — Present`,
        title: "Documentaries, Motion Design & AI Integration",
        description: "Leading long-form documentary narratives, cinematic color grading, After Effects title graphics, and AI-assisted audio/visual enhancement."
      }
    ];
  }
};

export const SKILLS_DATA = {
  software: [
    {
      name: "Adobe Premiere Pro",
      level: "Advanced",
      status: "Primary NLE",
      description: "Complex multi-cam synchronization, nested narrative timelines, proxy workflows, dynamic audio leveling, and professional export pipelines.",
      progress: 90
    },
    {
      name: "CapCut (Desktop & Mobile)",
      level: "Advanced",
      status: "High-Speed Workflow",
      description: "Rapid short-form execution, kinetic typography, automated caption synchronization, trending audio cues, and viral social pacing.",
      progress: 92
    },
    {
      name: "Adobe After Effects",
      level: "Basic Working Knowledge",
      status: "Supporting Tool",
      description: "Clean lower thirds, cinematic title typography, subtle 2D motion graphics, logo reveals, and track mattes.",
      progress: 55
    }
  ],
  creativeDisciplines: [
    {
      title: "Documentary Editing",
      description: "Pacing emotional beats, archival research integration, dramatic tension building, and authentic story structure."
    },
    {
      title: "Talking-Head Editing",
      description: "Viewer retention hooks, visual pattern interrupts, intelligent zoom framing, and seamless B-roll storytelling."
    },
    {
      title: "Short-Form Video Editing",
      description: "Kinetic pacing for TikTok, Instagram Reels, and YouTube Shorts engineered for high completion rates."
    },
    {
      title: "Podcast Video Editing",
      description: "Multi-camera speaker switching, conversational flow cleanup, audio noise reduction, and audiogram packaging."
    },
    {
      title: "Motion Graphics",
      description: "Typography-led motion cards, explanatory graphic overlays, seamless transitions, and brand identity consistency."
    },
    {
      title: "AI-Assisted Video Production",
      description: "Leveraging generative video tools, neural audio isolation, AI upscaling, and workflow automation to elevate production value."
    }
  ],
  craftPillars: [
    { name: "Pacing & Rhythm", detail: "Cutting to breath, conversational cadence, and emotional subtext" },
    { name: "Sound Design", detail: "Multi-layered ambiences, foley, risers, whooshes, and pristine vocal EQ" },
    { name: "Visual Consistency", detail: "Balanced contrast, skin tones, color palettes, and cinematic lighting continuity" },
    { name: "Audience Retention", detail: "Hook construction, micro-re-hooks, and visual momentum without gimmicks" }
  ]
};

export const PROJECT_CATEGORIES = [
  { id: "all", label: "All Work" },
  { id: "documentary", label: "Documentary Films" },
  { id: "talking-head", label: "Talking-Head Videos" },
  { id: "short-form", label: "Short-Form Content" },
  { id: "podcast", label: "Podcast Editing" },
  { id: "motion-graphics", label: "Motion Graphics" },
  { id: "ai-cinematic", label: "AI Cinematic Videos" }
] as const;

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "Shadows on the Ridge: High Altitude Expedition",
    category: "Documentary Films",
    categorySlug: "documentary",
    clientNote: "Documentary Showcase Project",
    description: "A 22-minute cinematic documentary exploring the human resilience of high-altitude Himalayan mountaineers. Features multi-camera alpine footage, complex archival integration, and an intense atmospheric score.",
    thumbnail: docThumb,
    duration: "21:40",
    software: ["Adobe Premiere Pro", "Audition"],
    role: "Lead Editor, Sound Design & Colorist",
    aspectRatio: "2.39:1",
    breakdown: {
      pacingNotes: "Built slow, deliberate build-ups mirroring the physical exhaustion of high altitude climbs, punctuated by rapid cuts during sudden mountain storms.",
      soundDesign: "Composed a 36-track audio environment with real wind foley, mountain ice cracking, laboured breathing, and distant sub-bass rumbles.",
      colorGrading: "Emphasized cold glacial slate tones with warm skin highlights and natural snow roll-off to preserve highlight detail."
    },
    beforeAfter: {
      rawLabel: "Flat Log Camera Feed",
      finalLabel: "Color Graded & Sound Designed",
      description: "Demonstrating the transformation from raw flat alpine footage into a high-contrast, filmic cinematic look with full acoustic depth."
    },
    isPlaceholder: true
  },
  {
    id: "project-2",
    title: "The Zero-To-One Creator Blueprint",
    category: "Talking-Head Videos",
    categorySlug: "talking-head",
    clientNote: "Creator Channel Showcase",
    description: "An engaging 14-minute educational breakdown for YouTube. Designed with meticulous retention hooks, custom kinetic graphics, and contextual B-roll that drove a high watch-through rate.",
    thumbnail: studioThumb,
    duration: "14:15",
    software: ["Adobe Premiere Pro", "CapCut"],
    role: "Video Editor & Pacing Specialist",
    aspectRatio: "16:9",
    breakdown: {
      pacingNotes: "Pattern interrupts every 4 to 7 seconds without feeling frenetic. Used subtle push-ins on key thesis statements to keep the viewer anchored.",
      soundDesign: "Clean vocal compression, subtle tape clicks, soft UI whooshes, and discreet background lo-fi acoustic tracks.",
      colorGrading: "Warm charcoal studio backdrop with rich skin tone contrast and natural ambient lamp glow."
    },
    isPlaceholder: true
  },
  {
    id: "project-3",
    title: "Kinetic Motion Package & Broadcast Title Sequence",
    category: "Motion Graphics",
    categorySlug: "motion-graphics",
    clientNote: "Brand Motion Package",
    description: "A bold, modern title sequence and animated lower-third packaging. Employs clean 3D typography, subtle depth-of-field, and typographic rhythm tailored for premium episodic series.",
    thumbnail: motionThumb,
    duration: "01:10",
    software: ["Adobe Premiere Pro", "Adobe After Effects"],
    role: "Motion Graphics & Title Designer",
    aspectRatio: "16:9",
    breakdown: {
      pacingNotes: "Tight kinetic keyframing matching industrial beat cues; seamless camera push-through transitions between title cards.",
      soundDesign: "Mechanical clicks, cinematic impacts, textural vinyl crackles, and riser transitions.",
      colorGrading: "High contrast monochrome with vivid red accents for key typographical hierarchy."
    },
    isPlaceholder: true
  },
  {
    id: "project-4",
    title: "Neon Streets: Autonomous Future",
    category: "AI Cinematic Videos",
    categorySlug: "ai-cinematic",
    clientNote: "AI-Assisted Short Film",
    description: "A stylized conceptual visual piece combining generative AI visual assets, meticulous temporal frame stabilization, custom Foley soundscapes, and cinematic grading.",
    thumbnail: aiCinematicThumb,
    duration: "03:45",
    software: ["Premiere Pro", "AI Video Pipeline", "CapCut"],
    role: "Creative Director & Post-Production Editor",
    aspectRatio: "16:9",
    breakdown: {
      pacingNotes: "Slow, atmospheric transitions emphasizing scale and neon reflection textures, synchronized to synthetic pulsing basslines.",
      soundDesign: "Layered rain on umbrellas, distant sirens, neon hum buzzes, and binaural city ambience.",
      colorGrading: "Neo-noir palette with saturated red neon highlights against deep reflective wet asphalt."
    },
    isPlaceholder: true
  },
  {
    id: "project-5",
    title: "The Dialogue Room: Multi-Cam Deep Dive",
    category: "Podcast Editing",
    categorySlug: "podcast",
    clientNote: "Podcast Studio Showcase",
    description: "Full multi-camera video podcast editing with automatic speech cut detection, intelligent speaker framing, multi-track audio cleanup, and viral quote highlight markers.",
    thumbnail: studioThumb,
    duration: "48:10",
    software: ["Adobe Premiere Pro", "Audition"],
    role: "Multi-Cam Video Editor & Dialogue Engineer",
    aspectRatio: "16:9",
    breakdown: {
      pacingNotes: "Natural conversational flow that trims dead pauses while preserving the organic rhythm of speaker banter.",
      soundDesign: "Room noise cancellation, multiband compression for radio broadcast vocal clarity, and de-essing.",
      colorGrading: "Matched three distinct camera sensor color profiles to an identical neutral studio grade."
    },
    isPlaceholder: true
  },
  {
    id: "project-6",
    title: "Hyper-Paced Kinetic Reels Collection",
    category: "Short-Form Content",
    categorySlug: "short-form",
    clientNote: "Social Growth Package",
    description: "Curated series of vertical short-form reels engineered for TikTok and Instagram. Featuring dynamic captions, custom sound effects, punchy zooms, and seamless loop endpoints.",
    thumbnail: motionThumb,
    duration: "00:45",
    software: ["CapCut", "Premiere Pro"],
    role: "Short-Form Content Specialist",
    aspectRatio: "9:16",
    breakdown: {
      pacingNotes: "Zero second dead-air. First 2 seconds establish visual curiosity; micro-hooks every 3 seconds to maintain 85%+ retention.",
      soundDesign: "Kinetic pop effects, whip transitions, bass drops, and auto-ducked trending musical bed.",
      colorGrading: "Punchy, mobile-optimized saturation with sharp high-contrast clarity."
    },
    isPlaceholder: true
  }
];

export const SERVICES: Service[] = [
  {
    id: "documentary",
    number: "01",
    title: "Documentary Video Editing",
    description: "Comprehensive narrative construction for long-form documentaries and brand films. I weave hours of raw footage, interviews, and archival materials into a coherent, emotionally resonant storyline.",
    features: [
      "Story arc structuring & narrative pacing",
      "Archival research & B-roll curation",
      "Multi-layered atmospheric sound design",
      "Cinematic color grading & LUT development"
    ],
    deliverables: "Full 4K master, compressed web exports, and project archives",
    recommendedFor: "Documentary filmmakers, brand storytellers, and deep-dive channels"
  },
  {
    id: "youtube",
    number: "02",
    title: "YouTube & Talking-Head Editing",
    description: "Pacing-first editing crafted to turn casual viewers into loyal subscribers. I engineer engaging retention hooks, clean jump cuts, subtle motion graphics, and contextual visual interruptions.",
    features: [
      "Audience retention optimization & hook design",
      "Dynamic push-ins, framing & pattern interrupts",
      "Crisp dialogue cleanup & background leveling",
      "Visual asset curation (memes, graphs, overlays)"
    ],
    deliverables: "High-retention 1080p/4K YouTube exports + thumbnail freeze frames",
    recommendedFor: "Educators, tech reviewers, business founders, and creators"
  },
  {
    id: "short-form",
    number: "03",
    title: "Short-Form Videos & Reels",
    description: "Fast-turnaround vertical content for Instagram Reels, YouTube Shorts, and TikTok. Built with magnetic hooks, kinetic typography, and audio-reactive pacing to drive virality and watch time.",
    features: [
      "High-speed CapCut & Premiere workflows",
      "Custom kinetic subtitle animation & styling",
      "Seamless loop structuring for replay value",
      "Punchy sound design & trending audio integration"
    ],
    deliverables: "Vertical 9:16 high-bitrate MP4s ready for one-click upload",
    recommendedFor: "Personal brands, influencers, e-commerce, and agencies"
  },
  {
    id: "podcast",
    number: "04",
    title: "Podcast Video Editing",
    description: "Turn multi-hour conversations into polished broadcast-quality video episodes. Seamless multi-camera switching, audio de-noising, speaker isolation, and social clip extraction.",
    features: [
      "Multi-camera angle synchronization & switching",
      "Clean dialogue editing (reducing filler words & false starts)",
      "High-fidelity vocal EQ, de-noise, and compression",
      "Cut-down promotional clips and audiograms"
    ],
    deliverables: "Full-length episodic episode + 3-5 promotional short-form clips",
    recommendedFor: "Podcast hosts, interview shows, and corporate broadcasts"
  },
  {
    id: "motion-graphics",
    number: "05",
    title: "Motion Graphics",
    description: "Clean, purpose-driven motion design that clarifies complex ideas and elevates brand identity. Tasteful kinetic typography, animated title sequences, and graphic lower-thirds.",
    features: [
      "Custom branded lower-thirds & title cards",
      "Kinetic typography for quotes and data points",
      "Graphic callouts, map overlays, and timeline graphics",
      "Logo reveals & subtle intro/outro packaging"
    ],
    deliverables: "Transparent ProRes 4444 alpha exports & integrated timeline cuts",
    recommendedFor: "Channels and companies seeking a distinctive visual signature"
  },
  {
    id: "ai-assisted",
    number: "06",
    title: "AI-Assisted Video Editing",
    description: "Harnessing cutting-edge generative tools and neural processing to speed up post-production, restore degraded audio, upscale footage, and create cinematic b-roll assets.",
    features: [
      "Generative visual assets for conceptual topics",
      "Neural voice restoration & audio stem isolation",
      "AI video upscaling & frame interpolation",
      "Automated rough-cut transcripts & caption workflows"
    ],
    deliverables: "Future-proof hybrid productions blending craft with new technology",
    recommendedFor: "Futurists, tech channels, and ambitious visual creators"
  }
];

export const CLIENT_PLACEHOLDER_INFO = {
  sectionTitle: "Collaborations & Inquiries",
  subtitle: "Real partnerships build authentic results. I am currently open for select video editing collaborations with creators, production studios, and brands.",
  notice: "This section is reserved for verified client testimonials and channel spotlights. To preserve professional credibility, no fake statistics or invented logos are displayed here.",
  ctaText: "Ready to be the next featured collaboration?"
};
