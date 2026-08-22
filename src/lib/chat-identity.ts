// Display-name-only identity for the chat room — no accounts, no passwords.
// The name lives in this browser's localStorage only, per the "just a
// display name" choice for the MVP chat. A real login (for the client's own
// admin access) is a separate, later project.

const STORAGE_KEY = "gmm-chat-display-name";

const ADJECTIVES = ["Bullish", "Steady", "Sharp", "Swift", "Calm", "Bold", "Quiet", "Keen"];
const NOUNS = ["Trader", "Investor", "Analyst", "Bull", "Momentum", "Signal", "Ticker"];

export function generateGuestName(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const suffix = Math.floor(100 + Math.random() * 900);
  return `${adjective}${noun}${suffix}`;
}

export function getStoredDisplayName(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredDisplayName(name: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // Storage can be unavailable (private browsing, quota) — chat still
    // works for the session, it just won't remember the name next visit.
  }
}

export function normalizeDisplayName(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").slice(0, 24);
}

export function isValidDisplayName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 24;
}
