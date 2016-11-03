/* global test */
'use strict';

var _Object$is = require('babel-runtime/core-js/object/is')['default'];

var _proclaim = require('proclaim');

var lib = '../../../../lib/';

var HTMLTableRow = require(lib + 'HTMLElement/elements/HTMLTableRowElement');
var Document = require(lib + 'Document');

test('HTMLTableRow should insert cells', function () {
    var elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    var cell = elt.insertCell();
    (0, _proclaim.ok)(_Object$is(elt.childNodes[0], cell));
});

test('HTMLTableRow should insert cells to given index', function () {
    var elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.insertCell();
    var cell = elt.insertCell(0);
    (0, _proclaim.ok)(_Object$is(elt.childNodes[0], cell));
});

test('HTMLTableRow should insert cells to end of list', function () {
    var elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.insertCell();
    elt.insertCell();
    var cell = elt.insertCell(1);
    (0, _proclaim.ok)(_Object$is(elt.childNodes[1], cell));
});

test('HTMLTableRow should not insert cells after end of list', function () {
    var elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.insertCell();
    elt.insertCell();
    (0, _proclaim.throws)(function () {
        elt.insertCell(10);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableRow should throw if index wrong', function () {
    var elt = new HTMLTableRow();
    (0, _proclaim.throws)(function () {
        elt.deleteCell(1);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableRow should delete cell', function () {
    var elt = new HTMLTableRow();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<td>1</td><td>2</td>';
    elt.deleteCell(0);
    (0, _proclaim.strictEqual)(elt.innerHTML, '<td>2</td>');
});

test('HTMLTableRow ch returns dot', function () {
    var elt = new HTMLTableRow();
    (0, _proclaim.strictEqual)(elt.ch, '.');
});

test('HTMLTableRow chOff returns 0', function () {
    var elt = new HTMLTableRow();
    (0, _proclaim.strictEqual)(elt.chOff, 0);
});

test('HTMLTableRow vAlign sets and gets', function () {
    var elt = new HTMLTableRow();
    elt.vAlign = 'top';
    (0, _proclaim.strictEqual)(elt.vAlign, 'top');
    elt.vAlign = 'no value';
    (0, _proclaim.strictEqual)(elt.vAlign, 'top');
    elt.vAlign = 'bottom';
    (0, _proclaim.strictEqual)(elt.vAlign, 'bottom');
});

test('HTMLTableRow align sets and gets', function () {
    var elt = new HTMLTableRow();
    elt.align = 'left';
    (0, _proclaim.strictEqual)(elt.align, 'left');
    elt.align = 'no value';
    (0, _proclaim.strictEqual)(elt.align, 'left');
    elt.align = 'right';
    (0, _proclaim.strictEqual)(elt.align, 'right');
});

test('HTMLTableRow sectionRowIndex returns -1 if no parent', function () {
    var elt = new HTMLTableRow();
    (0, _proclaim.strictEqual)(elt.sectionRowIndex, -1);
});

test('HTMLTableRow sectionRowIndex returns index within section', function () {
    var document = new Document();
    document.body.innerHTML = '<table><tr><td>First row</td></tr><tr id="test">Second row</tr></table>';
    var row = document.body.getElementById('test');
    (0, _proclaim.strictEqual)(row.sectionRowIndex, 1);
});

test('HTMLTableRow rowIndex returns -1 if no parent', function () {
    var elt = new HTMLTableRow();
    (0, _proclaim.strictEqual)(elt.rowIndex, -1);
});

test('HTMLTableRow rowIndex returns index within table', function () {
    var document = new Document();
    document.body.innerHTML = '<table><thead><tr><td>Header</td></tr></thead>' + '<tbody><tr><td>First row</td></tr><tr id="test">Second row</tr></tbody></table>';
    var row = document.body.getElementById('test');
    (0, _proclaim.strictEqual)(row.rowIndex, 2);
});

test('HTMLTableRow rowIndex returns index within table head', function () {
    var document = new Document();
    document.body.innerHTML = '<table><thead><tr id="test"><td>Header</td></tr></thead>' + '<tbody><tr><td>First row</td></tr><tr>Second row</tr></tbody></table>';
    var row = document.body.getElementById('test');
    (0, _proclaim.strictEqual)(row.rowIndex, 0);
});

test('HTMLTableRow rowIndex returns index within table foot', function () {
    var document = new Document();
    document.body.innerHTML = '<table><thead><tr><td>Header</td></tr></thead>' + '<tbody><tr><td>First row</td></tr><tr>Second row</tr></tbody>' + '<tfoot><tr id="test">Some test</tr></tfoot></table>';
    var row = document.body.getElementById('test');
    (0, _proclaim.strictEqual)(row.rowIndex, 3);
});
//# sourceMappingURL=HTMLTableRowElement.js.map