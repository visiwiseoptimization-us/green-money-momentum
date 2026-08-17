import { ONLINE_MEMBERS } from "./data";

export default function MemberSidebar() {
  const host = ONLINE_MEMBERS.filter((m) => m.role === "host");
  const members = ONLINE_MEMBERS.filter((m) => m.role === "member");

  return (
    <div className="hidden w-60 shrink-0 border-l border-border bg-background-card p-4 lg:block">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
        Host — {host.length}
      </p>
      <ul className="mt-2 space-y-2.5">
        {host.map((m) => (
          <li key={m.name} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-green-deep text-xs font-semibold text-background">
              {m.initials}
            </span>
            <span className="text-sm text-brand-green-bright">{m.name}</span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Online — {members.length}
      </p>
      <ul className="mt-2 space-y-2.5">
        {members.map((m) => (
          <li key={m.name} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background-elevated text-xs font-semibold text-brand-silver">
              {m.initials}
            </span>
            <span className="text-sm text-foreground">{m.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
