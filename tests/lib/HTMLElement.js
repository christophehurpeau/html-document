/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var lib = '../../lib/';

var Document = require(lib + 'Document');

test('Element dataset code using', function () {
    var document = new Document();
    var element = document.createElement('i');
    element.dataset.value = 5;
    _proclaim2['default'].equal(element.dataset.value, 5);
});

test('Element dataset markup using', function () {
    var document = new Document();
    document.body.innerHTML = '<b data-attr="some value"></b>';
    var element = document.body.firstChild;
    _proclaim2['default'].equal(element.dataset.attr, 'some value');
});
//# sourceMappingURL=HTMLElement.js.map