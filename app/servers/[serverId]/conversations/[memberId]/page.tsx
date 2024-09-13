import ChatHeader from "@/components/ChatHeader";
import ChatHeaderMembers from "@/components/ChatHeaderMembers";
import { currentUser } from "@/lib/auth";
import { getOrCreateConversation } from "@/lib/conversation";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: any }) => {
  const user = await currentUser();
  const { serverId, memberId } = params;
  console.log("serverId and memberId", serverId, memberId);
  const currentMember = await db.member.findFirst({
    where: {
      serverId: serverId,
      userId: user?.id,
    },
    include: {
      user: true,
    },
  });
  console.log("memeber", currentMember);
  if (!currentMember) redirect("/servers/" + serverId);
  const conversation = await getOrCreateConversation(
    currentMember?.id,
    params.memberId
  );
  console.log("conversation", conversation);
  if (!conversation || !conversation.memberOne || !conversation.memberTwo)
    redirect("/servers/" + serverId);
  const { memberOne, memberTwo } = conversation;
  const otherMember = memberOne?.userId === user?.id ? memberTwo : memberOne;
  return (
    <div className="dark:text-white ml-[250px] dark:bg-channelBackgroundColor min-h-screen">
      <ChatHeaderMembers otherMember={otherMember} />
    </div>
  );
};

export default Page;
