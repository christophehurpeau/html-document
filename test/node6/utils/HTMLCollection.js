'use strict';

var _proclaim = require('proclaim');

var _ = require('../../..');

const HTMLCollection = _.utils.HTMLCollection;

suite('HTMLCollection', () => {
  test('constructor', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    (0, _proclaim.strictEqual)(collection.length, 3);
  });

  test('item', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    (0, _proclaim.strictEqual)(collection.item(2).tagName, 'b');
  });

  test('item returns null on index out of bounds', () => {
    const document = new _.Document();
    document.body.innerHTML = '<b></b><div><b></b></div>';
    let collection = new HTMLCollection(document.body, () => true);
    (0, _proclaim.isNull)(collection.item(20));
  });

  test('should return live collection', () => {
    const document = new _.Document();
    const divCollection = document.body.getElementsByTagName('div');
    document.body.appendChild(document.createElement('div'));
    (0, _proclaim.strictEqual)(divCollection.length, 1);
    document.body.innerHTML = '';
    (0, _proclaim.strictEqual)(divCollection.length, 0);
  });
});
//# sourceMappingURL=HTMLCollection.js.map