import { useRef, useState } from "preact/hooks";
import { Messages } from "../components/Msgs.tsx";
import { server } from "../connections/server.ts";
import { TextMessage } from "../connections/types.ts";

export interface IMsg {
  content: string;
}

export default function ConvBox() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<TextMessages>([]);

  // add human message
  function addHumanMessage(msg: TextMessage) {
    setMessages((p) => [msg, ...p]);
  }

  // add ai message
  function addAIMessage(msg: TextMessage) {
    setMessages((p) => [msg, ...p]);
  }

  async function askAI(e: Event) {
    e.preventDefault();
    if (!taskRef?.current?.value) return;
    const human_msg = taskRef?.current?.value ?? "";
    addHumanMessage({ role: "human", content: human_msg });
    taskRef.current.value = "";
    const gen_answer = server.genAskAI({
      role: "user",
      content: human_msg,
    } as TextMessage);
    try {
      const ai_answer: TextMessage = await gen_answer;
      addAIMessage(ai_answer);
    } catch (err) {
      alert(`Failed to fetch answer: ${err.message}`);
    }
  }

  return (
    // <div class="flex flex-col mx-auto max-w-screen-md w-full pt-5">
    <div class="w-full flex-auto max-h-screen">
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
      <Messages messages={messages} />
    </div>
  );
}
