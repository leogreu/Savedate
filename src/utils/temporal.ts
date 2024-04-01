import { Temporal } from "temporal-polyfill";
import { defaultLocale } from "./i18n.ts";

export const formatDateParts = (
    locale = defaultLocale,
    plainDate: string,
    plainTime?: string | null,
    timezone?: string | null,
    toLocaleTimezone?: boolean
) => {
    let parsed;
    if (plainTime && timezone) {
        parsed = Temporal.Now
            .zonedDateTimeISO()
            .withTimeZone(timezone)
            .withPlainDate(plainDate)
            .withPlainTime(plainTime);

        if (toLocaleTimezone) {
            parsed = parsed.withTimeZone(Temporal.Now.timeZoneId());
        }
    } else {
        parsed = Temporal.PlainDate.from(plainDate);
    }

    return formatDate(locale, parsed);
}

export const formatDate = (
    locale: string,
    date: Date | Temporal.ZonedDateTime | Temporal.PlainDate
) => {
    return date.toLocaleString(locale, {
        dateStyle: "medium",
        timeStyle: "short"
    });
}
