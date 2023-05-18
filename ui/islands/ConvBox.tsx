import { useRef, useState } from "preact/hooks";
<<<<<<< HEAD
import { msgboxes } from "../components/msgboxes.tsx";
=======
import { Msgs } from "../components/Msgs.tsx";
>>>>>>> parent of 314149c (follow naming convention)

export interface IMsg {
  content: string;
}

export default function ConvBox() {
  const [msgs, setMsgs] = useState<IMsg[]>([]);
  const taskRef = useRef<HTMLInputElement | null>(null);

  function askAI(e: Event) {
    console.log("test")
    e.preventDefault();
    if (!taskRef?.current?.value) return;
    setMsgs((
      p,
    ) => [...p, {
      content: taskRef?.current?.value ?? "",
    }]);
    taskRef.current.value = "";
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
<<<<<<< HEAD
      <msgboxes msgs={msgs} />
=======
      <Msgs msgs={msgs} />
>>>>>>> parent of 314149c (follow naming convention)
    </div>
  );
}
