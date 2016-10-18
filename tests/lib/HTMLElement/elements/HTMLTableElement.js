/* global test */
'use strict';

var _proclaim = require('proclaim');

var lib = '../../../../lib/';

var HTMLTableElement = require(lib + 'HTMLElement/elements/HTMLTableElement');
var HTMLTableSection = require(lib + 'HTMLElement/elements/HTMLTableSectionElement');
var Document = require(lib + 'Document');
var DOMException = require(lib + 'DOMException');

test('HTMLTableElement should have the nodeName == table ', function () {
    var elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.strictEqual)(elt.nodeName, 'table');
});

test('HTMLTableElement caption property', function () {
    var elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.isNull)(elt.caption);
    var caption = elt.createCaption();
    (0, _proclaim.strictEqual)(elt.caption, caption);
    elt.deleteCaption();
    (0, _proclaim.isNull)(elt.caption);
});

test('HTMLTableElement tHead property', function () {
    var elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.isNull)(elt.tHead);
    var head = elt.createTHead();
    (0, _proclaim.strictEqual)(elt.tHead, head);
    elt.deleteTHead();
    (0, _proclaim.isNull)(elt.tHead);
});

test('HTMLTableElement tFoot property', function () {
    var elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.isNull)(elt.tFoot);
    var head = elt.createTFoot();
    (0, _proclaim.strictEqual)(elt.tFoot, head);
    elt.deleteTFoot();
    (0, _proclaim.isNull)(elt.tFoot);
});

test('HTMLTableElement rows property', function () {
    var elt = new HTMLTableElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.strictEqual)(elt.rows.length, 0);
    var row = elt.insertRow();
    (0, _proclaim.strictEqual)(elt.rows.length, 1);
    (0, _proclaim.strictEqual)(elt.tBodies.length, 1);
    (0, _proclaim.strictEqual)(elt.rows[0], row);
});

test('HTMLTableElement import HTML table', function () {
    var document = new Document();
    var div = document.createElement('div');
    div.innerHTML = '<table><tr><td>Some value</td></tr></table>';
    var table = div.querySelector('table');
    (0, _proclaim.strictEqual)(table.tagName, 'table');
    (0, _proclaim.strictEqual)(table.rows.length, 1);
    (0, _proclaim.strictEqual)(table.tBodies.length, 1);
    (0, _proclaim.isNull)(table.caption);
});

test('HTMLTableElement outerHTML property', function () {
    var document = new Document();
    var table = document.createElement('table');
    var caption = table.createCaption();
    caption.innerHTML = 'Test';
    var thead = table.createTHead();
    var row = thead.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = 'Head cell';
    (0, _proclaim.strictEqual)(table.outerHTML, '<table><caption>Test</caption><thead><tr><td>Head cell</td></tr></thead></table>');
});

test('HTMLTableElement outerHTML property and right caption create', function () {
    var document = new Document();
    var table = document.createElement('table');
    var thead = table.createTHead();
    var row = thead.insertRow();
    var cell = row.insertCell();
    cell.innerHTML = 'Head cell';
    var caption = table.createCaption();
    caption.innerHTML = 'Test';
    (0, _proclaim.strictEqual)(table.outerHTML, '<table><caption>Test</caption><thead><tr><td>Head cell</td></tr></thead></table>');
});

test('HTMLTableElement throw when setting wrong caption', function () {
    var document = new Document();
    var elt = new HTMLTableElement();
    elt._ownerDocument = document;
    var span = document.createElement('span');
    (0, _proclaim.throws)(function () {
        return elt.caption = span;
    }, DOMException);
});

test('HTMLTableElement set tHead', function () {
    var document = new Document();
    document.body.innerHTML = '<table><caption>Some caption</caption><tbody>' + '<tr><td>Some cell</td></tr></tbody></table>';
    var table = document.body.firstChild;
    table.tHead = document.createElement('thead');
    (0, _proclaim.strictEqual)(table.outerHTML, '<table><caption>Some caption</caption><thead></thead>' + '<tbody><tr><td>Some cell</td></tr></tbody></table>');
});

test('HTMLTableElement should create HTMLTableSection for tbody tag', function () {
    var document = new Document();
    document.body.innerHTML = '<table><tbody><tr><td>Some cell</td></tr></tbody></table>';
    var table = document.body.firstChild;
    var tBody = table.tBodies[0];
    (0, _proclaim.isInstanceOf)(tBody, HTMLTableSection);
});

test('HTMLTableElement should return arrays for rows and cells', function () {
    var document = new Document();
    document.body.innerHTML = '<table><tbody>' + '<tr><td>Some cell</td><td>Some cell</td></tr>' + '<tr><td>Some cell</td><td>Some cell</td></tr></tbody></table>';
    var table = document.body.firstChild;
    var tBody = table.tBodies[0];
    (0, _proclaim.strictEqual)(tBody.rows.length, 2);
    (0, _proclaim.strictEqual)(tBody.rows[1].cells.length, 2);
});
//# sourceMappingURL=HTMLTableElement.js.map