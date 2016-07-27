/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var lib = '../../lib/';

var Document = require(lib + 'Document');

test('Element querySelector', function () {
    var document = new Document();
    var div = document.createElement('div');
    var span = document.createElement('span');
    div.appendChild(span);

    _proclaim2['default'].strictEqual(div.querySelector('span'), span);
});

test('Element querySelectorAll', function () {
    var document = new Document();
    var div = document.createElement('div');
    var span = document.createElement('span');
    div.appendChild(span);

    _proclaim2['default'].deepEqual(div.querySelectorAll('span'), [span]);
});

test('Element getElementsByTagName should search elements everywhere', function () {
    var document = new Document();
    document.documentElement.innerHTML = '<html><head><meta name="keywords"/></head><body><meta name="other"/>' + '<div><meta name="other"/></div></body>';
    var metas = document.getElementsByTagName('meta');
    _proclaim2['default'].equal(metas.length, 3);
});

test('Element firstElementChild', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    var div = document.body.firstChild;
    _proclaim2['default'].equal(div.firstElementChild.tagName, 'span');
});

test('Element lastElementChild', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    var div = document.body.firstChild;
    _proclaim2['default'].equal(div.lastElementChild.tagName, 'a');
});

test('Element nextElementSibling', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    var span = document.body.firstChild.firstElementChild;
    _proclaim2['default'].equal(span.nextElementSibling.tagName, 'b');
});

test('Element nextElementSibling on last element', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    var a = document.body.firstChild.lastElementChild;
    _proclaim2['default'].isNull(a.nextElementSibling);
});

test('Element previousElementSibling', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    var a = document.body.firstChild.lastElementChild;
    _proclaim2['default'].equal(a.previousElementSibling.tagName, 'b');
});

test('Element previousElementSibling on first element', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span>This is text<b></b> and more text<a></a></div>';
    var span = document.body.firstChild.firstElementChild;
    _proclaim2['default'].isNull(span.previousElementSibling);
});

test('Element previousElementSibling on only child', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span></div>';
    var span = document.body.firstChild.firstElementChild;
    _proclaim2['default'].isNull(span.previousElementSibling);
});

test('Element nextElementSibling on only child', function () {
    var document = new Document();
    document.body.innerHTML = '<div><span></span></div>';
    var span = document.body.firstChild.firstElementChild;
    _proclaim2['default'].isNull(span.nextElementSibling);
});

test('getElementsByTagName returns everything if tag name not set', function () {
    var document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    var collection = document.getElementsByTagName();
    _proclaim2['default'].equal(collection.length, 4);
});

test('getElementsByClassName returns HTMLCollection', function () {
    var document = new Document();
    document.body.innerHTML = '<b class="some class"></b><div><b class="some"></b></div>';
    var somes = document.getElementsByClassName('some');
    _proclaim2['default'].equal(somes.length, 2);
    var someClasses = document.getElementsByClassName('class some');
    _proclaim2['default'].equal(someClasses.length, 1);
});

test('getElementsByClassName returns live HTMLCollection', function () {
    var document = new Document();
    var somes = document.getElementsByClassName('some');
    document.body.innerHTML = '<b class="some class"></b><div><b class="some"></b></div>';
    _proclaim2['default'].equal(somes.length, 2);
});
//# sourceMappingURL=Element.js.map