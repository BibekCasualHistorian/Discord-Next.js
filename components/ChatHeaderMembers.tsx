import Image from "next/image";
import React from "react";
import { FaUser } from "react-icons/fa";

const ChatHeaderMembers = ({ otherMember }: { otherMember: any }) => {
  return (
    <div className="flex gap-3 p-3 px-4 text-white items-center border-b border">
      <div className="">
        {otherMember.user.image ? (
          <Image src={otherMember.user.image} alt="real" fill />
        ) : (
          <FaUser className="w-[30px] h-[30px]" />
        )}
      </div>
      <h1>{otherMember.user.name}</h1>
    </div>
  );
};

export default ChatHeaderMembers;
