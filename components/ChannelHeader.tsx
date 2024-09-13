"use client";
import { useModal } from "@/hooks/useModal";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Settings } from "lucide-react";
import { ChannelType } from "@prisma/client";

const ChannelHeader = ({
  server,
  header,
}: {
  server?: any;
  header: string;
}) => {
  const type =
    header == "Text"
      ? ChannelType.TEXT
      : header == "Audio"
      ? ChannelType.AUDIO
      : ChannelType.VIDEO;
  const { onOpen } = useModal();
  // console.log("type", type);
  const handleClick = (type: ChannelType) => {
    // console.log("type", type);
    onOpen("create-channel", { server, channelType: type });
  };
  const handleManageMember = () => {
    onOpen("manage-server", { server });
  };
  return (
    <div className=" my-1 mb-2 ">
      <section className="flex justify-between items-center px-2.5">
        <h2 className="text-base font-semibold ">
          {header != "Members"
            ? `${header} Channels`
            : "Members" || "undefined"}
        </h2>
        {header == "Members" && (
          <button onClick={handleManageMember} className=" ">
            <Settings size={17} />
          </button>
        )}

        {header != "Members" && (
          <button onClick={() => handleClick(type)} className=" ">
            <FaPlus size={14} />
          </button>
        )}
      </section>
    </div>
  );
};

export default ChannelHeader;
