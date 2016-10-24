import { strictEqual, isNull, throws } from 'proclaim';
import { Document, HTMLTableElement, DOMException } from '../../../../src';

suite('HTMLTableElement', () => {
  test('should have the nodeName == table ', () => {
    let elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    strictEqual(elt.nodeName, 'table');
  });

  test('caption property', () => {
    let elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    isNull(elt.caption);
    let caption = elt.createCaption();
    strictEqual(elt.caption, caption);
    elt.deleteCaption();
    isNull(elt.caption);
  });

  test('tHead property', () => {
    let elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    isNull(elt.tHead);
    let head = elt.createTHead();
    strictEqual(elt.tHead, head);
    elt.deleteTHead();
    isNull(elt.tHead);
  });

  test('tFoot property', () => {
    let elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    isNull(elt.tFoot);
    let head = elt.createTFoot();
    strictEqual(elt.tFoot, head);
    elt.deleteTFoot();
    isNull(elt.tFoot);
  });

  test('rows property', () => {
    let elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    strictEqual(elt.rows.length, 0);
    let row = elt.insertRow();
    strictEqual(elt.rows.length, 1);
    strictEqual(elt.tBodies.length, 1);
    strictEqual(elt.rows[0], row);
  });

  test('import HTML table', () => {
    const document = new Document();
    let div = document.createElement('div');
    div.innerHTML = '<table><tr><td>Some value</td></tr></table>';
    let table = div.querySelector('table');
    strictEqual(table.tagName, 'table');
    strictEqual(table.rows.length, 1);
    strictEqual(table.tBodies.length, 1);
    isNull(table.caption);
  });

  test('outerHTML property', () => {
    const document = new Document();
    let table = document.createElement('table');
    let caption = table.createCaption();
    caption.innerHTML = 'Test';
    let thead = table.createTHead();
    let row = thead.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = 'Head cell';
    strictEqual(table.outerHTML, '<table><caption>Test</caption><thead><tr><td>Head cell</td></tr></thead></table>');
  });

  test('outerHTML property and right caption create', () => {
    const document = new Document();
    let table = document.createElement('table');
    let thead = table.createTHead();
    let row = thead.insertRow();
    let cell = row.insertCell();
    cell.innerHTML = 'Head cell';
    let caption = table.createCaption();
    caption.innerHTML = 'Test';
    strictEqual(table.outerHTML, '<table><caption>Test</caption><thead><tr><td>Head cell</td></tr></thead></table>');
  });

  test('throw when setting wrong caption', () => {
    let document = new Document();
    let elt = new HTMLTableElement();
    elt._ownerDocument = document;
    let span = document.createElement('span');
    throws(() => elt.caption = span, DOMException);
  });

  test('set tHead', () => {
    let document = new Document();
    document.body.innerHTML = '<table><caption>Some caption</caption><tbody>' +
                              '<tr><td>Some cell</td></tr></tbody></table>';
    let table = document.body.firstChild;
    table.tHead = document.createElement('thead');
    strictEqual(table.outerHTML, '<table><caption>Some caption</caption><thead></thead>' +
                                 '<tbody><tr><td>Some cell</td></tr></tbody></table>');
  });
});
