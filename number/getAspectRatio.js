import { tryParseFloat } from './tryParseFloat.js';

export const getAspectRatio = (width, height) => {
    const [widthSuccess, parsedWidth] = tryParseFloat(width);
    const [heightSuccess, parsedHeight] = tryParseFloat(height);

    if (!widthSuccess)
        throw new TypeError(`width must be a number!`);

    if (!heightSuccess)
        throw new TypeError(`height must be a number!`);

    return parsedWidth / parsedHeight;
}