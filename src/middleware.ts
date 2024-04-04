import { defineMiddleware } from "astro:middleware";
import { nanoid } from "nanoid";

export const onRequest = defineMiddleware((context, next) => {
    if (context.request.method === "POST" && !context.cookies.get("savedate")) {
        // Set cookie with one year age to be able to redirect to previous responses
        context.cookies.set("savedate", nanoid(24), { maxAge: 60 * 60 * 24 * 365 });
    }

    return next();
});
