import escapeHTML from './utils/escapeHTML';
import Node from './Node';

/**
 * @see https://developer.mozilla.org/en/docs/Web/API/Comment
 */
export default class Comment extends Node {
    /**
     * @param {string} comment
     */
  constructor(comment) {
    super();
    this._value = comment;
  }

    /**
     * @inheritdoc
     */
  get innerHTML() {
    return '';
  }

    /**
     * @inheritdoc
     */
  get outerHTML() {
    return `<!--${escapeHTML(this._value)}-->`;
  }

    /**
     * Comment's value
     *
     * @type {string}
     */
  get data() {
    return this._value;
  }

    /**
     * @param {string} data
     */
  set data(data) {
    this._value = data;
  }
}

/**
 * @constant {number} Comment#nodeType
 */
Object.defineProperty(Comment.prototype, 'nodeType', { value: Node.COMMENT_NODE });

/**
 * @constant {string} Comment#nodeName
 */
Object.defineProperty(Comment.prototype, 'nodeName', { value: '#comment' });
