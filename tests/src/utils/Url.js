/* global test */
import { equal, strictEqual, deepEqual } from 'proclaim';
import Url from '../../../lib/utils/Url';

test('Url constructor processing', () => {
    let url = new Url();
    equal(url.toString(), 'about:blank');

    url = new Url('http://some.link');
    equal(url.toString(), 'http://some.link/');
});

test('Url toString', () => {
    let url = new Url('http://some.link');
    equal(url, 'http://some.link/');
});

test('href member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.href, 'http://some.link/');

    url.href = 'ftp://test:test@other:8080';
    strictEqual(url.href, 'ftp://test:test@other:8080/');

    url.href = '';
    strictEqual(url.href, 'about:blank');
});

test('protocol member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.protocol, 'http:');

    url.protocol = 'some:';
    strictEqual(url.protocol, 'some:');

    url.protocol = 'ftp';
    strictEqual(url.protocol, 'ftp:');
});

test('host member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.host, 'some.link');

    url.href = 'ftp://test:test@other:8080';
    strictEqual(url.host, 'other:8080');

    url.host = 'my.url:8080';
    strictEqual(url.host, 'my.url:8080');

    url.host = 'other.url';
    url.port = '90';
    strictEqual(url.host, 'other.url:90');
});

test('auth member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.auth, '');

    url.auth = 'my:name';
    strictEqual(url.auth, 'my:name');

    url.href = 'http://other:name@link.com';
    strictEqual(url.auth, 'other:name');

    url.href = 'http://username@link.com';
    strictEqual(url.auth, 'username');
});

test('hostname member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.hostname, 'some.link');

    url.href = 'ftp://test:test@other:8080';
    strictEqual(url.hostname, 'other');

    url.hostname = 'my.url';
    strictEqual(url.hostname, 'my.url');

    url.host = 'other.url';
    url.port = '90';
    strictEqual(url.hostname, 'other.url');
});

test('port member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.port, '80');

    url.href = 'ftp://test:test@other';
    strictEqual(url.port, '21');

    url.host = 'my.url:8080';
    strictEqual(url.port, '8080');

    url.host = 'other.url';
    url.port = '90';
    strictEqual(url.host, 'other.url:90');
    strictEqual(url.href, 'ftp://test:test@other.url:90/');

    url.port = 'some other value';
    strictEqual(url.href, 'ftp://test:test@other.url/');

    url = new Url('https://secure.link');
    strictEqual(url.port, '443');

    url = new Url('mongo://mongo.link');
    strictEqual(url.port, '');
});

test('pathname member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.pathname, '/');

    url.pathname = '/some/path/on/site.html';
    strictEqual(url.pathname, '/some/path/on/site.html');
    strictEqual(url.href, 'http://some.link/some/path/on/site.html');
});

test('search member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.search, '');

    url.href = 'http://some.link/some/path/on/site.html?search=me';
    strictEqual(url.search, '?search=me');

    url.search = 'myparams for search';
    strictEqual(url.href, 'http://some.link/some/path/on/site.html?myparams for search');
});

test('hash member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.hash, '#');

    url.hash = '#hash';
    strictEqual(url.hash, '#hash');

    url.hash = 'some_hash';
    strictEqual(url.hash, '#some_hash');
    strictEqual(url.href, 'http://some.link/#some_hash');
});

test('username member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.username, '');

    url.username = 'user';
    strictEqual(url.auth, 'user');

    url.auth = 'my:name';
    strictEqual(url.username, 'my');

    url.href = 'http://other:name@link.com';
    strictEqual(url.username, 'other');

    url.href = 'http://username@link.com';
    strictEqual(url.username, 'username');

    url.href = 'http://:username@link.com';
    strictEqual(url.username, '');

    url.username = 'me';
    strictEqual(url.auth, 'me:username');
});

test('password member', () => {
    let url = new Url('http://some.link');
    strictEqual(url.password, '');

    url.password = 'pass';
    strictEqual(url.auth, ':pass');

    url.auth = 'my:name';
    strictEqual(url.password, 'name');

    url.href = 'http://other:name@link.com';
    strictEqual(url.password, 'name');

    url.href = 'http://username@link.com';
    strictEqual(url.password, '');

    url.password = 'password';
    strictEqual(url.auth, 'username:password');

    url.href = 'http://:username@link.com';
    strictEqual(url.password, 'username');
});

test('searchParams member', () => {
    let url = new Url('http://some.link');
    deepEqual(url.searchParams, {});

    url.href = 'http://some.link/some/path/on/site.html?search=me';
    strictEqual(url.searchParams.search, 'me');
});
