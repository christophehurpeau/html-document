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

        let htmlElement = this._childNodeFind(node => node.tagName === 'html');

        if (htmlElement !== null) {
            let child;
            while (child = htmlElement.firstChild) {
                this.appendChild(child);
            }

            this.removeChild(htmlElement); // Remove html
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
