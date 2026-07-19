// src/sections/Instagram.jsx
import { Share2, ExternalLink } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function InstagramSection() {
  const ref = useScrollReveal();

  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal">
          <div className="card p-8 flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left"
            style={{ background: "linear-gradient(135deg, #141627 0%, #1a1230 100%)" }}>

            {/* Instagram icon */}
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-lg"
              style={{ background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" }}>
              <Share2 size={36} className="text-white" />
            </div>

            {/* Text */}
            <div className="flex-1">
              <p className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Follow on Instagram</p>
              <h3 className="font-display font-bold text-snow text-2xl mb-2"
                style={{ fontVariationSettings: "'opsz' 24, 'wght' 700" }}>
                @storytimekids4
              </h3>
              <p className="font-body text-muted text-sm mb-3">
                Behind-the-scenes, story clips, and updates from Story Time Studios.
              </p>
              <p className="font-mono text-xs text-muted opacity-50">
                Live feed embed coming in a future update (requires Instagram Business API).
              </p>
            </div>

            {/* CTA */}
            <a
              href="https://www.instagram.com/storytimekids4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full font-body font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg focus:outline-none"
              style={{ background: "linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)" }}
            >
              Follow
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
