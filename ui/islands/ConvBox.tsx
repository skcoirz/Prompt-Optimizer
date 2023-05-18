import { useRef, useState } from "preact/hooks";
import { Msgs } from "../components/Msgs.tsx";

export interface IMsg {
  content: string;
}

export default function ConvBox() {
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const taskRef = useRef<HTMLInputElement | null>(null);

  function addHumanMsg(msg: string) {
    setMsgs((
      p,
    ) => [{
      content: msg,
    }, ...p]);
  }

  function addAIMsg(msg: string) {
    setMsgs((
      p,
    ) => [{
      content: "AI: " + msg,
    }, ...p]);
  }

  function askAI(e: Event) {
    e.preventDefault();
    if (!taskRef?.current?.value) return;
    addHumanMsg(taskRef?.current?.value ?? "");
    taskRef.current.value = "";
    addAIMsg("answer")
  }

  return (
    <div class="flex flex-col mx-auto max-w-screen-md w-full pt-5">
      <form
        class="flex gap-2 w-full"
        onSubmit={askAI}
      >
        <input
          class="w-full flex flex-row border-1 border-gray-500 h-10 rounded p-2 focus:outline-none focus:ring focus:ring-red-500"
          placeholder="Write your task here..."
          type="text"
          ref={taskRef}
        />
      </form>
      <Msgs msgs={msgs} />
    </div>
  );
}
