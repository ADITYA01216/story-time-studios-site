// src/sections/Speaking.jsx
import { Mic2, ArrowRight, Star, Globe, Heart, Users } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const SPEAKING_POINTS = [
  { icon: Star, text: "Confidence & self-belief workshops" },
  { icon: Globe, text: "Positive thinking seminars" },
  { icon: Heart, text: "Purposeful living keynotes" },
  { icon: Users, text: "Corporate & school speaking sessions" },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Speaking() {
  const ref = useScrollReveal();

  return (
    <section
      id="speaking"
      className="py-20 sm:py-28"
      style={{ background: "linear-gradient(135deg, rgba(244,114,182,0.04) 0%, #0D0F1A 50%, rgba(124,58,237,0.04) 100%)" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal">
          {/* Badge */}
          <div className="text-center mb-12">
            <span className="pill bg-pink-brand/12 text-pink-brand border border-pink-brand/25 mb-4 inline-flex">
              <Mic2 size={11} />
              Motivational Speaking
            </span>
            <h2 className="font-display font-bold text-snow"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontVariationSettings: "'opsz' 40, 'wght' 700" }}>
              A Voice That{" "}
              <span className="text-pink-brand">Moves Audiences</span>
            </h2>
            <p className="font-body text-muted mt-3 text-lg max-w-xl mx-auto">
              Talks that encourage confidence, positive thinking, self-growth, and purposeful living.
              Available for corporate events, schools, and community gatherings.
            </p>
          </div>

          {/* Card */}
          <div className="card p-10 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #141627 0%, #1a1530 100%)" }}>

            {/* Decorative quote */}
            <div aria-hidden="true"
              className="absolute top-4 right-8 font-display text-9xl text-pink-brand/8 leading-none pointer-events-none select-none"
              style={{ fontVariationSettings: "'opsz' 72, 'wght' 700" }}>
              "
            </div>

            {/* Glow blob */}
            <div aria-hidden="true" className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)", filter: "blur(30px)" }} />

            <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-start">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{
                    background: "rgba(244,114,182,0.1)",
                    border: "1.5px solid rgba(244,114,182,0.25)",
                    boxShadow: "0 0 30px rgba(244,114,182,0.15)",
                  }}>
                  <Mic2 size={40} className="text-pink-brand" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-body text-snow text-lg leading-relaxed mb-8">
                  Our founder Rekha Agarwal brings energy, warmth, and lived experience to every stage.
                  Whether it's a school assembly, a corporate wellness session, or a community event —
                  every talk leaves audiences thinking, feeling, and acting differently.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {SPEAKING_POINTS.map(({ icon: Icon, text }) => (
                    <div key={text}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: "rgba(244,114,182,0.06)", border: "1px solid rgba(244,114,182,0.12)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(244,114,182,0.1)" }}>
                        <Icon size={15} className="text-pink-brand" />
                      </div>
                      <span className="font-body text-snow text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollTo("#collaborate")}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-body font-bold text-base text-white shadow-lg transition-all duration-300 focus:outline-none"
                  style={{
                    background: "linear-gradient(135deg, #EC4899 0%, #F472B6 100%)",
                    boxShadow: "0 4px 20px rgba(244,114,182,0.35)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 30px rgba(244,114,182,0.55)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(244,114,182,0.35)"}
                >
                  Book a Speaking Session
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
