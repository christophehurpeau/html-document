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

var _Event = require('../../Event');

var _Event2 = _interopRequireDefault(_Event);

/**
 * The HTMLFormElement interface provides methods to create and modify <form> elements;
 * it inherits from properties and methods of the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
 */
/** @class HTMLFormElement */
var HTMLFormElement = (function (_HTMLElement) {
    _inherits(HTMLFormElement, _HTMLElement);

    function HTMLFormElement() {
        _classCallCheck(this, HTMLFormElement);

        _get(Object.getPrototypeOf(HTMLFormElement.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * @constant {string} HTMLMetaElement#nodeName meta
     */

    _createClass(HTMLFormElement, [{
        key: 'submit',

        /**
         * Submits the form to the server.
         
        * @memberof HTMLFormElement 
        * @instance 
        * @method submit */
        value: function submit() {
            var event = new _Event2['default']('submit');
            this.dispatchEvent(event);
        }

        /**
         * Resets the forms to its initial state.
         
        * @memberof HTMLFormElement 
        * @instance 
        * @method reset */
    }, {
        key: 'reset',
        value: function reset() {
            var event = new _Event2['default']('reset');
            this.dispatchEvent(event);

            if (!event.defaultPrevented) {
                this.elements.forEach(function (element) {
                    return element.setAttribute('value', '');
                });
            }
        }
    }, {
        key: 'acceptCharset',

        /**
         * Gets or sets value of acceptCharset. Is a DOMString that reflects the accept-charset HTML attribute,
         * containing a list of character encodings that the server accepts.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member acceptCharset */

        get: function get() {
            if (this.hasAttribute('accept-charset')) {
                return this.getAttribute('accept-charset');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('accept-charset', value);
        }

        /**
         * Gets or sets value of action. Is a DOMString that reflects the action HTML attribute, containing the
         * URI of a program that processes the information submitted by the form.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member action */
    }, {
        key: 'action',
        get: function get() {
            if (this.hasAttribute('action')) {
                return this.getAttribute('action');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('action', value);
        }

        /**
         * Gets or sets value of action. Is a DOMString that reflects the autocomplete HTML attribute, containing a
         * string that indicates whether the controls in this form can have their values automatically
         * populated by the browser.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member autocomplete */
    }, {
        key: 'autocomplete',
        get: function get() {
            if (this.hasAttribute('autocomplete')) {
                return this.getAttribute('autocomplete');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('autocomplete', value);
        }

        /**
         * Returns a live HTMLFormControlsCollection containing all the form controls belonging to this form element.
         *
         * @type HTMLElement[]
         * @readonly
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member elements */
    }, {
        key: 'elements',
        get: function get() {
            var inputElements = ['input', 'select', 'button'];
            return this.children.filter(function (element) {
                return inputElements.indexOf(element.tagName) !== -1;
            });
        },
        /** @memberof HTMLFormElement 
        * @instance 
        * @param value */set: function set(value) {
            throw new Error('elements is read only');
        }

        /**
         * Is a synonym for enctype.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member encoding */
    }, {
        key: 'encoding',
        get: function get() {
            return this.enctype;
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.enctype = value;
        }

        /**
         * Is a DOMString reflects the enctype HTML attribute, indicating the type of content that is used to transmit
         * the form to the server. Only specified values can be set.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member enctype */
    }, {
        key: 'enctype',
        get: function get() {
            if (this.hasAttribute('enctype')) {
                return this.getAttribute('enctype');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('enctype', value);
        }

        /**
         * Returns a long that represents the number of controls in the form.
         *
         * @type {number}
         * @readonly
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member length */
    }, {
        key: 'length',
        get: function get() {
            return this.elements.length;
        },
        /** @memberof HTMLFormElement 
        * @instance 
        * @param value */set: function set(value) {
            throw new Error('length is read only');
        }

        /**
         * Is a DOMString that reflects the method HTML attribute, indicating the HTTP method used to submit the form.
         * Only specified values can be set.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member method */
    }, {
        key: 'method',
        get: function get() {
            if (this.hasAttribute('method')) {
                return this.getAttribute('method');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            value = value.toLowerCase();
            if (value === 'post' || value === 'get') {
                this.setAttribute('method', value);
            }
        }

        /**
         * Is a DOMString that reflects the name HTML attribute, containing the name of the form.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member name */
    }, {
        key: 'name',
        get: function get() {
            if (this.hasAttribute('name')) {
                return this.getAttribute('name');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('name', value);
        }

        /**
         * Is a Boolean that reflects the novalidate HTML attribute, indicating that the form should not be validated.
         *
         * @type {boolean}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member noValidate */
    }, {
        key: 'noValidate',
        get: function get() {
            return this.hasAttribute('novalidate');
        },

        /**
         * @ignore
         * @param {boolean} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            if (value) {
                this.setAttribute('novalidate', true);
            } else {
                this.removeAttribute('novalidate');
            }
        }

        /**
         * Is a DOMString that reflects the target HTML attribute, indicating where to display the results
         * received from submitting the form.
         *
         * @type {string}
         
        * @memberof HTMLFormElement 
        * @instance 
        * @member target */
    }, {
        key: 'target',
        get: function get() {
            if (this.hasAttribute('target')) {
                return this.getAttribute('target');
            }

            return '';
        },

        /**
         * @ignore
         * @param {string} value
         
        * @memberof HTMLFormElement 
        * @instance 
        * @param value */
        set: function set(value) {
            this.setAttribute('target', value);
        }
    }]);

    return HTMLFormElement;
})(_HTMLElement3['default']);

exports['default'] = HTMLFormElement;
Object.defineProperty(HTMLFormElement.prototype, 'nodeName', { value: 'form' });
module.exports = exports['default'];
//# sourceMappingURL=HTMLFormElement.js.map