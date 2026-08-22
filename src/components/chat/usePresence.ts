"use client";

import { useEffect, useState } from "react";
import { supabase, isChatConfigured } from "@/lib/supabase";

const PRESENCE_CHANNEL = "gmm-chat-presence";

/**
 * Tracks who else currently has the chat room open, via Supabase's Realtime
 * Presence — no accounts needed, just the display name each visitor picked.
 * There's no login yet for GMM itself, so "GMM" isn't included here even
 * when the person running the channel is browsing; that arrives once the
 * client's own admin login exists.
 */
export function usePresence(displayName: string | null) {
  const [online, setOnline] = useState<string[]>([]);

  useEffect(() => {
    // Nothing to subscribe to — `online` already defaults to [], and the
    // cleanup below resets it when a previous subscription goes away.
    if (!isChatConfigured || !supabase || !displayName) return;

    const client = supabase;
    const channel = client.channel(PRESENCE_CHANNEL, {
      config: { presence: { key: displayName } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        setOnline(Object.keys(state));
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      client.removeChannel(channel);
      setOnline([]);
    };
  }, [displayName]);

  return online;
}
