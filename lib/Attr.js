'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _DOMException = require('./DOMException');

var _DOMException2 = _interopRequireDefault(_DOMException);

/**
 * This type represents a DOM element's attribute as an object. In most DOM methods, you will probably directly
 * retrieve the attribute as a string (e.g., Element.getAttribute(), but certain functions (e.g.,
 * Element.getAttributeNode()) or means of iterating give Attr types.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Attr
 */
/** @class Attr 
* @param name 
* @param value */
var Attr = (function () {
    function Attr(name, value) {
        _classCallCheck(this, Attr);

        if (!name) {
            throw new _DOMException2['default']('INVALID_CHARACTER_ERR');
        }

        this._name = String(name);
        this._value = String(value);
    }

    /**
     * Indicates whether the attribute is an "ID attribute". An "ID attribute" being an attribute which value is
     * expected to be unique across a DOM Document. In HTML DOM, "id" is the only ID attribute, but XML documents
     * could define others. Whether or not an attribute is unique is often determined by a DTD or other schema
     * description.
     *
     * @returns {boolean}
     
    * @memberof Attr 
    * @instance 
    * @member isId */

    _createClass(Attr, [{
        key: 'isId',
        get: function get() {
            return this._name === 'id';
        }

        /**
         * The attribute's name.
         *
         * @returns {string}
         
        * @memberof Attr 
        * @instance 
        * @member name */
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }

        /**
         * This property always returns true. Originally, it returned true if the attribute was explicitly specified in
         * the source code or by a script, and false if its value came from the default one defined in the document's DTD.
         *
         * @returns {boolean}
         
        * @memberof Attr 
        * @instance 
        * @member specified */
    }, {
        key: 'specified',
        get: function get() {
            return true;
        }

        /**
         * The attribute's value.
         *
         * @returns {string}
         
        * @memberof Attr 
        * @instance 
        * @member value */
    }, {
        key: 'value',
        get: function get() {
            return this._value;
        },

        /**
         * @param {string} value
         
        * @memberof Attr 
        * @instance 
        * @param value */
        set: function set(value) {
            this._value = String(value);
        }
    }]);

    return Attr;
})();

exports['default'] = Attr;
module.exports = exports['default'];
//# sourceMappingURL=Attr.js.map