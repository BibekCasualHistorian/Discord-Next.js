import { v4 as uuid } from "uuid";
import { currentUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const userId = await currentUser();
    if (!userId) throw Error("Sorry, you aren't logged in");

    const { name, imageUrl } = await req.json();
    if (!name || !imageUrl) throw Error("Please, provide all credentials");
    const server = await db.server.create({
      data: {
        userId: userId.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels: { create: { name: "General", userId: userId.id } },
        members: { create: [{ userId: userId.id, role: UserRole.ADMIN }] },
      },
    });
    if (!server) throw Error("Failed to create server");
    return NextResponse.json({ success: true, server }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An error occured" },
      { status: 400 }
    );
  }
}
