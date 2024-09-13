// "use client";
import ChannelHeader from "@/components/ChannelHeader";
import ChannelList from "@/components/ChannelList";
import ServerMembers from "@/components/ServerMembers";
import ServerSideBar from "@/components/sidebars/ServerSideBar";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const ServerIdLayout = async ({
  children,
  params,
  searchParams,
}: {
  children: React.ReactNode;
  params: any;
  searchParams: String;
}) => {
  console.log(params);

  const user = await currentUser();
  if (!params || !params.serverId || !user) {
    redirect("/");
  }

  const server = await db.server.findUnique({
    where: { id: params.serverId },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          user: true,
        },

        orderBy: {
          role: "asc",
        },
      },
    },
  });

  // console.log("server in layout", server);

  const textChannels = server?.channels.filter(
    (channel) => channel.type == ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type == ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type == ChannelType.VIDEO
  );
  const members = server?.members.filter((member) => member.userId != user.id);

  // console.log("members", members);

  return (
    <div className="">
      <div className=" dark:bg-serverBackgroundColor dark:text-white  h-full hidden md:flex flex-col fixed w-[250px]">
        <ServerSideBar server={server} />
        <hr />

        <div className="p-2">
          <div className=" my-2 pb-1">
            <ChannelHeader server={server} header="Text" />
            <ChannelList
              header="Text"
              server={server}
              channels={textChannels}
            />
          </div>

          <hr className="border border-gray-600 px-2.5" />
          <div className="my-2">
            <ChannelHeader server={server} header="Audio" />
            <ChannelList
              header="Audio"
              server={server}
              channels={audioChannels}
            />
          </div>
          <hr className="border border-gray-600 px-2" />

          <div className="my-2">
            <ChannelHeader server={server} header="Video" />
            <ChannelList
              header="Video"
              server={server}
              channels={videoChannels}
            />
          </div>

          <hr className="border border-gray-600 px-2" />

          <div className="my-2">
            <ChannelHeader server={server} header="Members" />
            <ServerMembers server={server} members={members} />
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default ServerIdLayout;
