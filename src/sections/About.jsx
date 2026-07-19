// src/sections/About.jsx
import { Sparkles, Wand2, Flame, Mic2, Users } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PILLARS = [
  {
    icon: Sparkles,
    label: "Story Time",
    description: "Engaging stories that entertain, educate, and inspire.",
    color: "text-lavender",
    bg: "bg-violet-brand/10",
    border: "border-violet-brand/20",
    glow: "rgba(124,58,237,0.15)",
  },
  {
    icon: Wand2,
    label: "Magic Tales",
    description: "Original magical adventures that spark imagination and creativity in children.",
    color: "text-pink-brand",
    bg: "bg-pink-brand/10",
    border: "border-pink-brand/20",
    glow: "rgba(244,114,182,0.15)",
  },
  {
    icon: Flame,
    label: "Vrat Katha",
    description: "Devotional stories that preserve tradition, culture, and spiritual values.",
    color: "text-pink-light",
    bg: "bg-pink-brand/8",
    border: "border-pink-brand/15",
    glow: "rgba(244,114,182,0.12)",
  },
  {
    icon: Mic2,
    label: "Motivational Speaking",
    description: "Talks that encourage confidence, positive thinking, self-growth, and purposeful living.",
    color: "text-lavender",
    bg: "bg-violet-brand/10",
    border: "border-violet-brand/20",
    glow: "rgba(124,58,237,0.15)",
  },
];

function PillarCard({ pillar, delay }) {
  const ref = useScrollReveal();
  const Icon = pillar.icon;
  return (
    <div
      ref={ref}
      className="reveal card p-5 flex flex-col gap-3"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-2xl ${pillar.bg} border ${pillar.border} flex items-center justify-center`}
        style={{ boxShadow: `0 0 20px ${pillar.glow}` }}>
        <Icon size={22} className={pillar.color} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-snow text-base mb-1"
          style={{ fontVariationSettings: "'opsz' 16, 'wght' 600" }}>
          {pillar.label}
        </h3>
        <p className="font-body text-muted text-sm leading-relaxed">{pillar.description}</p>
      </div>
    </div>
  );
}

export default function About() {
  const headRef = useScrollReveal();
  const bioRef = useScrollReveal();
  const photoRef = useScrollReveal();

  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div ref={headRef} className="reveal text-center mb-16">
          <span className="pill bg-violet-brand/12 text-lavender border border-violet-brand/25 mb-4 inline-flex">
            <Users size={11} />
            Who We Are
          </span>
          <h2
            className="font-display font-bold text-snow"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontVariationSettings: "'opsz' 40, 'wght' 700" }}
          >
            A Content Studio Built on{" "}
            <span className="gradient-text">Trust & Story</span>
          </h2>
          <p className="font-body text-muted mt-4 text-lg max-w-2xl mx-auto">
            Story Time Studios operates three active Hindi YouTube channels reaching families across India —
            at bedtime, prayer time, and life planning time.
          </p>
        </div>

        {/* Bio + Photo */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Photo */}
          <div ref={photoRef} className="reveal order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-3 rounded-3xl border border-dashed border-violet-brand/20" aria-hidden="true" />
              <div className="relative rounded-2xl overflow-hidden bg-navy-card border border-violet-brand/15 shadow-card aspect-[4/5]">
                <img
                  src="/images/rekha-photo.jpg"
                  alt="Rekha Agarwal — Founder of Story Time Studios, Motivational Speaker and Storyteller"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  style={{ display: "none", background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(244,114,182,0.05) 100%)" }}>
                  <span style={{ fontSize: "5rem" }}>📸</span>
                  <p className="font-mono text-xs text-muted text-center px-4">
                    Drop photo at<br />
                    <code className="text-lavender">/public/images/rekha-photo.jpg</code>
                  </p>
                </div>
              </div>
              {/* Floating founder badge */}
              <div className="absolute -bottom-4 -right-4 bg-violet-gradient text-white rounded-2xl px-4 py-3 shadow-glow">
                <p className="font-mono text-xs opacity-80">Founded by</p>
                <p className="font-display font-bold text-sm">Rekha Agarwal</p>
              </div>
            </div>
          </div>

          {/* Bio text — company voice */}
          <div ref={bioRef} className="reveal order-1 lg:order-2">
            <p className="font-body text-snow text-lg leading-relaxed mb-5" style={{ lineHeight: "1.8" }}>
              Story Time Studios is a Hindi-language digital content studio dedicated to{" "}
              <span className="text-lavender font-semibold">inspiring, educating, and empowering</span>{" "}
              audiences through meaningful storytelling across children's content, devotional traditions,
              and motivational thought leadership.
            </p>
            <p className="font-body text-muted text-base leading-relaxed mb-6">
              Founded by{" "}
              <strong className="text-snow font-semibold">Rekha Agarwal</strong> — Motivational Speaker
              and Storyteller — our studio runs three active YouTube channels,
              each serving a distinct audience segment with consistent, trusted content.
            </p>
            <p className="font-body text-muted text-base leading-relaxed mb-8 italic">
              "Our work spans engaging children's stories, devotional storytelling, and motivational
              speaking — all aimed at enriching lives, one story at a time."
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {["3 YouTube Channels", "Hindi Content", "Family Audience", "Trusted Voice"].map((tag) => (
                <span key={tag}
                  className="px-4 py-2 rounded-full bg-navy-card2 border border-violet-brand/20 text-snow font-body text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="font-display font-bold text-snow"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontVariationSettings: "'opsz' 24, 'wght' 700" }}>
              What We Create
            </h3>
            <p className="font-body text-muted mt-2">Four content pillars. One studio.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.label} pillar={pillar} delay={i * 80} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
