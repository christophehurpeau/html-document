/* global test */
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _proclaim = require('proclaim');

var _libUtilsCloneNodeHelper = require('../../../lib/utils/cloneNodeHelper');

var _libDocument = require('../../../lib/Document');

var _libDocument2 = _interopRequireDefault(_libDocument);

var document = new _libDocument2['default'](); // jshint ignore: line

test('Clone should throw on unknown Node type', function () {
    var node = document.createComment('Some comment');
    (0, _proclaim.throws)(function () {
        (0, _libUtilsCloneNodeHelper.cloneAnyNode)(node, true);
    });
});
//# sourceMappingURL=cloneNodeHelper.js.map