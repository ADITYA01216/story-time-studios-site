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

export default function App() {
  const { data: statsData, loading: statsLoading } = useYouTubeStats();

  useEffect(() => {
    // Add n8n chat styles
    if (!document.querySelector('link[href*="@n8n/chat"]')) {
      const link = document.createElement("link");
      link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    // Dynamically import the n8n chat module and initialize
    import(/* @vite-ignore */ "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js")
      .then(({ createChat }) => {
        createChat({
          webhookUrl: "https://aditya12166661.app.n8n.cloud/webhook/64834d14-d6f9-4f8b-ab8c-1d28e6bd668f/chat"
        });
      })
      .catch((err) => console.error("Failed to load n8n chat widget:", err));
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
    </div>
  );
}
