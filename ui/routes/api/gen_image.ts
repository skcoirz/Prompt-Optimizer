import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai/mod.ts";
import { IMessage } from "../../connections/types.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const msg: IMessage = await req.json();
    if (Deno.env.get("ENABLE_IMAGE_MOCK") == "y") {
      console.log("mocked, image api answer with ", msg);
      return new Response(
        JSON.stringify({
          role: "ai",
          type: "image",
          content: Deno.env.get("MOCK_IMAGE_RETURN"),
        }),
        {
          status: 200,
        },
      );
    }

    const openAI = new OpenAI(Deno.env.get("OPENAI_API_KEY"));
    const image = await openAI.createImage({
      prompt: msg.content,
      n: 1,
      size: "256x256",
      responseFormat: "b64_json",
    });

    const answer: IMessage = {
      role: "ai",
      type: "image",
      content: "data:image/png;base64," + image.data[0].b64_json,
    };
    return new Response(JSON.stringify(answer), {
      status: 200,
    });
  },
};
