'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _NamedNodeMap = require('./NamedNodeMap');

var _NamedNodeMap2 = _interopRequireDefault(_NamedNodeMap);

var _Attr = require('./Attr');

var _Attr2 = _interopRequireDefault(_Attr);

/**
 * A Node is an interface from which a number of DOM types inherit,
 * and allows these various types to be treated (or tested) similarly.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/Node
 */
/** @class Node */
var Node = (function () {
    function Node() {
        _classCallCheck(this, Node);

        this._attributes = new _NamedNodeMap2['default']();
    }

    /**
     * @constant {number} Node.ELEMENT_NODE
     */

    /**
     * Returns the Document that this node belongs to.
     * If no document is associated with it, returns null.
     *
     * @type {Document}
     * @readonly
     
    * @memberof Node 
    * @instance 
    * @member ownerDocument */

    _createClass(Node, [{
        key: 'getAttribute',

        /* ATTRIBUTES */

        /**
         * get attribute's value
         *
         * @param {string} attributeName
         * @return {string}
         
        * @memberof Node 
        * @instance 
        * @method getAttribute 
        * @param attributeName */
        value: function getAttribute(attributeName) {
            var attribute = this._attributes.getNamedItem(attributeName);
            return attribute ? attribute.value : null;
        }

        /**
         * checks if attribute exists for node
         *
         * @method Node#hasAttribute
         * @param {string} attributeName
         * @return {boolean}
         
        * @memberof Node 
        * @instance 
        * @method hasAttribute 
        * @param attributeName */
    }, {
        key: 'hasAttribute',
        value: function hasAttribute(attributeName) {
            var attribute = this._attributes.getNamedItem(attributeName);
            return attribute ? true : false;
        }

        /**
         * set attribute's value
         *
         * @method Node#setAttribute
         * @param {string} attributeName
         * @param {string} attributeValue
         
        * @memberof Node 
        * @instance 
        * @method setAttribute 
        * @param attributeName 
        * @param attributeValue */
    }, {
        key: 'setAttribute',
        value: function setAttribute(attributeName, attributeValue) {
            this._setAttribute(attributeName, attributeValue);
            this._updatedAttribute(attributeName, attributeValue);
        }

        /**
         * set attribute's value
         *
         * @internal
         * @param {string} attributeName
         * @param {string} attributeValue
         
        * @memberof Node 
        * @instance 
        * @method _setAttribute 
        * @param attributeName 
        * @param attributeValue */
    }, {
        key: '_setAttribute',
        value: function _setAttribute(attributeName, attributeValue) {
            var attribute = new _Attr2['default'](attributeName, attributeValue);
            this._attributes.setNamedItem(attribute);
        }

        /**
         * remove attribute
         *
         * @param {string} attributeName
         
        * @memberof Node 
        * @instance 
        * @method removeAttribute 
        * @param attributeName */
    }, {
        key: 'removeAttribute',
        value: function removeAttribute(attributeName) {
            var attribute = this._attributes.removeNamedItem(attributeName);
            if (attribute) {
                this._updatedAttribute(attributeName);
            }
        }

        /**
         * @internal
         * @param {string} attributeName
         * @param {string} [value]
         
        * @memberof Node 
        * @instance 
        * @method _updatedAttribute 
        * @param attributeName 
        * @param value */
    }, {
        key: '_updatedAttribute',
        value: function _updatedAttribute(attributeName, value) {}

        /* CONTENT */

        /**
         * @type {string}
         
        * @memberof Node 
        * @instance 
        * @member textContent */
    }, {
        key: '_toHTML',
        /** @memberof Node 
        * @instance 
        * @method _toHTML */value: function _toHTML() {
            return this.outerHTML;
        }

        /* EVENTS */

        /**
         * @param {string} eventType
         * @param {function} listener
         * @param {boolean} capturingPhase
         
        * @memberof Node 
        * @instance 
        * @method addEventListener 
        * @param eventType 
        * @param listener 
        * @param capturingPhase */
    }, {
        key: 'addEventListener',
        value: function addEventListener(eventType, listener, capturingPhase) {
            eventType = eventType.toLowerCase();
            var _eventsKey = capturingPhase ? '_eventsCapturingPhase' : '_eventsBubblingPhase';
            if (!this[_eventsKey]) {
                this[_eventsKey] = new _Map();
            }

            var callbacks = undefined;
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
         
        * @memberof Node 
        * @instance 
        * @method removeEventListener 
        * @param eventType 
        * @param listener 
        * @param capturingPhase */
    }, {
        key: 'removeEventListener',
        value: function removeEventListener(eventType, listener, capturingPhase) {
            eventType = eventType.toLowerCase();
            var _eventsKey = capturingPhase ? '_eventsCapturingPhase' : '_eventsBubblingPhase';
            if (this[_eventsKey] && this[_eventsKey].has(eventType)) {
                var callbacks = this[_eventsKey].get(eventType);
                var index = callbacks.indexOf(listener);
                if (index === -1) {
                    return false;
                }

                callbacks.splice(index, 1);
            }
        }

        /**
         * @param {Event} event
         * @return {boolean}
         
        * @memberof Node 
        * @instance 
        * @method dispatchEvent 
        * @param event */
    }, {
        key: 'dispatchEvent',
        value: function dispatchEvent(event) {
            var _this = this;

            event.target = this;

            // Capturing phase
            var capturingPhase = /** @function 
                                 * @param event */function capturingPhase(event) {
                // eslint-disable-line space-before-function-paren
                if (this._parentNode) {
                    capturingPhase.call(this._parentNode, event);
                }

                if (event.propagationStopped) {
                    return;
                }

                var callbacks = this._eventsCapturingPhase && this._eventsCapturingPhase.get(event.type);
                if (callbacks) {
                    callbacks.some( /** @function 
                                    * @param callback */function (callback) {
                        // eslint-disable-line space-before-function-paren
                        callback(event);
                        return event.immediatePropagationStopped;
                    });
                }
            };

            capturingPhase.call(this, event);

            // Bubbling phase
            if (!event.propagationStopped) {
                (function () {
                    var bubblingPhase = /** @function 
                                        * @param event */function bubblingPhase(event) {
                        // eslint-disable-line space-before-function-paren
                        var callbacks = this._eventsBubblingPhase && this._eventsBubblingPhase.get(event.type);
                        if (callbacks) {
                            callbacks.some( /** @function 
                                            * @param callback */function (callback) {
                                // eslint-disable-line space-before-function-paren
                                callback(event);
                                return event.immediatePropagationStopped;
                            });
                        }

                        if (!event.propagationStopped && this._parentNode) {
                            bubblingPhase.call(this._parentNode, event);
                        }
                    };

                    bubblingPhase.call(_this, event);
                })();
            }

            return !event.defaultPrevented;
        }

        /**
         * @property Node#nodeValue
         * @returns {string|null}
         
        * @memberof Node 
        * @instance 
        * @member nodeValue */
    }, {
        key: 'ownerDocument',
        get: function get() {
            return this._ownerDocument || null;
        }
    }, {
        key: 'textContent',
        get: function get() {
            return '';
        }
    }, {
        key: 'nodeValue',
        get: function get() {
            return null;
        },

        /**
         * @param {*} value
         
        * @memberof Node 
        * @instance 
        * @param value */
        set: function set(value) {}
    }]);

    return Node;
})();

exports['default'] = Node;
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
module.exports = exports['default'];
//# sourceMappingURL=Node.js.map