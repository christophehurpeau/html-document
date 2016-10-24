'use strict';

var _proclaim = require('proclaim');

var _ = require('../../../..');

suite('HTMLOptionElement', () => {
  test('HTMLOptionElement shoud have the nodeName == option ', () => {
    let elt = new _.HTMLOptionElement();
    (0, _proclaim.strictEqual)(elt.nodeName, 'option');
  });
});
//# sourceMappingURL=HTMLOptionElement.js.map