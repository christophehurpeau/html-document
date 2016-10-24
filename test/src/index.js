/* global suite, test */
import ok from 'assert';
import * as index from '../..';

suite('index exports', () => {
  [
    'Comment',
    'Doctype',
    'Document',
    'DocumentFragment',
    'DOMException',
    'Element',
    'Event',
    'HTMLElement',
    'Node',
    'Node',
    'NodeList',
    'ParentNode',
    'Text',
    'parse',
  ].forEach(key => test(key, () => ok(index.key, `${key} is missing`)));
});
