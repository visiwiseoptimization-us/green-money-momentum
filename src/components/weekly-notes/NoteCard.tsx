import type { WeeklyNote } from "@/lib/weekly-notes";
import { BiasPill, ConfidenceMeter, DirectionTag, formatNoteDate } from "./bits";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-green-bright">
      {children}
    </p>
  );
}

export default function NoteCard({ note, featured = false }: { note: WeeklyNote; featured?: boolean }) {
  return (
    <article
      className={`rounded-2xl border border-border bg-background-card ${
        featured ? "glow-green p-6 sm:p-8" : "p-6"
      }`}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <BiasPill bias={note.bias} />
          <span className="text-xs font-medium text-muted">{formatNoteDate(note.date)}</span>
        </div>
        <ConfidenceMeter value={note.confidence} />
      </div>

      <h2 className="font-display mt-4 text-xl font-semibold sm:text-2xl">{note.headline}</h2>
      <p className="mt-2 text-sm italic text-muted sm:text-base">{note.tldr}</p>

      {/* Stat row */}
      <div className="mt-6 grid grid-cols-3 gap-3 border-y border-border py-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Bias</p>
          <p className="font-display mt-1 text-lg font-semibold">{note.bias}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Catalysts</p>
          <p className="font-display mt-1 text-lg font-semibold">{note.catalysts.length}</p>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted">Watching</p>
          <p className="font-display mt-1 text-lg font-semibold">{note.stocksToWatch.length} tickers</p>
        </div>
      </div>

      {/* Key levels */}
      <div className="mt-6">
        <SectionLabel>Key levels</SectionLabel>
        <div className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border">
          <div className="grid grid-cols-3 bg-background-elevated px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-muted">
            <span>Symbol</span>
            <span>Support</span>
            <span>Resistance</span>
          </div>
          {note.keyLevels.map((lvl) => (
            <div key={lvl.symbol} className="grid grid-cols-3 px-3 py-2.5 text-sm">
              <span className="font-semibold">{lvl.symbol}</span>
              <span className="text-muted">{lvl.support}</span>
              <span className="text-muted">{lvl.resistance}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {/* Catalysts */}
        <div>
          <SectionLabel>Catalysts this week</SectionLabel>
          <ul className="mt-2 space-y-2">
            {note.catalysts.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="mt-0.5 text-brand-green-bright">▸</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risk factors */}
        <div>
          <SectionLabel>Risk factors</SectionLabel>
          <ul className="mt-2 space-y-2">
            {note.riskFactors.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-muted">
                <span className="mt-0.5 text-brand-red">▸</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sectors in focus */}
      <div className="mt-6">
        <SectionLabel>Sectors in focus</SectionLabel>
        <div className="mt-2 flex flex-wrap gap-2">
          {note.sectorsInFocus.map((s) => (
            <span
              key={s.sector}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background-elevated px-3 py-1.5 text-xs"
            >
              <DirectionTag direction={s.direction} />
              <span className="font-medium">{s.sector}</span>
              <span className="text-muted">— {s.note}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stocks to watch */}
      <div className="mt-6">
        <SectionLabel>Stocks to watch</SectionLabel>
        <div className="mt-2 divide-y divide-border overflow-hidden rounded-xl border border-border">
          {note.stocksToWatch.map((s) => (
            <div key={s.ticker} className="flex items-center gap-3 px-3 py-2.5 text-sm">
              <DirectionTag direction={s.direction} />
              <span className="w-14 shrink-0 font-semibold">{s.ticker}</span>
              <span className="text-muted">{s.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Trade idea + bottom line */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-brand-green/30 bg-brand-green/10 p-4">
          <SectionLabel>This week&apos;s trade idea</SectionLabel>
          <p className="mt-1.5 text-sm text-foreground">{note.tradeIdea}</p>
        </div>
        <div className="rounded-xl border border-border bg-background-elevated p-4">
          <SectionLabel>Bottom line</SectionLabel>
          <p className="mt-1.5 text-sm text-foreground">{note.bottomLine}</p>
        </div>
      </div>
    </article>
  );
}
