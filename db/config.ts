import { defineDb, defineTable, column } from "astro:db";

const Event = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text(),
        description: column.text({ optional: true }),
        icon: column.text({ optional: true }),
        image: column.text({ optional: true }),
        startDate: column.text(),
        startTime: column.text({ optional: true }),
        endDate: column.text(),
        endTime: column.text({ optional: true }),
        timezone: column.text({ optional: true }),
        allowResponse: column.boolean({ default: false }),
        participantsVisible: column.boolean({ default: false }),
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

const Image = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        dataURL: column.text()
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Event, Participant, Image }
});
