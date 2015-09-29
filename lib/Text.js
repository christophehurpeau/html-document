'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utilsEscapeHTML = require('./utils/escapeHTML');

var _utilsEscapeHTML2 = _interopRequireDefault(_utilsEscapeHTML);

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

/**
* @see https://developer.mozilla.org/en/docs/Web/API/Text
* @class Text
* @extends Node
* @param {String} textContent
* @property {String} textContent
*/
/** @class Text 
* @param textContent */
var Text = (function (_Node) {
    _inherits(Text, _Node);

    function Text(textContent) {
        _classCallCheck(this, Text);

        _get(Object.getPrototypeOf(Text.prototype), 'constructor', this).call(this);
        this.value = textContent;
    }

    /**
     * @constant {number} Comment#nodeType
     */

    _createClass(Text, [{
        key: '_toHTML',
        /** @memberof Text 
        * @instance 
        * @method _toHTML */value: function _toHTML() {
            return (0, _utilsEscapeHTML2['default'])(this.value);
        }
    }, {
        key: 'textContent',
        /** @memberof Text 
        * @instance 
        * @member textContent */get: function get() {
            return this.value;
        },
        /** @memberof Text 
        * @instance 
        * @param textContent */set: function set(textContent) {
            this.value = textContent;
        }
    }, {
        key: 'nodeValue',
        /** @memberof Text 
        * @instance 
        * @member nodeValue */get: function get() {
            return this.textContent;
        },
        /** @memberof Text 
        * @instance 
        * @param value */set: function set(value) {
            this.textContent = value;
        }
    }]);

    return Text;
})(_Node3['default']);

exports['default'] = Text;
Object.defineProperty(Text.prototype, 'nodeType', { value: _Node3['default'].TEXT_NODE });

/**
 * @constant {string} Comment#nodeName
 */
Object.defineProperty(Text.prototype, 'nodeName', { value: '#text' });
module.exports = exports['default'];
//# sourceMappingURL=Text.js.map