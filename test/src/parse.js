/* global suite, test */
import { strictEqual } from 'assert';
import { Document } from '../../src';

const document = new Document();

suite('parse', () => {
  test('parse innerHTML', () => {
    const div = document.createElement('div');
    div.innerHTML = '<span/><span data-test="test">content</span>';
    strictEqual(div.innerHTML, '<span></span><span data-test="test">content</span>');
  });

  test('parse nodeText', () => {
    const div = document.createElement('div');
    div.innerHTML = 'content';
    strictEqual(div.childNodes.length, 1);
    strictEqual(div.innerHTML, 'content');
  });
});
