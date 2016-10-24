'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

suite('Element', () => {
  test('querySelector', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    (0, _proclaim.strictEqual)(div.querySelector('span'), span);
  });

  test('Element querySelectorAll', () => {
    const document = new _.Document();
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    (0, _proclaim.deepEqual)(div.querySelectorAll('span'), [span]);
  });

  test('Element getElementsByTagName should search elements everywhere', () => {
    const document = new _.Document();
    document.documentElement.innerHTML = '<html><head><meta name="keywords"/></head><body><meta name="other"/><div><meta name="other"/></div></body>';
    let metas = document.getElementsByTagName('meta');
    (0, _proclaim.strictEqual)(metas.length, 3);
  });

  test('Element firstElementChild', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let div = document.body.firstChild;
    (0, _proclaim.strictEqual)(div.firstElementChild.tagName, 'span');
  });

  test('Element lastElementChild', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let div = document.body.firstChild;
    (0, _proclaim.strictEqual)(div.lastElementChild.tagName, 'a');
  });

  test('Element nextElementSibling', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let span = document.body.firstChild.firstElementChild;
    (0, _proclaim.strictEqual)(span.nextElementSibling.tagName, 'b');
  });

  test('Element nextElementSibling on last element', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let a = document.body.firstChild.lastElementChild;
    (0, _proclaim.isNull)(a.nextElementSibling);
  });

  test('Element previousElementSibling', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let a = document.body.firstChild.lastElementChild;
    (0, _proclaim.strictEqual)(a.previousElementSibling.tagName, 'b');
  });

  test('Element previousElementSibling on first element', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let span = document.body.firstChild.firstElementChild;
    (0, _proclaim.isNull)(span.previousElementSibling);
  });

  test('Element previousElementSibling on only child', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span></div>';
    let span = document.body.firstChild.firstElementChild;
    (0, _proclaim.isNull)(span.previousElementSibling);
  });

  test('Element nextElementSibling on only child', () => {
    const document = new _.Document();
    document.body.innerHTML = '<div><span></span></div>';
    let span = document.body.firstChild.firstElementChild;
    (0, _proclaim.isNull)(span.nextElementSibling);
  });

  test('getElementsByTagName returns everything if tag name not set', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = document.getElementsByTagName();
    (0, _proclaim.strictEqual)(collection.length, 4);
  });

  test('getElementsByClassName returns HTMLCollection', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b class="some class"></b><div><b class="some"></b></div>';
    let somes = document.getElementsByClassName('some');
    (0, _proclaim.strictEqual)(somes.length, 2);
    let someClasses = document.getElementsByClassName('class some');
    (0, _proclaim.strictEqual)(someClasses.length, 1);
  });

  test('getElementsByClassName returns live HTMLCollection', () => {
    const document = new _.Document();
    let somes = document.getElementsByClassName('some');
    document.body.innerHTML = '<b class="some class"></b><div><b class="some"></b></div>';
    (0, _proclaim.strictEqual)(somes.length, 2);
  });
});
//# sourceMappingURL=Element.js.map