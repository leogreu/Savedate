import { defineDb, defineTable, column } from "astro:db";

const Image = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        dataURL: column.text()
    }
});

const Event = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text(),
        description: column.text({ optional: true }),
        icon: column.text({ optional: true }),
        imageId: column.text({ optional: true }), // TODO: Should use references: () => Image.columns.id
        startDate: column.text(),
        startTime: column.text({ optional: true }),
        endDate: column.text(),
        endTime: column.text({ optional: true }),
        timezone: column.text({ optional: true }),
        allowResponse: column.boolean({ default: false }),
        participantsVisible: column.boolean({ default: false }),
        previewOptions: column.json({ default: {} }),
        createdDate: column.date()
    }
});

const Participant = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        eventId: column.text({ references: () => Event.columns.id }),
        name: column.text({ optional: true }),
        response: column.text(),
        isAdmin: column.boolean(),
        createdDate: column.date(),
        cookie: column.text({ optional: true })
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Event, Participant, Image }
});
