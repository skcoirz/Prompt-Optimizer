export type IMessage = IHumanMessage | IAIMessage;

interface IMessageBase {
  type: string;
  content: string;
}

interface IHumanMessage extends IMessageBase {
  role: "human";
}

interface IAIMessage extends IMessageBase {
  role: "ai";
}
