import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import { IMessage } from "../../connections/types.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    if (Deno.env.get("ENABLE_MOCK") == "y") {
      console.log("mocked, text api call");
      return new Response(
        JSON.stringify({
          role: "ai",
          type: "text",
          content: Deno.env.get("MOCK_TEXT_RETURN"),
        }),
        {
          status: 200,
        },
      );
    }

    const openAI = new OpenAI(Deno.env.get("OPENAI_API_KEY"));
    const msg: IMessage = await req.json();
    const chatCompletion = await openAI.createChatCompletion({
      model: "gpt-4",
      messages: [
        { "role": "user", "content": msg.content },
      ],
    });

    const answer: IMessage = {
      role: "ai",
      type: "text",
      content: chatCompletion?.choices[0]?.message?.content || "no response",
    };
    return new Response(JSON.stringify(answer), {
      status: 200,
    });
  },
};
