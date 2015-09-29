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

var _utilsCloneNodeHelper2 = _interopRequireDefault(_utilsCloneNodeHelper);

/**
 * The ParentNode interface contains methods that are particular to Node objects that can have children.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/ParentNode
 * @class ParentNode
 * @extends Node
 */
/** @class ParentNode */
var ParentNode = (function (_Node) {
    _inherits(ParentNode, _Node);

    function ParentNode() {
        _classCallCheck(this, ParentNode);

        _get(Object.getPrototypeOf(ParentNode.prototype), 'constructor', this).call(this);
        this._childNodes = [];
    }

    /**
     * TODO return {HTMLCollection}
     *
     * @member {String} ParentNode#childNodes
     * @readonly
     
    * @memberof ParentNode 
    * @instance */

    _createClass(ParentNode, [{
        key: '_childNodesRecursiveForEach',
        /** @memberof ParentNode 
        * @instance 
        * @method _childNodesRecursiveForEach 
        * @param callback */value: function _childNodesRecursiveForEach(callback) {
            this._childNodes.forEach( /** @function 
                                      * @param node */function (node) {
                callback(node);
                if (node instanceof ParentNode) {
                    node._childNodesRecursiveForEach(callback);
                }
            });
        }
    }, {
        key: '_childNodesRecursiveFind',
        /** @memberof ParentNode 
        * @instance 
        * @method _childNodesRecursiveFind 
        * @param callback */value: function _childNodesRecursiveFind(callback) {
            var result = undefined;
            this._childNodes.some( /** @function 
                                   * @param node */function (node) {
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
    }, {
        key: '_filterDescendantNodes',
        /** @memberof ParentNode 
        * @instance 
        * @method _filterDescendantNodes 
        * @param callback */value: function _filterDescendantNodes(callback) {
            var result = [];

            this._childNodesRecursiveForEach(function (node) {
                if (callback(node)) {
                    result.push(node);
                }
            });

            return result;
        }
    }, {
        key: '_childNodeFind',
        /** @memberof ParentNode 
        * @instance 
        * @method _childNodeFind 
        * @param callback */value: function _childNodeFind(callback) {
            var result = null;
            this._childNodes.some(function (node) {
                if (callback(node)) {
                    result = node;
                    return true;
                }
            });
            return result;
        }
    }, {
        key: 'cloneNode',
        /** @memberof ParentNode 
        * @instance 
        * @method cloneNode 
        * @param deep */value: function cloneNode(deep) {
            deep = deep || false;
            return (0, _utilsCloneNodeHelper2['default'])(this, deep);
        }

        /**
         * @member {Node|null} ParentNode#parentNode
         * @readonly
         
        * @memberof ParentNode 
        * @instance */
    }, {
        key: '_highestParent',

        /**
         * @returns {Node|null}
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
         * @param {String} nodeName
         * @returns {Node|null}
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
         * @member {Node|null} ParentNode#firstChild
         * @readonly
         
        * @memberof ParentNode 
        * @instance */
    }, {
        key: 'appendChild',

        /**
         * @method ParentNode#appendChild
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
            return child;
        }

        /**
         * @method ParentNode#replaceChild
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
            return oldChild;
        }

        /**
         * @method ParentNode#removeChild
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
            return toRemoveChild;
        }

        /**
         * @method ParentNode#insertBefore
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

            return child;
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
         * @ignore
         * @return {String}
         
        * @memberof ParentNode 
        * @instance 
        * @member innerHTML */
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
         * @member {Node|null} ParentNode#lastChild
         * @readonly
         
        * @memberof ParentNode 
        * @instance */
    }, {
        key: 'lastChild',
        get: function get() {
            return this._childNodes[this._childNodes.length - 1] || null;
        }

        /**
         * @member {Node|null} ParentNode#previousSibling
         * @readonly
         
        * @memberof ParentNode 
        * @instance */
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
         * @member {Node|null} ParentNode#nextSibling
         * @readonly
         
        * @memberof ParentNode 
        * @instance */
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
            return this._childNodes.reduce( /** @function 
                                            * @param value 
                                            * @param node */function (value, node) {
                return value + node._toHTML();
            }, '');
        },

        /**
         * @ignore
         * @param {String} html
         
        * @memberof ParentNode 
        * @instance 
        * @param html */
        set: function set(html) {
            this._childNodes = [];
            (0, _parse2['default'])(html, this);
        }

        /**
         * @ignore
         * @return {String}
         
        * @memberof ParentNode 
        * @instance 
        * @member textContent */
    }, {
        key: 'textContent',
        get: function get() {
            return this._childNodes.reduce( /** @function 
                                            * @param value 
                                            * @param node */function (value, node) {
                return value + node.textContent;
            }, '');
        }
    }]);

    return ParentNode;
})(_Node3['default']);

exports['default'] = ParentNode;
module.exports = exports['default'];
//# sourceMappingURL=ParentNode.js.map