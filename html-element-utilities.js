export default class HTMLElementUtilities {
    /**
     *
     * @param {string} tag
     * @param {string} [id]
     * @param {string|string[]} [classes]
     * @param {Object.<string,string>} [attributes]
     */
    static createElement(
        tag,
        {
            id = "",
            classes = "",
            attributes = null
        }
    ) {
        const newElement = document.createElement(tag);

        if (id)
            newElement.id = id;

        if (classes) {
            if (Array.isArray(classes)) {
                if (classes.length > 0)
                    newElement.classList.add(classes);
            } else {
                newElement.classList.add(classes.split(' '));
            }
        }

        if (attributes)
            Object.entries(attributes).forEach(
                ([key, value]) => newElement.setAttribute(key, value)
            );

        return newElement;
    }
}