'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _Event2 = require('./Event');

var _Event3 = _interopRequireDefault(_Event2);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

/**
 * The UIEvent interface represents simple user interface events.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent
 */

/** @class UIEvent 
* @param type 
* @param UIEventInit */
var UIEvent = (function (_Event) {
    _inherits(UIEvent, _Event);

    /**
     * The UIEvent() constructor creates a new UIEvent.
     *
     * @param {string} type - Is a DOMString representing the name of the event.
     * @param {Object} UIEventInit - Is a UIEventInit dictionary, having the following fields:
     *                              "detail", optional and defaulting to 0, of type long, that is a event-dependant
     *                              value associated with the event. UIEvent.detail lists the semantic for standard
     *                              events.
     *                              "view", optional and defaulting to null, of type WindowProxy, that is the Window
     *                              associated with the event.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/UIEvent
     */

    function UIEvent(type, UIEventInit) {
        _classCallCheck(this, UIEvent);

        UIEventInit = (0, _extend2['default'])(true, {
            detail: 0,
            view: global
        }, UIEventInit);

        _get(Object.getPrototypeOf(UIEvent.prototype), 'constructor', this).call(this, type, UIEventInit);

        this._detail = UIEventInit.detail;
        this._view = UIEventInit.view;
    }

    /**
     * The UIEvent.detail read-only property, when non-zero, provides the current (or next, depending on the event)
     * click count.
     *
     * @type {number}
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
     
    * @memberof UIEvent 
    * @instance 
    * @member detail */

    _createClass(UIEvent, [{
        key: 'detail',
        get: function get() {
            return this._detail;
        }

        /**
         * The UIEvent.view read-only property returns the WindowProxy object from which the event was generated.
         * In browsers, this is the Window object the event happened in.
         *
         * @type {Object}
         
        * @memberof UIEvent 
        * @instance 
        * @member view */
    }, {
        key: 'view',
        get: function get() {
            return this._view;
        }
    }]);

    return UIEvent;
})(_Event3['default']);

exports['default'] = UIEvent;
module.exports = exports['default'];
//# sourceMappingURL=UIEvent.js.map