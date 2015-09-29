import escapeHTML from './utils/escapeHTML';
import Node from './Node';

/**
* @see https://developer.mozilla.org/en/docs/Web/API/Text
* @class Text
* @extends Node
* @param {String} textContent
* @property {String} textContent
*/
export default class Text extends Node {
    constructor(textContent) {
        super();
        this.value = textContent;
    }

    _toHTML() {
        return escapeHTML(this.value);
    }

    get textContent() {
        return this.value;
    }

    set textContent(textContent) {
        this.value = textContent;
    }

    get nodeValue() {
        return this.textContent;
    }

    set nodeValue(value) {
        this.textContent = value;
    }
}

/**
 * @constant {number} Comment#nodeType
 */
Object.defineProperty(Text.prototype, 'nodeType', { value: Node.TEXT_NODE });

/**
 * @constant {string} Comment#nodeName
 */
Object.defineProperty(Text.prototype, 'nodeName', { value: '#text' });
