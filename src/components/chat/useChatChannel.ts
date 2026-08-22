"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, isChatConfigured } from "@/lib/supabase";

export type DbMessage = {
  id: string;
  channel: string;
  display_name: string;
  body: string;
  created_at: string;
};

const HISTORY_LIMIT = 100;
const LOAD_TIMEOUT_MS = 10_000;

function withTimeout<T>(promise: PromiseLike<T>, ms: number): Promise<T> {
  return Promise.race([
    Promise.resolve(promise),
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Timed out reaching the chat server.")), ms)
    ),
  ]);
}

export function useChatChannel(channelId: string) {
  // isChatConfigured is a build-time constant (same on server and client),
  // so it's safe to fold straight into the initial state — no effect needed
  // for this branch, which also sidesteps the "just calls setState" lint rule.
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [loading, setLoading] = useState(isChatConfigured);
  const [loadError, setLoadError] = useState<string | null>(isChatConfigured ? null : "not-configured");
  const seenIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!isChatConfigured || !supabase) return;

    const client = supabase;
    let cancelled = false;
    seenIds.current = new Set();
    // Resetting to a loading state here, before the fetch/subscribe below,
    // is the standard "params changed, re-sync with the external system"
    // pattern — not the "effect's only job is setState" smell this rule
    // usually catches.
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setLoading(true);
    setLoadError(null);
    setMessages([]);

    (async () => {
      try {
        const { data, error } = await withTimeout(
          client
            .from("messages")
            .select("*")
            .eq("channel", channelId)
            .order("created_at", { ascending: true })
            .limit(HISTORY_LIMIT),
          LOAD_TIMEOUT_MS
        );
        if (cancelled) return;
        if (error) {
          setLoadError(error.message);
        } else if (data) {
          data.forEach((m) => seenIds.current.add(m.id));
          setMessages(data as DbMessage[]);
        }
      } catch (err: unknown) {
        if (cancelled) return;
        setLoadError(err instanceof Error ? err.message : "Couldn't reach the chat server.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const channel = client
      .channel(`room:${channelId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `channel=eq.${channelId}` },
        (payload) => {
          const row = payload.new as DbMessage;
          if (seenIds.current.has(row.id)) return;
          seenIds.current.add(row.id);
          setMessages((prev) => [...prev, row]);
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      client.removeChannel(channel);
    };
  }, [channelId]);

  async function sendMessage(displayName: string, body: string): Promise<string | null> {
    if (!isChatConfigured || !supabase) return "Chat isn't connected yet.";
    const trimmed = body.trim();
    if (!trimmed) return null;

    let error: { message: string } | null = null;
    try {
      ({ error } = await supabase
        .from("messages")
        .insert({ channel: channelId, display_name: displayName, body: trimmed }));
    } catch (err: unknown) {
      return err instanceof Error ? err.message : "Couldn't reach the chat server.";
    }

    if (error) {
      // Postgres raises our rate-limit trigger's message verbatim; RLS
      // violations (e.g. posting into a read-only channel) come back as a
      // generic policy error, so give that a friendlier wording.
      if (error.message.toLowerCase().includes("row-level security")) {
        return "This channel is read-only for now.";
      }
      return error.message;
    }
    return null;
  }

  return { messages, loading, loadError, sendMessage };
}
