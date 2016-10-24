import { strictEqual } from 'proclaim';
import { HTMLElement } from '../../../src';

suite('CSSStyleDeclaration', () => {
  test('set should update element', () => {
    let elt = new HTMLElement();

    elt.style.cssText = 'color: white; background: #FFF !important';
    strictEqual(elt.getAttribute('style'), 'color:white;background:#FFF!important;');
  });

  test('element setAttribute("style") should update style', () => {
    let elt = new HTMLElement();

    elt.setAttribute('style', 'color: white; background: #FFF !important');
    strictEqual(elt.style.cssText, 'color:white;background:#FFF!important;');
  });

  test('element removeAttribute("style") should update style', () => {
    let elt = new HTMLElement();

    elt.style.cssText = 'color: white; background: #FFF !important';
    elt.removeAttribute('style');
    strictEqual(elt.style.cssText, '');
  });
});
