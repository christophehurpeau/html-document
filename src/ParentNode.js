import Node from './Node';
import parse from './parse';
import {cloneAnyNode} from './utils/cloneNodeHelper';
import HTMLCollection from './utils/HTMLCollection';

/**
 * The ParentNode interface contains methods that are particular to Node objects that can have children.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/ParentNode
 */
export default class ParentNode extends Node {
    constructor() {
        super();
        this._childNodes = [];
        this._childCollections = [];
    }

    /**
     * TODO return {HTMLCollection}
     *
     * @type {Node[]}
     * @readonly
     */
    get childNodes() {
        return this._childNodes;
    }

    /**
     * @param callback
     * @private
     */
    _childNodesRecursiveForEach(callback) {
        this._childNodes.forEach(node => {
            callback(node);
            if (node instanceof ParentNode) {
                node._childNodesRecursiveForEach(callback);
            }
        });
    }

    /**
     * @param callback
     * @private
     */
    _childNodesRecursiveFind(callback) {
        let result;
        this._childNodes.some(node => {
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
     */
    _filterDescendantNodes(callback) {
        let result = [];

        this._childNodesRecursiveForEach(node => {
            if (callback(node)) {
                result.push(node);
            }
        });

        return result;
    }

    /**
     * @param callback
     * @private
     */
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

    /**
     * Inner method to create new live HTMLCollection.
     *
     * @protected
     */
    _createCollection(selector) {
        const collection = new HTMLCollection(this, selector);
        this._childCollections.push(collection);
        return collection;
    }

    /**
     * Inner method to update all collections in this element and
     * it's parent.
     *
     * @private
     */
    _updateCollections() {
        this._childCollections.forEach(collection => collection._update());
        if (this.parentNode !== null) {
            this.parentNode._updateCollections();
        }
    }

    /**
     * @type {Node|null}
     * @readonly
     */
    get parentNode() {
        return this._parentNode || null;
    }

    /**
     * @return {Node|null}
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
     * @param {string} nodeName
     * @return {Node|null}
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
     * Method returns true if node has child nodes.
     *
     * @returns {boolean}
     */
    hasChildNodes() {
        return this._childNodes && this._childNodes.length > 0;
    }

    /**
     * @type {Node|null}
     * @readonly
     */
    get firstChild() {
        return this._childNodes[0] || null;
    }

    /**
     * @type {Node|null}
     * @readonly
     */
    get lastChild() {
        return this._childNodes[this._childNodes.length - 1] || null;
    }

    /**
     * @type {Node|null}
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
     * @type {Node|null}
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
        this._updateCollections();
        return child;
    }

    /**
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
        this._updateCollections();
        return oldChild;
    }

    /**
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
        this._updateCollections();
        return toRemoveChild;
    }

    /**
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

        this._updateCollections();
        return child;
    }

    /**
     * @ignore
     * @return {string}
     */
    get innerHTML() {
        return this._childNodes.reduce((value, node) => value + node._toHTML(), '');
    }

    /**
     * @ignore
     * @param {string} html
     */
    set innerHTML(html) {
        this._childNodes = [];
        this._updateCollections();
        parse(html, this);
    }

    /**
     * @ignore
     * @return {string}
     */
    get textContent() {
        return this._childNodes.reduce((value, node) => value + node.textContent, '');
    }

    /**
     * Clone a Node, and optionally, all of its contents. By default, it clones the content of the node.
     *
     * @param {boolean} deep
     * @returns {Node}
     */
    cloneNode(deep = false) {
        return cloneAnyNode(this, deep);
    }

    /**
     * @ignore
     * @param {string} value
     */
    set textContent(value) {
        this._childNodes = [];
        this.appendChild(this._ownerDocument.createTextNode(value));
    }
}
