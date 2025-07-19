export const isEmptyOrNull = (str) => {
    return str === null || str === undefined || (typeof str === 'string' && str.trim().length === 0);
}