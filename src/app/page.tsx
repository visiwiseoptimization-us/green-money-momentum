import Link from "next/link";
import HeroGraphGrid from "@/components/hero/HeroGraphGrid";

const YOUTUBE_URL = "https://www.youtube.com/@GreenMoneyMomentum";

export default function Home() {
  return (
    <div>
      {/* Hero — a looping grid + uptrend line draws in behind everything, no static art */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 z-0">
          <HeroGraphGrid />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 42% 55% at 50% 38%, var(--background) 0%, color-mix(in srgb, var(--background) 55%, transparent) 48%, transparent 78%), linear-gradient(to bottom, color-mix(in srgb, var(--background) 4%, transparent) 0%, color-mix(in srgb, var(--background) 15%, transparent) 55%, var(--background) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-green-bright">
              Live weekly market breakdowns
            </p>
            <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
              <span className="brand-gradient-text">Market Movements.</span>
              <br />
              <span className="text-foreground">Making Money. </span>
              <span className="text-brand-green-bright">Money Momentum.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted sm:text-lg">
              Green Money Momentum breaks down where the market is headed, calls out the setups
              that matter, and keeps a real-time community of investors talking through every move.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="glow-green w-full rounded-full bg-brand-green px-6 py-3 text-center text-sm font-semibold text-background transition-transform hover:scale-105 sm:w-auto"
              >
                Subscribe on YouTube
              </a>
              <Link
                href="/weekly-notes"
                className="w-full rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition-colors hover:border-brand-green sm:w-auto"
              >
                Read this week&apos;s note
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-3">
          <FeatureCard
            eyebrow="Every Sunday"
            title="Weekly Investor Notes"
            description="A written prediction for the week ahead — levels, catalysts, and where the momentum is likely headed."
            href="/weekly-notes"
            cta="Read the notes"
          />
          <FeatureCard
            eyebrow="Live"
            title="Investor Chat Room"
            description="Talk shop with the GMM community in real time — reactions to price action while the market is open."
            href="/chat"
            cta="Enter the chat"
          />
          <FeatureCard
            eyebrow="YouTube"
            title="Video Breakdowns"
            description="In-depth market movement videos on the GMM channel — subscribe so you never miss an upload."
            href={YOUTUBE_URL}
            cta="Watch on YouTube"
            external
          />
        </div>
      </section>

      {/* More from GMM — Robinhood-style list rows */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="font-display text-lg font-semibold">More from GMM</h2>
        <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background-card">
          <ListRow
            href="/merch"
            emblem="M"
            title="Merch Store"
            description="Hats, tees, and mugs for the GMM community"
            tag="Wireframe"
          />
          <ListRow
            href="/extension"
            emblem="E"
            title="Chrome Extension"
            description="Live ticker symbols, right in your browser toolbar"
            tag="Coming soon"
          />
        </div>
      </section>

      {/* About / CTA strip */}
      <section className="border-t border-border bg-background-elevated">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Built for investors who trade the <span className="text-brand-green-bright">momentum</span>, not the noise.
          </h2>
          <p className="max-w-2xl text-sm text-muted sm:text-base">
            Green Money Momentum is a YouTube channel and community dedicated to reading market
            movements clearly and making money moves with conviction. New here? Start with this
            week&apos;s investor note, then drop into the chat room.
          </p>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Join the channel
          </a>
        </div>
      </section>
    </div>
  );
}

function ListRow({
  href,
  emblem,
  title,
  description,
  tag,
}: {
  href: string;
  emblem: string;
  title: string;
  description: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-background-elevated"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green to-brand-green-deep text-sm font-bold text-background">
        {emblem}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {tag && (
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
              {tag}
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-sm text-muted">{description}</p>
      </div>
      <span className="shrink-0 text-muted" aria-hidden>
        →
      </span>
    </Link>
  );
}

function FeatureCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  external,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
}) {
  const linkClassName =
    "mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-green-bright";

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-background-card p-6 transition-colors hover:border-brand-green/60">
      <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-bright">
        {eyebrow}
      </span>
      <h3 className="font-display mt-3 text-xl font-semibold">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
      {external ? (
        <a href={href} target="_blank" rel="noreferrer" className={linkClassName}>
          {cta} <span aria-hidden>→</span>
        </a>
      ) : (
        <Link href={href} className={linkClassName}>
          {cta} <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}
