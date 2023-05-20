export type TextMessage = HumanTextMessage | AITextMessage;

export interface BaseTextMessage = {
    content: string;
}

export interface HumanTextMessage extends BaseTextMessage {
    role: "human";
}

export interface AITextMessage extends BaseTextMessage {
    role: "ai";
}