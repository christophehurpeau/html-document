/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _libDocument = require('../../../lib/Document');

var _libDocument2 = _interopRequireDefault(_libDocument);

var _libUtilsHTMLCollection = require('../../../lib/utils/HTMLCollection');

var _libUtilsHTMLCollection2 = _interopRequireDefault(_libUtilsHTMLCollection);

test('HTMLCollection constructor', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    var collection = new _libUtilsHTMLCollection2['default'](document.body, function () {
        return true;
    });
    (0, _proclaim.strictEqual)(collection.length, 3);
});

test('HTMLCollection.item', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    var collection = new _libUtilsHTMLCollection2['default'](document.body, function () {
        return true;
    });
    (0, _proclaim.strictEqual)(collection.item(2).tagName, 'b');
});

test('HTMLCollection.item returns null on index out of bounds', function () {
    var document = new _libDocument2['default']();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    var collection = new _libUtilsHTMLCollection2['default'](document.body, function () {
        return true;
    });
    (0, _proclaim.isNull)(collection.item(20));
});

test('HTMLCollection should return live collection', function () {
    var document = new _libDocument2['default']();
    var divCollection = document.body.getElementsByTagName('div');
    document.body.appendChild(document.createElement('div'));
    (0, _proclaim.strictEqual)(divCollection.length, 1);
    document.body.innerHTML = '';
    (0, _proclaim.strictEqual)(divCollection.length, 0);
});
//# sourceMappingURL=HTMLCollection.js.map