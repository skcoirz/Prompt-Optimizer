import { IMsg } from "../islands/ConvBox.tsx";
import { TextMessage } from "../connections/types.ts";

export function Message({ message }: { message: TextMessage }) {
  return (
    <div class="flex mb-4.5">
      <div>
        <p class="flex items-baseline mb-1.5">
          <span class="mr-2 font-bold">
            {"> "+message.role}
          </span>
        </p>
        <p class="text-sm text-gray-800">{message.content}</p>
      </div>
    </div>
  );
}

interface ConvMessage {
  msg: IMsg;
}

export function Msg({ msg }: ConvMessage) {
  return (
    <div class="w-full bg-gray-50 h-12 text-black rounded shadow flex justify-between items-center content-between">
      <p class="p-2 w-5/6">
        {msg.content}
      </p>
    </div>
  );
}

