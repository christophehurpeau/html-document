import HTMLElement from '../../HTMLElement';
import DOMException from '../../DOMException';

/**
 * &lt;table&gt; element.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLTableElement
 */
export default class HTMLTableElement extends HTMLElement {
    /**
     * Is an {@link HTMLTableCaptionElement} representing the first &lt;caption&gt; that is a child of the element,
     * or null if none is found.
     * When set, if the object doesn't represent a &lt;caption&gt;,
     * a {@link DOMException} with the HierarchyRequestError name is thrown.
     * If a correct object is given, it is inserted in the tree as the first child of this element
     * and the first &lt;caption&gt; that is a child of this element is removed from the tree, if any.
     *
     * @type {HTMLTableCaptionElement|null}
     */
  get caption() {
    return this._childNodeFind(child => child.tagName === 'caption');
  }

    /**
     * @param {HTMLTableCaptionElement|null} element
     * @ignore
     */
  set caption(element) {
    if (element.tagName !== 'caption') {
      throw new DOMException('HierarchyRequestError');
    }

    let previousCaption = this.caption;
    if (previousCaption) {
      this.removeChild(previousCaption);
    }

    if (this.firstChild) {
      this.insertBefore(element, this.firstChild);
    } else {
      this.appendChild(element);
    }
  }

    /**
     * Is an {@link HTMLTableSectionElement} representing the first &lt;thead&gt; that is a child of the element,
     * or null if none is found.
     * When set, if the object doesn't represent a &lt;thead&gt;,
     * a {@link DOMException} with the HierarchyRequestError name is thrown.
     * If a correct object is given, it is inserted in the tree immediately before the first element
     * that is neither a &lt;caption&gt;, nor a &lt;colgroup&gt;, or as the last child if there is no such element,
     * and the first &lt;thead&gt; that is a child of this element is removed from the tree, if any.
     *
     * @type {HTMLTableSectionElement|null}
     */
  get tHead() {
    return this._childNodeFind(child => child.tagName === 'thead');
  }

    /**
     * @ignore
     * @param {HTMLTableSectionElement|null} element
     */
  set tHead(element) {
    if (element.tagName !== 'thead') {
      throw new DOMException('HierarchyRequestError');
    }

    const previousTHead = this.tHead;
    if (previousTHead) {
      this.removeChild(previousTHead);
    }

    if (!this.children.some((child) => {
      if (child.tagName !== 'caption' && child.tagName !== 'colgroup') {
        this.insertBefore(element, child);
        return true;
      }

      return false;
    })) {
      this.appendChild(element);
    }
  }

    /**
     * Is an {@link HTMLTableSectionElement} representing the first &lt;tfoot&gt; that is a child of the element,
     * or null if none is found.
     * When set, if the object doesn't represent a &lt;tfoot&gt;,
     * a {@link DOMException} with the HierarchyRequestError name is thrown.
     * If a correct object is given, it is inserted in the tree immediately before the first element
     * that is neither a &lt;caption&gt;, a &lt;colgroup&gt;, nor a &lt;thead&gt;, or as the last child
     * if there is no such element, and the first &lt;tfoot&gt; that is a child of this element is removed
     * from the tree, if any.
     *
     * @type {HTMLElement|null}
     */
  get tFoot() {
    return this._childNodeFind(child => child.tagName === 'tfoot');
  }

    /**
     * @ignore
     * @param {HTMLElement|null} element
     */
  set tFoot(element) {
    if (element.tagName !== 'tfoot') {
      throw new DOMException('HierarchyRequestError');
    }

    const previousTFoot = this.tFoot;
    if (previousTFoot) {
      this.removeChild(previousTFoot);
    }

    if (!this.children.some((child) => {
      if (child.tagName !== 'caption' && child.tagName !== 'colgroup' && child.tagName !== 'thead') {
        this.insertBefore(element, child);
        return true;
      }

      return false;
    })) {
      this.appendChild(element);
    }
  }

    /**
     * Returns a live {@link HTMLCollection} containing all the rows of the element,
     * that is all &lt;tr&gt; that are a child of the element,
     * or a child or one of its &lt;thead&gt;, &lt;tbody&gt; and &lt;tfoot&gt; children.
     * The rows members of a &lt;thead&gt; appear first, in tree order, and those members of a &lt;tbody&gt; last,
     * also in tree order. The HTMLCollection is live and is automatically updated when the HTMLTableElement changes.
     *
     * @type {HTMLElement[]}
     * @readonly
     */
  get rows() {
    let result = [];
    if (this.tHead !== null) {
      this.tHead.children.forEach((element) => {
        if (element.tagName === 'tr') {
          result.push(element);
        }
      });
    }

    const tBodies = this.tBodies;
    if (tBodies.length !== 0) {
      tBodies.forEach((body) => {
        body.children.forEach((element) => {
          if (element.tagName === 'tr') {
            result.push(element);
          }
        });
      });
    }

    if (this.tFoot !== null) {
      this.tFoot.children.forEach((element) => {
        if (element.tagName === 'tr') {
          result.push(element);
        }
      });
    }

    return result;
  }

    /**
     * Returns a live HTMLCollection containing all the &lt;tbody&gt; of the element. The HTMLCollection is live
     * and is automatically updated when the HTMLTableElement changes.
     *
     * @type {HTMLElement[]}
     * @readonly
     */
  get tBodies() {
    return this.children.filter(element => element.tagName === 'tbody');
  }

    /**
     * Returns an HTMLElement representing the first &lt;thead&gt; that is a child of the element.
     * If none is found, a new one is created and inserted in the tree immediately before the first element
     * that is neither a &lt;caption&gt;, nor a &lt;colgroup&gt;, or as the last child if there is no such element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/createTHead
     * @return {HTMLElement}
     */
  createTHead() {
    let tHead = this.tHead;

    if (tHead !== null) {
      return tHead;
    }

    tHead = this.ownerDocument.createElement('thead');
    this.tHead = tHead;
    return tHead;
  }

    /**
     * Removes the first &lt;thead&gt; that is a child of the element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/deleteTHead
     */
  deleteTHead() {
    let tHead = this.tHead;

    if (tHead !== null) {
      this.removeChild(tHead);
    }
  }

    /**
     * Returns an {@link HTMLElement} representing the first &lt;tfoot&gt; that is a child of the element.
     * If none is found, a new one is created and inserted in the tree immediately before the first element
     * that is neither a &lt;caption&gt;, a &lt;colgroup&gt;, nor a &lt;thead&gt;, or as the last child
     * if there is no such element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/createTFoot
     * @return {HTMLElement}
     */
  createTFoot() {
    let tFoot = this.tFoot;

    if (tFoot !== null) {
      return tFoot;
    }

    tFoot = this.ownerDocument.createElement('tfoot');
    this.tFoot = tFoot;
    return tFoot;
  }

    /**
     * Removes the first &lt;tfoot&gt; that is a child of the element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/deleteTFoot
     */
  deleteTFoot() {
    let tFoot = this.tFoot;

    if (tFoot !== null) {
      this.removeChild(tFoot);
    }
  }

    /**
     * Returns an {@link HTMLElement} representing the first &lt;caption&gt; that is a child of the element.
     * If none is found, a new one is created and inserted in the tree as the first child of the &lt;table&gt; element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/createCaption
     * @return {HTMLElement}
     */
  createCaption() {
    let caption = this.caption;

    if (caption !== null) {
      return caption;
    }

    caption = this.ownerDocument.createElement('caption');
    this.caption = caption;
    return caption;
  }

    /**
     * Removes the first &lt;caption&gt; that is a child of the element.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement/deleteCaption
     */
  deleteCaption() {
    let caption = this.caption;

    if (caption !== null) {
      this.removeChild(caption);
    }
  }

    /**
     * Method creates &lt;tbody&gt; element and puts it in particular place
     *
     * @private
     */
  _createTBody() {
    let tBody = this.ownerDocument.createElement('tbody');
    let tFoot = this.tFoot;

    if (tFoot) {
      this.insertBefore(tBody, tFoot);
    } else {
      this.appendChild(tBody);
    }

    return tBody;
  }

    /**
     * Returns an {@link HTMLElement} representing a new row of the table. It inserts it in the rows collection
     * immediately before the &lt;tr&gt; element at the given index position. If necessary a &lt;tbody&gt; is created.
     * If the index is -1, the new row is appended to the collection. If the index is smaller than -1 or greater than
     * the number of rows in the collection, a {@link DOMException} with the value IndexSizeError is raised.

     *
     * @param {number} [index=-1]
     * @return {HTMLElement}
     */
  insertRow(index = -1) {
    let row = this.ownerDocument.createElement('tr');
    let tBody = null;
    let tBodies = this.tBodies;

    if (tBodies.length === 0) {
      tBody = this._createTBody();
    } else {
      tBody = tBodies[tBodies.length - 1];
    }

    if (index === -1 || index === tBody.length) {
      tBody.appendChild(row);
    } else if (index < tBody.length - 1) {
      tBody.insertBefore(row, tBody.children[index]);
    } else {
      throw new DOMException('IndexSizeError');
    }

    return row;
  }

    /**
     * @inheritdoc
     */
  appendChild(element) {
    if (element.tagName === 'tr') {
      let tBodies = this.tBodies;
      let tBody = null;
      if (tBodies.length === 0) {
        tBody = this._createTBody();
      } else {
        tBody = tBodies[tBodies.length - 1];
      }

      return tBody.appendChild(element);
    }

    return super.appendChild(element);
  }
}

/**
 * @constant {string} HTMLTableElement#nodeName table
 */
Object.defineProperty(HTMLTableElement.prototype, 'nodeName', { value: 'table' });
