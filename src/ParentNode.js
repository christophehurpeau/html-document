import Node from './Node';
import parse from './parse';
import cloneNodeHelper from './utils/cloneNodeHelper';

/**
 * The ParentNode interface contains methods that are particular to Node objects that can have children.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/ParentNode
 * @class ParentNode
 * @extends Node
 */
export default class ParentNode extends Node {
    constructor() {
        super();
        this._childNodes = [];
    }

    /**
     * TODO return {HTMLCollection}
     *
     * @member {String} ParentNode#childNodes
     * @readonly
     */
    get childNodes() {
        return this._childNodes;
    }

    _childNodesRecursiveForEach(callback) {
        this._childNodes.forEach(function(node) {
            callback(node);
            if (node instanceof ParentNode) {
                node._childNodesRecursiveForEach(callback);
            }
        });
    }

    _childNodesRecursiveFind(callback) {
        let result;
        this._childNodes.some(function(node) {
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

    _filterDescendantNodes(callback) {
        let result = [];

        this._childNodesRecursiveForEach(node => {
            if (callback(node)) {
                result.push(node);
            }
        });

        return result;
    }

    _childNodeFind(callback) {
        let result = null;
        this._childNodes.some(node => {
            if (callback(node)) {
                result = node;
                return true;
            }
        });
        return result;
    }

    cloneNode(deep) {
        deep = deep || false;
        return cloneNodeHelper(this, deep);
    }

    /**
     * @member {Node|null} ParentNode#parentNode
     * @readonly
     */
    get parentNode() {
        return this._parentNode || null;
    }

    /**
     * @returns {Node|null}
     * @private
     */
    _highestParent() {
        let node = this._parentNode;

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
     */
    _closestParent(nodeName) {
        let node = this._parentNode;

        while (node != null && node.nodeName !== nodeName) {
            node = node._parentNode;
        }

        return node;
    }

    /**
     * @member {Node|null} ParentNode#firstChild
     * @readonly
     */
    get firstChild() {
        return this._childNodes[0] || null;
    }

    /**
     * @member {Node|null} ParentNode#lastChild
     * @readonly
     */
    get lastChild() {
        return this._childNodes[this._childNodes.length - 1] || null;
    }

    /**
     * @member {Node|null} ParentNode#previousSibling
     * @readonly
     */
    get previousSibling() {
        const indexInParent = this.parentNode._childNodes.indexOf(this);
        if (indexInParent === -1) {
            throw new Error('Unexpected state: this node is not in the parent');
        }

        return indexInParent !== 0 && this.parentNode._childNodes[indexInParent - 1] || null;
    }

    /**
     * @member {Node|null} ParentNode#nextSibling
     * @readonly
     */
    get nextSibling() {
        const indexInParent = this.parentNode._childNodes.indexOf(this);
        if (indexInParent === -1) {
            throw new Error('Unexpected state: this node is not in the parent');
        }

        return this.parentNode._childNodes[indexInParent + 1] || null;
    }

    /**
     * @method ParentNode#appendChild
     * @param {Node} child
     * @return {Node}
     */
    appendChild(child) {
        if (!(child instanceof Node)) {
            throw new Error('Trying to add non node element');
        }

        if (child._parentNode) {
            child._parentNode.removeChild(child);
        }

        if (child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            let childNode;

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
     */
    replaceChild(newChild, oldChild) {
        const index = this._childNodes.indexOf(oldChild);
        if (index === -1) {
            throw new Error('Node was not found');
        }

        if (newChild._parentNode) {
            newChild._parentNode.removeChild(newChild);
        }

        if (newChild.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            const newChildren = [];
            let childNode;

            while (childNode = newChild.firstChild) {
                newChild.removeChild(childNode);
                childNode._parentNode = this;
                newChildren.push(childNode);
            }

            this._childNodes.splice(index, 1, ...newChildren);
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
     */
    removeChild(toRemoveChild) {
        const index = this._childNodes.indexOf(toRemoveChild);
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
     */
    insertBefore(child, existingChild) {
        const index = this._childNodes.indexOf(existingChild);
        if (index === -1) {
            throw new Error('Node was not found');
        }

        if (child._parentNode) {
            child._parentNode.removeChild(child);
        }

        if (child.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            const children = [];
            let childNode;

            while (childNode = child.firstChild) {
                child.removeChild(childNode);
                childNode._parentNode = this;
                children.push(childNode);
            }

            this._childNodes.splice(index, 0, ...children);
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
     */
    hasChildNodes() {
        return this._childNodes && this._childNodes.length > 0;
    }

    /**
     * @ignore
     * @return {String}
     */
    get innerHTML() {
        return this._childNodes.reduce(function(value, node) {
            return value + node._toHTML();
        }, '');
    }

    /**
     * @ignore
     * @param {String} html
     */
    set innerHTML(html) {
        this._childNodes = [];
        parse(html, this);
    }

    /**
     * @ignore
     * @return {String}
     */
    get textContent() {
        return this._childNodes.reduce(function(value, node) {
            return value + node.textContent;
        }, '');
    }
}
