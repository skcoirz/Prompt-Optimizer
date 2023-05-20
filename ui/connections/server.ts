import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import { TextMessage } from "./types.ts";

export class Server {
    async genAskAI(msg: TextMessage): Promise<TextMessage> {
        const openAI = new OpenAI(Deno.env.get("OPENAI_API_KEY") || "");
        
        const chatCompletion = await openAI.createChatCompletion({
          model: "gpt-4",
          messages: [
            { "role": "user", "content": msg.content },
          ],
        });

        return {
            role: "ai",
            content: chatCompletion.data.choices[0].text,
        } as TextMessage;
    }
}

export const server = new Server();