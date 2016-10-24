'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

/* global suite, test */
const document = new _.Document();

suite('ParentNode', () => {
  test('empty ParentNode', () => {
    let parentNode = new _.ParentNode();
    (0, _proclaim.isNull)(parentNode.firstChild);
    (0, _proclaim.isNull)(parentNode.lastChild);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 0);
  });

  test('appendChild Node', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');

    let result = parentNode.appendChild(span1);
    (0, _proclaim.strictEqual)(result, span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 1);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span1);

    let span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    (0, _proclaim.strictEqual)(result, span2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span2);

    result = parentNode.appendChild(span1);
    (0, _proclaim.strictEqual)(result, span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span2);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span1);
  });

  test('firstChild, lastChild, previousSibling, nextSibling Node', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');

    let result = parentNode.appendChild(span1);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span1);
    (0, _proclaim.strictEqual)(span1.previousSibling, null);
    (0, _proclaim.strictEqual)(span1.nextSibling, null);

    let span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    (0, _proclaim.strictEqual)(result, span2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span2);
    (0, _proclaim.strictEqual)(span1.previousSibling, null);
    (0, _proclaim.strictEqual)(span2.previousSibling, span1);
    (0, _proclaim.strictEqual)(span1.nextSibling, span2);
    (0, _proclaim.strictEqual)(span2.nextSibling, null);
  });

  test('appendChild DocumentFragment', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let fragment = document.createDocumentFragment();
    fragment.appendChild(span1);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 1);
    (0, _proclaim.strictEqual)(fragment.firstChild, span1);
    (0, _proclaim.strictEqual)(fragment.lastChild, span1);
    fragment.appendChild(span2);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 2);

    let result = parentNode.appendChild(fragment);
    (0, _proclaim.strictEqual)(result, fragment);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 0);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span2);
  });

  test('replaceChild throws', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    (0, _proclaim.throws)(() => {
      parentNode.replaceChild(span2, span1);
    }, 'Node was not found');
  });

  test('replaceChild', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 1);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);

    let result = parentNode.replaceChild(span2, span1);
    (0, _proclaim.strictEqual)(result, span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 1);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span2);
  });

  test('replaceChild DocumentFragment with one child', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    parentNode.appendChild(span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 1);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 1);
    (0, _proclaim.strictEqual)(fragment.firstChild, span2);

    let result = parentNode.replaceChild(fragment, span1);
    (0, _proclaim.strictEqual)(result, span1);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 0);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 1);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span2);
  });

  test('replaceChild DocumentFragment with two child', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

    parentNode.appendChild(span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 1);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    fragment.appendChild(span3);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 2);
    (0, _proclaim.strictEqual)(fragment.firstChild, span2);

    let result = parentNode.replaceChild(fragment, span1);
    (0, _proclaim.strictEqual)(result, span1);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 0);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span2);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span3);
  });

  test('removeChild throws', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');

    (0, _proclaim.throws)(() => {
      parentNode.removeChild(span1);
    }, 'Node was not found');
  });

  test('removeChild', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    parentNode.appendChild(span1);

    let result = parentNode.removeChild(span1);
    (0, _proclaim.strictEqual)(result, span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 0);
  });

  test('removeChild in the middle', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    parentNode.appendChild(span3);

    let result = parentNode.removeChild(span2);
    (0, _proclaim.strictEqual)(result, span2);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span1);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span3);
  });

  test('insertBefore throws', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    (0, _proclaim.throws)(() => {
      parentNode.insertBefore(span2, span1);
    }, 'Node was not found');
  });

  test('insertBefore Node', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);

    let result = parentNode.insertBefore(span2, span1);
    (0, _proclaim.strictEqual)(result, span2);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 2);
    (0, _proclaim.strictEqual)(parentNode.firstChild, span2);
    (0, _proclaim.strictEqual)(parentNode.lastChild, span1);
  });

  test('insertBefore Node in the middle', () => {
    let parentNode = new _.ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);

    let result = parentNode.insertBefore(span3, span2);
    (0, _proclaim.strictEqual)(result, span3);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 3);
    (0, _proclaim.strictEqual)(parentNode.childNodes[0], span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes[1], span3);
    (0, _proclaim.strictEqual)(parentNode.childNodes[2], span2);
  });

  test('insertBefore fragment', () => {
    let parentNode = new _.ParentNode();
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
    (0, _proclaim.strictEqual)(result, fragment);
    (0, _proclaim.strictEqual)(parentNode.childNodes.length, 4);
    (0, _proclaim.strictEqual)(fragment.childNodes.length, 0);
    (0, _proclaim.strictEqual)(parentNode.childNodes[0], span3);
    (0, _proclaim.strictEqual)(parentNode.childNodes[1], span4);
    (0, _proclaim.strictEqual)(parentNode.childNodes[2], span1);
    (0, _proclaim.strictEqual)(parentNode.childNodes[3], span2);
  });

  test('ParentNode _closestParent', () => {
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.appendChild(span2);

    (0, _proclaim.strictEqual)(span2._closestParent('span'), span1);
    (0, _proclaim.isUndefined)(span2._closestParent('test'));
    (0, _proclaim.isUndefined)(span1._closestParent('span'));
  });

  test('hasChildNodes', () => {
    let parentNode = new _.ParentNode();
    (0, _proclaim.strictEqual)(parentNode.hasChildNodes(), false);
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    (0, _proclaim.strictEqual)(parentNode.hasChildNodes(), true);
  });

  test('Node.textContent', () => {
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.appendChild(span2);
    span2.appendChild(document.createTextNode('value'));
    (0, _proclaim.strictEqual)(span2.textContent, 'value');

    span1.textContent = 'hello world';

    (0, _proclaim.strictEqual)(span1.childNodes.length, 1);
    (0, _proclaim.strictEqual)(span1.childNodes[0].value, 'hello world');
  });
});
//# sourceMappingURL=ParentNode.js.map