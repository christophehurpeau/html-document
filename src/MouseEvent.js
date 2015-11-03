import UIEvent from './UIEvent';
import extend from 'extend';

/**
 * The MouseEvent interface represents events that occur due to the user interacting with a pointing device
 * (such as a mouse). Common events using this interface include click, dblclick, mouseup, mousedown.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 */

export default class MouseEvent extends UIEvent {
    constructor(type, mouseEventInit) {
        mouseEventInit = extend(true, {
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
            region: null,
        }, mouseEventInit);
        super(type, mouseEventInit);

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
     */
    get altKey() {
        return this._altKey;
    }

    /**
     * The button number that was pressed when the mouse event was fired.
     *
     * @type {number}
     * @readonly
     */
    get button() {
        return this._button;
    }

    /**
     * The buttons being pressed when the mouse event was fired
     *
     * @type {number}
     * @readonly
     */
    get buttons() {
        return this._buttons;
    }

    /**
     * The X coordinate of the mouse pointer in local (DOM content) coordinates.
     *
     * @type {number}
     * @readonly
     */
    get clientX() {
        return this._clientX;
    }

    /**
     * The Y coordinate of the mouse pointer in local (DOM content) coordinates.
     *
     * @type {number}
     * @readonly
     */
    get clientY() {
        return this._clientY;
    }

    /**
     * Returns true if the ctrl key was down when the mouse event was fired.
     *
     * @type {boolean}
     * @readonly
     */
    get ctrlKey() {
        return this._ctrlKey;
    }

    /**
     * Returns true if the meta key was down when the mouse event was fired.
     *
     * @type {boolean}
     * @readonly
     */
    get metaKey() {
        return this._metaKey;
    }

    /**
     * Returns the id of the hit region affected by the event. If no hit region is affected, null is returned.
     *
     * @type {null|*}
     * @readonly
     */
    get region() {
        return this._region;
    }

    /**
     * The secondary target for the event, if there is one.
     *
     * @type {null|*}
     * @readonly
     */
    get relatedTarget() {
        return this._relatedTarget;
    }

    /**
     * The X coordinate of the mouse pointer in global (screen) coordinates.
     *
     * @type {number}
     * @readonly
     */
    get screenX() {
        return this._screenX;
    }

    /**
     * The Y coordinate of the mouse pointer in global (screen) coordinates.
     *
     * @type {number}
     * @readonly
     */
    get screenY() {
        return this._screenY;
    }

    /**
     * Returns true if the shift key was down when the mouse event was fired.
     *
     * @type {boolean}
     * @readonly
     */
    get shiftKey() {
        return this._shiftKey;
    }
}
