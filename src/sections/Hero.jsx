// src/sections/Hero.jsx
import { ArrowRight, Play, Zap } from "lucide-react";
import StatCard from "../components/StatCard";

const STARS = [
  { top: "12%", left: "6%", size: "4px", dur: "2.8s", delay: "0s" },
  { top: "25%", right: "8%", size: "3px", dur: "3.5s", delay: "0.5s" },
  { top: "60%", left: "4%", size: "5px", dur: "2.2s", delay: "1s" },
  { top: "10%", right: "15%", size: "3px", dur: "4s", delay: "1.5s" },
  { top: "75%", right: "6%", size: "4px", dur: "3s", delay: "0.8s" },
  { top: "45%", left: "10%", size: "3px", dur: "2.5s", delay: "0.3s" },
  { top: "85%", left: "20%", size: "4px", dur: "3.8s", delay: "1.2s" },
  { top: "30%", left: "18%", size: "2px", dur: "2s", delay: "0.6s" },
];

const FLOATING = [
  { emoji: "📖", top: "18%", left: "7%", delay: "0s" },
  { emoji: "✨", top: "28%", right: "6%", delay: "0.6s" },
  { emoji: "🎬", bottom: "35%", right: "9%", delay: "1.1s" },
  { emoji: "🪄", top: "15%", right: "18%", delay: "1.6s" },
  { emoji: "🎙️", bottom: "25%", left: "6%", delay: "0.4s" },
  { emoji: "🌙", top: "65%", left: "4%", delay: "0.9s" },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero({ statsData, statsLoading }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center hero-mesh overflow-hidden pt-16"
    >
      {/* Star particles */}
      {STARS.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="star absolute rounded-full bg-lavender pointer-events-none hidden sm:block"
          style={{
            top: s.top, left: s.left, right: s.right, bottom: s.bottom,
            width: s.size, height: s.size,
            "--dur": s.dur, "--delay": s.delay,
          }}
        />
      ))}

      {/* Floating emojis */}
      {FLOATING.map((f, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute text-2xl pointer-events-none opacity-20 hidden sm:block"
          style={{
            top: f.top, bottom: f.bottom, left: f.left, right: f.right,
            animation: `float 3.5s ease-in-out ${f.delay} infinite`,
          }}
        >
          {f.emoji}
        </span>
      ))}

      {/* Glow blobs */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div aria-hidden="true" className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <span className="pill bg-violet-brand/15 text-lavender border border-violet-brand/30">
            <Zap size={11} className="fill-current" />
            Hindi YouTube Content Studio
          </span>
        </div>

        {/* Headline — brand, not person */}
        <h1
          className="font-display font-bold leading-none mb-4 text-snow"
          style={{
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
            fontVariationSettings: "'opsz' 72, 'wght' 800",
            letterSpacing: "-0.02em",
          }}
        >
          Story Time{" "}
          <span className="gradient-text">Studios</span>
        </h1>

        {/* Tagline */}
        <p
          className="font-display italic text-muted mb-5 leading-relaxed"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontVariationSettings: "'opsz' 20, 'wght' 400",
          }}
        >
          "Inspiring Minds. Building Values.{" "}
          <span className="text-lavender not-italic font-medium">One Story at a Time.</span>"
        </p>

        {/* Sub-label */}
        <p className="font-body text-muted text-base mb-10">
          3 Active YouTube Channels · Hindi Storytelling · Devotional Content · Motivational Speaking
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <button
            onClick={() => scrollTo("#collaborate")}
            className="btn-primary inline-flex items-center justify-center gap-2 text-base group"
          >
            Partner With Us
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("#channels")}
            className="btn-outline inline-flex items-center justify-center gap-2 text-base"
          >
            <Play size={16} className="text-lavender fill-current" />
            See Our Channels
          </button>
        </div>

        {/* Live stats strip */}
        <div className="relative bg-navy-card/80 backdrop-blur-sm border border-violet-brand/20 rounded-3xl px-6 py-8 shadow-card max-w-2xl mx-auto"
          style={{ boxShadow: "0 0 40px rgba(124,58,237,0.12), 0 2px 20px rgba(0,0,0,0.4)" }}>
          {/* Top accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-0.5 rounded-full bg-violet-gradient" aria-hidden="true" />

          <div className="grid grid-cols-3 gap-4 divide-x divide-violet-brand/15">
            <StatCard value={statsData?.totals?.subscribers} label="Subscribers" loading={statsLoading} />
            <div className="pl-4">
              <StatCard value={statsData?.totals?.views} label="Total Views" loading={statsLoading} />
            </div>
            <div className="pl-4">
              <StatCard value={3} label="Channels" loading={false} />
            </div>
          </div>

          <p className="text-center font-mono text-xs text-muted mt-5 opacity-50">
            {statsLoading ? "Fetching live stats…" : "Live from YouTube · Updates every 15 min"}
          </p>
        </div>

        {/* Scroll nudge */}
        <div className="mt-10 flex justify-center">
          <button onClick={() => scrollTo("#about")}
            className="flex flex-col items-center gap-1 text-muted opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Scroll down">
            <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-violet-brand" style={{ animation: "float 1.5s ease-in-out infinite" }} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
