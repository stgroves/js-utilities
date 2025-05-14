export default class Utilities {
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

    static parseNumber(value) {
        const parsed = parseFloat(value);

        if (isNaN(parsed))
            throw new TypeError(`value must be a number.`);

        return parsed;
    }

    static getAspectRatio(width, height) {
        const WIDTH = parseFloat(width);
        const HEIGHT = parseFloat(height);

        if (isNaN(WIDTH))
            throw new TypeError(`width must be a number!`);

        if (isNaN(HEIGHT))
            throw new TypeError(`height must be a number!`);

        return width / height;
    }

    static calculateDimensions({width, height, aspectRatio}) {
        // Parse aspect ratio if in "16:9" format
        if (typeof aspectRatio === 'string') {
            const [w, h] = aspectRatio.split(':').map(Number);
            aspectRatio = this.getAspectRatio(w, h);
        }

        if (!isFinite(aspectRatio)) {
            throw new Error("Invalid aspect ratio.");
        }

        if (typeof width === 'number') {
            return {
                width,
                height: width / aspectRatio
            };
        }

        if (typeof height === 'number') {
            return {
                width: height * aspectRatio,
                height
            };
        }

        throw new Error("Either width or height must be provided.");
    }

    static loadCSSFromFile(filePath) {
        return fetch(Utilities.convertToURL(filePath))
            .then(res => res.text())
            .then(css => new CSSStyleSheet().replace(css))
            .catch(error => console.error('Error loading CSS:', error));
    }

    static loadJSONFromFile(filePath) {
        return fetch(Utilities.convertToURL(filePath))
            .then(response => response.json())
            .then(data => data) // Handle the JSON object here
            .catch(error => console.error('Error loading JSON:', error));
    }

    static convertToURL(path, source = import.meta.url) {
        if (Utilities.isAbsoluteURL(path))
            return path;

        return new URL(path, source);
    }

    static isAbsoluteURL(path) {
        return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path);
    }
}