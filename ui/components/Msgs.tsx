import { MessageView } from "./Msg.tsx";
import { IMessage } from "../connections/types.ts";

interface MessagesProps {
  messages: IMessage[];
}

export function MessagesView({ messages }: MessagesProps) {
  return (
    <div class="flex-auto">
      {messages.map((msg) => <MessageView message={msg} />)}
    </div>
  );
}
