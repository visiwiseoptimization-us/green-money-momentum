function initialsFor(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export default function MemberSidebar({ online }: { online: string[] }) {
  return (
    <div className="hidden w-60 shrink-0 border-l border-border bg-background-card p-4 lg:block">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">Host</p>
      <ul className="mt-2 space-y-2.5">
        <li className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-green-deep text-xs font-semibold text-background">
            GM
          </span>
          <span className="text-sm text-brand-green-bright">GMM</span>
        </li>
      </ul>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Online — {online.length}
      </p>
      {online.length === 0 ? (
        <p className="mt-2 text-xs text-muted">Nobody else is here right now.</p>
      ) : (
        <ul className="mt-2 space-y-2.5">
          {online.map((name) => (
            <li key={name} className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background-elevated text-xs font-semibold text-brand-silver">
                {initialsFor(name)}
              </span>
              <span className="truncate text-sm text-foreground">{name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
