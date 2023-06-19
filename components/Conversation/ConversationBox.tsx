"use client";
import useOtherUser from "@/common/hooks/useOtherUser";
import { FullConversationType } from "@/typings";
import { Conversation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}
export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage || !userEmail) return false;

    const seenArray = lastMessage.seen || [];

    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);
  return <div> conversation</div>;
}
