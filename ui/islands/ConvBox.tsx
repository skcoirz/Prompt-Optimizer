import { useRef, useState } from "preact/hooks";
import { Tasks } from "../components/Tasks.tsx";

export interface ITask {
  uuid: string;
  desc: string;
}

export default function ConvBox() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskRef = useRef<HTMLInputElement | null>(null);

  function removeTask(uuid: string) {
    setTasks((tasks) => tasks.filter((task) => task.uuid != uuid));
  }

  return (
    <div class="flex flex-col mx-auto max-w-screen-md w-full pt-5">
      <form
        class="flex gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (!taskRef?.current?.value) return;
          setTasks((
            p,
          ) => [...p, {
            desc: taskRef?.current?.value ?? "",
            uuid: crypto.randomUUID(),
          }]);
          taskRef.current.value = "";
        }}
      >
        <input
          class="w-full flex flex-row border-1 border-gray-500 h-10 rounded p-2"
          placeholder="Write your task here..."
          type="text"
          ref={taskRef}
        />
      </form>
      <Tasks tasks={tasks} removeTask={removeTask} />
    </div>
  );
}
