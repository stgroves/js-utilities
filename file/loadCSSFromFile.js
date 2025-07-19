import { convertToURL } from './convertToURL.js';

export const loadCSSFromFile = (filePath) => {
    return fetch(convertToURL(filePath))
        .then(res => res.text())
        .then(css => new CSSStyleSheet().replace(css))
        .catch(error => console.error('Error loading CSS:', error));
}