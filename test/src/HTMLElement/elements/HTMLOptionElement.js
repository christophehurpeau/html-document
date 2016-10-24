import { strictEqual } from 'proclaim';
import { HTMLOptionElement } from '../../../../src';

suite('HTMLOptionElement', () => {
  test('HTMLOptionElement shoud have the nodeName == option ', () => {
    let elt = new HTMLOptionElement();
    strictEqual(elt.nodeName, 'option');
  });
});
