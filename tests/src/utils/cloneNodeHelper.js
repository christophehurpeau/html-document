/* global test */
import { throws } from 'proclaim';
import { cloneAnyNode } from '../../../lib/utils/cloneNodeHelper';
import Document from '../../../lib/Document';

const document = new Document();// jshint ignore: line

test('Clone should throw on unknown Node type', () => {
    const node = document.createComment('Some comment');
    throws(() => {
        cloneAnyNode(node, true);
    });
});
