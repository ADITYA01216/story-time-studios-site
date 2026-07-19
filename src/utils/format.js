// src/utils/format.js

/**
 * Format a number with K/M suffixes
 * e.g. 1234567 → "1.2M"  |  128400 → "128K"
 */
export function formatCount(num) {
  if (num === null || num === undefined || isNaN(num)) return "—";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}
