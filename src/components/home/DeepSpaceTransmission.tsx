import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Radio, Sparkles, Compass } from "lucide-react";

/**
 * Web Audio Harmonic Cosmic Synthesizer
 * Generates an ethereal, peaceful, resonant space drone at 432Hz with gentle 528Hz harmonic overtone.
 */
class CosmicAudioSynth {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;
  private isPlaying = false;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }

    if (this.isPlaying) return;

    const now = this.ctx.currentTime;

    // Master Gain with smooth fade-in
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.0001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 1.8);

    // Fundamental Warm Frequency (A=432Hz pitched down two octaves for deep celestial hum: 108Hz)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = "sine";
    this.osc1.frequency.setValueAtTime(108, now);

    // Harmonic Resonance (528Hz Solfeggio Love/Transformation octave: 132Hz)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = "triangle";
    this.osc2.frequency.setValueAtTime(132, now);

    // Warm Lowpass filter for smooth cosmic timbre
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);

    this.osc1.connect(filter);
    this.osc2.connect(filter);
    filter.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.osc1.start(now);
    this.osc2.start(now);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.gainNode || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
      } catch {
        // Safe disconnect
      }
      this.isPlaying = false;
    }, 1300);
  }

  public toggleMute(muted: boolean) {
    if (!this.gainNode || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    if (muted) {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    } else {
      this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.5);
    }
  }
}

const synth = new CosmicAudioSynth();

/**
 * DeepSpaceTransmission
 * Surprise-revealing telemetry & cosmic frequency modal inspired by madetodisrupt.com
 */
export const DeepSpaceTransmission: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voyagerDist, setVoyagerDist] = useState(24380412190);
  const [pulseCount, setPulseCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live ticking distance of Voyager 1 (traveling at ~17 km/s away from Earth)
  useEffect(() => {
    const interval = setInterval(() => {
      setVoyagerDist((prev) => prev + 17);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Audio start/stop on modal open/close
  useEffect(() => {
    if (isOpen) {
      synth.play();
    } else {
      synth.stop();
    }
    return () => {
      synth.stop();
    };
  }, [isOpen]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    synth.toggleMute(nextMuted);
  };

  // Oscilloscope canvas animation
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const w = (canvas.width = canvas.parentElement?.clientWidth || 360);
      const h = (canvas.height = 90);

      ctx.clearRect(0, 0, w, h);
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(167, 139, 250, 0.75)";

      for (let x = 0; x < w; x++) {
        const normX = x / w;
        // Superimposed harmonic sine wave
        const y =
          h / 2 +
          Math.sin(normX * 12 + phase) * 14 * Math.sin(normX * Math.PI) +
          Math.sin(normX * 24 - phase * 1.5) * 6 * Math.sin(normX * Math.PI);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.045;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen]);

  return (
    <>
      {/* Surprise Floating Beacon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0A0A0A]/70 hover:bg-[#121212] border border-white/12 hover:border-[#A78BFA]/40 transition-all duration-300 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.6)] cursor-pointer select-none"
        aria-label="Tune into Deep Space Transmission"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A78BFA] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A78BFA]" />
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-[#E5E0D8]/90 font-medium">
          1420.405 MHz
        </span>
        <span className="hidden sm:inline font-mono text-[8.5px] text-[#A78BFA] tracking-wider uppercase group-hover:translate-x-0.5 transition-transform">
          // REVEAL SIGNAL →
        </span>
      </button>

      {/* Surprise Discovery Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#080808] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              {/* Subtle Ambient Cosmic Glow */}
              <div
                className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-[#A78BFA]/10 blur-[90px] pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-cyan-500/10 blur-[90px] pointer-events-none"
                aria-hidden="true"
              />

              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/15 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA]">
                    <Radio size={16} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-widest text-[#A78BFA] uppercase">
                      COLLEGIUM DEEP SPACE TELEMETRY
                    </div>
                    <div className="font-sans text-sm font-medium text-[#F2EEE8]">
                      Hydrogen Line Frequency // 1420.405751 MHz
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Audio Mute/Unmute */}
                  <button
                    onClick={handleToggleMute}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#E5E0D8]/80 hover:text-white transition-colors border border-white/8"
                    aria-label={isMuted ? "Unmute harmonic hum" : "Mute harmonic hum"}
                    title={isMuted ? "Unmute harmonic hum" : "Mute harmonic hum"}
                  >
                    {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                  </button>

                  {/* Close Button */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#E5E0D8]/80 hover:text-white transition-colors border border-white/8"
                    aria-label="Close transmission"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Oscilloscope Waveform Display */}
              <div className="relative w-full h-[90px] rounded-xl bg-black/60 border border-white/10 p-3 mb-6 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between text-[9px] font-mono text-[#A3A3A3] z-10">
                  <span className="flex items-center gap-1.5 text-[#A78BFA]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-ping" />
                    HARMONIC RESONANCE 432 Hz : 528 Hz
                  </span>
                  <span>SPECTRAL WAVEFORM</span>
                </div>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="text-[8px] font-mono text-white/30 z-10 text-right">
                  GAIN: -18 dB // LOWPASS 320 Hz
                </div>
              </div>

              {/* Decrypted Transmission Manifesto */}
              <div className="mb-6 p-5 rounded-xl bg-white/[0.03] border border-white/8">
                <div className="text-[10px] font-mono tracking-widest text-[#A78BFA] uppercase mb-2 flex items-center gap-1.5">
                  <Sparkles size={11} />
                  <span>TRANSMISSION DECRYPTED</span>
                </div>
                <blockquote
                  className="text-base sm:text-lg text-[#F2EEE8] font-light leading-relaxed italic"
                  style={{ fontFamily: "'New York', 'Instrument Serif', Georgia, serif" }}
                >
                  "Across twelve billion light-years of silence, inquiry is the only flame that does not extinguish.
                  The Collegium of Minds is not a sanctuary for easy answers, but an altar for the questions that define our humanity."
                </blockquote>
              </div>

              {/* Real-time Astronomical Coordinates & Telemetry Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-left">
                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/6">
                  <div className="text-[9px] text-[#A3A3A3] tracking-wider uppercase">Distance to Voyager 1</div>
                  <div className="text-xs text-[#F2EEE8] mt-1 font-semibold tabular-nums">
                    {voyagerDist.toLocaleString()} km
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/6">
                  <div className="text-[9px] text-[#A3A3A3] tracking-wider uppercase">Light Travel Delay</div>
                  <div className="text-xs text-[#F2EEE8] mt-1 font-semibold">
                    22h 36m 42s
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/6">
                  <div className="text-[9px] text-[#A3A3A3] tracking-wider uppercase">CMB Radiation Temp</div>
                  <div className="text-xs text-[#F2EEE8] mt-1 font-semibold">
                    2.7255 Kelvin
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/[0.02] border border-white/6">
                  <div className="text-[9px] text-[#A3A3A3] tracking-wider uppercase">Cosmic Origin Point</div>
                  <div className="text-xs text-[#A78BFA] mt-1 font-semibold">
                    Terra Firma (0,0)
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-[#A3A3A3]">
                  TRANSMISSION ID: COM-ALPHA-137
                </span>

                <button
                  onClick={() => setPulseCount((c) => c + 1)}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-[#A78BFA]/15 hover:bg-[#A78BFA]/25 border border-[#A78BFA]/30 text-xs text-[#F2EEE8] font-mono tracking-wider transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Compass size={13} className="group-hover:rotate-45 transition-transform" />
                  <span>EMIT GRAVITATIONAL PULSE {pulseCount > 0 ? `(${pulseCount})` : ""}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
