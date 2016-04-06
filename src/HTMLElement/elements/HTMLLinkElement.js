import HTMLElement from '../../HTMLElement';
import Url from '../../utils/Url';

/**
 * The HTMLLinkElement interface represents reference information for external resources and the relationship of those
 * resources to a document and vice-versa. This object inherits all of the properties and methods of the
 * HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement
 * @class HTMLLinkElement
 */
export default class HTMLLinkElement extends HTMLElement {
    constructor() {
        super();
        this._href = new Url();
    }
    /**
     * @inheritDoc
     */
    setAttribute(key, value) {
        super.setAttribute(key, value);
        if (key === 'href') {
            this.href = value;
        }
    }

    /**
     * Is a DOMString that reflects the href HTML attribute, containing a valid URL of a linked resource.
     *
     * @member {string} HTMLLinkElement#href
     * @returns {string}
     */
    get href() {
        return this._href.toString();
    }

    /**
     * @param {string} value
     */
    set href(value) {
        this._href.href = value;
        this._setAttribute('href', this._href.toString());

        if (this._href.protocol === '' && this.ownerDocument) {
            this._href.protocol = this.ownerDocument.location.protocol;
        }

        if (this._href.protocol !== 'javascript:' && // eslint-disable-line no-script-url
            this._href.host === '' &&
            this.ownerDocument) {
            this._href.host = this.ownerDocument.location.host;
        }
    }

    /**
     * Gets or sets the forward relationship of the linked resource from the document to the resource.
     *
     * @member {string} HTMLLinkElement#rel
     * @returns {string}
     */
    get rel() {
        return this.getAttribute('rel');
    }

    /**
     * @param {string} value
     */
    set rel(value) {
        this.setAttribute('rel', value);
    }

    /**
     * Gets or sets whether the link is disabled; currently only used with style sheet links.
     *
     * @member {boolean} HTMLLinkElement#disabled
     * @returns {boolean}
     */
    get disabled() {
        return this.hasAttribute('disabled');
    }

    /**
     * @param {boolean} value
     */
    set disabled(value) {
        if (value !== null) {
            this.setAttribute('disabled');
        } else {
            this.removeAttribute('disabled');
        }
    }

    /**
     * Gets or sets the language code for the linked resource.
     *
     * @member {string} HTMLLinkElement#hreflang
     * @returns {string}
     */
    get hreflang() {
        return this.getAttribute('hreflang');
    }

    /**
     * @param {string} value
     */
    set hreflang(value) {
        this.setAttribute('hreflang', value);
    }

    /**
     * Gets or sets a list of one or more media formats to which the resource applies.
     *
     * @member {string} HTMLLinkElement#media
     * @returns {string}
     */
    get media() {
        return this.getAttribute('media');
    }

    /**
     * @param {string} value
     */
    set media(value) {
        this.setAttribute('media', value);
    }

    /**
     * Gets or sets the MIME type of the linked resource.
     *
     * @member {string} HTMLLinkElement#type
     * @returns {string}
     */
    get type() {
        return this.getAttribute('type');
    }

    /**
     * @param {string} value
     */
    set type(value) {
        this.setAttribute('type', value);
    }
}

/**
 * @constant {string} HTMLLinkElement#nodeName option
 */
Object.defineProperty(HTMLLinkElement.prototype, 'nodeName', { value: 'link' });

