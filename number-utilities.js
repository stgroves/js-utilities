export default class NumberUtilities {
    static tryParseFloat(value) {
        const parsed = parseFloat(value);

        if (isNaN(parsed))
            return {value: null, success: false};

        return {value: parsed, success: true};
    }

    static tryParseInt(value) {
        const parsed = parseInt(value);

        if (isNaN(parsed))
            return {value: null, success: false};

        return {value: parsed, success: true};
    }

    static clamp(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }

    static getAspectRatio(width, height) {
        const parsedWidth = parseFloat(width);
        const parsedHeight = parseFloat(height);

        if (isNaN(parsedWidth))
            throw new TypeError(`width must be a number!`);

        if (isNaN(parsedHeight))
            throw new TypeError(`height must be a number!`);

        return parsedWidth / parsedHeight;
    }

    static calculateDimensions({width, height, aspectRatio}) {
        // Parse aspect ratio if in "16:9" format
        if (typeof aspectRatio === 'string') {
            const [w, h] = aspectRatio.split(':').map(Number);
            aspectRatio = NumberUtilities.getAspectRatio(w, h);
        }

        if (!isFinite(aspectRatio)) {
            throw new Error("Invalid aspect ratio.");
        }

        const parsedWidth = parseFloat(width);
        const parsedHeight = parseFloat(height);

        if (parsedWidth) {
            return {
                parsedWidth,
                height: parsedWidth / aspectRatio
            };
        }

        if (parsedHeight) {
            return {
                width: parsedHeight * aspectRatio,
                parsedHeight
            };
        }

        throw new Error("Either width or height must be provided.");
    }
}