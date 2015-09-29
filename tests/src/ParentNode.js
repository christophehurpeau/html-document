/* global test, document */
import assert from 'proclaim';
const expect = assert.strictEqual;

const lib = '../../lib/';

const ParentNode = require(lib + 'ParentNode');
const Document = require(lib + 'Document');
const document = new Document();// jshint ignore: line

test('empty ParentNode', () => {
    let parentNode = new ParentNode();
    assert.isNull(parentNode.firstChild);
    assert.isNull(parentNode.lastChild);
    expect(parentNode.childNodes.length, 0);
});

test('appendChild Node', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');

    let result = parentNode.appendChild(span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span1);

    let span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    expect(result, span2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span2);

    result = parentNode.appendChild(span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span2);
    expect(parentNode.lastChild, span1);
});

test('firstChild, lastChild, previousSibling, nextSibling Node', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');

    let result = parentNode.appendChild(span1);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span1);
    expect(span1.previousSibling, null);
    expect(span1.nextSibling, null);

    let span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    expect(result, span2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span2);
    expect(span1.previousSibling, null);
    expect(span2.previousSibling, span1);
    expect(span1.nextSibling, span2);
    expect(span2.nextSibling, null);
});

test('appendChild DocumentFragment', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let fragment = document.createDocumentFragment();
    fragment.appendChild(span1);
    expect(fragment.childNodes.length, 1);
    expect(fragment.firstChild, span1);
    expect(fragment.lastChild, span1);
    fragment.appendChild(span2);
    expect(fragment.childNodes.length, 2);

    let result = parentNode.appendChild(fragment);
    expect(result, fragment);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span2);
});

test('replaceChild throws', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    assert.throws(function() {
        parentNode.replaceChild(span2, span1);
    }, 'Node was not found');
});

test('replaceChild', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span1);

    let result = parentNode.replaceChild(span2, span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span2);
});

test('replaceChild DocumentFragment with one child', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    parentNode.appendChild(span1);
    expect(parentNode.childNodes.length, 1);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    expect(fragment.childNodes.length, 1);
    expect(fragment.firstChild, span2);

    let result = parentNode.replaceChild(fragment, span1);
    expect(result, span1);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span2);
});

test('replaceChild DocumentFragment with two child', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

    parentNode.appendChild(span1);
    expect(parentNode.childNodes.length, 1);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    fragment.appendChild(span3);
    expect(fragment.childNodes.length, 2);
    expect(fragment.firstChild, span2);

    let result = parentNode.replaceChild(fragment, span1);
    expect(result, span1);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span2);
    expect(parentNode.lastChild, span3);
});

test('removeChild throws', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');

    assert.throws(function() {
        parentNode.removeChild(span1);
    }, 'Node was not found');
});

test('removeChild', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    parentNode.appendChild(span1);

    let result = parentNode.removeChild(span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 0);
});

test('removeChild in the middle', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    parentNode.appendChild(span3);

    let result = parentNode.removeChild(span2);
    expect(result, span2);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span3);
});

test('insertBefore throws', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    assert.throws(function() {
        parentNode.insertBefore(span2, span1);
    }, 'Node was not found');
});

test('insertBefore Node', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);

    let result = parentNode.insertBefore(span2, span1);
    expect(result, span2);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span2);
    expect(parentNode.lastChild, span1);
});

test('insertBefore Node in the middle', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);

    let result = parentNode.insertBefore(span3, span2);
    expect(result, span3);
    expect(parentNode.childNodes.length, 3);
    expect(parentNode.childNodes[0], span1);
    expect(parentNode.childNodes[1], span3);
    expect(parentNode.childNodes[2], span2);
});

test('insertBefore fragment', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);

    let fragment = document.createDocumentFragment();
    let span3 = document.createElement('span');
    let span4 = document.createElement('span');
    fragment.appendChild(span3);
    fragment.appendChild(span4);

    let result = parentNode.insertBefore(fragment, span1);
    expect(result, fragment);
    expect(parentNode.childNodes.length, 4);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes[0], span3);
    expect(parentNode.childNodes[1], span4);
    expect(parentNode.childNodes[2], span1);
    expect(parentNode.childNodes[3], span2);
});

test('ParentNode _closestParent', () => {
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.appendChild(span2);

    expect(span2._closestParent('span'), span1);
    assert.isUndefined(span2._closestParent('test'));
    assert.isUndefined(span1._closestParent('span'));
});

test('hasChildNodes', () => {
    let parentNode = new ParentNode();
    expect(parentNode.hasChildNodes(), false);
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    expect(parentNode.hasChildNodes(), true);
});
