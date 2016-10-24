'use strict';

var _assert = require('assert');

var _ = require('../..');

/* global suite, test */
const document = new _.Document();

suite('parse', () => {
  test('parse innerHTML', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span data-test="test">content</span>';
    (0, _assert.strictEqual)(div.innerHTML, '<span></span><span data-test="test">content</span>');
  });

  test('parse nodeText', () => {
    const div = document.createElement('div');
    div.innerHTML = 'content';
    (0, _assert.strictEqual)(div.childNodes.length, 1);
    (0, _assert.strictEqual)(div.innerHTML, 'content');
  });
});
//# sourceMappingURL=parse.js.map