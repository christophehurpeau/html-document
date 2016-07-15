/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _libUtilsUrl = require('../../../lib/utils/Url');

var _libUtilsUrl2 = _interopRequireDefault(_libUtilsUrl);

test('Url constructor processing', function () {
    var url = new _libUtilsUrl2['default']();
    (0, _proclaim.equal)(url.toString(), 'about:blank');

    url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.equal)(url.toString(), 'http://some.link/');
});

test('Url toString', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.equal)(url, 'http://some.link/');
});

test('href member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/');

    url.href = 'ftp://test:test@other:8080';
    (0, _proclaim.strictEqual)(url.href, 'ftp://test:test@other:8080/');

    url.href = '';
    (0, _proclaim.strictEqual)(url.href, 'about:blank');
});

test('protocol member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.protocol, 'http:');

    url.protocol = 'some:';
    (0, _proclaim.strictEqual)(url.protocol, 'some:');

    url.protocol = 'ftp';
    (0, _proclaim.strictEqual)(url.protocol, 'ftp:');
});

test('host member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.host, 'some.link');

    url.href = 'ftp://test:test@other:8080';
    (0, _proclaim.strictEqual)(url.host, 'other:8080');

    url.host = 'my.url:8080';
    (0, _proclaim.strictEqual)(url.host, 'my.url:8080');

    url.host = 'other.url';
    url.port = '90';
    (0, _proclaim.strictEqual)(url.host, 'other.url:90');
});

test('auth member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.auth, '');

    url.auth = 'my:name';
    (0, _proclaim.strictEqual)(url.auth, 'my:name');

    url.href = 'http://other:name@link.com';
    (0, _proclaim.strictEqual)(url.auth, 'other:name');

    url.href = 'http://username@link.com';
    (0, _proclaim.strictEqual)(url.auth, 'username');
});

test('hostname member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.hostname, 'some.link');

    url.href = 'ftp://test:test@other:8080';
    (0, _proclaim.strictEqual)(url.hostname, 'other');

    url.hostname = 'my.url';
    (0, _proclaim.strictEqual)(url.hostname, 'my.url');

    url.host = 'other.url';
    url.port = '90';
    (0, _proclaim.strictEqual)(url.hostname, 'other.url');
});

test('port member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
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

    url = new _libUtilsUrl2['default']('https://secure.link');
    (0, _proclaim.strictEqual)(url.port, '443');

    url = new _libUtilsUrl2['default']('mongo://mongo.link');
    (0, _proclaim.strictEqual)(url.port, '');
});

test('pathname member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.pathname, '/');

    url.pathname = '/some/path/on/site.html';
    (0, _proclaim.strictEqual)(url.pathname, '/some/path/on/site.html');
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/some/path/on/site.html');
});

test('search member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.search, '');

    url.href = 'http://some.link/some/path/on/site.html?search=me';
    (0, _proclaim.strictEqual)(url.search, '?search=me');

    url.search = 'myparams for search';
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/some/path/on/site.html?myparams for search');
});

test('hash member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.strictEqual)(url.hash, '#');

    url.hash = '#hash';
    (0, _proclaim.strictEqual)(url.hash, '#hash');

    url.hash = 'some_hash';
    (0, _proclaim.strictEqual)(url.hash, '#some_hash');
    (0, _proclaim.strictEqual)(url.href, 'http://some.link/#some_hash');
});

test('username member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
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

test('password member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
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

test('searchParams member', function () {
    var url = new _libUtilsUrl2['default']('http://some.link');
    (0, _proclaim.deepEqual)(url.searchParams, {});

    url.href = 'http://some.link/some/path/on/site.html?search=me';
    (0, _proclaim.strictEqual)(url.searchParams.search, 'me');
});
//# sourceMappingURL=Url.js.map