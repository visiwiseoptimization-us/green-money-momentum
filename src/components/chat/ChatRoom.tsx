"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import ServerRail from "./ServerRail";
import ChannelSidebar from "./ChannelSidebar";
import MemberSidebar from "./MemberSidebar";
import { ALL_CHANNELS } from "./data";
import { useChatChannel } from "./useChatChannel";
import { usePresence } from "./usePresence";
import { isChatConfigured } from "@/lib/supabase";
import {
  generateGuestName,
  getStoredDisplayName,
  isValidDisplayName,
  normalizeDisplayName,
  setStoredDisplayName,
} from "@/lib/chat-identity";

function initialsFor(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function Avatar({ initials, host }: { initials: string; host: boolean }) {
  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
        host
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
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState("");
  const [draft, setDraft] = useState("");
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    // localStorage only exists in the browser, so this has to run after
    // mount (not during the initial render) to keep server/client output
    // identical for hydration — the "just calls setState" lint rule doesn't
    // have a way to know that's the intent here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayName(getStoredDisplayName());
  }, []);

  const channel = useMemo(
    () => ALL_CHANNELS.find((c) => c.id === activeChannelId) ?? ALL_CHANNELS[0],
    [activeChannelId]
  );

  const { messages, loading, loadError, sendMessage } = useChatChannel(channel.id);
  const online = usePresence(displayName);

  function handleJoin(e: FormEvent) {
    e.preventDefault();
    const name = normalizeDisplayName(nameDraft || generateGuestName());
    if (!isValidDisplayName(name)) return;
    setStoredDisplayName(name);
    setDisplayName(name);
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !displayName) return;
    setDraft("");
    setSendError(null);
    const error = await sendMessage(displayName, text);
    if (error) setSendError(error);
  }

  if (!isChatConfigured) {
    return (
      <div className="flex h-[640px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background-card px-6 text-center">
        <p className="font-display text-base font-semibold">Chat isn&apos;t connected yet</p>
        <p className="max-w-sm text-sm text-muted">
          This preview build doesn&apos;t have the Supabase environment variables set. See{" "}
          <code className="rounded bg-background-elevated px-1 py-0.5 text-xs">supabase/README.md</code>{" "}
          for the one-time setup, then rebuild.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-[640px] overflow-hidden rounded-2xl border border-border bg-background-card">
      <ServerRail />
      <ChannelSidebar
        activeChannel={activeChannelId}
        onSelect={setActiveChannelId}
        displayName={displayName}
        onRename={() => setDisplayName(null)}
      />

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
            {online.length} online
          </span>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {loading && <p className="text-sm text-muted">Loading messages…</p>}
          {loadError && loadError !== "not-configured" && (
            <p className="text-sm text-brand-red">Couldn&apos;t load messages: {loadError}</p>
          )}
          {!loading && !loadError && messages.length === 0 && (
            <p className="text-sm text-muted">No messages yet — be the first to say something.</p>
          )}
          {messages.map((m) => {
            const host = m.display_name === "GMM";
            return (
              <div key={m.id} className="flex items-start gap-3">
                <Avatar initials={initialsFor(m.display_name)} host={host} />
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-sm font-semibold ${host ? "text-brand-green-bright" : "text-foreground"}`}
                    >
                      {m.display_name}
                    </span>
                    {host && (
                      <span className="rounded bg-brand-green/15 px-1.5 py-0.5 text-[10px] font-semibold text-brand-green-bright">
                        HOST
                      </span>
                    )}
                    <span className="text-[11px] text-muted">{formatTime(m.created_at)}</span>
                  </div>
                  <p className="mt-0.5 break-words text-sm text-muted">{m.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {!channel.open ? (
          <div className="border-t border-border p-4 text-center text-xs text-muted">
            This channel is read-only — GMM posts updates here.
          </div>
        ) : !displayName ? (
          <form onSubmit={handleJoin} className="flex items-center gap-2 border-t border-border p-4">
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              placeholder="Pick a display name to join…"
              maxLength={24}
              className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand-green focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
            >
              Join chat
            </button>
          </form>
        ) : (
          <form onSubmit={handleSend} className="border-t border-border p-4">
            <div className="flex items-center gap-2">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={`Message #${channel.name}`}
                maxLength={500}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand-green focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-background transition-transform hover:scale-105"
              >
                Send
              </button>
            </div>
            {sendError && <p className="mt-1.5 px-2 text-xs text-brand-red">{sendError}</p>}
          </form>
        )}
      </div>

      <MemberSidebar online={online} />
    </div>
  );
}
