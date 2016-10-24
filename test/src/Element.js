import { strictEqual, deepEqual, isNull } from 'proclaim';
import { Document } from '../../src';

suite('Element', () => {
  test('querySelector', () => {
    const document = new Document();
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    strictEqual(div.querySelector('span'), span);
  });

  test('Element querySelectorAll', () => {
    const document = new Document();
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    deepEqual(div.querySelectorAll('span'), [span]);
  });

  test('Element getElementsByTagName should search elements everywhere', () => {
    const document = new Document();
    document.documentElement.innerHTML = '<html><head><meta name="keywords"/></head><body><meta name="other"/>' +
                                         '<div><meta name="other"/></div></body>';
    let metas = document.getElementsByTagName('meta');
    strictEqual(metas.length, 3);
  });

  test('Element firstElementChild', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let div = document.body.firstChild;
    strictEqual(div.firstElementChild.tagName, 'span');
  });

  test('Element lastElementChild', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let div = document.body.firstChild;
    strictEqual(div.lastElementChild.tagName, 'a');
  });

  test('Element nextElementSibling', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let span = document.body.firstChild.firstElementChild;
    strictEqual(span.nextElementSibling.tagName, 'b');
  });

  test('Element nextElementSibling on last element', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let a = document.body.firstChild.lastElementChild;
    isNull(a.nextElementSibling);
  });

  test('Element previousElementSibling', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let a = document.body.firstChild.lastElementChild;
    strictEqual(a.previousElementSibling.tagName, 'b');
  });

  test('Element previousElementSibling on first element', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let span = document.body.firstChild.firstElementChild;
    isNull(span.previousElementSibling);
  });

  test('Element previousElementSibling on only child', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span></div>';
    let span = document.body.firstChild.firstElementChild;
    isNull(span.previousElementSibling);
  });

  test('Element nextElementSibling on only child', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span></div>';
    let span = document.body.firstChild.firstElementChild;
    isNull(span.nextElementSibling);
  });

  test('getElementsByTagName returns everything if tag name not set', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = document.getElementsByTagName();
    strictEqual(collection.length, 4);
  });

  test('getElementsByClassName returns HTMLCollection', () => {
    const document = new Document();
    document.body.innerHTML = '<b class="some class"></b><div><b class="some"></b></div>';
    let somes = document.getElementsByClassName('some');
    strictEqual(somes.length, 2);
    let someClasses = document.getElementsByClassName('class some');
    strictEqual(someClasses.length, 1);
  });

  test('getElementsByClassName returns live HTMLCollection', () => {
    const document = new Document();
    let somes = document.getElementsByClassName('some');
    document.body.innerHTML = '<b class="some class"></b><div><b class="some"></b></div>';
    strictEqual(somes.length, 2);
  });
});
