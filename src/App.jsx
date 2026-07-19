// src/App.jsx
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
