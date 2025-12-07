// app/client/main.tsx
import { createRoot, type Remix } from "@remix-run/dom";
import "./style.css";
import { CounterApp } from "./ui/Counter";

function App(this: Remix.Handle) {
  return () => (
    <main class="min-h-screen flex flex-col items-center justify-start bg-slate-950 text-slate-100">
      <header class="w-full max-w-xl p-4">
        <h1 class="text-3xl font-semibold">Remix 3 – Starter</h1>
        <p class="text-sm text-slate-400 mt-2">
          Server: @remix-run/fetch-router · Client: @remix-run/dom + events ·
          Styles: Tailwind.
        </p>
      </header>

      <section class="w-full max-w-xl p-4">
        <CounterApp />
      </section>
    </main>
  );
}

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(<App />);