import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { weeklyNotes } from "@/lib/weekly-notes";
import NoteCard from "@/components/weekly-notes/NoteCard";

export function generateStaticParams() {
  return weeklyNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata(props: PageProps<"/weekly-notes/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const note = weeklyNotes.find((n) => n.slug === slug);
  return { title: note ? `${note.headline} — Green Money Momentum` : "Weekly Note" };
}

export default async function WeeklyNoteDetailPage(props: PageProps<"/weekly-notes/[slug]">) {
  const { slug } = await props.params;
  const note = weeklyNotes.find((n) => n.slug === slug);

  if (!note) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/weekly-notes" className="text-sm font-medium text-muted hover:text-brand-green-bright">
        ← All weekly notes
      </Link>
      <div className="mt-6">
        <NoteCard note={note} featured />
      </div>
    </div>
  );
}
