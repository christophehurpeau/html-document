/* global test */
import { strictEqual, deepEqual, ok, throws } from 'proclaim';
const lib = '../../../../lib/';

const HTMLFormElement = require(lib + 'HTMLElement/elements/HTMLFormElement');
const Document = require(lib + 'Document');

test('HTMLFormElement should have the nodeName == form ', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    strictEqual(elt.nodeName, 'form');
});

test('document.createElement should create object', () => {
    const document = new Document();
    let meta = document.createElement('form');
    ok(meta instanceof HTMLFormElement);
});

test('Should set and get acceptCharset', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.acceptCharset, '');

    elt.acceptCharset = 'utf-8';
    strictEqual(elt.getAttribute('accept-charset'), 'utf-8');

    elt.setAttribute('accept-charset', 'koi8-r');
    strictEqual(elt.acceptCharset, 'koi8-r');
});

test('Should set and get action', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.action, '');

    elt.action = 'some';
    strictEqual(elt.getAttribute('action'), 'some');

    elt.setAttribute('action', 'other');
    strictEqual(elt.action, 'other');
});

test('Should set and get autocomplete', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.autocomplete, '');

    elt.autocomplete = 'yes';
    strictEqual(elt.getAttribute('autocomplete'), 'yes');

    elt.setAttribute('autocomplete', 'no');
    strictEqual(elt.autocomplete, 'no');
});

test('Should get elements', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    deepEqual(elt.elements, []);
    strictEqual(elt.elements.length, 0);
});

test('Should get inner elements', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<div></div><input type="text">';

    strictEqual(elt.elements.length, 1);
});

test('Should not set elements', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    throws(() => {
        elt.elements = [];
    });
});

test('Should set and get encoding and enctype', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.encoding, '');
    strictEqual(elt.enctype, '');

    elt.encoding = 'some';
    strictEqual(elt.getAttribute('encoding'), null);
    strictEqual(elt.getAttribute('enctype'), 'some');

    elt.setAttribute('enctype', 'some');
    strictEqual(elt.getAttribute('enctype'), 'some');
    strictEqual(elt.enctype, 'some');
});

test('Should get length', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.length, 0);
});

test('Should get inner elements length', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    elt.innerHTML = '<div></div><input type="text">';

    strictEqual(elt.length, 1);
});

test('Should not set length', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    throws(() => {
        elt.length = 2;
    });
});

test('Should set and get method', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.method, '');

    elt.method = 'post';
    strictEqual(elt.getAttribute('method'), 'post');

    elt.setAttribute('method', 'get');
    strictEqual(elt.method, 'get');

    elt.method = 'some';
    strictEqual(elt.method, 'get');
});

test('Should set and get name', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.name, '');

    elt.name = 'post';
    strictEqual(elt.getAttribute('name'), 'post');

    elt.setAttribute('name', 'get');
    strictEqual(elt.name, 'get');
});

test('Should set and get noValidate', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.noValidate, false);

    elt.noValidate = true;
    strictEqual(elt.getAttribute('novalidate'), 'true');

    elt.noValidate = false;
    strictEqual(elt.getAttribute('novalidate'), null);
});

test('Should set and get target', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    strictEqual(elt.target, '');

    elt.target = 'some';
    strictEqual(elt.getAttribute('target'), 'some');

    elt.setAttribute('target', 'get');
    strictEqual(elt.target, 'get');
});

test('Should call submit event on submit', (done) => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    elt.addEventListener('submit', () => {
        done();
    }, true);
    elt.submit();
});

test('Should call submit event on reset', (done) => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();

    elt.addEventListener('reset', () => {
        done();
    }, true);
    elt.reset();
});

test('Should clear all values on reset', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    let input = elt._ownerDocument.createElement('input');
    input.type = 'text';
    input.setAttribute('value', 'some');
    elt.appendChild(input);
    elt.reset();
    strictEqual(input.getAttribute('value'), '');
});

test('Should not clear all values on reset if event is prevented', () => {
    let elt = new HTMLFormElement();
    elt._ownerDocument = new Document();
    let input = elt._ownerDocument.createElement('input');
    input.type = 'text';
    input.setAttribute('value', 'some');
    elt.appendChild(input);
    elt.addEventListener('reset', (event) => {
        event.preventDefault();
    });
    elt.reset();
    strictEqual(input.getAttribute('value'), 'some');
});
