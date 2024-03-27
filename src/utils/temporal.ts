import { Temporal } from "temporal-polyfill";

export const formatDateParts = (plainDate: string, plainTime?: string | null, timezone?: string | null) => {
    let parsed: Temporal.ZonedDateTime | Temporal.PlainDate;
    if (plainTime && timezone) {
        parsed = Temporal.Now
            .zonedDateTimeISO()
            .withTimeZone(timezone)
            .withPlainDate(plainDate)
            .withPlainTime(plainTime);
    } else {
        parsed = Temporal.PlainDate.from(plainDate);
    }

    return parsed.toLocaleString(navigator.language, {
        dateStyle: "medium",
        timeStyle: "short"
    });
}
