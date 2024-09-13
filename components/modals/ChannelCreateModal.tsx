"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaExclamationCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { SelectContent, SelectValue } from "@radix-ui/react-select";
import { ChannelType } from "@prisma/client";

interface ChannelTypeProps {
  channelType: ChannelType;
}

const ChannelCreateModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type == "create-channel";
  const { server, channelType } = data;
  const [name, setName] = useState("");

  const [selectedChannelType, setSelectedChannelType] = useState<ChannelType>(
    channelType || ChannelType.TEXT
  );
  const [error, setError] = useState<string | undefined>("");

  const handleCreateChannel = async (e: any) => {
    e.preventDefault();
    setError("");
    console.log("type and name", name, type);
    if (!name) setError("Please enter a name");
    try {
      if (!server?.id) throw Error("no Server Id provided");
      const response = await fetch(
        "http://localhost:3000/api/channel/create?serverId=" + server.id,
        {
          method: "POST",
          body: JSON.stringify({ name, type: selectedChannelType }),
        }
      );
      const responseData = await response.json();
      console.log("response and responseData", response, responseData);
      if (response.ok) {
        onClose();
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            Cutomize your server
          </DialogTitle>
          <DialogDescription className="text-center text-balance mb-4">
            Give your server a personality with a name and Image. You can always
            change it later
          </DialogDescription>
        </DialogHeader>
        <form className="mt-3 mb-3">
          <div className="text-left space-y-2">
            <label htmlFor="name " className="font-bold">
              Channel Name:{" "}
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mt-3 text-left space-y-2">
            <label htmlFor="type" className="font-bold text-left ">
              Select the type
            </label>
            <Select
              onValueChange={(value: any) => setSelectedChannelType(value)}
              value={selectedChannelType}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className=" w-full ">
                <SelectItem value={ChannelType.TEXT}>
                  {ChannelType.TEXT}
                </SelectItem>
                <SelectItem value={ChannelType.AUDIO}>
                  {ChannelType.AUDIO}
                </SelectItem>
                <SelectItem value={ChannelType.VIDEO}>
                  {ChannelType.VIDEO}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        {error && (
          <div className="p-2 px-9 flex items-center gap-5 rounded-xl bg-red-100 text-red-500">
            <FaExclamationCircle />
            {error}
          </div>
        )}
        <DialogFooter>
          <Button size={"lg"} onClick={handleCreateChannel}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChannelCreateModal;
