import { IMessage } from "./types.ts";

export class Server {
  async genTextAnswer(msg: IMessage): Promise<IMessage> {
    const resp = await fetch("/api/gen_text", {
      method: "POST",
      body: JSON.stringify(msg),
    });
    const ans: IMessage = resp.json();
    if (!resp.ok) {
      alert("Failed to get Answer");
      throw new Error(ans);
    }
    return ans;
  }
}

export const server = new Server();
