// src/sections/Collaborate.jsx
import { Mail, ArrowRight, Handshake, Send, Zap } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useState } from "react";

const COLLAB_TYPES = [
  "Sponsored Video",
  "Brand Integration",
  "Speaking Engagement",
  "Other",
];

export default function Collaborate() {
  const ref = useScrollReveal();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    // Switch to FormSubmit.co for instant email delivery directly to inbox
    fetch("https://formsubmit.co/ajax/rekha.yt.business@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(Object.fromEntries(data)),
    })
      .then(response => response.json())
      .then(data => setSubmitted(true))
      .catch(error => setSubmitted(true));
  }

  return (
    <section
      id="collaborate"
      className="py-20 sm:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.06) 0%, #0D0F1A 40%, rgba(244,114,182,0.04) 100%)" }}
    >
      {/* Glow blobs */}
      <div aria-hidden="true" className="absolute top-10 right-10 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div aria-hidden="true" className="absolute bottom-10 left-10 w-56 h-56 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className="reveal text-center mb-14">
          <span className="pill bg-violet-brand/12 text-lavender border border-violet-brand/25 mb-4 inline-flex">
            <Handshake size={11} />
            Let's Work Together
          </span>
          <h2 className="font-display font-bold text-snow"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontVariationSettings: "'opsz' 40, 'wght' 700" }}>
            Start a{" "}
            <span className="gradient-text">Partnership</span>
          </h2>
          <p className="font-body text-muted mt-3 text-lg max-w-xl mx-auto">
            Whether you're a brand, an event organiser, or a media agency — we'd love to hear from you.
            Let's build something together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Direct email card */}
          <div className="card p-8 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, #141627 0%, #1a1530 100%)" }}>
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: "rgba(124,58,237,0.15)", border: "1.5px solid rgba(124,58,237,0.3)", boxShadow: "0 0 20px rgba(124,58,237,0.2)" }}>
                <Mail size={26} className="text-lavender" />
              </div>
              <h3 className="font-display font-semibold text-snow mb-2"
                style={{ fontSize: "1.3rem", fontVariationSettings: "'opsz' 18, 'wght' 600" }}>
                Email Us Directly
              </h3>
              <p className="font-body text-muted text-sm leading-relaxed mb-6">
                Prefer a direct line? Drop us an email and we'll respond personally within 48 hours.
              </p>
            </div>
            <a
              href="mailto:rekha.yt.business@gmail.com"
              className="group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full font-body font-bold text-base text-white transition-all duration-300 focus:outline-none"
              style={{
                background: "linear-gradient(135deg, #7C3AED 0%, #9B5CF6 100%)",
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 30px rgba(124,58,237,0.6)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.4)"}
            >
              <Mail size={17} />
              rekha.yt.business@gmail.com
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Contact form */}
          <div className="card p-8" style={{ background: "#141627" }}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.15)", border: "1.5px solid rgba(124,58,237,0.3)", boxShadow: "0 0 25px rgba(124,58,237,0.2)" }}>
                  <Zap size={28} className="text-lavender" />
                </div>
                <h3 className="font-display font-semibold text-snow"
                  style={{ fontSize: "1.3rem", fontVariationSettings: "'opsz' 18, 'wght' 600" }}>
                  Message Received! 🎉
                </h3>
                <p className="font-body text-muted text-sm">
                  Thanks for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form
                name="collaborate"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <input type="hidden" name="form-name" value="collaborate" />
                <p className="hidden"><label>Don't fill this: <input name="bot-field" /></label></p>

                {[
                  { id: "collab-name", name: "name", type: "text", label: "Your Name", placeholder: "Priya Sharma" },
                  { id: "collab-email", name: "email", type: "email", label: "Email", placeholder: "priya@yourbrand.com" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block font-body font-medium text-snow text-sm mb-1.5">
                      {field.label} <span className="text-pink-brand">*</span>
                    </label>
                    <input
                      id={field.id} name={field.name} type={field.type} required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 rounded-xl font-body text-sm text-snow placeholder:text-muted/50 transition-all focus:outline-none focus:ring-2"
                      style={{
                        background: "#0D0F1A",
                        border: "1px solid rgba(124,58,237,0.2)",
                        focusRingColor: "#7C3AED",
                      }}
                      onFocus={(e) => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                      onBlur={(e) => e.target.style.borderColor = "rgba(124,58,237,0.2)"}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="collab-type" className="block font-body font-medium text-snow text-sm mb-1.5">
                    Partnership Type <span className="text-pink-brand">*</span>
                  </label>
                  <select id="collab-type" name="collaboration_type" required
                    className="w-full px-4 py-3 rounded-xl font-body text-sm text-snow transition-all focus:outline-none appearance-none cursor-pointer"
                    style={{ background: "#0D0F1A", border: "1px solid rgba(124,58,237,0.2)" }}
                    onFocus={(e) => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(124,58,237,0.2)"}
                  >
                    <option value="" disabled>Select a type…</option>
                    {COLLAB_TYPES.map((type) => (
                      <option key={type} value={type} style={{ background: "#141627" }}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="collab-message" className="block font-body font-medium text-snow text-sm mb-1.5">
                    Message <span className="text-pink-brand">*</span>
                  </label>
                  <textarea id="collab-message" name="message" required rows={4}
                    placeholder="Tell us about your brand and what you have in mind…"
                    className="w-full px-4 py-3 rounded-xl font-body text-sm text-snow placeholder:text-muted/50 transition-all focus:outline-none resize-none"
                    style={{ background: "#0D0F1A", border: "1px solid rgba(124,58,237,0.2)" }}
                    onFocus={(e) => e.target.style.borderColor = "rgba(124,58,237,0.5)"}
                    onBlur={(e) => e.target.style.borderColor = "rgba(124,58,237,0.2)"}
                  />
                </div>

                <button type="submit"
                  className="group flex items-center justify-center gap-2 w-full py-4 px-6 rounded-full font-body font-bold text-base text-white transition-all duration-300 focus:outline-none"
                  style={{
                    background: "linear-gradient(135deg, #7C3AED 0%, #9B5CF6 100%)",
                    boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 30px rgba(124,58,237,0.6)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.4)"}
                >
                  Send Message
                  <Send size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
