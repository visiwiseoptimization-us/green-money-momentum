// Data layer for the GMM Live Ticker extension.
//
// Live data turns on automatically as soon as someone pastes an API key
// into the options page — no code edits needed. Without a key, it falls
// back to mock quotes so the popup is still fully demo-able out of the box.
//
// Default provider: Finnhub (https://finnhub.io — 60 calls/min free tier,
// no credit card to sign up). Swapping providers means replacing
// fetchRealQuotes() below with that provider's request/response shape —
// storage, popup, and background refresh don't need to change.

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
    chrome.storage.local.get(["gmmApiKey"], (result) => resolve((result.gmmApiKey || "").trim()));
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

// Real implementation (Finnhub).
async function fetchRealQuotes(symbols, apiKey) {
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`
      );
      if (res.status === 401 || res.status === 403) {
        throw new Error("That API key was rejected — double check it on the options page.");
      }
      if (!res.ok) throw new Error(`Finnhub request failed for ${symbol}: ${res.status}`);
      const data = await res.json();
      // Finnhub /quote shape: c = current, pc = previous close. A symbol
      // Finnhub doesn't recognize comes back as all-zeros rather than an
      // HTTP error, so surface that as a clearer message.
      if (!data || (data.c === 0 && data.pc === 0)) {
        throw new Error(`No data for "${symbol}" — check the symbol is valid.`);
      }
      const price = data.c;
      const changePct = data.pc ? ((data.c - data.pc) / data.pc) * 100 : 0;
      return { symbol, price: Number(price.toFixed(2)), changePct: Number(changePct.toFixed(2)) };
    })
  );
  return results;
}

// Returns { quotes, mode, error }.
//   mode: "live"     — real data from the provider
//         "mock"      — no API key set yet, showing sample data
//         "fallback"  — a key is set but the live fetch failed, showing
//                       sample data so the popup isn't empty
async function fetchQuotes(symbols) {
  if (!symbols.length) return { quotes: [], mode: "live", error: null };

  const apiKey = await getApiKey();
  if (!apiKey) {
    return { quotes: await fetchMockQuotes(symbols), mode: "mock", error: null };
  }

  try {
    const quotes = await fetchRealQuotes(symbols, apiKey);
    return { quotes, mode: "live", error: null };
  } catch (err) {
    console.error("GMM ticker: live quote fetch failed, showing sample data instead.", err);
    return {
      quotes: await fetchMockQuotes(symbols),
      mode: "fallback",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
