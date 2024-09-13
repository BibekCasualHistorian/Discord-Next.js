"use client";
import React, { useEffect, useState } from "react";
import {
  FaChevronDown,
  FaCog,
  FaComments,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

import { redirect } from "next/navigation";
import { useModal } from "@/hooks/useModal";

const ServerSideBar = ({ server }: { server: any }) => {
  const { onOpen } = useModal();
  const user = useCurrentUser();
  if (!user) redirect("/");
  const isAdmin =
    server.members.filter((each: any) => each.userId == user.id)[0].role ==
    "ADMIN";
  const isModerator =
    server.members.filter((each: any) => each.userId == user.id)[0].role ==
    "MODERATOR";

  return (
    <div className="">
      <div
        className="flex justify-between p-3 px-4 text-white items-center border-b border"
        style={{ fontSize: "1.02rem" }}
      >
        <h1 className="font-semibold">{server?.name || "Unknown"}</h1>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <FaChevronDown className="font-bold" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="1">
            <DropdownMenuItem className="flex justify-center font-bold text-xl">
              Profile
            </DropdownMenuItem>

            {isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("invite-link", { server })}
              >
                <FaUserFriends
                  className={`inline-block align-middle mr-3 text-xl `}
                />
                <span>Invite People</span>
              </DropdownMenuItem>
            )}

            {isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("update-server", { server })}
              >
                <FaCog className={`inline-block align-middle mr-3 text-xl `} />
                <span>Server Settings</span>
              </DropdownMenuItem>
            )}

            {isAdmin && (
              <DropdownMenuItem>
                <FaUserPlus
                  className={`inline-block align-middle mr-3 text-xl `}
                />
                <span>Manage Members</span>
              </DropdownMenuItem>
            )}

            {isAdmin && (
              <DropdownMenuItem
                onClick={() => onOpen("create-channel", { server })}
              >
                <FaComments
                  className={`inline-block align-middle mr-3 text-xl `}
                />
                <span>Create Channels</span>
              </DropdownMenuItem>
            )}

            {isAdmin && (
              <DropdownMenuItem onClick={() => onOpen("delete", { server })}>
                <FaComments
                  className={`inline-block text-rose-500 align-middle mr-3 text-xl `}
                />
                <span>Delete Server</span>
              </DropdownMenuItem>
            )}

            {!isAdmin && (
              <DropdownMenuItem>
                <FaComments
                  className={`inline-block text-rose-500 align-middle mr-3 text-xl `}
                />
                <span>Leave Server</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ServerSideBar;
