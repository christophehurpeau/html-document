import AbstractCSSStyleDeclaration from '../Abstract/AbstractCSSStyleDeclaration';

/**
 * @see https://developer.mozilla.org/en/docs/Web/API/CSSStyleDeclaration
 */
export default class CSSStyleDeclaration extends AbstractCSSStyleDeclaration {
    /**
     * @param {HTMLElement} element
     */
  constructor(element) {
    super();
    this._element = element;
  }

  _stringify() {
    super._stringify();
    this._element._setAttribute('style', this.cssText);
  }
}
