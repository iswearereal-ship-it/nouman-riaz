import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MessageSquare, Mail, Send, CheckCircle2, Copy, Check, ArrowUpRight, Clock, MapPin } from 'lucide-react';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState(initialService || 'Documentary Video Editing');
  const [estimatedDuration, setEstimatedDuration] = useState('Under 10 minutes');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // If initialService prop changes from a service card click
  React.useEffect(() => {
    if (initialService) {
      setProjectType(initialService);
    }
  }, [initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Format a direct WhatsApp inquiry text from form fields
  const getEncodedWhatsAppMessage = () => {
    const text = `Hi Nouman! I saw your portfolio and I have a project in mind:
Name: ${name || 'Prospective Client'}
Email: ${email || 'Not specified'}
Project Type: ${projectType}
Duration: ${estimatedDuration}
Details: ${message || 'I would like to discuss video editing collaboration.'}`;
    return encodeURIComponent(text);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.emailPlaceholder);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 bg-[#0c0c0e] text-white border-b border-[#222226] relative overflow-hidden"
    >
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-950/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#dc2626]" />
            <span className="text-xs font-mono tracking-widest uppercase text-[#a1a1aa]">
              Start A Collaboration &middot; Direct Contact
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Have a Project in Mind?
          </h2>

          <p className="text-base sm:text-lg text-[#a1a1aa] leading-relaxed">
            Let's create something worth watching. Tell me about your project, your goals, and the kind of video you want to create.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Fast Channels (WhatsApp, Email, Details) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Action Card: WhatsApp Direct */}
            <div className="p-6 sm:p-7 rounded-xl bg-[#141417] border border-[#27272a] hover:border-[#dc2626]/50 transition-all shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Direct WhatsApp Conversation</h3>
                  <p className="text-xs text-[#a1a1aa]">Fastest response &middot; Available worldwide</p>
                </div>
              </div>

              <p className="text-xs text-[#d4d4d8] leading-relaxed mb-6">
                Click below to open an immediate chat directly on WhatsApp with my verified number.
              </p>

              <div className="space-y-2">
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white text-sm font-bold shadow-lg shadow-red-950/60 hover:shadow-red-900/80 transition-all active:scale-[0.98]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Let's Talk on WhatsApp</span>
                </a>

                <p className="text-center text-[11px] font-mono text-[#71717a]">
                  WhatsApp Number: {PERSONAL_INFO.whatsappNumber}
                </p>
              </div>
            </div>

            {/* Email Contact Card */}
            <div className="p-6 rounded-xl bg-[#141417] border border-[#27272a]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa] uppercase">
                  <Mail className="w-4 h-4 text-[#dc2626]" />
                  <span>Email Inquiries</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="text-[11px] font-mono text-[#a1a1aa] hover:text-white flex items-center gap-1 transition-colors"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <a
                href={`mailto:${PERSONAL_INFO.emailPlaceholder}`}
                className="text-sm font-mono text-white hover:text-[#dc2626] transition-colors mb-2 block"
              >
                {PERSONAL_INFO.emailPlaceholder}
              </a>
              <p className="text-xs text-[#71717a]">
                Direct inbox for project briefs and editing inquiries
              </p>
            </div>

            {/* Availability & Location */}
            <div className="p-6 rounded-xl bg-[#141417] border border-[#27272a] space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
                <Clock className="w-4 h-4 text-[#dc2626]" />
                <span>Typical Response Time: Within 24 Hours</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#a1a1aa]">
                <MapPin className="w-4 h-4 text-[#dc2626]" />
                <span>Remote Production for Worldwide Creators &amp; Studios</span>
              </div>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#141417] p-6 sm:p-8 rounded-xl border border-[#27272a] shadow-xl">
              
              <div className="flex items-center justify-between border-b border-[#222226] pb-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Project Inquiry Form</h3>
                  <p className="text-xs text-[#a1a1aa] mt-0.5">Share your timeline, footage type, and creative vision</p>
                </div>
                <span className="text-[11px] font-mono text-[#71717a]">Step 1 of 1</span>
              </div>

              {submitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Thank You for Reaching Out!</h4>
                  <p className="text-xs sm:text-sm text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
                    Your project details for <strong>{projectType}</strong> have been recorded. You can also send this inquiry directly to WhatsApp with one click:
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/923070511548?text=${getEncodedWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold transition-colors shadow-lg"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send via WhatsApp Now</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2.5 rounded bg-[#222226] hover:bg-[#2e2e33] text-xs text-[#a1a1aa] hover:text-white transition-colors"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#a1a1aa] mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-[#1a1a1e] border border-[#2e2e34] focus:border-[#dc2626] rounded px-3.5 py-2.5 text-sm text-white placeholder-[#52525b] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#a1a1aa] mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full bg-[#1a1a1e] border border-[#2e2e34] focus:border-[#dc2626] rounded px-3.5 py-2.5 text-sm text-white placeholder-[#52525b] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#a1a1aa] mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full bg-[#1a1a1e] border border-[#2e2e34] focus:border-[#dc2626] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Documentary Video Editing">Documentary Video Editing</option>
                        <option value="YouTube & Talking-Head Editing">YouTube &amp; Talking-Head Editing</option>
                        <option value="Short-Form Videos and Reels">Short-Form Videos and Reels</option>
                        <option value="Podcast Video Editing">Podcast Video Editing</option>
                        <option value="Motion Graphics">Motion Graphics</option>
                        <option value="AI-Assisted Video Editing">AI-Assisted Video Editing</option>
                        <option value="Custom Post-Production Package">Custom Post-Production Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#a1a1aa] mb-1.5">
                        Estimated Final Video Length
                      </label>
                      <select
                        value={estimatedDuration}
                        onChange={(e) => setEstimatedDuration(e.target.value)}
                        className="w-full bg-[#1a1a1e] border border-[#2e2e34] focus:border-[#dc2626] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Under 60 seconds (Short/Reel)">Under 60 seconds (Short/Reel)</option>
                        <option value="3 to 10 minutes">3 to 10 minutes (YouTube/Explainer)</option>
                        <option value="10 to 30 minutes">10 to 30 minutes (Documentary/Long-form)</option>
                        <option value="30+ minutes (Podcast/Feature)">30+ minutes (Podcast/Feature)</option>
                        <option value="Ongoing Monthly Retainer">Ongoing Monthly Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#a1a1aa] mb-1.5">
                      Tell Me About Your Project &amp; Creative Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your footage, pacing reference, target audience, and any deadline..."
                      className="w-full bg-[#1a1a1e] border border-[#2e2e34] focus:border-[#dc2626] rounded px-3.5 py-2.5 text-sm text-white placeholder-[#52525b] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-white hover:bg-[#e4e4e7] text-[#0c0c0e] font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Me a Project Inquiry</span>
                    </button>

                    <a
                      href={`https://wa.me/923070511548?text=${getEncodedWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#a1a1aa] hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>Or transmit directly via WhatsApp</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#dc2626]" />
                    </a>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
