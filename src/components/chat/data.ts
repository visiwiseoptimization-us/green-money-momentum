export type ChatMessage = {
  id: number;
  author: string;
  initials: string;
  time: string;
  text: string;
  role?: "host" | "mod";
};

export type Channel = {
  id: string;
  name: string;
  topic: string;
  messages: ChatMessage[];
};

export type ChannelCategory = {
  label: string;
  channels: Channel[];
};

export const CHANNEL_CATEGORIES: ChannelCategory[] = [
  {
    label: "Information",
    channels: [
      {
        id: "announcements",
        name: "announcements",
        topic: "Official updates from GMM",
        messages: [
          {
            id: 1,
            author: "GMM",
            initials: "GM",
            time: "Sunday 8:02 AM",
            role: "host",
            text: "This week's investor note is live — check the Weekly Notes tab. New video drops Tuesday.",
          },
        ],
      },
      {
        id: "rules",
        name: "rules",
        topic: "Keep it useful for everyone",
        messages: [
          {
            id: 1,
            author: "GMM",
            initials: "GM",
            time: "Pinned",
            role: "host",
            text: "1) Be respectful. 2) No financial advice presented as fact — share your own take. 3) No spam or pumping. Not investment advice; trade at your own risk.",
          },
        ],
      },
    ],
  },
  {
    label: "Market Talk",
    channels: [
      {
        id: "general",
        name: "general",
        topic: "Live during market hours",
        messages: [
          {
            id: 1,
            author: "GMM",
            initials: "GM",
            time: "9:31 AM",
            role: "host",
            text: "Morning — SPY holding above the 50-day so far. Watching that level all session.",
          },
          {
            id: 2,
            author: "trader_dana",
            initials: "TD",
            time: "9:33 AM",
            text: "Semis leading again this morning, NVDA looking strong out of the gate.",
          },
          {
            id: 3,
            author: "marcus_invests",
            initials: "MI",
            time: "9:36 AM",
            text: "Anyone else watching QQQ relative strength vs SPY today?",
          },
          {
            id: 4,
            author: "GMM",
            initials: "GM",
            time: "9:40 AM",
            role: "host",
            text: "Yep — QQQ outperforming since the open. That's the leadership I flagged in Sunday's note.",
          },
          {
            id: 5,
            author: "priya.trades",
            initials: "PT",
            time: "9:44 AM",
            text: "Added to my position on the pullback this morning, holding above yesterday's low so far.",
          },
        ],
      },
      {
        id: "stock-picks",
        name: "stock-picks",
        topic: "Share setups you're watching",
        messages: [
          {
            id: 1,
            author: "kevin_k",
            initials: "KK",
            time: "10:12 AM",
            text: "AMD coiling right under resistance, watching for a breakout on volume.",
          },
          {
            id: 2,
            author: "sofia_swings",
            initials: "SS",
            time: "10:15 AM",
            text: "META still holding above the 21-day, looks constructive.",
          },
          {
            id: 3,
            author: "GMM",
            initials: "GM",
            time: "10:20 AM",
            role: "host",
            text: "Good callouts — both on my watchlist from Sunday's note too.",
          },
        ],
      },
      {
        id: "price-action",
        name: "price-action",
        topic: "Real-time reactions to the tape",
        messages: [
          {
            id: 1,
            author: "marcus_invests",
            initials: "MI",
            time: "11:02 AM",
            text: "VIX ticking down again, tape feels calm heading into lunch.",
          },
          {
            id: 2,
            author: "trader_dana",
            initials: "TD",
            time: "11:05 AM",
            text: "Volume's light though — wouldn't read too much into the calm.",
          },
        ],
      },
      {
        id: "options-plays",
        name: "options-plays",
        topic: "Options strategy discussion",
        messages: [
          {
            id: 1,
            author: "priya.trades",
            initials: "PT",
            time: "1:14 PM",
            text: "IV crush after earnings has been brutal this week, staying cautious on new positions.",
          },
        ],
      },
    ],
  },
];

export const ONLINE_MEMBERS = [
  { name: "GMM", initials: "GM", role: "host" as const },
  { name: "trader_dana", initials: "TD", role: "member" as const },
  { name: "marcus_invests", initials: "MI", role: "member" as const },
  { name: "priya.trades", initials: "PT", role: "member" as const },
  { name: "kevin_k", initials: "KK", role: "member" as const },
  { name: "sofia_swings", initials: "SS", role: "member" as const },
];
