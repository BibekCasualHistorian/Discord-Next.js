"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const ChatInput = ({ apiUrl, type, query, name }: ChatInputProps) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("content", content);
    const url = `http://localhost:3000${apiUrl}?serverId=${query.serverId}&channelId=${query.channelId}`;
    console.log("url", url);
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
    const data = await response.json();
    console.log("response", response);
    console.log("response Data", data);
    if (response.ok) {
      setContent("");
      setIsLoading(false);
    }
  };
  return (
    <div className="p-2 flex gap-2">
      <Input
        className="bg-white text-black"
        placeholder="Enter the message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button disabled={isLoading || !content.length} onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default ChatInput;
