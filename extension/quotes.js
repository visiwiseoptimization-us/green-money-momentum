// Data layer for the GMM Live Ticker extension.
//
// Right now this returns mock quotes so the popup is fully functional to
// demo/test without any API key. To go live with real data:
//
//   1. Sign up for a stock data provider (Finnhub's free tier is a solid
//      default: https://finnhub.io — 60 calls/min free, real-time-ish quotes).
//   2. Save the API key via the extension's options page (chrome.storage.local
//      key "gmmApiKey" — the options.html/options.js files already write it there).
//   3. Set USE_MOCK_DATA to false below.
//   4. Add the provider's host to "host_permissions" in manifest.json, e.g.
//      "https://finnhub.io/*".
//
// fetchRealQuotes() below already contains a working Finnhub implementation —
// it's just not called while USE_MOCK_DATA is true.

const USE_MOCK_DATA = true;

const DEFAULT_WATCHLIST = ["SPY", "QQQ", "NVDA", "AAPL", "TSLA", "AMD"];

const MOCK_BASE_PRICES = {
  SPY: 602.14,
  QQQ: 521.87,
  NVDA: 142.3,
  AAPL: 228.91,
  TSLA: 318.55,
  AMD: 164.02,
  MSFT: 512.4,
  GOOGL: 198.2,
  META: 612.75,
  AMZN: 231.9,
};

function getWatchlist() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["gmmWatchlist"], (result) => {
      resolve(result.gmmWatchlist && result.gmmWatchlist.length ? result.gmmWatchlist : DEFAULT_WATCHLIST);
    });
  });
}

function setWatchlist(symbols) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ gmmWatchlist: symbols }, resolve);
  });
}

function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["gmmApiKey"], (result) => resolve(result.gmmApiKey || ""));
  });
}

// Deterministic-ish pseudo-random walk per symbol so refreshes feel "live"
// without actually calling anything, and without Math.random drift being too wild.
function mockQuoteFor(symbol) {
  const base = MOCK_BASE_PRICES[symbol] ?? 100 + (symbol.charCodeAt(0) % 50);
  const seed = Array.from(symbol).reduce((acc, c) => acc + c.charCodeAt(0), Date.now() / 60000);
  const wobble = Math.sin(seed) * 0.02; // +/- 2%
  const price = base * (1 + wobble);
  const changePct = wobble * 100;
  return {
    symbol,
    price: Number(price.toFixed(2)),
    changePct: Number(changePct.toFixed(2)),
  };
}

async function fetchMockQuotes(symbols) {
  return symbols.map(mockQuoteFor);
}

// Real implementation (Finnhub) — wired up but unused until USE_MOCK_DATA=false.
async function fetchRealQuotes(symbols) {
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error("No API key set. Add one in the extension's options page.");
  }
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`
      );
      if (!res.ok) throw new Error(`Finnhub request failed for ${symbol}: ${res.status}`);
      const data = await res.json();
      // Finnhub /quote shape: c = current, pc = previous close
      const price = data.c;
      const changePct = data.pc ? ((data.c - data.pc) / data.pc) * 100 : 0;
      return { symbol, price: Number(price.toFixed(2)), changePct: Number(changePct.toFixed(2)) };
    })
  );
  return results;
}

async function fetchQuotes(symbols) {
  if (!symbols.length) return [];
  return USE_MOCK_DATA ? fetchMockQuotes(symbols) : fetchRealQuotes(symbols);
}
