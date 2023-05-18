import { IMsg } from "../islands/ConvBox.tsx";
import { msgbox } from "./msgbox.tsx";

interface MsgsProps {
  msgs: IMsg[];
}

export function msg_boxes({ msgs }: MsgsProps) {
  return (
    <div class="flex flex-col gap-2 pt-2 w-full">
      {msgs?.map((msg) => <msgbox msg={msg} />)}
    </div>
  );
}
