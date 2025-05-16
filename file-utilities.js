export default class FileUtilities {
    static loadCSSFromFile(filePath) {
        return fetch(FileUtilities.convertToURL(filePath))
            .then(res => res.text())
            .then(css => new CSSStyleSheet().replace(css))
            .catch(error => console.error('Error loading CSS:', error));
    }

    static loadJSONFromFile(filePath) {
        return fetch(FileUtilities.convertToURL(filePath))
            .then(response => response.json())
            .then(data => data) // Handle the JSON object here
            .catch(error => console.error('Error loading JSON:', error));
    }

    static convertToURL(path, source = import.meta.url) {
        if (path instanceof URL)
            return path;

        if (FileUtilities.isAbsoluteURL(path))
            return path;

        return new URL(path, source);
    }

    static isAbsoluteURL(path) {
        return /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path);
    }
}