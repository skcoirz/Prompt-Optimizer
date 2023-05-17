// deno-lint-ignore no-unused-vars
async function fetch_web() {
  const url = Deno.args[0];
  const res = await fetch(url);

  const body = new Uint8Array(await res.arrayBuffer());
  await Deno.stdout.write(body);
}

// await fetch_web();

// deno-lint-ignore no-unused-vars
async function print_file_names() {
  const filenames = Deno.args;
  for (const filename of filenames) {
    const file = await Deno.open(filename);
    await file.readable.pipeTo(Deno.stdout.writable);
  }
}

// await print_file_names();

import { serve } from "https://deno.land/std@0.157.0/http/server.ts";
// deno-lint-ignore require-await
async function serve_http() {
  // deno-lint-ignore no-unused-vars
  const handler = async (request: Request): Promise<Response> => {
    const resp = await fetch("https://api.github.com/users/denoland", {
      // The init object here has an headers object containing a
      // header that indicates what type of response we accept.
      // We're not specifying the method field since by default
      // fetch makes a GET request.
      headers: {
        accept: "application/json",
      },
    });

    return new Response(resp.body, {
      status: resp.status,
      headers: {
        "content-type": "application/json",
      },
    });
  };

  console.log("Listening on http://localhost:8000");
  serve(handler);
}

serve_http();
