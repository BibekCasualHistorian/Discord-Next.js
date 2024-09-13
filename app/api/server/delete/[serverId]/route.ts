import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: any }) {
  console.log("params", params);
  try {
    const user = await currentUser();
    if (!user) throw Error("You aren't the user");
    const serverId = params.serverId;
    if (!serverId) throw new Error("No server id provided");
    const server = await db.server.findUnique({
      where: { id: serverId },
    });
    console.log("server", server);
    if (!server) throw Error("No server found");
    const serverDelete = await db.server.delete({
      where: { id: serverId },
    });
    console.log("serverDelete", serverDelete);
    return NextResponse.json(
      { success: true, message: "Server Deleted Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "An error occured" },
      { status: 400 }
    );
  }
}
