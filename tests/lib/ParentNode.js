/* global test, document */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var expect = _proclaim2['default'].strictEqual;

var lib = '../../lib/';

var ParentNode = require(lib + 'ParentNode');
var Document = require(lib + 'Document');
var document = new Document(); // jshint ignore: line

test('empty ParentNode', function () {
    var parentNode = new ParentNode();
    _proclaim2['default'].isNull(parentNode.firstChild);
    _proclaim2['default'].isNull(parentNode.lastChild);
    expect(parentNode.childNodes.length, 0);
});

test('appendChild Node', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');

    var result = parentNode.appendChild(span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span1);

    var span2 = document.createElement('span');
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

test('firstChild, lastChild, previousSibling, nextSibling Node', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');

    var result = parentNode.appendChild(span1);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span1);
    expect(span1.previousSibling, null);
    expect(span1.nextSibling, null);

    var span2 = document.createElement('span');
    result = parentNode.appendChild(span2);
    expect(result, span2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span2);
    expect(span1.previousSibling, null);
    expect(span2.previousSibling, span1);
    expect(span1.nextSibling, span2);
    expect(span2.nextSibling, null);
});

test('appendChild DocumentFragment', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(span1);
    expect(fragment.childNodes.length, 1);
    expect(fragment.firstChild, span1);
    expect(fragment.lastChild, span1);
    fragment.appendChild(span2);
    expect(fragment.childNodes.length, 2);

    var result = parentNode.appendChild(fragment);
    expect(result, fragment);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span2);
});

test('replaceChild throws', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');

    _proclaim2['default'].throws(function () {
        parentNode.replaceChild(span2, span1);
    }, 'Node was not found');
});

test('replaceChild', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    parentNode.appendChild(span1);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span1);

    var result = parentNode.replaceChild(span2, span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span2);
});

test('replaceChild DocumentFragment with one child', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');

    parentNode.appendChild(span1);
    expect(parentNode.childNodes.length, 1);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    expect(fragment.childNodes.length, 1);
    expect(fragment.firstChild, span2);

    var result = parentNode.replaceChild(fragment, span1);
    expect(result, span1);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes.length, 1);
    expect(parentNode.firstChild, span2);
});

test('replaceChild DocumentFragment with two child', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var span3 = document.createElement('span');

    parentNode.appendChild(span1);
    expect(parentNode.childNodes.length, 1);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(span2);
    fragment.appendChild(span3);
    expect(fragment.childNodes.length, 2);
    expect(fragment.firstChild, span2);

    var result = parentNode.replaceChild(fragment, span1);
    expect(result, span1);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span2);
    expect(parentNode.lastChild, span3);
});

test('removeChild throws', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');

    _proclaim2['default'].throws(function () {
        parentNode.removeChild(span1);
    }, 'Node was not found');
});

test('removeChild', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    parentNode.appendChild(span1);

    var result = parentNode.removeChild(span1);
    expect(result, span1);
    expect(parentNode.childNodes.length, 0);
});

test('removeChild in the middle', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    parentNode.appendChild(span3);

    var result = parentNode.removeChild(span2);
    expect(result, span2);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span1);
    expect(parentNode.lastChild, span3);
});

test('insertBefore throws', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');

    _proclaim2['default'].throws(function () {
        parentNode.insertBefore(span2, span1);
    }, 'Node was not found');
});

test('insertBefore Node', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    parentNode.appendChild(span1);

    var result = parentNode.insertBefore(span2, span1);
    expect(result, span2);
    expect(parentNode.childNodes.length, 2);
    expect(parentNode.firstChild, span2);
    expect(parentNode.lastChild, span1);
});

test('insertBefore Node in the middle', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    var span3 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);

    var result = parentNode.insertBefore(span3, span2);
    expect(result, span3);
    expect(parentNode.childNodes.length, 3);
    expect(parentNode.childNodes[0], span1);
    expect(parentNode.childNodes[1], span3);
    expect(parentNode.childNodes[2], span2);
});

test('insertBefore fragment', function () {
    var parentNode = new ParentNode();
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);

    var fragment = document.createDocumentFragment();
    var span3 = document.createElement('span');
    var span4 = document.createElement('span');
    fragment.appendChild(span3);
    fragment.appendChild(span4);

    var result = parentNode.insertBefore(fragment, span1);
    expect(result, fragment);
    expect(parentNode.childNodes.length, 4);
    expect(fragment.childNodes.length, 0);
    expect(parentNode.childNodes[0], span3);
    expect(parentNode.childNodes[1], span4);
    expect(parentNode.childNodes[2], span1);
    expect(parentNode.childNodes[3], span2);
});

test('ParentNode _closestParent', function () {
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    span1.appendChild(span2);

    expect(span2._closestParent('span'), span1);
    _proclaim2['default'].isUndefined(span2._closestParent('test'));
    _proclaim2['default'].isUndefined(span1._closestParent('span'));
});

test('hasChildNodes', function () {
    var parentNode = new ParentNode();
    expect(parentNode.hasChildNodes(), false);
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    parentNode.appendChild(span1);
    parentNode.appendChild(span2);
    expect(parentNode.hasChildNodes(), true);
});

test('Node.textContent', function () {
    var span1 = document.createElement('span');
    var span2 = document.createElement('span');
    span1.appendChild(span2);
    span2.appendChild(document.createTextNode('value'));
    expect(span2.textContent, 'value');

    span1.textContent = 'hello world';

    expect(span1.childNodes.length, 1);
    expect(span1.childNodes[0].value, 'hello world');
});

test('Clone documentFragment node', function () {
    var fragment = document.createDocumentFragment();
    fragment.innerHTML = '<p>some node text</p><span></span>';
    var copy = fragment.cloneNode();
    expect(copy.innerHTML, '');
});

test('Clone documentFragment node deep', function () {
    var fragment = document.createDocumentFragment();
    fragment.innerHTML = '<p>some node text</p><span></span>';
    var copy = fragment.cloneNode(true);
    expect(copy.innerHTML, '<p>some node text</p><span></span>');
});
//# sourceMappingURL=ParentNode.js.map