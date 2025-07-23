export const deepClone = (obj, cache = new WeakMap()) => {
    if (typeof obj !== "object" || obj === null) return obj;

    if (cache.has(obj)) return cache.get(obj);

    const clone = Array.isArray(obj) ? [] : {};
    cache.set(obj, clone);

    for (const [key, value] of Object.entries(obj)) {
        clone[key] = deepClone(value, cache);
    }

    return clone;
}