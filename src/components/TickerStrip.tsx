const ITEMS = [
  { symbol: "SPY", change: "+0.84%", up: true },
  { symbol: "QQQ", change: "+1.12%", up: true },
  { symbol: "NVDA", change: "+2.31%", up: true },
  { symbol: "AAPL", change: "-0.42%", up: false },
  { symbol: "TSLA", change: "+3.05%", up: true },
  { symbol: "BTC", change: "+1.98%", up: true },
  { symbol: "DXY", change: "-0.15%", up: false },
  { symbol: "VIX", change: "-4.20%", up: false },
  { symbol: "MSFT", change: "+0.61%", up: true },
  { symbol: "GMM", change: "MOMENTUM", up: true },
];

function TickerRow() {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center gap-2 whitespace-nowrap text-xs font-medium tracking-wide">
          <span className="text-muted">{item.symbol}</span>
          <span className={item.up ? "text-brand-green-bright" : "text-brand-red"}>
            {item.up ? "▲" : "▼"} {item.change}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function TickerStrip() {
  return (
    <div className="w-full overflow-hidden border-b border-border bg-background-elevated py-2">
      <div className="flex animate-ticker">
        <TickerRow />
        <TickerRow />
      </div>
    </div>
  );
}
