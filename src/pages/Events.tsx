import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, MapPin, User, Search, SlidersHorizontal, 
  ArrowLeft, ArrowUpRight, X, Sparkles, Filter, ChevronDown, Users
} from "lucide-react";
import { useToast } from "../components/ui";
import { AmbientBackground, Navbar, Footer, ScrollReveal } from "./Home";
import { eventsData, Event } from "../data/events.ts";
import { resolveSpeakers, Speaker } from "../data/speakers";
import { Link, useNavigate } from "react-router-dom";

export default function EventsPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  
  // List of unique types for the filter dropdown
  const eventTypes = ["All", "Debate", "Seminar", "Workshop", "Salon", "Symposium", "Initiative"];
  const eventStatuses = [
    { label: "All Statuses", value: "All" },
    { label: "Upcoming Only", value: "upcoming" },
    { label: "Completed Only", value: "completed" }
  ];

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.speaker && event.speaker.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesType = selectedType === "All" || event.type === selectedType;
      const matchesStatus = selectedStatus === "All" || event.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchQuery, selectedType, selectedStatus]);

  // Selected Event (defaults to first filtered event, or null if empty)
  const [activeEventId, setActiveEventId] = useState<string | null>(eventsData[0]?.id || null);

  const selectedEvent = useMemo(() => {
    const found = filteredEvents.find(e => e.id === activeEventId);
    return found || filteredEvents[0] || null;
  }, [filteredEvents, activeEventId]);

    // Active Speaker Detail Modal State
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  // Resolved speakers for the selected event
  const resolvedSpeakers = useMemo(() => {
    return resolveSpeakers(selectedEvent?.speaker);
  }, [selectedEvent]);

  const handleActionClick = (eventTitle: string, status: 'upcoming' | 'completed') => {
    if (status === 'upcoming') {
      toast({
        title: "Seat Registration Received",
        description: `You have successfully registered for "${eventTitle}". Joining details have been dispatched to your email.`,
        variant: "default",
      });
    } else {
      toast({
        title: "Retrieving Archive",
        description: `Opening transcript and digital recording archives for "${eventTitle}"...`,
        variant: "default",
      });
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("All");
    setSelectedStatus("All");
  };

  return (
    <div className="min-h-screen bg-obsidian text-silver overflow-x-hidden flex flex-col justify-between">
      <AmbientBackground />
      <Navbar />

      <main className="relative z-10 pt-28 sm:pt-36 pb-20 px-5 sm:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* Header Breadcrumbs & Title */}
        <ScrollReveal className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-bronze hover:text-bronze-light transition-colors mb-6 group cursor-pointer"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 border border-bronze-border bg-bronze-dim px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3 h-3 text-bronze" />
                <span className="font-heading text-[9px] font-semibold tracking-[3px] uppercase text-bronze">
                  CoM Events
                </span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-silver tracking-tight">
                Intellectual Assemblies
              </h1>
              <p className="text-silver-muted text-sm font-light mt-3 max-w-xl leading-relaxed">
                A ledger of our collective inquiries, active projects, debates, and philosophical assemblies. Browse current initiatives and access historical dialogue transcripts.
              </p>
            </div>
            
            <div className="text-xs font-mono text-silver-muted bg-obsidian-surface/40 border border-bronze-border/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-bronze animate-pulse" />
              <span>Total Events: {eventsData.length}</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Toolbar */}
        <ScrollReveal className="bg-obsidian-surface/40 border border-bronze-border/15 p-4 sm:p-5 rounded-2xl mb-8 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between" delay={100}>
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-silver-muted/60" />
            <input
              type="text"
              placeholder="Search events, speakers, keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-obsidian/60 border border-bronze-border/15 rounded-xl pl-11 pr-4 py-3 text-sm text-silver placeholder:text-silver-muted/50 focus:border-bronze/55 focus:outline-none focus:ring-1 focus:ring-bronze/25 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-silver-muted hover:text-silver cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Type / Category selection */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
            {/* Type dropdown style */}
            <div className="relative min-w-[140px] w-full sm:w-auto">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono tracking-wider uppercase text-silver-muted/60">
                Type:
              </span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full sm:w-auto bg-obsidian/60 border border-bronze-border/15 rounded-xl pl-14 pr-10 py-3 text-xs font-heading font-semibold uppercase tracking-wider text-silver appearance-none cursor-pointer focus:border-bronze/55 focus:outline-none focus:ring-1 focus:ring-bronze/25"
              >
                {eventTypes.map((type) => (
                  <option key={type} value={type} className="bg-obsidian text-silver uppercase text-xs">
                    {type}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-silver-muted pointer-events-none" />
            </div>

            {/* Status Switcher Tabs */}
            <div className="flex bg-obsidian/60 border border-bronze-border/15 p-1 rounded-xl w-full sm:w-auto">
              {eventStatuses.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedStatus(tab.value)}
                  className={`px-3.5 py-2 rounded-lg font-heading text-[10px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer flex-1 sm:flex-initial text-center ${
                    selectedStatus === tab.value
                      ? "text-bronze bg-bronze/10 border border-bronze/15"
                      : "text-silver-dim hover:text-silver border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Clear Filters Button */}
            {(searchQuery || selectedType !== "All" || selectedStatus !== "All") && (
              <button
                onClick={handleResetFilters}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl border border-dashed border-bronze/20 hover:border-bronze/45 text-xs text-bronze hover:text-bronze-light font-heading tracking-wide uppercase transition-colors cursor-pointer w-full sm:w-auto flex-shrink-0"
              >
                <X size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </ScrollReveal>

        {/* Master-Detail Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Filtered List */}
          <div className="lg:col-span-5 flex flex-col gap-3 min-h-[400px] lg:max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-heading font-semibold tracking-wider text-bronze/60 uppercase">
                Events List ({filteredEvents.length})
              </span>
              <span className="text-[10px] font-mono text-silver-muted/50">
                Sorted chronologically
              </span>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="bg-obsidian-surface/10 border border-dashed border-bronze-border/10 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-bronze-dim/15 border border-bronze/25 flex items-center justify-center text-xl mb-4 text-bronze select-none">
                  🔍
                </div>
                <h3 className="font-heading text-base font-bold text-silver">No Matches Found</h3>
                <p className="text-silver-muted text-xs font-light max-w-xs mx-auto mt-2 leading-relaxed">
                  The archives contain no records matching your selected query parameters. Let us clear filters and start over.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-5 bg-bronze hover:bg-bronze-light text-obsidian px-5 py-2.5 rounded font-heading text-[10px] font-semibold tracking-wider uppercase shadow transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredEvents.map((event) => {
                const isSelected = selectedEvent && selectedEvent.id === event.id;
                const isUpcoming = event.status === "upcoming";

                return (
                  <button
                    key={event.id}
                    onClick={() => setActiveEventId(event.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? "bg-bronze-dim/10 border-bronze/45 shadow-lg shadow-bronze/5"
                        : "bg-obsidian-surface/20 border-bronze-border/10 hover:bg-obsidian-surface/45 hover:border-bronze-border/25"
                    }`}
                  >
                    {/* Selected Indicator line */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-bronze" />
                    )}

                    <div className="text-xl select-none p-1.5 bg-obsidian-surface/60 rounded-lg border border-bronze-border/5">
                      {event.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono tracking-wider text-bronze uppercase">
                          {event.type}
                        </span>
                        <span
                          className={`text-[9px] font-heading font-medium tracking-wider uppercase px-2 py-0.5 rounded-full ${
                            isUpcoming
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/15"
                              : "bg-silver-dim/10 text-silver-muted border border-silver-dim/5"
                          }`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <h4 className={`font-heading text-sm font-semibold tracking-tight transition-colors line-clamp-1 ${
                        isSelected ? "text-silver" : "text-silver-dim group-hover:text-silver"
                      }`}>
                        {event.title}
                      </h4>

                      <p className="text-silver-muted text-[11px] font-light mt-1.5 flex items-center gap-1.5">
                        <Clock size={11} className="text-silver-muted/60" />
                        <span>{event.date}</span>
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Active Event Detail Pane */}
          <div className="lg:col-span-7 flex">
            {selectedEvent ? (
              <div className="bg-obsidian-surface/30 border border-bronze-border/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-between w-full relative overflow-hidden backdrop-blur-sm h-full min-h-[500px]">
                {/* Top decorative gradient line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-bronze/30 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedEvent.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      {/* Event Type & Status */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-bronze-dim border border-bronze-border text-[10px] font-heading font-bold uppercase tracking-widest text-bronze">
                          <span className="select-none">{selectedEvent.emoji}</span>
                          <span>{selectedEvent.type}</span>
                        </span>

                        <span
                          className={`text-[10px] font-heading font-bold tracking-wider uppercase px-2.5 py-1 rounded border ${
                            selectedEvent.status === "upcoming"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-silver-dim/10 text-silver-muted border-silver-dim/10"
                          }`}
                        >
                          {selectedEvent.status}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-silver tracking-tight leading-tight">
                        {selectedEvent.title}
                      </h3>

                      {/* Speaker */}
                      {selectedEvent.speaker && (
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mt-4 text-xs text-bronze/85 font-heading tracking-wide">
                          <User size={13} className="text-bronze/60" />
                          <span>Presenter:</span>
                          <div className="flex flex-wrap gap-1.5 items-center">
                            {resolvedSpeakers.map((sp, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedSpeaker(sp)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bronze-dim border border-bronze-border/30 text-[10px] font-semibold text-bronze hover:text-bronze-light hover:border-bronze/55 transition-all cursor-pointer shadow-sm active:scale-95"
                              >
                                <span>{sp.emoji}</span>
                                <span>{sp.name}</span>
                                <span className="text-[8px] opacity-60 font-mono">↗</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="h-px bg-bronze-border/10 my-6" />

                      {/* Description */}
                      <div className="space-y-5">
                        <p className="text-xs sm:text-sm text-silver/95 font-light leading-relaxed">
                          {selectedEvent.description}
                        </p>
                        
                        <div className="bg-obsidian/40 border border-bronze-border/10 p-4 rounded-xl">
                          <h5 className="text-[10px] font-heading font-semibold tracking-wider text-bronze uppercase mb-2">
                            Event Summary
                          </h5>
                          <p className="text-xs text-silver-muted font-light italic leading-relaxed pl-3 border-l border-bronze/35">
                            "{selectedEvent.summary}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Meta details & Action */}
                    <div className="pt-6 mt-6 border-t border-bronze-border/10 space-y-6">
                      <div className="grid grid-cols-2 gap-6 bg-obsidian/30 p-4 rounded-xl border border-bronze-border/5">
                        <div className="space-y-1">
                          <span className="text-[10px] font-heading font-semibold tracking-wider text-silver-muted uppercase block">
                            Schedule Details
                          </span>
                          <div className="flex items-center gap-2 text-xs text-silver font-light">
                            <Calendar size={13} className="text-bronze/70" />
                            <span>{selectedEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-silver-muted font-light pl-5">
                            <Clock size={11} className="text-silver-muted/50" />
                            <span>{selectedEvent.time}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] font-heading font-semibold tracking-wider text-silver-muted uppercase block">
                            Coordinated Venue
                          </span>
                          <div className="flex items-center gap-2 text-xs text-silver font-light">
                            <MapPin size={13} className="text-bronze/70" />
                            {selectedEvent.location.includes("http") ? (
                              <a
                                href={selectedEvent.location.split(" - ")[1]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate text-bronze hover:underline"
                              >
                                {selectedEvent.location}
                              </a>
                            ) : (
                              <span className="truncate">{selectedEvent.location}</span>
                            )}
                          </div>
                          {selectedEvent.capacity && (
                            <div className="flex items-center gap-2 text-[11px] text-silver-muted font-light pl-5">
                              <Users size={11} className="text-silver-muted/50" />
                              <span>Maximum Limit: {selectedEvent.capacity}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* CTA button */}
                      <button
                        onClick={() => {
                            if (selectedEvent.status === "upcoming") {
                            navigate("/#join");
                            } else {
                            handleActionClick(selectedEvent.title, selectedEvent.status);
                            }
                        }}
                        className={`w-full py-4 px-4 font-heading text-xs font-semibold tracking-widest uppercase rounded transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                            selectedEvent.status === "upcoming"
                            ? "bg-bronze hover:bg-bronze-light text-obsidian shadow-lg shadow-bronze/10 hover:-translate-y-0.5"
                            : "bg-obsidian-surface border border-bronze-border/20 hover:bg-bronze-dim/10 hover:border-bronze/30 text-silver-dim hover:text-silver"
                        }`}
                        >
                        <span>
                            {selectedEvent.status === "upcoming"
                            ? "Register Seat"
                            : "Open Recording/Transcript"}
                        </span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center border border-dashed border-bronze-border/10 rounded-2xl p-10 bg-obsidian-surface/10 text-center text-silver-muted">
                <span>Select an event to view its full details.</span>
              </div>
            )}
          </div>

        </div>

      </main>
      {/* Speaker Detail Modal */}
      <AnimatePresence>
        {selectedSpeaker && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-obsidian border border-bronze-border/20 max-w-md w-full rounded-2xl relative shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 text-silver-dim hover:text-silver text-xs font-mono uppercase bg-obsidian-surface px-2.5 py-1 rounded border border-bronze-border/10 cursor-pointer z-10"
              >
                Close
              </button>

              <div className="flex items-center gap-4 mb-6 relative z-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bronze-dim via-obsidian-surface to-bronze/20 border border-bronze/25 flex items-center justify-center text-3xl shadow-inner select-none flex-shrink-0">
                  {selectedSpeaker.emoji}
                </div>
                <div>
                  <span className="text-[10px] font-heading font-semibold tracking-wider text-bronze uppercase block mb-0.5">
                    {selectedSpeaker.role}
                  </span>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-silver leading-tight">
                    {selectedSpeaker.name}
                  </h3>
                </div>
              </div>

              <div className="mb-6 space-y-4">
                {selectedSpeaker.quote && (
                  <div className="border-l-2 border-bronze pl-4 italic text-silver-muted text-sm my-4 font-light leading-relaxed">
                    "{selectedSpeaker.quote}"
                  </div>
                )}

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-heading font-semibold tracking-wider text-silver-dim uppercase">
                    Biography
                  </h4>
                  <p className="text-xs text-silver-muted leading-relaxed font-light">
                    {selectedSpeaker.bio}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-bronze-border/10 flex items-center justify-between">
                <span className="text-[10px] font-heading font-semibold tracking-wider text-silver-dim uppercase">
                  Event Host
                </span>
                <span className="font-heading text-xs font-semibold text-bronze tracking-wider uppercase">
                  Collegium of Minds
                </span>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>

      <Footer />
    </div>
  );
}
