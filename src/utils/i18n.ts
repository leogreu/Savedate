import { getCollection } from "astro:content";

const translations = Object.fromEntries(
    (await getCollection("translations")).map(entry => [entry.id, entry.data])
);

// Required due to a bug in Astro.preferredLocale, not identifying regional codes (e.g., de-DE)
export const getPreferredLocale = (headers: Headers) => {
    return headers.get("accept-language")
        ?.split(",")
        .map(lang => lang.split(";")[0].split("-")[0])
        .at(0);
};

export const getTranslations = (locale = "en") => {
    return (key: string) => {
        return translations[locale][key] ?? translations["en"][key] ?? key;
    };
};

export const getClientTranslations = (locale = "en") => {
    return JSON.stringify(
        Object.fromEntries(
            Object.entries(translations[locale]).filter(([key]) => key.startsWith("client"))
        )
    );
};
