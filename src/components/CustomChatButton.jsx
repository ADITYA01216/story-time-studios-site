import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sparkles, X } from 'lucide-react';

export default function CustomChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  // Find the real n8n toggle button in the DOM and click it
  const clickN8nToggle = useCallback(() => {
    const toggle = document.querySelector('.chat-window-toggle');
    if (toggle) {
      // Use dispatchEvent for maximum reliability
      toggle.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      return true;
    }
    return false;
  }, []);

  const toggleChat = useCallback(() => {
    const didClick = clickN8nToggle();
    if (didClick) {
      setIsOpen(prev => !prev);
    }
  }, [clickN8nToggle]);

  // Close chat when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      // Ignore clicks on our own button
      if (buttonRef.current && buttonRef.current.contains(event.target)) return;

      const path = event.composedPath ? event.composedPath() : [];
      
      // Check if they clicked the internal close button (the pink X)
      const clickedCloseButton = path.some(el => el && el.classList && el.classList.contains('chat-close-button'));
      if (clickedCloseButton) {
        event.preventDefault();
        event.stopPropagation();
        clickN8nToggle();
        setIsOpen(false);
        return;
      }

      // Ignore clicks inside the n8n chat window
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow && chatWindow.contains(event.target)) return;

      // Ignore clicks inside the n8n chat wrapper (covers header, input, etc.)
      const chatWrapper = document.querySelector('.chat-window-wrapper');
      if (chatWrapper && chatWrapper.contains(event.target)) return;

      // Clicked outside — close the chat
      clickN8nToggle();
      setIsOpen(false);
    };

    // Use a slight delay so the current click doesn't immediately trigger close
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, true);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [isOpen, clickN8nToggle]);

  // Sync state if user closes via the built-in close button inside the chat
  useEffect(() => {
    const interval = setInterval(() => {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        const isVisible = chatWindow.offsetParent !== null && 
                          getComputedStyle(chatWindow).display !== 'none';
        if (!isVisible && isOpen) {
          setIsOpen(false);
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleChat}
      className={`fixed bottom-5 right-5 z-[9998] flex items-center justify-center w-[60px] h-[60px] rounded-full transition-all duration-300 hover:-translate-y-1 ${
        isOpen
          ? 'bg-[#1C1F35] border border-[rgba(124,58,237,0.4)] shadow-[0_0_20px_rgba(0,0,0,0.5)] rotate-90'
          : 'bg-gradient-to-br from-[#7C3AED] to-[#F472B6] shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_40px_rgba(244,114,182,0.6)]'
      }`}
      aria-label={isOpen ? 'Close Chat' : 'Open Chat'}
    >
      {isOpen
        ? <X className="w-6 h-6 text-[#E2E8F0]" />
        : <Sparkles className="w-7 h-7 text-white" />
      }
    </button>
  );
}
