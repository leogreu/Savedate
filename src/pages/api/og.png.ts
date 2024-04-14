import fs from "fs";
import path from "path";
import OGImage from "@/components/utils/og-image";
import { db, eq, Image } from "astro:db";
import { ImageResponse } from "@vercel/og";
import type { APIRoute } from "astro";
import type { ReactElement } from "react";

export const GET: APIRoute = async request => {
    const { searchParams } = new URL(request.url ?? String());
    const { date, name, description, icon, imageId } = Object.fromEntries(searchParams.entries());

    const image = imageId && await db.select().from(Image).where(eq(Image.id, imageId)).get();
    const dataURL = image && image.dataURL;

    return new ImageResponse(
        OGImage({ date, name, description, icon, dataURL }) as ReactElement,
        {
            width: 1200,
            height: 630,
            emoji: "twemoji",
            fonts: [
                    {
                    name: "Noto Sans",
                    data: fs.readFileSync(path.join(process.cwd(), "/assets/NotoSans-Bold.ttf")),
                    weight: 700
                }
            ]
        }
    );
};
