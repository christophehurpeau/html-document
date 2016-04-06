/* global test */
'use strict';

var _proclaim = require('proclaim');

var lib = '../../../../lib/';

var HTMLFormElement = require(lib + 'HTMLElement/elements/HTMLFormElement');
var Document = require(lib + 'Document');

test('HTMLFormElement should have the nodeName == form ', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.strictEqual)(elt.nodeName, 'form');
});

test('document.createElement should create object', function () {
    var document = new Document();
    var meta = document.createElement('form');
    (0, _proclaim.ok)(meta instanceof HTMLFormElement);
});

test('Should set and get acceptCharset', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.acceptCharset, '');

    elt.acceptCharset = 'utf-8';
    (0, _proclaim.strictEqual)(elt.getAttribute('accept-charset'), 'utf-8');

    elt.setAttribute('accept-charset', 'koi8-r');
    (0, _proclaim.strictEqual)(elt.acceptCharset, 'koi8-r');
});

test('Should set and get action', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.action, '');

    elt.action = 'some';
    (0, _proclaim.strictEqual)(elt.getAttribute('action'), 'some');

    elt.setAttribute('action', 'other');
    (0, _proclaim.strictEqual)(elt.action, 'other');
});

test('Should set and get autocomplete', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.autocomplete, '');

    elt.autocomplete = 'yes';
    (0, _proclaim.strictEqual)(elt.getAttribute('autocomplete'), 'yes');

    elt.setAttribute('autocomplete', 'no');
    (0, _proclaim.strictEqual)(elt.autocomplete, 'no');
});

test('Should get elements', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.deepEqual)(elt.elements, []);
    (0, _proclaim.strictEqual)(elt.elements.length, 0);
});

test('Should get inner elements', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<div></div><input type="text">';

    (0, _proclaim.strictEqual)(elt.elements.length, 1);
});

test('Should not set elements', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.throws)(function () {
        elt.elements = [];
    });
});

test('Should set and get encoding and enctype', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.encoding, '');
    (0, _proclaim.strictEqual)(elt.enctype, '');

    elt.encoding = 'some';
    (0, _proclaim.strictEqual)(elt.getAttribute('encoding'), null);
    (0, _proclaim.strictEqual)(elt.getAttribute('enctype'), 'some');

    elt.setAttribute('enctype', 'some');
    (0, _proclaim.strictEqual)(elt.getAttribute('enctype'), 'some');
    (0, _proclaim.strictEqual)(elt.enctype, 'some');
});

test('Should get length', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.length, 0);
});

test('Should get inner elements length', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<div></div><input type="text">';

    (0, _proclaim.strictEqual)(elt.length, 1);
});

test('Should not set length', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    (0, _proclaim.throws)(function () {
        elt.length = 2;
    });
});

test('Should set and get method', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.method, '');

    elt.method = 'post';
    (0, _proclaim.strictEqual)(elt.getAttribute('method'), 'post');

    elt.setAttribute('method', 'get');
    (0, _proclaim.strictEqual)(elt.method, 'get');

    elt.method = 'some';
    (0, _proclaim.strictEqual)(elt.method, 'get');
});

test('Should set and get name', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.name, '');

    elt.name = 'post';
    (0, _proclaim.strictEqual)(elt.getAttribute('name'), 'post');

    elt.setAttribute('name', 'get');
    (0, _proclaim.strictEqual)(elt.name, 'get');
});

test('Should set and get noValidate', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.noValidate, false);

    elt.noValidate = true;
    (0, _proclaim.strictEqual)(elt.getAttribute('novalidate'), 'true');

    elt.noValidate = false;
    (0, _proclaim.strictEqual)(elt.getAttribute('novalidate'), null);
});

test('Should set and get target', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    (0, _proclaim.strictEqual)(elt.target, '');

    elt.target = 'some';
    (0, _proclaim.strictEqual)(elt.getAttribute('target'), 'some');

    elt.setAttribute('target', 'get');
    (0, _proclaim.strictEqual)(elt.target, 'get');
});

test('Should call submit event on submit', function (done) {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    elt.addEventListener('submit', function () {
        done();
    }, true);
    elt.submit();
});

test('Should call submit event on reset', function (done) {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    elt.addEventListener('reset', function () {
        done();
    }, true);
    elt.reset();
});

test('Should clear all values on reset', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    var input = elt._ownerDocument.createElement('input');
    input.type = 'text';
    input.setAttribute('value', 'some');
    elt.appendChild(input);
    elt.reset();
    (0, _proclaim.strictEqual)(input.getAttribute('value'), '');
});

test('Should not clear all values on reset if event is prevented', function () {
    var elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    var input = elt._ownerDocument.createElement('input');
    input.type = 'text';
    input.setAttribute('value', 'some');
    elt.appendChild(input);
    elt.addEventListener('reset', function (event) {
        event.preventDefault();
    });
    elt.reset();
    (0, _proclaim.strictEqual)(input.getAttribute('value'), 'some');
});
//# sourceMappingURL=HTMLFormElement.js.map