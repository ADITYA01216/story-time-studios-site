// src/sections/WhyCollaborate.jsx
import { CheckCircle2, Handshake } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const REASONS = [
  {
    title: "Multi-niche reach, one trusted voice",
    body: "Our channels reach families across very different moments of their day — bedtime, prayer time, and planning time. One studio, three distinct audiences.",
    accent: "#7C3AED",
  },
  {
    title: "Consistent, quality output across three active channels",
    body: "Not a one-off audience — three channels publishing regularly, each building its own loyal, engaged community.",
    accent: "#F472B6",
  },
  {
    title: "A voice audiences already trust",
    body: "Devotional and motivational content both live or die on trust — our audience already comes to us for both, consistently.",
    accent: "#A78BFA",
  },
  {
    title: "Flexible partnership formats",
    body: "Sponsored stories, devotional content partnerships, motivational campaigns, or live speaking engagements — we shape the format around your brand.",
    accent: "#7C3AED",
  },
];

function ReasonCard({ reason, delay }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="reveal card p-7 flex gap-5"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${reason.accent}15`,
            border: `1px solid ${reason.accent}30`,
          }}>
          <CheckCircle2 size={20} style={{ color: reason.accent }} />
        </div>
      </div>
      <div>
        <h3 className="font-display font-semibold text-snow mb-2"
          style={{ fontSize: "1.05rem", fontVariationSettings: "'opsz' 16, 'wght' 600" }}>
          {reason.title}
        </h3>
        <p className="font-body text-muted text-sm leading-relaxed">{reason.body}</p>
      </div>
    </div>
  );
}

export default function WhyCollaborate() {
  const headRef = useScrollReveal();

  return (
    <section
      id="why-collaborate"
      className="py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #0D0F1A 0%, #0a0c18 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headRef} className="reveal text-center mb-14">
          <span className="pill bg-violet-brand/12 text-lavender border border-violet-brand/25 mb-4 inline-flex">
            <Handshake size={11} />
            For Brands &amp; Agencies
          </span>
          <h2 className="font-display font-bold text-snow"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontVariationSettings: "'opsz' 40, 'wght' 700" }}>
            Why Partner With{" "}
            <span className="gradient-text">Story Time Studios?</span>
          </h2>
          <p className="font-body text-muted mt-3 text-lg max-w-xl mx-auto">
            Four reasons brands choose a studio that spans stories, spirituality, and motivation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {REASONS.map((reason, i) => (
            <ReasonCard key={reason.title} reason={reason} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
