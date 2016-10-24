import HTMLElement from '../../HTMLElement';

/**
 * The HTMLMetaElement interface contains descriptive metadata about a document. It inherits all of the properties
 * and methods described in the HTMLElement interface.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMetaElement
 */
export default class HTMLMetaElement extends HTMLElement {
    /**
     * Gets or sets the value of meta-data property.
     *
     * @type {string}
     */
  get content() {
    if (this.hasAttribute('content')) {
      return this.getAttribute('content');
    }

    return '';
  }

    /**
     * @ignore
     * @param {string} value
     */
  set content(value) {
    this.setAttribute('content', value);
  }

    /**
     * Gets or sets the name of an HTTP response header to define for a document.
     *
     * @type {string}
     */
  get httpEquiv() {
    if (this.hasAttribute('http-equiv')) {
      return this.getAttribute('http-equiv');
    }

    return '';
  }

    /**
     * @ignore
     * @param {string} value
     */
  set httpEquiv(value) {
    this.setAttribute('http-equiv', value);
  }

    /**
     * Gets or sets the name of a meta-data property to define for a document.
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
}

/**
 * @constant {string} HTMLMetaElement#nodeName meta
 */
Object.defineProperty(HTMLMetaElement.prototype, 'nodeName', { value: 'meta' });

