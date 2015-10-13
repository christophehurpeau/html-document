import HTMLElement from '../../HTMLElement';

/**
 * The HTMLDocumentElement interface contains descriptive metadata about a documentElement. It inherits all of the
 * properties and methods described in the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
 */
export default class HTMLDocumentElement extends HTMLElement {
    /**
     * Sets inner HTML and moves elements up if first created child is html.
     *
     * @ignore
     * @param {string} value
     */
    set innerHTML(value) {
        super.innerHTML = value;

        if (this.childNodes.length === 1 && this.firstChild.tagName === 'html') {
            let child;
            while (child = this.firstChild.firstChild) {
                this.appendChild(child);
            }

            this.removeChild(this.firstChild); // Remove html
        }
    }

    /**
     * @ignore
     * @type {string}
     */
    get innerHTML() {
        return super.innerHTML;
    }
}

/**
 * @constant {string} HTMLDocumentElement#nodeName meta
 */
Object.defineProperty(HTMLDocumentElement.prototype, 'nodeName', { value: 'html' });
