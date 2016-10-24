import HTMLElement from '../../HTMLElement';

export default class HTMLTableRowElement extends HTMLElement {
  constructor() {
    super();
  }

    /**
     * Returns a live HTMLCollection containing the cells in the row. The HTMLCollection is live and is automatically
     * updated when rows are added or removed.
     *
     * @todo Update array to HTMLCollection when it's implemented
     * @type {Element[]} HTMLTableRowElement#cells
     */
  get cells() {
    return this._childNodeFind(child => child.tagName === 'td');
  }

    /**
     * Is a DOMString containing one single character. This character is the one to align all the cell of a column on.
     * It reflects the char and default to the decimal points associated with the language, e.g. '.' for English, or ','
     * for French. This property was optional and was not very well supported.
     *
     * @type {string}
     * @deprecated
     */
  get ch() {
    return '.';
  }

    /**
     * Is a DOMString containing a integer indicating how many characters must be left at the right (for left-to-right
     * scripts; or at the left for right-to-left scripts) of the character defined by HTMLTableRowElement.ch. This
     * property was optional and was not very well supported.
     *
     * @type {number}
     * @deprecated
     */
  get chOff() {
    return 0;
  }

    /**
     * Set align of element
     *
     * @param {string} value
     * @deprecated
     */
  set vAlign(value) {
    if (['top', 'middle', 'bottom', 'baseline'].indexOf(value) !== -1) {
      this.setAttribute('valign', value);
    }
  }

    /**
     * Is a DOMString representing an enumerated value indicating how the content of the cell must be vertically
     * aligned. It reflects the valign attribute and can have one of the following values: "top", "middle", "bottom",
     * or "baseline".
     *
     * @type {string}
     * @deprecated
     */
  get vAlign() {
    return this.getAttribute('valign');
  }

    /**
     * Is a DOMString containing an enumerated value reflecting the align attribute. It indicates the alignment of the
     * element's contents with respect to the surrounding context. The possible values are "left", "right", and
     * "center".
     *
     * @type {string}
     * @deprecated
     */
  get align() {
    return this.getAttribute('align');
  }

    /**
     * Set align of element
     *
     * @param {string} value
     */
  set align(value) {
    if (['left', 'right', 'center'].indexOf(value) !== 1) {
      this.setAttribute('align', value);
    }
  }

    /**
     * Returns a long value which gives the logical position of the row within the table section it belongs to.
     * If the row is not part of a section, returns -1.
     *
     * @return {number}
     */
  get sectionRowIndex() {
    if (this.parentNode === null) {
      return -1;
    }

    return this.parentNode.rows.indexOf(this);
  }

    /**
     * Returns a long value which gives the logical position of the row within the entire table. If the row is not part
     * of a table, returns -1.
     *
     * @type {number}
     */
  get rowIndex() {
    if (this.parentNode === null) {
      return -1;
    }

    if (this.parentNode.parentNode === null) {
      return -1;
    }

    let inSection = this.sectionRowIndex;
    let section = this.parentNode;
    let table = this.parentNode.parentNode;
    let index = 0;
    if (section.nodeName === 'thead') {
      return inSection;
    }

    if (table.tHead !== null) {
      index += table.tHead.rows.length;
    }

    const tBodies = table.tBodies;
    if (tBodies.length !== 0) {
      let found = false;
      table.tBodies.every((tbody) => {
        if (tbody === section) {
          found = true;
          return false;
        }

        index += tbody.rows.length;
      });
      if (found) {
        return index + inSection;
      }
    }

    if (section.nodeName === 'tfoot') {
      return index + inSection;
    }

    return -1;
  }

    /**
     * Method creates new &lt;td&gt; element and adds it to row.
     *
     * @param {number} index
     * @return {HTMLElement}
     */
  insertCell(index = -1) {
    let row = this.ownerDocument.createElement('td');
    if (index === -1 || index === this.children.length) {
      this.appendChild(row);
    } else if (index < this.children.length - 1) {
      this.insertBefore(row, this.children[index]);
    } else {
      throw new DOMException('IndexSizeError');
    }

    return row;
  }

    /**
     * Removes the cell at the given position in the section. If the given position is greater (or equal as it starts
     * at zero) than the amount of rows in the section, or is smaller than 0, it raises a DOMException with the
     * IndexSizeError value.
     *
     * @param {number} index
     */
  deleteCell(index) {
    if (index >= this.children.length || index < 0) {
      throw new DOMException('IndexSizeError');
    }

    this.removeChild(this.children[index]);
  }
}

/**
 * @constant {string} HTMLTableElement#nodeName table
 */
Object.defineProperty(HTMLTableRowElement.prototype, 'nodeName', { value: 'tr' });
