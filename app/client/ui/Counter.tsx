// app/client/ui/CounterApp.tsx
import type { Remix } from "@remix-run/dom";
import { press } from "@remix-run/events/press";

export function CounterApp(this: Remix.Handle) {
  let count = 0;

  const increment = () => {
    count++;
    this.update(); // trigger re-render
  };

  return () => (
    <div class="space-y-4 text-center">
      <h2 class="text-2xl font-semibold">Counter</h2>
      <p class="text-sm text-slate-400">
        This component uses @remix-run/dom + @remix-run/events.
      </p>
      <button
        type="button"
        class="px-4 py-2 rounded bg-sky-500 hover:bg-sky-600 text-sm font-medium"
        on={press(increment)}
      >
        Count: {count}
      </button>
    </div>
  );
}