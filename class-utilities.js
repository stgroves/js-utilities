/**
 * Provides functions to simulate class behaviour similar to C#.
 */
class ClassExtension {
    /** @typedef {{getItem: function, hasItem: function, setItem: function}} ProtectedObject */
    /**
     * Creates a new ProtectedObject.
     * @returns
     */
    static #ProtectedObject() {
        const TAG = {
            VALUE: 0,
            FUNCTION: 1,
        };

        const items = {};

        /**
         * Checks if the provided ID exists.
         * @param {string} id The ID of the value to be checked.
         * @return {boolean}
         */
        function hasItem(id) {
            return Object.prototype.hasOwnProperty.call(items, id);
        }

        /**
         * Gets the value associated with the provided ID.
         * @param {string} id The ID of the value to be retrieved.
         * @return {any} The stored value or a ProtectedObjectIterator if the value is a function.
         */
        function getItem(id) {
            if (!Object.prototype.hasOwnProperty.call(items, id)) throw new Error(`Unable to find ${id}!`);

            const target = items[id];

            let idx = -1;

            switch (target.tag) {
                case TAG.VALUE:
                    return target.value;

                case TAG.FUNCTION:
                    return {
                        /** @typedef {Object} */
                        /**
                         *
                         * @param  {...any} params
                         * @returns
                         */
                        next(...params) {
                            idx++;

                            return {
                                value: target.value[idx] === undefined ? idx : target.value[idx].apply(null, [this, params].flat()),
                                done: idx >= target.value.length,
                            };
                        },
                    };
                default:
            }

            return items[id];
        }

        /**
         * Sets the value and associates it with the given ID.
         * @param {string} id
         * @param {any} value
         * @param {boolean} retainPrevious
         * @return {ProtectedObject} The updated ProtectedObject.
         */
        function setItem(id, value, retainPrevious = true) {
            if (typeof value !== 'function') {
                items[id] = {
                    tag: TAG.VALUE,
                    value,
                };

                return this;
            }

            if (!Object.prototype.hasOwnProperty.call(items, id) || !retainPrevious) {
                items[id] = {
                    tag: TAG.FUNCTION,
                    value: [value],
                };
            } else {
                items[id].value.splice(0, 0, value);
            }

            return this;
        }

        return {
            setItem,
            getItem,
            hasItem,
            items
        };
    }

    /**
     * Creates a new ProtectedObject.
     * @static
     * @return {ProtectedObject}
     * @memberof ClassExtension
     */
    static createProtectedObject() {
        return ClassExtension.#ProtectedObject();
    }

    /**
     * Ensure class isn't inherited by normal means
     * @static
     * @param {Object} target Should be ```new.target```
     * @param {Object} type Class to evaluate against
     * @memberof ClassExtension
     */
    static enforceFinalClass(target, type) {
        if (target !== type) throw new Error(`${type.name} is a final class! It cannot be inherited from!`);
    }

    /**
     * Ensure abstract class isn't instantiated by normal means
     * @static
     * @param {Object} target Should be ```new.target```
     * @param {Object} type Class to evaluate against
     * @memberof ClassExtension
     */
    static enforceAbstractClass(target, type) {
        if (target === type) throw new Error(`${type.name} is an abstract class! It cannot be constructed!`);
    }

    /**
     * Ensure abstract function isn't called
     * @static
     * @param {Function} method Function being called
     * @param {Object} type Class function is being called from
     * @memberof ClassExtension
     */
    static enforceAbstractMethod(method, type) {
        throw new Error(`${method.name} is an abstract method! It cannot be called from ${type.name}!`);
    }

    /**
     * Ensure a protected object stays in object
     * @static
     * @param {*} target Should be ```new.target```
     * @param {*} type Class to evaluate against
     * @param {Object} reference Object to be passed to parent classes
     * @return {ProtectedObject} Returns a new ProtectedObject if the target and type match, else it returns the referenced object
     * @memberof ClassExtension
     */
    static enforceProtectedObject(target, type, reference) {
        reference = reference || {};
        return target === type ? this.createProtectedObject() : reference;
    }

    static enforceParameterType(target, type) {
        if (!(target instanceof type))
            throw new Error(`${target.constructor.name} is not an instance of ${type.name}!`);
    }
}