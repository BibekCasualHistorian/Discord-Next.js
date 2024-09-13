import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Poppins } from "next/font/google";
import { redirect } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/auth/register");
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        where: {
          userId: user?.id,
        },
      },
    },
  });
  console.log("servers in page", servers);
  if (!servers) redirect("/");
  redirect(`/servers/${servers[0].id}/channel/${servers[0].channels[0].id}`);
  return <div className={`${font.className}`}></div>;
}
