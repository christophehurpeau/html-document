/* global test */
import assert from 'proclaim';

const lib = '../../lib/';

const Document = require(lib + 'Document');

test('Element querySelector', () => {
    const document = new Document();
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    assert.strictEqual(div.querySelector('span'), span);
});

test('Element querySelectorAll', () => {
    const document = new Document();
    const div = document.createElement('div');
    const span = document.createElement('span');
    div.appendChild(span);

    assert.deepEqual(div.querySelectorAll('span'), [span]);
});

test('Element getElementsByTagName should search elements everywhere', () => {
    const document = new Document();
    document.documentElement.innerHTML = '<html><head><meta name="keywords"/></head><body><meta name="other"/>' +
        '<div><meta name="other"/></div></body>';
    let metas = document.getElementsByTagName('meta');
    assert.equal(metas.length, 3);
});

test('Element firstElementChild', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let div = document.body.firstChild;
    assert.equal(div.firstElementChild.tagName, 'span');
});

test('Element lastElementChild', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let div = document.body.firstChild;
    assert.equal(div.lastElementChild.tagName, 'a');
});

test('Element nextElementSibling', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let span = document.body.firstChild.firstElementChild;
    assert.equal(span.nextElementSibling.tagName, 'b');
});

test('Element nextElementSibling on last element', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let a = document.body.firstChild.lastElementChild;
    assert.isNull(a.nextElementSibling);
});

test('Element previousElementSibling', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let a = document.body.firstChild.lastElementChild;
    assert.equal(a.previousElementSibling.tagName, 'b');
});

test('Element previousElementSibling on first element', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    let span = document.body.firstChild.firstElementChild;
    assert.isNull(span.previousElementSibling);
});

test('Element previousElementSibling on only child', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span></div>';
    let span = document.body.firstChild.firstElementChild;
    assert.isNull(span.previousElementSibling);
});

test('Element nextElementSibling on only child', () => {
    const document = new Document();
    document.body.innerHTML = '<div><span></span></div>';
    let span = document.body.firstChild.firstElementChild;
    assert.isNull(span.nextElementSibling);
});
