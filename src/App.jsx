// src/App.jsx
import { useEffect } from "react";
import { useYouTubeStats } from "./hooks/useYouTubeStats";
import Navbar from "./components/Navbar";
import StoryThread from "./components/StoryThread";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Channels from "./sections/Channels";
import Speaking from "./sections/Speaking";
import WhyCollaborate from "./sections/WhyCollaborate";
import InstagramSection from "./sections/Instagram";
import Collaborate from "./sections/Collaborate";
import Footer from "./sections/Footer";
import CustomChatButton from "./components/CustomChatButton";

export default function App() {
  const { data: statsData, loading: statsLoading } = useYouTubeStats();

  useEffect(() => {
    // Add n8n chat styles
    if (!document.querySelector('link[href*="@n8n/chat"]')) {
      const link = document.createElement("link");
      link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);

      // Force inject theme overrides AFTER the CDN stylesheet
      const style = document.createElement("style");
      style.innerHTML = `
        :root {
          --chat--color-primary: #7C3AED !important;
          --chat--color-primary-shade-50: #9B5CF6 !important;
          --chat--color-primary-shade-100: #5B21B6 !important;
          --chat--color-secondary: #F472B6 !important;
          --chat--color-secondary-shade-50: #F9A8D4 !important;
          --chat--color-white: #141627 !important;
          --chat--color-light: #1C1F35 !important;
          --chat--color-light-shade-50: #0D0F1A !important;
          --chat--color-light-shade-100: #0D0F1A !important;
          --chat--color-dark: #E2E8F0 !important;
          --chat--color-dark-shade-50: #94A3B8 !important;
          --chat--color-font: #E2E8F0 !important;
          --chat--window--background-color: #141627 !important;
        }
        /* Aggressively hide the default n8n toggle button */
        .chat-toggle-button, .n8n-chat-widget__toggle, button[class*="chat-toggle"] {
           display: none !important;
           opacity: 0 !important;
           pointer-events: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    // Dynamically import the n8n chat module and initialize
    import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js")
      .then(({ createChat }) => {
        createChat({
          webhookUrl: "https://aditya12166661.app.n8n.cloud/webhook/64834d14-d6f9-4f8b-ab8c-1d28e6bd668f/chat",
          mode: "window",
          initialMessages: [
            "Welcome to Story Time Studios! ✨",
            "I'm here to help answer any questions about our YouTube channels, content, or partnership opportunities. How can I assist you today?"
          ],
          i18n: {
            en: {
              title: "Story Time Studios",
              subtitle: "We're here to help you 24/7.",
              getStarted: "Start Conversation",
              inputPlaceholder: "Type your question...",
            }
          },
          theme: {
            button: {
              backgroundColor: "transparent",
              iconColor: "transparent",
            },
            chatWindow: {
              backgroundColor: "#141627",
              textColor: "#E2E8F0",
              welcomeMessage: "Welcome to Story Time Studios! ✨",
              textInput: {
                backgroundColor: "#1C1F35",
                textColor: "#E2E8F0",
              },
              userMessage: {
                backgroundColor: "#7C3AED",
                textColor: "#ffffff",
              },
              botMessage: {
                backgroundColor: "#1C1F35",
                textColor: "#E2E8F0",
              },
            },
          },
        });
      })
      .catch((err) => console.error("Failed to load n8n chat widget:", err));
      
      // Secondary cleanup: actively hide default toggle if it bypasses CSS
      const interval = setInterval(() => {
        const defaultToggle = document.querySelector('.chat-window-toggle') || document.querySelector('[class*="chat-toggle"]');
        if (defaultToggle) {
          defaultToggle.style.display = 'none';
          defaultToggle.style.opacity = '0';
          defaultToggle.style.pointerEvents = 'none';
        }
      }, 500);
      
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#0D0F1A" }}>
      <StoryThread />
      <Navbar />
      <main>
        <Hero statsData={statsData} statsLoading={statsLoading} />
        <About />
        <Channels statsData={statsData} statsLoading={statsLoading} />
        <Speaking />
        <WhyCollaborate />
        <InstagramSection />
        <Collaborate />
      </main>
      <Footer />
      <CustomChatButton />
    </div>
  );
}
