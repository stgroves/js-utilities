export const isAbsoluteURL = (path) => {
    return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path);
}