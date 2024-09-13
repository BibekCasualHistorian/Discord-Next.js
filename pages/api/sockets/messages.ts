// import { currentRoleInPages } from "@/lib/auth.pages";
// import { db } from "@/lib/db";
// import { NextApiResponseServerIo } from "@/types";
// import { NextApiRequest } from "next";
// import { useSearchParams } from "next/navigation";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponseServerIo
// ) {
//   if (req.method === "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }
//   const searchParams = req.query.searchParams;
//   console.log("searchParams: " + searchParams);
//   if (!searchParams) throw Error("No search params");
//   const channelId = searchParams.get("channelId");
//   const serverId = searchParams.get("serverId");
//   try {
//     const user = await currentRoleInPages();
//     const server = await db.server.findFirst({
//       where: { id: serverId as string },
//     });
//     console.log("user", user);
//     const { content } = req.body;
//   } catch (error: any) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }
