"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CopyIcon } from "@radix-ui/react-icons";
import { FaCheck, FaCircle } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";

const InviteLink = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;
  const isModalOpen = isOpen && type == "invite-link";
  const [copied, setCopied] = useState(false);
  const location =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  // console.log("location", location);
  const url = `${location}/invite/${server?.id}`;

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 10000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
      alert("Failed to copy text to clipboard.");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Invitation Link
          </DialogTitle>
          <DialogDescription className="text-center text-balance">
            Generate a Invitation Link
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <label
              htmlFor="invite-link"
              className="font-semibold text-gray-600"
            >
              Server Invitation Link
            </label>
            <div className="grid mt-1 grid-cols-9 items-center gap-2">
              <Input
                className=" col-span-8"
                name="invite-link"
                value={url}
                readOnly
              />
              {copied ? (
                <Button
                  title="Copied"
                  className="bg-gray-700 h-full rounded-sm"
                >
                  <FaCheck />
                </Button>
              ) : (
                <Button
                  variant={"link"}
                  title="Copy"
                  onClick={handleCopyToClipboard}
                  className="bg-gray-200 h-full rounded-sm"
                >
                  <CopyIcon />
                </Button>
              )}
            </div>
          </div>
          <div className="mt-3 flex gap-3 items-center">
            <p className="text-sm text-gray-600">Create a new Invite Link</p>
            <FaCircle />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteLink;
