/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var expect = _proclaim2['default'].strictEqual;

var lib = '../../../../lib/';

var HTMLLinkElement = require(lib + 'HTMLElement/elements/HTMLLinkElement');
var Document = require(lib + 'Document');

test('HTMLLinkElement should have the nodeName == link ', function () {
    var elt = new HTMLLinkElement();
    elt._ownerDocument = new Document();
    expect(elt.nodeName, 'link');
});

test('HTMLLinkElement rel process properly', function () {
    var document = new Document();
    document.head.innerHTML = '<link href="" rel="stylesheet"/>';
    var elt = document.head.querySelector('link[rel="stylesheet"]');
    expect(elt.getAttribute('rel'), 'stylesheet');
    expect(elt.rel, 'stylesheet');
    elt.rel = 'value';
    expect(elt.getAttribute('rel'), 'value');
});

test('HTMLLinkElement setAttribute', function () {
    var document = new Document();
    document.location.href = 'https://github.com/';
    var object = document.createElement('link');
    object.setAttribute('href', '/some_relative_url');
    expect(object.href, 'https://github.com/some_relative_url');
    expect(object.getAttribute('href'), '/some_relative_url');
});

test('HTMLLinkElement set disabled', function () {
    var document = new Document();
    var link = document.createElement('link');
    link.disabled = true;
    expect(link.outerHTML, '<link disabled>');
});

test('HTMLLinkElement get disabled', function () {
    var document = new Document();
    document.head.innerHTML = '<link rel="some" disabled><link rel="other">';
    expect(document.head.firstChild.disabled, true);
    expect(document.head.lastChild.disabled, false);
});

test('HTMLLinkElement set hreflang', function () {
    var document = new Document();
    var link = document.createElement('link');
    link.hreflang = 'en';
    expect(link.outerHTML, '<link hreflang="en">');
});

test('HTMLLinkElement get hreflang', function () {
    var document = new Document();
    document.head.innerHTML = '<link hreflang="some">';
    expect(document.head.lastChild.hreflang, 'some');
});

test('HTMLLinkElement set media', function () {
    var document = new Document();
    var link = document.createElement('link');
    link.media = 'print';
    expect(link.outerHTML, '<link media="print">');
});

test('HTMLLinkElement get hreflang', function () {
    var document = new Document();
    document.head.innerHTML = '<link media="some">';
    expect(document.head.lastChild.media, 'some');
});

test('HTMLLinkElement set type', function () {
    var document = new Document();
    var link = document.createElement('link');
    link.type = 'print';
    expect(link.outerHTML, '<link type="print">');
});

test('HTMLLinkElement get type', function () {
    var document = new Document();
    document.head.innerHTML = '<link type="some">';
    expect(document.head.lastChild.type, 'some');
});
//# sourceMappingURL=HTMLLinkElement.js.map