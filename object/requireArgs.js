/**
 *
 * @param {Array<string>} requiredKeys
 * @param args
 * @returns {{}}
 */
export const requireArgs = (requiredKeys, args = {}) => {
    const missing = requiredKeys.filter(key => !(key in args));

    if (missing.length)
        throw new Error(`Missing required argument(s): ${missing.join(', ')}`);

    return args;
}