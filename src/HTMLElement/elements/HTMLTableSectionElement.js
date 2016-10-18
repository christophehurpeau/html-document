import HTMLElement from '../../HTMLElement';
import DOMException from '../../DOMException';

/**
 * The HTMLSectionElement interface represents table section (thead, tbody etc.)
 * and inherits all classes and methods of the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLTableSectionElement
 */
export default class HTMLTableSectionElement extends HTMLElement {
    /**
     * Align of element content
     *
     * @type {string}
     * @deprecated
     */
    get align() {
        return this.getAttribute('align');
    }

    /**
     * Set align of element
     *
     * @param {string} value
     */
    set align(value) {
        if (['left', 'right', 'center'].indexOf(value) !== -1) {
            this.setAttribute('align', value);
        }
    }

    /**
     * Returns a live HTMLCollection containing the rows in the section. The HTMLCollection is live and is automatically
     * updated when rows are added or removed.
     *
     * @todo Update array to HTMLCollection when it's implemented
     * @type {Element[]}
     */
    get rows() {
        return this.children.filter(element => element.tagName === 'tr');
    }

    /**
     * Is a DOMString containing one single chararcter. This character is the one to align all the cell of a column on.
     * It reflects the char and default to the decimal points associated with the language, e.g. '.' for English, or ','
     * for French. This property was optional and was not very well supported.
     *
     * @type {string}
     * @deprecated
     */
    get ch() {
        return '.';
    }

    /**
     * Is a DOMString containing a integer indicating how many characters must be left at the right (for left-to-right
     * scripts; or at the left for right-to-left scripts) of the character defined by HTMLTableRowElement.ch. This
     * property was optional and was not very well supported.
     *
     * @type {number}
     */
    get chOff() {
        return 0;
    }

    /**
     * Is a DOMString representing an enumerated value indicating how the content of the cell must be vertically
     * aligned. It reflects the valign attribute and can have one of the following values: "top", "middle", "bottom",
     * or "baseline".
     *
     * @type {string}
     * @deprecated
     */
    get vAlign() {
        return this.getAttribute('valign');
    }

    /**
     * Set align of element
     *
     * @param {string} value
     * @ignore
     */
    set vAlign(value) {
        if (['top', 'middle', 'bottom', 'baseline'].indexOf(value) !== -1) {
            this.setAttribute('valign', value);
        }
    }

    /**
     * Method creates new &lt;tr&gt; element and adds it to section.
     *
     * @param {number} index
     * @return {HTMLElement}
     */
    insertRow(index = -1) {
        let row = this.ownerDocument.createElement('tr');
        if (index === -1 || index === this.children.length) {
            this.appendChild(row);
        } else if (index < this.children.length - 1) {
            this.insertBefore(row, this.children[index]);
        } else {
            throw new DOMException('IndexSizeError');
        }

        return row;
    }

    /**
     * Removes the row at the given position in the section. If the given position is greater (or equal as it starts
     * at zero) than the amount of rows in the section, or is smaller than 0, it raises a DOMException with the
     * IndexSizeError value.
     *
     * @param {number} index
     */
    deleteRow(index) {
        if (index >= this.children.length || index < 0) {
            throw new DOMException('IndexSizeError');
        }

        this.removeChild(this.children[index]);
    }
}
