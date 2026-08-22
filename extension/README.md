# GMM Live Ticker (Chrome Extension)

A Manifest V3 Chrome extension: a toolbar popup showing a live watchlist of stock tickers, styled to match the Green Money Momentum site.

## Current state

Fully wired for **real, live quotes** via Finnhub — it just needs a free API key (see "Going live"
below). Without a key, it shows mock data (prices wobble slightly on each refresh) so it's still
fully testable out of the box with no signup required.

## Load it locally (unpacked) to test

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this `extension/` folder.
4. Pin it from the puzzle-piece icon in the toolbar.

## Going live with real data

1. Sign up for a free [Finnhub](https://finnhub.io) account — 60 calls/minute, no credit card.
2. Click the extension's **Details → Extension options**, paste the API key, save.
3. That's it — the popup detects the saved key and switches to live quotes automatically on the
   next refresh (up to 1 minute, or click the refresh icon in the popup). No code edits needed.
4. Remove the key from the options page any time to go back to sample data.

If a live fetch ever fails (bad key, rate limit, provider outage), the popup falls back to sample
data automatically and shows why in the status banner, instead of going blank.

Swapping providers (Alpha Vantage, Twelve Data, Polygon, IEX) means replacing `fetchRealQuotes()` in
`quotes.js` with that provider's request/response shape, and updating the domain in
`manifest.json`'s `host_permissions` — the rest of the extension (storage, popup, background
refresh) doesn't need to change.

## Publishing to the Chrome Web Store

Loading unpacked is fine for testing, but a real public install link requires publishing:

1. Create a one-time Chrome Web Store developer account ($5 fee): https://chrome.google.com/webstore/devconsole
2. Zip the `extension/` folder's contents (not the folder itself).
3. Upload it in the developer dashboard, fill out the listing (description, screenshots, privacy practices — required since this reads storage), submit for review.
4. Review usually takes a few days to ~1-2 weeks for a new extension. Once approved, you get a permanent `chrome.google.com/webstore/detail/...` install link to put on the site.

Until that's done, the site's download link ships the unpacked folder as a zip with load-it-yourself instructions.
