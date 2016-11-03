/* global test */
'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var expect = _proclaim2['default'].strictEqual;
var throws = _proclaim2['default'].throws;

var lib = '../../lib/';

var NamedNodeMap = require(lib + 'NamedNodeMap');
var Document = require(lib + 'Document');

test('Length is 0 on create', function () {
    var n = new NamedNodeMap();
    expect(n.length, 0);
});

test('setNamedItem should add attr to map', function () {
    var n = new NamedNodeMap();
    var document = new Document();
    var attr = document.createAttribute('some');
    n.setNamedItem(attr);
    expect(n.length, 1);
});

test('setNamedItem should throw if not attr argument', function () {
    var n = new NamedNodeMap();
    throws(function () {
        n.setNamedItem('some');
    });
});

test('setNamedItem should replace attr with same name', function () {
    var n = new NamedNodeMap();
    var document = new Document();
    var attr = document.createAttribute('some');
    attr.value = 'world';
    n.setNamedItem(attr);
    var attr2 = document.createAttribute('some');
    attr2.value = 'hello';
    var attr3 = n.setNamedItem(attr2);
    expect(attr3.value, 'world');
    expect(n.length, 1);
    expect(n.getNamedItem('some').value, 'hello');
});

test('getNamedItem should return null if no element found', function () {
    var n = new NamedNodeMap();
    expect(n.getNamedItem('some'), null);
});

test('getNamedItem should return Attr item if found', function () {
    var n = new NamedNodeMap();
    var document = new Document();
    var attr = document.createAttribute('some');
    n.setNamedItem(attr);
    var attr2 = n.getNamedItem('some');
    expect(attr2.name, 'some');
});

test('removeNamedItem should return null if no item', function () {
    var n = new NamedNodeMap();
    expect(n.removeNamedItem('some'), null);
});

test('removeNamedItem should return item', function () {
    var n = new NamedNodeMap();
    var document = new Document();
    var attr = document.createAttribute('some');
    n.setNamedItem(attr);
    var attr2 = n.removeNamedItem('some');
    expect(attr2.name, 'some');
    expect(n.length, 0);
});

test('item should return particular attribute in position', function () {
    var n = new NamedNodeMap();
    var document = new Document();
    var attr = document.createAttribute('some');
    n.setNamedItem(attr);
    expect(n.item(0).name, 'some');
});

test('item should return null on wrong index', function () {
    var n = new NamedNodeMap();
    expect(n.item(-1), null);
    expect(n.item(1), null);
});

test('NamedNodeMap should be iterable', function () {
    var n = new NamedNodeMap();
    var document = new Document();
    var a = document.createAttribute('some');
    var b = document.createAttribute('other');
    n.setNamedItem(a);
    n.setNamedItem(b);
    for (var _iterator = n, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var attr = _ref;

        expect(attr.specified, true);
    }
});
//# sourceMappingURL=NamedNodeMap.js.map