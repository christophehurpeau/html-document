/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var expect = _proclaim2['default'].strictEqual;

var lib = '../../lib/';

var Document = require(lib + 'Document');
var Doctype = require(lib + 'Doctype');

test('create a Text Node', function () {
    var document = new Document();
    var textNode = document.createTextNode('Hello');

    expect(textNode.textContent, 'Hello');
});

test('create an HTMLElement', function () {
    var document = new Document();
    var h1 = document.createElement('h1');
    expect(h1.outerHTML, '<h1></h1>');
    expect(h1.innerHTML, '');
    expect(h1.textContent, '');
});

test('create an element and add nodes inside', function () {
    var document = new Document();
    var textNode = document.createTextNode('Hello');
    var h1 = document.createElement('h1');
    h1.setAttribute('id', 'title');

    h1.appendChild(textNode);
    expect(h1.outerHTML, '<h1 id="title">Hello</h1>');
    expect(h1.innerHTML, 'Hello');
    expect(h1.textContent, 'Hello');

    var span = document.createElement('span');
    h1.appendChild(span);
    expect(h1.outerHTML, '<h1 id="title">Hello<span></span></h1>');
    expect(h1.innerHTML, 'Hello<span></span>');
    expect(h1.textContent, 'Hello');
});

test('create elements without content', function () {
    var document = new Document();
    var span = document.createElement('span');
    var textNode1 = document.createTextNode('Hello1');
    var textNode2 = document.createTextNode('Hello2');
    var br1 = document.createElement('br');
    var br2 = document.createElement('br');
    br2.setAttribute('class', 'test');

    span.appendChild(textNode1);
    span.appendChild(br1);
    span.appendChild(br2);
    span.appendChild(textNode2);
    expect(span.outerHTML, '<span>' + span.innerHTML + '</span>');
    expect(span.innerHTML, 'Hello1<br><br class="test">Hello2');
});

test('create a html layout', function () {
    var document = new Document();
    var fragment = document.createDocumentFragment();
    fragment.appendChild(new Doctype());
    var html = document.createElement('html');
    fragment.appendChild(html);
    var head = document.createElement('head');
    html.appendChild(head);
    var body = document.createElement('body');
    html.appendChild(body);
    expect(fragment.innerHTML, '<!DOCTYPE html><html><head></head><body></body></html>');
});

test('Set documentElement content changes document.body, document.head', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>Hello</title>' + '</head><body>World</body></html>';
    expect(document.body.textContent, 'World');
    expect(document.head.querySelector('title').textContent, 'Hello');
});

test('Check document.location process', function () {
    var document = new Document();
    document.location = 'http://some.url/page';
    expect(document.location.hostname, 'some.url');
});
//# sourceMappingURL=Document.js.map