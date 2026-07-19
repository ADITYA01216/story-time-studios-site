// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X, PlayCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Channels", href: "#channels" },
  { label: "Speaking", href: "#speaking" },
  { label: "Why Us", href: "#why-collaborate" },
  { label: "Partner With Us", href: "#collaborate", highlight: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "nav-solid" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-xl bg-violet-gradient flex items-center justify-center shadow-glow-sm">
              <PlayCircle size={16} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-snow text-base tracking-tight block leading-none"
                style={{ fontVariationSettings: "'opsz' 20, 'wght' 700" }}>
                Story Time
              </span>
              <span className="font-mono text-lavender text-xs tracking-widest block">STUDIOS</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.highlight ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="ml-3 btn-primary text-sm px-5 py-2.5 inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-brand"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="px-4 py-2 rounded-lg text-sm font-body font-medium text-muted hover:text-snow hover:bg-violet-brand/10 transition-all focus:outline-none"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-snow hover:bg-violet-brand/15 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "rgba(13,15,26,0.97)", backdropFilter: "blur(16px)" }}
      >
        <nav className="px-4 pb-5 pt-2 flex flex-col gap-1.5 border-t border-violet-brand/10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className={`px-4 py-3 rounded-xl font-body font-semibold text-sm transition-all ${
                link.highlight
                  ? "bg-violet-gradient text-white text-center shadow-glow-sm"
                  : "text-snow hover:bg-violet-brand/12"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
