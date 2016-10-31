/* global test */
import { throws, ok, strictEqual } from 'proclaim';

const lib = '../../../../lib/';

const HTMLTableRow = require(lib + 'HTMLElement/elements/HTMLTableRowElement');
const Document = require(lib + 'Document');

test('HTMLTableRow should insert cells', () => {
    const elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    const cell = elt.insertCell();
    ok(Object.is(elt.childNodes[0], cell));
});

test('HTMLTableRow should insert cells to given index', () => {
    const elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.insertCell();
    const cell = elt.insertCell(0);
    ok(Object.is(elt.childNodes[0], cell));
});

test('HTMLTableRow should insert cells to end of list', () => {
    const elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.insertCell();
    elt.insertCell();
    const cell = elt.insertCell(1);
    ok(Object.is(elt.childNodes[1], cell));
});

test('HTMLTableRow should not insert cells after end of list', () => {
    const elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.insertCell();
    elt.insertCell();
    throws(() => {
        elt.insertCell(10);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableRow should throw if index wrong', () => {
    const elt = new HTMLTableRow();
    throws(() => {
        elt.deleteCell(1);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableRow should delete cell', () => {
    const elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<td>1</td><td>2</td>';
    elt.deleteCell(0);
    strictEqual(elt.innerHTML, '<td>2</td>');
});

test('HTMLTableRow ch returns dot', () => {
    const elt = new HTMLTableRow();
    strictEqual(elt.ch, '.');
});

test('HTMLTableRow chOff returns 0', () => {
    const elt = new HTMLTableRow();
    strictEqual(elt.chOff, 0);
});

test('HTMLTableRow vAlign sets and gets', () => {
    const elt = new HTMLTableRow();
    elt.vAlign = 'top';
    strictEqual(elt.vAlign, 'top');
    elt.vAlign = 'no value';
    strictEqual(elt.vAlign, 'top');
    elt.vAlign = 'bottom';
    strictEqual(elt.vAlign, 'bottom');
});

test('HTMLTableRow align sets and gets', () => {
    const elt = new HTMLTableRow();
    elt.align = 'left';
    strictEqual(elt.align, 'left');
    elt.align = 'no value';
    strictEqual(elt.align, 'left');
    elt.align = 'right';
    strictEqual(elt.align, 'right');
});

test('HTMLTableRow sectionRowIndex returns -1 if no parent', () => {
    const elt = new HTMLTableRow();
    strictEqual(elt.sectionRowIndex, -1);
});

test('HTMLTableRow sectionRowIndex returns index within section', () => {
    const document = new Document();
    document.body.innerHTML = '<table><tr><td>First row</td></tr><tr id="test">Second row</tr></table>';
    const row = document.body.getElementById('test');
    strictEqual(row.sectionRowIndex, 1);
});

test('HTMLTableRow rowIndex returns -1 if no parent', () => {
    const elt = new HTMLTableRow();
    strictEqual(elt.rowIndex, -1);
});

test('HTMLTableRow rowIndex returns index within table', () => {
    const document = new Document();
    document.body.innerHTML = '<table><thead><tr><td>Header</td></tr></thead>' +
        '<tbody><tr><td>First row</td></tr><tr id="test">Second row</tr></tbody></table>';
    const row = document.body.getElementById('test');
    strictEqual(row.rowIndex, 2);
});

test('HTMLTableRow rowIndex returns index within table head', () => {
    const document = new Document();
    document.body.innerHTML = '<table><thead><tr id="test"><td>Header</td></tr></thead>' +
        '<tbody><tr><td>First row</td></tr><tr>Second row</tr></tbody></table>';
    const row = document.body.getElementById('test');
    strictEqual(row.rowIndex, 0);
});

test('HTMLTableRow rowIndex returns index within table foot', () => {
    const document = new Document();
    document.body.innerHTML = '<table><thead><tr><td>Header</td></tr></thead>' +
        '<tbody><tr><td>First row</td></tr><tr>Second row</tr></tbody>' +
        '<tfoot><tr id="test">Some test</tr></tfoot></table>';
    const row = document.body.getElementById('test');
    strictEqual(row.rowIndex, 3);
});
