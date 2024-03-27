import { Temporal } from "temporal-polyfill";

// TODO: Does this actually work to format a date to another timezone? Add transform property
// that simply adds a .withTimeZone(current)?
export const formatDateParts = (
    locale = "en",
    plainDate: string,
    plainTime?: string | null,
    timezone?: string | null
) => {
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

    return parsed.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "short"
    });
}
