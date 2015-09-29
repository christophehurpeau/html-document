/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var lib = '../../lib/';

var Document = require(lib + 'Document');
var Event = require(lib + 'Event');

test('Element querySelector', function () {
    var document = new Document();
    var div = document.createElement('div');
    var span = document.createElement('span');
    var span2 = document.createElement('span');
    span.className = 'css class';
    span2.setAttribute('title', 'title');
    div.appendChild(span);
    document.body.appendChild(div);
    document.body.appendChild(span2);
    _proclaim2['default'].equal(span.className, 'css class');
    _proclaim2['default'].deepEqual(span, document.body.querySelector('.css'));
    _proclaim2['default'].deepEqual(span, document.body.querySelector('span.css'));
    _proclaim2['default'].equal(null, document.body.querySelector('div.css'));
    _proclaim2['default'].deepEqual(span, document.body.querySelector('div span.css'));
    _proclaim2['default'].deepEqual(span2, document.body.querySelector('span[title=title]'));
});

test('Element querySelector on several selectors', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span class="second">Text</span></div><i>Skip me</i><input type="text"/>';
    var element = document.body.querySelector('.first, input');
    _proclaim2['default'].equal(element.getAttribute('type'), 'text');
});

test('Element querySelectorAll', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    var elements = document.body.querySelectorAll('.first, input');
    _proclaim2['default'].equal(elements.length, 2);
    _proclaim2['default'].equal(elements[0].textContent, 'Text');
    _proclaim2['default'].equal(elements[1].getAttribute('type'), 'text');
});

test('Element querySelectorAll for several elements', function () {
    var document = new Document();
    document.body.innerHTML = '<div>1</div><div>2</div><div>3</div><span></span><div>4</div>';
    var elements = document.body.querySelectorAll('div');
    _proclaim2['default'].equal(elements.length, 4);
    _proclaim2['default'].equal(elements[0].textContent, '1');
    _proclaim2['default'].equal(elements[1].textContent, '2');
    _proclaim2['default'].equal(elements[2].textContent, '3');
    _proclaim2['default'].equal(elements[3].textContent, '4');
});

test('Element querySelectorAll deep several', function () {
    var document = new Document();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    var elements = document.body.querySelectorAll('div');
    _proclaim2['default'].equal(elements.length, 4);
    _proclaim2['default'].equal(elements[0].textContent, '1234');
    _proclaim2['default'].equal(elements[1].textContent, '234');
    _proclaim2['default'].equal(elements[2].textContent, '34');
    _proclaim2['default'].equal(elements[3].textContent, '4');
});

test('Element querySelectorAll returns nothing if not found', function () {
    var document = new Document();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    var elements = document.body.querySelectorAll('i');
    _proclaim2['default'].equal(elements.length, 0);
});

test('Elemeent querySelector with ID', function () {
    var document = new Document();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    var elements = document.body.querySelectorAll('#element');
    _proclaim2['default'].equal(elements.length, 0);
});
//# sourceMappingURL=Element.js.map