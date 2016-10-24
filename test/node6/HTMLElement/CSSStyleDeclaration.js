'use strict';

var _proclaim = require('proclaim');

var _ = require('../../..');

suite('CSSStyleDeclaration', () => {
  test('set should update element', () => {
    let elt = new _.HTMLElement();

    elt.style.cssText = 'color: white; background: #FFF !important';
    (0, _proclaim.strictEqual)(elt.getAttribute('style'), 'color:white;background:#FFF!important;');
  });

  test('element setAttribute("style") should update style', () => {
    let elt = new _.HTMLElement();

    elt.setAttribute('style', 'color: white; background: #FFF !important');
    (0, _proclaim.strictEqual)(elt.style.cssText, 'color:white;background:#FFF!important;');
  });

  test('element removeAttribute("style") should update style', () => {
    let elt = new _.HTMLElement();

    elt.style.cssText = 'color: white; background: #FFF !important';
    elt.removeAttribute('style');
    (0, _proclaim.strictEqual)(elt.style.cssText, '');
  });
});
//# sourceMappingURL=CSSStyleDeclaration.js.map