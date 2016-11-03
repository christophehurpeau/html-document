/* global test */
import { throws, ok, strictEqual } from 'proclaim';

const lib = '../../../../lib/';

const HTMLTableSection = require(lib + 'HTMLElement/elements/HTMLTableSectionElement');
const Document = require(lib + 'Document');

test('HTMLTableSection should insert rows', () => {
    const elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    const row = elt.insertRow();
    ok(Object.is(elt.childNodes[0], row));
});

test('HTMLTableSection should insert rows to given index', () => {
    const elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.insertRow();
    const row = elt.insertRow(0);
    ok(Object.is(elt.childNodes[0], row));
});

test('HTMLTableSection should insert rows to end of list', () => {
    const elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.insertRow();
    elt.insertRow();
    const row = elt.insertRow(1);
    ok(Object.is(elt.childNodes[1], row));
});

test('HTMLTableSection should not insert rows after end of list', () => {
    const elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.insertRow();
    elt.insertRow();
    throws(() => {
        elt.insertRow(10);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableSection should throw on deleteRow with wrong index', () => {
    const elt = new HTMLTableSection();
    throws(() => {
        elt.deleteRow(0);
    }, 'The index is not in the allowed range.');
});

test('HTMLTableSection should delete on deleteRow with wrong index', () => {
    const elt = new HTMLTableSection();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<tr><td>1</td></tr><tr><td>2</td></tr>';
    elt.deleteRow(0);
    strictEqual(elt.innerHTML, '<tr><td>2</td></tr>');
});

test('HTMLTableRow align sets and gets', () => {
    const elt = new HTMLTableSection();
    elt.align = 'left';
    strictEqual(elt.align, 'left');
    elt.align = 'no value';
    strictEqual(elt.align, 'left');
    elt.align = 'right';
    strictEqual(elt.align, 'right');
});

test('HTMLTableRow ch returns dot', () => {
    const elt = new HTMLTableSection();
    strictEqual(elt.ch, '.');
});

test('HTMLTableRow chOff returns 0', () => {
    const elt = new HTMLTableSection();
    strictEqual(elt.chOff, 0);
});

test('HTMLTableRow vAlign sets and gets', () => {
    const elt = new HTMLTableSection();
    elt.vAlign = 'top';
    strictEqual(elt.vAlign, 'top');
    elt.vAlign = 'no value';
    strictEqual(elt.vAlign, 'top');
    elt.vAlign = 'bottom';
    strictEqual(elt.vAlign, 'bottom');
});
