import type { Models } from "appwrite";

export const omit = <T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> => {
    const newObj = { ...obj };
    keys.forEach((key) => {
        delete newObj[key];
    });
    return newObj;
};

export const getOriginAppwriteData = (data: Models.Document) => {
    return omit(data, [
        "$id",
        "$collectionId",
        "$databaseId",
        "$createdAt",
        "$updatedAt",
        "$permissions",
    ]);
};
