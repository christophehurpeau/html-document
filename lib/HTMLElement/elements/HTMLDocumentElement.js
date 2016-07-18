'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _set = require('babel-runtime/helpers/set')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _HTMLElement2 = require('../../HTMLElement');

var _HTMLElement3 = _interopRequireDefault(_HTMLElement2);

/**
 * The HTMLDocumentElement interface contains descriptive metadata about a documentElement. It inherits all of the
 * properties and methods described in the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
 */
/** @class HTMLDocumentElement */
var HTMLDocumentElement = (function (_HTMLElement) {
    _inherits(HTMLDocumentElement, _HTMLElement);

    function HTMLDocumentElement() {
        _classCallCheck(this, HTMLDocumentElement);

        _get(Object.getPrototypeOf(HTMLDocumentElement.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * @constant {string} HTMLDocumentElement#nodeName meta
     */

    _createClass(HTMLDocumentElement, [{
        key: 'innerHTML',

        /**
         * Sets inner HTML and moves elements up if first created child is html.
         *
         * @ignore
         * @param {string} value
         
        * @memberof HTMLDocumentElement 
        * @instance 
        * @param value */
        set: function set(value) {
            _set(Object.getPrototypeOf(HTMLDocumentElement.prototype), 'innerHTML', value, this);

            var htmlElement = this._childNodeFind(function (node) {
                return node.tagName === 'html';
            });

            if (htmlElement !== null) {
                var child = undefined;
                while (child = htmlElement.firstChild) {
                    this.appendChild(child);
                }

                this.removeChild(htmlElement); // Remove html
            }
        },

        /**
         * @ignore
         * @type {string}
         
        * @memberof HTMLDocumentElement 
        * @instance 
        * @member innerHTML */
        get: function get() {
            return _get(Object.getPrototypeOf(HTMLDocumentElement.prototype), 'innerHTML', this);
        }
    }]);

    return HTMLDocumentElement;
})(_HTMLElement3['default']);

exports['default'] = HTMLDocumentElement;
Object.defineProperty(HTMLDocumentElement.prototype, 'nodeName', { value: 'html' });
module.exports = exports['default'];
//# sourceMappingURL=HTMLDocumentElement.js.map