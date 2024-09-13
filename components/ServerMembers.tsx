"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";

const ServerMembers = ({ server, members }: { server: any; members: any }) => {
  const router = useRouter();
  const params = useParams();
  // console.log("server and users", server);
  return (
    <div>
      {members.map((each: any, index: number) => {
        return (
          <div
            key={index}
            onClick={() =>
              router.push(
                `/servers/${params.serverId}/conversations/${each.id}`
              )
            }
            className={`cursor-pointer  flex gap-4  items-center px-3 p-2 rounded-lg hover:bg-gray-700 ${
              params?.memberId ? "bg-gray-700" : ""
            }`}
          >
            <div className=" rounded-full w-[30px] h-[30px]">
              {each.image && (
                <Image src={each.user.imageUrl} alt={each.name} fill />
              )}
              {!each.image && <FaUser className="w-[30px] h-[30px]" />}
            </div>
            <h1 className="font-semibold">{each.user.name}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default ServerMembers;
