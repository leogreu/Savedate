import { defineDb, defineTable, column } from "astro:db";

const Event = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text(),
        description: column.text({ optional: true }),
        icon: column.text({ optional: true }),
        date: column.date(),
        createdDate: column.date({ default: new Date() })
    }
});

const Participant = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        eventId: column.text({ references: () => Event.columns.id }),
        name: column.text({ optional: true }),
        isAdmin: column.boolean(),
        willParticipate: column.boolean(),
        createdDate: column.date({ default: new Date() })
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Event, Participant }
});
