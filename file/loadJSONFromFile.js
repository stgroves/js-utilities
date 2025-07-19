import { convertToURL } from './convertToURL.js';

export const loadJSONFromFile = (filePath) => {
    return fetch(convertToURL(filePath))
        .then(response => response.json())
        .then(data => data) // Handle the JSON object here
        .catch(error => console.error('Error loading JSON:', error));
}