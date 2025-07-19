export const matchesSchema = (a, b) => {
    if (typeof a !== typeof b) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;
        return a.every((item, index) => matchesSchema(item, b[index]));
    }

    if (typeof a === 'object' && a !== null && b !== null) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);

        if (keysA.length !== keysB.length) return false;
        if (!keysA.every(key => keysB.includes(key))) return false;

        return keysA.every(key => matchesSchema(a[key], b[key]));
    }

    return typeof a === typeof b;
};