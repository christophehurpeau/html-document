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

var _utilsUrl = require('../../utils/Url');

var _utilsUrl2 = _interopRequireDefault(_utilsUrl);

/**
 * The HTMLLinkElement interface represents reference information for external resources and the relationship of those
 * resources to a document and vice-versa. This object inherits all of the properties and methods of the
 * HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement
 * @class HTMLLinkElement
 */
/** @class HTMLLinkElement */
var HTMLLinkElement = (function (_HTMLElement) {
    _inherits(HTMLLinkElement, _HTMLElement);

    function HTMLLinkElement() {
        _classCallCheck(this, HTMLLinkElement);

        _get(Object.getPrototypeOf(HTMLLinkElement.prototype), 'constructor', this).call(this);
        this._href = new _utilsUrl2['default']();
    }

    /**
     * @constant {string} HTMLLinkElement#nodeName option
     */

    /**
     * @inheritDoc
     
    * @memberof HTMLLinkElement 
    * @instance 
    * @method setAttribute 
    * @param key 
    * @param value */

    _createClass(HTMLLinkElement, [{
        key: 'setAttribute',
        value: function setAttribute(key, value) {
            _get(Object.getPrototypeOf(HTMLLinkElement.prototype), 'setAttribute', this).call(this, key, value);
            if (key === 'href') {
                this.href = value;
            }
        }

        /**
         * Is a DOMString that reflects the href HTML attribute, containing a valid URL of a linked resource.
         *
         * @member {string} HTMLLinkElement#href
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'href',
        get: function get() {
            return this._href.toString();
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this._href.href = value;
            this._setAttribute('href', this._href.toString());

            if (this._href.protocol === '' && this.ownerDocument) {
                this._href.protocol = this.ownerDocument.location.protocol;
            }

            if (this._href.protocol !== 'javascript:' && // eslint-disable-line no-script-url
            this._href.host === '' && this.ownerDocument) {
                this._href.host = this.ownerDocument.location.host;
            }
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
            return this.getAttribute('rel');
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('rel', value);
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
            return this.hasAttribute('disabled');
        },

        /**
         * @param {boolean} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            if (value !== null) {
                this.setAttribute('disabled');
            } else {
                this.removeAttribute('disabled');
            }
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
            return this.getAttribute('hreflang');
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
         * Gets or sets a list of one or more media formats to which the resource applies.
         *
         * @member {string} HTMLLinkElement#media
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'media',
        get: function get() {
            return this.getAttribute('media');
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('media', value);
        }

        /**
         * Gets or sets the MIME type of the linked resource.
         *
         * @member {string} HTMLLinkElement#type
         * @returns {string}
         
        * @memberof HTMLLinkElement 
        * @instance */
    }, {
        key: 'type',
        get: function get() {
            return this.getAttribute('type');
        },

        /**
         * @param {string} value
         
        * @memberof HTMLLinkElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('type', value);
        }
    }]);

    return HTMLLinkElement;
})(_HTMLElement3['default']);

exports['default'] = HTMLLinkElement;
Object.defineProperty(HTMLLinkElement.prototype, 'nodeName', { value: 'link' });
module.exports = exports['default'];
//# sourceMappingURL=HTMLLinkElement.js.map