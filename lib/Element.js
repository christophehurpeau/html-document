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

var _utilsQuerySelectorHelper = require('./utils/QuerySelectorHelper');

var _utilsQuerySelectorHelper2 = _interopRequireDefault(_utilsQuerySelectorHelper);

/**
 * The Element interface represents an object within a DOM document.
 * This interface describes methods and properties common to all kinds of elements.
 * Specific behaviors are described in interfaces which inherit from Element but add additional functionality.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/Element
 * @class Element
 * @extends ParentNode
 */
/**
 * The Element.innerHTML property sets or gets the HTML syntax describing the element's descendants.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
 * @member {String} Element#innerHTML
 */
/**
 * The outerHTML attribute of the element DOM interface gets the serialized HTML fragment
 * describing the element including its descendants.
 * It can be set to replace the element with nodes parsed from the given string.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML
 * @member {String} Element#outerHTML
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
         * @method Element#getElementById
         * @param {String} id case-sensitive string representing the unique ID of the element being sought
         * @return {Element} reference to an Element, or null if an element with the specified ID is not in the document.
         
        * @memberof Element 
        * @instance 
        * @method getElementById 
        * @param id */
        value: function getElementById(id) {
            return this._childNodesRecursiveFind(function (e) {
                return e instanceof Element && e.getAttribute('id') === id;
            }) || null;
        }

        /**
         * Returns an HTMLCollection of elements with the given tag name.
         * The complete document is searched, including the root node.
         * The returned HTMLCollection is live, meaning that it updates itself automatically to stay in sync
         * with the DOM treewithout having to call document.getElementsByTagName() again.
         *
         * @method Element#getElementsByTagName
         * @param {String} tagName
         * @return {HTMLCollection}
         
        * @memberof Element 
        * @instance 
        * @method getElementsByTagName 
        * @param tagName 
        * @param _array */
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName, _array) {
            if (!tagName) {
                return !_array ? this.children.slice() : _array.push.apply(_array, this.children);
            }

            _array = _array || [];
            tagName = tagName.toLowerCase();
            this.children.forEach(function (e) {
                if (e.nodeName.toLowerCase() === tagName) {
                    _array.push(e);
                }
            });
            return _array;
        }

        /**
         * Returns the first element that is a descendant of the element on which it is invoked that matches the
         * specified group of selectors.
         *
         * @method Element#querySelector
         * @param {String} query CSS query for selecting element
         * @return {Element|null}
         
        * @memberof Element 
        * @instance 
        * @method querySelector 
        * @param query */
    }, {
        key: 'querySelector',
        value: function querySelector(query) {
            var helper = new _utilsQuerySelectorHelper2['default'](this);
            return helper.parse(query);
        }

        /**
         * Returns a non-live NodeList of all elements descended from the element on which it is invoked that match the
         * specified group of CSS selectors.
         *
         * @method Element#querySelectorAll
         * @param {String} query
         * @return {Array.<Element>}
         
        * @memberof Element 
        * @instance 
        * @method querySelectorAll 
        * @param query */
    }, {
        key: 'querySelectorAll',
        value: function querySelectorAll(query) {
            var helper = new _utilsQuerySelectorHelper2['default'](this);
            return helper.parseAll(query);
        }
    }, {
        key: 'id',

        /**
         * The id of the element.
         *
         * @member {String} Element#id
         
        * @memberof Element 
        * @instance */
        get: function get() {
            return this.getAttribute('id');
        },

        /**
         * @ignore
         * @param {String} id
         
        * @memberof Element 
        * @instance 
        * @param id */
        set: function set(id) {
            this.setAttribute('id', id);
        }

        /**
         * The tag name of the element.
         *
         * @member {String} Element#tagName
         * @readonly
         
        * @memberof Element 
        * @instance */
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
         * @member {Array.<Element>} Element#children
         * @readonly
         
        * @memberof Element 
        * @instance */
    }, {
        key: 'children',
        get: function get() {
            return this._childNodes.filter(function (n) {
                return n instanceof Element;
            });
        }

        /**
         * Returns the {@link Element} that is the first child of this ParentNode, or null if there is none.
         *
         * @member {Element} Element#firstElementChild
         * @readonly
         
        * @memberof Element 
        * @instance */
    }, {
        key: 'firstElementChild',
        get: function get() {
            return this._childNodes[0] || null;
        }

        /**
         * Returns the {@link Element} that is the first child of this ParentNode, or null if there is none.
         *
         * @member {Element} Element#lastElementChild
         * @readonly
         
        * @memberof Element 
        * @instance */
    }, {
        key: 'lastElementChild',
        get: function get() {
            return this._childNodes.length === 0 ? null : this._childNodes[this._childNodes.length - 1];
        }

        /**
         * Returns an unsigned long giving the amount of children that the object has.
         *
         * @member {Number} Element#childElementCount
         * @readonly
         
        * @memberof Element 
        * @instance */
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