/**
 * NodeList objects are collections of nodes
 * such as those returned by Node.childNodes and the document.querySelectorAll method..
 *
  * @see https://developer.mozilla.org/en/docs/Web/API/NodeList
 */
export default class NodeList {
  constructor() {
        /**
         * @property {number} length length of the list
         */
    this.length = 0;
  }

    /**
     * @param {number} index
     * @return {Node|null}
     */
  item(index) {
    return this[index] || null;
  }

  _push() {
    Array.prototype.push.call(this, ...arguments);
  }

  [Symbol.iterator]() {
    let index = 0;

    return {
      next: () => ({ value: this[index++], done: index > this.length }),
    };
  }
}
