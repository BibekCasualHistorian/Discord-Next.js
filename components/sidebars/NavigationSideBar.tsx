"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { ModeToggle } from "../ModeToggle";
import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModal } from "@/hooks/useModal";

const NavigationSideBar = ({ servers }: { servers: any }) => {
  const user = useCurrentUser();
  // console.log("user", user);
  const { onOpen } = useModal();
  const router = useRouter();
  const { serverId } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>("");
  const handleServerChange = async (id: string) => {
    router.push(`/servers/${id}`);
  };

  return (
    <div className="w-full flex flex-col justify-between h-screen pb-3 text-wrap mt-3">
      <div>
        <div className=" py-2 bg-tranparent flex items-center justify-center  hover:text-white">
          <div
            onClick={() => onOpen("create-server")}
            title="Create a Server"
            className="w-12 h-12 cursor-pointer text-4xl rounded-2xl border-none bg-gray-700  grid justify-center  hover:rounded-2xl transition delay-100  hover:bg-green-700  "
          >
            {/* <h1 className=" w-fit h-fit flex items-center pb-2 text-green-700 hover:text-white transition delay-100"> */}
            +{/* </h1> */}
          </div>
        </div>
        <hr className="my-2 border mx-2 border-gray-600" />
        <div className="h-full">
          {servers.map((each: any) => {
            // console.log("each", each);
            return (
              <div
                onClick={() => handleServerChange(each.id)}
                key={each.id}
                className={`server-hover mb-0 rounded relative py-2 cursor-pointer `}
              >
                <div className="absolute flex items-center top-1/2 bottom-1/2">
                  <span
                    className={`${
                      each.id.toString() === serverId.toString()
                        ? "h-[32px] bg-white  "
                        : "h-[18px] bg-gray-400  "
                    } w-[5px]  hover:h-[28px]  rounded-3xl left-0`}
                  ></span>
                </div>
                <div className="rounded-3xl relative w-4/6 mx-auto h-[45px]">
                  <Image
                    src={each.imageUrl}
                    alt="just a server"
                    priority
                    fill
                    sizes="40px"
                    className="object-cover rounded-xl"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-center mx-auto ">
          <ModeToggle />
        </div>
        <div className="flex justify-center border-2 border-white rounded-full mx-auto  w-[40px] h-[40px] items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user?.image ? (
                <Image src={user?.image || "undefined"} alt="your image" fill />
              ) : (
                <FaUser size={23} className="" />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default NavigationSideBar;
