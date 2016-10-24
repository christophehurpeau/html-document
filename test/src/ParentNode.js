/* global suite, test */
import { strictEqual, isNull, isUndefined, throws } from 'proclaim';
import { Document, ParentNode } from '../../src';

const document = new Document();

suite('ParentNode', () => {
  test('empty ParentNode', () => {
    let parentNode = new ParentNode();
    isNull(parentNode.firstChild);
    isNull(parentNode.lastChild);
    strictEqual(parentNode.childNodes.length, 0);
  });

  test('appendChild Node', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');

    let result = parentNode.appendChild(span1);
    strictEqual(result, span1);
    strictEqual(parentNode.childNodes.length, 1);
    strictEqual(parentNode.firstChild, span1);
    strictEqual(parentNode.lastChild, span1);

    let span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    strictEqual(result, span2);
    strictEqual(parentNode.firstChild, span1);
    strictEqual(parentNode.lastChild, span2);

    result = parentNode.appendChild(span1);
    strictEqual(result, span1);
    strictEqual(parentNode.childNodes.length, 2);
    strictEqual(parentNode.firstChild, span2);
    strictEqual(parentNode.lastChild, span1);
  });

  test('firstChild, lastChild, previousSibling, nextSibling Node', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');

    let result = parentNode.appendChild(span1);
    strictEqual(parentNode.firstChild, span1);
    strictEqual(parentNode.lastChild, span1);
    strictEqual(span1.previousSibling, null);
    strictEqual(span1.nextSibling, null);

    let span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    strictEqual(result, span2);
    strictEqual(parentNode.firstChild, span1);
    strictEqual(parentNode.lastChild, span2);
    strictEqual(span1.previousSibling, null);
    strictEqual(span2.previousSibling, span1);
    strictEqual(span1.nextSibling, span2);
    strictEqual(span2.nextSibling, null);
  });

  test('appendChild DocumentFragment', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let fragment = document.createDocumentFragment();
    fragment.appendChild(span1);
    strictEqual(fragment.childNodes.length, 1);
    strictEqual(fragment.firstChild, span1);
    strictEqual(fragment.lastChild, span1);
    fragment.appendChild(span2);
    strictEqual(fragment.childNodes.length, 2);

    let result = parentNode.appendChild(fragment);
    strictEqual(result, fragment);
    strictEqual(fragment.childNodes.length, 0);
    strictEqual(parentNode.childNodes.length, 2);
    strictEqual(parentNode.firstChild, span1);
    strictEqual(parentNode.lastChild, span2);
  });

  test('replaceChild throws', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    throws(() => {
      parentNode.replaceChild(span2, span1);
    }, 'Node was not found');
  });

  test('replaceChild', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    strictEqual(parentNode.childNodes.length, 1);
    strictEqual(parentNode.firstChild, span1);

    let result = parentNode.replaceChild(span2, span1);
    strictEqual(result, span1);
    strictEqual(parentNode.childNodes.length, 1);
    strictEqual(parentNode.firstChild, span2);
  });

  test('replaceChild DocumentFragment with one child', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    parentNode.appendChild(span1);
    strictEqual(parentNode.childNodes.length, 1);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    strictEqual(fragment.childNodes.length, 1);
    strictEqual(fragment.firstChild, span2);

    let result = parentNode.replaceChild(fragment, span1);
    strictEqual(result, span1);
    strictEqual(fragment.childNodes.length, 0);
    strictEqual(parentNode.childNodes.length, 1);
    strictEqual(parentNode.firstChild, span2);
  });

  test('replaceChild DocumentFragment with two child', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');

    parentNode.appendChild(span1);
    strictEqual(parentNode.childNodes.length, 1);

    let fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    fragment.appendChild(span3);
    strictEqual(fragment.childNodes.length, 2);
    strictEqual(fragment.firstChild, span2);

    let result = parentNode.replaceChild(fragment, span1);
    strictEqual(result, span1);
    strictEqual(fragment.childNodes.length, 0);
    strictEqual(parentNode.childNodes.length, 2);
    strictEqual(parentNode.firstChild, span2);
    strictEqual(parentNode.lastChild, span3);
  });

  test('removeChild throws', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');

    throws(() => {
      parentNode.removeChild(span1);
    }, 'Node was not found');
  });

  test('removeChild', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    parentNode.appendChild(span1);

    let result = parentNode.removeChild(span1);
    strictEqual(result, span1);
    strictEqual(parentNode.childNodes.length, 0);
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
    strictEqual(result, span2);
    strictEqual(parentNode.childNodes.length, 2);
    strictEqual(parentNode.firstChild, span1);
    strictEqual(parentNode.lastChild, span3);
  });

  test('insertBefore throws', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');

    throws(() => {
      parentNode.insertBefore(span2, span1);
    }, 'Node was not found');
  });

  test('insertBefore Node', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);

    let result = parentNode.insertBefore(span2, span1);
    strictEqual(result, span2);
    strictEqual(parentNode.childNodes.length, 2);
    strictEqual(parentNode.firstChild, span2);
    strictEqual(parentNode.lastChild, span1);
  });

  test('insertBefore Node in the middle', () => {
    let parentNode = new ParentNode();
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);

    let result = parentNode.insertBefore(span3, span2);
    strictEqual(result, span3);
    strictEqual(parentNode.childNodes.length, 3);
    strictEqual(parentNode.childNodes[0], span1);
    strictEqual(parentNode.childNodes[1], span3);
    strictEqual(parentNode.childNodes[2], span2);
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
    strictEqual(result, fragment);
    strictEqual(parentNode.childNodes.length, 4);
    strictEqual(fragment.childNodes.length, 0);
    strictEqual(parentNode.childNodes[0], span3);
    strictEqual(parentNode.childNodes[1], span4);
    strictEqual(parentNode.childNodes[2], span1);
    strictEqual(parentNode.childNodes[3], span2);
  });

  test('ParentNode _closestParent', () => {
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.appendChild(span2);

    strictEqual(span2._closestParent('span'), span1);
    isUndefined(span2._closestParent('test'));
    isUndefined(span1._closestParent('span'));
  });

  test('hasChildNodes', () => {
    let parentNode = new ParentNode();
    strictEqual(parentNode.hasChildNodes(), false);
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    strictEqual(parentNode.hasChildNodes(), true);
  });

  test('Node.textContent', () => {
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    span1.appendChild(span2);
    span2.appendChild(document.createTextNode('value'));
    strictEqual(span2.textContent, 'value');

    span1.textContent = 'hello world';

    strictEqual(span1.childNodes.length, 1);
    strictEqual(span1.childNodes[0].value, 'hello world');
  });
});
