import {isEmptyOrNull} from '../string/index.js';

/**
 *
 * @param {string} tag
 * @param {string} [id]
 * @param {string|string[]} [classes]
 * @param {Object.<string,string>} [attributes]
 */
export const createElement = (tag, {id = "", classes = "", attributes = null} = {}) => {
    const newElement = document.createElement(tag);

    if (id)
        newElement.id = id;

    if (classes)
        if (Array.isArray(classes)) {
            if (classes.length > 0)
                newElement.classList.add(...classes);
        } else if (!isEmptyOrNull(classes))
            newElement.classList.add(...classes.trim().split(/\s+/));

    if (attributes)
        Object.entries(attributes).forEach(
            ([key, value]) => newElement.setAttribute(key, value)
        );

    return newElement;
}