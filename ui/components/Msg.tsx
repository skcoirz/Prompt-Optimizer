import { TextMessage } from "../connections/types.ts";

function renderContentForRole(message) {
  if (message.role == "ai") {
    return <span class="text-cyan-600">{message.content}</span>;
  }
  return <span>{message.content}</span>;
}

export function Message({ message }: { message: TextMessage }) {
  return (
    <div class="flex mb-4.5">
      <div>
        <p class="text-sm">
          <span class="mr-2 font-bold italic">
            {message.role}
          </span>
          {renderContentForRole(message)}
        </p>
      </div>
    </div>
  );
}
