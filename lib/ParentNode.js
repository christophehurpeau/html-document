'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Node2 = require('./Node');

var _Node3 = _interopRequireDefault(_Node2);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _utilsCloneNodeHelper = require('./utils/cloneNodeHelper');

var _utilsHTMLCollection = require('./utils/HTMLCollection');

var _utilsHTMLCollection2 = _interopRequireDefault(_utilsHTMLCollection);

/**
 * The ParentNode interface contains methods that are particular to Node objects that can have children.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/ParentNode
 */
/** @class ParentNode */
var ParentNode = (function (_Node) {
    _inherits(ParentNode, _Node);

    function ParentNode() {
        _classCallCheck(this, ParentNode);

        _get(Object.getPrototypeOf(ParentNode.prototype), 'constructor', this).call(this);
        this._childNodes = [];
        this._childCollections = [];
    }

    /**
     * TODO return {HTMLCollection}
     *
     * @type {Node[]}
     * @readonly
     
    * @memberof ParentNode 
    * @instance 
    * @member childNodes */

    _createClass(ParentNode, [{
        key: '_childNodesRecursiveForEach',

        /**
         * @param callback
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _childNodesRecursiveForEach 
        * @param callback */
        value: function _childNodesRecursiveForEach(callback) {
            this._childNodes.forEach(function (node) {
                callback(node);
                if (node instanceof ParentNode) {
                    node._childNodesRecursiveForEach(callback);
                }
            });
        }

        /**
         * @param callback
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _childNodesRecursiveFind 
        * @param callback */
    }, {
        key: '_childNodesRecursiveFind',
        value: function _childNodesRecursiveFind(callback) {
            var result = undefined;
            this._childNodes.some(function (node) {
                if (callback(node)) {
                    result = node;
                    return true;
                }

                if (node instanceof ParentNode) {
                    result = node._childNodesRecursiveFind(callback);
                    if (result !== undefined) {
                        return true;
                    }
                }
            });
            return result;
        }

        /**
         * @param callback
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _filterDescendantNodes 
        * @param callback */
    }, {
        key: '_filterDescendantNodes',
        value: function _filterDescendantNodes(callback) {
            var result = [];

            this._childNodesRecursiveForEach(function (node) {
                if (callback(node)) {
                    result.push(node);
                }
            });

            return result;
        }

        /**
         * @param callback
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _childNodeFind 
        * @param callback */
    }, {
        key: '_childNodeFind',
        value: function _childNodeFind(callback) {
            var result = null;
            this._childNodes.some(function (node) {
                if (callback(node)) {
                    result = node;
                    return true;
                }
            });
            return result;
        }

        /**
         * Inner method to create new live HTMLCollection.
         *
         * @protected
         
        * @memberof ParentNode 
        * @instance 
        * @method _createCollection 
        * @param selector */
    }, {
        key: '_createCollection',
        value: function _createCollection(selector) {
            var collection = new _utilsHTMLCollection2['default'](this, selector);
            this._childCollections.push(collection);
            return collection;
        }

        /**
         * Inner method to update all collections in this element and
         * it's parent.
         *
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _updateCollections */
    }, {
        key: '_updateCollections',
        value: function _updateCollections() {
            this._childCollections.forEach(function (collection) {
                return collection._update();
            });
            if (this.parentNode !== null) {
                this.parentNode._updateCollections();
            }
        }

        /**
         * @type {Node|null}
         * @readonly
         
        * @memberof ParentNode 
        * @instance 
        * @member parentNode */
    }, {
        key: '_highestParent',

        /**
         * @return {Node|null}
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _highestParent */
        value: function _highestParent() {
            var node = this._parentNode;

            if (!node) {
                return node;
            }

            while (node._parentNode != null) {
                node = node._parentNode;
            }

            return node;
        }

        /**
         * @param {string} nodeName
         * @return {Node|null}
         * @private
         
        * @memberof ParentNode 
        * @instance 
        * @method _closestParent 
        * @param nodeName */
    }, {
        key: '_closestParent',
        value: function _closestParent(nodeName) {
            var node = this._parentNode;

            while (node != null && node.nodeName !== nodeName) {
                node = node._parentNode;
            }

            return node;
        }

        /**
         * Method returns true if node has child nodes.
         *
         * @returns {boolean}
         
        * @memberof ParentNode 
        * @instance 
        * @method hasChildNodes */
    }, {
        key: 'hasChildNodes',
        value: function hasChildNodes() {
            return this._childNodes && this._childNodes.length > 0;
        }

        /**
         * @type {Node|null}
         * @readonly
         
        * @memberof ParentNode 
        * @instance 
        * @member firstChild */
    }, {
        key: 'appendChild',

        /**
         * @param {Node} child
         * @return {Node}
         
        * @memberof ParentNode 
        * @instance 
        * @method appendChild 
        * @param child */
        value: function appendChild(child) {
            if (!(child instanceof _Node3['default'])) {
                throw new Error('Trying to add non node element');
            }

            if (child._parentNode) {
                child._parentNode.removeChild(child);
            }

            if (child.nodeType === _Node3['default'].DOCUMENT_FRAGMENT_NODE) {
                var childNode = undefined;

                while (childNode = child.firstChild) {
                    child.removeChild(childNode);
                    this.appendChild(childNode);
                }

                return child;
            }

            child._parentNode = this;
            this._childNodes.push(child);
            this._updateCollections();
            return child;
        }

        /**
         * @param {Node} newChild
         * @param {Node} oldChild
         * @return {Node}
         
        * @memberof ParentNode 
        * @instance 
        * @method replaceChild 
        * @param newChild 
        * @param oldChild */
    }, {
        key: 'replaceChild',
        value: function replaceChild(newChild, oldChild) {
            var index = this._childNodes.indexOf(oldChild);
            if (index === -1) {
                throw new Error('Node was not found');
            }

            if (newChild._parentNode) {
                newChild._parentNode.removeChild(newChild);
            }

            if (newChild.nodeType === _Node3['default'].DOCUMENT_FRAGMENT_NODE) {
                var _childNodes;

                var newChildren = [];
                var childNode = undefined;

                while (childNode = newChild.firstChild) {
                    newChild.removeChild(childNode);
                    childNode._parentNode = this;
                    newChildren.push(childNode);
                }

                (_childNodes = this._childNodes).splice.apply(_childNodes, [index, 1].concat(newChildren));
            } else {
                newChild._parentNode = this;
                this._childNodes[index] = newChild;
            }

            delete oldChild._parentNode;
            this._updateCollections();
            return oldChild;
        }

        /**
         * @param {Node} toRemoveChild
         * @return {Node}
         
        * @memberof ParentNode 
        * @instance 
        * @method removeChild 
        * @param toRemoveChild */
    }, {
        key: 'removeChild',
        value: function removeChild(toRemoveChild) {
            var index = this._childNodes.indexOf(toRemoveChild);
            if (index === -1) {
                throw new Error('Node was not found');
            }

            this._childNodes.splice(index, 1);
            delete toRemoveChild._parentNode;
            this._updateCollections();
            return toRemoveChild;
        }

        /**
         * @param {Node} child
         * @param {Node} existingChild
         * @return {Node}
         
        * @memberof ParentNode 
        * @instance 
        * @method insertBefore 
        * @param child 
        * @param existingChild */
    }, {
        key: 'insertBefore',
        value: function insertBefore(child, existingChild) {
            var index = this._childNodes.indexOf(existingChild);
            if (index === -1) {
                throw new Error('Node was not found');
            }

            if (child._parentNode) {
                child._parentNode.removeChild(child);
            }

            if (child.nodeType === _Node3['default'].DOCUMENT_FRAGMENT_NODE) {
                var _childNodes2;

                var children = [];
                var childNode = undefined;

                while (childNode = child.firstChild) {
                    child.removeChild(childNode);
                    childNode._parentNode = this;
                    children.push(childNode);
                }

                (_childNodes2 = this._childNodes).splice.apply(_childNodes2, [index, 0].concat(children));
            } else {
                child._parentNode = this;
                this._childNodes.splice(index, 0, child);
            }

            this._updateCollections();
            return child;
        }

        /**
         * @ignore
         * @return {string}
         
        * @memberof ParentNode 
        * @instance 
        * @member innerHTML */
    }, {
        key: 'cloneNode',

        /**
         * Clone a Node, and optionally, all of its contents. By default, it clones the content of the node.
         *
         * @param {boolean} deep
         * @returns {Node}
         
        * @memberof ParentNode 
        * @instance 
        * @method cloneNode 
        * @param [deep=false] */
        value: function cloneNode() {
            var deep = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            return (0, _utilsCloneNodeHelper.cloneAnyNode)(this, deep);
        }

        /**
         * @ignore
         * @param {string} value
         
        * @memberof ParentNode 
        * @instance 
        * @param value */
    }, {
        key: 'childNodes',
        get: function get() {
            return this._childNodes;
        }
    }, {
        key: 'parentNode',
        get: function get() {
            return this._parentNode || null;
        }
    }, {
        key: 'firstChild',
        get: function get() {
            return this._childNodes[0] || null;
        }

        /**
         * @type {Node|null}
         * @readonly
         
        * @memberof ParentNode 
        * @instance 
        * @member lastChild */
    }, {
        key: 'lastChild',
        get: function get() {
            return this._childNodes[this._childNodes.length - 1] || null;
        }

        /**
         * @type {Node|null}
         * @readonly
         
        * @memberof ParentNode 
        * @instance 
        * @member previousSibling */
    }, {
        key: 'previousSibling',
        get: function get() {
            var indexInParent = this.parentNode._childNodes.indexOf(this);
            if (indexInParent === -1) {
                throw new Error('Unexpected state: this node is not in the parent');
            }

            return indexInParent !== 0 && this.parentNode._childNodes[indexInParent - 1] || null;
        }

        /**
         * @type {Node|null}
         * @readonly
         
        * @memberof ParentNode 
        * @instance 
        * @member nextSibling */
    }, {
        key: 'nextSibling',
        get: function get() {
            var indexInParent = this.parentNode._childNodes.indexOf(this);
            if (indexInParent === -1) {
                throw new Error('Unexpected state: this node is not in the parent');
            }

            return this.parentNode._childNodes[indexInParent + 1] || null;
        }
    }, {
        key: 'innerHTML',
        get: function get() {
            return this._childNodes.reduce(function (value, node) {
                return value + node._toHTML();
            }, '');
        },

        /**
         * @ignore
         * @param {string} html
         
        * @memberof ParentNode 
        * @instance 
        * @param html */
        set: function set(html) {
            this._childNodes = [];
            this._updateCollections();
            (0, _parse2['default'])(html, this);
        }

        /**
         * @ignore
         * @return {string}
         
        * @memberof ParentNode 
        * @instance 
        * @member textContent */
    }, {
        key: 'textContent',
        get: function get() {
            return this._childNodes.reduce(function (value, node) {
                return value + node.textContent;
            }, '');
        },
        set: function set(value) {
            this._childNodes = [];
            this.appendChild(this._ownerDocument.createTextNode(value));
        }
    }]);

    return ParentNode;
})(_Node3['default']);

exports['default'] = ParentNode;
module.exports = exports['default'];
//# sourceMappingURL=ParentNode.js.map