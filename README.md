# Remix 3 Startup Guide

This repo is meant to serve as a starting point for anyone wanting to get started with **Remix 3**. Feel free to modify and make additions to this repo.

Note: Remix 3 is still experimental and the APIs/packages are evolving. This guide reflects the current Remix Jam/experimental packages and may need updates as things stabalize.

Resources:
- [Remix 3 repo](https://github.com/remix-run/remix)
- [Remix 3 announcement /context](https://remix.run/blog/wake-up-remix)

Prerequisites:
- Some Javascript
    - [Quick start](https://www.w3schools.com/js/default.asp)
    - [Deeper dive](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Introduction)
- Basic server-side concepts
    - [Server-side programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side)

## What is Remix 3
What used to be Remix 2 is now [react-router-v7](https://reactrouter.com/). Those concepts will live on there, so if you need a great web framework with some Remix magic, its all still there.

**Remix 3** is completely [different](https://remix.run/blog/wake-up-remix), no more React, no (or minimal) third party dependencies, a focus on web fundamentals first, and a modular framework. So if you have no prior Remix or React experience you can still dive in with minimal pre-requisites.

What this mean is that if you want to build a web app of any kind (API Server, SSR, SPA, MPA, streaming HTML, islands, etc.), Remix 3 gives you the low-level infrastructure building blocks and you assemble the pieces you need.

## Remix 3 components
To understand the Remix 3 packages, its helpful to understand the basic components of a web app, and the various Remix 3 packages that may fit into those roles.

- **HTTP server/platform** -  Accepts TCP connections, parses them as HTTP requests, and hands them to your app code. (Bun, Deno, Django, Cloudflare Workers, etc).
   - @remix-run/node-fetch-server (adapts nodes HTTP server to the Fetch API, other runtimes such as Bun, Deno, or cloudflare workers already support Fetch so you may not need an adapter if you use those).
- **Router + middleware** - Maps (method, URL) to handler code, and composes middleware logic such as auth, logging, input validation, body parsing, etc.
   ....- @remix-run/fetch-router
   ....- @remix-run/route-pattern
   ....- @remix-run/async-context-middleware
   ....- @remix-run/logger-middleware
- **Data / session layer** - How you read/write data, track users, manage session/cookies. (ORMs and drivers: Prisma, mysql, passport etc).
   ....- @remix-run/session
   ....- @remix-run/cookie
   ....- @remix-run/file-storage
   ....- @remix-run/lazy-file
- **Rendering/HTML** - How you turn your UI description into HTML (template engines like handlebars, react, vue, etc).
   ....- @remix-run/html-template
   ....- @remix-run/headers
   ....- @remix-run/dom 
- **Client runtime + UI framework** - Hydration, interactivity, and (optionally) navigation on the client. (react, nextjs, vue, HTMX).
   ....- @remix-run/interaction
   ....- @remix-run/dom
   ....- Framework level APIs, hydrated(), Frame
- **Static files/assets** - How you handle and serve files like images, CSS, JS, etc.
   ....- @remix-run/static-middleware
   ....- @remix-run/mime
   ....- @remix-run/fs
   ....- @remix-run/lazy-file
- **Build system/dev tooling** - Dev server + bundler that turns TS/jSX etc into deployable server + client bundles and static assets. (NGINX/Apace, Cloudflare pages, Vite).
   ....- Remix 3 is intentionally runtime first and bundler agnostic. Everything is written against Web APIs and can execute in Node, Deno, Bun, Workers, etc.

## Building an App
The goal is a minimal Remix 3 stack that:
- Uses Remix 3 packages (router, node adapter, DOM, events).
- Has a clean file structure with low boilerplate.
- Lets you focus on experimenting with Remix 3 concepts.

```bash
mkdir remix3-starter && cd remix3-starter
npm init -y
git init
```

Remix 3 packages need playwright and chromium to run
```bash
npm i -D playwright
npx playwright install chromium
```

Install typescript
```bash
npm install -D typescript @types/node tsx
```

Vite for dev ex
```bash
npm install -D vite
```

Tailwinds for css
```bash
npm install -D tailwindcss @tailwindcss/vite
```

Generate typescript config (replace contents with the contents of this repos tsconfig.json file)
```bash
npx tsc --init
```

Create vite.config.mts and add the contents of this repos vite.config.mts file to it.
```bash
touch vite.config.mts
```

Install the remix-3 packages and use legacy-peer-deps flag to ignore potential dependency conflicts (there will be alot of those)
```bash
npm install \
@remix-run/node-fetch-server@0.12.0 \
@remix-run/fetch-router@0.13.0 \
@remix-run/html-template@0.3.0 \
@remix-run/headers@0.18.0 \
@remix-run/dom@0.0.0-experimental-remix-jam.6 \
@remix-run/events@0.0.0-experimental-remix-jam.5 \
--save --legacy-peer-deps
```

Install npm-run-all to handle running serverside and client side code.
```bash
npm install -D npm-run-all
```

Heres the structure of our app

```bash
├── server.ts                       # Node HTTP entrypoint
├── vite.config.mts                 # Vite configuration
├── tsconfig.json                   # Typescript compiler options
├── package.json
└── app/
   ├── client/
   │   ├── ui/
   │   │   └─ CounterApp.tsx       # Example Remix DOM component
   │   ├── main.tsx                # Browser entry for Remix DOM
   │   └── style.css               # Tailwind entrypoint
   └── server/
       └── router.ts               # Server router
```

**server.ts** Uses @remix-run/node-fetch-server to adapt Node's http server to the Fetch API and forwards every request to router.fetch(request).
**vite.config.mts** Vite configuration that wires up Tailwinds, and aliases React's JSX runtime imports to @remix-run/dom. Remix has its own version of JSX that uses class for CSS class names, and has additional attributes specific to Remix 3.
**tsconfig.json** Enables modern ES libs, bundler module resolution, and sets jsxImportSource to @remix-run/dom so JSX uses Remix's runtime instead of React's.

Server side code
**app/server/router.ts** Uses @remix-run/fetch-router to register routes (GET /) and returns an HTML shell (via @remix-run/html-template) that includes <div id="root"></div> and a <script type="module" src="http://localhost:5173/app/client/main.tsx"></script> to boot the client.

Client side code
**app/client/main.tsx** Imports global styles, defiens the App component that renders the layout and pages, then calls createRoot(rootEl).render(<App />) to mount the Remix 3 UI on #root.
**app/client/styles.css** Imports tailwindcss and any global styles so Vite can process and inject them to the page.
**app/client/ui/CounterApp.tsx** Demonstrates the closure based component model, uses @remix-run/events/press for interactivity, and calls this.update() to re-render when state changes.

# Routing
Routing is handled by a Fetch native router, you create a router with createRouter(), register routes like router.get("/user", handler), and your HTTP server passes each incoming Request to router.fetch(request) to get a Response. This means that routing is completely separate from React, or any UI framework, you only have to understand standard web primitives (Request/Response APIs).
- You have a consistent place to handle both "pages", and "APIs".
- You can return HTML, JSON, or streamed responses from the same router. 
- You can easily add middle ware and split features to sub routers without changing how you think about routing.

# DOM
A react like JSX runtime + renderer that works with the real DOM. Designed to work with Fetch based server router, streaming / partial HTML, and @remix-run/events for interactions. You write components with this: Remix.Handle and closures.
this: Remix.Handle is provided by Remix DOM, owns the lifecycle of this components instance, and exposes this.update (and other APIs) to control re-rendering (hydration). Use on={} to handle various events, which are themselves just higher level abstractions of the DOM event model. Remix DOM doesn't assume it owns the entire app so its easy to just re-hydrate specific areas instead of the entire document. A lightweight JSX runtime that lets you build interactive "islands" using plain closures.

# Events
In Remix 3 you create interaction objects with @remix-run/events (like press(handler)) and pass them to the on prop. Those interactions listen to the right native event, call your handler, and update your ui by mutating closure state and calling this.update().

# Frames / Streaming
Frames (server rendered chunks) and streaming responses as first class tools, so you can progressively stream HTML/updates without juggling React Suspense.

# First class infrastructure building blocks (sessions, forms, files, etc.)


# Summary
On the server, Remix 3 is just a Fetch based router plus a bunch of small middleware packages.
The client is a new JSX runtime that uses closures and this.update() instead of React state/hooks.
Everything talks over web standards (Fetch, Reponse, DOM, events), so its portable and not locked to React.
