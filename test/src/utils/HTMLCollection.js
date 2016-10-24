import { strictEqual, isNull } from 'proclaim';
import { Document, utils } from '../../../src';

const HTMLCollection = utils.HTMLCollection;

suite('HTMLCollection', () => {
  test('constructor', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    strictEqual(collection.length, 3);
  });

  test('item', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    strictEqual(collection.item(2).tagName, 'b');
  });

  test('item returns null on index out of bounds', () => {
    const document = new Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    isNull(collection.item(20));
  });

  test('should return live collection', () => {
    const document = new Document();
    const divCollection = document.body.getElementsByTagName('div');
    document.body.appendChild(document.createElement('div'));
    strictEqual(divCollection.length, 1);
    document.body.innerHTML = '';
    strictEqual(divCollection.length, 0);
  });
});
