import HTMLElement from '../../HTMLElement';

export default class HTMLLinkElement extends HTMLElement {
    /**
     * Gets or sets the character encoding for the target resource.
     *
     * @member {string} HTMLLinkElement#charset
     * @returns {string}
     */
    get charset() {
        return this.hasAttribute('charset') ? this.getAttribute('charset') : '';
    }

    /**
     * @param {string} value
     */
    set charset(value) {
        this.setAttribute('charset', value);
    }

    /**
     * Gets or sets whether the link is disabled; currently only used with style sheet links.
     *
     * @member {boolean} HTMLLinkElement#disabled
     * @returns {boolean}
     */
    get disabled() {
        return this.hasAttribute('disabled') ? this.getAttribute('disabled') !== 'false' : false;
    }

    /**
     * @param {boolean} value
     */
    set disabled(value) {
        if (!value) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', 'disabled');
        }
    }

    /**
     * Gets or sets the URI for the target resource.
     *
     * @member {string} HTMLLinkElement#href
     * @returns {string}
     */
    get href() {
        return this.hasAttribute('href') ? this.getAttribute('href') : '';
    }

    /**
     * @param {string} value
     * @todo Provide URL extension to full version
     */
    set href(value) {
        this.setAttribute('href', value);
    }

    /**
     * Gets or sets the language code for the linked resource.
     *
     * @member {string} HTMLLinkElement#hreflang
     * @returns {string}
     */
    get hreflang() {
        return this.hasAttribute('hreflang') ? this.getAttribute('hreflang') : '';
    }

    /**
     * @param {string} value
     */
    set hreflang(value) {
        this.setAttribute('hreflang', value);
    }

    /**
     * Gets or sets the forward relationship of the linked resource from the document to the resource.
     *
     * @member {string} HTMLLinkElement#rel
     * @returns {string}
     */
    get rel() {
        return this.hasAttribute('rel') ? this.getAttribute('rel') : '';
    }

    /**
     * @param {string} value
     */
    set rel(value) {
        this.setAttribute('rel', value);
    }
}

/**
 * @constant {string} HTMLLinkElement#nodeName option
 */
Object.defineProperty(HTMLLinkElement.prototype, 'nodeName', { value: 'link' });

