'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

var _ParentNode2 = require('./ParentNode');

var _ParentNode3 = _interopRequireDefault(_ParentNode2);

var _Comment = require('./Comment');

var _Comment2 = _interopRequireDefault(_Comment);

var _DocumentFragment = require('./DocumentFragment');

var _DocumentFragment2 = _interopRequireDefault(_DocumentFragment);

var _HTMLElement = require('./HTMLElement');

var _HTMLElement2 = _interopRequireDefault(_HTMLElement);

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

var _utilsUrl = require('./utils/Url');

var _utilsUrl2 = _interopRequireDefault(_utilsUrl);

// HTML Elements

var _HTMLElementElementsHTMLDocumentElement = require('./HTMLElement/elements/HTMLDocumentElement');

var _HTMLElementElementsHTMLDocumentElement2 = _interopRequireDefault(_HTMLElementElementsHTMLDocumentElement);

var _HTMLElementElementsHTMLOptionElement = require('./HTMLElement/elements/HTMLOptionElement');

var _HTMLElementElementsHTMLOptionElement2 = _interopRequireDefault(_HTMLElementElementsHTMLOptionElement);

var _HTMLElementElementsHTMLSelectElement = require('./HTMLElement/elements/HTMLSelectElement');

var _HTMLElementElementsHTMLSelectElement2 = _interopRequireDefault(_HTMLElementElementsHTMLSelectElement);

var _HTMLElementElementsHTMLTableCaptionElement = require('./HTMLElement/elements/HTMLTableCaptionElement');

var _HTMLElementElementsHTMLTableCaptionElement2 = _interopRequireDefault(_HTMLElementElementsHTMLTableCaptionElement);

var _HTMLElementElementsHTMLMetaElement = require('./HTMLElement/elements/HTMLMetaElement');

var _HTMLElementElementsHTMLMetaElement2 = _interopRequireDefault(_HTMLElementElementsHTMLMetaElement);

var _HTMLElementElementsHTMLTableElement = require('./HTMLElement/elements/HTMLTableElement');

var _HTMLElementElementsHTMLTableElement2 = _interopRequireDefault(_HTMLElementElementsHTMLTableElement);

var _HTMLElementElementsHTMLTableRowElement = require('./HTMLElement/elements/HTMLTableRowElement');

var _HTMLElementElementsHTMLTableRowElement2 = _interopRequireDefault(_HTMLElementElementsHTMLTableRowElement);

var _HTMLElementElementsHTMLTableSectionElement = require('./HTMLElement/elements/HTMLTableSectionElement');

var _HTMLElementElementsHTMLTableSectionElement2 = _interopRequireDefault(_HTMLElementElementsHTMLTableSectionElement);

var _HTMLElementElementsHTMLAnchorElement = require('./HTMLElement/elements/HTMLAnchorElement');

var _HTMLElementElementsHTMLAnchorElement2 = _interopRequireDefault(_HTMLElementElementsHTMLAnchorElement);

var _HTMLElementElementsHTMLFormElement = require('./HTMLElement/elements/HTMLFormElement');

var _HTMLElementElementsHTMLFormElement2 = _interopRequireDefault(_HTMLElementElementsHTMLFormElement);

var elementClasses = new _Map([['html', _HTMLElementElementsHTMLDocumentElement2['default']], ['caption', _HTMLElementElementsHTMLTableCaptionElement2['default']], ['meta', _HTMLElementElementsHTMLMetaElement2['default']], ['option', _HTMLElementElementsHTMLOptionElement2['default']], ['table', _HTMLElementElementsHTMLTableElement2['default']], ['thead', _HTMLElementElementsHTMLTableSectionElement2['default']], ['tfoot', _HTMLElementElementsHTMLTableSectionElement2['default']], ['tbody', _HTMLElementElementsHTMLTableSectionElement2['default']], ['tr', _HTMLElementElementsHTMLTableRowElement2['default']], ['select', _HTMLElementElementsHTMLSelectElement2['default']], ['a', _HTMLElementElementsHTMLAnchorElement2['default']], ['form', _HTMLElementElementsHTMLFormElement2['default']]]);

/**
 * @see https://developer.mozilla.org/en/docs/Web/API/Document
 */
/** @class Document */
var Document = (function (_ParentNode) {
    _inherits(Document, _ParentNode);

    function Document() {
        _classCallCheck(this, Document);

        _get(Object.getPrototypeOf(Document.prototype), 'constructor', this).call(this);
        /**
         * @type {HTMLElement}
         */
        this._documentElement = this.createElement('html');
        this.appendChild(this._documentElement);

        this._location = new _utilsUrl2['default']('about:blank');
        this._ownerDocument = this;
    }

    /**
     * @constant {number} Comment#nodeType
     */

    /**
     * Creates a new {@link Comment}.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createComment
     *
     * @param {string} data
     * @return {Comment}
    
    * @memberof Document 
    * @instance 
    * @method createComment 
    * @param data */

    _createClass(Document, [{
        key: 'createComment',
        value: function createComment(data) {
            var comment = new _Comment2['default'](data);
            comment._ownerDocument = this;
            return comment;
        }

        /**
         * Creates a new empty {@link DocumentFragment}.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createDocumentFragment
         *
         * @return {DocumentFragment}
        
        * @memberof Document 
        * @instance 
        * @method createDocumentFragment */
    }, {
        key: 'createDocumentFragment',
        value: function createDocumentFragment() {
            var fragment = new _DocumentFragment2['default']();
            fragment._ownerDocument = this;
            return fragment;
        }

        /**
         * Creates a new element with the given tag name.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createElement
         *
         * @param {string} name
         * @return {HTMLElement}
        
        * @memberof Document 
        * @instance 
        * @method createElement 
        * @param name */
    }, {
        key: 'createElement',
        value: function createElement(name) {
            name = name.toLowerCase();
            var ElementClass = elementClasses.get(name) || _HTMLElement2['default'];
            var element = new ElementClass();

            element._ownerDocument = this;

            if (!element.nodeName) {
                element.nodeName = name;
            }

            return element;
        }

        /**
         * Creates a text node.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.createTextNode
         *
         * @param {string} textContent
         * @return {Text}
        
        * @memberof Document 
        * @instance 
        * @method createTextNode 
        * @param textContent */
    }, {
        key: 'createTextNode',
        value: function createTextNode(textContent) {
            var text = new _Text2['default'](textContent);
            text._ownerDocument = this;
            return text;
        }

        /**
         * Returns a reference to the element by its ID.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementById
         *
         * @param {string} id case-sensitive string representing the unique ID of the element being sought
         * @return {Element} reference to an Element, or null if an element with the specified ID is not in the document.
         
        * @memberof Document 
        * @instance 
        * @method getElementById 
        * @param id */
    }, {
        key: 'getElementById',
        value: function getElementById(id) {
            return this.documentElement.getElementById(id);
        }

        /**
         * Returns an HTMLCollection of elements with the given tag name.
         * The complete document is searched, including the root node.
         * The returned HTMLCollection is live, meaning that it updates itself automatically to stay in sync
         * with the DOM treewithout having to call document.getElementsByTagName() again.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document.getElementsByTagName
         *
         * @param {string} tagName
         * @return {HTMLCollection}
         
        * @memberof Document 
        * @instance 
        * @method getElementsByTagName 
        * @param tagName */
    }, {
        key: 'getElementsByTagName',
        value: function getElementsByTagName(tagName) {
            return this.documentElement.getElementsByTagName(tagName);
        }
    }, {
        key: 'getElementsByClassName',
        /** @memberof Document 
        * @instance 
        * @method getElementsByClassName 
        * @param className */value: function getElementsByClassName(className) {
            return this.documentElement.getElementsByClassName(className);
        }

        /**
         * Returns the first element within the document (using depth-first pre-order traversal of the document's nodes|by
         * first element in document markup and iterating through sequential nodes by order of amount of child nodes)
         * that matches the specified group of selectors.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
         *
         * @param {string} selector
         * @return {Element}
         
        * @memberof Document 
        * @instance 
        * @method querySelector 
        * @param selector */
    }, {
        key: 'querySelector',
        value: function querySelector(selector) {
            return this.documentElement.querySelector(selector);
        }

        /**
         * Returns a list of the elements within the document (using depth-first pre-order traversal of the document's
         * nodes) that match the specified group of selectors. The object returned is a NodeList.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
         *
         * @param {string} selector
         * @return {NodeList}
         
        * @memberof Document 
        * @instance 
        * @method querySelectorAll 
        * @param selector */
    }, {
        key: 'querySelectorAll',
        value: function querySelectorAll(selector) {
            return this.documentElement.querySelectorAll(selector);
        }

        /**
         * textContent returns null if the element is a document, a document type, or a notation.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
         
        * @memberof Document 
        * @instance 
        * @member textContent */
    }, {
        key: 'appendChild',

        /**
         * @param {Node} child
         * @return {Node}
         
        * @memberof Document 
        * @instance 
        * @method appendChild 
        * @param child */
        value: function appendChild(child) {
            child = _get(Object.getPrototypeOf(Document.prototype), 'appendChild', this).call(this, child);
            if (child.nodeName === 'html') {
                this._documentElement = child;
            }

            return child;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return null;
        }
    }, {
        key: 'documentElement',
        /** @memberof Document 
        * @instance 
        * @member documentElement */get: function get() {
            return this._documentElement;
        }
    }, {
        key: 'head',
        /** @memberof Document 
        * @instance 
        * @member head */get: function get() {
            var head = this._documentElement._childNodeFind(function (node) {
                return node.tagName === 'head';
            });
            if (!head) {
                head = this.createElement('head');
                this._documentElement.insertBefore(head, this.body);
            }

            return head;
        }
    }, {
        key: 'body',
        /** @memberof Document 
        * @instance 
        * @member body */get: function get() {
            var body = this._documentElement._childNodeFind(function (node) {
                return node.tagName === 'body';
            });
            if (!body) {
                body = this.createElement('body');
                this._documentElement.appendChild(body);
            }

            return body;
        },
        /** @memberof Document 
        * @instance 
        * @param body */set: function set(body) {
            var current = this._documentElement.getElementsByTagName('body').shift();
            if (current) {
                this._documentElement.replaceChild(body, current);
            } else {
                this._documentElement.appendChild(body);
            }
        }
    }, {
        key: 'location',
        /** @memberof Document 
        * @instance 
        * @member location */get: function get() {
            return this._location;
        },
        /** @memberof Document 
        * @instance 
        * @param value */set: function set(value) {
            this._location.href = value;
        }
    }]);

    return Document;
})(_ParentNode3['default']);

exports['default'] = Document;
Object.defineProperty(Document.prototype, 'nodeType', { value: _Node2['default'].DOCUMENT_NODE });
module.exports = exports['default'];
//# sourceMappingURL=Document.js.map