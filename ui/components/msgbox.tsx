import { IMsg } from "../islands/ConvBox.tsx";

interface ConvMessage {
  msg: IMsg;
}

export function msgbox({ msg }: ConvMessage) {
  return (
    <div class="w-full bg-gray-50 h-12 text-black rounded shadow flex justify-between items-center content-between">
      <p class="p-2 w-5/6">
        {msg.content}
      </p>
    </div>
  );
}
