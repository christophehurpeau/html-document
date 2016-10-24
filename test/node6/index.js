'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _ = require('../..');

var index = _interopRequireWildcard(_);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global suite, test */
suite('index exports', () => {
  ['Comment', 'Doctype', 'Document', 'DocumentFragment', 'DOMException', 'Element', 'Event', 'HTMLElement', 'Node', 'Node', 'NodeList', 'ParentNode', 'Text', 'parse'].forEach(key => test(key, () => (0, _assert2.default)(index.key, `${ key } is missing`)));
});
//# sourceMappingURL=index.js.map