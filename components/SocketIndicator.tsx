"use client";

import { useSocket } from "./SocketProvider";

import { Badge } from "./ui/badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();
  if (!isConnected) {
    return (
      <Badge
        variant={"outline"}
        className="bg-yellow-500 text-white p-1 rounded-xl border-none"
      >
        Fallback: Polling every 1s
      </Badge>
    );
  }
  return (
    <Badge
      className="bg-green-500 text-white px-4 py-1 rounded-xl border-none"
      variant={"outline"}
    >
      Live Real-time Updates
    </Badge>
  );
};
