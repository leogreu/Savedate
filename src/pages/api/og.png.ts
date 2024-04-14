import fs from "fs";
import path from "path";
import OGImage from "@/components/utils/og-image";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import type { ReactElement } from "react";

export const GET: APIRoute = async request => {
    const { searchParams } = new URL(request.url ?? String());
    const { date, name, description, icon } = Object.fromEntries(searchParams.entries());

    return new ImageResponse(
        OGImage({ date, name, description, icon }) as ReactElement,
        {
            width: 1200,
            height: 630,
            emoji: "twemoji",
            fonts: [
                    {
                    name: "Noto Sans",
                    data: fs.readFileSync(path.resolve("./assets/NotoSans-Bold.ttf")),
                    weight: 700
                }
            ]
        }
    );
};
