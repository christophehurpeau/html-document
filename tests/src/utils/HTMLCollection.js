/* global test */
import { strictEqual, deepEqual, isNull } from 'proclaim';
import Document from '../../../lib/Document';
import HTMLCollection from '../../../lib/utils/HTMLCollection';

test('HTMLCollection constructor', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    strictEqual(collection.length, 3);
});

test('HTMLCollection.item', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    strictEqual(collection.item(2).tagName, 'b');
});

test('HTMLCollection.item returns null on index out of bounds', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    isNull(collection.item(20));
});
