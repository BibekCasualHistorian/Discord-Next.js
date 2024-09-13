import React from "react";
import { SocketIndicator } from "./SocketIndicator";

const ChatHeader = ({
  channel,
  type,
  serverId,
  name,
  imageUrl,
}: {
  channel?: any;
  imageUrl?: any;
  name?: any;
  serverId?: any;
  type?: string;
}) => {
  return (
    <div className="flex justify-between p-3 px-4 text-white items-center border-b border">
      <h1 className="text-lg font-bold">
        <span className="mr-3 text-xl"># </span> ChatHeader
      </h1>
      <div className="ml-auto">
        <SocketIndicator />
      </div>
    </div>
  );
};

export default ChatHeader;
