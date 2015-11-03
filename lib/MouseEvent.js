'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _UIEvent2 = require('./UIEvent');

var _UIEvent3 = _interopRequireDefault(_UIEvent2);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

/**
 * The MouseEvent interface represents events that occur due to the user interacting with a pointing device
 * (such as a mouse). Common events using this interface include click, dblclick, mouseup, mousedown.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 */

/** @class MouseEvent 
* @param type 
* @param mouseEventInit */
var MouseEvent = (function (_UIEvent) {
    _inherits(MouseEvent, _UIEvent);

    function MouseEvent(type, mouseEventInit) {
        _classCallCheck(this, MouseEvent);

        mouseEventInit = (0, _extend2['default'])(true, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            shiftKey: false,
            altKey: false,
            metaKey: false,
            button: 0,
            buttons: 0,
            relatedTarget: null,
            region: null
        }, mouseEventInit);
        _get(Object.getPrototypeOf(MouseEvent.prototype), 'constructor', this).call(this, type, mouseEventInit);

        this._screenX = mouseEventInit.screenX;
        this._screenY = mouseEventInit.screenY;
        this._clientX = mouseEventInit.clientX;
        this._clientY = mouseEventInit.clientY;
        this._ctrlKey = mouseEventInit.ctrlKey;
        this._shiftKey = mouseEventInit.shiftKey;
        this._altKey = mouseEventInit.altKey;
        this._metaKey = mouseEventInit.metaKey;
        this._button = mouseEventInit.button;
        this._buttons = mouseEventInit.buttons;
        this._relatedTarget = mouseEventInit.relatedTarget;
        this._region = mouseEventInit.region;
    }

    /**
     * Returns true if the alt key was down when the mouse event was fired.
     *
     * @type {boolean}
     * @readonly
     
    * @memberof MouseEvent 
    * @instance 
    * @member altKey */

    _createClass(MouseEvent, [{
        key: 'altKey',
        get: function get() {
            return this._altKey;
        }

        /**
         * The button number that was pressed when the mouse event was fired.
         *
         * @type {number}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member button */
    }, {
        key: 'button',
        get: function get() {
            return this._button;
        }

        /**
         * The buttons being pressed when the mouse event was fired
         *
         * @type {number}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member buttons */
    }, {
        key: 'buttons',
        get: function get() {
            return this._buttons;
        }

        /**
         * The X coordinate of the mouse pointer in local (DOM content) coordinates.
         *
         * @type {number}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member clientX */
    }, {
        key: 'clientX',
        get: function get() {
            return this._clientX;
        }

        /**
         * The Y coordinate of the mouse pointer in local (DOM content) coordinates.
         *
         * @type {number}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member clientY */
    }, {
        key: 'clientY',
        get: function get() {
            return this._clientY;
        }

        /**
         * Returns true if the ctrl key was down when the mouse event was fired.
         *
         * @type {boolean}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member ctrlKey */
    }, {
        key: 'ctrlKey',
        get: function get() {
            return this._ctrlKey;
        }

        /**
         * Returns true if the meta key was down when the mouse event was fired.
         *
         * @type {boolean}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member metaKey */
    }, {
        key: 'metaKey',
        get: function get() {
            return this._metaKey;
        }

        /**
         * Returns the id of the hit region affected by the event. If no hit region is affected, null is returned.
         *
         * @type {null|*}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member region */
    }, {
        key: 'region',
        get: function get() {
            return this._region;
        }

        /**
         * The secondary target for the event, if there is one.
         *
         * @type {null|*}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member relatedTarget */
    }, {
        key: 'relatedTarget',
        get: function get() {
            return this._relatedTarget;
        }

        /**
         * The X coordinate of the mouse pointer in global (screen) coordinates.
         *
         * @type {number}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member screenX */
    }, {
        key: 'screenX',
        get: function get() {
            return this._screenX;
        }

        /**
         * The Y coordinate of the mouse pointer in global (screen) coordinates.
         *
         * @type {number}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member screenY */
    }, {
        key: 'screenY',
        get: function get() {
            return this._screenY;
        }

        /**
         * Returns true if the shift key was down when the mouse event was fired.
         *
         * @type {boolean}
         * @readonly
         
        * @memberof MouseEvent 
        * @instance 
        * @member shiftKey */
    }, {
        key: 'shiftKey',
        get: function get() {
            return this._shiftKey;
        }
    }]);

    return MouseEvent;
})(_UIEvent3['default']);

exports['default'] = MouseEvent;
module.exports = exports['default'];
//# sourceMappingURL=MouseEvent.js.map