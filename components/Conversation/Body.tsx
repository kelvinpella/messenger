"use client";

import useConversation from "@/common/hooks/useConversation";
import { FullMessageType } from "@/typings";
import { useRef, useState, useEffect } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/prisma/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}
export default function Body({ initialMessages }: BodyProps) {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = async (message: FullMessageType) => {
      await axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((currentMessages) => {
        if (find(currentMessages, { id: message.id })) return currentMessages;
        return [...currentMessages, message];
      });

      bottomRef?.current?.scrollIntoView();
    };
    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage;
          return currentMessage;
        })
      );
    };
    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
}
