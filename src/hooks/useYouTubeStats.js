// src/hooks/useYouTubeStats.js
import { useState, useEffect, useRef } from "react";

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export function useYouTubeStats() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null);

  const fetchStats = async () => {
    try {
      const res = await fetch("/.netlify/functions/stats");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    intervalRef.current = setInterval(fetchStats, REFRESH_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, []);

  return { data, loading, error };
}
