async function fetch_web() {
    const url = Deno.args[0];
    const res = await fetch(url);

    const body = new Uint8Array(await res.arrayBuffer());
    await Deno.stdout.write(body);
}

// await fetch_web();

async function print_file_names() {
    const filenames = Deno.args;
    for (const filename of filenames) {
      const file = await Deno.open(filename);
      await file.readable.pipeTo(Deno.stdout.writable);
    }
}

await print_file_names();
