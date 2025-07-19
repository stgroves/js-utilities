import { isAbsoluteURL } from './isAbsoluteURL.js';

export const convertToURL = (path, source = import.meta.url) => {
    if (path instanceof URL)
        return path;

    if (isAbsoluteURL(path))
        return path;

    return new URL(path, source);
}