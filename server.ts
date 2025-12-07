import * as http from "node:http";
import { createRequestListener } from "@remix-run/node-fetch-server";
import { router } from "./app/server/router";

const server = http.createServer(
  createRequestListener(async (request) => {
    return router.fetch(request);
  }),
);

const port = Number(process.env.PORT ?? 44100);

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});