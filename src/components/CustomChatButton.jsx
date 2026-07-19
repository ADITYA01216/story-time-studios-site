import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function CustomChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const toggleChat = () => {
    if (isOpen) {
      if (window.Chatbot && window.Chatbot.close) window.Chatbot.close();
      setIsOpen(false);
    } else {
      if (window.Chatbot && window.Chatbot.open) {
        window.Chatbot.open();
      } else {
        // Fallback: simulate click on the invisible default toggle button
        const defaultToggle = document.querySelector('.chat-window-toggle') || document.querySelector('[class*="chat-toggle"]');
        if (defaultToggle) {
          defaultToggle.click();
        }
      }
      setIsOpen(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isOpen) return;

      // Don't close if they clicked our toggle button itself
      if (buttonRef.current && buttonRef.current.contains(event.target)) return;

      // Check if they clicked inside the n8n chat window.
      // event.composedPath() allows us to pierce through Shadow DOMs.
      const path = event.composedPath ? event.composedPath() : [];
      const clickedInsideChat = path.some(el => {
        if (el && el.classList) {
          return Array.from(el.classList).some(cls => cls.includes('chat') || cls.includes('n8n'));
        }
        // Check if the element is the shadow root host itself
        if (el && el.id && (el.id.includes('chat') || el.id.includes('n8n'))) return true;
        return false;
      });

      if (clickedInsideChat) return;

      // Clicked outside, so close the chat
      if (window.Chatbot && window.Chatbot.close) window.Chatbot.close();
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside); // For mobile

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <button 
      ref={buttonRef}
      onClick={toggleChat}
      className={`fixed bottom-5 right-5 z-[9998] flex items-center justify-center w-[60px] h-[60px] rounded-full transition-all hover:-translate-y-1 ${
        isOpen 
          ? 'bg-navy-card border border-violet/30 hover:bg-navy-card2 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
          : 'bg-gradient-to-br from-violet to-pink shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)]'
      }`}
      aria-label={isOpen ? "Close Chat" : "Open Chat"}
    >
      {isOpen ? <X className="w-6 h-6 text-snow" /> : <Sparkles className="w-7 h-7 text-white" />}
    </button>
  );
}
