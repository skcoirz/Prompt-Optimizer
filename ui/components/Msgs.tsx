import { IMsg } from "../islands/ConvBox.tsx";
import { Msg } from "./Msg.tsx";

interface MsgsProps {
  msgs: IMsg[];
}

export function Msgs({ msgs }: MsgsProps) {
  return (
    <div class="flex flex-col gap-2 pt-2 w-full">
      {msgs?.map((msg) => <Msg msg={msg} />)}
    </div>
  );
}
