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
import { FaExclamationCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type == "delete-channel";

  const { server, channel } = data;

  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const handleDeleteChannel = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/channel/delete/${channel.id}?serverId=${server?.id}`,
        { method: "DELETE" }
      );
      const responseData = await response.json();
      console.log("response, responseData", response, responseData);
      if (response.ok) {
        onClose();
        router.push("/");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent className="text-center">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl text-rose-500">
            Delete your Channel
          </DialogTitle>
          <DialogDescription className="text-center text-balance mb-4 text-rose-300">
            Are you sure you want to delete this Channel ?
          </DialogDescription>
        </DialogHeader>
        <div>
          Channel Name:{" "}
          <span className="text-red-500 font-bold">{data.channel?.name}</span>{" "}
        </div>
        {error && (
          <div className="p-2 px-9 flex items-center gap-5 rounded-xl bg-red-100 text-red-500">
            <FaExclamationCircle />
            {error}
          </div>
        )}
        <DialogFooter className="flex justify-between w-full">
          <Button
            className="text-white bg-red-500"
            size={"lg"}
            onClick={handleDeleteChannel}
          >
            Delete
          </Button>
          <Button size={"lg"} onClick={() => onClose()}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
