import type { Router } from "@remix-run/fetch-router";
import { html } from "@remix-run/html-template";

export function registerUserRoutes(router: Router) {
    router.get("/login", async () => {
        return new Response(String(html`
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8" />
                    <title>Login</title>
                  </head>
                  <body>
                    <h1>Login Page</h1>
                    <p>A route for logging in.</p>
                  </body>
                </html>
            `), {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    });

    router.get("/register", async () => {
        return new Response(String(html`
                <!doctype html>
                <html lang="en">
                  <head>
                    <meta charset="utf-8" />
                    <title>Register</title>
                  </head>
                  <body>
                    <h1>Login Page</h1>
                    <p>A route for registering as a new user.</p>
                  </body>
                </html>
            `), {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    });
}