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

const UpdateServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const { server } = data;

  const router = useRouter();

  const isModalOpen = isOpen && type == "update-server";
  const [name, setName] = useState(server?.name);
  const [image, setImage] = useState<any>(undefined);
  const [error, setError] = useState<string | undefined>("");

  if (server == undefined) {
    return (
      <Dialog open={isModalOpen} onOpenChange={() => onClose()}>
        <DialogContent className="text-center">
          <DialogHeader>
            <DialogTitle className="text-center text-3xl">
              Update your server
            </DialogTitle>
            <DialogDescription className="text-center text-balance mb-4">
              Update your server a personality with a new name and new Image.
              You can always change it later
            </DialogDescription>
          </DialogHeader>
          <div>
            <FaExclamationCircle className="text-red-500" />
            <span className="text-red-500">{"Sorry, No server was found"}</span>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const uploadServerImage = async () => {
    return new Promise((resolve, reject) => {
      if (image) {
        const storageRef = ref(storage, `servers/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot: any) => {
            // Progress monitoring code
          },
          (error: any) => {
            // Error handling code
            reject(error);
          },
          () => {
            // Successful upload completion code
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                console.log("File available at", downloadURL);
                resolve(downloadURL); // Resolve the promise with the download URL
              })
              .catch((error: any) => {
                reject(error);
              });
          }
        );
      }
    });
  };

  const handleUpdateServer = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      console.log("Name", name);
      console.log("server.name", server.name);
      console.log("image", image);
      if (name == server.name && image == undefined)
        throw Error("Change something to Update ");
      let imageUrl = undefined;
      if (image && image.name) {
        imageUrl = await uploadServerImage();
      }

      const response = await fetch(
        "http://localhost:3000/api/server/update/" + server.id,
        {
          method: "PATCH",
          body: JSON.stringify({ name, imageUrl }),
        }
      );
      const data = await response.json();
      console.log("response and data", response, data);
      if (response.ok) {
        onClose();

        window.location.reload();
        router.push(`/servers/${data.server.id}`);
      } else {
        setError(data.error);
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
            Update your server
          </DialogTitle>
          <DialogDescription className="text-center text-balance mb-4">
            Update your server a personality with a new name and new Image. You
            can always change it later
          </DialogDescription>
        </DialogHeader>
        <form className="mt-3 ">
          <div className="mb-3 text-left space-y-2">
            <label htmlFor="" className="font-bold">
              Upload Image:
            </label>
            <Input
              type="file"
              onChange={(e: any) => setImage(e.target.files[0])}
            />
          </div>
          <div className="text-left space-y-2">
            <label htmlFor="name " className="font-bold">
              Server Name:{" "}
            </label>
            <Input
              value={name}
              defaultValue={server?.name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
        {error && (
          <div className="p-2 px-9 flex items-center gap-5 rounded-xl bg-red-100 text-red-500">
            <FaExclamationCircle />
            {error}
          </div>
        )}
        <DialogFooter>
          <Button size={"lg"} onClick={handleUpdateServer}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateServerModal;
