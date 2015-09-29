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

/** @class HTMLLinkElement */
var HTMLLinkElement = (function (_HTMLElement) {
    _inherits(HTMLLinkElement, _HTMLElement);

    function HTMLLinkElement() {
        _classCallCheck(this, HTMLLinkElement);

        _get(Object.getPrototypeOf(HTMLLinkElement.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * @constant {string} HTMLLinkElement#nodeName option
     */

    _createClass(HTMLLinkElement, [{
        key: 'charset',

        /**
         * Gets or sets the character encoding for the target resource.
         *
         * @member {string} HTMLLinkElement#charset
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
        get: function get() {
            return this.hasAttribute('charset') ? this.getAttribute('charset') : '';
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('charset', value);
        }

        /**
         * Gets or sets whether the link is disabled; currently only used with style sheet links.
         *
         * @member {boolean} HTMLLinkElement#disabled
         * @returns {boolean}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'disabled',
        get: function get() {
            return this.hasAttribute('disabled') ? this.getAttribute('disabled') !== 'false' : false;
        },

        /**
         * @param {boolean} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            if (!value) {
                this.removeAttribute('disabled');
            } else {
                this.setAttribute('disabled', 'disabled');
            }
        }

        /**
         * Gets or sets the URI for the target resource.
         *
         * @member {string} HTMLLinkElement#href
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'href',
        get: function get() {
            return this.hasAttribute('href') ? this.getAttribute('href') : '';
        },

        /**
         * @param {string} value
         * @todo Provide URL extension to full version
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('href', value);
        }

        /**
         * Gets or sets the language code for the linked resource.
         *
         * @member {string} HTMLLinkElement#hreflang
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'hreflang',
        get: function get() {
            return this.hasAttribute('hreflang') ? this.getAttribute('hreflang') : '';
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('hreflang', value);
        }

        /**
         * Gets or sets the forward relationship of the linked resource from the document to the resource.
         *
         * @member {string} HTMLLinkElement#rel
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'rel',
        get: function get() {
            return this.hasAttribute('rel') ? this.getAttribute('rel') : '';
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('rel', value);
        }
    }]);

    return HTMLLinkElement;
})(_HTMLElement3['default']);

exports['default'] = HTMLLinkElement;
Object.defineProperty(HTMLLinkElement.prototype, 'nodeName', { value: 'link' });
module.exports = exports['default'];
//# sourceMappingURL=HTMLLinkElement.js.map