import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
    output: "server",
    adapter: vercel(),
    integrations: [
        db(),
        react(),
        tailwind({
            applyBaseStyles: false
        })
    ]
});
