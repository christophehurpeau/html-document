/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var expect = _proclaim2['default'].strictEqual;

var lib = '../../../../lib/';

var HTMLAnchorElement = require(lib + 'HTMLElement/elements/HTMLAnchorElement');
var Document = require(lib + 'Document');

test('HTMLAnchorElement should have the nodeName == a ', function () {
    var elt = new HTMLAnchorElement();
    elt._ownerDocument = new Document();
    expect(elt.nodeName, 'a');
});

test('HTMLAnchorElement should provide hash', function () {
    var elt = new HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    expect(elt.hash, '#hash-data');
});

test('HTMLAnchorElement should provide host', function () {
    var elt = new HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    expect(elt.host, '');
    elt.href = 'http://www.google.com:80/some-url';
    expect(elt.host, 'www.google.com:80');
});

test('HTMLAnchorElement should provide hostname', function () {
    var elt = new HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    expect(elt.hostname, '');
    elt.href = 'http://www.google.com:80/some-url';
    expect(elt.hostname, 'www.google.com');
});

test('HTMLAnchorElement clone should clone href', function () {
    var document = new Document();
    var elt = document.createElement('a');
    elt.href = '/someurl#hash-data';
    var clone = elt.cloneNode();
    expect(clone.hash, '#hash-data');
});

test('HTMLAnchorElement set hostname for relative pathes', function () {
    var document = new Document();
    document.location = 'http://some.test:80/page';
    var elt = document.createElement('a');
    elt.href = 'mypage.html';
    expect(elt.pathname, 'mypage.html');
    expect(elt.href, 'http://some.test:80/mypage.html');
});

test('HTMLAnchorElement protocol returned with ":"', function () {
    var document = new Document();
    document.location = 'http://some.test:80/page';
    var elt = document.createElement('a');
    elt.href = 'mypage.html';
    expect(elt.protocol, 'http:');
    elt.protocol = 'ftp';
    expect(elt.protocol, 'ftp:');
    expect(elt.href, 'ftp://some.test:80/mypage.html');
});

test('HTMLAnchorElement rel process properly', function () {
    var document = new Document();
    document.body.innerHTML = '<a href="" rel="nofollow">Text</a>';
    var elt = document.body.querySelector('a[rel="nofollow"]');
    expect(elt.getAttribute('rel'), 'nofollow');
    expect(elt.rel, 'nofollow');
    elt.rel = 'thisisrel';
    expect(elt.getAttribute('rel'), 'thisisrel');
});

test('HTMLAnchorElement hash process properly', function () {
    var document = new Document();
    document.body.innerHTML = '<a href="#some">Text</a>';
    var elt = document.body.querySelector('a');
    expect(elt.hash, '#some');
    elt.hash = 'other';
    expect(elt.href, 'about:blank#other');
});

test('HTMLAnchorElement host processed properly', function () {
    var document = new Document();
    document.body.innerHTML = '<a href="http://other.link:85">Text</a>';
    var elt = document.body.querySelector('a');
    expect(elt.host, 'other.link:85');
    elt.host = 'some.link';
    expect(elt.href, 'http://some.link/');
});

test('HTMLAnchorElement hostname processed properly', function () {
    var document = new Document();
    document.body.innerHTML = '<a href="http://other.link:85">Text</a>';
    var elt = document.body.querySelector('a');
    expect(elt.hostname, 'other.link');
    elt.hostname = 'some.link';
    expect(elt.href, 'http://some.link:85/');
});

test('HTMLAnchorElement pathname processed properly', function () {
    var document = new Document();
    document.body.innerHTML = '<a href="http://other.link/path/with/me">Text</a>';
    var elt = document.body.querySelector('a');
    expect(elt.pathname, '/path/with/me');
    elt.pathname = 'some/path';
    expect(elt.href, 'http://other.link/some/path');
});

test('HTMLAnchorElement setAttribute', function () {
    var document = new Document();
    document.location.href = 'https://github.com/';
    var object = document.createElement('a');
    object.setAttribute('href', '/some_relative_url');
    expect(object.href, 'https://github.com/some_relative_url');
    expect(object.getAttribute('href'), '/some_relative_url');
});

test('HTMLAnchorElement set hash', function () {
    var document = new Document();
    document.location.href = 'https://github.com/';
    var a = document.createElement('a');
    a.href = '/';
    expect(a.href, 'https://github.com/');
    a.hash = '#some';
    expect(a.href, 'https://github.com/#some');
    expect(a.getAttribute('href'), 'https://github.com/#some');
});

test('HTMLAnchorElement should process javascript protocol properly', function () {
    var document = new Document();
    var element = document.createElement('a');
    element.href = 'javascript:void(0);'; // eslint-disable-line no-script-url
    expect(element.host, '');
    expect(element.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
    expect(element.protocol, 'javascript:'); // eslint-disable-line no-script-url
});

test('HTMLAnchorElement hash dont apply on javascript scheme', function () {
    var document = new Document();
    document.body.innerHTML = '<a href="javascript:void(0);">Text</a>'; // eslint-disable-line no-script-url
    var elt = document.body.querySelector('a');
    expect(elt.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
    elt.hash = '#some';
    expect(elt.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
});

test('HTMLAnchorElement hash do nothing on null value', function () {
    var document = new Document();
    var element = document.createElement('a');
    element.href = 'http://some.link/#hash';
    element.hash = null;
    expect(element.hash, '#hash');
});
//# sourceMappingURL=HTMLAnchorElement.js.map