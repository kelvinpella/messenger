import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/Conversation/Body";
import { Header } from "@/components/Conversation/Header";
import MessageForm from "@/components/Conversation/MessageForm";
import EmptyState from "@/components/EmptyState/EmptyState";

interface IParams {
  conversationId: string;
}
export default async function ConversationId({ params }: { params: IParams }) {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body />
        <MessageForm />
      </div>
    </div>
  );
}
