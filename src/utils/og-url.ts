import { formatDateParts } from "@/utils/temporal.ts";

export const getOGImageURL = (
    origin: string,
    locale: string,
    event: Record<string, any> // TODO: Should be of type Event
) => {
    event.date = formatDateParts(locale, event.startDate, event.startTime, event.timezone);

    let url = `${origin}/api/og.jpeg?`;
    for (const element of ["date", "name", "description", "icon", "imageId"] as const) {
        const hide = event.previewOptions.hideElements?.includes(element);
        url += `&${element}=${hide ? "" : event[element]}`;
    }

    return encodeURI(url);
};
