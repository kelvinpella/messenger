import { Conversation, Message, User } from "@prisma/client";

// input field property types
export type Input = {
  id: string;
  type: string;
  name: string;
  label: string;
  placeholder: string;
  autoComplete?: string;
};

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};
