"use client";

import { useMemo, useState, type FormEvent } from "react";
import ServerRail from "./ServerRail";
import ChannelSidebar from "./ChannelSidebar";
import MemberSidebar from "./MemberSidebar";
import { CHANNEL_CATEGORIES, ONLINE_MEMBERS, type ChatMessage } from "./data";

const ALL_CHANNELS = CHANNEL_CATEGORIES.flatMap((c) => c.channels);

function Avatar({ initials, role }: { initials: string; role?: "host" | "mod" }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        role === "host"
          ? "bg-gradient-to-br from-brand-green to-brand-green-deep text-background"
          : "border border-border bg-background-elevated text-brand-silver"
      }`}
    >
      {initials}
    </span>
  );
}

export default function ChatRoom() {
  const [activeChannelId, setActiveChannelId] = useState("general");
  const [draft, setDraft] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, ChatMessage[]>>({});

  const channel = useMemo(
    () => ALL_CHANNELS.find((c) => c.id === activeChannelId) ?? ALL_CHANNELS[0],
    [activeChannelId]
  );

  const messages = [...channel.messages, ...(localMessages[channel.id] ?? [])];

  function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setLocalMessages((prev) => {
      const existing = prev[channel.id] ?? [];
      return {
        ...prev,
        [channel.id]: [
          ...existing,
          {
            id: channel.messages.length + existing.length + 1,
            author: "you",
            initials: "YOU",
            time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
            text,
          },
        ],
      };
    });
    setDraft("");
  }

  return (
    <div className="flex h-[640px] overflow-hidden rounded-2xl border border-border bg-background-card">
      <ServerRail />
      <ChannelSidebar activeChannel={activeChannelId} onSelect={setActiveChannelId} />

      {/* Message column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
          <div className="min-w-0">
            <p className="font-display flex items-center gap-1.5 text-sm font-semibold">
              <span className="text-muted">#</span> {channel.name}
            </p>
            <p className="truncate text-xs text-muted">{channel.topic}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-green/40 bg-brand-green/10 px-2.5 py-1 text-xs font-medium text-brand-green-bright">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green-bright" />
            {ONLINE_MEMBERS.length} online
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {messages.map((m) => (
            <div key={m.id} className="flex items-start gap-3">
              <Avatar initials={m.initials} role={m.role} />
              <div className="min-w-0">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      m.role === "host" ? "text-brand-green-bright" : "text-foreground"
                    }`}
                  >
                    {m.author}
                  </span>
                  {m.role === "host" && (
                    <span className="rounded bg-brand-green/15 px-1.5 py-0.5 text-[10px] font-semibold text-brand-green-bright">
                      HOST
                    </span>
                  )}
                  <span className="text-[11px] text-muted">{m.time}</span>
                </div>
                <p className="mt-0.5 break-words text-sm text-muted">{m.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-border p-4">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={`Message #${channel.name}`}
            className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand-green focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
          >
            Send
          </button>
        </form>
      </div>

      <MemberSidebar />
    </div>
  );
}
