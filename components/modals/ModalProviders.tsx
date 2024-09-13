"use client";
import React, { useEffect, useState } from "react";
import InviteLink from "./InviteLink";
import CreateServerModal from "./CreateServerModal";
import DeleteServerModal from "./DeleteServerModal";
import UpdateServerModal from "./UpdateSeverModal";
import ChannelCreateModal from "./ChannelCreateModal";
import DeleteChannelModal from "./DeleteChannelModal";
import UpdateChanelModal from "./UpdateChannelModal";

const ModalProviders = () => {
  // console.log("modalProviders");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  if (!open) return null;
  return (
    <>
      <CreateServerModal />
      <InviteLink />
      <DeleteServerModal />
      <UpdateServerModal />
      <ChannelCreateModal />
      <DeleteChannelModal />
      <UpdateChanelModal />
    </>
  );
};

export default ModalProviders;
