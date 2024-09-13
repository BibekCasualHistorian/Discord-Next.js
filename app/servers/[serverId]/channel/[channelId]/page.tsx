import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: any }) => {
  const { serverId, channelId } = params;
  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });
  if (!channel) redirect("/");
  return (
    <div className="flex flex-col dark:text-white ml-[250px] dark:bg-channelBackgroundColor min-h-screen">
      <ChatHeader />
      <div className="flex-1 bg-white">Future Messages</div>
      <div>
        <ChatInput
          name={channel.name}
          type="channel"
          apiUrl="/api/socket/messages"
          query={{
            channelId: channel?.id,
            serverId: channel?.serverId,
          }}
        />
      </div>
    </div>
  );
};

export default Page;
