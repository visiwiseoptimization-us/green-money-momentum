export default function ServerRail() {
  return (
    <div className="hidden w-[72px] shrink-0 flex-col items-center gap-3 border-r border-border bg-background-elevated py-3 sm:flex">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-green to-brand-green-deep text-sm font-bold text-background transition-[border-radius] hover:rounded-xl">
        G
      </div>
      <div className="h-px w-8 bg-border" />
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border text-lg text-muted">
        +
      </div>
    </div>
  );
}
