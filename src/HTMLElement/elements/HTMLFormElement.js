import HTMLElement from '../../HTMLElement';
import Event from '../../Event';

/**
 * The HTMLFormElement interface provides methods to create and modify <form> elements;
 * it inherits from properties and methods of the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
 */
export default class HTMLFormElement extends HTMLElement {
    /**
     * Gets or sets value of acceptCharset. Is a DOMString that reflects the accept-charset HTML attribute,
     * containing a list of character encodings that the server accepts.
     *
     * @type {string}
     */

    get acceptCharset() {
        if (this.hasAttribute('accept-charset')) {
            return this.getAttribute('accept-charset');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set acceptCharset(value) {
        this.setAttribute('accept-charset', value);
    }

    /**
     * Gets or sets value of action. Is a DOMString that reflects the action HTML attribute, containing the
     * URI of a program that processes the information submitted by the form.
     *
     * @type {string}
     */
    get action() {
        if (this.hasAttribute('action')) {
            return this.getAttribute('action');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set action(value) {
        this.setAttribute('action', value);
    }

    /**
     * Gets or sets value of action. Is a DOMString that reflects the autocomplete HTML attribute, containing a
     * string that indicates whether the controls in this form can have their values automatically
     * populated by the browser.
     *
     * @type {string}
     */
    get autocomplete() {
        if (this.hasAttribute('autocomplete')) {
            return this.getAttribute('autocomplete');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set autocomplete(value) {
        this.setAttribute('autocomplete', value);
    }

    /**
     * Returns a live HTMLFormControlsCollection containing all the form controls belonging to this form element.
     *
     * @type HTMLElement[]
     * @readonly
     */
    get elements() {
        const inputElements = ['input', 'select', 'button'];
        return this.children.filter(element => inputElements.indexOf(element.tagName) !== -1);
    }

    set elements(value) {
        throw new Error('elements is read only');
    }

    /**
     * Is a synonym for enctype.
     *
     * @type {string}
     */
    get encoding() {
        return this.enctype;
    }

    /**
     * @ignore
     * @param {string} value
     */
    set encoding(value) {
        this.enctype = value;
    }

    /**
     * Is a DOMString reflects the enctype HTML attribute, indicating the type of content that is used to transmit
     * the form to the server. Only specified values can be set.
     *
     * @type {string}
     */
    get enctype() {
        if (this.hasAttribute('enctype')) {
            return this.getAttribute('enctype');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set enctype(value) {
        this.setAttribute('enctype', value);
    }

    /**
     * Returns a long that represents the number of controls in the form.
     *
     * @type {number}
     * @readonly
     */
    get length() {
        return this.elements.length;
    }

    set length(value) {
        throw new Error('length is read only');
    }

    /**
     * Is a DOMString that reflects the method HTML attribute, indicating the HTTP method used to submit the form.
     * Only specified values can be set.
     *
     * @type {string}
     */
    get method() {
        if (this.hasAttribute('method')) {
            return this.getAttribute('method');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set method(value) {
        value = value.toLowerCase();
        if (value === 'post' || value === 'get') {
            this.setAttribute('method', value);
        }
    }

    /**
     * Is a DOMString that reflects the name HTML attribute, containing the name of the form.
     *
     * @type {string}
     */
    get name() {
        if (this.hasAttribute('name')) {
            return this.getAttribute('name');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set name(value) {
        this.setAttribute('name', value);
    }

    /**
     * Is a Boolean that reflects the novalidate HTML attribute, indicating that the form should not be validated.
     *
     * @type {boolean}
     */
    get noValidate() {
        return this.hasAttribute('novalidate');
    }

    /**
     * @ignore
     * @param {boolean} value
     */
    set noValidate(value) {
        if (value) {
            this.setAttribute('novalidate', true);
        } else {
            this.removeAttribute('novalidate');
        }
    }

    /**
     * Is a DOMString that reflects the target HTML attribute, indicating where to display the results
     * received from submitting the form.
     *
     * @type {string}
     */
    get target() {
        if (this.hasAttribute('target')) {
            return this.getAttribute('target');
        }

        return '';
    }

    /**
     * @ignore
     * @param {string} value
     */
    set target(value) {
        this.setAttribute('target', value);
    }

    /**
     * Submits the form to the server.
     */
    submit() {
        let event = new Event('submit');
        this.dispatchEvent(event);
    }

    /**
     * Resets the forms to its initial state.
     */
    reset() {
        let event = new Event('reset');
        this.dispatchEvent(event);

        if (!event.defaultPrevented) {
            this.elements.forEach(element => element.setAttribute('value', ''));
        }
    }
}

/**
 * @constant {string} HTMLMetaElement#nodeName meta
 */
Object.defineProperty(HTMLFormElement.prototype, 'nodeName', { value: 'form' });
