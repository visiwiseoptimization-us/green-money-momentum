"use client";

import { CHANNEL_CATEGORIES } from "./data";

export default function ChannelSidebar({
  activeChannel,
  onSelect,
  displayName,
  onRename,
}: {
  activeChannel: string;
  onSelect: (channelId: string) => void;
  displayName: string | null;
  onRename: () => void;
}) {
  return (
    <div className="flex w-60 shrink-0 flex-col border-r border-border bg-background-card">
      <div className="border-b border-border px-4 py-4">
        <p className="font-display text-sm font-semibold">Green Money Momentum</p>
        <p className="text-xs text-muted">Investor community</p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-2 py-4">
        {CHANNEL_CATEGORIES.map((category) => (
          <div key={category.label}>
            <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
              {category.label}
            </p>
            <div className="mt-1.5 space-y-0.5">
              {category.channels.map((channel) => {
                const active = channel.id === activeChannel;
                return (
                  <button
                    key={channel.id}
                    onClick={() => onSelect(channel.id)}
                    className={`flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                      active
                        ? "bg-brand-green/15 text-brand-green-bright"
                        : "text-muted hover:bg-background-elevated hover:text-foreground"
                    }`}
                  >
                    <span className="text-muted">#</span>
                    {channel.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div>
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-muted">Voice</p>
          <div className="mt-1.5 flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted">
            <span>🔊</span>
            Trading Floor
            <span className="ml-auto text-[11px] text-muted">3</span>
          </div>
        </div>
      </div>

      {/* User panel */}
      <div className="flex items-center gap-2 border-t border-border bg-background-elevated px-3 py-3">
        <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-background-card text-xs font-semibold text-brand-silver">
          {displayName ? displayName.slice(0, 2).toUpperCase() : "?"}
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background-elevated bg-brand-green-bright" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-foreground">
            {displayName ?? "Not joined yet"}
          </p>
          <p className="truncate text-[11px] text-muted">{displayName ? "Online" : "Pick a name to chat"}</p>
        </div>
        {displayName && (
          <button
            onClick={onRename}
            title="Change display name"
            className="text-muted transition-colors hover:text-foreground"
          >
            ⚙
          </button>
        )}
      </div>
    </div>
  );
}
