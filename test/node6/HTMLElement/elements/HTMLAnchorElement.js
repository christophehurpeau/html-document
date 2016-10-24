'use strict';

var _proclaim = require('proclaim');

var _ = require('../../../..');

suite('HTMLAnchorElement', () => {
  test('HTMLAnchorElement should have the nodeName == table ', () => {
    let elt = new _.HTMLAnchorElement();
    elt._ownerDocument = new _.Document();
    (0, _proclaim.strictEqual)(elt.nodeName, 'a');
  });

  test('HTMLAnchorElement should provide hash', () => {
    let elt = new _.HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    (0, _proclaim.strictEqual)(elt.hash, '#hash-data');
  });

  test('HTMLAnchorElement should provide host', () => {
    let elt = new _.HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    (0, _proclaim.strictEqual)(elt.host, '');
    elt.href = 'http://www.google.com:80/some-url';
    (0, _proclaim.strictEqual)(elt.host, 'www.google.com:80');
  });

  test('HTMLAnchorElement should provide hostname', () => {
    let elt = new _.HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    (0, _proclaim.strictEqual)(elt.hostname, '');
    elt.href = 'http://www.google.com:80/some-url';
    (0, _proclaim.strictEqual)(elt.hostname, 'www.google.com');
  });

  test('HTMLAnchorElement clone should clone href', () => {
    let document = new _.Document();
    let elt = document.createElement('a');
    elt.href = '/someurl#hash-data';
    let clone = elt.cloneNode();
    (0, _proclaim.strictEqual)(clone.hash, '#hash-data');
  });

  test('HTMLAnchorElement set hostname for relative pathes', () => {
    let document = new _.Document();
    document.location = 'http://some.test:80/page';
    let elt = document.createElement('a');
    elt.href = 'mypage.html';
    (0, _proclaim.strictEqual)(elt.pathname, 'mypage.html');
    (0, _proclaim.strictEqual)(elt.href, 'http://some.test:80/mypage.html');
  });

  test('HTMLAnchorElement protocol returned with ":"', () => {
    let document = new _.Document();
    document.location = 'http://some.test:80/page';
    let elt = document.createElement('a');
    elt.href = 'mypage.html';
    (0, _proclaim.strictEqual)(elt.protocol, 'http:');
    elt.protocol = 'ftp';
    (0, _proclaim.strictEqual)(elt.protocol, 'ftp:');
    (0, _proclaim.strictEqual)(elt.href, 'ftp://some.test:80/mypage.html');
  });

  test('HTMLAnchorElement rel process properly', () => {
    let document = new _.Document();
    document.body.innerHTML = '<a href="" rel="nofollow">Text</a>';
    let elt = document.body.querySelector('a[rel="nofollow"]');
    (0, _proclaim.strictEqual)(elt.getAttribute('rel'), 'nofollow');
    (0, _proclaim.strictEqual)(elt.rel, 'nofollow');
    elt.rel = 'thisisrel';
    (0, _proclaim.strictEqual)(elt.getAttribute('rel'), 'thisisrel');
  });

  test('HTMLAnchorElement hash process properly', () => {
    let document = new _.Document();
    document.body.innerHTML = '<a href="#some">Text</a>';
    let elt = document.body.querySelector('a');
    (0, _proclaim.strictEqual)(elt.hash, '#some');
    elt.hash = 'other';
    (0, _proclaim.strictEqual)(elt.href, 'about:blank#other');
  });

  test('HTMLAnchorElement host processed properly', () => {
    let document = new _.Document();
    document.body.innerHTML = '<a href="http://other.link:85">Text</a>';
    let elt = document.body.querySelector('a');
    (0, _proclaim.strictEqual)(elt.host, 'other.link:85');
    elt.host = 'some.link';
    (0, _proclaim.strictEqual)(elt.href, 'http://some.link/');
  });

  test('HTMLAnchorElement hostname processed properly', () => {
    let document = new _.Document();
    document.body.innerHTML = '<a href="http://other.link:85">Text</a>';
    let elt = document.body.querySelector('a');
    (0, _proclaim.strictEqual)(elt.hostname, 'other.link');
    elt.hostname = 'some.link';
    (0, _proclaim.strictEqual)(elt.href, 'http://some.link:85/');
  });

  test('HTMLAnchorElement pathname processed properly', () => {
    let document = new _.Document();
    document.body.innerHTML = '<a href="http://other.link/path/with/me">Text</a>';
    let elt = document.body.querySelector('a');
    (0, _proclaim.strictEqual)(elt.pathname, '/path/with/me');
    elt.pathname = 'some/path';
    (0, _proclaim.strictEqual)(elt.href, 'http://other.link/some/path');
  });

  test('HTMLAnchorElement setAttribute', () => {
    let document = new _.Document();
    document.location.href = 'https://github.com/';
    let object = document.createElement('a');
    object.setAttribute('href', '/some_relative_url');
    (0, _proclaim.strictEqual)(object.href, 'https://github.com/some_relative_url');
    (0, _proclaim.strictEqual)(object.getAttribute('href'), '/some_relative_url');
  });

  test('HTMLAnchorElement set hash', () => {
    let document = new _.Document();
    document.location.href = 'https://github.com/';
    let a = document.createElement('a');
    a.href = '/';
    (0, _proclaim.strictEqual)(a.href, 'https://github.com/');
    a.hash = '#some';
    (0, _proclaim.strictEqual)(a.href, 'https://github.com/#some');
    (0, _proclaim.strictEqual)(a.getAttribute('href'), 'https://github.com/#some');
  });

  test('HTMLAnchorElement should process javascript protocol properly', () => {
    let document = new _.Document();
    let element = document.createElement('a');
    element.href = 'javascript:void(0);'; // eslint-disable-line no-script-url
    (0, _proclaim.strictEqual)(element.host, '');
    (0, _proclaim.strictEqual)(element.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
    (0, _proclaim.strictEqual)(element.protocol, 'javascript:'); // eslint-disable-line no-script-url
  });

  test('HTMLAnchorElement hash dont apply on javascript scheme', () => {
    let document = new _.Document();
    document.body.innerHTML = '<a href="javascript:void(0);">Text</a>'; // eslint-disable-line no-script-url
    let elt = document.body.querySelector('a');
    (0, _proclaim.strictEqual)(elt.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
    elt.hash = '#some';
    (0, _proclaim.strictEqual)(elt.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
  });

  test('HTMLAnchorElement hash do nothing on null value', () => {
    let document = new _.Document();
    let element = document.createElement('a');
    element.href = 'http://some.link/#hash';
    element.hash = null;
    (0, _proclaim.strictEqual)(element.hash, '#hash');
  });
});
//# sourceMappingURL=HTMLAnchorElement.js.map