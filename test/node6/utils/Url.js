'use strict';

var _proclaim = require('proclaim');

var _ = require('../../..');

const Url = _.utils.Url;

suite('Url', () => {
  test('Url constructor processing', () => {
    let url = new Url();
    (0, _proclaim.equal)(url.toString(), 'about:blank');

    url = new Url('http://some.link');
    (0, _proclaim.equal)(url.toString(), 'http://some.link/');
  });

  test('Url toString', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.equal)(url, 'http://some.link/');
  });

  test('href member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/');

    url.href = 'ftp://test:test@other:8080';
    (0, _proclaim.strictEqual)(url.href, 'ftp://test:test@other:8080/');

    url.href = '';
    (0, _proclaim.strictEqual)(url.href, 'about:blank');
  });

  test('protocol member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.protocol, 'http:');

    url.protocol = 'some:';
    (0, _proclaim.strictEqual)(url.protocol, 'some:');

    url.protocol = 'ftp';
    (0, _proclaim.strictEqual)(url.protocol, 'ftp:');
  });

  test('host member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.host, 'some.link');

    url.href = 'ftp://test:test@other:8080';
    (0, _proclaim.strictEqual)(url.host, 'other:8080');

    url.host = 'my.url:8080';
    (0, _proclaim.strictEqual)(url.host, 'my.url:8080');

    url.host = 'other.url';
    url.port = '90';
    (0, _proclaim.strictEqual)(url.host, 'other.url:90');
  });

  test('auth member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.auth, '');

    url.auth = 'my:name';
    (0, _proclaim.strictEqual)(url.auth, 'my:name');

    url.href = 'http://other:name@link.com';
    (0, _proclaim.strictEqual)(url.auth, 'other:name');

    url.href = 'http://username@link.com';
    (0, _proclaim.strictEqual)(url.auth, 'username');
  });

  test('hostname member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.hostname, 'some.link');

    url.href = 'ftp://test:test@other:8080';
    (0, _proclaim.strictEqual)(url.hostname, 'other');

    url.hostname = 'my.url';
    (0, _proclaim.strictEqual)(url.hostname, 'my.url');

    url.host = 'other.url';
    url.port = '90';
    (0, _proclaim.strictEqual)(url.hostname, 'other.url');
  });

  test('port member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.port, '80');

    url.href = 'ftp://test:test@other';
    (0, _proclaim.strictEqual)(url.port, '21');

    url.host = 'my.url:8080';
    (0, _proclaim.strictEqual)(url.port, '8080');

    url.host = 'other.url';
    url.port = '90';
    (0, _proclaim.strictEqual)(url.host, 'other.url:90');
    (0, _proclaim.strictEqual)(url.href, 'ftp://test:test@other.url:90/');

    url.port = 'some other value';
    (0, _proclaim.strictEqual)(url.href, 'ftp://test:test@other.url/');

    url = new Url('https://secure.link');
    (0, _proclaim.strictEqual)(url.port, '443');

    url = new Url('mongo://mongo.link');
    (0, _proclaim.strictEqual)(url.port, '');
  });

  test('pathname member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.pathname, '/');

    url.pathname = '/some/path/on/site.html';
    (0, _proclaim.strictEqual)(url.pathname, '/some/path/on/site.html');
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/some/path/on/site.html');
  });

  test('search member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.search, '');

    url.href = 'http://some.link/some/path/on/site.html?search=me';
    (0, _proclaim.strictEqual)(url.search, '?search=me');

    url.search = 'myparams for search';
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/some/path/on/site.html?myparams for search');
  });

  test('hash member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.hash, '#');

    url.hash = '#hash';
    (0, _proclaim.strictEqual)(url.hash, '#hash');

    url.hash = 'some_hash';
    (0, _proclaim.strictEqual)(url.hash, '#some_hash');
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/#some_hash');
  });

  test('username member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.username, '');

    url.username = 'user';
    (0, _proclaim.strictEqual)(url.auth, 'user');

    url.auth = 'my:name';
    (0, _proclaim.strictEqual)(url.username, 'my');

    url.href = 'http://other:name@link.com';
    (0, _proclaim.strictEqual)(url.username, 'other');

    url.href = 'http://username@link.com';
    (0, _proclaim.strictEqual)(url.username, 'username');

    url.href = 'http://:username@link.com';
    (0, _proclaim.strictEqual)(url.username, '');

    url.username = 'me';
    (0, _proclaim.strictEqual)(url.auth, 'me:username');
  });

  test('password member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.strictEqual)(url.password, '');

    url.password = 'pass';
    (0, _proclaim.strictEqual)(url.auth, ':pass');

    url.auth = 'my:name';
    (0, _proclaim.strictEqual)(url.password, 'name');

    url.href = 'http://other:name@link.com';
    (0, _proclaim.strictEqual)(url.password, 'name');

    url.href = 'http://username@link.com';
    (0, _proclaim.strictEqual)(url.password, '');

    url.password = 'password';
    (0, _proclaim.strictEqual)(url.auth, 'username:password');

    url.href = 'http://:username@link.com';
    (0, _proclaim.strictEqual)(url.password, 'username');
  });

  test('searchParams member', () => {
    let url = new Url('http://some.link');
    (0, _proclaim.deepEqual)(url.searchParams, {});

    url.href = 'http://some.link/some/path/on/site.html?search=me';
    (0, _proclaim.strictEqual)(url.searchParams.search, 'me');
  });
});
//# sourceMappingURL=Url.js.map