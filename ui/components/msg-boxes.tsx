import { IMsg } from "../islands/ConvBox.tsx";
import { msg-box } from "./msg-box.tsx";

interface MsgsProps {
  msgs: IMsg[];
}

export function msg-boxes({ msgs }: MsgsProps) {
  return (
    <div class="flex flex-col gap-2 pt-2 w-full">
      {msgs?.map((msg) => <Msg msg={msg} />)}
    </div>
  );
}
