import { defineDb, defineTable, column } from "astro:db";

const Event = defineTable({
    columns: {
        id: column.text({ unique: true }),
        icon: column.text({ optional: true }),
        name: column.text(),
        description: column.text({ optional: true }),
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
