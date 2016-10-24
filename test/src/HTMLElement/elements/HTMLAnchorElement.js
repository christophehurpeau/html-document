import { strictEqual } from 'proclaim';
import { Document, HTMLAnchorElement } from '../../../../src';

suite('HTMLAnchorElement', () => {
  test('HTMLAnchorElement should have the nodeName == table ', () => {
    let elt = new HTMLAnchorElement();
    elt._ownerDocument = new Document();
    strictEqual(elt.nodeName, 'a');
  });

  test('HTMLAnchorElement should provide hash', () => {
    let elt = new HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    strictEqual(elt.hash, '#hash-data');
  });

  test('HTMLAnchorElement should provide host', () => {
    let elt = new HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    strictEqual(elt.host, '');
    elt.href = 'http://www.google.com:80/some-url';
    strictEqual(elt.host, 'www.google.com:80');
  });

  test('HTMLAnchorElement should provide hostname', () => {
    let elt = new HTMLAnchorElement();
    elt.href = '/someurl#hash-data';
    strictEqual(elt.hostname, '');
    elt.href = 'http://www.google.com:80/some-url';
    strictEqual(elt.hostname, 'www.google.com');
  });

  test('HTMLAnchorElement clone should clone href', () => {
    let document = new Document();
    let elt = document.createElement('a');
    elt.href = '/someurl#hash-data';
    let clone = elt.cloneNode();
    strictEqual(clone.hash, '#hash-data');
  });

  test('HTMLAnchorElement set hostname for relative pathes', () => {
    let document = new Document();
    document.location = 'http://some.test:80/page';
    let elt = document.createElement('a');
    elt.href = 'mypage.html';
    strictEqual(elt.pathname, 'mypage.html');
    strictEqual(elt.href, 'http://some.test:80/mypage.html');
  });

  test('HTMLAnchorElement protocol returned with ":"', () => {
    let document = new Document();
    document.location = 'http://some.test:80/page';
    let elt = document.createElement('a');
    elt.href = 'mypage.html';
    strictEqual(elt.protocol, 'http:');
    elt.protocol = 'ftp';
    strictEqual(elt.protocol, 'ftp:');
    strictEqual(elt.href, 'ftp://some.test:80/mypage.html');
  });

  test('HTMLAnchorElement rel process properly', () => {
    let document = new Document();
    document.body.innerHTML = '<a href="" rel="nofollow">Text</a>';
    let elt = document.body.querySelector('a[rel="nofollow"]');
    strictEqual(elt.getAttribute('rel'), 'nofollow');
    strictEqual(elt.rel, 'nofollow');
    elt.rel = 'thisisrel';
    strictEqual(elt.getAttribute('rel'), 'thisisrel');
  });

  test('HTMLAnchorElement hash process properly', () => {
    let document = new Document();
    document.body.innerHTML = '<a href="#some">Text</a>';
    let elt = document.body.querySelector('a');
    strictEqual(elt.hash, '#some');
    elt.hash = 'other';
    strictEqual(elt.href, 'about:blank#other');
  });

  test('HTMLAnchorElement host processed properly', () => {
    let document = new Document();
    document.body.innerHTML = '<a href="http://other.link:85">Text</a>';
    let elt = document.body.querySelector('a');
    strictEqual(elt.host, 'other.link:85');
    elt.host = 'some.link';
    strictEqual(elt.href, 'http://some.link/');
  });

  test('HTMLAnchorElement hostname processed properly', () => {
    let document = new Document();
    document.body.innerHTML = '<a href="http://other.link:85">Text</a>';
    let elt = document.body.querySelector('a');
    strictEqual(elt.hostname, 'other.link');
    elt.hostname = 'some.link';
    strictEqual(elt.href, 'http://some.link:85/');
  });

  test('HTMLAnchorElement pathname processed properly', () => {
    let document = new Document();
    document.body.innerHTML = '<a href="http://other.link/path/with/me">Text</a>';
    let elt = document.body.querySelector('a');
    strictEqual(elt.pathname, '/path/with/me');
    elt.pathname = 'some/path';
    strictEqual(elt.href, 'http://other.link/some/path');
  });

  test('HTMLAnchorElement setAttribute', () => {
    let document = new Document();
    document.location.href = 'https://github.com/';
    let object = document.createElement('a');
    object.setAttribute('href', '/some_relative_url');
    strictEqual(object.href, 'https://github.com/some_relative_url');
    strictEqual(object.getAttribute('href'), '/some_relative_url');
  });

  test('HTMLAnchorElement set hash', () => {
    let document = new Document();
    document.location.href = 'https://github.com/';
    let a = document.createElement('a');
    a.href = '/';
    strictEqual(a.href, 'https://github.com/');
    a.hash = '#some';
    strictEqual(a.href, 'https://github.com/#some');
    strictEqual(a.getAttribute('href'), 'https://github.com/#some');
  });

  test('HTMLAnchorElement should process javascript protocol properly', () => {
    let document = new Document();
    let element = document.createElement('a');
    element.href = 'javascript:void(0);'; // eslint-disable-line no-script-url
    strictEqual(element.host, '');
    strictEqual(element.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
    strictEqual(element.protocol, 'javascript:'); // eslint-disable-line no-script-url
  });

  test('HTMLAnchorElement hash dont apply on javascript scheme', () => {
    let document = new Document();
    document.body.innerHTML = '<a href="javascript:void(0);">Text</a>'; // eslint-disable-line no-script-url
    let elt = document.body.querySelector('a');
    strictEqual(elt.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
    elt.hash = '#some';
    strictEqual(elt.href, 'javascript:void(0);'); // eslint-disable-line no-script-url
  });

  test('HTMLAnchorElement hash do nothing on null value', () => {
    let document = new Document();
    let element = document.createElement('a');
    element.href = 'http://some.link/#hash';
    element.hash = null;
    strictEqual(element.hash, '#hash');
  });
});
