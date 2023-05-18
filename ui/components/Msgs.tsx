import { IMsg } from "../islands/ConvBox.tsx";
<<<<<<<< HEAD:ui/components/msgboxes.tsx
import { msgbox } from "./msgbox.tsx";
========
import { Msg } from "./Msg.tsx";
>>>>>>>> parent of 314149c (follow naming convention):ui/components/Msgs.tsx

interface MsgsProps {
  msgs: IMsg[];
}

<<<<<<<< HEAD:ui/components/msgboxes.tsx
export function msg_boxes({ msgs }: MsgsProps) {
========
export function Msgs({ msgs }: MsgsProps) {
>>>>>>>> parent of 314149c (follow naming convention):ui/components/Msgs.tsx
  return (
    <div class="flex flex-col gap-2 pt-2 w-full">
      {msgs?.map((msg) => <msgbox msg={msg} />)}
    </div>
  );
}
