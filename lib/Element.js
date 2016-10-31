'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _ParentNode2 = require('./ParentNode');

var _ParentNode3 = _interopRequireDefault(_ParentNode2);

var _utilsQuerySelectorHelper = require('./utils/querySelectorHelper');

/**
 * The Element interface represents an object within a DOM document.
 * This interface describes methods and properties common to all kinds of elements.
 * Specific behaviors are described in interfaces which inherit from Element but add additional functionality.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/Element
 */
/**
 * The Element.innerHTML property sets or gets the HTML syntax describing the element's descendants.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
 * @member {string} Element#innerHTML
 */
/**
 * The outerHTML attribute of the element DOM interface gets the serialized HTML fragment
 * describing the element including its descendants.
 * It can be set to replace the element with nodes parsed from the given string.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML
 * @member {string} Element#outerHTML
 */

/** @class Element */
var Element = (function (_ParentNode) {
    _inherits(Element, _ParentNode);

    function Element() {
        _classCallCheck(this, Element);

        _get(Object.getPrototypeOf(Element.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * @constant {string} Comment#nodeType
     */

    _createClass(Element, [{
        key: 'getElementById',

        /**
         * Returns a reference to the element by its ID.
         *
         * @param {string} id case-sensitive string representing the unique ID of the element being sought
         * @return {Element} reference to an Element, or null if an element with the specified ID is not in the document.
         
        * @memberof Element 
        * @instance 
        * @method getElementById 
        * @param id */
        value: function getElementById(id) {
            return this._childNodesRecursiveFind(function (node) {
                return node instanceof Element && node.getAttribute('id') === id;
            }) || null;
        }

        /**
         * Returns an HTMLCollection of elements with the given tag name.
         * The complete document is searched, including the root node.
         * The returned HTMLCollection is live, meaning that it updates itself automatically to stay in sync
         * with the DOM treewithout having to call document.getElementsByTagName() again.
         *
         * @param {string} tagName
         * @return {HTMLCollection}
         
        * @memberof Element 
        * @instance 
        * @method getElementsByTagName 
        * @param tagName */
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            if (!tagName) {
                return this._createCollection(function (child) {
                    return true;
                });
            }

            tagName = tagName.toLowerCase();
            return this._createCollection(function (child) {
                return child.nodeName.toLowerCase() === tagName;
            });
        }

        /**
         * The Element.getElementsByClassName() method returns a live HTMLCollection containing all child
         * elements which have all of the given class names. When called on the document object,
         * the complete document is searched, including the root node.
         *
         * @param {string} names is a string representing the list of class names to match;
         *                class names are separated by whitespace
         * @return {HTMLCollection}
         
        * @memberof Element 
        * @instance 
        * @method getElementsByClassName 
        * @param names */
    }, {
        key: 'getElementsByClassName',
        value: function getElementsByClassName(names) {
            var classes = names.split(' ');
            return this._createCollection(function (child) {
                return classes.every(function (token) {
                    return child.classList.contains(token);
                });
            });
        }

        /**
         * Returns the first element that is a descendant of the element on which it is invoked that matches the
         * specified group of selectors.
         *
         * @param {string} query CSS query for selecting element
         * @return {Element|null}
         
        * @memberof Element 
        * @instance 
        * @method querySelector 
        * @param query */
    }, {
        key: 'querySelector',
        value: function querySelector(query) {
            return (0, _utilsQuerySelectorHelper.querySelector)(this, query);
        }

        /**
         * Returns a non-live NodeList of all elements descended from the element on which it is invoked that match the
         * specified group of CSS selectors.
         *
         * @param {string} query
         * @return {Element[]}
         
        * @memberof Element 
        * @instance 
        * @method querySelectorAll 
        * @param query */
    }, {
        key: 'querySelectorAll',
        value: function querySelectorAll(query) {
            return (0, _utilsQuerySelectorHelper.querySelectorAll)(this, query);
        }
    }, {
        key: 'id',

        /**
         * The id of the element.
         *
         * @type {string}
         
        * @memberof Element 
        * @instance 
        * @member id */
        get: function get() {
            return this.getAttribute('id');
        },

        /**
         * @param {string} id
         
        * @memberof Element 
        * @instance 
        * @param id */
        set: function set(id) {
            this.setAttribute('id', id);
        }

        /**
         * The tag name of the element.
         *
         * @type {string}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member tagName */
    }, {
        key: 'tagName',
        get: function get() {
            return this.nodeName;
        }

        /**
         * Returns a live {@link HTMLCollection} containing all objects of type {@link Element}
         * that are children of this ParentNode.
         *
         * Note: this currently returns a non-live array.
         *
         * later type {HTMLCollection}
         *
         * @type {Element[]}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member children */
    }, {
        key: 'children',
        get: function get() {
            return this._childNodes.filter(function (node) {
                return node instanceof Element;
            });
        }

        /**
         * Returns the {@link Element} that is the first child of this ParentNode, or null if there is none.
         *
         * @type {Element}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member firstElementChild */
    }, {
        key: 'firstElementChild',
        get: function get() {
            return this.children[0] || null;
        }

        /**
         * Returns the {@link Element} that is the first child of this ParentNode, or null if there is none.
         *
         * @type {Element}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member lastElementChild */
    }, {
        key: 'lastElementChild',
        get: function get() {
            var children = this.children;
            return children.length === 0 ? null : children[this.children.length - 1];
        }

        /**
         * Returns the {@link Element} immediately following the specified one in its parent's children list,
         * or null if the specified element is the last one in the list.
         *
         * @type {Element}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member nextElementSibling */
    }, {
        key: 'nextElementSibling',
        get: function get() {
            var siblings = this.parentNode.children;
            if (siblings && siblings.length > 1) {
                var index = siblings.indexOf(this);
                if (index + 1 < siblings.length) {
                    return siblings[index + 1];
                }
            }

            return null;
        }

        /**
         * Returns the Element immediately prior to the specified one in its parent's children list, or null
         * if the specified element is the first one in the list.
         *
         * @type {Element}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member previousElementSibling */
    }, {
        key: 'previousElementSibling',
        get: function get() {
            var siblings = this.parentNode.children;
            if (siblings && siblings.length > 1) {
                var index = siblings.indexOf(this);
                if (index !== 0) {
                    return siblings[index - 1];
                }
            }

            return null;
        }

        /**
         * Returns an unsigned long giving the amount of children that the object has.
         *
         * @type {number}
         * @readonly
         
        * @memberof Element 
        * @instance 
        * @member childElementCount */
    }, {
        key: 'childElementCount',
        get: function get() {
            return this._childNodes.length;
        }
    }, {
        key: 'attributes',
        /** @memberof Element 
        * @instance 
        * @member attributes */get: function get() {
            return this._attributes;
        }
    }]);

    return Element;
})(_ParentNode3['default']);

exports['default'] = Element;
Object.defineProperty(Element.prototype, 'nodeType', { value: _Node2['default'].ELEMENT_NODE });
module.exports = exports['default'];
//# sourceMappingURL=Element.js.map