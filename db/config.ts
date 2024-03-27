import { defineDb, defineTable, column } from "astro:db";

const Event = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        name: column.text(),
        description: column.text({ optional: true }),
        icon: column.text({ optional: true }),
        startDate: column.text(),
        endDate: column.text(),
        startTime: column.text({ optional: true }),
        endTime: column.text({ optional: true }),
        timezone: column.text({ optional: true }),
        participantsVisible: column.boolean(),
        createdDate: column.date()
    }
});

const Participant = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        eventId: column.text({ references: () => Event.columns.id }),
        name: column.text({ optional: true }),
        isAdmin: column.boolean(),
        willParticipate: column.boolean(),
        createdDate: column.date()
    }
});

// https://astro.build/db/config
export default defineDb({
    tables: { Event, Participant }
});
