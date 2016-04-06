import NamedNodeMap from './NamedNodeMap';
import Attr from './Attr';
/**
 * A Node is an interface from which a number of DOM types inherit,
 * and allows these various types to be treated (or tested) similarly.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/Node
 */
export default class Node {
    constructor() {
        this._attributes = new NamedNodeMap();
    }

    /**
     * Returns the Document that this node belongs to.
     * If no document is associated with it, returns null.
     *
     * @type {Document}
     * @readonly
     */
    get ownerDocument() {
        return this._ownerDocument || null;
    }

    /* ATTRIBUTES */

    /**
     * get attribute's value
     *
     * @param {string} attributeName
     * @return {string}
     */
    getAttribute(attributeName) {
        let attribute = this._attributes.getNamedItem(attributeName);
        return attribute ? attribute.value : null;
    }

    /**
     * checks if attribute exists for node
     *
     * @method Node#hasAttribute
     * @param {string} attributeName
     * @return {boolean}
     */
    hasAttribute(attributeName) {
        let attribute = this._attributes.getNamedItem(attributeName);
        return attribute ? true : false;
    }

    /**
     * set attribute's value
     *
     * @method Node#setAttribute
     * @param {string} attributeName
     * @param {string} attributeValue
     */
    setAttribute(attributeName, attributeValue) {
        this._setAttribute(attributeName, attributeValue);
        this._updatedAttribute(attributeName, attributeValue);
    }

    /**
     * set attribute's value
     *
     * @internal
     * @param {string} attributeName
     * @param {string} attributeValue
     */
    _setAttribute(attributeName, attributeValue) {
        const attribute = new Attr(attributeName, attributeValue);
        this._attributes.setNamedItem(attribute);
    }

    /**
     * remove attribute
     *
     * @param {string} attributeName
     */
    removeAttribute(attributeName) {
        let attribute = this._attributes.removeNamedItem(attributeName);
        if (attribute) {
            this._updatedAttribute(attributeName);
        }
    }

    /**
     * @internal
     * @param {string} attributeName
     * @param {string} [value]
     */
    _updatedAttribute(attributeName, value) {
    }

    /* CONTENT */

    /**
     * @type {string}
     */
    get textContent() {
        return '';
    }

    _toHTML() {
        return this.outerHTML;
    }

    /* EVENTS */

    /**
     * @param {string} eventType
     * @param {function} listener
     * @param {boolean} capturingPhase
     */
    addEventListener(eventType, listener, capturingPhase) {
        eventType = eventType.toLowerCase();
        const _eventsKey = capturingPhase ? '_eventsCapturingPhase' : '_eventsBubblingPhase';
        if (!this[_eventsKey]) {
            this[_eventsKey] = new Map();
        }

        let callbacks;
        if (!this[_eventsKey].has(eventType)) {
            this[_eventsKey].set(eventType, callbacks = []);
        } else {
            callbacks = this[_eventsKey].get(eventType);
        }

        callbacks.push(listener);
        return this;
    }

    /**
     * @param {string} eventType
     * @param {function} listener
     * @param {boolean} capturingPhase
     */
    removeEventListener(eventType, listener, capturingPhase) {
        eventType = eventType.toLowerCase();
        const _eventsKey = capturingPhase ? '_eventsCapturingPhase' : '_eventsBubblingPhase';
        if (this[_eventsKey] && this[_eventsKey].has(eventType)) {
            let callbacks = this[_eventsKey].get(eventType);
            let index = callbacks.indexOf(listener);
            if (index === -1) {
                return false;
            }

            callbacks.splice(index, 1);
        }
    }

    /**
     * @param {Event} event
     * @return {boolean}
     */
    dispatchEvent(event) {
        event.target = this;

        // Capturing phase
        const capturingPhase = function (event) { // eslint-disable-line space-before-function-paren
            if (this._parentNode) {
                capturingPhase.call(this._parentNode, event);
            }

            if (event.propagationStopped) {
                return;
            }

            const callbacks = this._eventsCapturingPhase && this._eventsCapturingPhase.get(event.type);
            if (callbacks) {
                callbacks.some(function (callback) { // eslint-disable-line space-before-function-paren
                    callback(event);
                    return event.immediatePropagationStopped;
                });
            }
        };

        capturingPhase.call(this, event);

        // Bubbling phase
        if (!event.propagationStopped) {
            const bubblingPhase = function (event) { // eslint-disable-line space-before-function-paren
                const callbacks = this._eventsBubblingPhase && this._eventsBubblingPhase.get(event.type);
                if (callbacks) {
                    callbacks.some(function (callback) { // eslint-disable-line space-before-function-paren
                        callback(event);
                        return event.immediatePropagationStopped;
                    });
                }

                if (!event.propagationStopped && this._parentNode) {
                    bubblingPhase.call(this._parentNode, event);
                }
            };

            bubblingPhase.call(this, event);
        }

        return !event.defaultPrevented;
    }

    /**
     * @property Node#nodeValue
     * @returns {string|null}
     */
    get nodeValue() {
        return null;
    }

    /**
     * @param {*} value
     */
    set nodeValue(value) {
    }
}

/**
 * @constant {number} Node.ELEMENT_NODE
 */
Object.defineProperty(Node, 'ELEMENT_NODE', { value: 1 });

/**
 * @constant {number} Node.ATTRIBUTE_NODE
 */
Object.defineProperty(Node, 'ATTRIBUTE_NODE', { value: 2 });

/**
 * @constant {number} Node.TEXT_NODE
 */
Object.defineProperty(Node, 'TEXT_NODE', { value: 3 });

/**
 * @constant {number} Node.CDATA_SECTION_NODE
 */
Object.defineProperty(Node, 'CDATA_SECTION_NODE', { value: 4 });

/**
 * @constant {number} Node.ENTITY_REFERENCE_NODE
 */
Object.defineProperty(Node, 'ENTITY_REFERENCE_NODE', { value: 5 });

/**
 * @constant {number} Node.ENTITY_NODE
 */
Object.defineProperty(Node, 'ENTITY_NODE', { value: 6 });

/**
 * @constant {number} Node.PROCESSING_INSTRUCTION_NODE
 */
Object.defineProperty(Node, 'PROCESSING_INSTRUCTION_NODE', { value: 7 });

/**
 * @constant {number} Node.COMMENT_NODE
 */
Object.defineProperty(Node, 'COMMENT_NODE', { value: 8 });

/**
 * @constant {number} Node.DOCUMENT_NODE
 */
Object.defineProperty(Node, 'DOCUMENT_NODE', { value: 9 });

/**
 * @constant {number} Node.DOCUMENT_TYPE_NODE
 */
Object.defineProperty(Node, 'DOCUMENT_TYPE_NODE', { value: 10 });

/**
 * @constant {number} Node.DOCUMENT_FRAGMENT_NODE
 */
Object.defineProperty(Node, 'DOCUMENT_FRAGMENT_NODE', { value: 11 });

/**
 * @constant {number} Node.NOTATION_NODE
 */
Object.defineProperty(Node, 'NOTATION_NODE', { value: 12 });
