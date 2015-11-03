/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var lib = '../../lib/';

var UIEvent = require(lib + 'UIEvent');

test('Default constructor', function () {
    var event = new UIEvent('click');
    _proclaim2['default'].strictEqual(event.detail, 0);
    _proclaim2['default'].deepEqual(event.view, global);
});

test('Should throw on try to set fields', function () {
    var event = new UIEvent('click');
    _proclaim2['default'].throws(function () {
        event.detail = 100;
    });
});
//# sourceMappingURL=UIEvent.js.map