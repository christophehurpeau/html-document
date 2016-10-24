import { parse as urlParse, format as urlFormat } from 'url';

/**
 * Helper class providing URLUtils object implementation. Used in document.location, HTMLAnchorElement etc.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/URLUtils
 */
export default class Url {
    /**
     * Creates object using given value as start url.
     *
     * @param {string} url - url to parse.
     */
  constructor(url) {
    url = url || 'about:blank';
    this._data = urlParse(url);
  }

    /**
     * @returns {string} - string representation of Url (Full URI)
     */
  toString() {
    return urlFormat(this._data);
  }

    /**
     * Is a DOMString containing the whole URL.
     *
     * @type {string}
     */
  get href() {
    return this.toString();
  }

    /**
     * @ignore
     * @param {string} value
     */
  set href(value) {
    value = value || 'about:blank';
    this._data = urlParse(value);
  }

    /**
     * Is a DOMString containing the protocol scheme of the URL, including the final ':'.
     *
     * @type {string}
     */
  get protocol() {
    if (this._data.protocol === null) {
      return '';
    }

    return this._data.protocol;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set protocol(value) {
    if (!value.endsWith(':')) {
      value += ':';
    }

    this._data.protocol = value;
  }

    /**
     * Is a DOMString containing the host, that is the hostname, and then, if the port of the URL is not empty
     * (which can happen because it was not specified or because it was specified to be the default port of the
     * URL's scheme), a ':', and the port of the URL.
     *
     * @type {string}
     */
  get host() {
    if (this._data.host === null) {
      return '';
    }

    return this._data.host;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set host(value) {
    let tmpUrl = urlParse(`//${value}`, false, true);
    this._data.host = tmpUrl.host;
    this._data.hostname = tmpUrl.hostname;
    this._data.port = tmpUrl.port;
  }

    /**
     * The authentication information portion of a URL.
     *
     * @type {string}
     */
  get auth() {
    if (this._data.auth === null || this._data.auth === undefined) {
      return '';
    }

    return this._data.auth;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set auth(value) {
    this._data.auth = value;
  }

    /**
     * Is a DOMString containing the domain of the URL.
     *
     * @type {string}
     */
  get hostname() {
    if (this._data.hostname === null) {
      return '';
    }

    return this._data.hostname;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set hostname(value) {
    this._data.hostname = value;
    delete this._data.host;
    this.href = urlFormat(this._data);
  }

    /**
     * Is a DOMString containing the port number of the URL.
     *
     * @returns {string}
     */
  get port() {
    if (this._data.port === null || this._data.port === undefined) {
      switch (this._data.protocol) {
        case 'http:':
          return '80';
        case 'https:':
          return '443';
        case 'ftp:':
          return '21';
      }
      return '';
    }

    return this._data.port;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set port(value) {
    value = parseInt(value, 10);
    if (isNaN(value)) {
      value = '';
    }

    this._data.port = value;
    delete this._data.host;
    this.href = urlFormat(this._data);
  }

    /**
     * Is a DOMString containing an initial '/' followed by the path of the URL.
     *
     * @returns {string}
     */
  get pathname() {
    return this._data.pathname;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set pathname(value) {
    this._data.pathname = value;
  }

    /**
     * Is a DOMString containing a '?' followed by the parameters of the URL.
     *
     * @returns {string}
     */
  get search() {
    if (this._data.search === null) {
      return '';
    }

    return this._data.search;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set search(value) {
    this._data.search = value;
  }

    /**
     * Is a DOMString containing a '#' followed by the fragment identifier of the URL.
     *
     * @type {string}
     */
  get hash() {
    if (this._data.hash === null) {
      return '#';
    }

    return this._data.hash;
  }

    /**
     * @ignore
     * @param {string} value
     */
  set hash(value) {
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }

    this._data.hash = value;
  }

    /**
     * Is a DOMString containing the username specified before the domain name.
     *
     * @type {string}
     */
  get username() {
    if (this.auth !== '') {
      if (this.auth.indexOf(':') !== -1) {
        return this.auth.split(':')[0];
      } else {
        return this.auth;
      }
    }

    return '';
  }

    /**
     * @ignore
     * @param {string} value
     */
  set username(value) {
    if (this.auth !== '') {
      let password = this.auth.split(':')[1];
      this.auth = `${value}:${password}`;
    } else {
      this.auth = value;
    }
  }

    /**
     * Is a DOMString containing the password specified before the domain name.
     *
     * @type {string}
     */
  get password() {
    if (this.auth !== '' && this.auth.indexOf(':') !== -1) {
      return this.auth.split(':')[1];
    }

    return '';
  }

    /**
     * @ignore
     * @param {string} value
     */
  set password(value) {
    if (this.auth !== '') {
      let name = this.auth.split(':')[0];
      this.auth = `${name}:${value}`;
    } else {
      this.auth = `:${value}`;
    }
  }

    /**
     * Return 'params' part of href as object.
     *
     * @type {Object}
     */
  get searchParams() {
    let tempUrl = urlParse(this.href, true);
    return tempUrl.query;
  }
}
