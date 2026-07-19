// netlify/functions/stats.js
const https = require("https");

const CHANNELS = [
  { id: "UCv57OuOmg5lzgmt2OKobMAw", name: "Story Time Kids" },
  { id: "UCly-ws05M0u5UE3KlEox-3A", name: "Magic Tales TV" },
  { id: "UCsBRYCx-4HfFQku9EToboMA", name: "Vrat Kathaye" },
];

let cache = { data: null, timestamp: 0 };
const CACHE_MS = 15 * 60 * 1000;

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error("Invalid JSON response"));
          }
        } else {
          reject(new Error(`HTTP Error: ${res.statusCode}`));
        }
      });
    }).on("error", reject);
  });
}

exports.handler = async function (event, context) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_MS) {
    return { statusCode: 200, headers, body: JSON.stringify(cache.data) };
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ error: "API key not configured" }),
    };
  }

  try {
    const ids = CHANNELS.map((c) => c.id).join(",");
    const chJson = await fetchJson(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails&id=${ids}&key=${apiKey}`
    );

    if (!chJson.items || chJson.items.length === 0) {
      throw new Error("No channel data returned");
    }

    const channels = await Promise.all(
      chJson.items.map(async (item) => {
        const meta = CHANNELS.find((c) => c.id === item.id) || { name: "Unknown" };
        const uploadsId = item.contentDetails?.relatedPlaylists?.uploads ?? null;
        let latestVideoId = null;
        let latestVideoTitle = null;

        if (uploadsId) {
          try {
            const plJson = await fetchJson(
              `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsId}&maxResults=1&key=${apiKey}`
            );
            const latest = plJson.items?.[0]?.snippet;
            latestVideoId = latest?.resourceId?.videoId ?? null;
            latestVideoTitle = latest?.title ?? null;
          } catch (e) {
            // Ignore playlist error
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

    const totals = channels.reduce(
      (acc, c) => ({
        subscribers: acc.subscribers + c.subscribers,
        views: acc.views + c.views,
      }),
      { subscribers: 0, views: 0 }
    );

    const data = { channels, totals, updatedAt: now };
    cache = { data, timestamp: now };

    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    console.error(err);
    if (cache.data) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ...cache.data, stale: true }),
      };
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
