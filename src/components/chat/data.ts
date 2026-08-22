// Channel metadata only — message content now lives in Supabase
// (see supabase/schema.sql) and is loaded/streamed by useChatChannel.

export type Channel = {
  id: string;
  name: string;
  topic: string;
  /** Anyone with a display name can post here. Read-only channels (like
   * announcements/rules) are posted to by GMM only, until the client's own
   * admin login exists — see supabase/schema.sql for the RLS policy that
   * enforces this server-side, not just in the UI. */
  open: boolean;
};

export type ChannelCategory = {
  label: string;
  channels: Channel[];
};

export const CHANNEL_CATEGORIES: ChannelCategory[] = [
  {
    label: "Information",
    channels: [
      { id: "announcements", name: "announcements", topic: "Official updates from GMM", open: false },
      { id: "rules", name: "rules", topic: "Keep it useful for everyone", open: false },
    ],
  },
  {
    label: "Market Talk",
    channels: [
      { id: "general", name: "general", topic: "Live during market hours", open: true },
      { id: "stock-picks", name: "stock-picks", topic: "Share setups you're watching", open: true },
      { id: "price-action", name: "price-action", topic: "Real-time reactions to the tape", open: true },
      { id: "options-plays", name: "options-plays", topic: "Options strategy discussion", open: true },
    ],
  },
];

export const ALL_CHANNELS: Channel[] = CHANNEL_CATEGORIES.flatMap((c) => c.channels);
