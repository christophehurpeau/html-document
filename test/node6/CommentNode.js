'use strict';

var _proclaim = require('proclaim');

var _ = require('../..');

suite('Comment', () => {
  test('create a Comment Node', () => {
    let comment = new _.Comment('Hello');

    (0, _proclaim.strictEqual)(comment.data, 'Hello');
    (0, _proclaim.strictEqual)(comment.innerHTML, '');
    (0, _proclaim.strictEqual)(comment.outerHTML, '<!--Hello-->');
  });
});
//# sourceMappingURL=CommentNode.js.map