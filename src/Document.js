import Node from './Node';
import ParentNode from './ParentNode';
import Comment from './Comment';
import DocumentFragment from './DocumentFragment';
import HTMLElement from './HTMLElement';
import Text from './Text';
import Url from './utils/Url';

// HTML Elements
import HTMLDocumentElement from './HTMLElement/elements/HTMLDocumentElement';
import HTMLOptionElement from './HTMLElement/elements/HTMLOptionElement';
import HTMLSelectElement from './HTMLElement/elements/HTMLSelectElement';
import HTMLTableCaptionElement from './HTMLElement/elements/HTMLTableCaptionElement';
import HTMLMetaElement from './HTMLElement/elements/HTMLMetaElement';
import HTMLTableElement from './HTMLElement/elements/HTMLTableElement';
import HTMLTableRowElement from './HTMLElement/elements/HTMLTableRowElement';
import HTMLTableSectionElement from './HTMLElement/elements/HTMLTableSectionElement';
import HTMLAnchorElement from './HTMLElement/elements/HTMLAnchorElement';

const elementClasses = new Map([
    ['html', HTMLDocumentElement],
    ['caption', HTMLTableCaptionElement],
    ['meta', HTMLMetaElement],
    ['option', HTMLOptionElement],
    ['table', HTMLTableElement],
    ['thead', HTMLTableSectionElement],
    ['tfoot', HTMLTableSectionElement],
    ['tfoot', HTMLTableSectionElement],
    ['tr', HTMLTableRowElement],
    ['select', HTMLSelectElement],
    ['a', HTMLAnchorElement],
]);

/**
 * @see https://developer.mozilla.org/en/docs/Web/API/Document
 */
export default class Document extends ParentNode {
    constructor() {
        super();
        /**
         * @type {HTMLElement}
         */
        this._documentElement = this.createElement('html');
        this.appendChild(this._documentElement);

        this._location = new Url('about:blank');
        this._ownerDocument = this;
    }

    /**
     * Creates a new {@link Comment}.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createComment
     *
     * @param {string} data
     * @return {Comment}
    */
    createComment(data) {
        let comment = new Comment(data);
        comment._ownerDocument = this;
        return comment;
    }

    /**
     * Creates a new empty {@link DocumentFragment}.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createDocumentFragment
     *
     * @return {DocumentFragment}
    */
    createDocumentFragment() {
        let fragment = new DocumentFragment();
        fragment._ownerDocument = this;
        return fragment;
    }

    /**
     * Creates a new element with the given tag name.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createElement
     *
     * @param {string} name
     * @return {HTMLElement}
    */
    createElement(name) {
        name = name.toLowerCase();
        const ElementClass = elementClasses.get(name) || HTMLElement;
        let element = new ElementClass();

        element._ownerDocument = this;

        if (!element.nodeName) {
            element.nodeName = name;
        }

        return element;
    }

    /**
     * Creates a text node.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createTextNode
     *
     * @param {string} textContent
     * @return {Text}
    */
    createTextNode(textContent) {
        let text = new Text(textContent);
        text._ownerDocument = this;
        return text;
    }

    /**
     * Returns a reference to the element by its ID.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementById
     *
     * @param {string} id case-sensitive string representing the unique ID of the element being sought
     * @return {Element} reference to an Element, or null if an element with the specified ID is not in the document.
     */
    getElementById(id) {
        return this.documentElement.getElementById(id);
    }

    /**
     * Returns an HTMLCollection of elements with the given tag name.
     * The complete document is searched, including the root node.
     * The returned HTMLCollection is live, meaning that it updates itself automatically to stay in sync
     * with the DOM treewithout having to call document.getElementsByTagName() again.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementsByTagName
     *
     * @param {string} tagName
     * @return {HTMLCollection}
     */
    getElementsByTagName(tagName) {
        return this.documentElement.getElementsByTagName(tagName);
    }

    getElementsByClassName(className) {
        return this.documentElement.getElementsByClassName(className);
    }

    /**
     * Returns the first element within the document (using depth-first pre-order traversal of the document's nodes|by
     * first element in document markup and iterating through sequential nodes by order of amount of child nodes)
     * that matches the specified group of selectors.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
     *
     * @param {string} selector
     * @return {Element}
     */
    querySelector(selector) {
        return this.documentElement.querySelector(selector);
    }

    /**
     * Returns a list of the elements within the document (using depth-first pre-order traversal of the document's
     * nodes) that match the specified group of selectors. The object returned is a NodeList.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
     *
     * @param {string} selector
     * @return {NodeList}
     */
    querySelectorAll(selector) {
        return this.documentElement.querySelectorAll(selector);
    }

    /**
     * textContent returns null if the element is a document, a document type, or a notation.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
     */
    get textContent() {
        return null;
    }

    get documentElement() {
        return this._documentElement;
    }

    get head() {
        let head = this._documentElement._childNodeFind(node => node.tagName === 'head');
        if (!head) {
            head = this.createElement('head');
            this._documentElement.insertBefore(head, this.body);
        }

        return head;
    }

    get body() {
        let body = this._documentElement._childNodeFind(node => node.tagName === 'body');
        if (!body) {
            body = this.createElement('body');
            this._documentElement.appendChild(body);
        }

        return body;
    }

    set body(body) {
        let current = this._documentElement.getElementsByTagName('body').shift();
        if (current) {
            this._documentElement.replaceChild(body, current);
        } else {
            this._documentElement.appendChild(body);
        }
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location.href = value;
    }

    /**
     * @param {Node} child
     * @return {Node}
     */
    appendChild(child) {
        child = super.appendChild(child);
        if (child.nodeName === 'html') {
            this._documentElement = child;
        }

        return child;
    }
}

/**
 * @constant {number} Comment#nodeType
 */
Object.defineProperty(Document.prototype, 'nodeType', { value: Node.DOCUMENT_NODE });
