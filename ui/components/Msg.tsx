import { IMessage } from "../connections/types.ts";

function renderContentForRole(message) {
  if (message.role == "ai") {
    return <span class="text-cyan-600">{message.content}</span>;
  }
  return <span>{message.content}</span>;
}

function renderTextMessage(message) {
  return (
    <div class="flex">
      <p class="text-sm">
        <span class="mr-2 font-bold italic">
          {message.role}
        </span>
        {renderContentForRole(message)}
      </p>
    </div>
  )
}

function renderImageMessage(message) {
  return (
    <div class="flex content-center">
      <p class="text-sm italic font-bold"> generated image </p>
      <img class="mt-2 h-60" src={message.content} alt="generated image" />
    </div>
  )
}

export function MessageView({ message }: { message: TextMessage }) {
  if (message.type == "image") {
    return renderImageMessage(message);
  }
  return renderTextMessage(message);
}
