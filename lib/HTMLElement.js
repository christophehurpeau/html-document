'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Element2 = require('./Element');

var _Element3 = _interopRequireDefault(_Element2);

var _HTMLElementCSSStyleDeclaration = require('./HTMLElement/CSSStyleDeclaration');

var _HTMLElementCSSStyleDeclaration2 = _interopRequireDefault(_HTMLElementCSSStyleDeclaration);

var _HTMLElementClassList = require('./HTMLElement/ClassList');

var _HTMLElementClassList2 = _interopRequireDefault(_HTMLElementClassList);

var _utilsEscapeAttribute = require('./utils/escapeAttribute');

var _utilsEscapeAttribute2 = _interopRequireDefault(_utilsEscapeAttribute);

var _utilsEscapeAttributeName = require('./utils/escapeAttributeName');

var voidElements = 'area base br col embed hr img input keygen link meta param source track wbr'.split(' ');

/**
 * The HTMLElement interface represents any HTML element.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLElement
 */
/** @class HTMLElement */
var HTMLElement = (function (_Element) {
    _inherits(HTMLElement, _Element);

    function HTMLElement() {
        _classCallCheck(this, HTMLElement);

        _get(Object.getPrototypeOf(HTMLElement.prototype), 'constructor', this).call(this);
        /**
         * returns a token list of the class attribute of the element
         * @type {CSSStyleDeclaration} style
         * @readonly
         */
        this.style = new _HTMLElementCSSStyleDeclaration2['default'](this);
        /**
         * returns a token list of the class attribute of the element
         * @type {ClassList} classList
         * @readonly
         */
        this.classList = new _HTMLElementClassList2['default'](this);

        this._dataset = {};
    }

    /**
     * The class of the element.
     *
     * @type {string}
     
    * @memberof HTMLElement 
    * @instance 
    * @member className */

    _createClass(HTMLElement, [{
        key: '_updatedAttribute',
        /** @memberof HTMLElement 
        * @instance 
        * @method _updatedAttribute 
        * @param attributeName 
        * @param value */value: function _updatedAttribute(attributeName, value) {
            if (attributeName === 'style') {
                this.style.cssText = value || '';
            }

            if (attributeName === 'class') {
                this.classList._parse(value || '');
            }

            if (attributeName.startsWith('data-')) {
                this.dataset[(0, _utilsEscapeAttributeName.attributeNameToProperty)(attributeName)] = value;
            }
        }

        /**
         * @ignore
         * @return {string}
         
        * @memberof HTMLElement 
        * @instance 
        * @member outerHTML */
    }, {
        key: 'className',
        get: function get() {
            return this.getAttribute('class');
        },

        /**
         * @param {string} className
         
        * @memberof HTMLElement 
        * @instance 
        * @param className */
        set: function set(className) {
            this.setAttribute('class', className);
        }
    }, {
        key: 'outerHTML',
        get: function get() {
            var _this = this;

            return '<' + this.nodeName + _Object$keys(this._attributes).reduce(function (value, attributeName) {
                var result = value + ' ' + attributeName;
                if (_this._attributes[attributeName]) {
                    result += '="' + (0, _utilsEscapeAttribute2['default'])(_this._attributes[attributeName]) + '"';
                }

                return result;
            }, '') + '>' + (voidElements.indexOf(this.nodeName) !== -1 ? '' : this.innerHTML + '</' + this.nodeName + '>');
        }
    }, {
        key: 'dataset',
        /** @memberof HTMLElement 
        * @instance 
        * @member dataset */get: function get() {
            return this._dataset;
        }
    }]);

    return HTMLElement;
})(_Element3['default']);

exports['default'] = HTMLElement;
module.exports = exports['default'];
//# sourceMappingURL=HTMLElement.js.map