'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _HTMLElement2 = require('../../HTMLElement');

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

/** @class HTMLTableRowElement */
var HTMLTableRowElement = (function (_HTMLElement) {
    _inherits(HTMLTableRowElement, _HTMLElement);

    function HTMLTableRowElement() {
        _classCallCheck(this, HTMLTableRowElement);

        _get(Object.getPrototypeOf(HTMLTableRowElement.prototype), 'constructor', this).call(this);
    }

    /**
     * @constant {string} HTMLTableElement#nodeName table
     */

    /**
     * Returns a live HTMLCollection containing the cells in the row. The HTMLCollection is live and is automatically
     * updated when rows are added or removed.
     *
     * @todo Update array to HTMLCollection when it's implemented
     * @type {Element[]} HTMLTableRowElement#cells
     
    * @memberof HTMLTableRowElement 
    * @instance 
    * @member cells */

    _createClass(HTMLTableRowElement, [{
        key: 'insertCell',

        /**
         * Method creates new &lt;td&gt; element and adds it to row.
         *
         * @param {number} index
         * @return {HTMLElement}
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @method insertCell 
        * @param [index=undefined] */
        value: function insertCell() {
            var index = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

            var row = this.ownerDocument.createElement('td');
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
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @method deleteCell 
        * @param index */
    }, {
        key: 'deleteCell',
        value: function deleteCell(index) {
            if (index >= this.children.length || index < 0) {
                throw new DOMException('IndexSizeError');
            }

            this.removeChild(this.children[index]);
        }
    }, {
        key: 'cells',
        get: function get() {
            return this.children.filter(function (element) {
                return element.tagName === 'td';
            });
        }

        /**
         * Is a DOMString containing one single character. This character is the one to align all the cell of a column on.
         * It reflects the char and default to the decimal points associated with the language, e.g. '.' for English, or ','
         * for French. This property was optional and was not very well supported.
         *
         * @type {string}
         * @deprecated
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @member ch */
    }, {
        key: 'ch',
        get: function get() {
            return '.';
        }

        /**
         * Is a DOMString containing a integer indicating how many characters must be left at the right (for left-to-right
         * scripts; or at the left for right-to-left scripts) of the character defined by HTMLTableRowElement.ch. This
         * property was optional and was not very well supported.
         *
         * @type {number}
         * @deprecated
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @member chOff */
    }, {
        key: 'chOff',
        get: function get() {
            return 0;
        }

        /**
         * Set align of element
         *
         * @param {string} value
         * @deprecated
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @param value */
    }, {
        key: 'vAlign',
        set: function set(value) {
            if (['top', 'middle', 'bottom', 'baseline'].indexOf(value) !== -1) {
                this.setAttribute('valign', value);
            }
        },

        /**
         * Is a DOMString representing an enumerated value indicating how the content of the cell must be vertically
         * aligned. It reflects the valign attribute and can have one of the following values: "top", "middle", "bottom",
         * or "baseline".
         *
         * @type {string}
         * @deprecated
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @member vAlign */
        get: function get() {
            return this.getAttribute('valign');
        }

        /**
         * Is a DOMString containing an enumerated value reflecting the align attribute. It indicates the alignment of the
         * element's contents with respect to the surrounding context. The possible values are "left", "right", and
         * "center".
         *
         * @type {string}
         * @deprecated
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @member align */
    }, {
        key: 'align',
        get: function get() {
            return this.getAttribute('align');
        },

        /**
         * Set align of element
         *
         * @param {string} value
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @param value */
        set: function set(value) {
            if (['left', 'right', 'center'].indexOf(value) !== 1) {
                this.setAttribute('align', value);
            }
        }

        /**
         * Returns a long value which gives the logical position of the row within the table section it belongs to.
         * If the row is not part of a section, returns -1.
         *
         * @return {number}
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @member sectionRowIndex */
    }, {
        key: 'sectionRowIndex',
        get: function get() {
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
         
        * @memberof HTMLTableRowElement 
        * @instance 
        * @member rowIndex */
    }, {
        key: 'rowIndex',
        get: function get() {
            if (this.parentNode === null) {
                return -1;
            }

            if (this.parentNode.parentNode === null) {
                return -1;
            }

            var inSection = this.sectionRowIndex;
            var section = this.parentNode;
            var table = this.parentNode.parentNode;
            var index = 0;
            if (section.nodeName === 'thead') {
                return inSection;
            }

            if (table.tHead !== null) {
                index += table.tHead.rows.length;
            }

            var tBodies = table.tBodies;
            if (tBodies.length !== 0) {
                var found = false;
                table.tBodies.every(function (tbody) {
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
    }]);

    return HTMLTableRowElement;
})(_HTMLElement3['default']);

exports['default'] = HTMLTableRowElement;
Object.defineProperty(HTMLTableRowElement.prototype, 'nodeName', { value: 'tr' });
module.exports = exports['default'];
//# sourceMappingURL=HTMLTableRowElement.js.map