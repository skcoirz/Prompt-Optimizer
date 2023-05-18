import { IMsg } from "../islands/ConvBox.tsx";

interface ConvMessage {
  msg: IMsg;
}

<<<<<<<< HEAD:ui/components/msgbox.tsx
export function msgbox({ msg }: ConvMessage) {
========
export function Msg({ msg }: ConvMessage) {
>>>>>>>> parent of 314149c (follow naming convention):ui/components/Msg.tsx
  return (
    <div class="w-full bg-gray-50 h-12 text-black rounded shadow flex justify-between items-center content-between">
      <p class="p-2 w-5/6">
        {msg.content}
      </p>
    </div>
  );
}
