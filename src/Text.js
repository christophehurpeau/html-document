import escapeHTML from './utils/escapeHTML';
import Node from './Node';

/**
* @see https://developer.mozilla.org/en/docs/Web/API/Text
*/
export default class Text extends Node {
    /**
     * @param {string} textContent
     */
  constructor(textContent) {
    super();
    this.value = textContent;
  }

  _toHTML() {
    return escapeHTML(this.value);
  }

    /**
     * @return {string}
     */
  get textContent() {
    return this.value;
  }

    /**
     * @param {string} textContent
     */
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
