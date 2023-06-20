import { FullConversationType } from "@/typings";
import { Conversation, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

export default function useOtherUser(
  conversation: FullConversationType | { users: User[] }
) {
  const session = useSession();
  const otherUser = useMemo(() => {
    const currentUserEmail = session?.data?.user?.email;
    const otherUser = conversation.users.filter(
      (user) => user.email !== currentUserEmail
    );
    return otherUser;
  }, [conversation.users, session?.data?.user?.email]);
  return otherUser[0];
}
