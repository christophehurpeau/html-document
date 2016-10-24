import { strictEqual } from 'proclaim';
import { Comment } from '../../src';

suite('Comment', () => {
  test('create a Comment Node', () => {
    let comment = new Comment('Hello');

    strictEqual(comment.data, 'Hello');
    strictEqual(comment.innerHTML, '');
    strictEqual(comment.outerHTML, '<!--Hello-->');
  });
});
