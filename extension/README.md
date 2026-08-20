# GMM Live Ticker (Chrome Extension)

A Manifest V3 Chrome extension: a toolbar popup showing a live watchlist of stock tickers, styled to match the Green Money Momentum site.

## Current state

Ships with **mock data** (see `quotes.js`) so it's fully testable without any API key or account. Prices wobble slightly on each refresh so it *feels* live, but it is not pulling real market data yet.

## Load it locally (unpacked) to test

1. Open `chrome://extensions` in Chrome.
2. Turn on **Developer mode** (top right).
3. Click **Load unpacked** and select this `extension/` folder.
4. Pin it from the puzzle-piece icon in the toolbar.

## Going live with real data

1. Sign up for a stock data API. [Finnhub](https://finnhub.io) is the default this code is wired for — free tier, 60 calls/minute, no credit card.
2. Click the extension's **Details → Extension options**, paste the API key, save.
3. In `quotes.js`, set `USE_MOCK_DATA = false`.
4. In `manifest.json`, add the provider's domain to `host_permissions`, e.g. `"https://finnhub.io/*"`.
5. Reload the extension (chrome://extensions → refresh icon).

Swapping providers (Alpha Vantage, Twelve Data, Polygon, IEX) means replacing `fetchRealQuotes()` in `quotes.js` with that provider's request/response shape — the rest of the extension (storage, popup, background refresh) doesn't need to change.

## Publishing to the Chrome Web Store

Loading unpacked is fine for testing, but a real public install link requires publishing:

1. Create a one-time Chrome Web Store developer account ($5 fee): https://chrome.google.com/webstore/devconsole
2. Zip the `extension/` folder's contents (not the folder itself).
3. Upload it in the developer dashboard, fill out the listing (description, screenshots, privacy practices — required since this reads storage), submit for review.
4. Review usually takes a few days to ~1-2 weeks for a new extension. Once approved, you get a permanent `chrome.google.com/webstore/detail/...` install link to put on the site.

Until that's done, the site's download link ships the unpacked folder as a zip with load-it-yourself instructions.
