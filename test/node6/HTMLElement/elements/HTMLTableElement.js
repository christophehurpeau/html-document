'use strict';

var _proclaim = require('proclaim');

var _ = require('../../../..');

suite('HTMLTableElement', () => {
  test('should have the nodeName == table ', () => {
    let elt = new _.HTMLTableElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.strictEqual)(elt.nodeName, 'table');
  });

  test('caption property', () => {
    let elt = new _.HTMLTableElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.isNull)(elt.caption);
    let caption = elt.createCaption();
    (0, _proclaim.strictEqual)(elt.caption, caption);
    elt.deleteCaption();
    (0, _proclaim.isNull)(elt.caption);
  });

  test('tHead property', () => {
    let elt = new _.HTMLTableElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.isNull)(elt.tHead);
    let head = elt.createTHead();
    (0, _proclaim.strictEqual)(elt.tHead, head);
    elt.deleteTHead();
    (0, _proclaim.isNull)(elt.tHead);
  });

  test('tFoot property', () => {
    let elt = new _.HTMLTableElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.isNull)(elt.tFoot);
    let head = elt.createTFoot();
    (0, _proclaim.strictEqual)(elt.tFoot, head);
    elt.deleteTFoot();
    (0, _proclaim.isNull)(elt.tFoot);
  });

  test('rows property', () => {
    let elt = new _.HTMLTableElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.strictEqual)(elt.rows.length, 0);
    let row = elt.insertRow();
    (0, _proclaim.strictEqual)(elt.rows.length, 1);
    (0, _proclaim.strictEqual)(elt.tBodies.length, 1);
    (0, _proclaim.strictEqual)(elt.rows[0], row);
  });

  test('import HTML table', () => {
    const document = new _.Document();
    let div = document.createElement('div');
    div.innerHTML = '<table><tr><td>Some value</td></tr></table>';
    let table = div.querySelector('table');
    (0, _proclaim.strictEqual)(table.tagName, 'table');
    (0, _proclaim.strictEqual)(table.rows.length, 1);
    (0, _proclaim.strictEqual)(table.tBodies.length, 1);
    (0, _proclaim.isNull)(table.caption);
  });

  test('outerHTML property', () => {
    const document = new _.Document();
    let table = document.createElement('table');
    let caption = table.createCaption();
    caption.innerHTML = 'Test';
    let thead = table.createTHead();
    let row = thead.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = 'Head cell';
    (0, _proclaim.strictEqual)(table.outerHTML, '<table><caption>Test</caption><thead><tr><td>Head cell</td></tr></thead></table>');
  });

  test('outerHTML property and right caption create', () => {
    const document = new _.Document();
    let table = document.createElement('table');
    let thead = table.createTHead();
    let row = thead.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = 'Head cell';
    let caption = table.createCaption();
    caption.innerHTML = 'Test';
    (0, _proclaim.strictEqual)(table.outerHTML, '<table><caption>Test</caption><thead><tr><td>Head cell</td></tr></thead></table>');
  });

  test('throw when setting wrong caption', () => {
    let document = new _.Document();
    let elt = new _.HTMLTableElement();
    elt._ownerDocument = document;
    let span = document.createElement('span');
    (0, _proclaim.throws)(() => elt.caption = span, _.DOMException);
  });

  test('set tHead', () => {
    let document = new _.Document();
    document.body.innerHTML = '<table><caption>Some caption</caption><tbody><tr><td>Some cell</td></tr></tbody></table>';
    let table = document.body.firstChild;
    table.tHead = document.createElement('thead');
    (0, _proclaim.strictEqual)(table.outerHTML, '<table><caption>Some caption</caption><thead></thead><tbody><tr><td>Some cell</td></tr></tbody></table>');
  });
});
//# sourceMappingURL=HTMLTableElement.js.map