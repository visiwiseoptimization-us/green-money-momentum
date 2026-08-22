import type { Metadata } from "next";
import ChatRoom from "@/components/chat/ChatRoom";

export const metadata: Metadata = {
  title: "Chat Room — Green Money Momentum",
};

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-brand-green-bright">
          Live
        </span>
        <h1 className="font-display mt-3 text-3xl font-bold sm:text-4xl">Investor Chat Room</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
          Talk price action with the GMM community in real time. Pick a display name and jump in —
          no account needed. Not investment advice; see the pinned rules before posting.
        </p>
      </div>

      <div className="mt-12">
        <ChatRoom />
      </div>
    </div>
  );
}
