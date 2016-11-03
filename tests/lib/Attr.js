/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var expect = _proclaim2['default'].strictEqual;
var throws = _proclaim2['default'].throws;

var lib = '../../lib/';

var Attr = require(lib + 'Attr');

test('Constructor and name attribute', function () {
    var a = new Attr('some', 'value');
    expect(a.name, 'some');
});

test('Constructor should throw if name is not set', function () {
    throws(function () {
        var b = new Attr();
        expect(b);
    });
});

test('name is readonly', function () {
    var a = new Attr('some', 'value');
    throws(function () {
        a.name = 'value';
    });
});

test('isId checks name', function () {
    var a = new Attr('some', 'value');
    expect(a.isId, false);

    var b = new Attr('id');
    expect(b.isId, true);
});

test('specified always true', function () {
    var b = new Attr('id');
    expect(b.specified, true);
});

test('value can be set', function () {
    var a = new Attr('a', 'value');
    expect(a.value, 'value');
    a.value = {};
    expect(a.value, '[object Object]');
});
//# sourceMappingURL=Attr.js.map