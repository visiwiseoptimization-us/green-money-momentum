import type { Metadata } from "next";
import { assetPath } from "@/lib/asset-path";

export const metadata: Metadata = {
  title: "Chrome Extension — Green Money Momentum",
};

const WATCHLIST = [
  { symbol: "SPY", price: "$602.14", change: "+0.84%", up: true },
  { symbol: "QQQ", price: "$521.87", change: "+1.12%", up: true },
  { symbol: "NVDA", price: "$142.30", change: "+2.31%", up: true },
  { symbol: "AAPL", price: "$228.91", change: "-0.42%", up: false },
  { symbol: "TSLA", price: "$318.55", change: "+3.05%", up: true },
  { symbol: "AMD", price: "$164.02", change: "+0.97%", up: true },
];

const FEATURES = [
  {
    title: "Live ticker overlay",
    description: "Real-time price and % change for your watchlist, pinned right in your browser toolbar.",
  },
  {
    title: "Custom watchlist",
    description: "Track the tickers that matter to you — add or remove symbols in a couple clicks.",
  },
  {
    title: "Momentum coloring",
    description: "Green and red at a glance, matched to the same momentum read GMM uses on the channel.",
  },
  {
    title: "Lightweight",
    description: "Runs quietly in the background — built to stay out of your way until you need it.",
  },
];

const STEPS = [
  { step: "1", title: "Download the extension", description: "Grab the .zip below and unzip it anywhere on your computer." },
  { step: "2", title: "Load it into Chrome", description: "chrome://extensions → turn on Developer mode → Load unpacked → select the unzipped folder." },
  { step: "3", title: "Build your watchlist", description: "Pin it from the toolbar and add the tickers you want to track." },
];

export default function ExtensionPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background-card px-3 py-1 text-xs font-medium text-brand-green-bright">
          ● Early beta — manual install, Chrome Web Store coming later
        </span>
        <h1 className="font-display mt-5 text-3xl font-bold sm:text-5xl">
          <span className="brand-gradient-text">The market, live</span>
          <br />
          in your browser.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm text-muted sm:text-base">
          The GMM Chrome extension puts live ticker symbols right in your toolbar — the same
          momentum read from the channel, without opening another tab.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={assetPath("/downloads/gmm-ticker-extension.zip")}
            download
            className="glow-green w-full rounded-full bg-brand-green px-6 py-3 text-center text-sm font-semibold text-background transition-transform hover:scale-105 sm:w-auto"
          >
            Download extension (.zip)
          </a>
          <a
            href="#how-it-works"
            className="w-full rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:border-brand-green sm:w-auto"
          >
            How to install
          </a>
        </div>
        <p className="mx-auto mt-4 max-w-md text-xs text-muted">
          It&apos;s not on the Chrome Web Store yet, so Chrome will need you to enable Developer
          mode to load it — three quick steps below.
        </p>
      </div>

      {/* Browser mock */}
      <div className="mx-auto mt-14 max-w-lg overflow-hidden rounded-2xl border border-border bg-background-card shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border bg-background-elevated px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-red/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-green-bright/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-silver/40" />
          <div className="ml-3 flex-1 rounded-md bg-background px-3 py-1 text-xs text-muted">
            youtube.com/@GreenMoneyMomentum
          </div>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand-green to-brand-green-deep text-[10px] font-bold text-background">
            G
          </div>
        </div>
        <div className="p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
            GMM Watchlist
          </p>
          <div className="mt-2 divide-y divide-border">
            {WATCHLIST.map((item) => (
              <div key={item.symbol} className="flex items-center justify-between py-2 text-sm">
                <span className="font-semibold">{item.symbol}</span>
                <span className="text-muted">{item.price}</span>
                <span className={item.up ? "text-brand-green-bright" : "text-brand-red"}>
                  {item.up ? "▲" : "▼"} {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-20 grid gap-5 sm:grid-cols-2">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-background-card p-5">
            <h3 className="font-display text-base font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.description}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div id="how-it-works" className="mt-20 scroll-mt-24">
        <h2 className="font-display text-center text-2xl font-semibold">How it works</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/15 text-sm font-semibold text-brand-green-bright">
                {s.step}
              </div>
              <h3 className="font-display mt-3 text-sm font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-xl text-center text-xs text-muted">
        Market data shown is illustrative. Not investment advice — see disclosures on the Weekly
        Notes page.
      </p>
    </div>
  );
}
