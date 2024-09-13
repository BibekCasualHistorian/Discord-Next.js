"use client";
import { useModal } from "@/hooks/useModal";
import { Mic } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import {
  FaEdit,
  FaHashtag,
  FaLock,
  FaMusic,
  FaTrash,
  FaVideo,
} from "react-icons/fa";

const ChannelList = ({
  header,
  server,
  channels,
}: {
  header: string;
  server: any;
  channels: any;
}) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();
  const link =
    header == "Text" ? (
      <FaHashtag />
    ) : header == "Audio" ? (
      <Mic size={17} />
    ) : header == "Video" ? (
      <FaVideo />
    ) : (
      <FaHashtag />
    );
  const handleChannelChange = async (id: string) => {
    router.push(`/servers/${server.id}/channel/${id}`);
  };
  return (
    <div className=" rounded-lg space-y-1  ">
      {channels.map((each: any, index: number) => {
        return (
          <div
            onClick={() => handleChannelChange(each.id)}
            key={index}
            className={`cursor-pointer px-3 p-1.5 rounded-lg w-full flex items-center justify-between  mb-1 ${
              params.channelId == each.id ? "bg-gray-700" : ""
            }`}
          >
            <div className="flex items-center gap-2 p-0.5">
              <span className="text-sm">{link}</span>
              <h1 className="text-sm font-semibold">{each.name}</h1>
            </div>
            {each.name == "General" && (
              <div className=" hover:flex flex gap-2">
                <FaLock size={10} />
              </div>
            )}
            {each.name != "General" && (
              <div className=" hover:flex flex  gap-2">
                <FaEdit size={12} />
                <FaTrash
                  title="Delete the channel"
                  size={12}
                  onClick={() =>
                    onOpen("delete-channel", { server, channel: each })
                  }
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChannelList;
