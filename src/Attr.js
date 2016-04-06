import DOMException from './DOMException';

/**
 * This type represents a DOM element's attribute as an object. In most DOM methods, you will probably directly
 * retrieve the attribute as a string (e.g., Element.getAttribute(), but certain functions (e.g.,
 * Element.getAttributeNode()) or means of iterating give Attr types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Attr
 */
export default class Attr {
    constructor(name, value) {
        if (!name) {
            throw new DOMException('INVALID_CHARACTER_ERR');
        }

        this._name = String(name);
        this._value = String(value);
    }

    /**
     * Indicates whether the attribute is an "ID attribute". An "ID attribute" being an attribute which value is
     * expected to be unique across a DOM Document. In HTML DOM, "id" is the only ID attribute, but XML documents
     * could define others. Whether or not an attribute is unique is often determined by a DTD or other schema
     * description.
     *
     * @returns {boolean}
     */
    get isId() {
        return this._name === 'id';
    }

    /**
     * The attribute's name.
     *
     * @returns {string}
     */
    get name() {
        return this._name;
    }

    /**
     * This property always returns true. Originally, it returned true if the attribute was explicitly specified in
     * the source code or by a script, and false if its value came from the default one defined in the document's DTD.
     *
     * @returns {boolean}
     */
    get specified() {
        return true;
    }

    /**
     * The attribute's value.
     *
     * @returns {string}
     */
    get value() {
        return this._value;
    }

    /**
     * @param {string} value
     */
    set value(value) {
        this._value = String(value);
    }
}
