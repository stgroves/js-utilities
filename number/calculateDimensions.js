import { getAspectRatio, tryParseFloat } from './index.js';

export const calculateDimensions = (width, height, aspectRatio) => {
    if (typeof aspectRatio === 'string') {
        const [w, h] = aspectRatio.split(':').map(Number);
        aspectRatio = getAspectRatio(w, h);
    }

    if (!isFinite(aspectRatio)) {
        throw new Error('Invalid aspect ratio!');
    }

    const [successWidth, parsedWidth] = tryParseFloat(width);
    const [successHeight, parsedHeight] = tryParseFloat(height);

    if (successWidth) {
        return {
            parsedWidth,
            height: parsedWidth / aspectRatio
        };
    }

    if (successHeight) {
        return {
            width: parsedHeight * aspectRatio,
            parsedHeight
        };
    }

    throw new Error('Either width or height must be provided!');
}