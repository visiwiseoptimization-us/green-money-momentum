import type { Metadata } from "next";
import Link from "next/link";
import { weeklyNotes } from "@/lib/weekly-notes";
import NoteCard from "@/components/weekly-notes/NoteCard";
import { BiasPill, formatNoteDate } from "@/components/weekly-notes/bits";

export const metadata: Metadata = {
  title: "Weekly Investor Notes — Green Money Momentum",
};

export default function WeeklyNotesPage() {
  const [latest, ...archive] = weeklyNotes;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-bright">
          Every Sunday
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
          Weekly Investor Notes
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
          My prediction for the week ahead — scannable in under a minute. Bias, key levels,
          catalysts, and the trade idea, broken out so you don&apos;t have to dig for it.
        </p>
      </div>

      <div className="mt-12">
        <NoteCard note={latest} featured />
      </div>

      <div className="mt-16">
        <h3 className="font-display text-lg font-semibold">Previous notes</h3>
        <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-background-card">
          {archive.map((note) => (
            <Link
              key={note.slug}
              href={`/weekly-notes/${note.slug}`}
              className="flex flex-col gap-2 p-5 transition-colors hover:bg-background-elevated sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <BiasPill bias={note.bias} size="sm" />
                  <span className="text-xs text-muted">{formatNoteDate(note.date)}</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-foreground sm:text-base">
                  {note.headline}
                </p>
                <p className="mt-1 text-sm text-muted">{note.tldr}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-brand-green-bright">
                Read note →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
