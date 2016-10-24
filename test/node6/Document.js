'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

suite('Document', () => {
  test('create a Text Node', () => {
    let document = new _.Document();
    let textNode = document.createTextNode('Hello');

    (0, _proclaim.strictEqual)(textNode.textContent, 'Hello');
  });

  test('create an HTMLElement', () => {
    let document = new _.Document();
    let h1 = document.createElement('h1');
    (0, _proclaim.strictEqual)(h1.outerHTML, '<h1></h1>');
    (0, _proclaim.strictEqual)(h1.innerHTML, '');
    (0, _proclaim.strictEqual)(h1.textContent, '');
  });

  test('first child for empty document is html', () => {
    let document = new _.Document();
    (0, _proclaim.strictEqual)(document.firstChild.nodeName, 'html');
  });

  test('first child is which one is set', () => {
    let document = new _.Document();
    document.innerHTML = '<some></some>';
    (0, _proclaim.strictEqual)(document.firstChild.nodeName, 'some');
  });

  test('append child should replace body and head if child is html', () => {
    let document = new _.Document();
    document.innerHTML = '<html><head></head><body>Hello</body></html>';
    (0, _proclaim.strictEqual)(document.body.innerHTML, 'Hello');
  });

  test('getElementById should return one element', () => {
    let document = new _.Document();
    document.body.innerHTML = '<b id="fat">1</b><b id="fat">2</b>';
    (0, _proclaim.strictEqual)(document.getElementById('fat').innerHTML, '1');
  });

  test('getElementById should return null if nothing found', () => {
    let document = new _.Document();
    document.body.innerHTML = '<b id="fat">1</b><b id="fat">2</b>';
    (0, _proclaim.strictEqual)(document.getElementById('thin'), null);
  });

  test('create comments in document', () => {
    let document = new _.Document();
    document.innerHTML = '<!-- some comment -->';
    (0, _proclaim.strictEqual)(document.firstChild.nodeName, '#comment');
  });

  test('create an element and add nodes inside', () => {
    let document = new _.Document();
    let textNode = document.createTextNode('Hello');
    let h1 = document.createElement('h1');
    h1.setAttribute('id', 'title');

    h1.appendChild(textNode);
    (0, _proclaim.strictEqual)(h1.outerHTML, '<h1 id="title">Hello</h1>');
    (0, _proclaim.strictEqual)(h1.innerHTML, 'Hello');
    (0, _proclaim.strictEqual)(h1.textContent, 'Hello');

    let span = document.createElement('span');
    h1.appendChild(span);
    (0, _proclaim.strictEqual)(h1.outerHTML, '<h1 id="title">Hello<span></span></h1>');
    (0, _proclaim.strictEqual)(h1.innerHTML, 'Hello<span></span>');
    (0, _proclaim.strictEqual)(h1.textContent, 'Hello');
  });

  test('create elements without content', () => {
    let document = new _.Document();
    let span = document.createElement('span');
    let textNode1 = document.createTextNode('Hello1');
    let textNode2 = document.createTextNode('Hello2');
    let br1 = document.createElement('br');
    let br2 = document.createElement('br');
    br2.setAttribute('class', 'test');

    span.appendChild(textNode1);
    span.appendChild(br1);
    span.appendChild(br2);
    span.appendChild(textNode2);
    (0, _proclaim.strictEqual)(span.outerHTML, `<span>${ span.innerHTML }</span>`);
    (0, _proclaim.strictEqual)(span.innerHTML, 'Hello1<br><br class="test">Hello2');
  });

  test('create a html layout', () => {
    let document = new _.Document();
    let fragment = document.createDocumentFragment();
    fragment.appendChild(new _.Doctype());
    let html = document.createElement('html');
    fragment.appendChild(html);
    let head = document.createElement('head');
    html.appendChild(head);
    let body = document.createElement('body');
    html.appendChild(body);
    (0, _proclaim.strictEqual)(fragment.innerHTML, '<!DOCTYPE html><html><head></head><body></body></html>');
  });

  test('Set documentElement content changes document.body, document.head', () => {
    let document = new _.Document();
    document.documentElement.innerHTML = '<!DOCTYPE html><html><head><title>Hello</title></head><body>World</body></html>';
    (0, _proclaim.strictEqual)(document.body.textContent, 'World');
    (0, _proclaim.strictEqual)(document.head.querySelector('title').textContent, 'Hello');
  });

  test('process query selector', () => {
    let document = new _.Document();
    document.body.innerHTML = '<div><span class="second">Text</span></div><i>Skip me</i><input type="text"/>';
    let element = document.querySelector('.first, input');
    (0, _proclaim.strictEqual)(element.getAttribute('type'), 'text');
  });

  test('process query selector all', () => {
    let document = new _.Document();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    let elements = document.querySelectorAll('.first, input');
    (0, _proclaim.strictEqual)(elements.length, 2);
    (0, _proclaim.strictEqual)(elements[0].textContent, 'Text');
    (0, _proclaim.strictEqual)(elements[1].getAttribute('type'), 'text');
  });

  test('process textContent', () => {
    let document = new _.Document();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    (0, _proclaim.isNull)(document.textContent);
  });

  test('Check document.location process', () => {
    let document = new _.Document();
    document.location = 'http://some.url/page';
    (0, _proclaim.strictEqual)(document.location.hostname, 'some.url');
  });

  test('setting document.head should throw', () => {
    let document = new _.Document();
    (0, _proclaim.throws)(() => document.head = '123');
  });

  test('getting empty document.head should return empty tag', () => {
    let document = new _.Document();
    (0, _proclaim.strictEqual)(document.head.tagName, 'head');
  });

  test('getting head of normal document should return data', () => {
    let document = new _.Document();
    document.documentElement.innerHTML = '<html><head><title>Some</title></head></html>';
    (0, _proclaim.strictEqual)(document.head.innerHTML, '<title>Some</title>');
  });

  test('setting document.body replace body', () => {
    let document = new _.Document();
    document.body.innerHTML = '<div></div>';
    (0, _proclaim.strictEqual)(document.body.children.length, 1);
    document.body = document.createElement('body');
    (0, _proclaim.strictEqual)(document.body.children.length, 0);
  });

  test('setting document.body adds new body', () => {
    let document = new _.Document();
    document.body = document.createElement('body');
    (0, _proclaim.strictEqual)(document.body.children.length, 0);
  });
});
//# sourceMappingURL=Document.js.map