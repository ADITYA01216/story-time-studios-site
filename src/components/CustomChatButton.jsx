import React from 'react';
import { Sparkles } from 'lucide-react';

export default function CustomChatButton() {
  const openChat = () => {
    // Try to use the standard n8n API
    if (window.Chatbot && window.Chatbot.open) {
      window.Chatbot.open();
    } else {
      // Fallback: simulate click on the invisible default toggle button
      const defaultToggle = document.querySelector('.chat-window-toggle') || document.querySelector('[class*="chat-toggle"]');
      if (defaultToggle) {
        defaultToggle.click();
      }
    }
  };

  return (
    <button 
      onClick={openChat}
      className="fixed bottom-5 right-5 z-[9998] flex items-center justify-center w-[60px] h-[60px] rounded-full bg-gradient-to-br from-violet to-pink shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)] transition-all hover:-translate-y-1"
      aria-label="Open Chat"
    >
      <Sparkles className="w-7 h-7 text-white" />
    </button>
  );
}
