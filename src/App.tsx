import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import {
  ArrowRight,
  ArrowLeft,
  Search,
  LogIn,
  Mail,
  Lock,
  Loader2,
  UserPlus,
  AlertTriangle,
  BookOpen,
  Calendar,
  User,
  Heart,
  Share2,
  PenTool,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Clock,
  Send,
  X,
  MessageSquare,
  Award,
  Trash2
} from 'lucide-react';

import { 
  getOrCreateUserId,
  getArticleLikes,
  incrementArticleLike,
  getArticleComments,
  addArticleComment,
  deleteArticleComment,
  type ArticleComment
} from './lib/db';

import { authClient } from '@/api/authClient';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import {
  Button,
  Input,
  Label,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  useToast,
  toast,
  Toaster
} from "@/components/ui";

import Home, {
  AmbientBackground,
  Navbar,
  Footer,
  ScrollReveal,
  LogoIcon
} from './pages/Home';
import { articles as initialArticles, categoryColors } from './data/articles';
import QuestionsPage from './pages/Questions';

const queryClient = new QueryClient();

// ============================================================================
// ScrollToTop Helper
// ============================================================================
const initialPathname = window.location.pathname;
const initialHash = window.location.hash;
let initialHashProcessed = false;

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    // On the absolute first load/mount of the application, ignore hash and force scroll to top
    if (!initialHashProcessed) {
      initialHashProcessed = true;
      if (initialHash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo(0, 0);
      // Repeated scrolls to counteract browser default layout / hash jumping
      setTimeout(() => window.scrollTo(0, 0), 20);
      setTimeout(() => window.scrollTo(0, 0), 100);
      setTimeout(() => window.scrollTo(0, 0), 250);
      return;
    }

    // Skip scrolling if the hash is the exact initial hash we are ignoring on reload
    if (pathname === initialPathname && hash === initialHash) {
      window.scrollTo(0, 0);
      return;
    }

    if (hash) {
      const id = hash.replace("#", "");
      let attempts = 0;
      let timerId: any = null;

      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 15) {
          attempts++;
          timerId = setTimeout(tryScroll, 100);
        }
      };

      tryScroll();
      return () => {
        if (timerId) clearTimeout(timerId);
      };
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// ============================================================================
// Library View (All Articles)
// ============================================================================
function LibraryPage() {
  const [activeSection, setActiveSection] = useState<'articles' | 'notebook'>('articles');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Local articles state to allow adding new user articles on-the-fly
  const [articlesList, setArticlesList] = useState(() => {
    const saved = localStorage.getItem('com_articles_custom');
    if (!saved) return initialArticles;
    try {
      const parsed = JSON.parse(saved);
      // Migrate old categories to new ones for custom or old cache items
      const migrated = parsed.map((a: any) => {
        if (a.slug === 'secrets-of-game-design-part-1') {
          return { ...a, category: 'Innovation & Technology' };
        }
        if (a.slug === 'traveling-faster-than-light') {
          return { ...a, category: 'Space & Cosmology' };
        }
        if (a.slug === 'is-gravity-an-illusion') {
          return { ...a, category: 'The Physical World' };
        }
        if (a.slug === 'is-our-universe-a-hologram') {
          return { ...a, category: 'Space & Cosmology' };
        }
        if (a.slug === 'the-law-that-builds-the-universe-entropy') {
          return { ...a, category: 'Matter & Molecules' };
        }
        if (a.slug === 'is-our-universe-really-an-isolated-system') {
          return { ...a, category: 'Space & Cosmology' };
        }

        const mapping: Record<string, string> = {
          'Technology': 'Innovation & Technology',
          'Physics': 'The Physical World',
          'Environment': 'Life & Nature',
          'Design': 'Arts & Expression',
          'Hardware': 'Innovation & Technology',
          'Mathematics': 'Mathematics',
          'Open': 'Humanity & Society'
        };

        if (mapping[a.category]) {
          return { ...a, category: mapping[a.category] };
        }
        return a;
      });

      // Merge any newly introduced predefined articles from Home.tsx that aren't in local storage yet
      const existingSlugs = new Set(migrated.map((a: any) => a.slug));
      const newPredefined = initialArticles.filter((a: any) => !existingSlugs.has(a.slug));
      
      const isTestArticle = (a: any) => {
        const title = (a.title || "").toLowerCase().trim();
        const slug = (a.slug || "").toLowerCase().trim();
        if (title === "hi" || title === "title" || title === "test" || title === "hello" || title === "hello world" || title.includes("test article")) return true;
        if (slug === "hi" || slug === "title" || slug === "test" || slug === "hello") return true;
        if (title.length < 4 || slug.length < 4) return true;
        return false;
      };

      const combined = [...migrated, ...newPredefined].filter(a => !isTestArticle(a));
      localStorage.setItem('com_articles_custom', JSON.stringify(combined));
      return combined;
    } catch (e) {
      return initialArticles;
    }
  });

  const categories = [
    'All',
    'The Physical World',
    'Matter & Molecules',
    'Life & Nature',
    'Mathematics',
    'Philosophy',
    'Innovation & Technology',
    'Space & Cosmology',
    'Humanity & Society',
    'Arts & Expression'
  ];

  const filteredArticles = useMemo(() => {
    return articlesList.filter((a: any) => {
      const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            a.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            a.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articlesList, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden pt-24 sm:pt-28 pb-0">
      <AmbientBackground />
      <Navbar />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        <ScrollReveal className="text-center mb-10">
          <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-4 py-1.5 rounded-full mb-6">
            <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
              The Archives
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-silver mb-4 tracking-tight">
            Library of Minds
          </h1>
          <p className="text-silver-muted text-base sm:text-lg font-light leading-relaxed max-w-xl mx-auto">
            A repository of essays, thoughts, and research papers published by founding members of the Collegium.
          </p>
        </ScrollReveal>

        {/* Elegant Section Tab Controller */}
        <ScrollReveal className="flex justify-center mb-12">
          <div className="bg-obsidian-surface/60 border border-bronze-border/10 p-1 rounded-xl inline-flex gap-2">
            <button
              onClick={() => setActiveSection('articles')}
              className={`px-6 py-2 rounded-lg text-xs font-heading font-medium tracking-wider uppercase transition-all ${
                activeSection === 'articles'
                  ? 'bg-bronze text-obsidian font-bold shadow-lg shadow-bronze/10'
                  : 'text-silver-muted hover:text-silver hover:bg-obsidian-light/30'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveSection('notebook')}
              className={`px-6 py-2 rounded-lg text-xs font-heading font-medium tracking-wider uppercase transition-all ${
                activeSection === 'notebook'
                  ? 'bg-bronze text-obsidian font-bold shadow-lg shadow-bronze/10'
                  : 'text-silver-muted hover:text-silver hover:bg-obsidian-light/30'
              }`}
            >
              COM Notebook
            </button>
          </div>
        </ScrollReveal>

        {activeSection === 'articles' ? (
          <>
            {/* Search and Filter Panel */}
            <ScrollReveal className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-center bg-obsidian-surface/50 border border-bronze-border/15 p-6 rounded-2xl backdrop-blur-xl">
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-dim/60" />
                <input
                  type="text"
                  placeholder="Search articles, topics, authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-obsidian-light/50 border border-bronze-border/10 rounded-xl pl-11 pr-4 py-3 text-silver text-sm placeholder:text-silver-dim/40 focus:border-bronze/40 focus:outline-none focus:ring-1 focus:ring-bronze/20 transition-all"
                />
              </div>

              <a
                href="https://forms.gle/DACdfWWD3ovCDhdy5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-bronze/10 border border-bronze text-bronze px-6 py-3 font-heading text-xs font-semibold tracking-widest uppercase rounded hover:bg-bronze/20 transition-all flex-shrink-0"
              >
                <PenTool className="w-3.5 h-3.5" />
                Submit an Essay
              </a>
            </ScrollReveal>

            {/* Category Filter Chips */}
            <ScrollReveal className="flex flex-wrap items-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-heading tracking-wider transition-all border whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'border-bronze bg-bronze/15 text-bronze'
                      : 'border-bronze-border/10 text-silver-muted hover:border-bronze/30 hover:bg-bronze-dim/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </ScrollReveal>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((a: any, i: number) => {
                  const colors = categoryColors[a.category] || categoryColors["The Physical World"];
                  return (
                    <ScrollReveal key={a.slug} delay={i * 60}>
                      <Link
                        to={`/library/${a.slug}`}
                        className={`group flex flex-col justify-between h-full bg-obsidian-surface/60 border ${colors.border} rounded-2xl p-6 sm:p-7 hover:bg-bronze-dim/10 transition-all duration-300 hover:-translate-y-1`}
                      >
                        <div>
                          {a.coverImage && (
                            <div className="h-44 w-full relative overflow-hidden mb-5 rounded-xl border border-bronze-border/10">
                              <img 
                                src={a.coverImage} 
                                alt={a.title} 
                                className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                          )}
                          <span className={`inline-block text-[10px] font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colors.text} ${colors.bg} ${colors.border} mb-4`}>
                            {a.category}
                          </span>
                          <h3 className="font-heading text-lg font-bold text-silver mb-3 group-hover:text-bronze transition-colors leading-tight">
                            {a.title}
                          </h3>
                          <p className="text-silver-dim text-xs font-light leading-relaxed mb-6">
                            {a.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-bronze-border/10 mt-auto">
                          <span className="text-silver-dim text-[11px] font-light">{a.author}</span>
                          <span className={`${colors.text} text-[11px] font-heading tracking-wider`}>
                            {a.readTime}
                          </span>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })
              ) : (
                <ScrollReveal className="col-span-full py-16 text-center">
                  <AlertTriangle className="w-10 h-10 text-bronze/40 mx-auto mb-4" />
                  <h3 className="font-heading text-lg text-silver mb-1">No articles found</h3>
                  <p className="text-silver-muted text-sm font-light">Try adjusting your search query or selecting a different category.</p>
                </ScrollReveal>
              )}
            </div>
          </>
        ) : (
          /* CoM Notebook Series Gazette - Chronologically arranged oldest to newest */
          <ScrollReveal className="pt-4 mb-24">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-3.5 py-1.5 rounded-full mb-4">
                <BookOpen className="w-3.5 h-3.5 text-bronze animate-pulse" />
                <span className="font-heading text-[10px] font-semibold tracking-[3px] uppercase text-bronze">
                  Monthly Publications
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-silver tracking-tight">
                The CoM Notebook Series
              </h2>
              <p className="text-silver-muted text-sm font-light mt-2 max-w-xl mx-auto">
                Explore our monthly Substack newsletter editions. Beautifully formatted deep excursions into speculative philosophy, mathematics, and high-signal concepts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Issue #1: April 2026 */}
              <div className="glowing-card border border-bronze-border/15 bg-obsidian-surface/50 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-80">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-bronze/40">ISSUE #01</div>
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-purple-400">April 2026</span>
                  <h3 className="font-heading text-lg font-bold text-silver">"Simulacra"</h3>
                  <p className="text-silver-dim text-xs font-light leading-relaxed">
                    Speculative research on intelligence thresholds, synthetic phenomenologies, and simulated physics systems.
                  </p>
                </div>
                <a 
                  href="https://thecollegiumofminds.substack.com/p/simulacra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-wider text-bronze hover:text-bronze-light uppercase mt-4"
                >
                  Read on Substack →
                </a>
              </div>

              {/* Issue #2: May 2026 */}
              <div className="glowing-card border border-bronze-border/15 bg-obsidian-surface/50 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-80">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-bronze/40">ISSUE #02</div>
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-indigo-400">May 2026</span>
                  <h3 className="font-heading text-lg font-bold text-silver">"Transfinite"</h3>
                  <p className="text-silver-dim text-xs font-light leading-relaxed">
                    Explorations in non-Euclidean geometries, transfinite card hierarchies, and nested boundaries of computable logic.
                  </p>
                </div>
                <a 
                  href="https://thecollegiumofminds.substack.com/p/transfinite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-wider text-bronze hover:text-bronze-light uppercase mt-4"
                >
                  Read on Substack →
                </a>
              </div>

              {/* Issue #3: June 2026 */}
              <div className="glowing-card border border-bronze-border/15 bg-obsidian-surface/50 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-80">
                <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-bronze/40">ISSUE #03</div>
                <div className="space-y-3">
                  <span className="text-[10px] font-mono text-cyan-400">June 2026</span>
                  <h3 className="font-heading text-lg font-bold text-silver">"Emergence"</h3>
                  <p className="text-silver-dim text-xs font-light leading-relaxed">
                    Deep excursions into self-assembling biological lattices, cellular automata, and the physical metrics of emergent state fields.
                  </p>
                </div>
                <a 
                  href="https://thecollegiumofminds.substack.com/p/emergence"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit inline-flex items-center gap-2 text-xs font-heading font-semibold tracking-wider text-bronze hover:text-bronze-light uppercase mt-4"
                >
                  Read on Substack →
                </a>
              </div>
            </div>
          </ScrollReveal>
        )}

      </div>
      <Footer />
    </div>
  );
}

// ============================================================================
// Article Detail Page (Reading View)
// ============================================================================
function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(() => {
    return localStorage.getItem(`com_liked_${slug}`) === 'true';
  });

  // Reading progress tracker state
  const [scrollPercent, setScrollPercent] = useState(0);

  // Quote Card Modal state
  const [showQuoteCard, setShowQuoteCard] = useState(false);

  // Comments/Discussions states
  const [comments, setComments] = useState<Array<ArticleComment>>([]);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Load dynamically, allowing for custom added articles
  const articlesList = useMemo(() => {
    const saved = localStorage.getItem('com_articles_custom');
    if (!saved) return initialArticles;
    try {
      const parsed = JSON.parse(saved);
      // Migrate old categories to new ones for custom or old cache items
      const migrated = parsed.map((a: any) => {
        if (a.slug === 'secrets-of-game-design-part-1') {
          return { ...a, category: 'Innovation & Technology' };
        }
        if (a.slug === 'traveling-faster-than-light') {
          return { ...a, category: 'Space & Cosmology' };
        }
        if (a.slug === 'is-gravity-an-illusion') {
          return { ...a, category: 'The Physical World' };
        }
        if (a.slug === 'is-our-universe-a-hologram') {
          return { ...a, category: 'Space & Cosmology' };
        }
        if (a.slug === 'the-law-that-builds-the-universe-entropy') {
          return { ...a, category: 'Matter & Molecules' };
        }
        if (a.slug === 'is-our-universe-really-an-isolated-system') {
          return { ...a, category: 'Space & Cosmology' };
        }

        const mapping: Record<string, string> = {
          'Technology': 'Innovation & Technology',
          'Physics': 'The Physical World',
          'Environment': 'Life & Nature',
          'Design': 'Arts & Expression',
          'Hardware': 'Innovation & Technology',
          'Mathematics': 'Mathematics',
          'Open': 'Humanity & Society'
        };

        if (mapping[a.category]) {
          return { ...a, category: mapping[a.category] };
        }
        return a;
      });
      const isTestArticle = (a: any) => {
        const title = (a.title || "").toLowerCase().trim();
        const slug = (a.slug || "").toLowerCase().trim();
        if (title === "hi" || title === "title" || title === "test" || title === "hello" || title === "hello world" || title.includes("test article")) return true;
        if (slug === "hi" || slug === "title" || slug === "test" || slug === "hello") return true;
        if (title.length < 4 || slug.length < 4) return true;
        return false;
      };
      return migrated.filter((a: any) => !isTestArticle(a));
    } catch (e) {
      return initialArticles;
    }
  }, []);

  const article = useMemo(() => {
    return articlesList.find((a: any) => a.slug === slug);
  }, [articlesList, slug]);

  // Read Progress scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollPercent(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch / Sync likes and comments from Firestore database
  useEffect(() => {
    if (slug) {
      getArticleLikes(slug).then(val => {
        setLikes(val);
      });

      getArticleComments(slug).then(list => {
        setComments(list);
      });
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-obsidian text-silver flex items-center justify-center pt-20">
        <AmbientBackground />
        <Navbar />
        <div className="text-center p-8 bg-obsidian-surface/60 border border-bronze-border/20 rounded-3xl max-w-md relative z-10">
          <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Article Not Found</h2>
          <p className="text-silver-muted text-sm mb-6">The article you are looking for might have been moved or deleted.</p>
          <Link to="/library" className="inline-flex items-center gap-2 bg-bronze/10 border border-bronze text-bronze px-6 py-2.5 font-heading text-xs font-semibold tracking-widest uppercase rounded">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>
        </div>
      </div>
    );
  }

  const colors = categoryColors[article.category] || categoryColors["The Physical World"];

  const handleLike = () => {
    if (!liked && slug) {
      incrementArticleLike(slug).then(newCount => {
        setLikes(newCount);
        setLiked(true);
        localStorage.setItem(`com_liked_${slug}`, 'true');
        toast({ title: "Thanks!", description: "You recommended this essay." });
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Copied!", description: "Article link copied to clipboard." });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim() || !slug) return;

    addArticleComment(slug, newCommentName.trim(), newCommentText.trim()).then(added => {
      setComments(prev => [...prev, added]);
      setNewCommentText("");
      toast({
        title: "Commentary Compiled",
        description: "Your perspective has been appended to the board."
      });
    });
  };

  const handleDeleteComment = (commentId: string) => {
    deleteArticleComment(commentId).then(() => {
      setComments(prev => prev.filter(c => c.id !== commentId));
      toast({
        title: "Comment Deleted",
        description: "Your message has been removed."
      });
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    toast({
      title: "Enrollment Secured",
      description: "Redirecting you to the CoM Substack..."
    });
    setTimeout(() => {
      window.location.href = "https://thecollegiumofminds.substack.com/subscribe";
    }, 1200);
  };

  // Pre-mapped high-rigor quote snippets based on slug
  const sampleQuotes: Record<string, string> = {
    "secrets-of-game-design-part-1": "Rules are not fences to restrict play; they are gravity. Symmetries that permit free, elegant movement.",
    "traveling-faster-than-light": "If information can outrun its own causal footprint, then history is not a record, but an open negotiation.",
    "is-gravity-an-illusion": "Spacetime does not bend under weight; weight emerges from the collective entanglement of transfinite information.",
    "is-our-universe-a-hologram": "The horizon of a black hole holds the master record. We are the projections, drifting across the center.",
    "the-law-that-builds-the-universe-entropy": "Entropy is not a decay towards chaos, but the slow, inevitable expansion of possible universes.",
    "is-our-universe-really-an-isolated-system": "If energy cannot cross the system boundary, then the boundary is either a perfect mirror or the entirety of reality."
  };

  const quoteText = sampleQuotes[article.slug] || "In a universe of transfinite variables, rigorous curiosity is our only reliable constant.";

  return (
    <div className="min-h-screen bg-obsidian text-silver pt-24 sm:pt-28 pb-0 overflow-x-hidden">
      {/* Viewport Fixed Reading Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-bronze via-cyan-500 to-bronze z-50 transition-all duration-75"
        style={{ width: `${scrollPercent}%` }}
      />

      <AmbientBackground />
      <Navbar />

      <article className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Back Link */}
        <ScrollReveal className="mb-10">
          <button
            onClick={() => navigate('/library')}
            className="inline-flex items-center gap-2 text-silver-dim hover:text-bronze text-xs font-heading tracking-widest uppercase transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </button>
        </ScrollReveal>

        {/* Read Header */}
        <ScrollReveal className="border-b border-bronze-border/10 pb-8 mb-10">
          <span className={`inline-block text-[10px] font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colors.text} ${colors.bg} ${colors.border} mb-6`}>
            {article.category}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-silver tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-silver-dim font-light">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium text-silver text-sm">{article.author}</p>
                <div className="flex items-center gap-2 text-[11px] opacity-80 mt-0.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{article.date}</span>
                  <span>•</span>
                  <Clock className="w-3.5 h-3.5 ml-1" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Share Quote Card Action */}
              <button
                onClick={() => setShowQuoteCard(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-light/30 border border-bronze-border/20 hover:border-bronze/30 text-silver-dim hover:text-bronze transition-all text-xs"
                title="Generate beautiful quote citation"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Quote Card</span>
              </button>

              {/* Share Link Action */}
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-obsidian-light/30 border border-bronze-border/20 hover:border-bronze/30 text-silver-dim hover:text-bronze transition-all"
                title="Copy link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Cover Image */}
        {article.coverImage && (
          <ScrollReveal className="mb-10 rounded-2xl overflow-hidden border border-bronze-border/15 h-[200px] sm:h-[350px]">
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-full object-cover opacity-85"
              referrerPolicy="no-referrer"
            />
          </ScrollReveal>
        )}

        {/* Read Body */}
        <ScrollReveal className="markdown-body text-base sm:text-lg mb-14 leading-relaxed">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </ScrollReveal>

        {/* Curated Newsletter Form At Bottom */}
        <ScrollReveal className="glass-panel border-bronze-border/15 rounded-2xl p-6 sm:p-10 text-center mt-12 mb-16 relative overflow-hidden glowing-card">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-40 bg-gradient-to-r from-transparent via-bronze to-transparent" />
          <h3 className="font-heading text-lg sm:text-xl font-bold text-silver mb-2">
            Pondered enough? Secure the notebook.
          </h3>
          <p className="text-silver-muted text-xs font-light max-w-md mx-auto mb-6 leading-relaxed">
            Enroll in the CoM Notebook to secure early access drafts, high-concept digests, and physical facsimiles directly.
          </p>

          {!newsletterSubmitted ? (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 mt-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Email address"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-obsidian/75 border border-bronze-border/15 rounded-xl px-4 py-2.5 text-silver text-xs focus:border-bronze/40 focus:outline-none w-full"
              />
              <button
                type="submit"
                className="bg-bronze text-obsidian px-5 py-2.5 font-heading text-[10px] font-semibold tracking-widest uppercase rounded hover:bg-bronze-light transition-colors whitespace-nowrap"
              >
                Enroll
              </button>
            </form>
          ) : (
            <div className="bg-bronze-dim border border-bronze-border/30 rounded-xl p-4 max-w-md mx-auto">
              <p className="text-xs font-semibold text-bronze uppercase mb-1">✓ Connection compilation completed</p>
              <p className="text-xs text-silver-muted font-light">Redirecting you to the CoM Substack...</p>
            </div>
          )}
        </ScrollReveal>
      </article>

      {/* Quote Card Interactive Modal Pop-up */}
      {showQuoteCard && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-obsidian border border-bronze-border/20 max-w-lg w-full rounded-2xl overflow-hidden relative shadow-2xl p-6 sm:p-10 text-center">
            {/* Close Button */}
            <button
              onClick={() => setShowQuoteCard(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg border border-bronze-border/10 bg-obsidian-surface text-silver-dim hover:text-bronze transition-colors"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className={`inline-block text-[9px] font-heading font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${colors.text} ${colors.bg} ${colors.border}`}>
                {article.category}
              </span>
            </div>

            {/* The Citation Card Graphic */}
            <div className="border border-bronze-border/10 bg-obsidian-surface/60 rounded-xl p-6 sm:p-8 relative overflow-hidden mb-6 text-left shadow-inner">
              {/* Subtle graphic lines */}
              <div className="absolute top-0 right-0 h-1 w-16 bg-gradient-to-r from-bronze to-cyan-400" />
              <span className="font-serif text-5xl text-bronze/10 absolute -top-2 left-2 pointer-events-none">“</span>
              
              <p className="font-serif italic text-lg sm:text-xl text-silver-muted leading-relaxed mb-6 pl-4 relative z-10">
                {quoteText}
              </p>

              <div className="flex items-center justify-between border-t border-bronze-border/5 pt-4 pl-4">
                <div>
                  <p className="text-silver text-xs font-semibold">{article.author}</p>
                  <p className="text-silver-dim text-[10px] font-mono mt-0.5">Collegium of Minds • Curator Pick</p>
                </div>
                <span className="font-heading text-[9px] tracking-widest uppercase text-bronze/30 font-semibold">CoM-Doc #{slug.substring(0,4)}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`"${quoteText}" — ${article.author}, Collegium of Minds`);
                  toast({
                    title: "Citation Copied!",
                    description: "The formatted quote has been saved to your clipboard."
                  });
                }}
                className="bg-bronze text-obsidian px-5 py-2.5 rounded text-xs font-heading font-semibold tracking-widest uppercase hover:bg-bronze-light transition-all"
              >
                Copy Citation Text
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "URL Copied!",
                    description: "The article link has been copied. Pair it with the quote card!"
                  });
                }}
                className="bg-obsidian-surface border border-bronze-border/25 text-silver px-5 py-2.5 rounded text-xs font-heading font-semibold tracking-widest uppercase hover:bg-obsidian-light transition-all"
              >
                Share Link
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

// ============================================================================
// Login Page
// ============================================================================
function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await authClient.auth.loginViaEmailPassword(email, password);
      toast({ title: "Access Granted", description: "Welcome back to the Collegium." });
      // Redirect to homepage, force refresh to recheck auth
      window.location.href = '/';
    } catch (err: any) {
      toast({ title: "Authorization Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    authClient.auth.loginWithProvider("google", "/");
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver flex flex-col justify-center items-center px-4 pt-12 pb-12 relative overflow-hidden">
      <AmbientBackground />
      <div className="w-full max-w-md relative z-10 bg-obsidian-surface/60 border border-bronze-border/20 p-8 sm:p-10 rounded-3xl backdrop-blur-xl">
        
        {/* Emblem */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <LogoIcon className="w-16 h-16 mx-auto text-bronze ring-2 ring-bronze/30 rounded-full p-1" />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-silver">Enter the Collegium</h1>
          <p className="text-silver-muted text-xs font-light mt-1.5 tracking-wider uppercase">Members Area Secure Access</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Collegium Email</Label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze/40" />
              <Input
                id="email"
                type="email"
                required
                placeholder="you@collegium.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Passphrase</Label>
              <Link to="/forgot-password" className="text-bronze hover:underline text-xs font-light">Forgot passphrase?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze/40" />
              <Input
                id="password"
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-12 font-heading text-xs font-semibold tracking-widest uppercase bg-bronze hover:bg-bronze-light text-obsidian rounded-xl shadow-lg shadow-bronze/10 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Verify Credentials <LogIn className="w-4 h-4" /></>}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <span className="absolute inset-0 flex items-center"><span className="w-full border-t border-bronze-border/10"></span></span>
          <span className="relative bg-obsidian-surface px-4 text-[10px] font-heading font-semibold tracking-widest uppercase text-silver-dim/60">OR</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 rounded-xl border border-bronze-border/20 text-silver font-sans text-sm font-medium hover:bg-bronze-dim/10 transition-all flex items-center justify-center gap-3"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          Identity Google Verify
        </button>

        <p className="text-center text-xs text-silver-dim/80 font-light mt-8">
          Not a member yet? <Link to="/register" className="text-bronze hover:underline font-semibold">Request Fellowship</Link>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Register / Sign Up Page
// ============================================================================
function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = Details, 2 = OTP Verification
  const [otpCode, setOtpCode] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await authClient.auth.register({ email, password });
      toast({ title: "OTP Code Dispatched", description: "A verification code has been sent to your email." });
      setStep(2);
    } catch (err: any) {
      toast({ title: "Request Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 6) {
      toast({ title: "Invalid Code", description: "Please enter the complete 6-digit OTP code.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const result = await authClient.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        authClient.auth.setToken(result.access_token);
      }
      toast({ title: "Fellowship Registered", description: "Welcome to the Collegium directory!" });
      window.location.href = '/';
    } catch (err: any) {
      toast({ title: "Verification Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver flex flex-col justify-center items-center px-4 pt-12 pb-12 relative overflow-hidden">
      <AmbientBackground />
      <div className="w-full max-w-md relative z-10 bg-obsidian-surface/60 border border-bronze-border/20 p-8 sm:p-10 rounded-3xl backdrop-blur-xl">
        
        {/* Emblem */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <LogoIcon className="w-16 h-16 mx-auto text-bronze ring-2 ring-bronze/30 rounded-full p-1" />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-silver">
            {step === 1 ? 'Apply for Fellowship' : 'Verify Identity'}
          </h1>
          <p className="text-silver-muted text-xs font-light mt-1.5 tracking-wider uppercase">
            {step === 1 ? 'Directory Registration' : 'Enter 6-digit verification code'}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Work/Institutional Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze/40" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@collegium.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Passphrase (Min 8 Characters)</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze/40" />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-11"
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 font-heading text-xs font-semibold tracking-widest uppercase bg-bronze hover:bg-bronze-light text-obsidian rounded-xl shadow-lg shadow-bronze/10 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Request Fellowship <UserPlus className="w-4 h-4" /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6 text-center">
            <p className="text-silver-muted text-sm font-light">
              We have dispatched a verification code to <strong className="text-silver">{email}</strong>. Use any code (e.g. 123456) to complete verification.
            </p>

            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 font-heading text-xs font-semibold tracking-widest uppercase bg-bronze hover:bg-bronze-light text-obsidian rounded-xl shadow-lg shadow-bronze/10 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Code'}
            </button>

            <div className="flex justify-between items-center text-xs font-heading tracking-wider uppercase">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-silver-dim hover:text-silver transition-colors"
              >
                Change Email
              </button>
              <button
                type="button"
                onClick={async () => {
                  await authClient.auth.resendOtp(email);
                  toast({ title: "OTP Resent", description: "Verification code resent successfully." });
                }}
                className="text-bronze hover:underline"
              >
                Resend Code
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-xs text-silver-dim/80 font-light mt-8">
          Already registered? <Link to="/login" className="text-bronze hover:underline font-semibold">Verify Credentials</Link>
        </p>
      </div>
    </div>
  );
}

// ============================================================================
// Forgot Password Page
// ============================================================================
function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await authClient.auth.resetPasswordRequest(email);
      setSent(true);
      toast({ title: "Reset Link Sent", description: "Instructions have been dispatched to your email." });
    } catch (err: any) {
      toast({ title: "Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <AmbientBackground />
      <div className="w-full max-w-md relative z-10 bg-obsidian-surface/60 border border-bronze-border/20 p-8 sm:p-10 rounded-3xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <LogoIcon className="w-16 h-16 mx-auto text-bronze ring-2 ring-bronze/30 rounded-full p-1" />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-silver">Reset Passphrase</h1>
          <p className="text-silver-muted text-xs font-light mt-1.5 tracking-wider uppercase">Dispatched security instructions</p>
        </div>

        {!sent ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Registered Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze/40" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@collegium.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full h-12 font-heading text-xs font-semibold tracking-widest uppercase bg-bronze hover:bg-bronze-light text-obsidian rounded-xl shadow-lg shadow-bronze/10 transition-all flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Send Verification Link'}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-bronze/15 border-2 border-bronze flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-bronze" />
            </div>
            <p className="text-silver-muted text-sm font-light">
              Instructions have been dispatched to <strong className="text-silver">{email}</strong>. Please follow the instructions to secure your profile.
            </p>
            <Link
              to="/login"
              className="block w-full text-center h-12 flex items-center justify-center rounded-xl bg-bronze/10 border border-bronze text-bronze font-heading text-xs font-semibold tracking-widest uppercase hover:bg-bronze/20 transition-all"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Page Not Found / Admin Portal Note View
// ============================================================================
function PageNotFound() {
  const { data: authData, isFetched } = useQuery({
    queryKey: ['user-check'],
    queryFn: async () => {
      try {
        const user = await authClient.auth.me();
        return { user, isAuthenticated: true };
      } catch (error) {
        return { user: null, isAuthenticated: false };
      }
    },
    retry: false
  });

  const isAdmin = authData?.isAuthenticated && authData?.user?.role === 'admin';

  return (
    <div className="min-h-screen bg-obsidian text-silver flex flex-col justify-center items-center px-4 relative overflow-hidden">
      <AmbientBackground />
      <div className="w-full max-w-lg relative z-10 bg-obsidian-surface/60 border border-bronze-border/20 p-8 sm:p-10 rounded-3xl backdrop-blur-xl text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-bronze/10 border-2 border-bronze/30 flex items-center justify-center mb-6">
          <HelpCircle className="w-8 h-8 text-bronze" />
        </div>
        <h1 className="font-heading text-4xl font-bold mb-2 text-silver">404</h1>
        <h2 className="font-heading text-xl font-medium mb-3 text-silver">Hypothesis Disproven</h2>
        <p className="text-silver-muted text-sm font-light leading-relaxed mb-8 max-w-sm mx-auto">
          The coordinate grid in space-time you requested is void. The link you followed may be stale or misspelled.
        </p>

        {isFetched && isAdmin && (
          <div className="text-left bg-bronze-dim/10 border border-bronze-border/20 rounded-2xl p-5 mb-8">
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-bronze mb-2">Administrative Node Details</h4>
            <p className="text-xs text-silver-muted leading-relaxed font-light">
              Current Authenticated Principal: <strong className="text-silver">{authData.user?.name || authData.user?.email}</strong><br />
              Role Authority: <strong className="text-bronze uppercase text-[10px] tracking-wider">Administrator</strong><br />
              System Status: Standalone Mock Sandbox operational.
            </p>
          </div>
        )}

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-bronze hover:bg-bronze-light text-obsidian px-8 py-3.5 font-heading text-xs font-semibold tracking-widest uppercase rounded shadow-lg shadow-bronze/10 transition-all hover:-translate-y-0.5"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Assembly
        </Link>
      </div>
    </div>
  );
}

// ============================================================================
// Authenticated App Wrapper (Guarded Routes)
// ============================================================================
function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoadingAuth, navigateToLogin } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth && !isAuthenticated) {
      navigateToLogin();
    }
  }, [isAuthenticated, isLoadingAuth]);

  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-bronze" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}

// ============================================================================
// App Component
// ============================================================================
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* Guarded/Private Questions Poll Route */}
            <Route
              path="/questions"
              element={
                <AuthenticatedRoute>
                  <QuestionsPage />
                </AuthenticatedRoute>
              }
            />

            {/* Guarded/Private Library Routes */}
            <Route
              path="/library"
              element={
                <AuthenticatedRoute>
                  <LibraryPage />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/library/:slug"
              element={
                <AuthenticatedRoute>
                  <ArticleDetailPage />
                </AuthenticatedRoute>
              }
            />

            {/* Fallback 404 / Admin View Route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
