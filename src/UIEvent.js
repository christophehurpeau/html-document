import Event from './Event';
import extend from 'extend';

/**
 * The UIEvent interface represents simple user interface events.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent
 */

export default class UIEvent extends Event {
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
    constructor(type, UIEventInit) {
        UIEventInit = extend(true, {
            detail: 0,
            view: global,
        }, UIEventInit);

        super(type, UIEventInit);

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
     */
    get detail() {
        return this._detail;
    }

    /**
     * The UIEvent.view read-only property returns the WindowProxy object from which the event was generated.
     * In browsers, this is the Window object the event happened in.
     *
     * @type {Object}
     */
    get view() {
        return this._view;
    }
}
