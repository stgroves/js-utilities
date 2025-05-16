export default class ObjectUtilities {
    /**
     *
     * @param {Array<string>} requiredKeys
     * @param args
     * @returns {{}}
     */
    static requireArgs(requiredKeys, args = {}) {
        for (const key of requiredKeys) {
            if (!(key in args)) {
                throw new Error(`Missing required argument: "${key}"`);
            }
        }
        return args;
    }
}