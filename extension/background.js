// Periodically refreshes quotes in the background so the popup opens with
// fresh(ish) numbers instead of fetching cold every time.
importScripts("quotes.js");

const REFRESH_ALARM = "gmm-refresh-quotes";

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 1 });
  refresh();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === REFRESH_ALARM) refresh();
});

async function refresh() {
  try {
    const symbols = await getWatchlist();
    const quotes = await fetchQuotes(symbols);
    chrome.storage.local.set({ gmmQuotes: quotes, gmmQuotesUpdatedAt: Date.now() });
  } catch (err) {
    // Swallow errors here — the popup surfaces a status message if quotes
    // look stale or a fetch failed, so a background hiccup isn't fatal.
    console.warn("GMM Ticker: background refresh failed", err);
  }
}
