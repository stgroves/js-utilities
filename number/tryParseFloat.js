export const tryParseFloat = (value) => {
    const parsed = parseFloat(value.trim());

    return [!isNaN(parsed), parsed];
}