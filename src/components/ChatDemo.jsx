import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

export default function ChatDemo() {
  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center items-center gap-6 z-[9999] pointer-events-none">
      
      {/* Option 1: Founder Pill */}
      <button className="pointer-events-auto group relative flex items-center gap-3 bg-navy-card/90 backdrop-blur-md border border-violet/30 py-2 px-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:border-violet/60 transition-all hover:-translate-y-1">
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-violet/50">
          <img src="/images/rekha-photo.jpg" alt="Rekha" className="w-full h-full object-cover" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-navy-card rounded-full"></div>
        </div>
        <div className="flex flex-col items-start pr-3">
          <span className="text-xs text-muted uppercase tracking-wider font-mono">Online</span>
          <span className="text-sm font-bold text-snow">Chat with us</span>
        </div>
      </button>

      {/* Option 2: Neon Studio Glow */}
      <button className="pointer-events-auto relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-violet to-pink shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] transition-all hover:-translate-y-1">
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {/* Option 3: Frosted Glass Orb */}
      <button className="pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full bg-navy/60 backdrop-blur-lg border border-snow/20 shadow-lg hover:bg-navy/80 hover:border-violet/50 transition-all hover:-translate-y-1">
        <MessageSquare className="w-6 h-6 text-snow" />
      </button>

    </div>
  );
}
