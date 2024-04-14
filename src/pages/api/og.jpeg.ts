import OGImage from "@/components/utils/og-image";
import { db, eq, Image } from "astro:db";
import { ImageResponse } from "@vercel/og";
import sharp from "sharp";
import type { APIRoute } from "astro";
import type { ReactElement } from "react";

export const GET: APIRoute = async request => {
    const { searchParams } = new URL(request.url ?? String());
    const { date, name, description, icon, imageId } = Object.fromEntries(searchParams.entries());

    const image = imageId && await db.select().from(Image).where(eq(Image.id, imageId)).get();
    const dataURL = image && image.dataURL;

    const fontData = await fetch("https://savedate.app/NotoSans-Bold.ttf")
        .then((res) => res.arrayBuffer());

    const response = new ImageResponse(
        OGImage({ date, name, description, icon, dataURL }) as ReactElement,
        {
            width: 1200,
            height: 630,
            emoji: "twemoji",
            fonts: [
                    {
                    name: "Noto Sans",
                    data: fontData,
                    weight: 700
                }
            ]
        }
    );

    // Transform .png image to .jpeg to limit file size, required for custom images
    return new Response(
        await sharp(await response.arrayBuffer()).jpeg({ quality: 90 }).toBuffer(),
        {
            headers: {
                "Content-Type": "image/jpeg"
            },
            status: 200
        }
    );
};
