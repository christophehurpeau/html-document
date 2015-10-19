/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _libDocument = require('../../../lib/Document');

var _libDocument2 = _interopRequireDefault(_libDocument);

var document = new _libDocument2['default']();

test('querySelector', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    var span1 = div.children[0];

    (0, _proclaim.strictEqual)(div.querySelector('span'), span1);
});

test('querySelectorAll', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    var span1 = div.children[0];
    var spanAbc = div.children[1];
    var innerSpan = div.children[1].children[0];

    (0, _proclaim.deepEqual)(div.querySelectorAll('span'), [span1, spanAbc, innerSpan]);
});

test('querySelector class', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    var spanA = div.children[0];

    (0, _proclaim.strictEqual)(div.querySelector('span.a'), spanA);
});

test('querySelectorAll class', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    var spanA = div.children[0];
    var spanAbc = div.children[1];

    (0, _proclaim.deepEqual)(div.querySelectorAll('span.a'), [spanA, spanAbc]);
});

test('querySelector classes', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    var spanAbc = div.children[1];

    (0, _proclaim.strictEqual)(div.querySelector('span.a.b'), spanAbc);
    (0, _proclaim.strictEqual)(div.querySelector('span.a.b.c'), spanAbc);
});

test('querySelectorAll classes', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    var spanAbc = div.children[1];

    (0, _proclaim.deepEqual)(div.querySelectorAll('span.a.b'), [spanAbc]);
    (0, _proclaim.deepEqual)(div.querySelectorAll('span.a.b.c'), [spanAbc]);
});

test('querySelector has attribute', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    var spanAbc = div.children[1];

    (0, _proclaim.strictEqual)(div.querySelector('span[class]'), spanAbc);
});

test('querySelectorAll has attribute', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    var spanAbc = div.children[1];

    (0, _proclaim.deepEqual)(div.querySelectorAll('span[class]'), [spanAbc]);

    div.innerHTML = '<span class="a"/><span class="a b c" data-test="test">content<span></span></span>';
    var spanA = div.children[0];
    var spanAbc2 = div.children[1];

    (0, _proclaim.deepEqual)(div.querySelectorAll('span[class]'), [spanA, spanAbc2]);
});

test('querySelectorAll = attribute', function () {
    var div = document.createElement('div');
    div.innerHTML = '<span/><span class="a b c" data-test="test">content<span></span></span>';
    var spanAbc = div.children[1];

    (0, _proclaim.isNull)(div.querySelector('span[class="a"]'));
    (0, _proclaim.deepEqual)(div.querySelectorAll('span[class="a b c"]'), [spanAbc]);
});

test('querySelector on several selectors', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="second">Text</span></div><i>Skip me</i><input type="text"/>';
    var element = document.body.querySelector('.first, input');
    (0, _proclaim.strictEqual)(element.getAttribute('type'), 'text');
});

test('querySelectorAll', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    var elements = document.body.querySelectorAll('.first, input');
    (0, _proclaim.strictEqual)(elements.length, 2);
    (0, _proclaim.strictEqual)(elements[0].textContent, 'Text');
    (0, _proclaim.strictEqual)(elements[1].getAttribute('type'), 'text');
});

test('querySelectorAll for several elements', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div>1</div><div>2</div><div>3</div><span></span><div>4</div>';
    var elements = document.body.querySelectorAll('div');
    (0, _proclaim.strictEqual)(elements.length, 4);
    (0, _proclaim.strictEqual)(elements[0].textContent, '1');
    (0, _proclaim.strictEqual)(elements[1].textContent, '2');
    (0, _proclaim.strictEqual)(elements[2].textContent, '3');
    (0, _proclaim.strictEqual)(elements[3].textContent, '4');
});

test('querySelectorAll deep several', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    var elements = document.body.querySelectorAll('div');
    (0, _proclaim.strictEqual)(elements.length, 4);
    (0, _proclaim.strictEqual)(elements[0].textContent, '1234');
    (0, _proclaim.strictEqual)(elements[1].textContent, '234');
    (0, _proclaim.strictEqual)(elements[2].textContent, '34');
    (0, _proclaim.strictEqual)(elements[3].textContent, '4');
});

test('querySelector complex rules', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' + '<i data-attr="1">Skip me</i><input type="text"/><i data-attr="some words"></i>' + '<i data-attr="some-words"></i>';
    var elements = document.body.querySelectorAll('[data-attr^=1]');
    (0, _proclaim.strictEqual)(elements.length, 2);
    elements = document.body.querySelectorAll('[data-attr$=3]');
    (0, _proclaim.strictEqual)(elements.length, 1);
    elements = document.body.querySelectorAll('[data-attr~="some"]');
    (0, _proclaim.strictEqual)(elements.length, 1);
    elements = document.body.querySelectorAll('[data-attr*="om"]');
    (0, _proclaim.strictEqual)(elements.length, 2);
});

test('querySelector attribute rules', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' + '<i data-attr="1">Skip me</i><input type="text"/><i data-attr="some words"></i>' + '<i data-attr="some-words"></i>';
    var elements = document.body.querySelectorAll('[data-attr]');
    (0, _proclaim.strictEqual)(elements.length, 4);
});

test('querySelector for nested elements', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="css class"></span></div><span title="title"></span>';

    var span = document.body.querySelector('div span.css');
    (0, _proclaim.strictEqual)(span.getAttribute('class'), 'css class');
});

test('Element querySelector on several selectors', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="second">Text</span></div><i>Skip me</i><input type="text"/>';
    var element = document.body.querySelector('.first, input');
    (0, _proclaim.strictEqual)(element.getAttribute('type'), 'text');
});

test('Element querySelectorAll for several selectors', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first">Text</span></div><i>Skip me</i><input type="text"/>';
    var elements = document.body.querySelectorAll('.first, input');
    (0, _proclaim.strictEqual)(elements.length, 2);
    (0, _proclaim.strictEqual)(elements[0].textContent, 'Text');
    (0, _proclaim.strictEqual)(elements[1].getAttribute('type'), 'text');
});

test('Element querySelectorAll returns nothing if not found', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    var elements = document.body.querySelectorAll('i');
    (0, _proclaim.strictEqual)(elements.length, 0);
});

test('Element querySelector with ID', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div>1<div>2<div>3<span></span><div>4</div></div></div></div>';
    var elements = document.body.querySelectorAll('#element');
    (0, _proclaim.strictEqual)(elements.length, 0);
});

test('Element name equal or starts with "|="', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' + '<i data-attr="123-other">Skip me</i><input type="text"/><i data-attr="123other"></i>' + '<i data-attr="other123-"></i>';
    var elements = document.body.querySelectorAll('[data-attr|=123]');
    (0, _proclaim.strictEqual)(elements.length, 2);
});

test('Nesting with > combinator', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' + '<div><i data-attr="123-other"><span>Skip me</span></i></div><input type="text"/>' + '<i data-attr="123other"></i><i data-attr="other123-"></i>';
    var elements = document.body.querySelectorAll('div > span');
    (0, _proclaim.strictEqual)(elements.length, 1);
});

test('Nesting with + combinator', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' + '<div><i data-attr="123-other"><span>Skip me</span></i></div><input type="text"/>' + '<i data-attr="123other"></i><i data-attr="other123-"></i>';
    var element = document.body.querySelector('input + i');
    (0, _proclaim.strictEqual)(element.getAttribute('data-attr'), '123other');

    document.body.innerHTML = '<div></div><p></p><div></div><a></a>';
    element = document.body.querySelector('div + p');
    (0, _proclaim.strictEqual)(element.tagName, 'p');
});

test('Nesting with ~ combinator', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<div><span class="first" data-attr="123">Text</span></div>' + '<div><i data-attr="123-other"><span>Skip me</span></i></div><input type="text"/>' + '<i data-attr="123other"></i><i data-attr="other123-"></i>';
    var elements = document.body.querySelectorAll('input ~ i');
    (0, _proclaim.strictEqual)(elements.length, 2);
});

test('Searching for nested structures', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<b>' + '<span>' + '<b>' + '<span>' + '<b><span></span></b>' + '</span>' + '</b>' + '</span>' + '</b>';
    var elements = document.body.querySelectorAll('b > span');
    (0, _proclaim.strictEqual)(elements.length, 3);
});
//# sourceMappingURL=querySelectorHelper.js.map