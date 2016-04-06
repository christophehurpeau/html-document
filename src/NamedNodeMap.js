import Attr from './Attr';
import DOMException from './DOMException';

/**
 * The NamedNodeMap interface represents a collection of Attr objects. Objects inside a NamedNodeMap are not in any
 * particular order, unlike NodeList, although they may be accessed by an index as in an array.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap
 */

export default class NamedNodeMap {
    constructor() {
        this._data = new Map();
        this._index = [];
    }

    /**
     * Returns the amount of objects in the map.
     *
     * @returns {number}
     */
    get length() {
        return this._data.size;
    }

    /**
     * Replaces, or adds, the Attr identified in the map by the given name.
     *
     * @param {Attr} attr
     * @returns {Attr|null}
     */
    setNamedItem(attr) {
        if (!(attr instanceof Attr)) {
            throw new DOMException('NOT_ATTR');
        }

        let result = null;

        if (this._data.has(attr.name)) {
            result = this._data.get(attr.name);
            this._index.splice(this._index.indexOf(attr.name), 1);
        }

        this._data.set(attr.name, attr);
        this._index.push(attr.name);

        return result;
    }

    /**
     * Returns a Attr, corresponding to the given name.
     *
     * @param {string} name
     * @returns {Attr|null}
     */
    getNamedItem(name) {
        if (this._data.has(name)) {
            return this._data.get(name);
        }

        return null;
    }

    /**
     * Removes the Attr identified by the given map.
     *
     * @param {string} name
     * @returns {Attr|null}
     */
    removeNamedItem(name) {
        let result = null;
        if (this._data.has(name)) {
            result = this._data.get(name);
            this._data.delete(name);
            this._index.splice(this._index.indexOf(name), 1);
        }

        return result;
    }

    /**
     * Returns the Attr at the given index, or null if the index is higher or equal to the number of nodes.
     *
     * @param {number} index
     * @returns {Attr|null}
     */
    item(index) {
        if (index > -1 && index < this._index.length) {
            return this._data.get(this._index[index]);
        }

        return null;
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => ({ value: this.item(index++), done: index > this.length }),
        };
    }
}
