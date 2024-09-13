import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodeParams {
  params: {
    inviteCode: string;
  };
}

const Page = async ({ params }: InviteCodeParams) => {
  const user = await currentUser();
  if (!user) redirect("/");
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect("/servers/" + existingServer.id);
  }

  const serverUpdate = await db.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            userId: user?.id,
          },
        ],
      },
    },
  });
  if (serverUpdate) {
    redirect("/servers/" + serverUpdate.id);
  }
  return <div>Page</div>;
};

export default Page;
