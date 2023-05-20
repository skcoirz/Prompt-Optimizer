import { TextMessage } from "./types.ts";

export class Server {
  async genAskAI(msg: TextMessage): Promise<TextMessage> {
    const resp = await fetch("/api/gen_text", {
      method: "POST",
      body: JSON.stringify(msg),
    });
    const ans: TextMessage = resp.json();
    if (!resp.ok) {
      alert("Failed to get Answer");
      throw new Error(ans);
    }
    return ans;
  }
}

export const server = new Server();
