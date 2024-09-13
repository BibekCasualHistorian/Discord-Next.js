import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemberRole, UserRole } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) throw new Error("No serverId provided");

    const user = await currentUser();
    if (!user) throw new Error("Sorry, you aren't logged in");
    const { name, type } = await req.json();

    console.log("name and type in sever", name, type);

    if (!name || !type) throw new Error("Please, provide full credentials");

    const channelCreated = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId: user.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            userId: user.id,
            name: name,
            type: type,
          },
        },
      },
    });

    if (!channelCreated) throw new Error("Channel creation failed");

    console.log("channels", channelCreated);
    return NextResponse.json(
      { success: true, channel: channelCreated },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An error occured" },
      { status: 400 }
    );
  }
}
