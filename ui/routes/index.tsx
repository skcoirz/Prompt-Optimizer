import { Head } from "$fresh/runtime.ts";
import ConvBox from "../islands/ConvBox.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title> Prompt Op </title>
        <meta name="description" content="Prompt Op & Img Gen" />
      </Head>
      <main class="p-4 mx-auto max-w-screen-md flex flex-col justify-center items-center">
        <h1 class="text-3xl p-2 font-monaco lowercase mr-12">
          <img src="/logo.png" class="h-10 inline-block align-middle mr-2" alt="logo" />
          Prompt Op.
        </h1>
        <p class="font-monaco lowercase italic text-sm text-pink-600">
          hint: chat with AI to optimize your image prompt. type "go" to render
          img. type "stop" to leave.
        </p>
        <ConvBox />
      </main>
    </>
  );
}
