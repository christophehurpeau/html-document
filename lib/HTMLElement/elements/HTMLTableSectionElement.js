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

var _DOMException = require('../../DOMException');

var _DOMException2 = _interopRequireDefault(_DOMException);

/**
 * The HTMLSectionElement interface represents table section (thead, tbody etc.)
 * and inherits all classes and methods of the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLTableSectionElement
 */
/** @class HTMLTableSectionElement */
var HTMLTableSectionElement = (function (_HTMLElement) {
    _inherits(HTMLTableSectionElement, _HTMLElement);

    function HTMLTableSectionElement() {
        _classCallCheck(this, HTMLTableSectionElement);

        _get(Object.getPrototypeOf(HTMLTableSectionElement.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(HTMLTableSectionElement, [{
        key: 'insertRow',

        /**
         * Method creates new &lt;tr&gt; element and adds it to section.
         *
         * @param {number} index
         * @return {HTMLElement}
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @method insertRow 
        * @param [index=undefined] */
        value: function insertRow() {
            var index = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];

            var row = this.ownerDocument.createElement('tr');
            if (index === -1 || index === this.children.length) {
                this.appendChild(row);
            } else if (index < this.children.length) {
                this.insertBefore(row, this.children[index]);
            } else {
                throw new _DOMException2['default']('IndexSizeError');
            }

            return row;
        }

        /**
         * Removes the row at the given position in the section. If the given position is greater (or equal as it starts
         * at zero) than the amount of rows in the section, or is smaller than 0, it raises a DOMException with the
         * IndexSizeError value.
         *
         * @param {number} index
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @method deleteRow 
        * @param index */
    }, {
        key: 'deleteRow',
        value: function deleteRow(index) {
            if (index >= this.children.length || index < 0) {
                throw new _DOMException2['default']('IndexSizeError');
            }

            this.removeChild(this.children[index]);
        }
    }, {
        key: 'align',

        /**
         * Align of element content
         *
         * @type {string}
         * @deprecated
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @member align */
        get: function get() {
            return this.getAttribute('align');
        },

        /**
         * Set align of element
         *
         * @param {string} value
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @param value */
        set: function set(value) {
            if (['left', 'right', 'center'].indexOf(value) !== -1) {
                this.setAttribute('align', value);
            }
        }

        /**
         * Returns a live HTMLCollection containing the rows in the section. The HTMLCollection is live and is automatically
         * updated when rows are added or removed.
         *
         * @todo Update array to HTMLCollection when it's implemented
         * @type {Element[]}
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @member rows */
    }, {
        key: 'rows',
        get: function get() {
            return this.children.filter(function (element) {
                return element.tagName === 'tr';
            });
        }

        /**
         * Is a DOMString containing one single chararcter. This character is the one to align all the cell of a column on.
         * It reflects the char and default to the decimal points associated with the language, e.g. '.' for English, or ','
         * for French. This property was optional and was not very well supported.
         *
         * @type {string}
         * @deprecated
         
        * @memberof HTMLTableSectionElement 
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
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @member chOff */
    }, {
        key: 'chOff',
        get: function get() {
            return 0;
        }

        /**
         * Is a DOMString representing an enumerated value indicating how the content of the cell must be vertically
         * aligned. It reflects the valign attribute and can have one of the following values: "top", "middle", "bottom",
         * or "baseline".
         *
         * @type {string}
         * @deprecated
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @member vAlign */
    }, {
        key: 'vAlign',
        get: function get() {
            return this.getAttribute('valign');
        },

        /**
         * Set align of element
         *
         * @param {string} value
         * @ignore
         
        * @memberof HTMLTableSectionElement 
        * @instance 
        * @param value */
        set: function set(value) {
            if (['top', 'middle', 'bottom', 'baseline'].indexOf(value) !== -1) {
                this.setAttribute('valign', value);
            }
        }
    }]);

    return HTMLTableSectionElement;
})(_HTMLElement3['default']);

exports['default'] = HTMLTableSectionElement;
module.exports = exports['default'];
//# sourceMappingURL=HTMLTableSectionElement.js.map