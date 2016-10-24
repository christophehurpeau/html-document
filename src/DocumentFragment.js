import Node from './Node';
import ParentNode from './ParentNode';

/**
 * The DocumentFragment interface represents a minimal document object that has no parent. It is used as
 * a light-weight version of Document to store well-formed or potentially non-well-formed fragments of XML.
 *
  * @see https://developer.mozilla.org/en/docs/Web/API/DocumentFragment
 */
export default class DocumentFragment extends ParentNode {
    /**
     * @inheritdoc
     */
  get outerHTML() {
    return this.innerHTML;
  }
}

/**
 * @constant {number} Comment#nodeType
 */
Object.defineProperty(DocumentFragment.prototype, 'nodeType', { value: Node.DOCUMENT_FRAGMENT_NODE });
