// netlify/functions/stats.js
// YouTube Data API v3 proxy — keeps YOUTUBE_API_KEY server-side only.
// Caches combined result in-memory for 15 minutes.

const CHANNELS = [
  { id: "UCv57OuOmg5lzgmt2OKobMAw", name: "Story Time Kids" },
  { id: "UCly-ws05M0u5UE3KlEox-3A", name: "Magic Tales TV" },
  { id: "UCsBRYCx-4HfFQku9EToboMA", name: "Vrat Kathaye" },
];

let cache = { data: null, timestamp: 0 };
const CACHE_MS = 15 * 60 * 1000; // 15 minutes

exports.handler = async function () {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_MS) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(cache.data),
    };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  try {
    // 1. Fetch all three channels in one request (statistics + contentDetails)
    const ids = CHANNELS.map((c) => c.id).join(",");
    const chRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&id=${ids}&key=${apiKey}`
    );

    if (!chRes.ok) {
      throw new Error(`YouTube Channels API error: ${chRes.status}`);
    }

    const chJson = await chRes.json();

    if (!chJson.items || chJson.items.length === 0) {
      throw new Error("No channel data returned from YouTube API");
    }

    // 2. For each channel, fetch the latest video from the uploads playlist
    const channels = await Promise.all(
      chJson.items.map(async (item) => {
        const meta = CHANNELS.find((c) => c.id === item.id) || {
          name: "Unknown",
        };
        const uploadsId =
          item.contentDetails?.relatedPlaylists?.uploads ?? null;

        let latestVideoId = null;
        let latestVideoTitle = null;

        if (uploadsId) {
          try {
            const plRes = await fetch(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=1&key=${apiKey}`
            );
            if (plRes.ok) {
              const plJson = await plRes.json();
              const latest = plJson.items?.[0]?.snippet;
              latestVideoId = latest?.resourceId?.videoId ?? null;
              latestVideoTitle = latest?.title ?? null;
            }
          } catch {
            // Non-fatal: channel card still renders, just without latest video
          }
        }

        return {
          id: item.id,
          name: meta.name,
          subscribers: parseInt(item.statistics?.subscriberCount ?? "0", 10),
          views: parseInt(item.statistics?.viewCount ?? "0", 10),
          videos: parseInt(item.statistics?.videoCount ?? "0", 10),
          latestVideoId,
          latestVideoTitle,
        };
      })
    );

    // 3. Compute totals
    const totals = channels.reduce(
      (acc, c) => ({
        subscribers: acc.subscribers + c.subscribers,
        views: acc.views + c.views,
      }),
      { subscribers: 0, views: 0 }
    );

    const data = { channels, totals, updatedAt: now };
    cache = { data, timestamp: now };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error("Stats function error:", err.message);
    // If we have stale cache, return it rather than a 500
    if (cache.data) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ...cache.data, stale: true }),
      };
    }
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
