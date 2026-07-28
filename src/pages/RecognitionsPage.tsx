import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Search, 
  Globe, 
  Linkedin, 
  Twitter, 
  Github, 
  X, 
  ArrowLeft, 
  Sparkles, 
  Award,
  Users,
  CheckCircle2
} from 'lucide-react';
import { AmbientBackground, Navbar, Footer, ScrollReveal } from './Home';
import { recognitionsData, RecognitionItem } from '../data/recognitions';
import { useTheme } from '../lib/ThemeContext';

export default function RecognitionsPage() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Toggle state for search bar visibility (Hidden by default, shown when user clicks search button)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBadge, setSelectedBadge] = useState<string>('All');

  const badges = [
    'All',
    'Founder',
    'Writer',
    'Community',
    'Researcher',
    'Speaker',
    'Patron',
    'Contributor'
  ];

  const filteredRecognitions = useMemo(() => {
    return recognitionsData.filter((person) => {
      const matchesSearch =
        !searchTerm.trim() ||
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.badge.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBadge = selectedBadge === 'All' || person.badge === selectedBadge;

      return matchesSearch && matchesBadge;
    });
  }, [searchTerm, selectedBadge]);

  return (
    <div className={`min-h-screen overflow-x-hidden pt-24 sm:pt-28 pb-16 relative transition-colors ${
      isLight ? 'bg-slate-50 text-slate-900' : 'bg-obsidian text-silver'
    }`}>
      <AmbientBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-wider uppercase transition-colors ${
              isLight ? 'text-amber-700 hover:text-amber-800' : 'text-bronze hover:text-bronze-light'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Return to Home
          </Link>
        </div>

        {/* Page Hero Header */}
        <ScrollReveal className="text-center mb-12">
          <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim/30 px-4 py-1.5 rounded-full mb-6">
            <Star className="w-3.5 h-3.5 text-bronze fill-bronze/20" />
            <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
              Supporters & Contributors
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 leading-tight">
            CoM Recognitions
          </h1>
          <p className={`text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto ${
            isLight ? 'text-slate-600' : 'text-silver-muted'
          }`}>
            Honoring the founders, writers, researchers, patrons, and community leaders who contribute to the Collegium of Minds and advance human curiosity.
          </p>
        </ScrollReveal>

        {/* Action Controls & Hidden-by-default Search Bar */}
        <ScrollReveal className="mb-10">
          <div className={`p-4 sm:p-6 rounded-2xl border backdrop-blur-xl transition-all ${
            isLight ? 'bg-white/90 border-slate-200 shadow-sm' : 'bg-obsidian-surface/60 border-bronze-border/20'
          }`}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Badge Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {badges.map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(badge)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-heading font-medium tracking-wider transition-all border whitespace-nowrap ${
                      selectedBadge === badge
                        ? 'border-bronze bg-bronze/20 text-bronze font-bold shadow-sm'
                        : isLight
                        ? 'border-slate-200 text-slate-600 hover:border-amber-600/30 hover:bg-slate-100'
                        : 'border-bronze-border/10 text-silver-muted hover:border-bronze/30 hover:bg-bronze-dim/10'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>

              {/* Search Toggle Button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen);
                    if (isSearchOpen) setSearchTerm(''); // Reset when closing
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-heading font-semibold tracking-wider uppercase border transition-all ${
                    isSearchOpen
                      ? 'bg-bronze text-obsidian border-bronze shadow-lg shadow-bronze/10'
                      : isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                      : 'bg-obsidian-light/60 border-bronze-border/20 text-silver hover:bg-bronze-dim/20'
                  }`}
                >
                  {isSearchOpen ? (
                    <>
                      <X className="w-4 h-4" /> Hide Search
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" /> Search Supporters
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* CONDITIONAL SEARCH INPUT BAR (Appears ONLY when search button is clicked/open) */}
            {isSearchOpen && (
              <div className="mt-4 pt-4 border-t border-bronze-border/10 animate-fadeIn">
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search by contributor name, role, badge, or details..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`w-full rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-bronze transition-all ${
                      isLight
                        ? 'bg-slate-50 border border-slate-300 text-slate-900 placeholder:text-slate-400'
                        : 'bg-obsidian border border-bronze-border/30 text-silver placeholder:text-silver-dim/50'
                    }`}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-silver-dim hover:text-silver"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Recognitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {filteredRecognitions.length > 0 ? (
            filteredRecognitions.map((person, idx) => (
              <ScrollReveal key={person.id} delay={idx * 50}>
                <div
                  className={`group rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col justify-between ${
                    isLight
                      ? 'bg-white/90 border-slate-200 shadow-sm hover:border-amber-600/40 hover:shadow-md'
                      : 'border-bronze-border/20 bg-obsidian-surface/50 backdrop-blur-xl hover:border-bronze/40 hover:bg-bronze-dim/10'
                  }`}
                >
                  <div>
                    {/* Badge Pill */}
                    <div className="inline-flex items-center gap-2 bg-bronze/10 border border-bronze/30 rounded-full px-3 py-1 mb-5">
                      <Star className="w-3 h-3 text-bronze" />
                      <span className="text-[10px] uppercase tracking-[2px] font-heading text-bronze font-semibold">
                        {person.badge}
                      </span>
                    </div>

                    {/* Contributor Name */}
                    <h3 className={`font-heading text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-silver'}`}>
                      {person.name}
                    </h3>

                    {/* Role */}
                    <p className="text-bronze text-sm uppercase tracking-[2px] mt-1 font-heading font-semibold">
                      {person.role}
                    </p>

                    {/* Reason */}
                    <p className={`mt-5 leading-relaxed text-sm font-light ${isLight ? 'text-slate-600' : 'text-silver-muted'}`}>
                      {person.reason}
                    </p>
                  </div>

                  {/* Social & Contact Links */}
                  <div className="flex gap-4 mt-8 pt-4 border-t border-bronze-border/10">
                    {person.links.website && (
                      <a
                        href={person.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className={`transition-colors p-2 rounded-lg border border-transparent hover:border-bronze-border/20 ${
                          isLight ? 'text-slate-500 hover:text-amber-700' : 'text-silver-muted hover:text-bronze'
                        }`}
                        title="Website"
                      >
                        <Globe size={18} />
                      </a>
                    )}

                    {person.links.linkedin && (
                      <a
                        href={person.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className={`transition-colors p-2 rounded-lg border border-transparent hover:border-bronze-border/20 ${
                          isLight ? 'text-slate-500 hover:text-amber-700' : 'text-silver-muted hover:text-bronze'
                        }`}
                        title="LinkedIn"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}

                    {person.links.twitter && (
                      <a
                        href={person.links.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className={`transition-colors p-2 rounded-lg border border-transparent hover:border-bronze-border/20 ${
                          isLight ? 'text-slate-500 hover:text-amber-700' : 'text-silver-muted hover:text-bronze'
                        }`}
                        title="Twitter"
                      >
                        <Twitter size={18} />
                      </a>
                    )}

                    {person.links.github && (
                      <a
                        href={person.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className={`transition-colors p-2 rounded-lg border border-transparent hover:border-bronze-border/20 ${
                          isLight ? 'text-slate-500 hover:text-amber-700' : 'text-silver-muted hover:text-bronze'
                        }`}
                        title="GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-obsidian-surface/30 rounded-3xl border border-bronze-border/10">
              <Award className="w-10 h-10 text-bronze/40 mx-auto mb-4" />
              <h3 className="font-heading text-lg text-silver mb-1">
                No matching supporters found
              </h3>
              <p className="text-silver-muted text-sm font-light mb-4">
                Try adjusting your search criteria or selecting a different category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBadge('All');
                }}
                className="px-5 py-2 rounded-xl bg-bronze text-obsidian font-heading text-xs font-bold uppercase tracking-wider hover:bg-bronze-light transition-all"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Join as Contributor CTA */}
        <ScrollReveal className="glass-panel border-bronze-border/15 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden glowing-card mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-48 bg-gradient-to-r from-transparent via-bronze to-transparent" />
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-silver mb-3">
            Would you like to contribute to the Collegium?
          </h2>
          <p className="text-silver-muted text-sm max-w-xl mx-auto font-light leading-relaxed mb-6">
            Submit an essay, host an event, or support our research publications to earn recognition in the Collegium of Minds. Join CoM to begin!
          </p>
          <a
            href="https://forms.gle/WmJJRho4iTfuJEFj7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-bronze hover:bg-bronze-light text-obsidian px-8 py-3.5 font-heading text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-lg shadow-bronze/10 hover:-translate-y-0.5"
          >
            Submit an Application / Essay
          </a>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
