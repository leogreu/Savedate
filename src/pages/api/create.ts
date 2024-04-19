import { db, Event, Participant, Image } from "astro:db";
import { nanoid } from "nanoid";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    const { name, description, startDate, startTime, endDate, endTime, icon, image: dataURL, timezone, response, visible }
        = Object.fromEntries((await request.formData()).entries());

    try {
        if (typeof name === "string" && typeof startDate === "string") {
            const [image] = typeof dataURL === "string" && dataURL.length
                ? await db.insert(Image).values({
                    id: nanoid(24),
                    dataURL
                }).returning()
                : [];

            const [event] = await db.insert(Event).values({
                id: nanoid(8),
                name: name,
                description: typeof description === "string" ? description : null,
                icon: icon && typeof icon === "string" ? icon : "🎉",
                imageId: image ? image.id : undefined,
                startDate: startDate,
                startTime: typeof startTime === "string" ? startTime : null,
                endDate: typeof endDate === "string" ? endDate : startDate,
                endTime: typeof endTime === "string" ? endTime
                    : (typeof startTime === "string" ? startTime : null),
                timezone: startTime && typeof timezone === "string" ? timezone : null,
                allowResponse: response ? true : false,
                participantsVisible: response && visible ? true : false,
                createdDate: new Date()
            }).returning();

            const [participant] = await db.insert(Participant).values({
                id: nanoid(24),
                eventId: event.id,
                isAdmin: true,
                response: "yes",
                createdDate: new Date(),
                cookie: cookies.get("savedate")?.value
            }).returning();

            return redirect(`/participant/${participant.id}`);
        } else {
            return new Response("No name or start date specified.",
                { status: 400 }
            );
        }
    } catch {
        return new Response("Error while creating event.",
            { status: 500 }
        );
    }
};
