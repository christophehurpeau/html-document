'use strict';

var _proclaim = require('proclaim');

var _ = require('../../..');

suite('ClassList', () => {
  test('add single class', () => {
    let elt = new _.HTMLElement();

    elt.classList.add('test');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test');
    (0, _proclaim.strictEqual)(elt.classList.length, 1);
  });

  test('add existing class', () => {
    let elt = new _.HTMLElement();

    elt.classList.add('test');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test');
    elt.classList.add('test');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test');
  });

  test('add multiple class', () => {
    let elt = new _.HTMLElement();

    elt.classList.add('test', 'test2', 'test');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test test2');
    (0, _proclaim.strictEqual)(elt.classList.length, 2);
  });

  test('remove class', () => {
    let elt = new _.HTMLElement();

    elt.classList.add('test');
    elt.classList.remove('test');
    (0, _proclaim.strictEqual)(elt.classList.length, 0);
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), '');
  });

  test('remove multiple class', () => {
    let elt = new _.HTMLElement();

    elt.classList.add('test', 'test3', 'test4');
    elt.classList.remove('test2', 'test3', 'test5');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test test4');
  });

  test('toggle', () => {
    let elt = new _.HTMLElement();

    elt.classList.toggle('test');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test');
    elt.classList.toggle('test');
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), '');
  });

  test('toggle, force', () => {
    let elt = new _.HTMLElement();

    elt.classList.toggle('test', true);
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test');
    elt.classList.toggle('test', true);
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), 'test');
    elt.classList.toggle('test', false);
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), '');
    elt.classList.toggle('test', false);
    (0, _proclaim.strictEqual)(elt.getAttribute('class'), '');
  });

  test('contains', () => {
    let elt = new _.HTMLElement();

    (0, _proclaim.strictEqual)(elt.classList.contains('test'), false);
    elt.classList.add('test');
    (0, _proclaim.strictEqual)(elt.classList.contains('test'), true);
  });
});
//# sourceMappingURL=ClassList.js.map