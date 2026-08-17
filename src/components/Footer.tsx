import Link from "next/link";

const YOUTUBE_URL = "https://www.youtube.com/@GreenMoneyMomentum";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background-elevated">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-base font-semibold brand-gradient-text">
            Green Money Momentum
          </p>
          <p className="mt-1 text-sm text-muted">
            Market Movements &middot; Making Money &middot; Money Momentum
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <Link href="/weekly-notes" className="text-muted hover:text-brand-green-bright">
            Weekly Notes
          </Link>
          <Link href="/chat" className="text-muted hover:text-brand-green-bright">
            Chat Room
          </Link>
          <Link href="/merch" className="text-muted hover:text-brand-green-bright">
            Merch
          </Link>
          <Link href="/extension" className="text-muted hover:text-brand-green-bright">
            Extension
          </Link>
          <a href={YOUTUBE_URL} target="_blank" rel="noreferrer" className="text-muted hover:text-brand-green-bright">
            YouTube
          </a>
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} Green Money Momentum. For education and entertainment only — not financial advice.
      </div>
    </footer>
  );
}
