import { v4 as uuid } from "uuid";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

interface fieldsToBeUpdatedProps {
  name?: string;
  imageUrl?: string;
}

export async function PATCH(req: NextRequest, { params }: { params: any }) {
  try {
    const userId = await currentUser();
    if (!userId) throw Error("Sorry, you aren't logged in");

    const serverId = params.serverId;
    if (!serverId) throw Error("No serverId provided");

    const { name, imageUrl } = await req.json();
    if (!name && !imageUrl) throw Error("Sorry, no data was changed");
    let fieldsToBeUpdated: fieldsToBeUpdatedProps = {};
    if (name) fieldsToBeUpdated.name = name;
    if (imageUrl) fieldsToBeUpdated.imageUrl = imageUrl;
    const server = await db.server.update({
      where: {
        id: serverId,
        userId: userId.id,
      },
      data: {
        name,
        imageUrl,
      },
    });
    if (!server) throw Error("Failed to update server");
    return NextResponse.json({ success: true, server }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An error occured" },
      { status: 400 }
    );
  }
}
