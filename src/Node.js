/**
 * A Node is an interface from which a number of DOM types inherit,
 * and allows these various types to be treated (or tested) similarly.
 *
  * @see https://developer.mozilla.org/en/docs/Web/API/Node
 */
export default class Node {
    constructor() {
        this._attributes = {};
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
     * @method Node#getAttribute
     * @param {String} attributeName
     * @return {String}
     */
    getAttribute(attributeName) {
        return attributeName in this._attributes ? this._attributes[attributeName] : null;
    }

    /**
     * checks if attribute exists for node
     *
     * @method Node#hasAttribute
     * @param {String} attributeName
     * @returns {boolean}
     */
    hasAttribute(attributeName) {
        return attributeName in this._attributes;
    }

    /**
     * set attribute's value
     *
     * @method Node#setAttribute
     * @param {String} attributeName
     * @param {String} attributeValue
     */
    setAttribute(attributeName, attributeValue) {
        this._setAttribute(attributeName, attributeValue);
        this._updatedAttribute(attributeName, this._attributes[attributeName]);
    }

    /**
     * set attribute's value
     *
     * @internal
     * @param {String} attributeName
     * @param {String} attributeValue
     */
    _setAttribute(attributeName, attributeValue) {
        this._attributes[attributeName] = String(attributeValue);
    }

    /**
     * remove attribute
     *
     * @method Node#removeAttribute
     * @param {String} attributeName
     */
    removeAttribute(attributeName) {
        if (this._attributes[attributeName] !== undefined) {
            delete this._attributes[attributeName];
            this._updatedAttribute(attributeName);
        }
    }

    /**
     * @internal
     * @param {String} attributeName
     * @param {String} [value]
     */
    _updatedAttribute(attributeName, value) {
    }

    /* CONTENT */

    /**
     * @property Node#textContent
     * @return {String}
     */
    get textContent() {
        return '';
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
    set nodeValue(value) {}

    _toHTML() {
        return this.outerHTML;
    }

    /* EVENTS */

    /**
     * @property Node#addEventListener
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
     * @method Node#addEventListener
     * @param {string} eventType
     * @param {function} listener
     * @param {boolean} capturingPhase
     */
    removeEventListener(eventType, listener, capturingPhase) {
        eventType = eventType.toLowerCase();
        const _eventsKey = capturingPhase ? '_eventsCapturingPhase' : '_eventsBubblingPhase';
        if (this[_eventsKey] && this[_eventsKey].has(eventType)) {
            let callbacks = this[_eventsKey].get(eventType);
            let i = callbacks.indexOf(listener);
            if (i === -1) {
                return false;
            }

            callbacks.splice(i, 1);
        }
    }

    /**
     * @method Node#dispatchEvent
     * @param {Event} event
     * @return {boolean}
     */
    dispatchEvent(event) {
        event.target = this;

        // Capturing phase
        const capturingPhase = function(event) {
            if (this._parentNode) {
                capturingPhase.call(this._parentNode, event);
            }

            if (event.propagationStopped) {
                return;
            }

            const callbacks = this._eventsCapturingPhase && this._eventsCapturingPhase.get(event.type);
            if (callbacks) {
                callbacks.some(function(callback) {
                    callback(event);
                    return event.immediatePropagationStopped;
                });
            }
        };

        capturingPhase.call(this, event);

        // Bubbling phase
        if (!event.propagationStopped) {
            const bubblingPhase = function(event) {
                const callbacks = this._eventsBubblingPhase && this._eventsBubblingPhase.get(event.type);
                if (callbacks) {
                    callbacks.some(function(callback) {
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
