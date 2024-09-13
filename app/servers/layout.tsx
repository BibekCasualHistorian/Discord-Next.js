import NavigationSideBar from "@/components/sidebars/NavigationSideBar";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

const ServerLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (!user) redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });
  return (
    <div className="">
      <div className="hidden md:flex flex-col w-[72px] dark:bg-sideBarColor dark:text-white h-screen fixed">
        <NavigationSideBar servers={servers} />
      </div>
      <div className="md:pl-[72px] h-full">{children}</div>
    </div>
  );
};

export default ServerLayout;
