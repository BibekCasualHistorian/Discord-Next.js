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

const InitialModal = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<any>(undefined);
  const [display, setDisplay] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  console.log("imge", image);

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

  const handleCreateServer = async (e: any) => {
    e.preventDefault();
    setError("");
    if (!name || !image || !image.name) {
      setError("All credentials are required");
      return;
    }
    let imageUrl;
    if (image && image.name) {
      imageUrl = await uploadServerImage();
    }
    const response = await fetch("http://localhost:3000/api/server/create", {
      method: "POST",
      body: JSON.stringify({ name, imageUrl }),
    });
    const data = await response.json();
    console.log("response and data", response, data);
    if (response.ok) {
      router.push(`/servers/${data.server.id}`);
    }
  };

  useEffect(() => {
    setDisplay(true);
  }, []);

  if (!display) return null;

  return (
    <Dialog open>
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
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </form>
        {error && (
          <div className="p-2 px-9 flex items-center gap-5 rounded-xl bg-red-100 text-red-500">
            <FaExclamationCircle />
            {error}
          </div>
        )}
        <DialogFooter>
          <Button size={"lg"} onClick={handleCreateServer}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
