import HTMLElement from '../HTMLElement';

/**
 * Class provide processing for innerHTML function for Document.documentElement
 * element. When this element property innerHTML changes, it also updates links
 * for head, body elements in document.
 */
export default class DocumentElementHelper extends HTMLElement {
    /**
     * Sets inner HTML for element.
     *
     * @param {string} value
     */
    set innerHTML(value) {
        super.innerHTML = value;
        this.ownerDocument.head = this._childNodesRecursiveFind(child => child.tagName === 'head');
        this.ownerDocument.body = this._childNodesRecursiveFind(child => child.tagName === 'body');
    }
}

/**
 * @constant {string} DocumentElementHelper#nodeName html
 */
Object.defineProperty(DocumentElementHelper.prototype, 'nodeName', { value: 'html' });
