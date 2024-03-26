import { defineDb, defineTable, column } from "astro:db";

const Event = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        icon: column.text(),
        name: column.text(),
        description: column.text(),
        date: column.date()
    }
});

const Participant = defineTable({
    columns: {
        eventId: column.text({ references: () => Event.columns.id }),
        name: column.text(),
        isAdmin: column.boolean(),
        willParticipate: column.boolean()
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Event, Participant }
});
