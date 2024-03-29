import { getCollection } from "astro:content";

const translations = Object.fromEntries(
    (await getCollection("translations")).map(entry => [entry.id, entry.data])
);

export const getTranslations = (locale = "en") => {
    return (key: string) => {
        return translations[locale][key] ?? translations["en"][key] ?? key;
    };
};

export const getClientTranslations = (locale = "en") => {
    return Object.fromEntries(
        Object.entries(translations[locale]).filter(([key]) => key.startsWith("client"))
    );
};
