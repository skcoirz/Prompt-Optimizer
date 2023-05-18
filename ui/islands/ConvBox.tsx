import { useRef, useState } from "preact/hooks";
import { Msgs } from "../components/Msgs.tsx";

export interface IMsg {
  content: string;
}

export default function ConvBox() {
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const taskRef = useRef<HTMLInputElement | null>(null);

  return (
    <div class="flex flex-col mx-auto max-w-screen-md w-full pt-5">
      <form
        class="flex gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (!taskRef?.current?.value) return;
          setMsgs((
            p,
          ) => [...p, {
            content: taskRef?.current?.value ?? "",
          }]);
          taskRef.current.value = "";
        }}
      >
        <input
          class="w-full flex flex-row border-1 border-gray-500 h-10 rounded p-2 focus:outline-none focus:ring focus:ring-red-500"
          placeholder="describe your image here..."
          type="text"
          ref={taskRef}
        />
      </form>
      <Msgs msgs={msgs} />
    </div>
  );
}
