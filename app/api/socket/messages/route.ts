import { currentUser } from "@/lib/auth";
import { currentRoleInPages } from "@/lib/auth.pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: any, res: NextApiResponseServerIo) {
  const user = await currentUser();
  if (!user || !user.id) throw new Error("No user available");
  // console.log("req. url", req.url);
  if (!req.url) throw new Error("No Url Provided");
  const { searchParams } = new URL(req.url);
  // console.log("searchParams: " + searchParams);
  if (!searchParams) throw Error("No search params");
  const channelId = searchParams.get("channelId");
  const serverId = searchParams.get("serverId");
  // console.log("channelId: " + channelId);
  // console.log("serverId: " + serverId);
  try {
    const { content } = await req.json();

    console.log("content", content);

    const user = await currentRoleInPages();
    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId: user?.id,
          },
        },
      },
      include: {
        members: true,
      },
    });
    console.log("server: " + server);

    if (!server) throw new Error("Server not found");
    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
    });
    if (!channel) throw Error("Channel not found");
    const member = server?.members.find((member) => member.userId == user.id);
    console.log("memeber: " + member);
    if (!member || !member?.id)
      throw new Error("You are not a member of this server");
    const messageCreated = await db.message.create({
      data: {
        content,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            user: true,
          },
        },
      },
    });
    console.log("memberCreated", messageCreated);
    if (!messageCreated) throw Error("No message was created");
    const channelKey = `chat:${channelId}:message`;
    return NextResponse.json(messageCreated, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 400 }
    );
  }
}
