'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

suite('HTLMElement', () => {
  test('Element dataset code using', () => {
    const document = new _.Document();
    let element = document.createElement('i');
    element.dataset.value = 5;
    (0, _proclaim.strictEqual)(element.dataset.value, 5);
  });

  test('Element dataset markup using', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b data-attr="some value"></b>';
    let element = document.body.firstChild;
    (0, _proclaim.strictEqual)(element.dataset.attr, 'some value');
  });

  test('Element dataset markup using', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b data-attr-long-name="some value"></b>';
    let element = document.body.firstChild;
    (0, _proclaim.strictEqual)(element.dataset.attrLongName, 'some value');
  });
});
//# sourceMappingURL=HTMLElement.js.map