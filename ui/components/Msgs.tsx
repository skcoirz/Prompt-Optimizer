import { IMsg } from "../islands/ConvBox.tsx";
import { Msg, Message } from "./Msg.tsx";
import { TextMessage } from "../connections/types.ts";

interface MsgsProps {
  msgs: IMsg[];
}

interface MessagesProps {
  messages: TextMessage[];
}

export function Messages({ messages }: MessagesProps) {
  return (
    <div class="flex-auto overflow-y-scroll">
      {messages.map(msg => <Message message={msg} />)}
    </div>
  )
}

export function Msgs({ msgs }: MsgsProps) {
  return (
    <div class="flex flex-col gap-2 pt-2 w-full">
      {msgs?.map((msg) => <Msg msg={msg} />)}
    </div>
  );
}
