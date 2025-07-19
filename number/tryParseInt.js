export const tryParseInt = (value, radix) => {
    const parsed = parseInt(value.trim(), radix);

    return [isNaN(parsed), parsed];
}