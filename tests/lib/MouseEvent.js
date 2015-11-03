/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _proclaim2 = _interopRequireDefault(_proclaim);

var lib = '../../lib/';

var MouseEvent = require(lib + 'MouseEvent');

test('Default constructor', function () {
    var event = new MouseEvent('click');
    _proclaim2['default'].strictEqual(event.detail, 0);
    _proclaim2['default'].deepEqual(event.view, global);
});

test('Constructor extends fields', function () {
    var event = new MouseEvent('click', { screenX: 100, screenY: 100 });
    _proclaim2['default'].equal(event.screenX, 100);
    _proclaim2['default'].equal(event.screenY, 100);
});

test('Should throw on try to set fields', function () {
    var event = new MouseEvent('click');
    _proclaim2['default'].throws(function () {
        event.screenX = 100;
    });
});

test('Constructor should initialize all fields', function () {
    var event = new MouseEvent('click');
    _proclaim2['default'].equal(event.screenX, 0);
    _proclaim2['default'].equal(event.screenY, 0);
    _proclaim2['default'].equal(event.clientX, 0);
    _proclaim2['default'].equal(event.clientY, 0);
    _proclaim2['default'].equal(event.ctrlKey, false);
    _proclaim2['default'].equal(event.shiftKey, false);
    _proclaim2['default'].equal(event.altKey, false);
    _proclaim2['default'].equal(event.metaKey, false);
    _proclaim2['default'].equal(event.button, 0);
    _proclaim2['default'].equal(event.buttons, 0);
    _proclaim2['default'].equal(event.relatedTarget, null);
    _proclaim2['default'].equal(event.region, null);
});
//# sourceMappingURL=MouseEvent.js.map