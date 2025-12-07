// app/server/router.ts
import { createRouter } from "@remix-run/fetch-router";
import { html } from "@remix-run/html-template";
import { registerUserRoutes } from "./routes.user";

export const router = createRouter();

const CLIENT_ENTRY = "http://localhost:5173/app/client/main.tsx";

// --- Existing "/" route (non-streaming) ---
router.get("/", async () => {
  const doc = html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Remix 3 Starter</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="${CLIENT_ENTRY}"></script>
      </body>
    </html>
  `;

  return new Response(String(doc), {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
});

// --- NEW: streaming "/dashboard" route ---
router.get("/dashboard", async () => {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  (async () => {
    // 1) Stream the initial shell immediately
    const headAndShell = html`
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <title>Dashboard (streaming)</title>
        </head>
        <body>
          <header>
            <h1>Dashboard</h1>
            <p>This header is sent right away.</p>
          </header>

          <main>
            <section>
              <h2>Fast content</h2>
              <p>This came from the first chunk of the stream.</p>
            </section>
    `;
    await writer.write(encoder.encode(String(headAndShell)));

    // 2) Simulate slow work (DB/API/etc.)
    await new Promise((r) => setTimeout(r, 1500));

    // 3) Stream the slow part later
    const slowSection = html`
      <section>
        <h2>Slow content</h2>
        <p>This section was streamed after a delay.</p>
      </section>
    `;
    await writer.write(encoder.encode(String(slowSection)));

    // 4) Close tags and (optionally) load client JS
    const tail = html`
          </main>
          <!-- Optional: hydrate with Remix DOM on this route too -->
          <!-- <script type="module" src="${CLIENT_ENTRY}"></script> -->
        </body>
      </html>
    `;
    await writer.write(encoder.encode(String(tail)));

    await writer.close();
  })().catch(async (err) => {
    console.error(err);
    try {
      await writer.close();
    } catch {}
  });

  return new Response(readable, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      // Node/your host will add the actual transfer encoding
    },
  });
});

registerUserRoutes(router);