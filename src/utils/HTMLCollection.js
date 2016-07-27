/**
 * Class provides interface for HTLMCollection. Used in getElementsByTagName etc.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
 */
export default class HTMLCollection extends Array {
    constructor(parent, selector) {
        super();
        this._parent = parent;
        this._selector = selector;
        this._fillChildren(this._parent);
    }

    _fillChildren(parent) {
        parent.children.forEach(child => {
            if (this._selector(child)) {
                this.push(child);
            }

            if (child.childElementCount > 0) {
                this._fillChildren(child);
            }
        });
    }

    /**
     * Method updates state of collection
     *
     * @private
     */
    _update() {
        this.splice(0, this.length);
        this._fillChildren(this._parent);
    }

    /**
     * Returns the specific node at the given zero-based index into the list. Returns null if the index
     * is out of range.
     *
     * @param {number} index
     * @returns {HTMLElement|null}
     */
    item(index) {
        if (index >= 0 && index < this.length) {
            return this[index];
        }

        return null;
    }
}
