export type Direction = "up" | "down" | "watch";
export type Bias = "Bullish" | "Bearish" | "Neutral";

export type KeyLevel = {
  symbol: string;
  support: string;
  resistance: string;
};

export type SectorNote = {
  sector: string;
  direction: Direction;
  note: string;
};

export type StockNote = {
  ticker: string;
  note: string;
  direction: Direction;
};

export type WeeklyNote = {
  slug: string;
  date: string; // ISO date, always a Sunday
  headline: string;
  tldr: string;
  bias: Bias;
  /** 1-5, how convicted this week's call is */
  confidence: number;
  keyLevels: KeyLevel[];
  catalysts: string[];
  sectorsInFocus: SectorNote[];
  stocksToWatch: StockNote[];
  riskFactors: string[];
  tradeIdea: string;
  bottomLine: string;
};

// Sample data for the design pass. Every field here is written to map 1:1 to a
// spreadsheet column, so the future editor tool can be "one row per week, one
// cell per field" instead of a freeform text box.
export const weeklyNotes: WeeklyNote[] = [
  {
    slug: "2026-08-09",
    date: "2026-08-09",
    headline: "Momentum holds above key support — watching for a breakout week",
    tldr: "SPY held the 50-day all week on light volume. Leaning bullish as long as that level holds.",
    bias: "Bullish",
    confidence: 4,
    keyLevels: [
      { symbol: "SPY", support: "50-day MA", resistance: "Recent swing high" },
      { symbol: "QQQ", support: "21-day MA", resistance: "All-time high" },
    ],
    catalysts: [
      "CPI print Wednesday — market expecting an in-line read",
      "Big-cap retail earnings midweek",
      "Fed speakers Thursday and Friday",
    ],
    sectorsInFocus: [
      { sector: "Semiconductors", direction: "up", note: "Leading the tape again" },
      { sector: "Regional banks", direction: "watch", note: "Coiling near resistance" },
      { sector: "Utilities", direction: "down", note: "Money rotating out" },
    ],
    stocksToWatch: [
      { ticker: "NVDA", note: "New highs on volume, leadership intact", direction: "up" },
      { ticker: "AAPL", note: "Stuck below the 200-day, avoid for now", direction: "down" },
      { ticker: "AMD", note: "Coiling near breakout point", direction: "watch" },
    ],
    riskFactors: [
      "A hot CPI print could spike yields fast",
      "August volume is thin — moves can be exaggerated",
    ],
    tradeIdea:
      "Stay long current momentum names, add on a pullback that holds the 50-day. Trim if SPY closes below it.",
    bottomLine:
      "Bullish while SPY holds the 50-day. Confirmed break below flips this to defense.",
  },
  {
    slug: "2026-08-02",
    date: "2026-08-02",
    headline: "Choppy tape, but momentum leaders are still setting the pace",
    tldr: "Headline-driven chop kept the index flat. Relative strength in a few names matters more than the close.",
    bias: "Neutral",
    confidence: 2,
    keyLevels: [
      { symbol: "SPY", support: "20-day MA", resistance: "Prior week's high" },
      { symbol: "QQQ", support: "50-day MA", resistance: "Prior week's high" },
    ],
    catalysts: ["Jobs report Friday", "Multiple Fed speakers throughout the week"],
    sectorsInFocus: [
      { sector: "Software", direction: "up", note: "Relative strength vs. the index" },
      { sector: "Energy", direction: "down", note: "Crude rolling over" },
    ],
    stocksToWatch: [
      { ticker: "MSFT", note: "Holding up well through the chop", direction: "up" },
      { ticker: "XOM", note: "Breaking trend with crude weakness", direction: "down" },
    ],
    riskFactors: ["Headline risk from Fed commentary", "No clear index direction yet"],
    tradeIdea: "Smaller size than usual. Let price confirm before adding risk either direction.",
    bottomLine: "No strong bias — staying selective until the market picks a direction.",
  },
  {
    slug: "2026-07-26",
    date: "2026-07-26",
    headline: "Pullback looks like a buyable dip, not a trend change",
    tldr: "The dip tagged the rising 21-day and bounced hard on strong volume Friday.",
    bias: "Bullish",
    confidence: 4,
    keyLevels: [
      { symbol: "SPY", support: "21-day MA", resistance: "All-time high" },
      { symbol: "IWM", support: "50-day MA", resistance: "200-day MA" },
    ],
    catalysts: ["Big tech earnings week", "GDP print Thursday"],
    sectorsInFocus: [
      { sector: "Growth / Tech", direction: "up", note: "Leading the bounce" },
      { sector: "Small caps", direction: "watch", note: "Testing the 50-day" },
    ],
    stocksToWatch: [
      { ticker: "META", note: "Reclaimed the 21-day on strong volume", direction: "up" },
      { ticker: "TSLA", note: "Still below the 50-day, needs confirmation", direction: "watch" },
    ],
    riskFactors: ["Earnings volatility across mega-cap tech this week"],
    tradeIdea: "Bought the dip Thursday, holding into this week. Reassess if Friday's low breaks.",
    bottomLine: "Uptrend intact. Treat weakness as opportunity until proven otherwise.",
  },
];

export function getLatestNote(): WeeklyNote {
  return weeklyNotes[0];
}
