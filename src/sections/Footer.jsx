// src/sections/Footer.jsx
import { TvMinimalPlay, Heart, Share2 } from "lucide-react";

const CHANNELS = [
  { name: "Story Time Kids", url: "https://youtube.com/@storytimebyrekha", emoji: "📖" },
  { name: "Magic Tales TV", url: "https://youtube.com/@magictalesbyrekha", emoji: "🪄" },
  { name: "Vrat Kathaye", url: "https://youtube.com/@vratkathayebyrekha", emoji: "🪔" },
];

function scrollTo(href) {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pt-14 pb-8 border-t"
      style={{ background: "#0a0c16", borderColor: "rgba(124,58,237,0.1)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-violet-gradient flex items-center justify-center shadow-glow-sm">
                <TvMinimalPlay size={15} className="text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-snow text-base block leading-none"
                  style={{ fontVariationSettings: "'opsz' 20, 'wght' 700" }}>Story Time</span>
                <span className="font-mono text-lavender text-xs tracking-widest">STUDIOS</span>
              </div>
            </div>
            <p className="font-body text-muted text-sm leading-relaxed max-w-xs mb-4">
              A Hindi-language YouTube content studio dedicated to inspiring, educating, and empowering
              audiences through meaningful storytelling.
            </p>
            <p className="font-body text-muted text-sm">
              Founded by{" "}
              <span className="text-lavender font-medium">Rekha Agarwal</span>
            </p>
            <a href="mailto:rekha.yt.business@gmail.com"
              className="font-mono text-xs text-violet-light hover:text-lavender transition-colors mt-2 block">
              rekha.yt.business@gmail.com
            </a>
          </div>

          {/* Channels */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Our Channels</h4>
            <ul className="flex flex-col gap-3">
              {CHANNELS.map((ch) => (
                <li key={ch.name}>
                  <a href={ch.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 group">
                    <span>{ch.emoji}</span>
                    <span className="font-body text-sm text-muted group-hover:text-snow transition-colors">{ch.name}</span>
                    <TvMinimalPlay size={12} className="text-violet-light opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "About Us", href: "#about" },
                { label: "Channels", href: "#channels" },
                { label: "Speaking", href: "#speaking" },
                { label: "Why Us", href: "#why-collaborate" },
                { label: "Partner With Us", href: "#collaborate" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                    className="font-body text-sm text-muted hover:text-snow transition-colors focus:outline-none">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {CHANNELS.map((ch) => (
            <a key={ch.name} href={ch.url} target="_blank" rel="noopener noreferrer"
              aria-label={`Story Time Studios on YouTube — ${ch.name}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-medium text-snow transition-all"
              style={{ background: "#141627", border: "1px solid rgba(124,58,237,0.2)" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(124,58,237,0.45)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)"}
            >
              <span>{ch.emoji}</span>
              <TvMinimalPlay size={13} className="text-violet-light" />
              {ch.name}
            </a>
          ))}
          <a href="https://www.instagram.com/storytimekids4" target="_blank" rel="noopener noreferrer"
            aria-label="Story Time Studios on Instagram @storytimekids4"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-medium text-snow transition-all"
            style={{ background: "#141627", border: "1px solid rgba(236,72,153,0.2)" }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(236,72,153,0.45)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(236,72,153,0.2)"}
          >
            <Share2 size={13} className="text-pink-brand" />
            @storytimekids4
          </a>
        </div>

        {/* Bottom bar */}
        <div className="border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(124,58,237,0.08)" }}>
          <p className="font-mono text-xs text-muted opacity-60">
            © {year} Story Time Studios. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted opacity-60 flex items-center gap-1">
            Site by <a href="mailto:adityaagarwal1205@gmail.com" className="text-lavender font-medium hover:text-snow transition-colors">Aditya Agarwal</a>
            <span className="mx-1">·</span>
            Made with <Heart size={10} className="text-pink-brand fill-current mx-0.5" /> and stories
          </p>
        </div>
      </div>
    </footer>
  );
}
