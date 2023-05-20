import { useRef, useState } from "preact/hooks";
import { Msgs } from "../components/Msgs.tsx";
import { server } from "@/connections/server.ts";
import {TextMessage} from "@/connections/types.ts";

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

  async function askAI(e: Event) {
    e.preventDefault();
    if (!taskRef?.current?.value) return;
    const human_msg = taskRef?.current?.value ?? "";
    addHumanMsg(human_msg);
    taskRef.current.value = "";
    gen_answer = server.ask(human_msg);
    try {
      const ai_answer: TextMessage = await gen_answer;
    } catch (err) {
      alert(`Failed to fetch answer: ${err.message}`);
    }
    addAIMsg(ai_answer.content);
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
