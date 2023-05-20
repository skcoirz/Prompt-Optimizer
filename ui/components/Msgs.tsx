import { Message } from "./Msg.tsx";
import { TextMessage } from "../connections/types.ts";

interface MessagesProps {
  messages: TextMessage[];
}

export function Messages({ messages }: MessagesProps) {
  return (
    <div class="flex-auto">
      {messages.map((msg) => <Message message={msg} />)}
    </div>
  );
}
