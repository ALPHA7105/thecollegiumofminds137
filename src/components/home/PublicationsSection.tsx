import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Clock, Calendar, ExternalLink } from "lucide-react";
import { articles } from "../../data/articles";
import { notebooks } from "../../data/notebooks";
import { useToast } from "@/components/ui";

export function PublicationsSection() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [enrolled, setEnrolled] = useState(false);

  // Pick top curated articles
  const featuredArticle = articles.find((a) => a.slug === "traveling-faster-than-light") || articles[0];
  const secondaryArticles = articles.filter(
    (a) => a.slug !== featuredArticle.slug && ["is-gravity-an-illusion", "secrets-of-game-design-part-1", "the-law-that-builds-the-universe-entropy"].includes(a.slug)
  ).slice(0, 3);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setEnrolled(true);
    toast({
      title: "Enrollment Confirmed",
      description: "Transferring to the Collegium of Minds Substack repository...",
    });
    setTimeout(() => {
      window.location.href = "https://thecollegiumofminds.substack.com/subscribe";
    }, 1200);
  };

  return (
    <section
      id="library"
      className="relative z-10 py-28 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto border-t border-white/10"
      aria-label="What We're Thinking"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="font-mono text-xs tracking-[3px] uppercase text-[#A3A3A3]">
              05 / Dispatches & Media
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#F2EEE8] tracking-tight">
            What we're thinking.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-[#A5A19F] font-sans font-light text-sm sm:text-base max-w-xs leading-relaxed">
            Essays, treatises, and speculative investigations authored by Collegium fellows.
          </p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A3A3A3] hover:text-[#F2EEE8] transition-colors"
          >
            Explore Library ({articles.length}) →
          </Link>
        </div>
      </div>

      {/* Featured Lead Publication */}
      {featuredArticle && (
        <div className="mb-12 sm:mb-16 rounded-3xl bg-[#0C0C0C] border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[#A3A3A3] uppercase tracking-wider">
                  {featuredArticle.category}
                </span>
                <span className="text-[#716E6B]">•</span>
                <span className="text-[#716E6B]">{featuredArticle.readTime}</span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#F2EEE8] group-hover:text-white transition-colors leading-tight mb-4">
                  {featuredArticle.title}
                </h3>
                <p className="font-sans font-light text-sm sm:text-base text-[#A5A19F] leading-relaxed max-w-xl">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs">
                  <span className="text-[#716E6B] block font-mono text-[10px] uppercase">Author</span>
                  <span className="font-sans text-[#F2EEE8] font-medium">{featuredArticle.author}</span>
                </div>

                <Link
                  to={`/library/${featuredArticle.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-sans font-medium tracking-wider uppercase px-5 py-2.5 rounded-full border border-white/20 group-hover:border-white group-hover:bg-[#F2EEE8] group-hover:text-[#030303] text-[#F2EEE8] transition-all"
                >
                  <span>Read Treatise</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            {featuredArticle.coverImage && (
              <div className="lg:col-span-5 h-[260px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Secondary Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 sm:mb-28">
        {secondaryArticles.map((art) => (
          <Link
            key={art.slug}
            to={`/library/${art.slug}`}
            className="group p-6 sm:p-8 rounded-2xl bg-[#0D0D0D] border border-white/10 hover:border-white/25 hover:bg-[#111111] transition-all duration-300 flex flex-col justify-between min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#716E6B] mb-5">
                <span className="uppercase text-[#A3A3A3]">{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl text-[#F2EEE8] group-hover:text-white transition-colors leading-snug mb-3">
                {art.title}
              </h4>

              <p className="font-sans font-light text-xs sm:text-sm text-[#A5A19F] leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-5 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="font-mono text-[#716E6B]">{art.author}</span>
              <span className="font-mono text-[#F2EEE8] opacity-0 group-hover:opacity-100 transition-opacity">
                Read →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* CoM Monthly Notebook Gazette */}
      <div className="mb-20 sm:mb-28">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <div>
            <span className="font-mono text-xs uppercase tracking-[3px] text-[#A3A3A3] block mb-1">
              Monthly Journal
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F2EEE8]">
              The CoM Notebook Series
            </h3>
          </div>
          <a
            href="https://thecollegiumofminds.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono uppercase tracking-wider text-[#A5A19F] hover:text-[#F2EEE8] transition-colors"
          >
            Substack Archive ↗
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notebooks.map((n) => (
            <a
              key={n.issue}
              href={n.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 sm:p-7 rounded-2xl bg-[#0D0D0D] border border-white/10 hover:border-white/25 hover:bg-[#121212] transition-all flex flex-col justify-between h-[230px]"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#716E6B] mb-3">
                  <span className="text-[#A3A3A3]">ISSUE #{n.issue}</span>
                  <span>{n.month}</span>
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-[#F2EEE8] group-hover:text-white transition-colors leading-snug">
                  {n.title}
                </h4>
                <p className="font-sans font-light text-xs text-[#A5A19F] mt-2 line-clamp-2">
                  {n.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-[#F2EEE8] group-hover:underline">
                <span>Read Edition</span>
                <ExternalLink size={12} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Substack Newsletter Enrollment Box */}
      <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#0A0A0A] border border-white/12 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-4">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mx-auto text-[#F2EEE8]">
            <BookOpen size={18} />
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-[#F2EEE8]">
            Receive the Monthly Gazette.
          </h3>
          <p className="font-sans font-light text-xs sm:text-sm text-[#A5A19F] leading-relaxed">
            Delivered directly to your terminal. Deep excursions into theoretical physics, philosophy of mind, transfinite mathematics, and synthetic intelligence. Zero noise, zero spam.
          </p>

          {!enrolled ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#141414] border border-white/10 rounded-full px-5 py-3 text-sm text-[#F2EEE8] placeholder:text-[#716E6B] focus:outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#F2EEE8] text-[#030303] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-white transition-colors whitespace-nowrap cursor-pointer"
              >
                Enroll
              </button>
            </form>
          ) : (
            <div className="pt-4 text-xs font-mono text-[#F2EEE8]">
              ✓ Transferring to the CoM Substack portal...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
