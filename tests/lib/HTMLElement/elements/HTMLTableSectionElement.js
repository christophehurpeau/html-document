/* global test */
'use strict';

var _Object$is = require('babel-runtime/core-js/object/is')['default'];

var _proclaim = require('proclaim');

var lib = '../../../../lib/';

var HTMLTableSection = require(lib + 'HTMLElement/elements/HTMLTableSectionElement');
var Document = require(lib + 'Document');

test('HTMLTableSection should insert rows', function () {
    var elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    var row = elt.insertRow();
    (0, _proclaim.ok)(_Object$is(elt.childNodes[0], row));
});

test('HTMLTableSection should insert rows to given index', function () {
    var elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.insertRow();
    var row = elt.insertRow(0);
    (0, _proclaim.ok)(_Object$is(elt.childNodes[0], row));
});

test('HTMLTableSection should insert rows to end of list', function () {
    var elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.insertRow();
    elt.insertRow();
    var row = elt.insertRow(1);
    (0, _proclaim.ok)(_Object$is(elt.childNodes[1], row));
});

test('HTMLTableSection should not insert rows after end of list', function () {
    var elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.insertRow();
    elt.insertRow();
    (0, _proclaim.throws)(function () {
        elt.insertRow(10);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableSection should throw on deleteRow with wrong index', function () {
    var elt = new HTMLTableSection();
    (0, _proclaim.throws)(function () {
        elt.deleteRow(0);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableSection should delete on deleteRow with wrong index', function () {
    var elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<tr><td>1</td></tr><tr><td>2</td></tr>';
    elt.deleteRow(0);
    (0, _proclaim.strictEqual)(elt.innerHTML, '<tr><td>2</td></tr>');
});

test('HTMLTableRow align sets and gets', function () {
    var elt = new HTMLTableSection();
    elt.align = 'left';
    (0, _proclaim.strictEqual)(elt.align, 'left');
    elt.align = 'no value';
    (0, _proclaim.strictEqual)(elt.align, 'left');
    elt.align = 'right';
    (0, _proclaim.strictEqual)(elt.align, 'right');
});

test('HTMLTableRow ch returns dot', function () {
    var elt = new HTMLTableSection();
    (0, _proclaim.strictEqual)(elt.ch, '.');
});

test('HTMLTableRow chOff returns 0', function () {
    var elt = new HTMLTableSection();
    (0, _proclaim.strictEqual)(elt.chOff, 0);
});

test('HTMLTableRow vAlign sets and gets', function () {
    var elt = new HTMLTableSection();
    elt.vAlign = 'top';
    (0, _proclaim.strictEqual)(elt.vAlign, 'top');
    elt.vAlign = 'no value';
    (0, _proclaim.strictEqual)(elt.vAlign, 'top');
    elt.vAlign = 'bottom';
    (0, _proclaim.strictEqual)(elt.vAlign, 'bottom');
});
//# sourceMappingURL=HTMLTableSectionElement.js.map