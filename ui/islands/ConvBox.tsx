import { useRef, useState } from "preact/hooks";
import { MessagesView } from "../components/Msgs.tsx";
import { server } from "../connections/server.ts";
import { IMessage } from "../connections/types.ts";

export interface IMsg {
  content: string;
}

export default function ConvBox() {
  const taskRef = useRef<HTMLInputElement | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  // add human message
  function addHumanMessage(msg: IMessage) {
    setMessages((p) => [msg, ...p]);
  }

  // add ai message
  function addAIMessage(msg: IMessage) {
    setMessages((p) => [msg, ...p]);
  }

  async function askAI(e: Event) {
    e.preventDefault();
    if (!taskRef?.current?.value) return;
    const human_msg = taskRef?.current?.value ?? "";
    addHumanMessage({ role: "human", content: human_msg });
    taskRef.current.value = "";
    const gen_answer = server.genTextAnswer({
      role: "user",
      type: "text",
      content: human_msg,
    } as IMessage);
    try {
      const ai_answer: IMessage = await gen_answer;
      addAIMessage(ai_answer);
    } catch (err) {
      alert(`Failed to fetch answer: ${err.message}`);
    }
  }

  return (
    <div class="w-full flex-auto max-h-screen">
      <form
        class="flex gap-2 w-full"
        onSubmit={askAI}
      >
        <input
          class="mt-1 w-full flex flex-row border-1 border-gray-500 h-10 rounded p-2 focus:outline-none focus:ring focus:ring-gray-400"
          placeholder="Write your task here..."
          type="text"
          ref={taskRef}
        />
      </form>
      <MessagesView messages={messages} />
    </div>
  );
}
