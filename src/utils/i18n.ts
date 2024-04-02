import { getCollection } from "astro:content";

// TODO: Find solution to reuse from or in astro.config, which are both currently not possible
export const locales = ["en", "de"];
export const defaultLocale = "en";

const translations = Object.fromEntries(
    (await getCollection("translations")).map(entry => [entry.id, entry.data])
);

// Required due to an Astro.preferredLocale issue not identifying regional codes (e.g., de-DE)
export const getPreferredLocale = (headers: Headers) => {
    return headers.get("accept-language")
        ?.split(",")
        .map(lang => lang.split(";")[0].split("-")[0])
        .find(lang => locales.includes(lang));
};

export const getTranslations = (locale = defaultLocale) => {
    return (key: string) => {
        return translations[locale][key] ?? translations[defaultLocale][key] ?? key;
    };
};

export const getClientTranslations = (locale = defaultLocale) => {
    return Object.fromEntries(
        Object.entries(translations[locale]).filter(([key]) => key.startsWith("client"))
    );
};
