import HTMLElement from '../../HTMLElement';
import Url from '../../utils/Url';

/**
 * The HTMLAnchorElement interface represents hyperlink elements and provides special properties and methods
 * (beyond those of the regular HTMLElement object interface they also have available to them by inheritance)
 * for manipulating the layout and presentation of such elements.
 *
 * @see https://developer.mozilla.org/en/docs/Web/API/HTMLAnchorElement
 * @class HTMLAnchorElement
 */
export default class HTMLAnchorElement extends HTMLElement {
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
     * @member {string} HTMLAnchorElement#href
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

    if (this.protocol === '' && this.ownerDocument) {
      this._href.protocol = this.ownerDocument.location.protocol;
    }

    if (this.protocol !== 'javascript:' && // eslint-disable-line no-script-url
            this.host === '' &&
            this.ownerDocument) {
      this._href.host = this.ownerDocument.location.host;
    }
  }

    /**
     * Is a DOMString representing the fragment identifier, including the leading hash mark ('#'), if any, in the
     * referenced URL.
     *
     * @member {string} HTMLAnchorElement#hash
    * @returns {string}
     */
  get hash() {
    return this._href.hash;
  }

    /**
     * @param {string} value
     */
  set hash(value) {
    if (this.href === '' ||
            value === null ||
            this._href.protocol === 'javascript:') { // eslint-disable-line no-script-url
      return;
    }

    if (value === '') {
      value = null;
    } else {
      value = value.replace(/^#/, '');
    }

    this._href.hash = value;
    this._setAttribute('href', this._href.toString());
  }

    /**
     * Is a DOMString representing the hostname and port (if it's not the default port) in the referenced URL.
     *
     * @member {string} HTMLAnchorElement#host
     * @returns {string}
     */
  get host() {
    return this._href.host;
  }

    /**
     * @param {string} value
     */
  set host(value) {
    this._href.host = value;
    this._setAttribute('href', this._href.toString());
  }

    /**
     * Is a DOMString representing the hostname in the referenced URL.
     *
     * @member {string} HTMLAnchorElement#hostname
     * @returns {string}
     */
  get hostname() {
    return this._href.hostname;
  }

    /**
     * @param {string} value
     */
  set hostname(value) {
    this._href.hostname = value;
    this._setAttribute('href', this._href.toString());
  }

    /**
     * Is a DOMString that reflects the rel HTML attribute, specifying the relationship of the target object to the
     * linked object.
     *
     * @member {string} HTMLAnchorElement#rel
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
     * Is a DOMString representing the path name component, if any, of the referenced URL.
     *
     * @member {string} HTMLAnchorElement#pathname
     * @returns {string}
     */
  get pathname() {
    return this._href.pathname;
  }

    /**
     * @param {string} value
     */
  set pathname(value) {
    this._href.pathname = value;
    this._setAttribute('href', this._href.toString());
  }

    /**
     * Is a DOMString representing the protocol component, including trailing colon (':'), of the referenced URL.
     *
     * @member {string} HTMLAnchorElement#protocol
     * @returns {string}
     */
  get protocol() {
    return this._href.protocol;
  }

    /**
     * @param {string} value
     */
  set protocol(value) {
    this._href.protocol = value;
    this._setAttribute('href', this._href.toString());
  }
}

/**
 * @constant {string} HTMLAnchorElement#nodeName option
 */
Object.defineProperty(HTMLAnchorElement.prototype, 'nodeName', { value: 'a' });
