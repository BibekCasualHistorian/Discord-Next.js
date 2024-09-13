"use client";
import React, { useEffect, useRef, useState } from "react";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { useModal } from "@/hooks/useModal";
import { Server } from "lucide-react";

const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  //   console.log("isOpen DeleteServerModal", isOpen);
  //   console.log("onClose and type", onClose, type);
  const isModalOpen = isOpen && type == "delete";

  const [image, setImage] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const handleDeleteServer = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/server/delete/" + data.server?.id,
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
            Delete your server
          </DialogTitle>
          <DialogDescription className="text-center text-balance mb-4 text-rose-300">
            Are you sure you want to delete this server ?
          </DialogDescription>
        </DialogHeader>
        <div>
          Server Name:{" "}
          <span className="text-red-500 font-bold">{data.server?.name}</span>{" "}
        </div>
        {error && (
          <div className="p-2 px-9 flex items-center gap-5 rounded-xl bg-red-100 text-red-500">
            <FaExclamationCircle />
            {error}
          </div>
        )}
        <DialogFooter>
          <Button
            className="text-white bg-red-500"
            size={"lg"}
            onClick={handleDeleteServer}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
