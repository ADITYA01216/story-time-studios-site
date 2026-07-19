// src/sections/Channels.jsx
import { TvMinimalPlay, Eye, Play, ExternalLink, Users, Video } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { formatCount } from "../utils/format";

const CHANNEL_META = [
  {
    id: "UCv57OuOmg5lzgmt2OKobMAw",
    name: "Story Time Kids",
    handle: "@storytimebyrekha",
    url: "https://youtube.com/@storytimebyrekha",
    description: "Hindi stories for kids: moral stories, fairy tales, Panchatantra, and soothing bedtime stories — narrated with warmth and creativity.",
    emoji: "📖",
    accentColor: "#7C3AED",
    glowColor: "rgba(124,58,237,0.25)",
    badgeLabel: "Kids & Family",
  },
  {
    id: "UCly-ws05M0u5UE3KlEox-3A",
    name: "Magic Tales TV",
    handle: "@magictalesbyrekha",
    url: "https://youtube.com/@magictalesbyrekha",
    description: "Hindi fairy tales and bedtime stories, moral kahaniyaan — magical adventures that spark every child's imagination.",
    emoji: "🪄",
    accentColor: "#F472B6",
    glowColor: "rgba(244,114,182,0.25)",
    badgeLabel: "Fairy Tales",
  },
  {
    id: "UCsBRYCx-4HfFQku9EToboMA",
    name: "Vrat Kathaye",
    handle: "@vratkathayebyrekha",
    url: "https://youtube.com/@vratkathayebyrekha",
    description: "Vrat kathas, bhajans, and devotional stories rooted in Sanatan dharma — keeping spiritual traditions alive.",
    emoji: "🪔",
    accentColor: "#A78BFA",
    glowColor: "rgba(167,139,250,0.25)",
    badgeLabel: "Devotional",
  },
];

function ChannelSkeleton() {
  return (
    <div className="card p-6 space-y-5">
      <div className="flex items-center gap-4">
        <div className="skeleton w-14 h-14 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-36 rounded" />
          <div className="skeleton h-3 w-24 rounded" />
        </div>
      </div>
      <div className="skeleton h-16 w-full rounded-xl" />
      <div className="grid grid-cols-3 gap-3">
        <div className="skeleton h-16 rounded-xl" />
        <div className="skeleton h-16 rounded-xl" />
        <div className="skeleton h-16 rounded-xl" />
      </div>
      <div className="skeleton h-44 w-full rounded-xl" />
      <div className="skeleton h-11 w-full rounded-full" />
    </div>
  );
}

function StatMini({ icon: Icon, value, label, loading, accent }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 bg-navy-card2 rounded-xl border border-navy-border">
      <Icon size={13} className="text-muted mb-0.5" />
      <span className="font-mono font-semibold text-snow text-lg leading-none">
        {loading ? <span className="skeleton inline-block w-12 h-5 rounded" /> : formatCount(value)}
      </span>
      <span className="font-mono text-xs text-muted uppercase tracking-wider">{label}</span>
    </div>
  );
}

function ChannelCard({ meta, channelData, loading }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="reveal card p-6 flex flex-col gap-5 transition-all duration-300"
      style={{ "--hover-glow": meta.glowColor }}
    >
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: `${meta.accentColor}18`,
            border: `1.5px solid ${meta.accentColor}35`,
            boxShadow: `0 0 20px ${meta.glowColor}`,
          }}
        >
          {meta.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-bold text-snow text-lg"
              style={{ fontVariationSettings: "'opsz' 18, 'wght' 700" }}>
              {meta.name}
            </h3>
            <span
              className="px-2.5 py-0.5 rounded-full font-mono text-xs text-white"
              style={{ background: meta.accentColor }}
            >
              {meta.badgeLabel}
            </span>
          </div>
          <p className="font-mono text-xs text-muted mt-1">{meta.handle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="font-body text-muted text-sm leading-relaxed">{meta.description}</p>

      {/* Live stats */}
      <div className="grid grid-cols-3 gap-2">
        <StatMini icon={Users} value={channelData?.subscribers} label="Subs" loading={loading && !channelData} accent={meta.accentColor} />
        <StatMini icon={Eye} value={channelData?.views} label="Views" loading={loading && !channelData} accent={meta.accentColor} />
        <StatMini icon={Video} value={channelData?.videos} label="Videos" loading={loading && !channelData} accent={meta.accentColor} />
      </div>

      {/* Latest video */}
      {channelData?.latestVideoId && (
        <div>
          <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Play size={10} className="fill-current" style={{ color: meta.accentColor }} />
            Latest Upload
          </p>
          {channelData.latestVideoTitle && (
            <p className="font-body text-xs text-snow font-medium mb-2 line-clamp-2">{channelData.latestVideoTitle}</p>
          )}
          <div className="video-wrapper" style={{ boxShadow: `0 4px 20px ${meta.glowColor}` }}>
            <iframe
              src={`https://www.youtube.com/embed/${channelData.latestVideoId}?rel=0&modestbranding=1`}
              title={channelData.latestVideoTitle || `Latest from ${meta.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* CTA */}
      <a
        href={meta.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-full font-body font-semibold text-sm text-white transition-all hover:opacity-90 hover:shadow-lg mt-auto focus:outline-none focus-visible:ring-2"
        style={{
          background: `linear-gradient(135deg, ${meta.accentColor} 0%, ${meta.accentColor}cc 100%)`,
          boxShadow: `0 4px 15px ${meta.glowColor}`,
        }}
      >
        <TvMinimalPlay size={15} />
        Visit Channel
        <ExternalLink size={13} className="opacity-70" />
      </a>
    </div>
  );
}

export default function Channels({ statsData, statsLoading }) {
  const headRef = useScrollReveal();

  const channelMap = {};
  if (statsData?.channels) {
    statsData.channels.forEach((ch) => { channelMap[ch.id] = ch; });
  }

  return (
    <section
      id="channels"
      className="py-20 sm:py-28"
      style={{ background: "linear-gradient(180deg, #0D0F1A 0%, #0F1020 50%, #0D0F1A 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headRef} className="reveal text-center mb-14">
          <span className="pill bg-violet-brand/12 text-lavender border border-violet-brand/25 mb-4 inline-flex">
            <TvMinimalPlay size={11} />
            Our Channels
          </span>
          <h2 className="font-display font-bold text-snow"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontVariationSettings: "'opsz' 40, 'wght' 700" }}>
            Three Channels,{" "}
            <span className="gradient-text">One Trusted Voice</span>
          </h2>
          <p className="font-body text-muted mt-3 text-lg max-w-2xl mx-auto">
            Live stats pulled directly from YouTube — never hardcoded. Every number is real.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {statsLoading && !statsData
            ? CHANNEL_META.map((m) => <ChannelSkeleton key={m.id} />)
            : CHANNEL_META.map((meta) => (
                <ChannelCard key={meta.id} meta={meta}
                  channelData={channelMap[meta.id] || null} loading={statsLoading} />
              ))}
        </div>

        {statsData && (
          <p className="text-center font-mono text-xs text-muted mt-8 opacity-40">
            Cached · refreshes every 15 min · fetched at {new Date(statsData.updatedAt).toLocaleTimeString()}
          </p>
        )}
      </div>
    </section>
  );
}
