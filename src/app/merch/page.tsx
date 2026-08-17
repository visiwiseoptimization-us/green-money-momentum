import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch — Green Money Momentum",
};

const PRODUCTS = [
  { name: "GMM Snapback Hat", category: "Hat" },
  { name: "GMM Bull Dad Hat", category: "Hat" },
  { name: "Money Momentum Tee", category: "Tee" },
  { name: "GMM Logo Tee", category: "Tee" },
  { name: "Green Money Mug", category: "Mug" },
  { name: "Bull Market Mug", category: "Mug" },
];

function PlaceholderThumb({ category }: { category: string }) {
  return (
    <div className="flex aspect-square w-full items-center justify-center rounded-xl border border-dashed border-border bg-background-elevated">
      <span className="text-xs font-medium uppercase tracking-wider text-muted">
        {category} image
      </span>
    </div>
  );
}

export default function MerchPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border bg-background-card px-3 py-1 text-xs font-medium text-muted">
          Wireframe — layout only, not final design
        </span>
        <h1 className="font-display mt-4 text-3xl font-bold sm:text-4xl">GMM Merch Store</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
          Hats, tees, and mugs for the GMM community. This page blocks out the layout — product
          photos, pricing, and checkout come later.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3">
        {PRODUCTS.map((product) => (
          <div
            key={product.name}
            className="rounded-2xl border border-dashed border-border bg-background-card p-4"
          >
            <PlaceholderThumb category={product.category} />
            <div className="mt-3 flex items-start justify-between gap-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
                  {product.category}
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">{product.name}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-muted">$--</span>
            </div>
            <button
              disabled
              className="mt-3 w-full cursor-not-allowed rounded-full border border-border py-2 text-xs font-semibold text-muted"
            >
              Coming soon
            </button>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14 max-w-md rounded-2xl border border-border bg-background-card p-6 text-center">
        <p className="font-display text-base font-semibold">Want a heads up when it launches?</p>
        <form className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            placeholder="you@email.com"
            disabled
            className="flex-1 cursor-not-allowed rounded-full border border-border bg-background px-4 py-2.5 text-sm text-muted placeholder:text-muted"
          />
          <button
            disabled
            className="cursor-not-allowed rounded-full bg-border px-5 py-2.5 text-sm font-semibold text-muted"
          >
            Notify me
          </button>
        </form>
        <p className="mt-2 text-[11px] text-muted">Signup wired up once the store goes live.</p>
      </div>
    </div>
  );
}
