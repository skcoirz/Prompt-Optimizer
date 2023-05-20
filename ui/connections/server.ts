import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import { TextMessage } from "./types.ts";
import * as mod from "https://deno.land/std@0.188.0/dotenv/mod.ts";
import { load } from "https://deno.land/std@0.188.0/dotenv/mod.ts";

export class Server {
    async genAskAI(msg: TextMessage): Promise<TextMessage> {
        console.log("here");
        const env = await load({
          envPath: "../.env",
        });
        console.log(env);
        const openAI = new OpenAI(env["OPENAI_API_KEY"]);
        
        const chatCompletion = await openAI.createChatCompletion({
          model: "gpt-4",
          messages: [
            { "role": "user", "content": msg.content },
          ],
        });

        return {
            role: "ai",
            content: chatCompletion?.choices[0]?.message?.content || "no response",
        } as TextMessage;
    }
}

export const server = new Server();