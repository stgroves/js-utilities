export const validateSchema = (value, schema) => {
    if (Array.isArray(schema)) {
        if (!Array.isArray(value) || value.length !== schema.length) return false;
        return value.every((item, index) => validateSchema(item, schema[index]));
    }

    if (typeof schema === 'object' && schema !== null) {
        if (typeof value !== 'object' || value === null) return false;

        const schemaKeys = Object.keys(schema);
        const valueKeys = Object.keys(value);

        // Check for extra keys in value
        if (valueKeys.length !== schemaKeys.length) return false;
        if (!valueKeys.every(key => schemaKeys.includes(key))) return false;

        return schemaKeys.every(key => validateSchema(value[key], schema[key]));
    }

    const actualType = Array.isArray(value) ? 'array' : typeof value;
    return actualType === schema;
};